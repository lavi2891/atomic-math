import { Fragment } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import type { OptionContent } from "@domain/questions/types";

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

export function ContentRenderer({ content, dir = "rtl" }: Props) {
  return (
    <span dir={dir}>
      {content.map((seg, i) => {
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
              dir="ltr"
              style={{ display: "block", marginTop: 8, marginBottom: 8 }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        // inline math
        return (
          <span
            key={seg.key ?? i}
            className="math"
            dir="ltr"
            style={{
              display: "inline-block",
              unicodeBidi: "isolate",
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </span>
  );
}
