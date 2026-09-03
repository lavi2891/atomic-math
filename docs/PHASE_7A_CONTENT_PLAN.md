# Phase 7A — Foundational content taxonomy and authoring plan

Status: design only. This document does not activate new skills or create a question bank.

## 1. Current-state audit

The active catalog contains one Domain (`INTEGERS`) and nine Skills: `INT_ADD`, `INT_SUB`, `INT_MUL`, `INT_ORDER_OPS`, `INT_DECIMAL_OPS`, `INT_RATIONAL_OPS`, `INT_NEGATION`, `INT_DISTRIBUTIVE`, and `INT_POWERS`. The active question pool combines 25 generated-question definitions with 20 deterministic generated sample fixtures. Those fixtures are regression examples, not a separately authored conceptual bank.

The active generators cover signed addition, subtraction, multiplication, division inside mixed work, decimals, rationals, multi-step add/subtract chains, negation/parentheses, distributive arithmetic, and powers. They use integer, decimal, and rational parameters; constraints; exact/decimal/rounded semantics; hints; misconception tags; anti-repetition keys; and normalized difficulty functions. Legacy `subtopic` values are mapped to the nine Skills by `signedNumbersAdapter`; unmapped content fails closed. The adapter currently defaults all legacy content to `calculation`.

A second, currently unwired signed-number expression-bank system can generate numeric (60%), comparison (20%), sign-of-result (10%), and equivalent-expression (10%) families across eleven difficulty buckets. It demonstrates reusable single-choice distractor generation and misconception tagging. Runtime inputs support `numeric`, `singleChoice`, and `multiChoice`; true/false should initially be represented as two-option single choice. Representation is a question category, not an input type.

Current difficulty is normalized to `[0,1]`, but several formulas blend magnitude and structural features directly. This is useful machinery, not yet a curriculum-wide difficulty contract.

## 2. Proposed Domain tree

Student-facing order is conceptual, never grade-based:

1. `ARITHMETIC` — חשבון בסיסי
2. `ORDER_OF_OPERATIONS` — סדר פעולות
3. `INTEGERS` — מספרים מכוונים
4. `FRACTIONS` — שברים
5. `DECIMALS` — מספרים עשרוניים
6. `ALGEBRA_FOUNDATIONS` — יסודות האלגברה
7. `EQUATIONS` — משוואות
8. `COORDINATES` — מערכת הצירים

IDs are semantic and permanent. Moving a Skill must not change its ID unless its mastery meaning changes. Grade and curriculum alignment belong in internal metadata.

## 3. Skill table

Legend: mastery is a percentage. `F/Q/T/S` means foundational, Quick Practice, Timed, Survival. Category mix uses `cal` calculation, `con` conceptual, `rea` reasoning, `rep` representation with H/M/L. Bands are defined in section 6. Strategy is Generator-heavy (`G`), Fixed-heavy (`F`), or Mixed (`M`).

### Basic arithmetic

| Skill ID | Full Hebrew name | Short label | Description | Prerequisites | Mastery | Fluency | F/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `AR_ADD` | חיבור במספרים טבעיים | חיבור | Add whole numbers, including regrouping | — | 90 | yes | Y/Y/Y/Y | cal H, con L | A–C | G |
| `AR_SUB` | חיסור במספרים טבעיים | חיסור | Subtract whole numbers, including regrouping | `AR_ADD` | 90 | yes | Y/Y/Y/Y | cal H, con L | A–C | G |
| `AR_MUL_FACTS` | עובדות כפל | לוח הכפל | Recall and derive products through 10×10/12×12 | `AR_ADD` | 90 | yes | Y/Y/Y/Y | cal H, con M | A–B | M |
| `AR_DIV_FACTS` | עובדות חילוק | חילוק בסיסי | Related division facts and missing factors | `AR_MUL_FACTS` | 90 | yes | Y/Y/Y/Y | cal H, con M | A–B | M |
| `AR_MUL_MULTI` | כפל מספרים רב־ספרתיים | כפל ארוך | Place-value based multi-digit multiplication | `AR_MUL_FACTS`,`DEC_PLACE_VALUE` | 85 | no | Y/Y/N/Y | cal H, rea L | B–D | G |
| `AR_DIV_MULTI` | חילוק מספרים רב־ספרתיים | חילוק ארוך | Quotients with and without remainder | `AR_DIV_FACTS`,`AR_SUB` | 85 | no | Y/Y/N/Y | cal H, con L | B–D | M |
| `AR_ESTIMATE` | אומדן ובדיקת סבירות | אומדן | Estimate operations and judge reasonable results | `AR_ADD`,`AR_SUB`,`AR_MUL_FACTS` | 85 | no | Y/Y/N/Y | con H, rea H, cal L | A–D | F |

### Order of operations

| Skill ID | Full Hebrew name | Short label | Description | Prerequisites | Mastery | Fluency | F/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `OPS_ORDER_BASIC` | סדר פעולות בסיסי | סדר פעולות | Multiplication/division before addition/subtraction | `AR_ADD`,`AR_SUB`,`AR_MUL_FACTS`,`AR_DIV_FACTS` | 85 | no | Y/Y/N/Y | cal H, con M | A–C | M |
| `OPS_PARENS` | סוגריים וסדר פעולות | סוגריים | Evaluate expressions with one or more parenthesis levels | `OPS_ORDER_BASIC` | 85 | no | N/Y/N/Y | cal H, rea M | B–D | G |
| `OPS_POWERS` | חזקות בסדר פעולות | חזקות | Interpret powers within operation order | `OPS_PARENS`,`AR_MUL_FACTS` | 85 | no | N/Y/N/Y | cal H, con M | B–D | M |

### Integers / signed numbers

| Skill ID | Full Hebrew name | Short label | Description | Prerequisites | Mastery | Fluency | F/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `INT_NUMBER_LINE` | מספרים מכוונים על ישר המספרים | ישר המספרים | Locate integers and interpret direction/distance | — | 85 | no | Y/Y/N/Y | rep H, con H | A–C | F |
| `INT_COMPARE` | השוואת מספרים מכוונים | השוואה | Order signed values without unnecessary computation | `INT_NUMBER_LINE` | 85 | no | Y/Y/N/Y | con H, rep M, rea M | A–C | M |
| `INT_ABS` | ערך מוחלט | ערך מוחלט | Interpret absolute value as distance from zero | `INT_NUMBER_LINE` | 85 | no | Y/Y/N/Y | con H, rep H, cal L | A–C | M |
| `INT_ADD` | חיבור מספרים מכוונים | חיבור | Add integers using sign and magnitude | `INT_NUMBER_LINE`,`AR_ADD` | 85 | yes | Y/Y/Y/Y | cal H, con M, rep L | A–D | M |
| `INT_SUB` | חיסור מספרים מכוונים | חיסור | Interpret subtraction and add the opposite | `INT_ADD`,`INT_NEGATION` | 85 | yes | Y/Y/Y/Y | cal H, con M | A–D | M |
| `INT_MUL` | כפל מספרים מכוונים | כפל | Sign rules and integer products | `AR_MUL_FACTS`,`INT_COMPARE` | 85 | yes | Y/Y/Y/Y | cal H, con M, rea L | A–C | M |
| `INT_DIV` | חילוק מספרים מכוונים | חילוק | Sign rules and exact integer quotients | `AR_DIV_FACTS`,`INT_MUL` | 85 | yes | Y/Y/Y/Y | cal H, con M | A–C | M |
| `INT_NEGATION` | מספר נגדי ומינוס לפני סוגריים | מספר נגדי | Distinguish subtraction, negative values, and negation | `INT_NUMBER_LINE` | 85 | no | Y/Y/N/Y | con H, cal M, rea M | A–D | M |
| `INT_POWERS` | חזקות וסימנים במספרים מכוונים | חזקות וסימנים | Distinguish `-a²` from `(-a)²` and parity effects | `INT_MUL`,`OPS_POWERS`,`INT_NEGATION` | 85 | no | N/Y/N/Y | con H, cal M, rea M | B–D | M |
| `INT_MIXED_OPS` | סדר פעולות במספרים מכוונים | פעולות משולבות | Multi-operation signed expressions | `INT_ADD`,`INT_SUB`,`INT_MUL`,`INT_DIV`,`OPS_PARENS` | 85 | no | N/Y/N/Y | cal H, rea M | B–D | G |

### Fractions

| Skill ID | Full Hebrew name | Short label | Description | Prerequisites | Mastery | Fluency | F/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `FRAC_MEANING` | משמעות השבר | משמעות השבר | Part-whole, quotient, and number-line interpretations | `AR_DIV_FACTS` | 85 | no | Y/Y/N/Y | con H, rep H | A–C | F |
| `FRAC_EQUIV` | שברים שווי ערך | שברים שווים | Recognize and generate equivalent fractions | `FRAC_MEANING`,`AR_MUL_FACTS` | 85 | no | Y/Y/N/Y | con H, cal M, rep M | A–C | M |
| `FRAC_SIMPLIFY` | צמצום שברים | צמצום | Reduce fractions using common factors | `FRAC_EQUIV`,`AR_DIV_FACTS` | 85 | yes | Y/Y/Y/Y | cal H, con M | A–C | G |
| `FRAC_EXPAND` | הרחבת שברים | הרחבה | Scale numerator and denominator by the same factor | `FRAC_EQUIV`,`AR_MUL_FACTS` | 85 | yes | Y/Y/Y/Y | cal H, con M | A–C | G |
| `FRAC_COMPARE` | השוואת שברים | השוואה | Compare by benchmarks, common denominators, or products | `FRAC_EQUIV`,`INT_COMPARE` | 85 | no | Y/Y/N/Y | con H, rea H, rep M | A–D | M |
| `FRAC_ADD_LIKE` | חיבור וחיסור שברים בעלי מכנה שווה | מכנה שווה | Add/subtract numerators with a shared denominator | `FRAC_MEANING`,`AR_ADD`,`AR_SUB` | 85 | yes | Y/Y/Y/Y | cal H, con M | A–C | M |
| `FRAC_ADD_UNLIKE` | חיבור וחיסור שברים בעלי מכנים שונים | מכנים שונים | Build a common denominator then operate | `FRAC_EXPAND`,`FRAC_SIMPLIFY`,`FRAC_ADD_LIKE` | 85 | no | Y/Y/N/Y | cal H, rea M | B–D | G |
| `FRAC_MUL` | כפל שברים | כפל שברים | Multiply fractions and interpret scaling | `FRAC_SIMPLIFY`,`AR_MUL_FACTS` | 85 | no | Y/Y/N/Y | cal H, con M | A–D | M |
| `FRAC_DIV` | חילוק שברים | חילוק שברים | Interpret division and multiply by reciprocal | `FRAC_MUL`,`FRAC_EQUIV`,`AR_DIV_FACTS` | 85 | no | N/Y/N/Y | cal H, con H, rea M | B–D | M |

### Decimals

| Skill ID | Full Hebrew name | Short label | Description | Prerequisites | Mastery | Fluency | F/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `DEC_PLACE_VALUE` | ערך המקום במספרים עשרוניים | ערך המקום | Read, compose, and decompose decimals | `AR_ADD` | 85 | no | Y/Y/N/Y | con H, rep H | A–C | F |
| `DEC_COMPARE` | השוואת מספרים עשרוניים | השוואה | Compare decimals using place value | `DEC_PLACE_VALUE`,`INT_COMPARE` | 85 | no | Y/Y/N/Y | con H, rep M, rea M | A–C | M |
| `DEC_ADD_SUB` | חיבור וחיסור מספרים עשרוניים | חיבור וחיסור | Align place values and operate exactly | `DEC_PLACE_VALUE`,`AR_ADD`,`AR_SUB` | 85 | yes | Y/Y/Y/Y | cal H, con L | A–D | G |
| `DEC_MUL` | כפל מספרים עשרוניים | כפל עשרוניים | Multiply and place the decimal point meaningfully | `AR_MUL_MULTI`,`DEC_PLACE_VALUE` | 85 | no | Y/Y/N/Y | cal H, con M | B–D | M |
| `DEC_DIV` | חילוק מספרים עשרוניים | חילוק עשרוניים | Divide decimals with place-value scaling | `AR_DIV_MULTI`,`DEC_PLACE_VALUE` | 85 | no | N/Y/N/Y | cal H, con M | B–D | M |
| `DEC_FRAC_CONVERT` | המרה בין שברים למספרים עשרוניים | שבר ועשרוני | Convert common fractions and terminating decimals | `FRAC_EQUIV`,`FRAC_SIMPLIFY`,`DEC_PLACE_VALUE` | 85 | no | Y/Y/N/Y | con H, rep H, cal M | A–D | M |

### Algebra foundations

| Skill ID | Full Hebrew name | Short label | Description | Prerequisites | Mastery | Fluency | F/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `ALG_VARIABLE` | משמעות המשתנה | מהו משתנה? | Interpret a letter as unknown, varying, or fixed value | `AR_ESTIMATE` | 85 | no | Y/Y/N/Y | con H, rea M, rep M | A–C | F |
| `ALG_SUBSTITUTE` | הצבה בביטוי אלגברי | הצבה | Substitute values and evaluate expressions | `ALG_VARIABLE`,`OPS_ORDER_BASIC`,`INT_ADD`,`INT_MUL` | 85 | yes | Y/Y/Y/Y | cal H, con M | A–D | G |
| `ALG_LIKE_TERMS` | איברים דומים | איברים דומים | Identify and combine like terms | `ALG_VARIABLE`,`INT_ADD` | 85 | no | Y/Y/N/Y | con H, cal M, rea M | A–D | M |
| `ALG_DISTRIBUTIVE` | חוק הפילוג בביטויים אלגבריים | חוק הפילוג | Expand and factor simple algebraic expressions | `AR_MUL_FACTS`,`ALG_VARIABLE`,`INT_MUL` | 85 | no | N/Y/N/Y | cal M, con H, rea M | B–D | M |
| `ALG_SIMPLIFY` | פישוט ביטויים אלגבריים | פישוט ביטויים | Combine operations, like terms, and distribution | `ALG_LIKE_TERMS`,`ALG_DISTRIBUTIVE`,`OPS_PARENS` | 85 | no | N/Y/N/Y | cal M, rea H, con M | B–D | M |

### Equations

| Skill ID | Full Hebrew name | Short label | Description | Prerequisites | Mastery | Fluency | F/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `EQ_ADD` | משוואות מהצורה x+a=b | חיבור וחיסור | Solve one-step additive equations and verify | `ALG_VARIABLE`,`INT_ADD`,`INT_SUB` | 85 | yes | Y/Y/Y/Y | cal H, con M, rep L | A–C | M |
| `EQ_MUL` | משוואות מהצורה ax=b | כפל וחילוק | Solve one-step multiplicative equations | `ALG_VARIABLE`,`INT_MUL`,`INT_DIV` | 85 | yes | Y/Y/Y/Y | cal H, con M | A–C | M |
| `EQ_TWO_STEP` | משוואות מהצורה ax+b=c | משוואה בשני שלבים | Undo two operations and check solutions | `EQ_ADD`,`EQ_MUL`,`OPS_ORDER_BASIC` | 85 | no | N/Y/N/Y | cal H, rea M | B–D | G |
| `EQ_PARENS` | משוואות עם סוגריים | משוואות עם סוגריים | Use distribution or simplify before solving | `EQ_TWO_STEP`,`ALG_DISTRIBUTIVE` | 85 | no | N/Y/N/Y | cal M, rea H | C–D | M |
| `EQ_BOTH_SIDES` | משוואות עם משתנה בשני אגפים | משתנה בשני אגפים | Collect variable terms and reason about solutions | `EQ_TWO_STEP`,`ALG_LIKE_TERMS` | 85 | no | N/Y/N/Y | cal M, con M, rea H | C–D | M |

### Coordinate system

| Skill ID | Full Hebrew name | Short label | Description | Prerequisites | Mastery | Fluency | F/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `COORD_AXES` | צירים, ראשית ורבעים | הכרת הצירים | Identify axes, origin, directions, and quadrants | `INT_NUMBER_LINE` | 85 | no | Y/Y/N/Y | rep H, con H | A–C | F |
| `COORD_ORDERED_PAIR` | משמעות זוג סדור | זוג סדור | Interpret x then y and distinguish reversed pairs | `COORD_AXES` | 85 | no | Y/Y/N/Y | rep H, con H | A–C | F |
| `COORD_LOCATE` | מיקום נקודות במערכת הצירים | מיקום נקודות | Choose or plot a location from coordinates | `COORD_ORDERED_PAIR`,`INT_COMPARE` | 85 | no | Y/Y/N/Y | rep H | A–D | M |
| `COORD_READ` | קריאת שיעורי נקודה | קריאת נקודות | Read coordinates and simple geometric relationships | `COORD_LOCATE` | 85 | no | Y/Y/N/Y | rep H, rea M | A–D | M |
| `COORD_INTERPRET` | פירוש מידע במערכת הצירים | פירוש גרף | Make simple contextual inferences from plotted points | `COORD_READ` | 85 | no | N/Y/N/Y | rep H, rea H, con M | B–D | F |

Fixed mode is suitable for every Quick-eligible Skill. Timed is deliberately narrow: fluent retrieval or short routine substitution/equation work only. Survival allows short self-contained items but excludes long reading, multi-step algebra, and complex representations.

## 4. Category and thinking-question plan

Category weights in the table are authoring targets, not runtime mastery weights. Mature mixed Skills should generally converge near 55–70% calculation, 15–25% conceptual, 10–20% reasoning, and 0–15% representation; representation-first Skills invert that mix. A calculation-only set is allowed only where `cal` is M/H and must filter by typed `category`, never tags or input type.

Recommended future selector choices are: **חישובים בלבד** (`calculation`), **תרגול מעורב** (all categories; default), and **חשיבה והבנה** (`conceptual|reasoning|representation`). Hide a choice when a selected scope has no matching questions, and never silently fall back across categories.

Thinking content should include sign claims under quantified conditions; expressions whose sign can be determined without exact calculation; comparison by structure or benchmarks; true/false sign and equivalence statements; misconception diagnosis; multiple valid claims; and number-line/area/coordinate representations. Use single choice for one conclusion or true/false, multi choice for “select every true statement,” and numeric only when producing a value is itself the target.

## 5. Prerequisite graph and bottlenecks

```text
AR_ADD ─→ AR_SUB
   └──→ AR_MUL_FACTS ─→ AR_DIV_FACTS ───────────────┐
             ├→ AR_MUL_MULTI → DEC_MUL              │
             └→ INT_MUL → INT_DIV                   │
                                                    ↓
FRAC_MEANING → FRAC_EQUIV → FRAC_SIMPLIFY/EXPAND → FRAC_ADD_UNLIKE
                                ├→ FRAC_MUL → FRAC_DIV
                                └→ DEC_FRAC_CONVERT

INT_NUMBER_LINE → INT_COMPARE/INT_ABS/INT_NEGATION → INT_ADD → INT_SUB
                                            INT_MUL/INT_DIV ─┐
OPS_ORDER_BASIC → OPS_PARENS → OPS_POWERS                   ├→ INT_MIXED_OPS
                                                            └→ INT_POWERS

ALG_VARIABLE → ALG_SUBSTITUTE
      ├→ ALG_LIKE_TERMS ────────────────→ ALG_SIMPLIFY
      └→ ALG_DISTRIBUTIVE ──────────────→ ALG_SIMPLIFY
EQ_ADD + EQ_MUL → EQ_TWO_STEP → EQ_PARENS / EQ_BOTH_SIDES

INT_NUMBER_LINE → COORD_AXES → COORD_ORDERED_PAIR → COORD_LOCATE → COORD_READ
```

Critical bottlenecks are `AR_MUL_FACTS`, `AR_DIV_FACTS`, `FRAC_MEANING`, `FRAC_EQUIV`, `INT_NUMBER_LINE`, `INT_ADD`, `OPS_ORDER_BASIC`, and `ALG_VARIABLE`. They should receive the earliest, broadest content coverage and explicit misconception checks. The graph is a recommendation/diagnostic signal, not a lock that removes student autonomy.

## 6. Difficulty strategy

Use four interpretable bands and map them to normalized targets: A/entry `[0,.25)`, B/core `[.25,.50)`, C/secure `[.50,.75)`, D/transfer `[.75,1]`. Store the continuous value, plus testable feature metadata explaining it.

- Arithmetic: operand magnitude, regrouping count, fact familiarity, remainder, operation count.
- Integers: sign combination, zero involvement, absolute magnitude, subtraction/negation ambiguity, parentheses depth.
- Fractions: denominator size/relationship, simplification need, mixed signs, common-denominator steps.
- Decimals: place depth, alignment, zeros, multiplier/divisor scale, terminating conversion complexity.
- Algebra/equations: term count, coefficient signs/magnitudes, operation reversals, parentheses depth, variables on both sides.
- Representations: quadrant/sign load, scale increments, distractor similarity, inference steps.

A generator declares feature-to-band rules before assigning normalized values. Random magnitude alone must not make a conceptually simple question “advanced.” Each band needs boundary tests and distribution tests.

## 7. Generator versus fixed-question plan

Generator-heavy Skills are routine arithmetic, simplification, substitution, and equations, where parameters yield meaningful variety. Fixed-heavy Skills are meaning, estimation, misconception diagnosis, multi-select logic, and visual representations, where wording and distractors require review. Mixed Skills pair a constrained calculator with curated conceptual/distractor families. Generated choice distractors must arise from named misconceptions and be proven unequal to the correct answer.

The existing expression-bank comparison/sign/equivalence families should be migrated selectively into category-aware Skill pools rather than activated wholesale. Their family ratios are useful for bank QA, but session category mix should be controlled explicitly at selection time.

## 8. Current-content migration map

| Current Skill/content | Proposed destination | Compatibility action |
|---|---|---|
| `INT_ADD` / `addition` | `INT_ADD` | Keep ID; add conceptual/representation content |
| `INT_SUB` / `subtraction` | `INT_SUB` | Keep ID; require `INT_NEGATION` concept coverage |
| `INT_MUL` / `multiplication` | `INT_MUL` | Keep ID; split future division into `INT_DIV` |
| `INT_ORDER_OPS` / `mixed_operations` | `INT_MIXED_OPS` | New mastery identity; alias old content during migration, do not merge historical mastery automatically |
| `INT_DECIMAL_OPS` / `decimals` | `DEC_ADD_SUB` initially | Move to `DECIMALS`; inspect each template before remapping |
| `INT_RATIONAL_OPS` / `rationals`,`mixed_rational_decimal` | `FRAC_ADD_UNLIKE` or `DEC_FRAC_CONVERT` | Split by actual operation; old aggregate mastery is not equivalent |
| `INT_NEGATION` / negation families | `INT_NEGATION` | Keep ID |
| `INT_DISTRIBUTIVE` / distributive families | `ALG_DISTRIBUTIVE` | Move Domain and new ID because learning target becomes algebraic; arithmetic-only templates may support `OPS_PARENS` |
| `INT_POWERS` / integer powers | `INT_POWERS` | Keep signed-power templates; move fraction-power templates to a later fraction-powers Skill, not MVP |
| unwired comparison family | `INT_COMPARE` or target-specific comparison Skill | Map by expression operands and set `conceptual`/`reasoning` |
| unwired sign family | `INT_MUL`,`INT_DIV`,`INT_POWERS` | Map by structure; set `conceptual` |
| unwired equivalent family | `INT_NEGATION`,`ALG_DISTRIBUTIVE`,`ALG_SIMPLIFY` | Map by misconception/structure; set `reasoning` |

During transition, use an explicit content-version migration registry. Never infer new Skill identity from display text. Retain old IDs as inactive analytics aliases when needed; do not silently copy mastery between pedagogically different Skills.

## 9. Implementation waves

- **Wave A — absolute foundations:** `AR_ADD`, `AR_SUB`, `AR_MUL_FACTS`, `AR_DIV_FACTS`, `AR_ESTIMATE`, `FRAC_MEANING`, `FRAC_EQUIV`, `DEC_PLACE_VALUE`, `INT_NUMBER_LINE`, `INT_COMPARE`, `INT_ABS`.
- **Wave B — Grade 7 recovery:** `OPS_ORDER_BASIC`, `OPS_PARENS`, `INT_ADD`, `INT_SUB`, `INT_MUL`, `INT_DIV`, `INT_NEGATION`, `FRAC_SIMPLIFY`, `FRAC_EXPAND`, `FRAC_COMPARE`, `FRAC_ADD_LIKE`, `FRAC_ADD_UNLIKE`, `DEC_COMPARE`, `DEC_ADD_SUB`, `DEC_FRAC_CONVERT`.
- **Wave C — bridge to Grade 8:** `INT_POWERS`, `INT_MIXED_OPS`, `ALG_VARIABLE`, `ALG_SUBSTITUTE`, `ALG_LIKE_TERMS`, `ALG_DISTRIBUTIVE`, `ALG_SIMPLIFY`, all five equation Skills, and coordinate foundations. Multi-digit/advanced fraction/decimal operations can be pulled forward for students whose bottleneck demands them.

### Initial classroom MVP (17 Skills)

`AR_ADD`, `AR_SUB`, `AR_MUL_FACTS`, `AR_DIV_FACTS`, `OPS_ORDER_BASIC`, `INT_NUMBER_LINE`, `INT_COMPARE`, `INT_ADD`, `INT_SUB`, `INT_MUL`, `INT_DIV`, `INT_NEGATION`, `FRAC_MEANING`, `FRAC_EQUIV`, `ALG_VARIABLE`, `ALG_SUBSTITUTE`, `EQ_ADD`.

This separates fact-retrieval gaps, signed-number conceptual/operational gaps, and readiness for simple algebra/equations without exposing the whole roadmap. At least one assignment or Quick Practice path remains usable for every starting profile.

## 10. Minimum usable-content rules

A Skill may be student-visible only when catalog validation, identity mapping, exact-answer policy, and every enabled mode pass automated checks, and one of these thresholds is met:

- Generator-heavy: at least two structurally distinct templates, valid output in every advertised band, at least 100 seeded samples per template without invalid/duplicate-rate failures, and anti-repetition coverage.
- Fixed-heavy: at least 12 reviewed items, including at least three misconception families and balanced correct-option positions; representation Skills need reviewed visuals at mobile widths.
- Mixed: at least one robust generator across two bands plus eight reviewed conceptual/reasoning/representation items.

Timed eligibility additionally requires short reading load and a latency distribution review. Survival requires short, independent items. Quick eligibility requires enough variety to avoid immediate repetition. “Content backed” should evolve from existence of one definition to a validated readiness manifest by Skill/category/mode.

## 11. Repeatable authoring workflow and quality gates

1. Add Skill metadata, category targets, mode eligibility, bands, and stable ID.
2. Add prerequisite edges and run duplicate/unknown/cycle validation.
3. Write generator specs and/or reviewed fixed items; name misconception families.
4. Assign the typed category explicitly; never derive it from input type.
5. Run seeded generation, answer evaluation, uniqueness, band-distribution, distractor, and RTL/LTR rendering validation.
6. Add unit tests for boundaries, exact/rounded formats, category filtering, mapping, and no-content behavior.
7. Mark the readiness manifest only after the minimum threshold and human Hebrew/content review pass.

Quality rules: prompts have one unambiguous task; exact versus rounded semantics are explicit; exact rational answers accept integers and finite equivalent forms; never demand an impossible terminating decimal; distractors are plausible, unique, and mathematically wrong; generators avoid repeated surface structures; Hebrew is concise, respectful, and age-appropriate rather than childish; math remains LTR inside RTL layout; diagrams have text alternatives; no question depends on color alone; and every answer-format hint matches evaluator behavior.

Recommended tooling: extend catalog validation for eligibility/category/readiness metadata; add a `validate-content` script that samples seeds by band and emits rejection/duplicate distributions; add a fixed-bank lint for option uniqueness and correct-answer balance; and produce a human-review sheet of rendered prompts without changing production data.

## 12. Open pedagogical decisions

1. Whether facts target 10×10 or 12×12 for this class, and whether derived-strategy evidence can substitute for recall speed.
2. Whether integer subtraction should require demonstrated negation understanding or merely recommend it.
3. How much mixed-number notation belongs in the first fraction wave.
4. Whether multi-digit written algorithms are classroom priorities or should defer to number sense/calculator policy.
5. Which Hebrew terminology the teaching team uses consistently for opposite number, cancellation, expansion, and quadrants.
6. Whether 85% is sufficient for conceptual Skills while fluency Skills remain at 90%; validate with teacher judgment before changing mastery targets.
7. How many Skills Quick Practice should return when no assignments exist; keep the current simple resolver until classroom observation supports weighting.
8. Whether coordinate plotting needs a dedicated interaction type later; MVP can use reviewed single-choice representations.
9. How historical mastery should be presented when an aggregate legacy Skill splits into several atomic Skills.

These decisions should be resolved with the classroom teacher and short student usability sessions before Wave A catalog activation.
