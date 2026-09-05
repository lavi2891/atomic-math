import { useEffect, useRef } from "react";
import { safeExternalResourceUrl, type LearningResourceDefinition, type LearningResourceType } from "../../domain/optionalLearningContent/types.ts";
import { ResponsiveMedia } from "../../ui/ResponsiveMedia.tsx";
import { PathNodeIcon } from "./PathNodeIcon.tsx";

const typeLabels: Record<LearningResourceType, string> = { video: "סרטון", externalLink: "קישור", tool: "כלי", article: "מאמר" };
const actionLabels: Record<LearningResourceType, string> = { video: "צפה", externalLink: "פתח", tool: "פתח כלי", article: "פתח" };

export function ResourceSheet({ resource, onClose }: { resource: LearningResourceDefinition; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const safeUrl = safeExternalResourceUrl(resource.url);
  useEffect(() => {
    const dialog = dialogRef.current; const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow; dialog?.showModal(); document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = overflow; if (opener?.isConnected) opener.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={dialogRef} className="path-stage-sheet resource-sheet" aria-labelledby="resource-sheet-title" onCancel={(event) => { event.preventDefault(); onClose(); }}>
    <div className="path-stage-sheet__content">
      <header><div className="optional-sheet-title"><PathNodeIcon kind={resource.type} /><div><small>{typeLabels[resource.type]} · לבחירה</small><h2 id="resource-sheet-title">{resource.titleHe}</h2></div></div><button type="button" className="path-sheet-close" aria-label="סגירה" onClick={onClose}>×</button></header>
      {resource.media ? <ResponsiveMedia media={resource.media} /> : null}
      {resource.shortDescription ? <p>{resource.shortDescription}</p> : null}
      <p className="resource-meta">{resource.sourceLabel ? `${resource.sourceLabel} · ` : ""}{resource.durationMinutes ? `${resource.durationMinutes} דקות · ` : ""}נפתח מחוץ ל־Atomic Math</p>
      {safeUrl ? <a className="primary-action resource-open-action" href={safeUrl} target="_blank" rel="noopener noreferrer">{actionLabels[resource.type]}</a> : <p role="status">הקישור אינו זמין כרגע</p>}
    </div>
  </dialog>;
}
