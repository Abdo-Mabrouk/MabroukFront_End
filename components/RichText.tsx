import { Fragment } from "react";

/**
 * Renders the tiny copy markup used in lib/content.ts without dangerouslySetInnerHTML:
 *   **bold**  -> <strong>
 *   {{text}}  -> <bdi>   (bidi isolation for Latin words inside Arabic text)
 */
function renderInline(text: string) {
  return text.split(/(\{\{[^}]+\}\})/g).map((part, i) => {
    const match = /^\{\{([^}]+)\}\}$/.exec(part);
    return match ? <bdi key={i} className="[unicode-bidi:isolate]">{match[1]}</bdi> : <Fragment key={i}>{part}</Fragment>;
  });
}

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
        const bold = /^\*\*([^*]+)\*\*$/.exec(part);
        return bold ? <strong key={i}>{renderInline(bold[1])}</strong> : <Fragment key={i}>{renderInline(part)}</Fragment>;
      })}
    </>
  );
}
