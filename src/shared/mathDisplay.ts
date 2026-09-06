/** Canonicalize multiplication only inside mathematical LaTeX, never prose or executable expressions. */
export function multiplicationDotLatex(latex: string): string {
  let result = "";
  for (let index = 0; index < latex.length;) {
    const char = latex[index]!;
    if (char === "\\") {
      const command = /^\\(?:[A-Za-z]+\*?|.)/u.exec(latex.slice(index))?.[0] ?? char;
      index += command.length;
      if (command === "\\times" || command === "\\ast" || command === "\\*") {
        result += "\\cdot ";
        // Consume command-separating spaces so normalization is idempotent.
        while (latex[index] === " ") index++;
        continue;
      }
      result += command;
      // Text and environment names are not mathematical operators. Preserve balanced groups,
      // including stars in e.g. \\text{note*} and \\begin{align*}.
      if (/^\\(?:text\w*|mbox|hbox|operatorname\*?|begin|end)$/u.test(command)) {
        while (/\s/u.test(latex[index] ?? "")) result += latex[index++];
        if (latex[index] === "{") {
          let depth = 0;
          do {
            const next = latex[index++]!;
            result += next;
            if (next === "\\" && index < latex.length) result += latex[index++];
            else if (next === "{") depth++;
            else if (next === "}") depth--;
          } while (index < latex.length && depth > 0);
        }
      }
    } else {
      result += char === "*" || char === "×" ? "\\cdot " : char;
      index++;
      if (char === "*" || char === "×") while (latex[index] === " ") index++;
    }
  }
  return result;
}
