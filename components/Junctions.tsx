/**
 * The little "+" registration marks where the page rules meet.
 * Desktop: absolutely placed inside the shell. Tablet: fixed to the viewport at the header line.
 * Phones: not rendered (display none).
 */
const base =
  "pointer-events-none absolute hidden h-0 w-0 text-[#464a50] dark:text-[#6b707b] " +
  "tab:fixed tab:z-31 desk:absolute desk:z-20 " +
  "before:absolute before:left-0 before:top-0 before:bg-current before:content-[''] " +
  "after:absolute after:top-0 after:bg-current after:content-['']";

// Header-line junctions: a "+" (28px on desktop, 22px on tablet)
const plus =
  "before:h-[2px] before:w-[22px] before:-translate-x-1/2 before:-translate-y-1/2 desk:before:w-[28px] " +
  "after:left-0 after:h-[22px] after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 desk:after:h-[28px]";

// Portrait-line junctions are desktop only.
const portraitVertical = "before:h-[26px] before:w-[2px] before:-translate-x-1/2 before:-translate-y-1/2";
const portraitHorizontal = "after:h-[2px] after:w-[14px] after:-translate-y-1/2";

export function Junctions() {
  return (
    <>
      {/* top-left */}
      <span aria-hidden className={`${base} ${plus} tab:block tab:left-[25px] tab:top-[52px] desk:left-0 desk:right-auto desk:top-[var(--header-h)]`} />
      {/* top-middle (desktop only) */}
      <span aria-hidden className={`${base} ${plus} desk:block desk:right-[29%] desk:top-[var(--header-h)] en:desk:left-[29%] en:desk:right-auto`} />
      {/* top-right */}
      <span aria-hidden className={`${base} ${plus} tab:block tab:right-[25px] tab:top-[52px] desk:right-0 desk:top-[var(--header-h)]`} />
      {/* portrait-left (desktop only) */}
      <span
        aria-hidden
        className={`${base} ${portraitVertical} ${portraitHorizontal} desk:block desk:top-[calc(var(--header-h)_+_var(--portrait-h))] desk:right-[29%] after:left-0 en:desk:left-[29%] en:desk:right-auto en:desk:after:left-auto en:desk:after:right-0`}
      />
      {/* portrait-right (desktop only) */}
      <span
        aria-hidden
        className={`${base} ${portraitVertical} ${portraitHorizontal} desk:block desk:top-[calc(var(--header-h)_+_var(--portrait-h))] desk:right-0 after:right-0 en:desk:left-0 en:desk:right-auto en:desk:after:left-0 en:desk:after:right-auto`}
      />
    </>
  );
}
