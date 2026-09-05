import type { StageType } from "../../domain/learningPath/types.ts";

export function PathNodeIcon({ kind }: { kind: StageType | "chapter" | "lock" | "check" | "key" }) {
  return <svg data-icon={kind} aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {kind === "normal" ? <path d="m9 5 10 7-10 7Z" fill="currentColor" stroke="none" /> : null}
    {kind === "review" ? <><path d="M4 10a8 8 0 0 1 13-5l3 3M20 3v5h-5M20 14a8 8 0 0 1-13 5l-3-3M4 21v-5h5" /></> : null}
    {kind === "checkpoint" ? <><path d="M7 3h10v5a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 4 4M17 5h4v3a4 4 0 0 1-4 4M12 13v7M8 21h8" /></> : null}
    {kind === "bonus" ? <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" /> : null}
    {kind === "chapter" ? <><path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15" /></> : null}
    {kind === "lock" ? <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2" /></> : null}
    {kind === "check" ? <path d="m5 12 4 4L19 6" /> : null}
    {kind === "key" ? <><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8M16 7l2 2M14 9l2 2" /></> : null}
  </svg>;
}

export function StageStars({ stars, labelStars = stars }: { stars: number; labelStars?: number }) {
  return <span className="path-stars" role="img" aria-label={`${labelStars} מתוך 3 כוכבים`}>
    {[1, 2, 3].map((value) => <span key={value} aria-hidden="true" data-earned={value <= stars}>{value <= stars ? "★" : "☆"}</span>)}
  </span>;
}
