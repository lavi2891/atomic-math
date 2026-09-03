# Phase 7A — Foundational content taxonomy and authoring plan

Status: design only. This document does not activate new skills or create a question bank.

## 1. Current-state audit

The active catalog contains one Domain (`INTEGERS`) and nine Skills: `INT_ADD`, `INT_SUB`, `INT_MUL`, `INT_ORDER_OPS`, `INT_DECIMAL_OPS`, `INT_RATIONAL_OPS`, `INT_NEGATION`, `INT_DISTRIBUTIVE`, and `INT_POWERS`. The active question pool combines 25 generated-question definitions with 20 deterministic generated sample fixtures. Those fixtures are regression examples, not a separately authored conceptual bank.

The active generators cover signed addition, subtraction, multiplication, division inside mixed work, decimals, rationals, multi-step add/subtract chains, negation/parentheses, distributive arithmetic, and powers. They use integer, decimal, and rational parameters; constraints; exact/decimal/rounded semantics; hints; misconception tags; anti-repetition keys; and normalized difficulty functions. Legacy `subtopic` values are mapped to the nine Skills by `signedNumbersAdapter`; unmapped content fails closed. The adapter currently defaults all legacy content to `calculation`.

A second, currently unwired signed-number expression-bank system can generate numeric (60%), comparison (20%), sign-of-result (10%), and equivalent-expression (10%) families across eleven difficulty buckets. It demonstrates reusable single-choice distractor generation and misconception tagging. Runtime inputs support `numeric`, `singleChoice`, and `multiChoice`; true/false should initially be represented as two-option single choice. Representation is a question category, not an input type.

Current difficulty is normalized to `[0,1]`, but several formulas blend magnitude and structural features directly. This is useful machinery, not yet a curriculum-wide difficulty contract.

## 2. Proposed Domain tree

The long-term hierarchy is `Domain → optional Skill Group → atomic Skill`. A Skill Group is presentation metadata only: it may collapse several closely related Skills into one student-facing item, but Attempts, Mastery, Evidence Policies, Assignments, and teacher analysis always reference atomic Skill IDs. Groups never introduce another mastery score or subdimension. Student-facing order is conceptual, never grade-based:

1. `ARITHMETIC` — חשבון בסיסי
2. `ORDER_OF_OPERATIONS` — סדר פעולות
3. `INTEGERS` — מספרים מכוונים
4. `FRACTIONS` — שברים
5. `DECIMALS` — מספרים עשרוניים
6. `ALGEBRA_FOUNDATIONS` — יסודות האלגברה
7. `EQUATIONS` — משוואות
8. `COORDINATES` — מערכת הצירים

Recommended Groups include `AR_ADDITION` (addition facts + written addition), `AR_SUBTRACTION`, `AR_MULTIPLICATION_FACTS` (four atomic fact-family Skills), and `AR_DIVISION_FACTS` (corresponding fact families). Manual Practice may expand a Group; Quick Practice may select its atomic Skills without exposing the split. IDs are semantic and permanent. Moving a Skill must not change its ID unless its mastery meaning changes. Grade and curriculum alignment belong in internal metadata.

Do not use one ambiguous `foundational` boolean to drive unrelated behavior. Prefer explicit `waveTier`, `quickPracticeEligible`, `diagnosticPriority`, and per-mode eligibility/profile fields. The tables abbreviate these independent properties for readability.

## 3. Skill table

Legend: mastery is a percentage. Dependencies use `C:` core prerequisite and `S:` supporting Skill. They guide diagnosis and recommendations and **never block student or teacher access**. `W/Q/T/S` means wave tier, Quick Practice, Timed, Survival (`profile` means only a short comparable subset). Category mix uses `cal` calculation, `con` conceptual, `rea` reasoning, `rep` representation with H/M/L. Bands are defined in section 6. Strategy is Generator-heavy (`G`), Fixed-heavy (`F`), or Mixed (`M`).

### Basic arithmetic

| Skill ID | Full Hebrew name | Short label | Description | Core / supporting | Mastery | Fluency | W/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `AR_PLACE_VALUE` | ערך המקום ומבנה המספר השלם | ערך המקום | Read, compose, decompose, and compare whole numbers | C: — | 85 | no | A/Y/N/Y | con H, rep H | A–C | F |
| `AR_ADD_FACTS` | עובדות חיבור וחישוב מנטלי | חיבור מהיר | Basic addition facts and flexible mental strategies | C: —; S: `AR_PLACE_VALUE` | 90 | yes | A/Y/Y/Y | cal H, con M | A–B | M |
| `AR_ADD_MULTI` | חיבור מספרים רב־ספרתיים | חיבור בכתב | Multi-digit addition with place-value regrouping | C: `AR_PLACE_VALUE`; S: `AR_ADD_FACTS` | 85 | no | A/Y/N/profile | cal H, con M | A–C | M |
| `AR_SUB_FACTS` | עובדות חיסור וחישוב מנטלי | חיסור מהיר | Basic subtraction facts and inverse/add-up strategies | C: —; S: `AR_ADD_FACTS` | 90 | yes | A/Y/Y/Y | cal H, con M | A–B | M |
| `AR_SUB_MULTI` | חיסור מספרים רב־ספרתיים | חיסור בכתב | Multi-digit subtraction with regrouping | C: `AR_PLACE_VALUE`; S: `AR_SUB_FACTS` | 85 | no | A/Y/N/profile | cal H, con M | A–C | M |
| `AR_MUL_F_2_5_10` | עובדות כפל ב־2, 5 ו־10 | 2, 5, 10 | Recall and derive the anchor fact families | C: —; S: `AR_ADD_FACTS` | 95 | yes | A/Y/Y/Y | cal H, con M | A–B | M |
| `AR_MUL_F_3_4` | עובדות כפל ב־3 וב־4 | 3, 4 | Use known anchors/doubling to retrieve facts | C: —; S: `AR_MUL_F_2_5_10` | 95 | yes | A/Y/Y/Y | cal H, con M | A–B | M |
| `AR_MUL_F_6_7` | עובדות כפל ב־6 וב־7 | 6, 7 | Retrieve and derive the commonly difficult middle facts | C: —; S: prior fact groups | 95 | yes | A/Y/Y/Y | cal H, con M | A–B | M |
| `AR_MUL_F_8_9` | עובדות כפל ב־8 וב־9 | 8, 9 | Retrieve and derive high facts from anchors | C: —; S: prior fact groups | 95 | yes | A/Y/Y/Y | cal H, con M | A–B | M |
| `AR_DIV_F_2_5_10` | עובדות חילוק ב־2, 5 ו־10 | חילוק 2, 5, 10 | Division and missing-factor facts for anchor families | C: `AR_MUL_F_2_5_10` | 90 | yes | A/Y/Y/Y | cal H, con M | A–B | M |
| `AR_DIV_F_3_4` | עובדות חילוק ב־3 וב־4 | חילוק 3, 4 | Division facts related to 3 and 4 | C: `AR_MUL_F_3_4` | 90 | yes | A/Y/Y/Y | cal H, con M | A–B | M |
| `AR_DIV_F_6_7` | עובדות חילוק ב־6 וב־7 | חילוק 6, 7 | Division facts related to 6 and 7 | C: `AR_MUL_F_6_7` | 90 | yes | A/Y/Y/Y | cal H, con M | A–B | M |
| `AR_DIV_F_8_9` | עובדות חילוק ב־8 וב־9 | חילוק 8, 9 | Division facts related to 8 and 9 | C: `AR_MUL_F_8_9` | 90 | yes | A/Y/Y/Y | cal H, con M | A–B | M |
| `AR_MUL_MULTI` | כפל מספרים רב־ספרתיים | כפל בכתב | Place-value based multi-digit multiplication | C: `AR_PLACE_VALUE`; S: multiplication fact groups | 85 | no | B/Y/N/N | cal H, rea L | B–D | G |
| `AR_DIV_MULTI` | חילוק מספרים רב־ספרתיים | חילוק בכתב | Quotients with and without remainder | C: `AR_PLACE_VALUE`; S: division facts, `AR_SUB_MULTI` | 85 | no | B/Y/N/N | cal H, con L | B–D | M |
| `AR_FACTORS_MULTIPLES` | גורמים וכפולות | גורמים וכפולות | Factors, multiples, common factors, and common multiples | C: —; S: multiplication/division facts | 85 | no | A/Y/N/Y | cal M, con H, rea M | A–C | M |
| `AR_ESTIMATE` | אומדן ובדיקת סבירות | אומדן | Estimate operations and judge reasonable results | C: `AR_PLACE_VALUE`; S: basic operations | 85 | no | A/Y/N/Y | con H, rea H, cal L | A–D | F |

The classroom target is 10×10. Facts involving 11 and 12 are optional extension metadata/content inside the relevant fact-family Group and do not affect initial establishment unless a teacher selects that profile.

### Order of operations

| Skill ID | Full Hebrew name | Short label | Description | Core / supporting | Mastery | Fluency | W/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `OPS_ORDER_BASIC` | סדר פעולות בסיסי | סדר פעולות | Multiplication/division before addition/subtraction | C: operation meanings; S: arithmetic fact groups | 85 | no | A/Y/N/Y | cal H, con M | A–C | M |
| `OPS_PARENS` | סוגריים וסדר פעולות | סוגריים | Evaluate expressions with one or more parenthesis levels | `OPS_ORDER_BASIC` | 85 | no | N/Y/N/Y | cal H, rea M | B–D | G |
| `OPS_POWERS` | חזקות בסדר פעולות | חזקות | Interpret powers within operation order | C: `OPS_PARENS`; S: multiplication facts | 85 | no | B/Y/N/Y | cal H, con M | B–D | M |

### Integers / signed numbers

| Skill ID | Full Hebrew name | Short label | Description | Core / supporting | Mastery | Fluency | W/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `INT_NUMBER_LINE` | מספרים מכוונים על ישר המספרים | ישר המספרים | Locate integers and interpret direction/distance | — | 85 | no | Y/Y/N/Y | rep H, con H | A–C | F |
| `INT_COMPARE` | השוואת מספרים מכוונים | השוואה | Order signed values without unnecessary computation | `INT_NUMBER_LINE` | 85 | no | Y/Y/N/Y | con H, rep M, rea M | A–C | M |
| `INT_ABS` | ערך מוחלט | ערך מוחלט | Interpret absolute value as distance from zero | `INT_NUMBER_LINE` | 85 | no | Y/Y/N/Y | con H, rep H, cal L | A–C | M |
| `INT_ADD` | חיבור מספרים מכוונים | חיבור | Add integers using sign and magnitude | C: `INT_NUMBER_LINE`; S: `AR_ADD_FACTS` | 85 | yes | A/Y/Y/Y | cal H, con M, rep L | A–D | M |
| `INT_SUB` | חיסור מספרים מכוונים | חיסור | Interpret subtraction and add the opposite | C: `INT_NEGATION`; S: `INT_ADD`,`AR_SUB_FACTS` | 85 | yes | A/Y/Y/Y | cal H, con M | A–D | M |
| `INT_MUL` | כפל מספרים מכוונים | כפל | Sign rules and integer products | C: multiplication facts; S: `INT_NUMBER_LINE` | 85 | yes | A/Y/Y/Y | cal H, con M, rea L | A–C | M |
| `INT_DIV` | חילוק מספרים מכוונים | חילוק | Sign rules and exact integer quotients | C: division facts; S: `INT_MUL` | 85 | yes | A/Y/Y/Y | cal H, con M | A–C | M |
| `INT_NEGATION` | מספר נגדי ומינוס לפני סוגריים | מספר נגדי | Distinguish subtraction, negative values, and negation | `INT_NUMBER_LINE` | 85 | no | Y/Y/N/Y | con H, cal M, rea M | A–D | M |
| `INT_POWERS` | חזקות וסימנים במספרים מכוונים | חזקות וסימנים | Distinguish `-a²` from `(-a)²` and parity effects | `INT_MUL`,`OPS_POWERS`,`INT_NEGATION` | 85 | no | N/Y/N/Y | con H, cal M, rea M | B–D | M |
| `INT_MIXED_OPS` | סדר פעולות במספרים מכוונים | פעולות משולבות | Multi-operation signed expressions | `INT_ADD`,`INT_SUB`,`INT_MUL`,`INT_DIV`,`OPS_PARENS` | 85 | no | N/Y/N/Y | cal H, rea M | B–D | G |

### Fractions

| Skill ID | Full Hebrew name | Short label | Description | Core / supporting | Mastery | Fluency | W/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `FRAC_MEANING` | משמעות השבר | משמעות השבר | Part-whole, measure, quotient, and number-line interpretations | C: —; S: `AR_PLACE_VALUE` | 85 | no | A/Y/N/Y | con H, rep H | A–C | F |
| `FRAC_EQUIV` | שברים שווי ערך | שברים שווים | Recognize and generate equivalent fractions | C: `FRAC_MEANING`; S: multiplication facts | 85 | no | A/Y/N/Y | con H, cal M, rep M | A–C | M |
| `FRAC_SIMPLIFY` | צמצום שברים | צמצום | Reduce fractions using common factors | C: `FRAC_EQUIV`; S: factors/division facts | 85 | no | A/Y/N/profile | cal H, con M | A–C | G |
| `FRAC_EXPAND` | הרחבת שברים | הרחבה | Scale numerator and denominator by the same factor | C: `FRAC_EQUIV`; S: multiplication facts | 85 | no | A/Y/N/profile | cal H, con M | A–C | G |
| `FRAC_COMPARE` | השוואת שברים | השוואה | Compare by benchmarks, common denominators, or products | C: `FRAC_MEANING`; S: `FRAC_EQUIV` | 85 | no | A/Y/N/Y | con H, rea H, rep M | A–D | M |
| `FRAC_ADD_LIKE` | חיבור וחיסור שברים בעלי מכנה שווה | מכנה שווה | Add/subtract numerators with a shared denominator | C: `FRAC_MEANING`; S: addition/subtraction facts | 85 | no | B/Y/N/Y | cal H, con M | A–C | M |
| `FRAC_ADD_UNLIKE` | חיבור וחיסור שברים בעלי מכנים שונים | מכנים שונים | Build a common denominator then operate | `FRAC_EXPAND`,`FRAC_SIMPLIFY`,`FRAC_ADD_LIKE` | 85 | no | Y/Y/N/Y | cal H, rea M | B–D | G |
| `FRAC_MUL` | כפל שברים | כפל שברים | Multiply fractions and interpret scaling | C: `FRAC_MEANING`; S: `FRAC_SIMPLIFY`, multiplication facts | 85 | no | B/Y/N/Y | cal H, con M | A–D | M |
| `FRAC_DIV` | חילוק שברים | חילוק שברים | Interpret division and multiply by reciprocal | C: `FRAC_MEANING`,`FRAC_MUL`; S: division facts | 85 | no | C/Y/N/profile | cal H, con H, rea M | B–D | M |

### Decimals

| Skill ID | Full Hebrew name | Short label | Description | Core / supporting | Mastery | Fluency | W/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `DEC_PLACE_VALUE` | ערך המקום במספרים עשרוניים | ערך המקום | Read, compose, and decompose decimals | C: `AR_PLACE_VALUE` | 85 | no | A/Y/N/Y | con H, rep H | A–C | F |
| `DEC_COMPARE` | השוואת מספרים עשרוניים | השוואה | Compare decimals using place value | C: `DEC_PLACE_VALUE` | 85 | no | A/Y/N/Y | con H, rep M, rea M | A–C | M |
| `DEC_ADD_SUB` | חיבור וחיסור מספרים עשרוניים | חיבור וחיסור | Align place values and operate exactly | C: `DEC_PLACE_VALUE`; S: addition/subtraction facts | 85 | no | B/Y/N/profile | cal H, con L | A–D | G |
| `DEC_MUL` | כפל מספרים עשרוניים | כפל עשרוניים | Multiply and place the decimal point meaningfully | `AR_MUL_MULTI`,`DEC_PLACE_VALUE` | 85 | no | Y/Y/N/Y | cal H, con M | B–D | M |
| `DEC_DIV` | חילוק מספרים עשרוניים | חילוק עשרוניים | Divide decimals with place-value scaling | `AR_DIV_MULTI`,`DEC_PLACE_VALUE` | 85 | no | N/Y/N/Y | cal H, con M | B–D | M |
| `DEC_FRAC_CONVERT` | המרה בין שברים למספרים עשרוניים | שבר ועשרוני | Convert common fractions and terminating decimals | `FRAC_EQUIV`,`FRAC_SIMPLIFY`,`DEC_PLACE_VALUE` | 85 | no | Y/Y/N/Y | con H, rep H, cal M | A–D | M |
| `DEC_ROUND` | עיגול מספרים עשרוניים | עיגול | Round decimals to a requested place and explain bounds | C: `DEC_PLACE_VALUE`; S: `DEC_COMPARE` | 85 | no | C/Y/N/Y | cal M, con H, rep M | A–C | M |

### Algebra foundations

| Skill ID | Full Hebrew name | Short label | Description | Core / supporting | Mastery | Fluency | W/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `ALG_EQUALITY` | משמעות השוויון ושקילות | שוויון | Interpret equality, equivalent numerical statements, and missing values | C: basic operations | 85 | no | A/Y/N/Y | con H, rea H, rep M | A–C | F |
| `ALG_VARIABLE` | משמעות המשתנה | מהו משתנה? | Interpret a letter as unknown, varying, or fixed value | C: `ALG_EQUALITY` | 85 | no | A/Y/N/Y | con H, rea M, rep M | A–C | F |
| `ALG_SUBSTITUTE` | הצבה בביטוי אלגברי | הצבה | Substitute values and evaluate simple expressions; negatives enter later bands | C: `ALG_VARIABLE`; S: operation-order and signed-number Skills | 85 | yes | B/Y/profile/Y | cal H, con M | A–D | G |
| `ALG_LIKE_TERMS` | איברים דומים | איברים דומים | Identify and combine like terms | `ALG_VARIABLE`,`INT_ADD` | 85 | no | Y/Y/N/Y | con H, cal M, rea M | A–D | M |
| `ALG_DISTRIBUTIVE` | חוק הפילוג בביטויים אלגבריים | חוק הפילוג | Expand and factor simple algebraic expressions | C: multiplication meaning, `ALG_VARIABLE`; S: signed multiplication for later bands | 85 | no | B/Y/N/Y | cal M, con H, rea M | A–D | M |
| `ALG_SIMPLIFY` | פישוט ביטויים אלגבריים | פישוט ביטויים | Combine operations, like terms, and distribution | `ALG_LIKE_TERMS`,`ALG_DISTRIBUTIVE`,`OPS_PARENS` | 85 | no | N/Y/N/Y | cal M, rea H, con M | B–D | M |

### Equations

| Skill ID | Full Hebrew name | Short label | Description | Core / supporting | Mastery | Fluency | W/Q/T/S | Category mix | Bands | Strategy |
|---|---|---|---|---|---:|---|---|---|---|---|
| `EQ_ADD` | משוואות מהצורה x+a=b | חיבור וחיסור | Solve one-step additive equations and verify; negatives enter later bands | C: `ALG_EQUALITY`,`ALG_VARIABLE`; S: addition/subtraction, signed operations | 85 | no | B/Y/profile/Y | cal H, con M, rep L | A–C | M |
| `EQ_MUL` | משוואות מהצורה ax=b | כפל וחילוק | Solve one-step multiplicative equations; negatives enter later bands | C: `ALG_EQUALITY`,`ALG_VARIABLE`; S: multiplication/division, signed operations | 85 | no | B/Y/profile/Y | cal H, con M | A–C | M |
| `EQ_TWO_STEP` | משוואות מהצורה ax+b=c | משוואה בשני שלבים | Undo two operations and check solutions | `EQ_ADD`,`EQ_MUL`,`OPS_ORDER_BASIC` | 85 | no | N/Y/N/Y | cal H, rea M | B–D | G |
| `EQ_PARENS` | משוואות עם סוגריים | משוואות עם סוגריים | Use distribution or simplify before solving | `EQ_TWO_STEP`,`ALG_DISTRIBUTIVE` | 85 | no | N/Y/N/Y | cal M, rea H | C–D | M |
| `EQ_BOTH_SIDES` | משוואות עם משתנה בשני אגפים | משתנה בשני אגפים | Collect variable terms and reason about solutions | `EQ_TWO_STEP`,`ALG_LIKE_TERMS` | 85 | no | N/Y/N/Y | cal M, con M, rea H | C–D | M |

### Coordinate system

| Skill ID | Full Hebrew name | Short label | Description | Core / supporting | Mastery | Fluency | W/Q/T/S | Category mix | Bands | Strategy |
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
AR_PLACE_VALUE ─→ AR_ADD_MULTI / AR_SUB_MULTI / AR_ESTIMATE
AR_ADD_FACTS ↔ AR_SUB_FACTS
AR_MUL_F_* ─→ matching AR_DIV_F_* ──────────────────┐
       ├→ AR_MUL_MULTI → DEC_MUL                    │
       └→ INT_MUL → INT_DIV                         │
                                                    ↓
FRAC_MEANING → FRAC_EQUIV → FRAC_SIMPLIFY/EXPAND → FRAC_ADD_UNLIKE
                                ├→ FRAC_MUL → FRAC_DIV
                                └→ DEC_FRAC_CONVERT

INT_NUMBER_LINE → INT_COMPARE/INT_ABS/INT_NEGATION → INT_ADD → INT_SUB
                                            INT_MUL/INT_DIV ─┐
OPS_ORDER_BASIC → OPS_PARENS → OPS_POWERS                   ├→ INT_MIXED_OPS
                                                            └→ INT_POWERS

ALG_EQUALITY → ALG_VARIABLE → ALG_SUBSTITUTE
      ├→ ALG_LIKE_TERMS ────────────────→ ALG_SIMPLIFY
      └→ ALG_DISTRIBUTIVE ──────────────→ ALG_SIMPLIFY
EQ_ADD + EQ_MUL → EQ_TWO_STEP → EQ_PARENS / EQ_BOTH_SIDES

INT_NUMBER_LINE → COORD_AXES → COORD_ORDERED_PAIR → COORD_LOCATE → COORD_READ
```

Critical bottlenecks are `AR_PLACE_VALUE`, the atomic multiplication/division fact families, `ALG_EQUALITY`, `FRAC_MEANING`, `FRAC_EQUIV`, `INT_NUMBER_LINE`, `INT_ADD`, `OPS_ORDER_BASIC`, and `ALG_VARIABLE`. They should receive the earliest, broadest content coverage and explicit misconception checks. Core prerequisites indicate a concept normally required to interpret the target; supporting Skills make work easier or explain later bands. Neither kind is a gate: the graph informs Quick Practice, recommendations, intervention, and teacher interpretation while students and teachers retain direct access.

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

- **Wave A — absolute foundations:** `AR_PLACE_VALUE`, `AR_ADD_FACTS`, `AR_SUB_FACTS`, all four `AR_MUL_F_*` and matching `AR_DIV_F_*` Skills, `AR_FACTORS_MULTIPLES`, `AR_ESTIMATE`, `FRAC_MEANING`, `FRAC_EQUIV`, `DEC_PLACE_VALUE`, `ALG_EQUALITY`, `INT_NUMBER_LINE`, `INT_COMPARE`, `INT_ABS`.
- **Wave B — Grade 7 recovery:** `OPS_ORDER_BASIC`, `OPS_PARENS`, `INT_ADD`, `INT_SUB`, `INT_MUL`, `INT_DIV`, `INT_NEGATION`, `FRAC_SIMPLIFY`, `FRAC_EXPAND`, `FRAC_COMPARE`, `FRAC_ADD_LIKE`, `FRAC_ADD_UNLIKE`, `DEC_COMPARE`, `DEC_ADD_SUB`, `DEC_FRAC_CONVERT`.
- **Wave C — bridge to Grade 8:** `INT_POWERS`, `INT_MIXED_OPS`, `ALG_VARIABLE`, `ALG_SUBSTITUTE`, `ALG_LIKE_TERMS`, `ALG_DISTRIBUTIVE`, `ALG_SIMPLIFY`, all five equation Skills, and coordinate foundations. Multi-digit/advanced fraction/decimal operations can be pulled forward for students whose bottleneck demands them.

### Initial classroom MVP: compact presentation, diagnostic atomicity

The MVP may contain approximately 27 atomic Skills while presenting roughly 17 compact student-visible Groups/items:

`AR_PLACE_VALUE`, `AR_ADD_FACTS`, `AR_SUB_FACTS`, four `AR_MUL_F_*`, four `AR_DIV_F_*`, `AR_FACTORS_MULTIPLES`, `OPS_ORDER_BASIC`, `INT_NUMBER_LINE`, `INT_COMPARE`, `INT_ADD`, `INT_SUB`, `INT_MUL`, `INT_DIV`, `INT_NEGATION`, `FRAC_MEANING`, `FRAC_EQUIV`, `ALG_EQUALITY`, `ALG_VARIABLE`, `ALG_SUBSTITUTE`, `EQ_ADD`, `EQ_MUL`.

Addition, subtraction, multiplication facts, and division facts appear as four student-visible Groups even though fact families retain separate teacher-visible mastery. The MVP distinguishes severe place-value/basic arithmetic gaps, specific fact-family gaps, signed-number gaps, fraction-concept gaps, and readiness for equality, variables, substitution, and simple equations without exposing diagnostic fragmentation. At least one assignment or Quick Practice path remains usable for every starting profile.

## 10. Minimum usable-content rules

A Skill may be student-visible only when catalog validation, identity mapping, exact-answer policy, and every enabled mode pass automated checks, and one of these thresholds is met:

- Generator-heavy: at least two structurally distinct templates, valid output in every advertised band, at least 100 seeded samples per template without invalid/duplicate-rate failures, and anti-repetition coverage.
- Fixed-heavy: approximately 18–24 reviewed items, including at least four misconception/representation families and balanced correct-option positions; representation Skills need reviewed visuals at mobile widths.
- Mixed: at least one robust generator across two bands plus approximately 10–12 reviewed conceptual/reasoning/representation items.

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

1. How 10×10 fact mastery should balance retrieval speed with valid derived strategies; 11/12 remain an optional extension rather than an MVP target.
2. Whether integer subtraction should require demonstrated negation understanding or merely recommend it.
3. How much mixed-number notation belongs in the first fraction wave.
4. Whether multi-digit written algorithms are classroom priorities or should defer to number sense/calculator policy.
5. Which Hebrew terminology the teaching team uses consistently for opposite number, cancellation, expansion, and quadrants.
6. Whether 85% is sufficient for conceptual Skills while fluency Skills remain at 90%; validate with teacher judgment before changing mastery targets.
7. How many Skills Quick Practice should return when no assignments exist; keep the current simple resolver until classroom observation supports weighting.
8. Whether coordinate plotting needs a dedicated interaction type later; MVP can use reviewed single-choice representations.
9. How historical mastery should be presented when an aggregate legacy Skill splits into several atomic Skills.

These decisions should be resolved with the classroom teacher and short student usability sessions before Wave A catalog activation.

## 13. Evidence Coverage policy

The existing 10/50 numerical Mastery formula remains unchanged and is not category- or difficulty-weighted. Four related measures remain deliberately separate:

1. **Mastery score** — the existing 0–100 performance projection.
2. **Evidence quantity** — how many relevant Attempts exist and how recent they are.
3. **Evidence coverage** — whether the Skill's intended categories and difficulty bands have actually been sampled.
4. **Fluency** — speed/automaticity, only for Skills where retrieval speed is itself a learning goal.

Each atomic Skill may define a configurable `EvidencePolicy`, for example:

```ts
type EvidencePolicy = {
  minimumAttempts: number;
  requiredCategoryEvidence?: Partial<Record<QuestionCategory, number>>;
  requiredBandEvidence?: Partial<Record<"A" | "B" | "C" | "D", number>>;
  fluencyEvidence?: { minimumFluentAttempts: number };
};
```

Policies are per Skill/profile, not global. Multiplication facts may require substantial calculation and separate fluent-attempt evidence; `FRAC_MEANING` should require conceptual and representation Attempts; `INT_ADD` should require calculation plus some conceptual evidence; equations should require operational and conceptual/reasoning evidence. A learner can have a high numeric score while evidence coverage remains incomplete. “Established/mastered” should require both the appropriate score/evidence quantity and that Skill's coverage policy; it must not result from ten easy calculation items when the learning target is broader.

Initial policy archetypes keep configuration understandable while remaining per-Skill references:

| Policy | Initial Skill assignments | Coverage intent |
|---|---|---|
| `FACT_FLUENCY_V1` | `AR_ADD_FACTS`, `AR_SUB_FACTS`, all `AR_MUL_F_*`, all `AR_DIV_F_*` | Calculation across A/B plus a separate minimum of fluent independent Attempts |
| `ROUTINE_PLUS_CONCEPT_V1` | `INT_ADD`,`INT_SUB`,`INT_MUL`,`INT_DIV`, `FRAC_ADD_LIKE`, `DEC_ADD_SUB`, `ALG_SUBSTITUTE` | Calculation in A–C plus a small conceptual sample; no fluency requirement unless explicitly enabled |
| `CONCEPT_REP_V1` | `AR_PLACE_VALUE`,`FRAC_MEANING`,`DEC_PLACE_VALUE`,`INT_NUMBER_LINE`,`COORD_*` | Minimum conceptual and representation evidence across A/B before establishment |
| `REASONING_OPERATION_V1` | `FRAC_COMPARE`,`ALG_EQUALITY`,`ALG_LIKE_TERMS`,`ALG_DISTRIBUTIVE`,`EQ_*` | Operational evidence plus conceptual/reasoning evidence and at least one core band above entry |
| `MULTISTEP_V1` | `OPS_PARENS`,`OPS_POWERS`,`INT_MIXED_OPS`,`ALG_SIMPLIFY` | Calculation/reasoning coverage across B/C; D contributes confidence but is not universally required |

Every Skill metadata record must name and version its policy, even when several Skills share an archetype. Counts remain configurable after classroom calibration; these definitions intentionally do not invent one global attempt count.

Assignment completion should therefore use an explicit completion policy. A broad mastery assignment normally requires target numeric Mastery **and** required Evidence Coverage; a teacher-created calculation-only or fluency assignment may specify a narrower Challenge/Assignment Profile and is judged against that declared goal. The student sees concise progress and a next action, not a failed coverage matrix.

Fluency is recommended only for addition/subtraction facts, atomic multiplication/division fact families, and short signed arithmetic where automatic retrieval is a genuine target. A Skill being Timed-eligible does not automatically enable fluency measurement, and a non-Timed session may still contribute valid fluency evidence when conditions are comparable.

## 14. Challenge Profiles and comparable personal bests

A versioned `ChallengeProfile` must define at minimum: stable ID/version, allowed categories, allowed/expected difficulty bands and progression, maximum prompt/read load, permitted Skills/question families, repetition rules, and any mode-specific constraints. Personal-best signatures should eventually include `challengeProfileId` and `challengeProfileVersion`. A version changes whenever question composition changes enough to invalidate comparison.

Initial profiles:

- **Timed fluency v1:** short calculation items only, normally A→B with occasional C; no long reading or multi-step representations. MVP Skills are basic addition/subtraction facts, atomic multiplication/division facts, and short integer addition/subtraction/multiplication/division. Very simple substitution or one-step equations may be piloted in a separate profile.
- **Fixed speed v1:** stable count, category mix, Skill scope, and A→B→C distribution; the existing accuracy threshold still applies. It must not compare an easy random set with a harder or conceptual-heavy set.
- **Survival core v1:** short, self-contained items with a reproducible A→B→C→D staircase and bounded read load. Multi-digit written algorithms, complex order of operations, multi-step algebra, and extended representations are excluded even though they remain valid Fixed practice.

Puzzle-Rush-like progression should use deterministic band quotas rather than difficulty weighting of Mastery: begin with A, move through B and C after a configured number of successful items, then cycle controlled D items. The profile fixes quotas and eligible families; selection still uses anti-repetition. Practice outcomes continue to create ordinary Attempts at their actual categories/bands.

Mode eligibility belongs to a Skill + Challenge Profile combination, not merely a boolean on the Skill. The table's T/S columns are initial recommendations. Timed is removed from fraction simplification/expansion, decimal algorithms, and other procedures where current pedagogical value is accuracy/understanding rather than speed. Survival is limited to comparable short subsets.

## 15. Future roadmap areas

Add a future foundational Domain for `RATIO_PROPORTION_PERCENT` (ratio meaning, rates, proportion, percent meaning, percent of a quantity, and conversions) after the classroom MVP evidence is stable. It is not part of the current MVP. Later planning may cover roots/functions and geometry; this revision intentionally does not design those taxonomies.

## 16. Formal dependency and access principle

Prerequisites and supporting Skills are pedagogical metadata for recommendation, diagnostic interpretation, and teacher planning. They are not curriculum locks. Students and teachers may open any available Skill. A core prerequisite indicates that misunderstanding it is likely to undermine the target concept; a supporting Skill predicts friction or identifies a useful intervention without being logically required. Difficulty-band dependencies should be recorded on the relevant band/profile rather than incorrectly attached to the entire Skill—for example, negative-number substitution requires signed arithmetic only in later bands.

## 17. Formal three-layer product model

Atomic Math is one evidence system presented through three deliberately different product layers. The governing principle is: **complex inside, simple outside**.

### A. Pedagogical layer

This internal layer may be rich and complex. It records and derives atomic Skills, student-facing Skill Groups, core prerequisites and supporting Skills, difficulty-band coverage, question-category coverage, evidence quantity and coverage, fluency, misconception data, Attempt history, Challenge Profiles, and diagnostic confidence. It is the source for recommendations, assignment completion, Quick Practice selection, and future next-question decisions.

Preserve these dimensions rather than collapsing them into one lossy field. All derive from the same underlying Attempts and content metadata, but numerical Mastery, Evidence Coverage, fluency, and diagnostic confidence remain distinct.

### B. Student experience layer

The student experience is intentionally simple and motivational. It should usually answer “what do I do now?” and show one understandable 0–100 progress/Mastery score, simple status labels, visible improvement, personal bests, clear goals, minimal choices, and positive self-comparison challenges.

Do **not** expose evidence matrices, prerequisite graphs, category-coverage rules, diagnostic-confidence calculations, or detailed band analytics. Internal coverage can influence recommendations, assignment completion, and what appears next without making the interface punitive or confusing. A student may see 92% while the pedagogical layer still records incomplete conceptual or higher-band evidence; the UI should translate that into a constructive next action rather than contradicting the score.

### C. Teacher experience layer

Future teacher tools may expose atomic Skill mastery, Skill Group summaries, accuracy, fluency, evidence and difficulty coverage, misconception patterns, recent progress, prerequisite/supporting weaknesses, assignment status, diagnostic confidence, and recommended interventions. Preserve as much useful evidence as practical now even though no teacher dashboard is implemented in this phase.

### Product distinction

Student-facing progress is motivational. Teacher-facing data is diagnostic. Pedagogical evidence is the internal source for recommendations. All three layers derive from the same Attempts, but they intentionally present different levels of complexity and do not need identical views or labels.
