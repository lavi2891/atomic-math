import { validateFoundationalContent } from "../src/content/validateContent.ts";

const report = validateFoundationalContent(100);
if (report.issues.length) {
  process.stderr.write(`Content validation failed:\n${report.issues.map((issue) => `- ${issue}`).join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Content valid: ${report.skills} ready skills, ${report.definitions} definitions, ${report.generatedSamples} seeded generator samples.\n`);
}
