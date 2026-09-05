import type { StageType } from "../../domain/learningPath/types.ts";
import type { LearningResourceType } from "../../domain/optionalLearningContent/types.ts";

export type PathIconKind = StageType | LearningResourceType | "riddle" | "chapter" | "lock" | "check" | "key";

export function PathNodeIcon({ kind }: { kind: PathIconKind }) {
  return <svg data-icon={kind} aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {kind === "normal" ? <path d="m9 5 10 7-10 7Z" fill="currentColor" stroke="none" /> : null}
    {kind === "review" ? <><path d="M4 10a8 8 0 0 1 13-5l3 3M20 3v5h-5M20 14a8 8 0 0 1-13 5l-3-3M4 21v-5h5" /></> : null}
    {kind === "checkpoint" ? <><path d="M7 3h10v5a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 4 4M17 5h4v3a4 4 0 0 1-4 4M12 13v7M8 21h8" /></> : null}
    {kind === "bonus" ? <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" /> : null}
    {kind === "chapter" ? <><path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15" /></> : null}
    {kind === "lock" ? <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2" /></> : null}
    {kind === "check" ? <path d="m5 12 4 4L19 6" /> : null}
    {kind === "key" ? <><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8M16 7l2 2M14 9l2 2" /></> : null}
    {kind === "riddle" ? <><path d="M9.2 9a3 3 0 1 1 4.6 2.5c-1.2.7-1.8 1.2-1.8 2.5" /><path d="M12 18h.01" /><circle cx="12" cy="12" r="10" /></> : null}
    {kind === "video" ? <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m10 9 5 3-5 3Z" fill="currentColor" /></> : null}
    {kind === "externalLink" ? <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></> : null}
    {kind === "tool" ? <><path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.4 2.4-3-3Z" /></> : null}
    {kind === "article" ? <><path d="M6 3h9l3 3v15H6Z" /><path d="M9 11h6M9 15h6M14 3v4h4" /></> : null}
  </svg>;
}

export function StageStars({ stars, labelStars = stars }: { stars: number; labelStars?: number }) {
  return <span className="path-stars" role="img" aria-label={`${labelStars} מתוך 3 כוכבים`}>
    {[1, 2, 3].map((value) => <span key={value} aria-hidden="true" data-earned={value <= stars}>{value <= stars ? "★" : "☆"}</span>)}
  </span>;
}
