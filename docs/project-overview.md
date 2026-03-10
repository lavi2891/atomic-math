# Atomic Math Project Overview

## 1. Project purpose

Atomic Math is a Hebrew math practice app for Israeli students. The current product focus is a lightweight practice engine that can present topic-based sessions, render math cleanly, and increasingly rely on spec-driven questions instead of hardcoded UI logic.

At a technical level, the project is a React + TypeScript + Vite application with most business logic organized under `src/domain`. Static questions already exist, and the new generator path allows question definitions to sample parameters, render math templates, and produce concrete question instances before they reach the UI.

## 2. High-level architecture

### Main folders in `src`

- `src/app`: screen components, session orchestration, question pool selection, app-level repositories.
- `src/domain`: core business logic such as questions, generators, sessions, topics, stats, results, and expression parsing/evaluation.
- `src/ui`: reusable rendering utilities and style helpers, including math content rendering.
- `src/shared`: low-level shared helpers such as math input parsing and general utilities.
- `src/copy`: Hebrew UI copy.
- `src/theme`: theme tokens and visual configuration.
- `src/backoffice`: early/admin-oriented utilities and export helpers.
- `src/assets`: static assets.

### Major responsibilities

- App/screens:
  - `App.tsx` controls the top-level navigation between home, topic selection, session, and summary.
  - Screen components under `src/app` compose the UI and call domain services.
- Domain logic:
  - `src/domain/questions` defines question types, banks, and the generated-question engine.
  - `src/domain/session` builds a concrete session from a topic question pool.
  - `src/domain/expr-gen` parses and evaluates math expressions safely.
- UI rendering:
  - `ContentRenderer` renders prompt segments (`text` and `math`) and delegates math rendering to KaTeX.
- Session flow:
  - Question definitions are selected by topic.
  - Generated definitions are resolved into concrete questions.
  - The session engine presents questions, accepts answers, and records results.

### Main flow

```text
Home -> Topic -> Session -> Question -> Answer -> Result
```

More precisely:

```text
HomeScreen / TopicsScreen
  -> selectQuestionPool(topicId)
  -> buildSession(...)
  -> resolveQuestionDefinitions(...)
  -> SessionView
  -> QuestionView
  -> AnswerResult[]
  -> summary screen
```

## 3. Question system

The question system distinguishes between:

- concrete question instances used by the UI
- generated question definitions used as templates
- generated question instances produced from those templates

### Core concrete question types

From `src/domain/questions/types.ts`:

```ts
export type OptionContent =
  | { kind: "text"; value: string; key?: string }
  | { kind: "math"; latex: string; display?: boolean; key?: string };

export interface BaseQuestion {
  id: string;
  topicId: string;
  type: QuestionType;
  difficulty?: number;
  prompt: OptionContent[];
  subtopic?: string;
  misconceptions?: string[];
  version?: number;
  tags?: string[];
  seeds?: QuestionSeeds;
  hints?: OptionContent[][];
}

export interface NumericQuestion extends BaseQuestion {
  type: "numeric";
  correctAnswers: [string, ...string[]];
  tolerance?: number;
  input?: { allowMinus?: boolean; allowDecimal?: boolean };
}
```

Meaning of the main fields:

- `id`: unique concrete question id.
- `topicId`: topic membership used by selection/session logic.
- `prompt`: what the student sees, as an array of content segments.
- `correctAnswers`: accepted canonical answers for numeric questions.
- `input`: UX hints for the answer field.
- `hints`, `misconceptions`, `tags`, `difficulty`: metadata used by learning and content logic.

### Generated question instance

Generated questions still end up as ordinary numeric questions, with extra traceability fields:

```ts
export interface GeneratedQuestionInstance extends NumericQuestion {
  baseId: string;
  templateId: string;
  renderedExpression: string;
  sampledParams: Record<string, string>;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}
```

This keeps generated questions UI-compatible while preserving:

- which template they came from
- the final rendered expression
- which parameter values were sampled

### Generated question definition

From `src/domain/questions/generator/types.ts`:

```ts
export interface GeneratedQuestionDefinition {
  id: string;
  topicId: string;
  kind: "generated";
  exprTemplate: string;
  promptTemplate: OptionContent[];
  params: ParamsSpec;
  constraints?: string[];
  hintsTemplate?: OptionContent[][];
  misconceptions?: string[];
  tags?: string[];
  version?: number;
  metadata?: GeneratedQuestionMetadata;
  input?: {
    allowMinus?: boolean;
    allowDecimal?: boolean;
  };
}
```

Key distinction:

- `exprTemplate` is the machine-evaluated math expression.
- `promptTemplate` is the student-facing visual content.

This separation is important because display math may later diverge from the exact evaluable expression.

### Static vs generated definitions

From `src/domain/questions/definitions.ts`:

```ts
export type QuestionDefinition = Question | GeneratedQuestionDefinition;

export function isGeneratedQuestionDefinition(
  question: QuestionDefinition,
): question is GeneratedQuestionDefinition {
  return "kind" in question && question.kind === "generated";
}
```

This is the backward-compatibility layer:

- static questions remain plain `Question`
- generated questions are additional definition objects
- session-building resolves both into concrete `Question` instances

### Prompt structure

Prompts are arrays of segments:

```ts
[
  { kind: "text", value: "חשבו:" },
  { kind: "math", latex: "-{a}-(-{b})", display: true }
]
```

That structure is used consistently for:

- prompts
- options in choice questions
- hints

### Answer evaluation

- Numeric questions store canonical string answers in `correctAnswers`.
- `QuestionView` parses user input through `parseMathInput("RATIONAL", value)`.
- Generated numeric answers are computed automatically from the rendered expression and then stored in the same `correctAnswers` field used by static questions.

## 4. Generator engine

The generator engine lives under `src/domain/questions/generator`.

### Parameter system

Supported parameter types for the current MVP:

- `integer`
- `natural`
- `decimal`
- `rational`

The parameter union is:

```ts
export type ParamSpec =
  | { type: "integer" | "natural"; min: number; max: number; exclude?: number[] }
  | { type: "decimal"; min: number; max: number; step: number; exclude?: number[] }
  | {
      type: "rational";
      numerator: RationalEndpointSpec;
      denominator: { min: number; max: number; exclude?: number[] };
      simplify?: boolean;
      excludeZero?: boolean;
    };
```

Implementation notes:

- `natural` currently means positive integers only (`1..n`).
- decimal ranges must align exactly with `step`.
- rational denominators are forced to be non-zero.
- rational values can be simplified for display while preserving exact rational value internally.

### Placeholder syntax

Templates use `{param}` placeholders. Only names present in `params` are replaced.

From `renderTemplate.ts`:

```ts
const PLACEHOLDER_PATTERN = /\{([a-zA-Z_]\w*)\}/g;

export function renderExpressionTemplate(
  template: string,
  sampledParams: SampledParams,
): string {
  return replaceTemplatePlaceholders(template, sampledParams, "expr");
}
```

There are two render modes:

- `expr`: uses machine-friendly values such as `-5/2`
- `display`: uses student-facing math values such as `-\frac{5}{2}`

### Parameter sampling

From `sampleParam.ts`:

```ts
export function sampleParam(spec: ParamSpec, rng: RandomFn = Math.random): SampledParamValue {
  switch (spec.type) {
    case "integer":
    case "natural":
      return sampleIntegerLike(spec, rng);
    case "decimal":
      return sampleDecimal(spec, rng);
    case "rational":
      return sampleRational(spec, rng);
  }
}
```

Sampling behavior:

- integer/natural:
  - enumerate candidates in range
  - remove excluded values
  - pick uniformly from remaining values
- decimal:
  - represent values as exact rationals
  - walk the range by exact `step`
  - reject misaligned ranges
- rational:
  - sample numerator and denominator from candidate sets
  - prevent denominator `0`
  - optionally simplify and optionally reject zero-valued samples

### Constraint handling

Constraints are strings evaluated after sampling:

- `"a !== b"`
- `"a + b <= 20"`
- `"a !== 0 && b !== 0"`

From `constraints.ts`:

```ts
export function evaluateConstraint(
  constraint: string,
  params: SampledParams,
): boolean {
  const parser = new ConstraintParser(tokenizeConstraint(constraint), params);
  return parser.parse();
}
```

Important characteristics:

- uses a small custom parser, not `eval`
- supports arithmetic, comparisons, `&&`, `||`
- works over exact rational values
- generator retries sampling until constraints pass or `maxAttempts` is reached

Current limitation:

- boolean-grouping parentheses such as `(a !== b || a !== 0) && ...` are not fully supported; parentheses in constraints are only for arithmetic grouping.

### Expression evaluation

Generated expressions are evaluated through the existing expression engine in `src/domain/expr-gen/core`.

From `evaluateExpression.ts`:

```ts
export function evaluateExpression(expression: string): Rational {
  return evalAst(parseLatex(expression));
}
```

This is intentionally safe:

- no `eval`
- no `Function(...)`
- parsing and evaluation happen over an AST

Supported expression features in the current MVP:

- signed integers
- decimals
- fractions
- parentheses
- implicit multiplication in LaTeX-style expressions
- absolute value using `|...|`

### Build pipeline

From `buildGeneratedQuestion.ts`:

```ts
export function buildGeneratedQuestion(
  definition: GeneratedQuestionDefinition,
  options: BuildGeneratedQuestionOptions = {},
): GeneratedQuestionInstance {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const sampledParams = sampleParams(definition, rng);
    if (!constraintsSatisfied(definition, sampledParams)) continue;

    const renderedExpression = renderExpressionTemplate(definition.exprTemplate, sampledParams);
    const result = evaluateExpression(renderedExpression);
    const prompt = renderPromptTemplate(definition.promptTemplate, sampledParams);

    return {
      ...concreteNumericQuestion,
      baseId: definition.id,
      templateId: definition.id,
      renderedExpression,
      sampledParams: ...,
    };
  }
}
```

Generation pipeline:

```text
Generator definition
  -> sample params
  -> validate constraints
  -> render exprTemplate
  -> render promptTemplate / hintsTemplate
  -> evaluate expression
  -> build GeneratedQuestionInstance
```

### Integration into the session flow

Generated and static definitions are resolved before the UI sees them:

```ts
const candidateQuestions = resolveQuestionDefinitions(input.questions).filter(
  (question) => question.topicId === input.topicId,
);
```

This means:

- UI components still consume ordinary `Question` objects
- the generator path is additive and backward compatible

## 5. Current generators

Current generated questions live in `src/domain/questions/bank/SIGNED_NUMBERS.generated.ts`.

### 1. `SN_GEN_SUB_NEG_NEG_001`

- Topic: `SIGNED_NUMBERS`
- Expression template: `-{a}-(-{b})`
- Parameters:
  - `a`: `{ type: "natural", min: 1, max: 20 }`
  - `b`: `{ type: "natural", min: 1, max: 20 }`
- Constraints:
  - `a !== b`
- Example instance:
  - sampled params: `a=7`, `b=3`
  - rendered expression: `-7-(-3)`
  - answer: `-4`

### 2. `SN_GEN_ABS_DIFF_001`

- Topic: `SIGNED_NUMBERS`
- Expression template: `|{a}-{b}|`
- Parameters:
  - `a`: `{ type: "integer", min: -10, max: 10 }`
  - `b`: `{ type: "integer", min: -10, max: 10 }`
- Constraints:
  - `a !== b`
- Example instance:
  - sampled params: `a=-2`, `b=5`
  - rendered expression: `|-2-5|`
  - answer: `7`

### Where they are wired

- `src/app/questionPools.ts` appends generated signed-number definitions to the static signed-number pool.
- `src/domain/session/buildSession.ts` resolves them into concrete questions during session construction.

## 6. LaTeX / math rendering

### Library used

Math rendering uses KaTeX via `katex.renderToString(...)`.

From `src/ui/ContentRenderer.tsx`:

```ts
function renderMath(latex: string, displayMode: boolean) {
  return katex.renderToString(latex, {
    displayMode,
    throwOnError: false,
    strict: "ignore",
  });
}
```

### Where rendering happens

- `QuestionView` renders prompts through `<ContentRenderer content={question.prompt} />`
- choice options are also rendered through `ContentRenderer`
- review mode uses the same mechanism for correct answers and selected options

### Math content structure

Math appears inside `OptionContent` segments:

```ts
{ kind: "math", latex: "-{a}-(-{b})", display: true }
```

Supported prompt segment forms:

```ts
{ kind: "text", value: "חשבו:" }
{ kind: "math", latex: "\\frac{1}{2}+3", display: false }
{ kind: "math", latex: "|-2-5|", display: true }
```

### Inline vs display math

- `display: true`
  - rendered as a block-like span
  - gets top/bottom margin
  - suitable for main expressions
- `display: false` or omitted
  - rendered inline
  - suitable for embedded math in text or options

### What syntax is known to work

Based on the current parser and tests, the following are known to work:

- integers and decimals: `-7`, `0.3`
- fractions: `\frac{1}{2}`, `-5/2`
- parentheses/braces for grouping
- arithmetic operators: `+`, `-`, `*`, `/`, `^`
- absolute value with pipes: `|a-b|`
- some normalized LaTeX operator forms:
  - `\times`
  - `\cdot`
  - `\div`
  - `\left`, `\right` are stripped before parsing

Important distinction:

- KaTeX rendering is permissive because `throwOnError: false`.
- expression evaluation is stricter because it must parse the expression into the project’s internal AST.

## 7. Tests

### Current setup

The repository currently uses a lightweight custom Node-based test script for generator coverage.

From `package.json`:

```json
{
  "scripts": {
    "build": "tsc -b && vite build",
    "test": "node --import ./scripts/register-ts-node.mjs ./scripts/test-generator.ts"
  }
}
```

### How tests run

```bash
npm run test
```

`scripts/register-ts-node.mjs` registers `ts-node/esm`, so the test runner can execute TypeScript files directly.

### What is currently covered

`scripts/test-generator.ts` covers:

- placeholder extraction and replacement
- integer sampling
- natural sampling
- decimal sampling by exact step
- rational sampling and simplification
- constraint evaluation
- expression evaluation, including absolute value
- full generated-question build flow
- backward compatibility for static question definitions

### What is not covered yet

- React component rendering behavior
- full user session flow through the browser
- topic/home navigation
- stats persistence
- edge-case fuzzing for constraint expressions
- broader expression grammar coverage beyond the current signed-number/basic arithmetic scope
- snapshot tests for KaTeX output

## 8. Important design decisions

- Placeholders use `{param}` syntax.
  - This keeps templates readable for authors and easy to detect with a simple regex.
- Only placeholders that match names in `params` are replaced.
  - Unknown placeholders remain unchanged instead of being silently mis-sampled.
- `exprTemplate` is separate from display math.
  - Evaluation and presentation can evolve independently.
- Generated definitions become concrete question instances before they reach the UI.
  - The UI remains unaware of generation details.
- Static and generated questions share one compatibility layer through `QuestionDefinition`.
  - Existing static content keeps working unchanged.
- Expression evaluation reuses the existing AST parser/evaluator.
  - This avoids duplicate math engines and avoids unsafe runtime evaluation.
- Generated answers are stored in the same `correctAnswers` field used by static numeric questions.
  - Checking logic stays unified.

## 9. Known limitations / TODO

- The expression parser is intentionally limited.
  - It covers basic arithmetic, fractions, powers, and absolute value, not a full CAS or full LaTeX grammar.
- Constraint parsing is MVP-only.
  - Arithmetic grouping is supported, but more advanced boolean grouping is limited.
- Parameter distributions are uniform over enumerated candidates.
  - There is no weighted sampling yet.
- Only numeric generated questions are implemented.
  - No generated single-choice or multi-choice generators yet.
- Generator authoring is code-based.
  - There is no admin/editor UI for creating generator definitions.
- Topic coverage is still small.
  - Generated content is currently only wired for signed numbers.
- Test infrastructure is minimal.
  - There is no Jest/Vitest suite or browser/component test layer yet.
- Home/topic navigation exists, but there is no teacher dashboard, curriculum tooling, or generator management UI yet.

## 10. How to extend the system

### Add a new generator

1. Create a new `GeneratedQuestionDefinition` in the relevant question bank file.
2. Define `exprTemplate` with `{param}` placeholders.
3. Define `promptTemplate` using `OptionContent[]`.
4. Add `params` with the appropriate parameter specs.
5. Add `constraints` if the sampled values need filtering.
6. Set metadata such as `difficulty`, `subtopic`, and tags.
7. Add the definition to the topic’s pool in `src/app/questionPools.ts`.
8. Verify that the topic is reachable from the topic registry/UI.
9. Add or extend test coverage in `scripts/test-generator.ts`.
10. Run:

```bash
npm run test
npm run build
```

### Minimal example

```ts
const q: GeneratedQuestionDefinition = {
  id: "SN_GEN_ADD_NEG_001",
  topicId: "SIGNED_NUMBERS",
  kind: "generated",
  promptTemplate: [
    { kind: "text", value: "חשבו:" },
    { kind: "math", latex: "{a}+(-{b})", display: true },
  ],
  exprTemplate: "{a}+(-{b})",
  params: {
    a: { type: "integer", min: -10, max: 10 },
    b: { type: "natural", min: 1, max: 10 },
  },
  constraints: ["b !== 0"],
  metadata: {
    difficulty: 0.2,
    subtopic: "addition",
    source: "generator",
  },
};
```

### Extension advice

- Prefer keeping templates simple and evaluable by the existing parser.
- Keep display math and evaluated math aligned unless there is a clear reason to diverge.
- If a new math form is needed, extend `src/domain/expr-gen/core` instead of creating a second evaluator.
- If a generator cannot always satisfy its constraints, either widen the parameter ranges or add a targeted test that proves the retry limit is still safe.
