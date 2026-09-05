import { useEffect, useRef, useState } from "react";

export type PracticeViewport = {
  narrow: boolean;
  keyboardOpen: boolean;
  top: number;
  left: number;
  width: number;
  height: number;
  occludedHeight: number;
};

function readViewport(): PracticeViewport {
  const viewport = window.visualViewport;
  return {
    narrow: window.innerWidth <= 600,
    keyboardOpen: false,
    top: viewport?.offsetTop ?? 0,
    left: viewport?.offsetLeft ?? 0,
    width: viewport?.width ?? window.innerWidth,
    height: viewport?.height ?? window.innerHeight,
    occludedHeight: 0,
  };
}

/** Track the visible viewport, including iOS keyboard panning and Android resizing. */
export function usePracticeViewport() {
  const sessionRef = useRef<HTMLElement>(null);
  const [viewport, setViewport] = useState(readViewport);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const visual = window.visualViewport;
    let baselineHeight = Math.max(window.innerHeight, visual?.height ?? 0);
    let baselineWidth = window.innerWidth;
    const update = () => {
      const next = readViewport();
      const active = document.activeElement;
      const focused = !!active && !!sessionRef.current?.contains(active)
        && active.matches('input:not([type="checkbox"]):not([type="radio"]):not([type="button"]), textarea, [contenteditable="true"]');
      if (Math.abs(window.innerWidth - baselineWidth) > 100) {
        baselineHeight = Math.max(window.innerHeight, next.height);
        baselineWidth = window.innerWidth;
      }
      baselineHeight = Math.max(baselineHeight, window.innerHeight, next.height);
      next.keyboardOpen = next.narrow && focused && (visual?.scale ?? 1) <= 1.05
        && baselineHeight - next.height > Math.max(100, baselineHeight * 0.18);
      next.occludedHeight = next.keyboardOpen ? Math.max(0, baselineHeight - next.height) : 0;
      setViewport((previous) => Object.keys(next).every((key) => previous[key as keyof PracticeViewport] === next[key as keyof PracticeViewport]) ? previous : next);
    };
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    window.addEventListener("resize", update);
    visual?.addEventListener("resize", update);
    visual?.addEventListener("scroll", update);
    update();
    return () => {
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", update);
      window.removeEventListener("resize", update);
      visual?.removeEventListener("resize", update);
      visual?.removeEventListener("scroll", update);
    };
  }, []);

  return { sessionRef, viewport };
}
