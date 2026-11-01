import { Fragment, type ReactNode } from "react";

/*
 * Text pre-split into spans *by React* (not by mutating the DOM), so GSAP can animate the pieces
 * while React keeps full ownership of the markup across language switches.
 *
 *   <FlyChars>  one span per letter  → [data-fly-char]
 *   <FlyWords>  one span per word    → [data-fly-word]   (understands the **bold** / {{latin}} markup)
 */

const ZWJ = "‍";
const ARABIC = /[؀-ۿ]/;
const ARABIC_LETTER = /[ؠ-يٮ-ۓۺ-ۼ]/;
const COMBINING_MARK = /[ً-ٰٟۖ-ۭ]/;
// Letters that only connect to the letter before them (never to the one after).
const RIGHT_JOINING = new Set("آأؤإاةدذرزوٱ".split(""));
const NON_JOINING = new Set(["ء"]);

const joinsForward = (ch: string) => ARABIC_LETTER.test(ch) && !RIGHT_JOINING.has(ch) && !NON_JOINING.has(ch);
const joinsBackward = (ch: string) => ARABIC_LETTER.test(ch) && !NON_JOINING.has(ch);

/**
 * Splits a word into letter clusters. For Arabic, each cluster gets zero-width joiners on the
 * sides where it connects, so every letter keeps its joined (initial / medial / final) shape
 * even though it is rendered in its own inline-block.
 */
function letterClusters(word: string): string[] {
  const clusters: string[] = [];
  for (const ch of Array.from(word)) {
    const last = clusters[clusters.length - 1];
    // Diacritics stay on their letter; lam + alef stays one ligature.
    if (last && (COMBINING_MARK.test(ch) || (last.endsWith("ل") && "اأإآ".includes(ch)))) {
      clusters[clusters.length - 1] = last + ch;
    } else {
      clusters.push(ch);
    }
  }
  if (!ARABIC.test(word)) return clusters;

  const base = (cluster: string, edge: "first" | "last") => {
    const letters = Array.from(cluster).filter((c) => !COMBINING_MARK.test(c));
    return edge === "first" ? letters[0] ?? "" : letters[letters.length - 1] ?? "";
  };

  return clusters.map((cluster, i) => {
    const prev = clusters[i - 1];
    const next = clusters[i + 1];
    const before = prev && joinsForward(base(prev, "last")) && joinsBackward(base(cluster, "first"));
    const after = next && joinsForward(base(cluster, "last")) && joinsBackward(base(next, "first"));
    return `${before ? ZWJ : ""}${cluster}${after ? ZWJ : ""}`;
  });
}

const wordDir = (word: string) => (ARABIC.test(word) ? "rtl" : "ltr");

function withSpaces(words: ReactNode[]) {
  return words.map((node, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      {node}
    </Fragment>
  ));
}

export function FlyChars({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {withSpaces(
          words.map((word, w) => (
            <span key={w} dir={wordDir(word)} className="inline-block whitespace-nowrap">
              {letterClusters(word).map((cluster, c) => (
                <span key={c} data-fly-char className="inline-block will-change-transform">
                  {cluster}
                </span>
              ))}
            </span>
          )),
        )}
      </span>
    </>
  );
}

interface Segment {
  text: string;
  bold: boolean;
  /** Latin phrase marked with {{ }}: kept as one unit so its word order survives inside Arabic. */
  isolate: boolean;
}

function parseRich(text: string): Segment[] {
  const segments: Segment[] = [];
  text.split(/(\*\*[^*]+\*\*)/g).forEach((part) => {
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    const inner = bold ? bold[1] : part;
    inner.split(/(\{\{[^}]+\}\})/g).forEach((piece) => {
      const iso = /^\{\{([^}]+)\}\}$/.exec(piece);
      if (piece) segments.push({ text: iso ? iso[1] : piece, bold: Boolean(bold), isolate: Boolean(iso) });
    });
  });
  return segments;
}

export function FlyWords({ text }: { text: string }) {
  const units: Segment[] = [];
  parseRich(text).forEach((segment) => {
    if (segment.isolate) {
      units.push(segment);
      return;
    }
    segment.text.split(/\s+/).forEach((token) => {
      if (token) units.push({ text: token, bold: segment.bold, isolate: false });
    });
  });

  // Recover where the original text had no space between two units (e.g. "و" + "{{Next.js}}").
  const plain = text.replace(/\*\*|\{\{|\}\}/g, "");
  let cursor = 0;
  const spaced = units.map((unit) => {
    const at = plain.indexOf(unit.text, cursor);
    const hasSpace = at > 0 && /\s/.test(plain[at - 1] ?? "");
    cursor = at >= 0 ? at + unit.text.length : cursor;
    return { ...unit, space: hasSpace };
  });

  // Glue units with no space between them into one animated piece.
  const pieces: (typeof spaced)[] = [];
  spaced.forEach((unit, i) => {
    if (i === 0 || unit.space) pieces.push([unit]);
    else pieces[pieces.length - 1].push(unit);
  });

  return (
    <>
      {pieces.map((piece, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span data-fly-word className="inline-block will-change-transform">
            {piece.map((unit, u) => {
              const content = unit.isolate ? (
                <bdi className="[unicode-bidi:isolate]">{unit.text}</bdi>
              ) : (
                unit.text
              );
              return unit.bold ? <strong key={u}>{content}</strong> : <Fragment key={u}>{content}</Fragment>;
            })}
          </span>
        </Fragment>
      ))}
    </>
  );
}
