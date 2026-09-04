import { Fragment } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import type { OptionContent } from "@domain/questions/types";
import { contentSegmentDirection, DEFAULT_CONTENT_DIRECTION, groupInlineMath } from "./contentDirection.ts";

type Props = {
  content: OptionContent[];
  dir?: "rtl" | "ltr";
};

function renderMath(latex: string, displayMode: boolean) {
  return katex.renderToString(latex, {
    displayMode,
    throwOnError: false,
    strict: "ignore",
  });
}

export function ContentRenderer({ content, dir = DEFAULT_CONTENT_DIRECTION }: Props) {
  return (
    <span dir={dir} style={{ maxWidth: "100%", minWidth: 0 }}>
      {groupInlineMath(content).map((run, runIndex) => {
        const rendered = run.map((seg, i) => {
        if (seg.kind === "text") {
          return <Fragment key={seg.key ?? i}>{seg.value}</Fragment>;
        }

        const html = renderMath(seg.latex, !!seg.display);

        // block math: wrap in div-like span
        if (seg.display) {
          return (
            <span
              key={seg.key ?? i}
              className="math"
              dir={contentSegmentDirection(seg)}
              style={{ display: "block", maxWidth: "100%", marginTop: 8, marginBottom: 8 }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        // inline math
        return (
          <span
            key={seg.key ?? i}
            className="math"
            dir={contentSegmentDirection(seg)}
            style={{
              display: "inline-block",
              maxWidth: "100%",
              unicodeBidi: "isolate",
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
        });
        return run.length > 1 ? (
          <span key={runIndex} dir="ltr" className="math-run" style={{ display: "inline-block", unicodeBidi: "isolate", maxWidth: "100%" }}>
            {rendered}
          </span>
        ) : <Fragment key={runIndex}>{rendered}</Fragment>;
      })}
    </span>
  );
}
