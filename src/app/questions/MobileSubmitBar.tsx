import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { PracticeViewport } from "../session/usePracticeViewport.ts";

export function MobileSubmitBar({ viewport, label, state, disabled, onSubmit }: {
  viewport: PracticeViewport;
  label: string;
  state: "answering" | "checked";
  disabled: boolean;
  onSubmit: () => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(76);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => setHeight(bar.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);
  return <>
    <div aria-hidden="true" className="practice-action-spacer" style={{ height, flexShrink: 0 }} />
    {typeof document !== "undefined" && createPortal(
      <div ref={barRef} className="practice-action-bar" data-action-state={state} dir="rtl" style={{
        position: "fixed", top: viewport.top + viewport.height, left: viewport.left,
        width: viewport.width, transform: "translateY(-100%)",
      }}>
        <button type="button" disabled={disabled} onPointerDown={(event) => event.preventDefault()} onClick={onSubmit}>{label}</button>
      </div>, document.body,
    )}
  </>;
}
