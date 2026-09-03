# Phase 7B classroom content review

This artifact is a human-readable review surface for the foundational MVP. Source readiness flags are explicit and are never changed by the validation command. A reviewer should inspect the rendered app on a narrow mobile viewport as well as the representative items below before changing any `humanReviewed` flag.

## Review checklist

- Hebrew is concise, age-appropriate, and unambiguous.
- Mathematical notation remains readable left-to-right inside the Hebrew interface.
- Every choice has one intended answer; distractors are distinct and genuinely wrong.
- The declared category and A/B/C band match the thinking required, not only number size.
- Timed items are short calculations; Survival items are short and self-contained.
- Fraction and number-line representations remain understandable without color.

## Representative conceptual prompts

| Atomic Skill | Category | Band | Representative prompt | Intended evidence |
|---|---|---:|---|---|
| `AR_PLACE_VALUE` | representation | A | What is the value of 4 in 400? | digit value, not digit name |
| `AR_MUL_F_2_5_10` | conceptual | A | Which check uses the inverse operation? | fact-family relationship |
| `AR_DIV_F_3_4` | conceptual | B | Which check uses the inverse operation? | division as related multiplication |
| `INT_NUMBER_LINE` | representation | A | Which number is 4 steps left of zero? | direction and signed location |
| `INT_COMPARE` | reasoning | B | Which is greater: −5 or −6? | signed comparison without calculation |
| `INT_NEGATION` | conceptual | A | What is the opposite of −7? | opposite versus subtraction |
| `FRAC_MEANING` | representation | A | A whole has 5 equal parts and 2 are selected. Which fraction represents it? | part-whole meaning |
| `FRAC_EQUIV` | reasoning | B | Which fraction is equivalent to 3/5? | multiplicative equivalence |
| `ALG_EQUALITY` | conceptual | A | Which equality statement is true? | equals means same value on both sides |
| `ALG_VARIABLE` | conceptual | A | In 3x, what can x represent? | variable as a value, not an operation sign |
| `EQ_ADD` | reasoning | B | Which value completes □ + 4 = 11? | maintain equality with an unknown |
| `EQ_MUL` | reasoning | B | Which value completes 3 × □ = 18? | multiplication/division relationship |

## Generator sampling review

Run `npm run validate-content` for 100 deterministic seeds per generator. For a focused visual review, open the playground or a normal session and inspect several items from every atomic Skill/category/band. The validator checks construction, variety, option uniqueness, answer presence and answer-position balance; it does not replace teacher judgment and does not mutate readiness metadata.

## Phase 7B.0 normalization audit

The pre-change active bank contained 580 definitions: 94 generated definitions, 486 curated fixed single-choice items, and 0 fixed numeric items. Routine numeric practice was already generated, so Phase 7B.0 did not claim or perform a fixed-numeric conversion. It retained the 94 generator identities and removed 152 repetitive curated variations from `mixed` Skills. The post-change bank contains 428 definitions: 94 generated, 334 curated fixed, and 0 fixed numeric.

Every active definition now declares `authoringMode` and a stable `contentFamily`. Curated definitions also declare `curationReason`; each distractor carries a named `misconceptionId`. Generated definitions declare exact answer semantics, a pedagogical structure name, and separate number ranges for fact-family bands A and B. Existing retained definition IDs remain unchanged. Removed IDs need no migration: historical `Attempt.questionId` values remain valid historical evidence, while challenge and mastery identity continue to use stable Skill/Domain IDs rather than question-bank membership.

`npm run validate-content` treats exact duplicates, incomplete authoring intent, invalid options, incorrect generated answers, non-reproducible seeds, band mismatches, rejected seeds, insufficient variety, and anti-repetition failures as blocking issues. Numeric-normalized near-identical curated families are reported as non-blocking review warnings with Skill, family, count, and representative IDs. They remain warnings because repeated wording can be pedagogically intentional in `fixedHeavy` content and still requires teacher judgment.

### Current per-Skill review surface

All rows retain `humanReviewed: true`; Phase 7B.0 did not auto-approve new content. “mixed” rows contain both `generated` calculation and `curated` conceptual/reasoning evidence. “fixedHeavy” rows intentionally remain curated-only.

| Skill | Generated | Curated fixed | Category coverage | Band coverage | Authoring mode | Readiness | Remaining review gap |
|---|---:|---:|---|---|---|---|---|
| `AR_PLACE_VALUE` | 0 | 18 | conceptual:9, representation:9 | A:6, B:7, C:5 | curated / fixedHeavy | ready | Review normalized wording families |
| `AR_ADD_FACTS` | 4 | 10 | calculation:4, conceptual:10 | A:7, B:7 | generated + curated / mixed | ready | Review missing-number distractors |
| `AR_SUB_FACTS` | 4 | 10 | calculation:4, conceptual:5, reasoning:5 | A:7, B:7 | generated + curated / mixed | ready | Review inverse-operation wording |
| `AR_MUL_F_2_5_10` | 4 | 10 | calculation:4, conceptual:5, reasoning:5 | A:7, B:7 | generated + curated / mixed | ready | Visual family review |
| `AR_MUL_F_3_4` | 4 | 10 | calculation:4, conceptual:5, reasoning:5 | A:7, B:7 | generated + curated / mixed | ready | Visual family review |
| `AR_MUL_F_6_7` | 4 | 10 | calculation:4, conceptual:5, reasoning:5 | A:7, B:7 | generated + curated / mixed | ready | Visual family review |
| `AR_MUL_F_8_9` | 4 | 10 | calculation:4, conceptual:5, reasoning:5 | A:7, B:7 | generated + curated / mixed | ready | Visual family review |
| `AR_DIV_F_2_5_10` | 4 | 10 | calculation:4, conceptual:5, reasoning:5 | A:7, B:7 | generated + curated / mixed | ready | Review normalized division stories |
| `AR_DIV_F_3_4` | 4 | 10 | calculation:4, conceptual:5, reasoning:5 | A:7, B:7 | generated + curated / mixed | ready | Review normalized division stories |
| `AR_DIV_F_6_7` | 4 | 10 | calculation:4, conceptual:5, reasoning:5 | A:7, B:7 | generated + curated / mixed | ready | Review normalized division stories |
| `AR_DIV_F_8_9` | 4 | 10 | calculation:4, conceptual:5, reasoning:5 | A:7, B:7 | generated + curated / mixed | ready | Review normalized division stories |
| `AR_FACTORS_MULTIPLES` | 6 | 10 | calculation:6, conceptual:4, reasoning:6 | A:5, B:5, C:6 | generated + curated / mixed | ready | Review factor/multiple language |
| `OPS_ORDER_BASIC` | 6 | 10 | calculation:6, conceptual:10 | A:5, B:5, C:6 | generated + curated / mixed | ready | Add richer reasoning later |
| `INT_NUMBER_LINE` | 0 | 18 | conceptual:9, representation:9 | A:6, B:7, C:5 | curated / fixedHeavy | ready | Review representation variety |
| `INT_COMPARE` | 0 | 18 | conceptual:9, reasoning:9 | A:6, B:7, C:5 | curated / fixedHeavy | ready | Review repeated comparison forms |
| `INT_NEGATION` | 0 | 18 | conceptual:9, reasoning:9 | A:6, B:7, C:5 | curated / fixedHeavy | ready | Review opposite/negative distinction |
| `INT_ADD` | 6 | 10 | calculation:6, conceptual:4, reasoning:6 | A:5, B:5, C:6 | generated + curated / mixed | ready | Visual sign-case review |
| `INT_SUB` | 6 | 10 | calculation:6, conceptual:10 | A:5, B:5, C:6 | generated + curated / mixed | ready | Add richer reasoning later |
| `INT_MUL` | 6 | 10 | calculation:6, conceptual:4, reasoning:6 | A:5, B:5, C:6 | generated + curated / mixed | ready | Visual sign-case review |
| `INT_DIV` | 6 | 10 | calculation:6, conceptual:4, reasoning:6 | A:5, B:5, C:6 | generated + curated / mixed | ready | Visual exact-division review |
| `FRAC_MEANING` | 0 | 18 | conceptual:9, representation:9 | A:6, B:7, C:5 | curated / fixedHeavy | ready | Add graphical representations later |
| `FRAC_EQUIV` | 0 | 18 | reasoning:9, representation:9 | A:6, B:7, C:5 | curated / fixedHeavy | ready | Review equivalence distractors |
| `ALG_EQUALITY` | 0 | 18 | conceptual:9, reasoning:9 | A:6, B:7, C:5 | curated / fixedHeavy | ready | Review equality misconception coverage |
| `ALG_VARIABLE` | 0 | 18 | conceptual:9, reasoning:9 | A:6, B:7, C:5 | curated / fixedHeavy | ready | Review context variety |
| `ALG_SUBSTITUTE` | 6 | 10 | calculation:6, conceptual:10 | A:5, B:5, C:6 | generated + curated / mixed | ready | Add reasoning items later |
| `EQ_ADD` | 6 | 10 | calculation:6, conceptual:4, reasoning:6 | A:5, B:5, C:6 | generated + curated / mixed | ready | Review unknown-value distractors |
| `EQ_MUL` | 6 | 10 | calculation:6, conceptual:4, reasoning:6 | A:5, B:5, C:6 | generated + curated / mixed | ready | Review unknown-factor distractors |

### Future Question Review compatibility

The bank can now be consumed by a future review tool without implementing that tool in Phase 7B.0. Curated definitions have stable sequential IDs and explicit intent metadata. Generated definitions can be sampled deterministically by seed, with `baseId`, `contentFamily`, `structureKey`, sampled parameters, and computed answer available on the generated instance. Review should show curated items sequentially and generator samples by deterministic seed; it must never treat a single generated sample as the entire family.

## Deferred content

Multi-digit written algorithms, estimation, decimal content, fraction operations beyond equivalence, advanced order of operations, multi-step algebra/equations, coordinates, and the ratio/proportion/percent roadmap remain outside Phase 7B.

## First human content-review correction pass — 2026-09-03

The exported review contained 198 records: 195 `needs-fix`, 3 `approved`, and no `rejected` records. Empty notes adjacent to a noted definition were treated as family-level feedback. This pass does not import review status into `CONTENT_READINESS`; every structurally replaced family is tagged `requires-rereview` and must be reviewed again under its new generator IDs.

### Applied feedback themes

- Repeated fixed numeric conceptual variants were replaced with deterministic choice generators.
- `AR_ADD_FACTS` A/B magnitude ranges now progress from 0–10 to 10–20 instead of allowing the harder Band to routinely produce smaller operands.
- Multiplication uses concise concrete equal-group contexts and excludes the ambiguous `2 + 2 = 2 × 2` case.
- Division has separate equal-sharing and grouping families.
- `AR_SUB_FACTS` now tests subtraction-as-removal and the inverse addition relationship with explicit questions.
- Number-line wording explicitly says “משמאל לאפס על ציר המספרים”.
- Factors/multiples uses “איזה מהמספרים הבאים” and `multiChoice` when two answers are intended.
- `FRAC_MEANING` and both directions of `FRAC_EQUIV` are generated without duplicate or accidentally equivalent options.

### Review-ID migration

| Old reviewed IDs/family | Structural replacement | Re-review status |
|---|---|---|
| `MVP_AR_PLACE_VALUE_CONCEPT_1..18` | `MVP_AR_PLACE_VALUE_GEN_A/B/C` | Required |
| active `MVP_AR_ADD_FACTS_CONCEPT_*` | `MVP_AR_ADD_FACTS_MISSING_A/B`, `MVP_AR_ADD_FACTS_COMMUTE_A/B` | Required |
| active `MVP_AR_SUB_FACTS_CONCEPT_*` | `MVP_AR_SUB_FACTS_REMOVE_A/B`, `MVP_AR_SUB_FACTS_INVERSE_A/B` | Required |
| active `MVP_AR_MUL_F_*_CONCEPT_*` | `MVP_AR_MUL_F_*_CONTEXT_A/B` | Required |
| active `MVP_AR_DIV_F_*_CONCEPT_*` | `MVP_AR_DIV_F_*_SHARING_A/B`, `MVP_AR_DIV_F_*_GROUPING_A/B` | Required |
| active `MVP_AR_FACTORS_MULTIPLES_CONCEPT_*` | `MVP_AR_FACTORS_MULTIPLES_MULTI_A/B/C` | Required |
| active `MVP_OPS_ORDER_BASIC_CONCEPT_*` | `MVP_OPS_ORDER_BASIC_FIRST_A/B/C` | Required |
| `MVP_INT_NUMBER_LINE_CONCEPT_1..18` | `MVP_INT_NUMBER_LINE_LEFT_A/B/C` | Required |
| `MVP_FRAC_MEANING_CONCEPT_1..18` | `MVP_FRAC_MEANING_PARTS_A/B/C` | Required |
| `MVP_FRAC_EQUIV_CONCEPT_1..18` | `MVP_FRAC_EQUIV_FORWARD_A/B/C`, `MVP_FRAC_EQUIV_REVERSE_A/B/C` | Required |
| `MVP_AR_ADD_FACTS_A_A`, `MVP_AR_ADD_FACTS_B_A/B` | IDs retained; A/B parameter ranges corrected structurally | Required |

The 192 replaced curated IDs remain valid as historical `Attempt.questionId` values but are no longer active definitions. No automatic migration of local author-review records is performed.

### Preserved and deferred families

The approved definitions `MVP_INT_ADD_B_A`, `MVP_INT_ADD_C_A`, and `MVP_OPS_ORDER_BASIC_A_A` retain identical seed-42 expression/answer snapshots. Unreviewed families such as `INT_COMPARE`, `INT_NEGATION`, `ALG_EQUALITY`, `ALG_VARIABLE`, `ALG_SUBSTITUTE`, `EQ_ADD`, and `EQ_MUL` were intentionally left unchanged. Their existing near-identical-family warnings remain future review debt, not unresolved notes from this export.

### Inventory change

| Inventory | Before | After |
|---|---:|---:|
| Active definitions | 428 | 289 |
| Generated definitions | 94 | 147 |
| Curated fixed definitions | 334 | 142 |
| Fixed numeric definitions | 0 | 0 |

This removes 192 repeated fixed definitions and adds 53 reusable conceptual generators. The broad validator now samples 14,700 deterministic generated instances per run and checks generated choice option uniqueness, answer presence, distractor metadata, reproducibility, and semantic Band progression for magnitude-driven families.

## Global authoring-rule audit — 2026-09-03

The first human review established a bank-wide rule: routine numeric structure is generated; an exact fixed value is exceptional and must be justified. The entire active foundational bank was therefore audited, including Skills absent from the review export.

### Whole-bank result

| Measure | Before this audit | After this audit |
|---|---:|---:|
| Active definitions | 289 | 184 |
| Generated definitions | 147 | 183 |
| Curated definitions | 142 | 1 |
| Curated definitions containing numeric literals | 142 | 0 |
| Fixed numeric-answer definitions | 0 | 0 |

All 142 curated definitions containing literals were routine instantiations of reusable structures. They were replaced by 36 structural generator definitions. No fixed numeric item qualified for retention.

### Global ID migration

| Removed active IDs | Structural generator replacement |
|---|---|
| `MVP_INT_COMPARE_CONCEPT_1..18` | `MVP_INT_COMPARE_ADJACENT_NEGATIVES_A/B/C` |
| `MVP_INT_NEGATION_CONCEPT_1..18` | `MVP_INT_NEGATION_POSITIVE_A/B/C`, `MVP_INT_NEGATION_NEGATIVE_A/B/C` |
| active `MVP_INT_ADD_CONCEPT_*` | `MVP_INT_ADD_SIGN_CANCELLATION_A/B/C` |
| active `MVP_INT_SUB_CONCEPT_*` | `MVP_INT_SUB_NEGATIVE_REWRITE_A/B/C` |
| active `MVP_INT_MUL_CONCEPT_*` | `MVP_INT_MUL_SIGN_A/B/C` |
| active `MVP_INT_DIV_CONCEPT_*` | `MVP_INT_DIV_SIGN_A/B/C` |
| `MVP_ALG_EQUALITY_CONCEPT_1..18` | `MVP_ALG_EQUALITY_COMMUTATIVE_A/B/C` |
| numeric `MVP_ALG_VARIABLE_CONCEPT_1..18` variants | `MVP_ALG_VARIABLE_COEFFICIENT_A/B/C` |
| active `MVP_ALG_SUBSTITUTE_CONCEPT_*` | `MVP_ALG_SUBSTITUTE_LINEAR_A/B/C` |
| active `MVP_EQ_ADD_CONCEPT_*` | `MVP_EQ_ADD_MISSING_A/B/C` |
| active `MVP_EQ_MUL_CONCEPT_*` | `MVP_EQ_MUL_MISSING_A/B/C` |

The one retained curated definition is non-numeric:

| definitionId | curationReason | Justification |
|---|---|---|
| `MVP_ALG_VARIABLE_MEANING_CURATED` | `deliberate-example` | The wording itself tests the meaning of a variable in context; no arbitrary numeric value is embedded. |

There are no retained fixed numeric items and no remaining questionable curated numeric cases.

### Enforced authoring contract

`QuestionCurationReason` now uses the explicit values `misconception`, `edge-case`, `representation`, `regression`, `deliberate-example`, and `other`. `curationJustificationHe` records why fixed values or wording are essential. `validate-content` treats any curated numeric literal without both an approved reason and a substantive justification as a blocking error; generic explanations such as “convenient example” are rejected.

Constants that define a mathematical structure remain valid inside generators—for example zero in identity/sign distractors or one in a near-cancellation family. Fact values such as 2, 5, and 10 are part of the corresponding atomic Skill scope, not arbitrary fixed examples. The calculation generators for `OPS_ORDER_BASIC` and linear `ALG_SUBSTITUTE` were also parameterized so their former constant coefficients no longer function as magic numbers. The approved seed-42 `MVP_OPS_ORDER_BASIC_A_A` rendered expression remains `4+2*2`.
