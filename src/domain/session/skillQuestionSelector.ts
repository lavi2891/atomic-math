import type { QuestionDefinition } from "../questions/definitions.ts";
import { resolveQuestionDefinition } from "../questions/generator/resolveQuestionDefinition.ts";
import {
  createRecentHistory,
} from "../questions/generator/antiRepetition.ts";
import {
  isGeneratedQuestionInstance,
  type Question,
} from "../questions/types.ts";
import { pickNextQuestion } from "./questionPicker.ts";
import { createRuntimeSeed, SeedSequence } from "../../shared/seededRandom.ts";

export type SkillQuestionDefinition = QuestionDefinition & { skillId: string };

export class SkillQuestionSelector {
  private readonly generatorHistory = createRecentHistory();
  private readonly questionHistory: Question[] = [];
  private readonly definitions: readonly SkillQuestionDefinition[];
  private readonly seeds: SeedSequence;

  constructor(definitions: readonly SkillQuestionDefinition[], seed = createRuntimeSeed()) {
    this.definitions = definitions;
    this.seeds = new SeedSequence(seed);
  }

  hasQuestions(skillId: string): boolean {
    return this.definitions.some((definition) => definition.skillId === skillId);
  }

  pick(skillId: string, targetDifficulty: number): Question {
    const definitions = this.definitions.filter((definition) => definition.skillId === skillId);
    if (definitions.length === 0) throw new Error(`No questions available for skill ${skillId}`);

    const candidates = definitions.map((definition) =>
      resolveQuestionDefinition(definition, {
        seed: this.seeds.next(),
        recentHistory: this.generatorHistory,
      }),
    );
    const selected = pickNextQuestion({
      questions: candidates,
      targetDifficulty,
      history: {
        questionIds: this.questionHistory.map((question) => question.id),
        subtopics: this.questionHistory.map((question) => question.subtopic),
        renderedExpressions: this.questionHistory.flatMap((question) =>
          isGeneratedQuestionInstance(question) ? [question.renderedExpression] : [],
        ),
        structureKeys: this.questionHistory.flatMap((question) =>
          isGeneratedQuestionInstance(question) && question.structureKey ? [question.structureKey] : [],
        ),
        variantGroups: this.questionHistory.flatMap((question) =>
          isGeneratedQuestionInstance(question) && question.variantGroup ? [question.variantGroup] : [],
        ),
      },
    });

    this.questionHistory.push(selected);
    return selected;
  }
}
