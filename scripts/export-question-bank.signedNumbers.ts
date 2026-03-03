import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { buildSignedNumbersBank } from "../src/domain/expr-gen/topics/signedNumbers/buildBank.ts";

async function main(): Promise<void> {
  const questions = buildSignedNumbersBank({
    perBucketPerSpec: 2,
    seedBase: "SIGNED_NUMBERS_V1",
  });

  const rawDifficulties = questions.map((question) => question.difficulty ?? 0);
  const maxRawObserved =
    rawDifficulties.length > 0 ? Math.max(...rawDifficulties) : 1;
  const minRawObserved =
    rawDifficulties.length > 0 ? Math.min(...rawDifficulties) : 0;
  const spread = Math.max(1e-9, maxRawObserved - minRawObserved);

  for (const question of questions) {
    const raw = question.difficulty ?? 0;
    question.difficulty = (raw - minRawObserved) / spread;
    question.seeds = {
      ...(question.seeds ?? {}),
      difficulty: question.difficulty,
    };
  }

  const outputPath = path.resolve(
    process.cwd(),
    "public/question-banks/SIGNED_NUMBERS.json",
  );
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(questions, null, 2)}\n`,
    "utf8",
  );

  const difficulties = questions.map((question) => question.difficulty ?? 0);
  const minDifficulty = difficulties.length > 0 ? Math.min(...difficulties) : 0;
  const maxDifficulty = difficulties.length > 0 ? Math.max(...difficulties) : 0;

  console.log(
    `Exported SIGNED_NUMBERS bank: questions=${questions.length}, minDifficulty=${minDifficulty.toFixed(3)}, maxDifficulty=${maxDifficulty.toFixed(3)}, maxRawObserved=${maxRawObserved.toFixed(3)}`,
  );
}

main().catch((error: unknown) => {
  console.error("Failed to export SIGNED_NUMBERS bank", error);
  process.exitCode = 1;
});
