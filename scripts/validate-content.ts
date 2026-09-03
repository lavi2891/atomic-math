import { validateFoundationalContent } from "../src/content/validateContent.ts";

const report = validateFoundationalContent(100);
if (report.issues.length) {
  process.stderr.write(`Content validation failed:\n${report.issues.map((issue) => `- ${issue}`).join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Content valid: ${report.skills} ready skills, ${report.definitions} definitions (${report.audit.generated} generated, ${report.audit.curatedFixed} curated fixed, ${report.audit.fixedNumeric} fixed numeric), ${report.generatedSamples} seeded generator samples.\n`);
  if (report.warnings.length) process.stdout.write(`Review warnings (non-blocking):\n${report.warnings.map((warning) => `- ${warning}`).join("\n")}\n`);
}
