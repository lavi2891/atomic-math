# Grade 8 Entry Content Build Plan — Pass 1

**CURRENT / AUTHORITATIVE IMPLEMENTATION BLUEPRINT — DESIGN ONLY.** Prepared 2026-09-06 against source commit `3fb2bd6` and the current executable catalog. This blueprint refines [GRADE8_CURRICULUM_ROADMAP.md](GRADE8_CURRICULUM_ROADMAP.md); the roadmap governs pedagogical direction, the [authoring standard](CONTENT_AUTHORING_STANDARD.md) governs content, and executable code determines implementation state. Proposed IDs, policies, families, readiness thresholds and waves below are not active code. Teacher decisions in section 15 remain open; no approval is inferred from this document's authoritative planning status.

## 1. Executive summary

Design **47 Entry-supporting atomic Skills: 26 retained IDs and 21 new IDs**. Of these, 46 serve the main Entry curriculum and one retained Skill, `AR_FACTORS_MULTIPLES`, remains optional supporting remediation. Retain the other current Skill, `AR_PLACE_VALUE`, outside this Entry taxonomy/main path, available for targeted remediation/free practice. This does not delete its content or history. Internally granular diagnosis supports a compact student presentation of A1–A10 and G1–G5, including four explicit arithmetic sprints rather than ten new sprint Skills.

The active bank has **27 ready Skills, 181 definitions (178 generated, three curated)**. This pass inspected the exported definitions, expression/prompt templates, choice builders, constraints, category/Band metadata, readiness and mode filters; it did not infer coverage from old plans or from generic parser capability. Ten current Skills have impossible category/Band requirements. Four advertised Timed Skills and fifteen advertised Survival Skills have no eligible definitions. Current arithmetic division displays also permit cancellation of a visible product, which is weaker evidence than direct quotient recall.

The largest additions are useful fraction operations, algebraic expression manipulation, multistep equations, coordinates/graphs and all Entry geometry. Retain the reviewed signed-number sign structures. Scope changes that preserve a mathematical identity use family/version/policy changes; a different target gets a new Skill ID. No historical Attempt is reassigned or credited to a new Skill.

### Compact chapter implementation map

| Roadmap | Proposed atomic targets | Current/new | Priority | Current content status | Renderer dependency | Wave |
|---|---|---|---|---|---|---|
| A1 | 10 arithmetic fact Skills; AR_FACTORS_MULTIPLES optional support | 11 reused | P4/P5; support P3 | Partial; strict sprints absent | KaTeX | Entry-A |
| A2 | FRAC_MEANING, FRAC_EQUIV, FRAC_COMPARE, FRAC_ADD_SUB, FRAC_MULTIPLY, FRAC_DIVIDE | 2 reused + 4 new | P4/P5 | Meaning/equivalence partial; operations absent | KaTeX + reviewed unit/line visuals | Entry-A |
| A3 | Seven current INT_* Skills | 7 reused | P5 | Mostly sufficient; direct line/role/division display gaps | Static signed line useful | Entry-A |
| A4 | OPS_ORDER_BASIC, OPS_POWERS, OPS_SQUARE_ROOTS | 1 reused + 2 new | P4/P5 | Precedence partial; powers/roots absent | KaTeX | Entry-A |
| A5–A6 | ALG_EQUALITY, ALG_VARIABLE, ALG_EXPRESSIONS, ALG_SUBSTITUTE | 3 reused + 1 new | P5 | Reading/replacement partial | KaTeX | Entry-B |
| A7 | ALG_LIKE_TERMS, ALG_DISTRIBUTE | 2 new | P5 | Absent | KaTeX, closed choices | Entry-B |
| A8 | EQ_ADD, EQ_MUL, EQ_LINEAR_STEPS; ALG_EQUALITY reused for meaning | 2 reused + 1 new; equality counted above | P5 | Only elementary additive/multiplicative subset | KaTeX; exact rational answers | Entry-B |
| A9 | COORD_READ_PLOT, COORD_MOVEMENT | 2 new | P5 | Absent | Coordinate SVG; static pilot | Entry-C |
| A10 | GRAPH_READ, FUNCTION_RELATIONS | 2 new | P5 | Absent | Graph SVG; static pilot | Entry-C |
| G1 | GEO_ANGLE_SENSE, GEO_DIAGRAM_LANGUAGE | 2 new | P5 | Absent | Static pilots + semantic Geometry SVG | Entry-D |
| G2 | GEO_ANGLE_RELATIONS | 1 new | P5 | Absent | Geometry SVG | Entry-D |
| G3 | GEO_PARALLEL_ANGLES | 1 new | P5 | Absent | Geometry SVG | Entry-D |
| G4 | GEO_TRIANGLE_PROPERTIES, GEO_TRIANGLE_ANGLES | 2 new | P5; exterior P3 optional | Absent | Geometry SVG | Entry-D |
| G5 | GEO_SPECIAL_SEGMENTS | 1 new | P5/P4; external altitude P3 optional | Absent | Geometry SVG | Entry-D |

The detailed item map in section 3 contains **167 numbered roadmap items plus four sprint rows**, including the two explicitly excluded A8 extensions. Counts are dated design counts, not executable activation claims. The proposed new Domains are COORDINATES, FUNCTION_FOUNDATIONS and GEOMETRY; proposed Groups organize presentation only and have no Mastery projection.

## 2. Scope, non-scope and reference basis

This is prerequisite recovery for weak/highly heterogeneous Israeli Grade 8 entry students, not a reproduction of every Grade 7 syllabus topic. P5 is highest pedagogical criticality; these priorities are independent of the dated audit's engineering P0/P1 issue priorities.

**Do not build in this Entry plan:** a decimal place-value course, long division, full decimal/percent/statistics/probability curriculum, ratio/proportion, linear-function formula techniques, inequalities, systems, binomial-by-binomial expansion, congruence, median, isosceles theorem work, similarity, Pythagoras (including all 3D variants), cylinder/3D geometry, quadrilateral theorem curriculum, free-form proofs, `M ∈ AB` or implication-symbol targets. They appear here only as exclusions or downstream justification. A8.16–17 (no/infinite solutions) are also out of Entry. Useful decimal values may later occur as supporting data, never as a concealed positional-structure course.

**Local government references.** Page numbers below are one-based PDF pages, with named sections to disambiguate extraction order. The local files span different revisions: the inspected `algebra_7.pdf` graph page visibly carries a June 2026 draft watermark, while `prisa7tashpav.pdf` is the 2025–26 teaching schedule. This pass does not claim every local PDF is a single currently binding syllabus. References verify prior encounter, terminology and dependencies; the supplied teacher roadmap selects the product backlog. Text extraction was checked against rendered pages for the equation/graph schedule and representative algebra/geometry tables.

| Ref | Local file/pages/section | Verified fact used here | Product interpretation |
|---|---|---|---|
| N7 | [numerical_7_8.pdf](gov-docs/numerical_7_8.pdf#page=1), pp. 1–3, 12–14, 21, 38–42; number/coordinate/power sections | The numerical progression connects first-quadrant coordinates, signed numbers, all quadrants, natural powers and positive square roots. The introduction assumes earlier positive-operation knowledge. | Recover missing elementary arithmetic even where the syllabus assumes it; signed meaning supports coordinate extension. |
| A7 | [algebra_7.pdf](gov-docs/algebra_7.pdf#page=2), pp. 2–3, 18–19, 21, 27–28, 33–37; expressions/equations/graph reading | Variables, substitution, equality, like terms, distribution, candidate-solution checking and first-degree equations precede graph interpretation. | Separate reading/replacement from operations; retain equation meaning as well as procedure. |
| S7a | [prisa7tashpav.pdf](gov-docs/prisa7tashpav.pdf#page=2), pp. 2–4; September–November | Explicit coefficient multiplication, the unit coefficient, like terms, simple equations, right-triangle vocabulary and altitudes occur in the Grade 7 schedule. | Hidden coefficient and diagram language are Entry bottlenecks; no extra Grade 8 theorem is needed to justify them. |
| S7b | [prisa7tashpav.pdf](gov-docs/prisa7tashpav.pdf#page=7), pp. 7–9; February–April | Equations with both-side unknowns/simple fractions, angle bisector/linear pairs/vertical angles, coordinates, graph/table reading, parallel-angle equalities and triangle sum are listed. The April parallel rule excludes the converse. | Keep fraction applications under equations; teach alternate/corresponding equality from given parallelism, not proving the converse. |
| G7 | [geometry_7.pdf](gov-docs/geometry_7.pdf#page=2), pp. 2–3, 12–13, 19–20, 32–33, 40–42; angles/triangle/altitude sections | Angle meaning, bisector, vertical/adjacent angles and triangle/altitude work provide prior-language context. This version also includes Pythagoras/3D topics in its table. | Use the relevant language/angle facts; explicitly reject importing the wider table into Entry. Pythagoras and 3D remain excluded by teacher priority. |
| A8/G8 | [algebra_8.pdf](gov-docs/algebra_8.pdf#page=2), p. 2 topic table; [geometry_8.pdf](gov-docs/geometry_8.pdf#page=2), pp. 1–2 and 28–31 | Algebra builds on Grade 7; the geometry document introduces subsequent triangle-segment and congruence work. | Downstream dependency only; no A11+/G6+ content cards. |
| D9 | [math_7_8_9.pdf](gov-docs/math_7_8_9.pdf#page=103), pp. 103–105 and 109–115; powers/roots, quadratic function and deductive geometry | Later work relies on powers/roots, algebraic/function representations and earlier diagram/angle knowledge. | Prioritize the Entry foundations without importing Grade 9 techniques or proof notation. |

Arithmetic fact bounds and the detailed fraction recovery sequence are **teacher/product design choices**, not claims that the local secondary PDFs enumerate a remedial primary-school bank. Likewise A10.15 is the roadmap's minimal preparation for function learning; it does not license teaching the Grade 8 linear-function chapter early.

## 3. Current executable coverage and item-by-item gaps

Source inspection: [catalog Skills/policies](../src/content/catalog/skills.ts), [policies](../src/content/catalog/policies.ts), [challenge profiles](../src/content/catalog/challengeProfiles.ts), [active definitions](../src/content/foundations/questions.ts), [readiness](../src/content/readiness.ts), [learning paths](../src/content/learningPaths.ts), [question types](../src/domain/questions/types.ts), [generator pipeline](../src/domain/questions/generator/buildGeneratedQuestion.ts), [Mastery projection](../src/domain/mastery/projectMastery.ts), [mode filtering](../src/domain/session/challengeContent.ts) and [validator entry point](../scripts/validate-content.ts). All 27 readiness manifests currently pass; that is not proof that every EvidencePolicy or advertised mode is reachable.

### Current family inventory

Family names below are actual exported `contentFamily` values (shown without their repeated Skill prefix). A/B/C list available Bands, not a claim that every family has every Band. Concrete definition IDs and range findings are called out in the sprint audit and item map. Generator support for rationals/powers elsewhere in the code is not counted as active coverage.

| Current Skill | Definitions | Actual active families (prefix is Skill ID) | Categories / Bands | Timed / Survival eligible definitions |
|---|---|---|---|---|
| AR_PLACE_VALUE | 6 | compose-expanded-number; decompose-standard-number | representation / A,B,C | 0 / 0 |
| AR_ADD_FACTS | 8 | two-addend-sum; related-three-addend-sum; missing-addend; commutative-equivalence | calculation, conceptual, reasoning / A,B | 4 / 4 |
| AR_SUB_FACTS | 6 | nonnegative-difference; adjusted-minuend-difference; subtraction-as-removal | calculation, conceptual / A,B | 4 / 4 |
| AR_MUL_F_2_5_10 | 6 | fact-family-product; commuted-product; concrete-equal-groups | calculation, representation / A,B | 4 / 4 |
| AR_MUL_F_3_4 | 6 | fact-family-product; commuted-product; concrete-equal-groups | calculation, representation / A,B | 4 / 4 |
| AR_MUL_F_6_7 | 6 | fact-family-product; commuted-product; concrete-equal-groups | calculation, representation / A,B | 4 / 4 |
| AR_MUL_F_8_9 | 6 | fact-family-product; commuted-product; concrete-equal-groups | calculation, representation / A,B | 4 / 4 |
| AR_DIV_F_2_5_10 | 8 | exact-fact-family-quotient; grouping-preserving-quotient; equal-sharing; grouping | calculation, conceptual, reasoning / A,B | 4 / 4 |
| AR_DIV_F_3_4 | 8 | exact-fact-family-quotient; grouping-preserving-quotient; equal-sharing; grouping | calculation, conceptual, reasoning / A,B | 4 / 4 |
| AR_DIV_F_6_7 | 8 | exact-fact-family-quotient; grouping-preserving-quotient; equal-sharing; grouping | calculation, conceptual, reasoning / A,B | 4 / 4 |
| AR_DIV_F_8_9 | 8 | exact-fact-family-quotient; grouping-preserving-quotient; equal-sharing; grouping | calculation, conceptual, reasoning / A,B | 4 / 4 |
| AR_FACTORS_MULTIPLES | 12 | multiple-as-product; next-multiple-as-product; identify-multiples; identify-factors | calculation, conceptual / A,B,C | 0 / 6 |
| OPS_ORDER_BASIC | 11 | multiplication-before-leading-addition; multiplication-before-trailing-addition; identify-first-operation; same-precedence-left-to-right | calculation, conceptual / A,B,C | 0 / 6 |
| INT_NUMBER_LINE | 4 | left-of-zero; cross-zero-left-move; left-move-decreases-value | representation, conceptual / A,B,C | 0 / 0 |
| INT_COMPARE | 4 | signed-comparison; negative-versus-positive | conceptual, reasoning / A,B,C | 0 / 0 |
| INT_NEGATION | 3 | opposite-number-structure; zero-is-self-opposite | conceptual / A,B | 0 / 0 |
| INT_ADD | 11 | negative-plus-positive-positive-result; negative-plus-positive-negative-result; negative-plus-negative; opposites-result-zero | calculation, conceptual, reasoning / A,B,C | 0 / 0 |
| INT_SUB | 13 | positive-minus-negative; positive-minus-larger-positive; negative-minus-positive; negative-minus-negative; subtract-negative-as-addition | calculation, conceptual / A,B,C | 0 / 0 |
| INT_MUL | 8 | negative-times-positive; positive-times-negative; negative-times-negative; multiplication-sign-rules | calculation, conceptual / A,B | 0 / 0 |
| INT_DIV | 5 | negative-divided-by-positive; positive-divided-by-negative; negative-divided-by-negative; division-sign-rules | calculation, conceptual / A,B | 0 / 0 |
| FRAC_MEANING | 7 | selected-equal-parts; numerator-meaning; denominator-meaning; fraction-of-a-set; fraction-on-number-line | conceptual, representation / A,B,C | 0 / 0 |
| FRAC_EQUIV | 6 | expand-equivalent-fraction; simplify-equivalent-fraction | representation, reasoning / A,B,C | 0 / 0 |
| ALG_EQUALITY | 4 | noncanonical-equality; missing-value-both-sides; equal-expression-relation; equals-as-relation-misconception | conceptual, reasoning / A,B,C | 0 / 0 |
| ALG_VARIABLE | 5 | variable-concepts; contextual-variable-meaning; contextual-variable-value | conceptual, reasoning / A,B,C | 0 / 0 |
| ALG_SUBSTITUTE | 4 | substitution-abstraction; meaning-of-substitution | calculation, representation, conceptual / A,B,C | 0 / 0 |
| EQ_ADD | 4 | additive-equation-abstraction; missing-addend-inverse-operation | calculation, reasoning, conceptual / A,B,C | 0 / 0 |
| EQ_MUL | 4 | multiplicative-equation-abstraction; missing-factor-inverse-operation | calculation, reasoning, conceptual / A,B,C | 0 / 0 |

### Classification contract

- **COVERED_EXACTLY:** the active family assesses the numbered mathematical target; this does not certify modes, final fluency or human-review completion.
- **COVERED_PARTIALLY:** meaningful target evidence exists, but a specified structure, representation, direction or range is missing.
- **EXISTING_SKILL_NEEDS_NEW_FAMILY:** target identity already fits, but the requested distinction lacks direct evidence.
- **EXISTING_SKILL_SCOPE_SHOULD_EXPAND:** a bounded related subtarget should be explicitly added to the current identity and policy; earlier evidence does not automatically certify it.
- **NEW_SKILL_REQUIRED:** independent diagnostic target absent from the executable catalog.
- **STAGE_ONLY_NOT_NEW_SKILL:** presentation/profile composition over atomic Skills.
- **INFRASTRUCTURE_BLOCKED:** the requested unconstrained plotting interaction cannot be claimed using the current question types; a closed-position proxy is separately specified.
- **OUT_OF_ENTRY_SCOPE:** intentionally deferred even if numbered near Entry items.

Renderer codes: **K** = existing KaTeX; **S** = reviewed static visual sufficient; **C** = coordinate/graph SVG required for scalable generation (static pilot possible); **G** = semantic Geometry SVG required for scalable generation (static pilot possible). C/G do not mean a renderer exists. All are described in section 11. Existing/new ID status is explicit in the card and reuse matrices; every row below names current evidence or its absence.

### A1 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| A1.1 — חיבור בסיסי — P4 | AR_ADD_FACTS | COVERED_PARTIALLY | AR_ADD_FACTS:two-addend-sum; related-three-addend-sum; missing-addend; commutative-equivalence. Direct sums and inverse/commutative evidence; B operands are each 10–20. | Reuse ID; bound sprint sum to 20, add crossing-ten control, omit three-addend tasks and prose. | P4 | K | Entry-A |
| A1.2 — חיסור בסיסי — P4 | AR_SUB_FACTS | COVERED_PARTIALLY | AR_SUB_FACTS:nonnegative-difference; adjusted-minuend-difference; subtraction-as-removal. Direct nonnegative difference plus removal meaning; B has both operands 10–20. | Reuse; add genuine crossing-ten differences (e.g. 16-7), subtract-zero and calculation-only sprint form. | P4 | K | Entry-A |
| A1.3 — כפל — P5 | AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | COVERED_PARTIALLY | Each AR_MUL_F_*:fact-family-product; commuted-product; concrete-equal-groups. Anchors and partners 1–10, both orders, equal-group representation. | Reuse all four IDs; add zero/identity coverage and conceptual check; current prose prefix prevents strict sprint readiness. | P5 | K | Entry-A |
| A1.4 — חילוק — P5 | AR_DIV_F_2_5_10, AR_DIV_F_3_4, AR_DIV_F_6_7, AR_DIV_F_8_9 | COVERED_PARTIALLY | Each AR_DIV_F_*:exact-fact-family-quotient; grouping-preserving-quotient; equal-sharing; grouping. Constructed product divided by its factor; sharing/grouping meaning. | Reuse four IDs; displayed dividend must be one number, not a product that exposes cancellation. Add direct quotient family. | P5 | K | Entry-A |
| A1.F-add — required arithmetic sprint | AR_ADD_FACTS | STAGE_ONLY_NOT_NEW_SKILL | A1 calculation families above. Existing timed profile is not an authored mandatory sprint. | Add an explicit calculation-only Stage/profile later, retaining atomic evidence; pilot determines speed thresholds. | P5 | K | Entry-A |
| A1.F-subtract — required arithmetic sprint | AR_SUB_FACTS | STAGE_ONLY_NOT_NEW_SKILL | A1 calculation families above. Existing timed profile is not an authored mandatory sprint. | Add an explicit calculation-only Stage/profile later, retaining atomic evidence; pilot determines speed thresholds. | P5 | K | Entry-A |
| A1.F-multiply — required arithmetic sprint | AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | STAGE_ONLY_NOT_NEW_SKILL | A1 calculation families above. Existing timed profile is not an authored mandatory sprint. | Add an explicit calculation-only Stage/profile later, retaining atomic evidence; pilot determines speed thresholds. | P5 | K | Entry-A |
| A1.F-divide — required arithmetic sprint | AR_DIV_F_2_5_10, AR_DIV_F_3_4, AR_DIV_F_6_7, AR_DIV_F_8_9 | STAGE_ONLY_NOT_NEW_SKILL | A1 calculation families above. Existing timed profile is not an authored mandatory sprint. | Add an explicit calculation-only Stage/profile later, retaining atomic evidence; pilot determines speed thresholds. | P5 | K | Entry-A |

### A2 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| A2.1 — משמעות בסיסית | FRAC_MEANING | COVERED_PARTIALLY | FRAC_MEANING:selected-equal-parts; numerator-meaning; denominator-meaning; fraction-of-a-set; fraction-on-number-line. Equal parts and set meaning; one actual KaTeX number-line family. | Reuse; add quotient meaning and visual equal-unit contrasts, reduce reliance on verbal naming. | P4 | S | Entry-A |
| A2.2 — שברים שקולים — P5 | FRAC_EQUIV | COVERED_EXACTLY | FRAC_EQUIV:expand-equivalent-fraction; simplify-equivalent-fraction. Forward/reverse, missing entry and full reduction; structural A/B/C. | Reuse both families; no separate expansion/reduction IDs. Policy still lacks conceptual evidence; see mismatch matrix. | P5 | K | Entry-A |
| A2.3 — קטן / שווה / גדול מ־1 — P4 | FRAC_MEANING | EXISTING_SKILL_NEEDS_NEW_FAMILY | FRAC_MEANING:selected-equal-parts; fraction-on-number-line. Existing emphasis is selected parts/unit interval; not systematic <,=,>1. | Add benchmark-one and line beyond one; same value/whole target. | P4 | S | Entry-A |
| A2.4 — השוואת שברים — P4 | FRAC_COMPARE | NEW_SKILL_REQUIRED | Related FRAC_EQUIV families only. No active fraction-order family. | New order identity; same denominator/numerator/related/unrelated denominator structures. | P4 | S | Entry-A |
| A2.5 — חיבור בעלי אותו מכנה — P5 | FRAC_ADD_SUB | NEW_SKILL_REQUIRED | None; FRAC_EQUIV is supporting only. No active fraction-operation evidence. | New additive-unit identity; separate add same denominator family, not a new Skill for each direction. | P5 | K | Entry-A |
| A2.6 — חיסור בעלי אותו מכנה — P5 | FRAC_ADD_SUB | NEW_SKILL_REQUIRED | None; FRAC_EQUIV is supporting only. No active fraction-operation evidence. | New additive-unit identity; separate subtract same denominator family, not a new Skill for each direction. | P5 | K | Entry-A |
| A2.8 — חיבור במכנים שונים — P5 | FRAC_ADD_SUB | NEW_SKILL_REQUIRED | None; FRAC_EQUIV is supporting only. No active fraction-operation evidence. | New additive-unit identity; separate add unlike denominators family, not a new Skill for each direction. | P5 | K | Entry-A |
| A2.9 — חיסור במכנים שונים — P5 | FRAC_ADD_SUB | NEW_SKILL_REQUIRED | None; FRAC_EQUIV is supporting only. No active fraction-operation evidence. | New additive-unit identity; separate subtract unlike denominators family, not a new Skill for each direction. | P5 | K | Entry-A |
| A2.7 — מציאת מכנה משותף פשוט — P5 | FRAC_EQUIV | EXISTING_SKILL_SCOPE_SHOULD_EXPAND | FRAC_EQUIV:expand-equivalent-fraction; AR_FACTORS_MULTIPLES:identify-multiples. Can scale one fraction or identify multiples; no pair of equivalent fractions sharing a denominator. | Add common-denominator-pair under value preservation; no standalone LCM Skill. | P5 | K | Entry-A |
| A2.10 — מספר שלם כפול שבר — P5 | FRAC_MULTIPLY | NEW_SKILL_REQUIRED | None; arithmetic fact families are supporting only. No active whole number by fraction evidence. | New operation identity with a distinct whole number by fraction family; reuse arithmetic calculations only as support. | P5 | K | Entry-A |
| A2.11 — שבר כפול שבר — P4 | FRAC_MULTIPLY | NEW_SKILL_REQUIRED | None; arithmetic fact families are supporting only. No active fraction by fraction evidence. | New operation identity with a distinct fraction by fraction family; reuse arithmetic calculations only as support. | P4 | K | Entry-A |
| A2.12 — הופכי — P4 | FRAC_DIVIDE | NEW_SKILL_REQUIRED | None; arithmetic fact families are supporting only. No active reciprocal through product one evidence. | New operation identity with a distinct reciprocal through product one family; reuse arithmetic calculations only as support. | P4 | K | Entry-A |
| A2.13 — חילוק שברים — P4 | FRAC_DIVIDE | NEW_SKILL_REQUIRED | None; arithmetic fact families are supporting only. No active division via reciprocal of divisor evidence. | New operation identity with a distinct division via reciprocal of divisor family; reuse arithmetic calculations only as support. | P4 | K | Entry-A |
| A2.14 — סימן שלילי בשבר — P5 | FRAC_EQUIV | EXISTING_SKILL_SCOPE_SHOULD_EXPAND | FRAC_EQUIV:forward/reverse positive scaling; INT_NEGATION:opposite-number-structure. Signed meaning exists for integers, not equivalent placements of a fraction sign. | Add signed-equivalence family and INT_NEGATION/INT_MUL support; keep fraction value preservation as target. | P5 | K | Entry-A |

### A3 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| A3.1 — חיובי / שלילי / אפס | INT_NUMBER_LINE | EXISTING_SKILL_NEEDS_NEW_FAMILY | INT_NUMBER_LINE:left-of-zero; left-move-decreases-value. Negative direction is used, but explicit positive/negative/zero classification is not systematically assessed. | Add sign-zero-classification; retain existing families. | P5 | K | Entry-A |
| A3.2 — סדר: שלילי לעומת חיובי | INT_COMPARE | COVERED_EXACTLY | INT_COMPARE:negative-versus-positive; signed-comparison A. Negative versus positive and versus zero are explicit. | Sufficient as-is for this item; retain RTL ordering and add no Skill. | P5 | K | Entry-A |
| A3.3 — סדר בין שני שליליים | INT_COMPARE | COVERED_EXACTLY | INT_COMPARE:signed-comparison B/C. Adjacent and larger-magnitude negative comparisons with constrained order. | Sufficient as-is; broader symmetric distractor presentation can be audited later without redesign. | P5 | K | Entry-A |
| A3.4 — ציר המספרים | INT_NUMBER_LINE | COVERED_PARTIALLY | INT_NUMBER_LINE:left-of-zero; cross-zero-left-move; left-move-decreases-value. Verbal leftward locations/crossing zero and direction concept. | Reuse; add visible position reading and rightward movement so drawing, not just prose, is assessed. | P5 | S | Entry-A |
| A3.5 — מספר נגדי | INT_NEGATION | COVERED_EXACTLY | INT_NEGATION:opposite-number-structure; zero-is-self-opposite. Opposite of positive, negative and zero. | Sufficient as-is; policy C/reasoning mismatch must not cause invented content. | P5 | K | Entry-A |
| A3.6 — שתי המשמעויות של מינוס | INT_NEGATION | EXISTING_SKILL_NEEDS_NEW_FAMILY | INT_NEGATION:opposite-number-structure; INT_SUB:subtract-negative-as-addition. Unary/binary meanings occur separately but are not contrasted. | Add minus-role-contrast; no new identity. | P5 | K | Entry-A |
| A3.7 — שלילי + חיובי → תוצאה חיובית | INT_ADD | COVERED_EXACTLY | INT_ADD:negative-plus-positive-positive-result. Explicit sign and magnitude constraints enforce the requested result pattern. | Sufficient as-is; preserve reviewed structural family. | P5 | K | Entry-A |
| A3.8 — שלילי + חיובי → תוצאה שלילית | INT_ADD | COVERED_EXACTLY | INT_ADD:negative-plus-positive-negative-result. Explicit sign and magnitude constraints enforce the requested result pattern. | Sufficient as-is; preserve reviewed structural family. | P5 | K | Entry-A |
| A3.9 — שלילי + שלילי | INT_ADD | COVERED_EXACTLY | INT_ADD:negative-plus-negative. Explicit sign and magnitude constraints enforce the requested result pattern. | Sufficient as-is; preserve reviewed structural family. | P5 | K | Entry-A |
| A3.10 — נגדיים שסכומם 0 | INT_ADD | COVERED_EXACTLY | INT_ADD:opposites-result-zero. Explicit zero-sum pair. | Sufficient as-is; preserve reviewed structural family. | P5 | K | Entry-A |
| A3.11 — זיהוי זוג נגדיים בתוך ביטוי קצר | INT_ADD | COVERED_EXACTLY | INT_ADD:opposites-result-zero. Existing MVP_INT_ADD_OPPOSITES_B cancels nonadjacent opposite terms while preserving the middle term. | Sufficient as-is; preserve reviewed structural family. | P5 | K | Entry-A |
| A3.12 — חיובי − חיובי גדול ממנו | INT_SUB | COVERED_EXACTLY | INT_SUB:positive-minus-larger-positive. Explicit operand signs and result constraints. | Sufficient as-is; reuse, with short-profile review separate from content identity. | P5 | K | Entry-A |
| A3.13 — חיובי − שלילי | INT_SUB | COVERED_EXACTLY | INT_SUB:positive-minus-negative. Explicit operand signs and result constraints. | Sufficient as-is; reuse, with short-profile review separate from content identity. | P5 | K | Entry-A |
| A3.14 — שלילי − חיובי | INT_SUB | COVERED_EXACTLY | INT_SUB:negative-minus-positive. Explicit operand signs and result constraints. | Sufficient as-is; reuse, with short-profile review separate from content identity. | P5 | K | Entry-A |
| A3.15 — שלילי − שלילי | INT_SUB | COVERED_EXACTLY | INT_SUB:negative-minus-negative. Explicit operand signs and result constraints. | Sufficient as-is; reuse, with short-profile review separate from content identity. | P5 | K | Entry-A |
| A3.16 — חיסור של שלילי = חיבור הנגדי | INT_SUB | COVERED_EXACTLY | INT_SUB:subtract-negative-as-addition. Explicit inverse-addition conceptual rewrite. | Sufficient as-is; reuse, with short-profile review separate from content identity. | P5 | K | Entry-A |
| A3.17 — שלילי כפול חיובי | INT_MUL | COVERED_EXACTLY | INT_MUL:negative-times-positive. Concrete A and deliberate mental-factor B. | Sufficient as-is; preserve sign patterns and remove impossible C policy quota later. | P5 | K | Entry-A |
| A3.18 — חיובי כפול שלילי | INT_MUL | COVERED_EXACTLY | INT_MUL:positive-times-negative. Concrete A and deliberate mental-factor B. | Sufficient as-is; preserve sign patterns and remove impossible C policy quota later. | P5 | K | Entry-A |
| A3.19 — שלילי כפול שלילי | INT_MUL | COVERED_EXACTLY | INT_MUL:negative-times-negative. Concrete A and deliberate mental-factor B. | Sufficient as-is; preserve sign patterns and remove impossible C policy quota later. | P5 | K | Entry-A |
| A3.20 — קביעת סימן מכפלה ללא חישוב מלא | INT_MUL | COVERED_EXACTLY | INT_MUL:multiplication-sign-rules. Numeric and symbolic sign-only families. | Sufficient as-is; preserve sign patterns and remove impossible C policy quota later. | P5 | K | Entry-A |
| A3.21 — שלילי ÷ חיובי | INT_DIV | COVERED_PARTIALLY | INT_DIV:negative-divided-by-positive. Correct explicit signs and exact result construction, but the numerator shows the factor product. | Reuse sign logic; new direct numerical-dividend display family needed to demonstrate unaided division. | P5 | K | Entry-A |
| A3.22 — חיובי ÷ שלילי | INT_DIV | COVERED_PARTIALLY | INT_DIV:positive-divided-by-negative. Correct explicit signs and exact result construction, but the numerator shows the factor product. | Reuse sign logic; new direct numerical-dividend display family needed to demonstrate unaided division. | P5 | K | Entry-A |
| A3.23 — שלילי ÷ שלילי | INT_DIV | COVERED_PARTIALLY | INT_DIV:negative-divided-by-negative. Correct explicit signs and exact result construction, but the numerator shows the factor product. | Reuse sign logic; new direct numerical-dividend display family needed to demonstrate unaided division. | P5 | K | Entry-A |
| A3.24 — קביעת סימן מנה | INT_DIV | COVERED_EXACTLY | INT_DIV:division-sign-rules. A/B sign-only evidence including symbolic conditions. | Sufficient as-is; A for gateway, B optional after algebra language. | P5 | K | Entry-A |

### A4 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| A4.1 — סוגריים — P5 | OPS_ORDER_BASIC | COVERED_PARTIALLY | OPS_ORDER_BASIC:identify-first-operation C. Chooses addition inside parentheses first. | Reuse ID; add full numerical parentheses evaluation rather than treating first-operation choice as complete coverage. | P5 | K | Entry-A |
| A4.2 — כפל/חילוק לפני חיבור/חיסור — P5 | OPS_ORDER_BASIC | COVERED_PARTIALLY | OPS_ORDER_BASIC:multiplication-before-leading-addition; multiplication-before-trailing-addition; identify-first-operation. Numeric multiplication/addition precedence plus first-operation choice. | Add division-before-addition/subtraction numerical families; same evaluation-order target. | P5 | K | Entry-A |
| A4.3 — פעולות באותה דרגה משמאל לימין — P5 | OPS_ORDER_BASIC | COVERED_PARTIALLY | OPS_ORDER_BASIC:same-precedence-left-to-right. Both add/subtract and divide/multiply first-operation choices exist. | Add full final-value chains; do not duplicate the Skill. | P5 | K | Entry-A |
| A4.4 — סדר פעולות עם מכוונים — P5 | OPS_ORDER_BASIC | EXISTING_SKILL_SCOPE_SHOULD_EXPAND | OPS_ORDER_BASIC:precedence families; INT_*:single-operation families. No active mixed signed precedence family. | Add signed-order family with explicit supporting Skills; preserve existing sign sampling invariants. | P5 | K | Entry-A |
| A4.5 — חזקה ככפל חוזר — P4 | OPS_POWERS | NEW_SKILL_REQUIRED | None in active catalog; legacy generators are excluded. No active power as repeated product evidence. | New power/inverse-power identity; separate family for power as repeated product. | P4 | K | Entry-A |
| A4.6 — ריבועים בסיסיים — P5 | OPS_POWERS | NEW_SKILL_REQUIRED | None in active catalog; legacy generators are excluded. No active square facts 1–12 evidence. | New power/inverse-power identity; separate family for square facts 1–12. | P5 | K | Entry-A |
| A4.7 — שורשים של ריבועים מושלמים — P5 | OPS_SQUARE_ROOTS | NEW_SKILL_REQUIRED | None in active catalog; legacy generators are excluded. No active principal roots of perfect squares evidence. | New power/inverse-power identity; separate family for principal roots of perfect squares. | P5 | K | Entry-A |
| A4.8 — בסיס שלילי וסוגריים — P5 | OPS_POWERS | NEW_SKILL_REQUIRED | None in active catalog; legacy generators are excluded. No active negative base versus external minus evidence. | New power/inverse-power identity; separate family for negative base versus external minus. | P5 | K | Entry-A |

### A5 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| A5.1 — משתנה | ALG_VARIABLE | COVERED_EXACTLY | ALG_VARIABLE:variable-concepts A/C; contextual-variable-meaning; contextual-variable-value. Variable is a numerical value and can vary between cases. | Reuse; high-literacy context is supplementary, not gateway. | P5 | K | Entry-B |
| A5.2 — משמעות `3x` | ALG_VARIABLE | EXISTING_SKILL_NEEDS_NEW_FAMILY | ALG_VARIABLE:variable-concepts; ALG_SUBSTITUTE:substitution-abstraction A. Coefficient notation appears, and substitution uses multiplication, but direct coefficient-to-product meaning is not independently checked. | Add implicit-multiplication representation family under existing reading identity. | P5 | K | Entry-B |
| A5.3 — מקדם מפורש — P5 | ALG_VARIABLE | COVERED_PARTIALLY | ALG_VARIABLE:variable-concepts B. Explicit positive coefficient n, sampled 2–12. | Add negative coefficients and distinguish signed term boundary; reuse ID. | P5 | K | Entry-B |
| A5.4 — מקדם סמוי 1 ו־−1 — P5 | ALG_VARIABLE | EXISTING_SKILL_NEEDS_NEW_FAMILY | ALG_VARIABLE:variable-concepts B. Existing coefficient sampler excludes 1 and -1. | Add explicit x=1x and -x=-1x representation; no separate hidden-coefficient Mastery. | P5 | K | Entry-B |
| A5.5 — איבר קבוע | ALG_VARIABLE | EXISTING_SKILL_SCOPE_SHOULD_EXPAND | ALG_VARIABLE:variable-concepts C. A constant is mentioned as a distractor, not systematically identified. | Add term-and-constant-reading for constant term; retain variable-reading identity. | P5 | K | Entry-B |
| A5.6 — זיהוי איברים בביטוי | ALG_VARIABLE | EXISTING_SKILL_SCOPE_SHOULD_EXPAND | ALG_VARIABLE:variable-concepts C. A constant is mentioned as a distractor, not systematically identified. | Add term-and-constant-reading for signed term boundaries; retain variable-reading identity. | P5 | K | Entry-B |
| A5.7 — "גדול ב־" | ALG_EXPRESSIONS | NEW_SKILL_REQUIRED | ALG_VARIABLE:contextual-variable-meaning is related but not translation evidence. No active family translates greater by into an expression. | New relational-translation Skill; separate phrase family from variable naming. | P5 | K | Entry-B |
| A5.8 — "קטן ב־" | ALG_EXPRESSIONS | NEW_SKILL_REQUIRED | ALG_VARIABLE:contextual-variable-meaning is related but not translation evidence. No active family translates smaller by into an expression. | New relational-translation Skill; separate phrase family from variable naming. | P5 | K | Entry-B |
| A5.9 — "פי" | ALG_EXPRESSIONS | NEW_SKILL_REQUIRED | ALG_VARIABLE:contextual-variable-meaning is related but not translation evidence. No active family translates times into an expression. | New relational-translation Skill; separate phrase family from variable naming. | P5 | K | Entry-B |
| A5.10 — חצי / שליש מ־ | ALG_EXPRESSIONS | NEW_SKILL_REQUIRED | ALG_VARIABLE:contextual-variable-meaning is related but not translation evidence. No active family translates half/third of into an expression. | New relational-translation Skill; separate phrase family from variable naming. | P5 | K | Entry-B |
| A5.11 — ביטוי לעומת משוואה | ALG_EQUALITY | EXISTING_SKILL_SCOPE_SHOULD_EXPAND | ALG_EQUALITY:relational equality families. Equality relation exists, but no explicit expression/equation contrast. | Add expression-versus-equation family; do not create another object-vocabulary Skill. | P5 | K | Entry-B |

### A6 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| A6.1 — הצבה פשוטה | ALG_SUBSTITUTE | COVERED_PARTIALLY | ALG_SUBSTITUTE:substitution-abstraction A; meaning-of-substitution. Selects the replaced expression for positive input; does not ask its numeric value. | Reuse replacement evidence; add numerical evaluation. | P5 | K | Entry-B |
| A6.2 — הצבת 0 | ALG_SUBSTITUTE | EXISTING_SKILL_NEEDS_NEW_FAMILY | ALG_SUBSTITUTE:substitution-abstraction. Current sampled replacement values are positive, at least 2. | Add zero input; retain mathematical grouping and target identity. | P5 | K | Entry-B |
| A6.3 — הצבת מספר שלילי | ALG_SUBSTITUTE | EXISTING_SKILL_NEEDS_NEW_FAMILY | ALG_SUBSTITUTE:substitution-abstraction. Current sampled replacement values are positive, at least 2. | Add negative input; retain mathematical grouping and target identity. | P5 | K | Entry-B |
| A6.4 — הצבה בביטוי עם שתי פעולות | ALG_SUBSTITUTE | COVERED_PARTIALLY | ALG_SUBSTITUTE:substitution-abstraction B/C. Symbolic replacement preserves two operations while leaving other symbols. | Add fully numeric evaluation and negative replacements for two operations; support must not dominate. | P5 | K | Entry-B |
| A6.5 — הצבה בתוך סוגריים | ALG_SUBSTITUTE | COVERED_PARTIALLY | ALG_SUBSTITUTE:substitution-abstraction B/C. Symbolic replacement preserves parentheses while leaving other symbols. | Add fully numeric evaluation and negative replacements for parentheses; support must not dominate. | P5 | K | Entry-B |
| A6.6 — הצבת משתנה אחד תוך השארת משתנה אחר | ALG_SUBSTITUTE | COVERED_EXACTLY | ALG_SUBSTITUTE:substitution-abstraction B/C; meaning-of-substitution. Replaces x while a/b remain symbols. | Sufficient as-is for partial substitution; keep out of early gateway before symbol reading. | P5 | K | Entry-B |

### A7 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| A7.1 — `x+x=2x` | ALG_LIKE_TERMS | NEW_SKILL_REQUIRED | ALG_VARIABLE:coefficient reading is related only. No active like-term operation or unlike-term contrast. | New operation identity; mapped family in the card preserves implicit/signed coefficients and separates constants. | P5 | K | Entry-B |
| A7.2 — `2x+3x=5x` | ALG_LIKE_TERMS | NEW_SKILL_REQUIRED | ALG_VARIABLE:coefficient reading is related only. No active like-term operation or unlike-term contrast. | New operation identity; mapped family in the card preserves implicit/signed coefficients and separates constants. | P5 | K | Entry-B |
| A7.3 — חיסור איברים דומים | ALG_LIKE_TERMS | NEW_SKILL_REQUIRED | ALG_VARIABLE:coefficient reading is related only. No active like-term operation or unlike-term contrast. | New operation identity; mapped family in the card preserves implicit/signed coefficients and separates constants. | P5 | K | Entry-B |
| A7.4 — מקדמים שליליים | ALG_LIKE_TERMS | NEW_SKILL_REQUIRED | ALG_VARIABLE:coefficient reading is related only. No active like-term operation or unlike-term contrast. | New operation identity; mapped family in the card preserves implicit/signed coefficients and separates constants. | P5 | K | Entry-B |
| A7.5 — משתנים ומספרים בנפרד | ALG_LIKE_TERMS | NEW_SKILL_REQUIRED | ALG_VARIABLE:coefficient reading is related only. No active like-term operation or unlike-term contrast. | New operation identity; mapped family in the card preserves implicit/signed coefficients and separates constants. | P5 | K | Entry-B |
| A7.6 — אי־אפשר לכנס `2x+3y` | ALG_LIKE_TERMS | NEW_SKILL_REQUIRED | ALG_VARIABLE:coefficient reading is related only. No active like-term operation or unlike-term contrast. | New operation identity; mapped family in the card preserves implicit/signed coefficients and separates constants. | P5 | K | Entry-B |
| A7.7 — פילוג מספרי | ALG_DISTRIBUTE | NEW_SKILL_REQUIRED | None; legacy INT_DISTRIBUTIVE is inactive. No active numeric/algebraic distributive family. | New distributive identity; forward numeric/algebraic and reverse obvious common factor are family variants. | P5 | K | Entry-B |
| A7.8 — `3(x+2)` | ALG_DISTRIBUTE | NEW_SKILL_REQUIRED | None; legacy INT_DISTRIBUTIVE is inactive. No active numeric/algebraic distributive family. | New distributive identity; forward numeric/algebraic and reverse obvious common factor are family variants. | P5 | K | Entry-B |
| A7.9 — `3(x-2)` | ALG_DISTRIBUTE | NEW_SKILL_REQUIRED | None; legacy INT_DISTRIBUTIVE is inactive. No active numeric/algebraic distributive family. | New distributive identity; forward numeric/algebraic and reverse obvious common factor are family variants. | P5 | K | Entry-B |
| A7.10 — גורם שלילי `-2(x+3)` | ALG_DISTRIBUTE | NEW_SKILL_REQUIRED | None; legacy INT_DISTRIBUTIVE is inactive. No active numeric/algebraic distributive family. | New distributive identity; forward numeric/algebraic and reverse obvious common factor are family variants. | P5 | K | Entry-B |
| A7.11 — יותר משני איברים בסוגריים | ALG_DISTRIBUTE | NEW_SKILL_REQUIRED | None; legacy INT_DISTRIBUTIVE is inactive. No active numeric/algebraic distributive family. | New distributive identity; forward numeric/algebraic and reverse obvious common factor are family variants. | P5 | K | Entry-B |
| A7.12 — הוצאת גורם משותף בסיסית | ALG_DISTRIBUTE | NEW_SKILL_REQUIRED | None; legacy INT_DISTRIBUTIVE is inactive. No active numeric/algebraic distributive family. | New distributive identity; forward numeric/algebraic and reverse obvious common factor are family variants. | P5 | K | Entry-B |

### A8 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| A8.1 — מהו פתרון של משוואה | ALG_EQUALITY | EXISTING_SKILL_SCOPE_SHOULD_EXPAND | ALG_EQUALITY:relation families; ALG_SUBSTITUTE:replacement families. Relations/replacement exist, but candidate-solution validity is not directly assessed. | Add verify-candidate-solution after substitution; no new equation-meaning Skill. | P5 | K | Entry-B |
| A8.2 — בדיקת פתרון בהצבה | ALG_EQUALITY | EXISTING_SKILL_SCOPE_SHOULD_EXPAND | ALG_EQUALITY:relation families; ALG_SUBSTITUTE:replacement families. Relations/replacement exist, but candidate-solution validity is not directly assessed. | Add verify-candidate-solution after substitution; no new equation-meaning Skill. | P5 | K | Entry-B |
| A8.3 — `x+a=b` | EQ_ADD | COVERED_EXACTLY | EQ_ADD:additive-equation-abstraction A/B/C; missing-addend-inverse-operation. Missing addend, x+a=b and symbolic additive isolation. | Reuse directly; numerical input versions reduce guessing for gateway. | P5 | K | Entry-B |
| A8.4 — `x-a=b` | EQ_ADD | EXISTING_SKILL_NEEDS_NEW_FAMILY | EQ_ADD:additive-equation-abstraction. Existing concrete equations are addition, not x-a=b. | Add unknown-plus-or-minus subtraction orientation. | P5 | K | Entry-B |
| A8.5 — `ax=b` | EQ_MUL | COVERED_EXACTLY | EQ_MUL:multiplicative-equation-abstraction; missing-factor-inverse-operation. Positive coefficient ax=b and symbolic isolation. | Reuse; retain actual equation in prompt. | P5 | K | Entry-B |
| A8.6 — `x/a=b` | EQ_MUL | EXISTING_SKILL_NEEDS_NEW_FAMILY | EQ_MUL:multiplicative-equation-abstraction. No direct x/a=b concrete family. | Add unknown-dividend; do not mistake inverse-check language for quotient equation coverage. | P5 | K | Entry-B |
| A8.7 — `a-x=b` | EQ_ADD | EXISTING_SKILL_NEEDS_NEW_FAMILY | EQ_ADD:additive-equation-abstraction. No a-x=b orientation. | Add unknown-subtrahend with signed support; same additive identity. | P5 | K | Entry-B |
| A8.8 — מקדם שלילי | EQ_MUL | EXISTING_SKILL_NEEDS_NEW_FAMILY | EQ_MUL:multiplicative-equation-abstraction. Concrete coefficients are positive. | Add negative coefficients including -1; support ALG_VARIABLE and INT_DIV. | P5 | K | Entry-B |
| A8.9 — `ax+b=c` | EQ_LINEAR_STEPS | NEW_SKILL_REQUIRED | EQ_ADD/EQ_MUL one-step families only. No active multistep/simplify-first/both-sides/fraction equation bank. | New coordination identity; preserve single-step evidence, use separate structural families, and place fractions only here after A2/A8 foundations. | P5 | K | Entry-B |
| A8.10 — `ax-b=c` | EQ_LINEAR_STEPS | NEW_SKILL_REQUIRED | EQ_ADD/EQ_MUL one-step families only. No active multistep/simplify-first/both-sides/fraction equation bank. | New coordination identity; preserve single-step evidence, use separate structural families, and place fractions only here after A2/A8 foundations. | P5 | K | Entry-B |
| A8.11 — משוואה עם סוגריים | EQ_LINEAR_STEPS | NEW_SKILL_REQUIRED | EQ_ADD/EQ_MUL one-step families only. No active multistep/simplify-first/both-sides/fraction equation bank. | New coordination identity; preserve single-step evidence, use separate structural families, and place fractions only here after A2/A8 foundations. | P5 | K | Entry-B |
| A8.12 — כינוס לפני פתרון | EQ_LINEAR_STEPS | NEW_SKILL_REQUIRED | EQ_ADD/EQ_MUL one-step families only. No active multistep/simplify-first/both-sides/fraction equation bank. | New coordination identity; preserve single-step evidence, use separate structural families, and place fractions only here after A2/A8 foundations. | P5 | K | Entry-B |
| A8.13 — נעלם בשני אגפים | EQ_LINEAR_STEPS | NEW_SKILL_REQUIRED | EQ_ADD/EQ_MUL one-step families only. No active multistep/simplify-first/both-sides/fraction equation bank. | New coordination identity; preserve single-step evidence, use separate structural families, and place fractions only here after A2/A8 foundations. | P5 | K | Entry-B |
| A8.14 — משוואות הכוללות שברים פשוטים | EQ_LINEAR_STEPS (plus EQ_ADD/EQ_MUL application families) | NEW_SKILL_REQUIRED | EQ_ADD/EQ_MUL one-step families only. No active multistep/simplify-first/both-sides/fraction equation bank. | New coordination identity; preserve single-step evidence, use separate structural families, and place fractions only here after A2/A8 foundations. | P5 | K | Entry-B |
| A8.15 — חזרה על פעולות שברים בתוך פתרון משוואה | EQ_LINEAR_STEPS (plus EQ_ADD/EQ_MUL application families) | NEW_SKILL_REQUIRED | EQ_ADD/EQ_MUL one-step families only. No active multistep/simplify-first/both-sides/fraction equation bank. | New coordination identity; preserve single-step evidence, use separate structural families, and place fractions only here after A2/A8 foundations. | P5 | K | Entry-B |
| A8.16 — אין פתרון | None in Entry | OUT_OF_ENTRY_SCOPE | None. Roadmap itself labels this Grade 8 extension. | No/infinite solutions deferred; do not activate as a prerequisite. | Deferred | — | Later |
| A8.17 — אינסוף פתרונות | None in Entry | OUT_OF_ENTRY_SCOPE | None. Roadmap itself labels this Grade 8 extension. | No/infinite solutions deferred; do not activate as a prerequisite. | Deferred | — | Later |

### A9 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| A9.1 — ציר x וציר y | COORD_READ_PLOT | NEW_SKILL_REQUIRED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; reviewed static grid pilot is possible; scalable generated variants need coordinate rendering. | P5 | S | Entry-C |
| A9.2 — ראשית הצירים | COORD_READ_PLOT | NEW_SKILL_REQUIRED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; reviewed static grid pilot is possible; scalable generated variants need coordinate rendering. | P5 | S | Entry-C |
| A9.3 — סדר הכתיבה `(x,y)` — P5 | COORD_READ_PLOT | NEW_SKILL_REQUIRED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; reviewed static grid pilot is possible; scalable generated variants need coordinate rendering. | P5 | S | Entry-C |
| A9.4 — קריאת נקודה ברביע I | COORD_READ_PLOT | NEW_SKILL_REQUIRED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; reviewed static grid pilot is possible; scalable generated variants need coordinate rendering. | P5 | C | Entry-C |
| A9.5 — סימון נקודה ברביע I | COORD_READ_PLOT | INFRASTRUCTURE_BLOCKED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; closed candidate-position selection is a valid initial proxy; unconstrained plotting requires a new interaction/evaluator and is not claimed implemented. | P5 | C | Entry-C |
| A9.6 — ארבעת הרביעים | COORD_READ_PLOT | NEW_SKILL_REQUIRED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; reviewed static grid pilot is possible; scalable generated variants need coordinate rendering. | P5 | C | Entry-C |
| A9.7 — קריאה בכל רביע | COORD_READ_PLOT | NEW_SKILL_REQUIRED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; reviewed static grid pilot is possible; scalable generated variants need coordinate rendering. | P5 | C | Entry-C |
| A9.8 — סימון בכל רביע | COORD_READ_PLOT | INFRASTRUCTURE_BLOCKED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; closed candidate-position selection is a valid initial proxy; unconstrained plotting requires a new interaction/evaluator and is not claimed implemented. | P5 | C | Entry-C |
| A9.9 — נקודה על ציר x | COORD_READ_PLOT | NEW_SKILL_REQUIRED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; reviewed static grid pilot is possible; scalable generated variants need coordinate rendering. | P5 | C | Entry-C |
| A9.10 — נקודה על ציר y | COORD_READ_PLOT | NEW_SKILL_REQUIRED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; reviewed static grid pilot is possible; scalable generated variants need coordinate rendering. | P5 | C | Entry-C |
| A9.11 — תנועה אופקית — מה משתנה | COORD_MOVEMENT | NEW_SKILL_REQUIRED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; reviewed static grid pilot is possible; scalable generated variants need coordinate rendering. | P5 | C | Entry-C |
| A9.12 — תנועה אנכית — מה משתנה | COORD_MOVEMENT | NEW_SKILL_REQUIRED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; reviewed static grid pilot is possible; scalable generated variants need coordinate rendering. | P5 | C | Entry-C |
| A9.13 — מרחק אופקי/אנכי פשוט | COORD_MOVEMENT | NEW_SKILL_REQUIRED | None; INT_NUMBER_LINE is one-dimensional supporting content. No active coordinate evidence. | New identity; reviewed static grid pilot is possible; scalable generated variants need coordinate rendering. | P5 | C | Entry-C |

### A10 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| A10.1 — מה מייצג כל ציר | GRAPH_READ | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | S | Entry-C |
| A10.2 — פירוש נקודה בהקשר | GRAPH_READ | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | S | Entry-C |
| A10.3 — מציאת y עבור x | GRAPH_READ | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | C | Entry-C |
| A10.4 — מציאת x עבור y | GRAPH_READ | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; allow multiple inputs for a given output. | P5 | C | Entry-C |
| A10.5 — מקסימום | GRAPH_READ | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | C | Entry-C |
| A10.6 — מינימום | GRAPH_READ | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | C | Entry-C |
| A10.7 — עולה | GRAPH_READ | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | C | Entry-C |
| A10.8 — יורדת | GRAPH_READ | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | C | Entry-C |
| A10.9 — קבועה | GRAPH_READ | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | C | Entry-C |
| A10.10 — תחום גרפי פשוט | GRAPH_READ | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | C | Entry-C |
| A10.11 — טבלה → נקודות | FUNCTION_RELATIONS | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | C | Entry-C |
| A10.12 — גרף → טבלה | FUNCTION_RELATIONS | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | C | Entry-C |
| A10.13 — תיאור קצר → גרף | FUNCTION_RELATIONS | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | S | Entry-C |
| A10.14 — גרף → תיאור קצר | FUNCTION_RELATIONS | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; mapped read/translation family must use reviewed axes, scale and values. | P5 | S | Entry-C |
| A10.15 — פונקציה: לכל x מותאם פלט יחיד | FUNCTION_RELATIONS | NEW_SKILL_REQUIRED | None. No active graph or function-foundation evidence. | New identity; one output per input; repeated outputs are allowed. | P5 | S | Entry-C |

### G1 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| G1.1 — מהי זווית | GEO_ANGLE_SENSE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; opening/turn and benchmark families; do not confuse arm length with magnitude. | P5 | S | Entry-D |
| G1.2 — הערכת זווית — P5 | GEO_ANGLE_SENSE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; opening/turn and benchmark families; do not confuse arm length with magnitude. | P5 | G | Entry-D |
| G1.3 — סוגי זוויות | GEO_ANGLE_SENSE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; opening/turn and benchmark families; do not confuse arm length with magnitude. | P5 | S | Entry-D |
| G1.4 — קריאת `∠ABC` | GEO_DIAGRAM_LANGUAGE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; named-object/mark families; only marked givens license inference. | P5 | S | Entry-D |
| G1.5 — אותה זווית בשני סדרים | GEO_DIAGRAM_LANGUAGE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; named-object/mark families; only marked givens license inference. | P5 | S | Entry-D |
| G1.6 — מתי אפשר לכתוב `∠B` | GEO_DIAGRAM_LANGUAGE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; named-object/mark families; only marked givens license inference. | P5 | S | Entry-D |
| G1.7 — `∠B₁`, `∠B₂` | GEO_DIAGRAM_LANGUAGE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; named-object/mark families; only marked givens license inference. | P5 | S | Entry-D |
| G1.8 — α, β כשמות לזוויות | GEO_DIAGRAM_LANGUAGE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; named-object/mark families; only marked givens license inference. | P5 | S | Entry-D |
| G1.9 — סימוני ישרים/קטעים | GEO_DIAGRAM_LANGUAGE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; named-object/mark families; only marked givens license inference. | P5 | S | Entry-D |
| G1.10 — סימוני שרטוט | GEO_DIAGRAM_LANGUAGE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; named-object/mark families; only marked givens license inference. | P5 | S | Entry-D |
| G1.11 — מה מותר להסיק מהסימון | GEO_DIAGRAM_LANGUAGE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; named-object/mark families; only marked givens license inference. | P5 | G | Entry-D |
| G1.12 — מה אסור להסיק כי "ככה זה נראה" | GEO_DIAGRAM_LANGUAGE | NEW_SKILL_REQUIRED | None. No active geometry evidence. | New identity; named-object/mark families; only marked givens license inference. | P5 | G | Entry-D |

### G2 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| G2.1 — 90° | GEO_ANGLE_RELATIONS | NEW_SKILL_REQUIRED | None. No active angle-relation evidence. | New relation-use identity; retain distinct total/equality/bisector families and a small local reason set. | P5 | S | Entry-D |
| G2.2 — 180° | GEO_ANGLE_RELATIONS | NEW_SKILL_REQUIRED | None. No active angle-relation evidence. | New relation-use identity; retain distinct total/equality/bisector families and a small local reason set. | P5 | S | Entry-D |
| G2.3 — 360° סביב נקודה | GEO_ANGLE_RELATIONS | NEW_SKILL_REQUIRED | None. No active angle-relation evidence. | New relation-use identity; retain distinct total/equality/bisector families and a small local reason set. | P5 | S | Entry-D |
| G2.4 — זוויות צמודות — סכום 180° | GEO_ANGLE_RELATIONS | NEW_SKILL_REQUIRED | None. No active angle-relation evidence. | New relation-use identity; retain distinct total/equality/bisector families and a small local reason set. | P5 | G | Entry-D |
| G2.5 — זוויות קודקודיות — שוות | GEO_ANGLE_RELATIONS | NEW_SKILL_REQUIRED | None. No active angle-relation evidence. | New relation-use identity; retain distinct total/equality/bisector families and a small local reason set. | P5 | G | Entry-D |
| G2.6 — חוצה זווית — שתי זוויות שוות | GEO_ANGLE_RELATIONS | NEW_SKILL_REQUIRED | None. No active angle-relation evidence. | New relation-use identity; retain distinct total/equality/bisector families and a small local reason set. | P5 | G | Entry-D |
| G2.7 — חישוב במשפט אחד | GEO_ANGLE_RELATIONS | NEW_SKILL_REQUIRED | None. No active angle-relation evidence. | New relation-use identity; retain distinct total/equality/bisector families and a small local reason set. | P5 | S | Entry-D |
| G2.8 — שני צעדים — Band גבוה בלבד | GEO_ANGLE_RELATIONS | NEW_SKILL_REQUIRED | None. No active angle-relation evidence. | New relation-use identity; two-rule family is higher structure only. | P5 | G | Entry-D |

### G3 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| G3.1 — זיהוי מקבילים | GEO_PARALLEL_ANGLES | NEW_SKILL_REQUIRED | None. No active parallel/perpendicular/transversal evidence. | New identity; identify pair/conditions before numerical use; converse proof excluded. | P5 | S | Entry-D |
| G3.2 — זיהוי מאונכים | GEO_PARALLEL_ANGLES | NEW_SKILL_REQUIRED | None. No active parallel/perpendicular/transversal evidence. | New identity; identify pair/conditions before numerical use; converse proof excluded. | P5 | S | Entry-D |
| G3.3 — חותך שני ישרים | GEO_PARALLEL_ANGLES | NEW_SKILL_REQUIRED | None. No active parallel/perpendicular/transversal evidence. | New identity; identify pair/conditions before numerical use; converse proof excluded. | P5 | S | Entry-D |
| G3.4 — זיהוי זוויות מתחלפות | GEO_PARALLEL_ANGLES | NEW_SKILL_REQUIRED | None. No active parallel/perpendicular/transversal evidence. | New identity; identify pair/conditions before numerical use; converse proof excluded. | P5 | G | Entry-D |
| G3.5 — מתחלפות בין מקבילים — שוות | GEO_PARALLEL_ANGLES | NEW_SKILL_REQUIRED | None. No active parallel/perpendicular/transversal evidence. | New identity; identify pair/conditions before numerical use; converse proof excluded. | P5 | G | Entry-D |
| G3.6 — זיהוי זוויות מתאימות | GEO_PARALLEL_ANGLES | NEW_SKILL_REQUIRED | None. No active parallel/perpendicular/transversal evidence. | New identity; identify pair/conditions before numerical use; converse proof excluded. | P5 | G | Entry-D |
| G3.7 — מתאימות בין מקבילים — שוות | GEO_PARALLEL_ANGLES | NEW_SKILL_REQUIRED | None. No active parallel/perpendicular/transversal evidence. | New identity; identify pair/conditions before numerical use; converse proof excluded. | P5 | G | Entry-D |
| G3.8 — חישוב מספרי במשפט אחד | GEO_PARALLEL_ANGLES | NEW_SKILL_REQUIRED | None. No active parallel/perpendicular/transversal evidence. | New identity; identify pair/conditions before numerical use; converse proof excluded. | P5 | G | Entry-D |
| G3.9 — שילוב עם קודקודיות — מתקדם | GEO_PARALLEL_ANGLES | NEW_SKILL_REQUIRED | None. No active parallel/perpendicular/transversal evidence. | New identity; higher two-rule combination with vertical angles. | P5 | G | Entry-D |

### G4 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| G4.1 — לפי צלעות: | GEO_TRIANGLE_PROPERTIES | NEW_SKILL_REQUIRED | None. No active triangle evidence. | New target; classification/side-reading or angle-sum family as specified in card. | P5 | S | Entry-D |
| G4.2 — לפי זוויות: | GEO_TRIANGLE_PROPERTIES | NEW_SKILL_REQUIRED | None. No active triangle evidence. | New target; classification/side-reading or angle-sum family as specified in card. | P5 | S | Entry-D |
| G4.3 — סכום זוויות במשולש = 180° | GEO_TRIANGLE_ANGLES | NEW_SKILL_REQUIRED | None. No active triangle evidence. | New target; classification/side-reading or angle-sum family as specified in card. | P5 | S | Entry-D |
| G4.4 — מציאת זווית חסרה | GEO_TRIANGLE_ANGLES | NEW_SKILL_REQUIRED | None. No active triangle evidence. | New target; classification/side-reading or angle-sum family as specified in card. | P5 | S | Entry-D |
| G4.5 — שימוש במשוואה פשוטה בזוויות | GEO_TRIANGLE_ANGLES | NEW_SKILL_REQUIRED | None. No active triangle evidence. | New target; simple equation family waits for A8 support. | P5 | G | Entry-D |
| G4.6 — זיהוי משולש ישר זווית | GEO_TRIANGLE_PROPERTIES | NEW_SKILL_REQUIRED | None. No active triangle evidence. | New target; classification/side-reading or angle-sum family as specified in card. | P5 | S | Entry-D |
| G4.7 — זיהוי ניצבים | GEO_TRIANGLE_PROPERTIES | NEW_SKILL_REQUIRED | None. No active triangle evidence. | New target; classification/side-reading or angle-sum family as specified in card. | P5 | G | Entry-D |
| G4.8 — זיהוי יתר — P5 | GEO_TRIANGLE_PROPERTIES | NEW_SKILL_REQUIRED | None. No active triangle evidence. | New target; classification/side-reading or angle-sum family as specified in card. | P5 | G | Entry-D |
| G4.9 — זווית חיצונית — P3/P4 | GEO_TRIANGLE_ANGLES | NEW_SKILL_REQUIRED | None. No active triangle evidence. | New target; optional exterior-angle consequence, not a required gateway or policy Band. | P3 | G | Entry-D |

### G5 coverage

| Roadmap item / target | Proposed Skill | Classification | Current Skill/families and evidence | Missing evidence / reuse decision | Priority | Visual | Wave |
|---|---|---|---|---|---|---|---|
| G5.1 — גובה | GEO_SPECIAL_SEGMENTS | NEW_SKILL_REQUIRED | None. No active altitude/bisector evidence. | New definition-reading identity; identify defining marks; no median or concurrency theorem. | P5 | G | Entry-D |
| G5.2 — זיהוי גובה בשרטוט | GEO_SPECIAL_SEGMENTS | NEW_SKILL_REQUIRED | None. No active altitude/bisector evidence. | New definition-reading identity; identify defining marks; no median or concurrency theorem. | P5 | G | Entry-D |
| G5.3 — גובה חיצוני — P3 | GEO_SPECIAL_SEGMENTS | NEW_SKILL_REQUIRED | None. No active altitude/bisector evidence. | New definition-reading identity; external-altitude family is optional P3, never a core bypass blocker. | P3 | G | Entry-D |
| G5.4 — חוצה זווית במשולש | GEO_SPECIAL_SEGMENTS | NEW_SKILL_REQUIRED | None. No active altitude/bisector evidence. | New definition-reading identity; identify defining marks; no median or concurrency theorem. | P5 | G | Entry-D |
| G5.5 — זיהוי חוצה | GEO_SPECIAL_SEGMENTS | NEW_SKILL_REQUIRED | None. No active altitude/bisector evidence. | New definition-reading identity; identify defining marks; no median or concurrency theorem. | P5 | G | Entry-D |


### Signed-number reuse verdict

A3.2–3, A3.5, A3.7–20 and A3.24 are sufficient for their numbered targets as-is; mode/policy defects are separate. A3.1 needs explicit sign/zero classification, A3.4 needs direct visible placement and rightward movement, A3.6 needs a unary/binary-minus contrast. A3.21–23 preserve sign logic but need direct numerical-dividend presentation to avoid cancellation as a shortcut. Mixed-order checkpoint questions belong to OPS_ORDER_BASIC with signed support; do not add INT_MIXED_OPS just to mirror a Stage. Never replace explicit positive magnitudes/sign patterns with uncontrolled random signed operands.

## 4. Taxonomy decisions and contracts

| Decision | Recommendation and diagnostic rationale | Migration consequence |
|---|---|---|
| Hidden coefficient | Keep in ALG_VARIABLE with explicit implicit-multiplication/hidden-coefficient/term-reading families. The current ID already includes coefficients; reading -x is distinct from combining -x with another term. | No new Skill. New evidence/profile requirements cannot be satisfied merely by old positive-coefficient Attempts; use policy/version review and structural coverage handling. |
| Fraction equivalence | Keep expansion, simplification, full reduction, common-denominator construction and signed-form equivalence under FRAC_EQUIV. They preserve one rational value; operation-specific errors remain separate family diagnoses. | Preserve current ID and old family identity. New pair/sign families require content review. Do not create FRAC_EXPAND/FRAC_SIMPLIFY solely from old taxonomy tables. |
| Fraction operations | Add FRAC_COMPARE, FRAC_ADD_SUB, FRAC_MULTIPLY, FRAC_DIVIDE. Add/subtract directions and denominator relationships remain families; reciprocal belongs with division. | New targets receive new IDs; FRAC_EQUIV Attempts do not become operation mastery. If future teacher data justify splitting additive operations, design an explicit migration then. |
| Precedence and powers | Expand OPS_ORDER_BASIC through parentheses, equal-precedence evaluation and signed mixtures. Add OPS_POWERS for notation/sign scope and OPS_SQUARE_ROOTS for the inverse-square relation. | No separate parentheses Skill. Existing precedence Bands need a versioned profile audit, not blind remapping of old A/B/C evidence. |
| Algebra | Retain ALG_EQUALITY, ALG_VARIABLE, ALG_SUBSTITUTE; add ALG_EXPRESSIONS, ALG_LIKE_TERMS, ALG_DISTRIBUTE. Basic common factor is the reverse distributive family. | No identity is silently repurposed; new operations cannot inherit variable-reading mastery. No Grade 8 product-of-sums family. |
| Equations | Retain EQ_ADD and EQ_MUL for inverse-operation identities; add EQ_LINEAR_STEPS for coordinating transformations. Two-step, simplify-first, parentheses, both sides and fractions remain distinct families. | Old one-step Attempts retain their original Skill. Fraction single-step applications stay in EQ_ADD/EQ_MUL; coordinating them belongs to EQ_LINEAR_STEPS after fraction teaching. |
| Coordinates/graphs | Separate coordinate representation from axis-aligned movement; separate reading a graph from translating representations/input-output uniqueness. | Four new IDs. Closed plotting proxies are identified honestly; new interactive input types are not assumed. |
| Geometry | Seven targets cover angle sense, diagram language, local angle relations, parallel/transversal reasoning, triangle-property reading, triangle-sum use and special-segment definitions. | Theorems/reasons/diagram objects are semantic metadata, not new Mastery scores. No separate Skill per angle theorem. |

**AR_PLACE_VALUE disposition:** keep existing ID, definitions, Attempts and free-practice access. Recommend optional teacher-directed/remediation access; remove it from the required Entry main path and from the current decimal-arithmetic shortcut/checkpoint scopes when path implementation is authorized. Do not use it as an initial whole-Entry placement gate. Offer its diagnostic only when specific calculation mistakes suggest positional-structure trouble. The current executable Skill teaches whole-number base-ten composition/decomposition; excluding it from core does not imply deleting it or claiming it is already removed. AR_FACTORS_MULTIPLES likewise remains a small optional support branch, not an extra prerequisite lock.

**Prerequisites and support:** core prerequisites describe required mathematical knowledge, not access locks or a requirement to finish every family in that Skill first. For example, ALG_EQUALITY's relation subset precedes ALG_VARIABLE; its solution-checking subset follows substitution. Product/division inverse checks are sequenced after both fact relations have been introduced; their supporting links do not impose cyclic activation gates. Broad labels such as “multiplication fact groups” mean the four existing atomic IDs in AR_MULTIPLICATION_FACTS, and “division fact groups” the four in AR_DIVISION_FACTS. At implementation, assign only the actual atomic supporting IDs needed by that definition/Band, not every possible support listed in a card. Groups themselves never go in supportingSkills.

**Question/output contract:** use current numeric, singleChoice and multiChoice types. Algebraic expressions/tuples and named geometry objects use math-rendered closed choices; do not assume a typed-expression evaluator or diagram-click evaluator exists. MultiChoice handles deliberately nonunique reverse graph lookup and “all licensed facts” tasks. Never emit a singleChoice with several equivalent correct options. All mathematical prompt/choice/hint/correction segments use ContentRenderer/KaTeX and multiplication `\cdot`; internal arithmetic remains separate. The archetypes below describe 1–2 forms per Skill, not a question bank. Finite reviewed visuals may support initial representation evidence, but mere prose naming does not count as representation.

### Reading the Content Design Cards

Each family is named semantically within its Skill; the future full contentFamily is `SkillID:family-name`. Existing exact names should be retained where the mathematical target remains the same; new descriptive aliases in cards must be reconciled with the inventory instead of silently renaming history. All rows are proposed content work, including “reuse” rows. Family production is generator for routine variation, mixed for reviewed visual/wording templates with constrained variation, and curated only when the exact representation/wording is essential. All proposed families become Fixed/Practice eligible only after readiness/review. Other flags are **P** placement, **T** Timed, **S** Survival, **F** explicit arithmetic Fluency Sprint; absence means **not eligible**. P is not ordinary Practice.

The evidence mix is ordered **calculation / conceptual / reasoning / representation**, with high/medium/low/none qualitative weights. A positive proposed policy below has an exact witness allocation in section 9, not an assumed family-category relabelling. The policy minimums are provisional content-engineering coverage proposals, not final mastery pass rates. A higher Band exists only when its card explains what changes and what remains invariant.

## 5. Numbers & Algebra Content Design Cards

### Card directory

| Stable proposed ID | Hebrew student label | Identity | Priority | Wave |
|---|---|---|---|---|
| [AR_ADD_FACTS](#skill-ar-add-facts) | חיבור מהיר | Reused | P4 | Entry-A |
| [AR_SUB_FACTS](#skill-ar-sub-facts) | חיסור מהיר | Reused | P4 | Entry-A |
| [AR_MUL_F_2_5_10](#skill-ar-mul-f-2-5-10) | כפל 2, 5, 10 | Reused | P5 | Entry-A |
| [AR_DIV_F_2_5_10](#skill-ar-div-f-2-5-10) | חילוק 2, 5, 10 | Reused | P5 | Entry-A |
| [AR_MUL_F_3_4](#skill-ar-mul-f-3-4) | כפל 3, 4 | Reused | P5 | Entry-A |
| [AR_DIV_F_3_4](#skill-ar-div-f-3-4) | חילוק 3, 4 | Reused | P5 | Entry-A |
| [AR_MUL_F_6_7](#skill-ar-mul-f-6-7) | כפל 6, 7 | Reused | P5 | Entry-A |
| [AR_DIV_F_6_7](#skill-ar-div-f-6-7) | חילוק 6, 7 | Reused | P5 | Entry-A |
| [AR_MUL_F_8_9](#skill-ar-mul-f-8-9) | כפל 8, 9 | Reused | P5 | Entry-A |
| [AR_DIV_F_8_9](#skill-ar-div-f-8-9) | חילוק 8, 9 | Reused | P5 | Entry-A |
| [AR_FACTORS_MULTIPLES](#skill-ar-factors-multiples) | גורמים וכפולות | Reused | P3 | Entry-A |
| [INT_NUMBER_LINE](#skill-int-number-line) | ציר המספרים | Reused | P5 | Entry-A |
| [INT_COMPARE](#skill-int-compare) | השוואה | Reused | P5 | Entry-A |
| [INT_NEGATION](#skill-int-negation) | מספר נגדי | Reused | P5 | Entry-A |
| [INT_ADD](#skill-int-add) | חיבור מכוונים | Reused | P5 | Entry-A |
| [INT_SUB](#skill-int-sub) | חיסור מכוונים | Reused | P5 | Entry-A |
| [INT_MUL](#skill-int-mul) | כפל מכוונים | Reused | P5 | Entry-A |
| [INT_DIV](#skill-int-div) | חילוק מכוונים | Reused | P5 | Entry-A |
| [FRAC_MEANING](#skill-frac-meaning) | משמעות השבר | Reused | P4 | Entry-A |
| [FRAC_EQUIV](#skill-frac-equiv) | שברים שווים | Reused | P5 | Entry-A |
| [FRAC_COMPARE](#skill-frac-compare) | השוואת שברים | New | P4 | Entry-A |
| [FRAC_ADD_SUB](#skill-frac-add-sub) | חיבור וחיסור שברים | New | P5 | Entry-A |
| [FRAC_MULTIPLY](#skill-frac-multiply) | כפל שברים | New | P5 | Entry-A |
| [FRAC_DIVIDE](#skill-frac-divide) | חילוק שברים | New | P4 | Entry-A |
| [OPS_ORDER_BASIC](#skill-ops-order-basic) | סדר פעולות | Reused | P5 | Entry-A |
| [OPS_POWERS](#skill-ops-powers) | חזקות וריבועים | New | P5 | Entry-A |
| [OPS_SQUARE_ROOTS](#skill-ops-square-roots) | שורשים בסיסיים | New | P5 | Entry-A |
| [ALG_EQUALITY](#skill-alg-equality) | משמעות השוויון | Reused | P5 | Entry-B |
| [ALG_VARIABLE](#skill-alg-variable) | שפת הביטוי | Reused | P5 | Entry-B |
| [ALG_EXPRESSIONS](#skill-alg-expressions) | מילים וביטויים | New | P5 | Entry-B |
| [ALG_SUBSTITUTE](#skill-alg-substitute) | הצבה | Reused | P5 | Entry-B |
| [ALG_LIKE_TERMS](#skill-alg-like-terms) | כינוס איברים | New | P5 | Entry-B |
| [ALG_DISTRIBUTE](#skill-alg-distribute) | חוק הפילוג | New | P5 | Entry-B |
| [EQ_ADD](#skill-eq-add) | משוואות חיבור וחיסור | Reused | P5 | Entry-B |
| [EQ_MUL](#skill-eq-mul) | משוואות כפל וחילוק | Reused | P5 | Entry-B |
| [EQ_LINEAR_STEPS](#skill-eq-linear-steps) | משוואות בכמה צעדים | New | P5 | Entry-B |
| [COORD_READ_PLOT](#skill-coord-read-plot) | נקודות במישור | New | P5 | Entry-C |
| [COORD_MOVEMENT](#skill-coord-movement) | תנועה במישור | New | P5 | Entry-C |
| [GRAPH_READ](#skill-graph-read) | קריאת גרפים | New | P5 | Entry-C |
| [FUNCTION_RELATIONS](#skill-function-relations) | טבלה וגרף | New | P5 | Entry-C |
| [GEO_ANGLE_SENSE](#skill-geo-angle-sense) | הבנת זוויות | New | P5 | Entry-D |
| [GEO_DIAGRAM_LANGUAGE](#skill-geo-diagram-language) | קריאת שרטוט | New | P5 | Entry-D |
| [GEO_ANGLE_RELATIONS](#skill-geo-angle-relations) | קשרי זוויות | New | P5 | Entry-D |
| [GEO_PARALLEL_ANGLES](#skill-geo-parallel-angles) | מקבילים וזוויות | New | P5 | Entry-D |
| [GEO_TRIANGLE_PROPERTIES](#skill-geo-triangle-properties) | קריאת משולש | New | P5 | Entry-D |
| [GEO_TRIANGLE_ANGLES](#skill-geo-triangle-angles) | זוויות במשולש | New | P5 | Entry-D |
| [GEO_SPECIAL_SEGMENTS](#skill-geo-special-segments) | גובה וחוצה זווית | New | P5 | Entry-D |

<a id="skill-ar-add-facts"></a>

### AR_ADD_FACTS — עובדות חיבור וחישוב מנטלי

**Identity:** Reuse current ID; short student label **חיבור מהיר**; Domain **ARITHMETIC**; optional Group **AR_ADDITION**.

**Roadmap coverage:** A1.1, A1.F-add.

**Target:** Retrieve or calculate a two-addend nonnegative sum within 20 accurately without reading a context.

**Non-targets:** Written multidigit algorithms; three-addend stamina; signed arithmetic.

**Criticality:** P4. Removes working-memory load without making speed the whole mathematics goal.

**Prerequisites:** None.

**Supporting Skills:** None.

**Downstream:** Signed addition, fraction numerators and equation arithmetic.

**Primary misconceptions:** `count-all`, `cross-ten-slip`, `uses-total-as-addend`, `changes-sum-on-swap`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / low / none.

**Literacy target:** Mostly none; light for inverse/strategy evidence.

**Bands:** A: total at most 10; B: bridging 10 with total at most 20. Addend count stays two and values remain nonnegative; existing 10–20 plus 10–20 Band B is an extension outside the core sprint.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| bounded-sum | calculation — Direct two-addend fact retrieval. Include zero on either side. | generator / numeric | count-all; cross-ten-slip / None | none | A: within 10; B: cross 10, sum at most 20 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| missing-addend | conceptual — Interpret addition as a relation, reusing current family. | generator / singleChoice | uses-total-as-addend / None | light | A: one missing addend; B: inverse relation across 10 | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| commutative-equivalence | reasoning — Recognize an invariant sum; retain outside sprint. | generator / singleChoice | changes-sum-on-swap / None | light | A: swap addends; B: choose valid reordering | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- `8+7`
- `\square+6=10`

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 8; conceptual: 4; required Bands A: 6; B: 6. Fluency: at least six correct independent attempts from the explicit calculation-only slice; speed threshold awaits pilot/teacher calibration, so a final new fluency policy is not executable yet. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Both direct structural strata, zero on either side, inverse relation and strategy family; verify no prose in the sprint slice. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Keep ID and existing conceptual/reasoning families. Add bounded crossing-ten calculation coverage; do not repurpose the current larger Band B silently.

<a id="skill-ar-sub-facts"></a>

### AR_SUB_FACTS — עובדות חיסור וחישוב מנטלי

**Identity:** Reuse current ID; short student label **חיסור מהיר**; Domain **ARITHMETIC**; optional Group **AR_SUBTRACTION**.

**Roadmap coverage:** A1.2, A1.F-subtract.

**Target:** Find a nonnegative difference with minuend at most 20, including crossing 10.

**Non-targets:** Negative results, long subtraction, added preprocessing such as a+1-b.

**Criticality:** P4. Crossing-ten retrieval is a specific current coverage gap.

**Prerequisites:** None.

**Supporting Skills:** AR_ADD_FACTS.

**Downstream:** Signed subtraction, fraction arithmetic and equations.

**Primary misconceptions:** `reverses-to-positive`, `crossing-ten-slip`, `adds-wrong-operand`, `confuses-remaining-with-removed`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / none.

**Literacy target:** Mostly none; light for inverse facts, moderate removal stories kept outside gateway.

**Bands:** A: difference within 10; B: minuend 11–20 and subtrahend below 10 with an actual crossing of 10. One subtraction remains invariant.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| bounded-difference | calculation — Retrieve a single subtraction; include subtract-zero and equal operands. | generator / numeric | reverses-to-positive; crossing-ten-slip / AR_ADD_FACTS | none | A: within 10; B: cross 10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| inverse-addition-check | conceptual — Use addition to check a difference. | generator / singleChoice | adds-wrong-operand / AR_ADD_FACTS | light | A: complete related sum; B: choose inverse check across 10 | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| subtraction-as-removal | conceptual — Retain reviewed contextual meaning as optional practice evidence. | generator / singleChoice | confuses-remaining-with-removed / AR_ADD_FACTS | moderate | A: remove from a set; B: slightly larger set | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- `16-7`
- בחרו בדיקת חיבור עבור `13-5=8`.

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 8; conceptual: 4; required Bands A: 6; B: 6. Fluency: at least six correct independent attempts from the explicit calculation-only slice; speed threshold awaits pilot/teacher calibration, so a final new fluency policy is not executable yet. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Include within-ten, crossing-ten, zero and equality cases, plus inverse meaning; no composite adjusted-minuend expression in sprint. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Retain current ID; existing nonnegative-difference A/B are valid subsets, but B currently samples both operands 10–20 and misses crossing-ten facts. Keep removal stories outside speed profiles.

<a id="skill-ar-mul-f-2-5-10"></a>

### AR_MUL_F_2_5_10 — עובדות כפל ב־2, 5, 10

**Identity:** Reuse current ID; short student label **כפל 2, 5, 10**; Domain **ARITHMETIC**; optional Group **AR_MULTIPLICATION_FACTS**.

**Roadmap coverage:** A1.3, A1.F-multiply.

**Target:** Retrieve products with an anchored factor in {2, 5, 10} and other factor 0–10.

**Non-targets:** Arbitrary two-digit products; division; treating commutation as a new Skill.

**Criticality:** P5. Anchor facts support derivation of the remaining table.

**Prerequisites:** None.

**Supporting Skills:** AR_ADD_FACTS.

**Downstream:** Fraction scaling, coefficients, distribution and equations.

**Primary misconceptions:** `adds-instead-of-multiplies`, `neighboring-fact`, `position-dependent-recall`, `unrelated-inverse`, `changes-one-factor`, `adds-group-size-and-count`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / medium.

**Literacy target:** None for products; light for inverse checks; moderate only for retained equal-group contexts.

**Bands:** A: other factor 0–5; B: other factor 6–10. Anchor identity and one-operation form stay fixed; these are justified magnitude/fact-demand strata, not a category change.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| fact-family-product | calculation — Direct anchored product; include 0 and 1 deliberately. | generator / numeric | adds-instead-of-multiplies; neighboring-fact / None | none | A: other factor 0–5; B: other factor 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| commuted-product | calculation — Same fact with factor order reversed, not a second mastery score. | generator / numeric | position-dependent-recall / None | none | A: anchor on right, other 0–5; B: anchor on right, other 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| inverse-product-check | conceptual — Explain/check the multiplication relationship without a story. | generator / singleChoice | unrelated-inverse; changes-one-factor / AR_DIV_F_2_5_10 | light | A: choose a related fact; B: choose valid inverse relationship | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| concrete-equal-groups | representation — Retain current context-to-expression representation; do not relabel it conceptual to satisfy policy. | generator / singleChoice | adds-group-size-and-count / AR_ADD_FACTS | moderate | A: small equal groups; B: larger fact partner | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- `5 \cdot 8`
- בחרו עובדת חילוק הבודקת את המכפלה הנתונה.

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 8; conceptual: 4; required Bands A: 6; B: 6. Fluency: at least six correct independent attempts from the explicit calculation-only slice; speed threshold awaits pilot/teacher calibration, so a final new fluency policy is not executable yet. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Both factor orders, every anchor, partners 0–10, short conceptual evidence and retained representation. No single easy anchor may dominate group selection. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse ID and both direct families. Add an explicit conceptual inverse/check family; retain equal-group representation separately. Removing the visible calculation instruction is required for sprint display.

<a id="skill-ar-div-f-2-5-10"></a>

### AR_DIV_F_2_5_10 — עובדות חילוק הקשורות לכפל ב־2, 5, 10

**Identity:** Reuse current ID; short student label **חילוק 2, 5, 10**; Domain **ARITHMETIC**; optional Group **AR_DIVISION_FACTS**.

**Roadmap coverage:** A1.4, A1.F-divide.

**Target:** Retrieve an exact quotient with divisor in {2, 5, 10} from a numerical dividend.

**Non-targets:** Long division, remainders, zero divisors or cancelling a displayed product.

**Criticality:** P5. Reverse fact access deserves a separate diagnosis from product recall.

**Prerequisites:** AR_MUL_F_2_5_10.

**Supporting Skills:** None.

**Downstream:** Fraction reduction/division, coefficients and multiplicative equations.

**Primary misconceptions:** `reverses-dividend-divisor`, `multiplication-instead`, `wrong-inverse`, `confuses-number-of-groups-with-size`, `swaps-group-size-and-count`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / medium / none.

**Literacy target:** None for direct quotients; light for inverse checks; moderate for retained sharing/grouping.

**Bands:** A: quotient 0–5; B: quotient 6–10. Divisor is nonzero and anchored; display remains one division.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| numerical-dividend-quotient | calculation — Compute the dividend internally and display only dividend divided by divisor. | generator / numeric | reverses-dividend-divisor; multiplication-instead / AR_MUL_F_2_5_10 | none | A: quotient 0–5; B: quotient 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| inverse-quotient-check | conceptual — Link a division fact to its product. | generator / singleChoice | wrong-inverse / AR_MUL_F_2_5_10 | light | A: product check; B: select valid quotient relation | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| equal-sharing | conceptual — Retain existing sharing meaning. | generator / singleChoice | confuses-number-of-groups-with-size / AR_MUL_F_2_5_10 | moderate | A: share into known groups; B: larger quotient | KaTeX only; no visual/media dependency | No | No | No | No |
| grouping | reasoning — Retain the distinction between grouping and sharing. | generator / singleChoice | swaps-group-size-and-count / AR_MUL_F_2_5_10 | moderate | A: count groups of known size; B: larger quotient | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- `40 \div 5`
- איזו מכפלה בודקת את המנה?

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 8; conceptual: 4; required Bands A: 6; B: 6. Fluency: at least six correct independent attempts from the explicit calculation-only slice; speed threshold awaits pilot/teacher calibration, so a final new fluency policy is not executable yet. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Direct numerical dividends for every anchor and quotient stratum, inverse checks, reviewed meaning families; no displayed product or unnecessary parentheses before division. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Retain ID and sharing/grouping. Current exact-fact-family-quotient and grouping-preserving-quotient display a product divided by its factor; they are not direct recall evidence. Add a new numerical-dividend display family and remove the old cancellation shortcut families from the sprint/main recall slice, preserving historical Attempts.

<a id="skill-ar-mul-f-3-4"></a>

### AR_MUL_F_3_4 — עובדות כפל ב־3, 4

**Identity:** Reuse current ID; short student label **כפל 3, 4**; Domain **ARITHMETIC**; optional Group **AR_MULTIPLICATION_FACTS**.

**Roadmap coverage:** A1.3, A1.F-multiply.

**Target:** Retrieve products with an anchored factor in {3, 4} and other factor 0–10.

**Non-targets:** Arbitrary two-digit products; division; treating commutation as a new Skill.

**Criticality:** P5. These fact groups retain useful independent diagnoses already present in the catalog.

**Prerequisites:** None.

**Supporting Skills:** AR_MUL_F_2_5_10.

**Downstream:** Fraction scaling, coefficients, distribution and equations.

**Primary misconceptions:** `adds-instead-of-multiplies`, `neighboring-fact`, `position-dependent-recall`, `unrelated-inverse`, `changes-one-factor`, `adds-group-size-and-count`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / medium.

**Literacy target:** None for products; light for inverse checks; moderate only for retained equal-group contexts.

**Bands:** A: other factor 0–5; B: other factor 6–10. Anchor identity and one-operation form stay fixed; these are justified magnitude/fact-demand strata, not a category change.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| fact-family-product | calculation — Direct anchored product; include 0 and 1 deliberately. | generator / numeric | adds-instead-of-multiplies; neighboring-fact / None | none | A: other factor 0–5; B: other factor 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| commuted-product | calculation — Same fact with factor order reversed, not a second mastery score. | generator / numeric | position-dependent-recall / None | none | A: anchor on right, other 0–5; B: anchor on right, other 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| inverse-product-check | conceptual — Explain/check the multiplication relationship without a story. | generator / singleChoice | unrelated-inverse; changes-one-factor / AR_DIV_F_3_4 | light | A: choose a related fact; B: choose valid inverse relationship | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| concrete-equal-groups | representation — Retain current context-to-expression representation; do not relabel it conceptual to satisfy policy. | generator / singleChoice | adds-group-size-and-count / AR_ADD_FACTS | moderate | A: small equal groups; B: larger fact partner | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- `4 \cdot 8`
- בחרו עובדת חילוק הבודקת את המכפלה הנתונה.

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 8; conceptual: 4; required Bands A: 6; B: 6. Fluency: at least six correct independent attempts from the explicit calculation-only slice; speed threshold awaits pilot/teacher calibration, so a final new fluency policy is not executable yet. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Both factor orders, every anchor, partners 0–10, short conceptual evidence and retained representation. No single easy anchor may dominate group selection. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse ID and both direct families. Add an explicit conceptual inverse/check family; retain equal-group representation separately. Removing the visible calculation instruction is required for sprint display.

<a id="skill-ar-div-f-3-4"></a>

### AR_DIV_F_3_4 — עובדות חילוק הקשורות לכפל ב־3, 4

**Identity:** Reuse current ID; short student label **חילוק 3, 4**; Domain **ARITHMETIC**; optional Group **AR_DIVISION_FACTS**.

**Roadmap coverage:** A1.4, A1.F-divide.

**Target:** Retrieve an exact quotient with divisor in {3, 4} from a numerical dividend.

**Non-targets:** Long division, remainders, zero divisors or cancelling a displayed product.

**Criticality:** P5. Reverse fact access deserves a separate diagnosis from product recall.

**Prerequisites:** AR_MUL_F_3_4.

**Supporting Skills:** None.

**Downstream:** Fraction reduction/division, coefficients and multiplicative equations.

**Primary misconceptions:** `reverses-dividend-divisor`, `multiplication-instead`, `wrong-inverse`, `confuses-number-of-groups-with-size`, `swaps-group-size-and-count`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / medium / none.

**Literacy target:** None for direct quotients; light for inverse checks; moderate for retained sharing/grouping.

**Bands:** A: quotient 0–5; B: quotient 6–10. Divisor is nonzero and anchored; display remains one division.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| numerical-dividend-quotient | calculation — Compute the dividend internally and display only dividend divided by divisor. | generator / numeric | reverses-dividend-divisor; multiplication-instead / AR_MUL_F_3_4 | none | A: quotient 0–5; B: quotient 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| inverse-quotient-check | conceptual — Link a division fact to its product. | generator / singleChoice | wrong-inverse / AR_MUL_F_3_4 | light | A: product check; B: select valid quotient relation | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| equal-sharing | conceptual — Retain existing sharing meaning. | generator / singleChoice | confuses-number-of-groups-with-size / AR_MUL_F_3_4 | moderate | A: share into known groups; B: larger quotient | KaTeX only; no visual/media dependency | No | No | No | No |
| grouping | reasoning — Retain the distinction between grouping and sharing. | generator / singleChoice | swaps-group-size-and-count / AR_MUL_F_3_4 | moderate | A: count groups of known size; B: larger quotient | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- `32 \div 4`
- איזו מכפלה בודקת את המנה?

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 8; conceptual: 4; required Bands A: 6; B: 6. Fluency: at least six correct independent attempts from the explicit calculation-only slice; speed threshold awaits pilot/teacher calibration, so a final new fluency policy is not executable yet. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Direct numerical dividends for every anchor and quotient stratum, inverse checks, reviewed meaning families; no displayed product or unnecessary parentheses before division. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Retain ID and sharing/grouping. Current exact-fact-family-quotient and grouping-preserving-quotient display a product divided by its factor; they are not direct recall evidence. Add a new numerical-dividend display family and remove the old cancellation shortcut families from the sprint/main recall slice, preserving historical Attempts.

<a id="skill-ar-mul-f-6-7"></a>

### AR_MUL_F_6_7 — עובדות כפל ב־6, 7

**Identity:** Reuse current ID; short student label **כפל 6, 7**; Domain **ARITHMETIC**; optional Group **AR_MULTIPLICATION_FACTS**.

**Roadmap coverage:** A1.3, A1.F-multiply.

**Target:** Retrieve products with an anchored factor in {6, 7} and other factor 0–10.

**Non-targets:** Arbitrary two-digit products; division; treating commutation as a new Skill.

**Criticality:** P5. These fact groups retain useful independent diagnoses already present in the catalog.

**Prerequisites:** None.

**Supporting Skills:** AR_MUL_F_2_5_10.

**Downstream:** Fraction scaling, coefficients, distribution and equations.

**Primary misconceptions:** `adds-instead-of-multiplies`, `neighboring-fact`, `position-dependent-recall`, `unrelated-inverse`, `changes-one-factor`, `adds-group-size-and-count`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / medium.

**Literacy target:** None for products; light for inverse checks; moderate only for retained equal-group contexts.

**Bands:** A: other factor 0–5; B: other factor 6–10. Anchor identity and one-operation form stay fixed; these are justified magnitude/fact-demand strata, not a category change.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| fact-family-product | calculation — Direct anchored product; include 0 and 1 deliberately. | generator / numeric | adds-instead-of-multiplies; neighboring-fact / None | none | A: other factor 0–5; B: other factor 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| commuted-product | calculation — Same fact with factor order reversed, not a second mastery score. | generator / numeric | position-dependent-recall / None | none | A: anchor on right, other 0–5; B: anchor on right, other 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| inverse-product-check | conceptual — Explain/check the multiplication relationship without a story. | generator / singleChoice | unrelated-inverse; changes-one-factor / AR_DIV_F_6_7 | light | A: choose a related fact; B: choose valid inverse relationship | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| concrete-equal-groups | representation — Retain current context-to-expression representation; do not relabel it conceptual to satisfy policy. | generator / singleChoice | adds-group-size-and-count / AR_ADD_FACTS | moderate | A: small equal groups; B: larger fact partner | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- `7 \cdot 8`
- בחרו עובדת חילוק הבודקת את המכפלה הנתונה.

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 8; conceptual: 4; required Bands A: 6; B: 6. Fluency: at least six correct independent attempts from the explicit calculation-only slice; speed threshold awaits pilot/teacher calibration, so a final new fluency policy is not executable yet. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Both factor orders, every anchor, partners 0–10, short conceptual evidence and retained representation. No single easy anchor may dominate group selection. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse ID and both direct families. Add an explicit conceptual inverse/check family; retain equal-group representation separately. Removing the visible calculation instruction is required for sprint display.

<a id="skill-ar-div-f-6-7"></a>

### AR_DIV_F_6_7 — עובדות חילוק הקשורות לכפל ב־6, 7

**Identity:** Reuse current ID; short student label **חילוק 6, 7**; Domain **ARITHMETIC**; optional Group **AR_DIVISION_FACTS**.

**Roadmap coverage:** A1.4, A1.F-divide.

**Target:** Retrieve an exact quotient with divisor in {6, 7} from a numerical dividend.

**Non-targets:** Long division, remainders, zero divisors or cancelling a displayed product.

**Criticality:** P5. Reverse fact access deserves a separate diagnosis from product recall.

**Prerequisites:** AR_MUL_F_6_7.

**Supporting Skills:** None.

**Downstream:** Fraction reduction/division, coefficients and multiplicative equations.

**Primary misconceptions:** `reverses-dividend-divisor`, `multiplication-instead`, `wrong-inverse`, `confuses-number-of-groups-with-size`, `swaps-group-size-and-count`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / medium / none.

**Literacy target:** None for direct quotients; light for inverse checks; moderate for retained sharing/grouping.

**Bands:** A: quotient 0–5; B: quotient 6–10. Divisor is nonzero and anchored; display remains one division.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| numerical-dividend-quotient | calculation — Compute the dividend internally and display only dividend divided by divisor. | generator / numeric | reverses-dividend-divisor; multiplication-instead / AR_MUL_F_6_7 | none | A: quotient 0–5; B: quotient 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| inverse-quotient-check | conceptual — Link a division fact to its product. | generator / singleChoice | wrong-inverse / AR_MUL_F_6_7 | light | A: product check; B: select valid quotient relation | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| equal-sharing | conceptual — Retain existing sharing meaning. | generator / singleChoice | confuses-number-of-groups-with-size / AR_MUL_F_6_7 | moderate | A: share into known groups; B: larger quotient | KaTeX only; no visual/media dependency | No | No | No | No |
| grouping | reasoning — Retain the distinction between grouping and sharing. | generator / singleChoice | swaps-group-size-and-count / AR_MUL_F_6_7 | moderate | A: count groups of known size; B: larger quotient | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- `56 \div 7`
- איזו מכפלה בודקת את המנה?

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 8; conceptual: 4; required Bands A: 6; B: 6. Fluency: at least six correct independent attempts from the explicit calculation-only slice; speed threshold awaits pilot/teacher calibration, so a final new fluency policy is not executable yet. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Direct numerical dividends for every anchor and quotient stratum, inverse checks, reviewed meaning families; no displayed product or unnecessary parentheses before division. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Retain ID and sharing/grouping. Current exact-fact-family-quotient and grouping-preserving-quotient display a product divided by its factor; they are not direct recall evidence. Add a new numerical-dividend display family and remove the old cancellation shortcut families from the sprint/main recall slice, preserving historical Attempts.

<a id="skill-ar-mul-f-8-9"></a>

### AR_MUL_F_8_9 — עובדות כפל ב־8, 9

**Identity:** Reuse current ID; short student label **כפל 8, 9**; Domain **ARITHMETIC**; optional Group **AR_MULTIPLICATION_FACTS**.

**Roadmap coverage:** A1.3, A1.F-multiply.

**Target:** Retrieve products with an anchored factor in {8, 9} and other factor 0–10.

**Non-targets:** Arbitrary two-digit products; division; treating commutation as a new Skill.

**Criticality:** P5. These fact groups retain useful independent diagnoses already present in the catalog.

**Prerequisites:** None.

**Supporting Skills:** AR_MUL_F_2_5_10.

**Downstream:** Fraction scaling, coefficients, distribution and equations.

**Primary misconceptions:** `adds-instead-of-multiplies`, `neighboring-fact`, `position-dependent-recall`, `unrelated-inverse`, `changes-one-factor`, `adds-group-size-and-count`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / medium.

**Literacy target:** None for products; light for inverse checks; moderate only for retained equal-group contexts.

**Bands:** A: other factor 0–5; B: other factor 6–10. Anchor identity and one-operation form stay fixed; these are justified magnitude/fact-demand strata, not a category change.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| fact-family-product | calculation — Direct anchored product; include 0 and 1 deliberately. | generator / numeric | adds-instead-of-multiplies; neighboring-fact / None | none | A: other factor 0–5; B: other factor 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| commuted-product | calculation — Same fact with factor order reversed, not a second mastery score. | generator / numeric | position-dependent-recall / None | none | A: anchor on right, other 0–5; B: anchor on right, other 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| inverse-product-check | conceptual — Explain/check the multiplication relationship without a story. | generator / singleChoice | unrelated-inverse; changes-one-factor / AR_DIV_F_8_9 | light | A: choose a related fact; B: choose valid inverse relationship | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| concrete-equal-groups | representation — Retain current context-to-expression representation; do not relabel it conceptual to satisfy policy. | generator / singleChoice | adds-group-size-and-count / AR_ADD_FACTS | moderate | A: small equal groups; B: larger fact partner | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- `9 \cdot 8`
- בחרו עובדת חילוק הבודקת את המכפלה הנתונה.

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 8; conceptual: 4; required Bands A: 6; B: 6. Fluency: at least six correct independent attempts from the explicit calculation-only slice; speed threshold awaits pilot/teacher calibration, so a final new fluency policy is not executable yet. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Both factor orders, every anchor, partners 0–10, short conceptual evidence and retained representation. No single easy anchor may dominate group selection. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse ID and both direct families. Add an explicit conceptual inverse/check family; retain equal-group representation separately. Removing the visible calculation instruction is required for sprint display.

<a id="skill-ar-div-f-8-9"></a>

### AR_DIV_F_8_9 — עובדות חילוק הקשורות לכפל ב־8, 9

**Identity:** Reuse current ID; short student label **חילוק 8, 9**; Domain **ARITHMETIC**; optional Group **AR_DIVISION_FACTS**.

**Roadmap coverage:** A1.4, A1.F-divide.

**Target:** Retrieve an exact quotient with divisor in {8, 9} from a numerical dividend.

**Non-targets:** Long division, remainders, zero divisors or cancelling a displayed product.

**Criticality:** P5. Reverse fact access deserves a separate diagnosis from product recall.

**Prerequisites:** AR_MUL_F_8_9.

**Supporting Skills:** None.

**Downstream:** Fraction reduction/division, coefficients and multiplicative equations.

**Primary misconceptions:** `reverses-dividend-divisor`, `multiplication-instead`, `wrong-inverse`, `confuses-number-of-groups-with-size`, `swaps-group-size-and-count`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / medium / none.

**Literacy target:** None for direct quotients; light for inverse checks; moderate for retained sharing/grouping.

**Bands:** A: quotient 0–5; B: quotient 6–10. Divisor is nonzero and anchored; display remains one division.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| numerical-dividend-quotient | calculation — Compute the dividend internally and display only dividend divided by divisor. | generator / numeric | reverses-dividend-divisor; multiplication-instead / AR_MUL_F_8_9 | none | A: quotient 0–5; B: quotient 6–10 | KaTeX only; no visual/media dependency | Yes | Yes — calculation only | Yes | Yes |
| inverse-quotient-check | conceptual — Link a division fact to its product. | generator / singleChoice | wrong-inverse / AR_MUL_F_8_9 | light | A: product check; B: select valid quotient relation | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| equal-sharing | conceptual — Retain existing sharing meaning. | generator / singleChoice | confuses-number-of-groups-with-size / AR_MUL_F_8_9 | moderate | A: share into known groups; B: larger quotient | KaTeX only; no visual/media dependency | No | No | No | No |
| grouping | reasoning — Retain the distinction between grouping and sharing. | generator / singleChoice | swaps-group-size-and-count / AR_MUL_F_8_9 | moderate | A: count groups of known size; B: larger quotient | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- `72 \div 9`
- איזו מכפלה בודקת את המנה?

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 8; conceptual: 4; required Bands A: 6; B: 6. Fluency: at least six correct independent attempts from the explicit calculation-only slice; speed threshold awaits pilot/teacher calibration, so a final new fluency policy is not executable yet. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Direct numerical dividends for every anchor and quotient stratum, inverse checks, reviewed meaning families; no displayed product or unnecessary parentheses before division. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Retain ID and sharing/grouping. Current exact-fact-family-quotient and grouping-preserving-quotient display a product divided by its factor; they are not direct recall evidence. Add a new numerical-dividend display family and remove the old cancellation shortcut families from the sprint/main recall slice, preserving historical Attempts.

<a id="skill-ar-factors-multiples"></a>

### AR_FACTORS_MULTIPLES — גורמים וכפולות שימושיים

**Identity:** Reuse current ID; short student label **גורמים וכפולות**; Domain **ARITHMETIC**; optional Group **None; optional fraction-support branch**.

**Roadmap coverage:** Support for A2.2, A2.7; not a required standalone roadmap item.

**Target:** Identify divisibility and small common factors or multiples needed for fraction work.

**Non-targets:** Prime-factorization course, formal LCM algorithm or a new mandatory arithmetic gate.

**Criticality:** P3. Retain useful support without making terminology an Entry bottleneck.

**Prerequisites:** None.

**Supporting Skills:** AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9.

**Downstream:** Equivalent fractions and simple denominator selection.

**Primary misconceptions:** `reverses-factor-multiple`, `selects-factor-as-multiple`, `common-for-one-only`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / high / medium / none.

**Literacy target:** Light; no long divisibility stories.

**Bands:** A: membership in one factor/multiple set; B: a common candidate for two small values. Legacy magnitude C stays available outside required evidence.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| identify-factors | conceptual — Identify a divisor using small familiar products. | generator / multiChoice | reverses-factor-multiple / AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | light | A: one integer; B: shared factor | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| identify-multiples | conceptual — Identify valid multiples, reusing current membership family. | generator / multiChoice | selects-factor-as-multiple / AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | light | A: one base; B: common multiple | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| common-candidate-check | reasoning — Check why one candidate works for both values. | generator / singleChoice | common-for-one-only / AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | light | B: compare two proposed common denominators | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- אילו מהמספרים הנתונים הם גורמים של `12`?
- איזה מספר מתאים כמכנה לשברים שמכניהם `3` ו־`4`?

**Evidence policy proposal:** minimum 10 real Attempts; required categories conceptual: 8; reasoning: 2; required Bands A: 4; B: 6. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Both factor and multiple directions, including common-candidate reasoning and distractors that reverse the relationship. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Keep the combined ID and existing four families. Add an actual reasoning family or remove the generic reasoning quota; preferred design adds the small common-candidate check. Remains optional/support, not a prerequisite access lock.

<a id="skill-int-number-line"></a>

### INT_NUMBER_LINE — מיקום וכיוון בציר המספרים

**Identity:** Reuse current ID; short student label **ציר המספרים**; Domain **INTEGERS**; optional Group **INT_MEANING (proposed presentation group)**.

**Roadmap coverage:** A3.1, A3.4.

**Target:** Interpret signed positions, direction and crossing zero on a number line.

**Non-targets:** Verbal step counting without a visible axis; full absolute-value theory.

**Criticality:** P5. Signed meaning is needed across the Entry algebra path.

**Prerequisites:** None.

**Supporting Skills:** AR_ADD_FACTS, AR_SUB_FACTS.

**Downstream:** coordinate quadrants and signed arithmetic

**Primary misconceptions:** `zero-is-positive`, `minus-is-decoration`, `counts-ticks-not-intervals`, `reverses-direction`, `always-adds-distance`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / medium / none / high.

**Literacy target:** None/light for new direct forms; keep current moderate verbal forms in ordinary practice.

**Bands:** A: signs, zero and locations; B: move in one half-line; C: cross zero. Axis direction and equal scale remain fixed.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| sign-zero-classification | conceptual — Distinguish zero from positive and negative values. | generator / singleChoice | zero-is-positive; minus-is-decoration / None | light | A: positive, negative, zero | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| read-signed-position | representation — Read or choose a labelled position on a reviewed line. | mixed / singleChoice | counts-ticks-not-intervals; reverses-direction / None | light | A: read one tick; B: locate either side of zero | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| directed-move | representation — Represent displacement and finish at a signed coordinate. | mixed / numeric | always-adds-distance / AR_ADD_FACTS, AR_SUB_FACTS | light | B: left/right within a half-line; C: cross zero | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |

**Representative archetypes (not bank items):**

- מהו המספר בנקודה המסומנת?
- מ־`-2` נעים שלוש יחידות ימינה; היכן מגיעים?

**Evidence policy proposal:** minimum 10 real Attempts; required categories conceptual: 4; representation: 6; required Bands A: 4; B: 3; C: 3. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Retain reviewed sign invariants, add the listed missing distinctions, and supply both positive and negative cases plus zero where mathematically appropriate. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Retain current four families; add direct visual location, rightward motion and explicit sign/zero classification. Current leftward verbal prompts are useful but not full axis coverage.

<a id="skill-int-compare"></a>

### INT_COMPARE — השוואת מספרים מכוונים

**Identity:** Reuse current ID; short student label **השוואה**; Domain **INTEGERS**; optional Group **INT_MEANING (proposed presentation group)**.

**Roadmap coverage:** A3.2, A3.3.

**Target:** Order signed integers using sign and relative location.

**Non-targets:** Computing unrelated expressions or formal absolute-value notation.

**Criticality:** P5. Signed meaning is needed across the Entry algebra path.

**Prerequisites:** INT_NUMBER_LINE.

**Supporting Skills:** None.

**Downstream:** inequalities and graph interpretation

**Primary misconceptions:** `ignores-sign`, `larger-magnitude-is-greater`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / high / medium / none.

**Literacy target:** None/light for new direct forms; keep current moderate verbal forms in ordinary practice.

**Bands:** A: negative versus zero/positive; B: two negatives, adjacent then nonadjacent. Current C remains a harder magnitude variant, not mandatory new meaning.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| negative-versus-positive | conceptual — Use sign before magnitude. | generator / singleChoice | ignores-sign / None | light | A: mixed signs and zero | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| signed-comparison | reasoning — Use closeness to zero to compare two negatives. | generator / singleChoice | larger-magnitude-is-greater / None | light | B: compare adjacent/nonadjacent negatives | KaTeX only; no visual/media dependency | Yes | No | No | Yes |

**Representative archetypes (not bank items):**

- `-5 \square 2`
- `-9 \square -4`

**Evidence policy proposal:** minimum 10 real Attempts; required categories conceptual: 4; reasoning: 6; required Bands A: 4; B: 6. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Retain reviewed sign invariants, add the listed missing distinctions, and supply both positive and negative cases plus zero where mathematically appropriate. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Existing coverage is sufficient for A3.2–3; preserve reviewed families and RTL operand order. No need to invent a new signed-order Skill.

<a id="skill-int-negation"></a>

### INT_NEGATION — מספר נגדי ומשמעות מינוס

**Identity:** Reuse current ID; short student label **מספר נגדי**; Domain **INTEGERS**; optional Group **INT_MEANING (proposed presentation group)**.

**Roadmap coverage:** A3.5, A3.6.

**Target:** Interpret unary negation and distinguish it from subtraction.

**Non-targets:** Multi-operation subtraction or an absolute-value chapter.

**Criticality:** P5. Signed meaning is needed across the Entry algebra path.

**Prerequisites:** INT_NUMBER_LINE.

**Supporting Skills:** None.

**Downstream:** signed substitution and negative coefficients

**Primary misconceptions:** `keeps-sign`, `zero-has-no-opposite`, `all-minuses-mean-subtract`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / high / none / none.

**Literacy target:** None/light for new direct forms; keep current moderate verbal forms in ordinary practice.

**Bands:** A: opposite of positive and zero; B: opposite of negative and unary/binary role contrast. No artificial C.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| opposite-number-structure | conceptual — Reuse the positive/negative forms and zero edge case. | generator / singleChoice | keeps-sign; zero-has-no-opposite / None | light | A: positive and zero; B: negative input | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| minus-role-contrast | conceptual — Identify what the minus acts on in a short expression. | generator / singleChoice | all-minuses-mean-subtract / ALG_VARIABLE only in optional symbolic variant | light | B: unary negation versus binary subtraction | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- מהו הנגדי של `-7`?
- ב־`5-(-2)`, איזה מינוס מסמן נגדי?

**Evidence policy proposal:** minimum 10 real Attempts; required categories conceptual: 10; required Bands A: 4; B: 6. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Retain reviewed sign invariants, add the listed missing distinctions, and supply both positive and negative cases plus zero where mathematically appropriate. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Keep opposite families and zero item. Add minus-role contrast; remove unattainable reasoning/C requirements rather than manufacture harder negation.

<a id="skill-int-add"></a>

### INT_ADD — חיבור מספרים מכוונים

**Identity:** Reuse current ID; short student label **חיבור מכוונים**; Domain **INTEGERS**; optional Group **INT_OPERATIONS (proposed presentation group)**.

**Roadmap coverage:** A3.7–A3.11.

**Target:** Apply חיבור מכוונים using explicit operand-sign structures and a justified sign/result.

**Non-targets:** Positive-only routine practice, arbitrary two-digit by two-digit multiplication, long division or symbolic equation solving.

**Criticality:** P5. Reuse structurally reviewed content rather than rebuild a mature bank.

**Prerequisites:** INT_NUMBER_LINE.

**Supporting Skills:** AR_ADD_FACTS.

**Downstream:** Substitution, fraction signs, linear equations and later algebra.

**Primary misconceptions:** `drops-negative`, `applies-wrong-sign-rule`, `adds-magnitudes`, `drops-middle-addend`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / low / none.

**Literacy target:** None/light; any new short mode slice removes calculation instructions and symbolic support load.

**Bands:** A: small magnitudes; B/C: existing increasing magnitudes. Explicit sign/result constraints remain invariant; the B cancellation family introduces a genuine nonadjacent opposite pair.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| negative-plus-positive-positive-result | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / AR_ADD_FACTS | none | A: magnitude 1–10; B: 11–30; C: 31–100 | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| negative-plus-positive-negative-result | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / AR_ADD_FACTS | none | A: magnitude 1–10; B: 11–30; C: 31–100 | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| negative-plus-negative | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / AR_ADD_FACTS | none | A: magnitude 1–10; B: 11–30; C: 31–100 | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| opposites-result-zero | conceptual — Recognize cancellation to zero. | generator / singleChoice | adds-magnitudes / None | light | A: adjacent opposite pair | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| nonadjacent-opposite-pair | reasoning — Reuse the existing MVP_INT_ADD_OPPOSITES_B structure, preserving the remaining addend sign. | generator / singleChoice | drops-middle-addend / INT_NEGATION | light | B: cancel pair around a remaining term | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- `(-7)+10`
- `(-5)+(-2)+5`

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 7; conceptual: 3; required Bands A: 5; B: 3; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** All listed sign/result patterns, preserved numeric constraints and zero exclusions. Mode availability is blocked until the actual selected short family slice is nonempty. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse current calculation and conceptual families unchanged in meaning. Mode eligibility needs an explicitly reviewed short subset; do not bulk-tag all definitions.

<a id="skill-int-sub"></a>

### INT_SUB — חיסור מספרים מכוונים

**Identity:** Reuse current ID; short student label **חיסור מכוונים**; Domain **INTEGERS**; optional Group **INT_OPERATIONS (proposed presentation group)**.

**Roadmap coverage:** A3.12–A3.16.

**Target:** Apply חיסור מכוונים using explicit operand-sign structures and a justified sign/result.

**Non-targets:** Positive-only routine practice, arbitrary two-digit by two-digit multiplication, long division or symbolic equation solving.

**Criticality:** P5. Reuse structurally reviewed content rather than rebuild a mature bank.

**Prerequisites:** INT_NEGATION.

**Supporting Skills:** INT_ADD, AR_SUB_FACTS.

**Downstream:** Substitution, fraction signs, linear equations and later algebra.

**Primary misconceptions:** `drops-negative`, `applies-wrong-sign-rule`, `changes-first-sign`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / none.

**Literacy target:** None/light; any new short mode slice removes calculation instructions and symbolic support load.

**Bands:** A/B/C retain current magnitude progression; sign-pattern families remain distinct. Do not require broad random sign sampling.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| positive-minus-larger-positive | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / INT_ADD, AR_SUB_FACTS | none | A: magnitude 1–10; B: 11–30; C: 31–100 | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| positive-minus-negative | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / INT_ADD, AR_SUB_FACTS | none | A: magnitude 1–10; B: 11–30; C: 31–100 | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| negative-minus-positive | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / INT_ADD, AR_SUB_FACTS | none | A: magnitude 1–10; B: 11–30; C: 31–100 | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| negative-minus-negative | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / INT_ADD, AR_SUB_FACTS | none | A: magnitude 1–10; B: 11–30; C: 31–100 | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| subtract-negative-as-addition | conceptual — Reuse inverse-operation meaning. | generator / singleChoice | changes-first-sign / INT_NEGATION | light | A: rewrite subtracting a negative | KaTeX only; no visual/media dependency | Yes | No | No | Yes |

**Representative archetypes (not bank items):**

- `4-(-6)`
- בחרו את הסימן/השכתוב התקף בלי חישוב ארוך.

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 7; conceptual: 3; required Bands A: 5; B: 3; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** All listed sign/result patterns, preserved numeric constraints and zero exclusions. Mode availability is blocked until the actual selected short family slice is nonempty. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse current calculation and conceptual families unchanged in meaning. Mode eligibility needs an explicitly reviewed short subset; do not bulk-tag all definitions.

<a id="skill-int-mul"></a>

### INT_MUL — כפל מספרים מכוונים

**Identity:** Reuse current ID; short student label **כפל מכוונים**; Domain **INTEGERS**; optional Group **INT_OPERATIONS (proposed presentation group)**.

**Roadmap coverage:** A3.17–A3.20.

**Target:** Apply כפל מכוונים using explicit operand-sign structures and a justified sign/result.

**Non-targets:** Positive-only routine practice, arbitrary two-digit by two-digit multiplication, long division or symbolic equation solving.

**Criticality:** P5. Reuse structurally reviewed content rather than rebuild a mature bank.

**Prerequisites:** INT_NUMBER_LINE.

**Supporting Skills:** AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9.

**Downstream:** Substitution, fraction signs, linear equations and later algebra.

**Primary misconceptions:** `drops-negative`, `applies-wrong-sign-rule`, `two-negatives-stay-negative`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / none.

**Literacy target:** None/light; any new short mode slice removes calculation instructions and symbolic support load.

**Bands:** A: small signed products; B: deliberate mental factors 10, 11, 20, 30 and symbolic sign reasoning. No C required.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| negative-times-positive | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | none | A: small factors; B: deliberate mental factor | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| positive-times-negative | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | none | A: small factors; B: deliberate mental factor | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| negative-times-negative | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | none | A: small factors; B: deliberate mental factor | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| multiplication-sign-rules | conceptual — Determine sign without performing a large calculation. | generator / singleChoice | two-negatives-stay-negative / ALG_VARIABLE in B only | light | A: numeric operands, sign only; B: symbolic sign conditions | KaTeX only; no visual/media dependency | Yes — A | No | No | Yes — A |

**Representative archetypes (not bank items):**

- `(-3)\cdot 5`
- בחרו את הסימן/השכתוב התקף בלי חישוב ארוך.

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 8; conceptual: 2; required Bands A: 6; B: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** All listed sign/result patterns, preserved numeric constraints and zero exclusions. Mode availability is blocked until the actual selected short family slice is nonempty. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse current calculation and conceptual families unchanged in meaning. Mode eligibility needs an explicitly reviewed short subset; do not bulk-tag all definitions.

<a id="skill-int-div"></a>

### INT_DIV — חילוק מספרים מכוונים

**Identity:** Reuse current ID; short student label **חילוק מכוונים**; Domain **INTEGERS**; optional Group **INT_OPERATIONS (proposed presentation group)**.

**Roadmap coverage:** A3.21–A3.24.

**Target:** Apply חילוק מכוונים using explicit operand-sign structures and a justified sign/result.

**Non-targets:** Positive-only routine practice, arbitrary two-digit by two-digit multiplication, long division or symbolic equation solving.

**Criticality:** P5. Reuse structurally reviewed content rather than rebuild a mature bank.

**Prerequisites:** INT_NUMBER_LINE.

**Supporting Skills:** AR_DIV_F_2_5_10, AR_DIV_F_3_4, AR_DIV_F_6_7, AR_DIV_F_8_9.

**Downstream:** Substitution, fraction signs, linear equations and later algebra.

**Primary misconceptions:** `drops-negative`, `applies-wrong-sign-rule`, `two-negatives-stay-negative`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / none.

**Literacy target:** None/light; any new short mode slice removes calculation instructions and symbolic support load.

**Bands:** A: concrete small exact quotient; B: sign reasoning without magnitude load. No numeric B or artificial C needed.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| negative-divided-by-positive | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / AR_DIV_F_2_5_10, AR_DIV_F_3_4, AR_DIV_F_6_7, AR_DIV_F_8_9 | none | A: small exact result | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| positive-divided-by-negative | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / AR_DIV_F_2_5_10, AR_DIV_F_3_4, AR_DIV_F_6_7, AR_DIV_F_8_9 | none | A: small exact result | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| negative-divided-by-negative | calculation — Preserve this exact reviewed sign pattern and constraints. | generator / numeric | drops-negative; applies-wrong-sign-rule / AR_DIV_F_2_5_10, AR_DIV_F_3_4, AR_DIV_F_6_7, AR_DIV_F_8_9 | none | A: small exact result | KaTeX only; no visual/media dependency | Yes — A | No | Yes — A | Yes — A |
| division-sign-rules | conceptual — Determine sign without performing a large calculation. | generator / singleChoice | two-negatives-stay-negative / ALG_VARIABLE in B only | light | A: numeric operands, sign only; B: symbolic sign conditions | KaTeX only; no visual/media dependency | Yes — A | No | No | Yes — A |

**Representative archetypes (not bank items):**

- `(-24)\div 6`
- בחרו את הסימן/השכתוב התקף בלי חישוב ארוך.

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 8; conceptual: 2; required Bands A: 8; B: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** All listed sign/result patterns, preserved numeric constraints and zero exclusions. Mode availability is blocked until the actual selected short family slice is nonempty. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse all sign structures. Current calculation displays also expose the constructed dividend as a product; make a later material display-family revision for direct division placement, keeping internal exactness and historical IDs intact.

<a id="skill-frac-meaning"></a>

### FRAC_MEANING — משמעות השבר

**Identity:** Reuse current ID; short student label **משמעות השבר**; Domain **FRACTIONS**; optional Group **FRAC_FOUNDATIONS (proposed)**.

**Roadmap coverage:** A2.1, A2.3.

**Target:** Interpret a fraction as equal-unit quantity, quotient and location relative to one.

**Non-targets:** Repeated verbal numerator/denominator quizzes; computation of fraction operations.

**Criticality:** P4. Meaning is essential, but terminology must not consume the chapter.

**Prerequisites:** None.

**Supporting Skills:** AR_DIV_F_2_5_10; INT_NUMBER_LINE for axis conventions.

**Downstream:** Fraction arithmetic, rational coefficients and graph scales.

**Primary misconceptions:** `counts-pieces-without-equality`, `reverses-part-whole`, `counts-ticks-not-intervals`, `resets-after-one`, `fraction-is-two-unrelated-numbers`, `all-fractions-less-than-one`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / medium / none / high.

**Literacy target:** Predominantly none/light; a small moderate context slice only.

**Bands:** A: equal parts of a unit; B: set/quotient/number-line conversion; C: fractions greater than one. Keep denominators simple and the reference whole explicit.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| equal-unit-representation | representation — Translate reviewed shaded quantities to a fraction, including nonexamples with unequal parts. | mixed / singleChoice | counts-pieces-without-equality; reverses-part-whole / None | light | A: equal partition; B: fraction of a set | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| fraction-on-number-line | representation — Extend existing KaTeX line beyond the unit interval. | mixed / singleChoice | counts-ticks-not-intervals; resets-after-one / INT_NUMBER_LINE | light | B: between zero and one; C: across one | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| fraction-as-quotient | conceptual — Interpret a/b as a divided by b without asking formal terminology. | generator / singleChoice | fraction-is-two-unrelated-numbers / AR_DIV_F_2_5_10 | light | B: small equal sharing | KaTeX only; no visual/media dependency | Yes | No | No | No |
| benchmark-one | conceptual — Compare numerator and denominator relative to the same unit. | generator / singleChoice | all-fractions-less-than-one / None | light | A: less/equal one; C: greater than one | KaTeX only; no visual/media dependency | Yes | No | No | Yes |

**Representative archetypes (not bank items):**

- איזה שבר מתאים לחלק המסומן?
- `7/5 \square 1`

**Evidence policy proposal:** minimum 10 real Attempts; required categories representation: 6; conceptual: 4; required Bands A: 3; B: 5; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** At least part-whole, set, quotient and number-line families; both proper and improper fractions; stable unit and equal-part evidence must be visually reviewed. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Keep ID; current selected-parts/set/line families provide partial coverage. Retain numerator/denominator prompts sparingly. Add quotient meaning and beyond-one representations. Remove AR_PLACE_VALUE as a default dependency of the Entry profile; it is not the target.

<a id="skill-frac-equiv"></a>

### FRAC_EQUIV — שקילות שברים והכנה לפעולות

**Identity:** Reuse current ID; short student label **שברים שווים**; Domain **FRACTIONS**; optional Group **FRAC_FOUNDATIONS (proposed)**.

**Roadmap coverage:** A2.2, A2.7, A2.14.

**Target:** Preserve a fraction value while expanding, simplifying, matching denominators or moving a negative sign.

**Non-targets:** LCM as an independent course, fraction addition or solving equations.

**Criticality:** P5. Expansion and reduction are inverse directions of one invariant; family diagnosis is more useful than duplicating Mastery.

**Prerequisites:** FRAC_MEANING.

**Supporting Skills:** AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9; AR_FACTORS_MULTIPLES optional; INT_NEGATION for signed family.

**Downstream:** Unlike-denominator arithmetic and rational equations.

**Primary misconceptions:** `changes-numerator-only`, `adds-to-both`, `subtracts-instead-of-divides`, `partial-is-full`, `changes-denominator-only`, `common-for-one-only`, `scales-one-part`, `sign-stays-in-denominator`, `double-negative-remains-negative`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / medium / high / medium.

**Literacy target:** None/light; conceptual justification uses a short closed choice.

**Bands:** A: stated scale/common factor; B: missing scale or related common denominator; C: choose a simple common denominator for unrelated small denominators and justify sign/value preservation. No arbitrary large factor search.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| expand-equivalent-fraction | representation — Reuse current forward family, with numeric completion as well as choice. | generator / singleChoice | changes-numerator-only; adds-to-both / AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | light | A: given multiplier; B: missing numerator | KaTeX only; no visual/media dependency | Yes | No | No | No |
| simplify-equivalent-fraction | reasoning — Reuse reverse family; distinguish one legal reduction from irreducibility. | generator / singleChoice | subtracts-instead-of-divides; partial-is-full / AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | light | A: given common divisor; B: missing denominator; C: fully reduced fraction | KaTeX only; no visual/media dependency | Yes | No | No | No |
| common-denominator-pair | representation — Build two equivalent fractions with a shared denominator, accepting any valid common denominator. | generator / singleChoice | changes-denominator-only; common-for-one-only / AR_FACTORS_MULTIPLES optional; multiplication facts | light | B: one denominator divides the other; C: small unrelated denominators | KaTeX only; no visual/media dependency | Yes | No | No | No |
| value-preservation-check | conceptual — Name/check why scaling both parts preserves value. | generator / singleChoice | adds-to-both; scales-one-part / None | light | A: same nonzero factor; B: contrast invalid additive change | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| negative-sign-equivalence | representation — Match equivalent signed forms without changing the fraction operation. | generator / singleChoice | sign-stays-in-denominator; double-negative-remains-negative / INT_NEGATION, INT_MUL | light | B: external versus numerator sign; C: denominator sign and two negatives | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- `2/3=\square/12`
- בחרו זוג שברים שווי ערך ל־`1/3,1/4` עם אותו מכנה.

**Evidence policy proposal:** minimum 12 real Attempts; required categories representation: 7; reasoning: 2; conceptual: 3; required Bands A: 5; B: 4; C: 3. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Forward/reverse, missing element, full reduction, common denominator and signed equivalence all reviewed; division by zero and non-common scaling rejected; arithmetic accepted by exact rational equivalence. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse FRAC_EQUIV. Existing C forward asks why but is authored reasoning; add a genuinely conceptual invariant-check family rather than relabel it merely to satisfy a quota. Scope additions keep the value-preservation identity; no new expansion/simplification ID.

<a id="skill-frac-compare"></a>

### FRAC_COMPARE — השוואת שברים

**Identity:** New stable ID proposed; short student label **השוואת שברים**; Domain **FRACTIONS**; optional Group **FRAC_FOUNDATIONS (proposed)**.

**Roadmap coverage:** A2.4; uses A2.3.

**Target:** Order two fractions by unit size, numerator or a simple common denominator.

**Non-targets:** Decimal conversion as mandatory method, denominator magnitude alone, equation solving.

**Criticality:** P4. A learner can transform equivalent forms yet still reverse the order relation.

**Prerequisites:** FRAC_MEANING, FRAC_EQUIV.

**Supporting Skills:** AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9.

**Downstream:** Rational order, plausibility and later inequalities.

**Primary misconceptions:** `ignores-numerator`, `larger-denominator-is-larger-fraction`, `compares-both-integers-separately`, `compares-different-wholes`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / medium / high / medium.

**Literacy target:** None/light.

**Bands:** A: same denominator; B: same numerator and related denominators; C: simple common denominator. Keep the same whole and modest factors.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| same-denominator-order | reasoning — Order equal units. | generator / singleChoice | ignores-numerator / None | light | A: compare numerators | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| same-numerator-order | conceptual — Explain why a larger denominator gives smaller equal-count parts. | generator / singleChoice | larger-denominator-is-larger-fraction / None | light | B: compare unit sizes | KaTeX only; no visual/media dependency | Yes | No | No | No |
| common-unit-order | reasoning — Compare equivalent forms without unnecessary cross-product load. | generator / singleChoice | compares-both-integers-separately / FRAC_EQUIV | light | B: related denominators; C: simple shared denominator | KaTeX only; no visual/media dependency | Yes | No | No | No |
| visual-order | representation — Connect comparison to equal-whole reviewed strips/lines. | mixed / singleChoice | compares-different-wholes / None | light | A: same whole; B: same numerator | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |

**Representative archetypes (not bank items):**

- `3/7 \square 5/7`
- `3/4 \square 3/8`

**Evidence policy proposal:** minimum 10 real Attempts; required categories reasoning: 5; conceptual: 3; representation: 2; required Bands A: 3; B: 5; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** All four comparison structures, equal fractions as a possible answer, common whole in visuals and misconception-aware comparisons. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID: order is a distinct diagnostic target from equivalence. Existing FRAC_EQUIV may support but cannot provide ordering evidence.

<a id="skill-frac-add-sub"></a>

### FRAC_ADD_SUB — חיבור וחיסור שברים

**Identity:** New stable ID proposed; short student label **חיבור וחיסור שברים**; Domain **FRACTIONS**; optional Group **FRAC_OPERATIONS (proposed)**.

**Roadmap coverage:** A2.5, A2.6, A2.8, A2.9.

**Target:** Add or subtract rational quantities after expressing them in common units.

**Non-targets:** Large LCM searches, mixed-number algorithms as compulsory targets, fraction equations.

**Criticality:** P5. Same/unlike denominators share the additive-unit invariant; direction and denominator relation require family diagnostics, not four new Mastery scores.

**Prerequisites:** FRAC_MEANING, FRAC_EQUIV.

**Supporting Skills:** AR_ADD_FACTS, AR_SUB_FACTS; INT_ADD, INT_SUB for signed extension.

**Downstream:** Rational coefficients and fraction equations.

**Primary misconceptions:** `add-denominators`, `subtract-denominators`, `add-numerators-and-denominators`, `reverses-to-positive`, `subtracts-before-scaling`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / none.

**Literacy target:** None for calculations; light for error checks.

**Bands:** A: equal denominators; B: related denominators; C: simple unrelated denominators. Add/subtract are balanced within each structure; initial answers may be improper, but totals remain simple.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| add-same-denominator | calculation — Add numerators and preserve the unit. | generator / numeric | add-denominators / AR_ADD_FACTS | none | A: equal units | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| subtract-same-denominator | calculation — Subtract numerators without subtracting denominators. | generator / numeric | subtract-denominators / AR_SUB_FACTS | none | A: nonnegative difference | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| add-unlike-denominators | calculation — Use equivalence before addition. | generator / numeric | add-numerators-and-denominators / FRAC_EQUIV, AR_ADD_FACTS | none | B: related denominators; C: small common denominator | KaTeX only; no visual/media dependency | Yes | No | No | No |
| subtract-unlike-denominators | calculation — Preserve subtraction order during conversion. | generator / numeric | reverses-to-positive; subtracts-before-scaling / FRAC_EQUIV, AR_SUB_FACTS | none | B: related denominators; C: small common denominator | KaTeX only; no visual/media dependency | Yes | No | No | No |
| unit-error-check | conceptual — Identify the additive-unit error in a short worked line. | generator / singleChoice | add-denominators / None | light | A: why denominator stays; B: why conversion is needed | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- `2/3+1/4`
- האם `1/2+1/3=2/5`? בחרו תיקון.

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 8; conceptual: 2; required Bands A: 4; B: 4; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Both operations across all three denominator relationships, exact rational acceptance and deliberate denominator-error distractors. A learner must see subtraction as well as addition. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID. No active fraction-operation family exists; parser support is not content coverage. Keep addition/subtraction as named family-level diagnoses.

<a id="skill-frac-multiply"></a>

### FRAC_MULTIPLY — כפל בשבר וכפל שברים

**Identity:** New stable ID proposed; short student label **כפל שברים**; Domain **FRACTIONS**; optional Group **FRAC_OPERATIONS (proposed)**.

**Roadmap coverage:** A2.10, A2.11.

**Target:** Multiply a whole number or fraction by a fraction, interpreting the operation as scaling.

**Non-targets:** Long integer multiplication, cross-cancelling across sums, equations.

**Criticality:** P5. Whole-number scaling is P5; fraction-by-fraction is a P4 family under the same multiplicative identity.

**Prerequisites:** FRAC_MEANING, FRAC_EQUIV.

**Supporting Skills:** AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9.

**Downstream:** Fraction coefficients and distributive work.

**Primary misconceptions:** `multiplies-denominator-too`, `adds-denominators`, `inverts-for-multiplication`, `multiplication-always-increases`, `counts-one-direction-only`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / medium.

**Literacy target:** None/light; optional brief scaling contexts.

**Bands:** A: whole number by fraction; B: fraction by fraction; C: optional pre-cancellation, not compulsory before first activation. Keep small factors and exact results.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| whole-times-fraction | calculation — Treat a whole number as a fraction with denominator one. | generator / numeric | multiplies-denominator-too / AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | none | A: whole times proper/improper fraction | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| fraction-times-fraction | calculation — Multiply numerator pair and denominator pair. | generator / numeric | adds-denominators; inverts-for-multiplication / AR_MUL_F_2_5_10, AR_MUL_F_3_4, AR_MUL_F_6_7, AR_MUL_F_8_9 | none | B: two fractions | KaTeX only; no visual/media dependency | Yes | No | No | No |
| scaling-size-check | conceptual — Check product size without relying on the whole-number always-bigger rule. | generator / singleChoice | multiplication-always-increases / None | light | A: factor below one; B: compare below/above one factors | KaTeX only; no visual/media dependency | Yes | No | No | No |
| area-scaling-model | representation — Interpret a reviewed unit rectangle; no arbitrary geometry knowledge. | mixed / singleChoice | counts-one-direction-only / FRAC_MEANING | light | B: portion of a portion | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | No | No | No | No |

**Representative archetypes (not bank items):**

- `3\cdot 2/5`
- `2/3\cdot 3/4`

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 8; conceptual: 2; required Bands A: 6; B: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Whole and fractional factor structures plus size meaning, with reviewed optional visual scaling and equivalent-answer acceptance. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID; existing arithmetic product families are supporting facts only.

<a id="skill-frac-divide"></a>

### FRAC_DIVIDE — הופכי וחילוק שברים

**Identity:** New stable ID proposed; short student label **חילוק שברים**; Domain **FRACTIONS**; optional Group **FRAC_OPERATIONS (proposed)**.

**Roadmap coverage:** A2.12, A2.13.

**Target:** Divide by a nonzero rational quantity using its reciprocal while preserving operand order.

**Non-targets:** A standalone reciprocal-vocabulary course, zero reciprocal, equations or long division.

**Criticality:** P4. Reciprocal is the conceptual part of the division operation, not an independent Mastery identity.

**Prerequisites:** FRAC_MULTIPLY, FRAC_EQUIV.

**Supporting Skills:** Division fact groups.

**Downstream:** Rational equations and later algebraic fractions.

**Primary misconceptions:** `negates-instead-of-inverts`, `reciprocal-zero`, `division-always-decreases`, `invert-first`, `invert-both`, `multiply-without-inversion`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / medium / none.

**Literacy target:** None/light.

**Bands:** A: reciprocal and division by a unit fraction; B: general simple fractions. Dividend may be zero; divisor must not be zero.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| reciprocal-product-one | conceptual — Define reciprocal through a product, not a memorized term alone. | generator / singleChoice | negates-instead-of-inverts; reciprocal-zero / None | light | A: find multiplier giving one; B: include improper fraction and whole number | KaTeX only; no visual/media dependency | Yes | No | No | No |
| divide-by-unit-fraction | calculation — Interpret how many unit-fraction groups fit. | generator / numeric | division-always-decreases / FRAC_MULTIPLY | none | A: simple exact rational quotient | KaTeX only; no visual/media dependency | Yes | No | No | No |
| divide-general-fractions | calculation — Multiply by the reciprocal of the divisor, retaining the dividend. | generator / numeric | invert-first; invert-both / FRAC_MULTIPLY, FRAC_EQUIV | none | B: invert divisor only | KaTeX only; no visual/media dependency | Yes | No | No | No |
| division-rewrite-check | reasoning — Locate inversion/order errors in a closed short comparison. | generator / singleChoice | invert-first; multiply-without-inversion / None | light | B: choose valid equivalent product | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- `2/3\div 4/5`
- `3/4\cdot \square=1`

**Evidence policy proposal:** minimum 12 real Attempts; required categories conceptual: 3; calculation: 7; reasoning: 2; required Bands A: 6; B: 6. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Unit/general divisors, whole/improper reciprocal cases, zero-dividend/nonzero-divisor distinction and exact answer forms. No equation application here. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID, combining reciprocal meaning with the operation it justifies.

<a id="skill-ops-order-basic"></a>

### OPS_ORDER_BASIC — סדר פעולות וסוגריים

**Identity:** Reuse current ID; short student label **סדר פעולות**; Domain **ORDER_OF_OPERATIONS**; optional Group **OPS_EVALUATION (proposed)**.

**Roadmap coverage:** A4.1–A4.4; A3 checkpoint.

**Target:** Evaluate short expressions by grouping, precedence and left-to-right order at equal precedence.

**Non-targets:** Power meaning as a new target, long arithmetic chains or distribution.

**Criticality:** P5. Parentheses and precedence belong to one evaluation-order identity; power meaning deserves its own diagnosis.

**Prerequisites:** None.

**Supporting Skills:** Arithmetic facts; INT_ADD, INT_SUB, INT_MUL, INT_DIV for signed variants; OPS_POWERS for later power-containing variants.

**Downstream:** Substitution, algebra and equations.

**Primary misconceptions:** `works-strictly-left-to-right`, `ignores-parentheses`, `multiply-always-before-divide`, `drops-negative`, `groups-by-sign`, `addition-first`, `ignores-grouping`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / none.

**Literacy target:** None/light.

**Bands:** A: two operation levels; B: same-precedence chains and one pair of parentheses; C: short signed mixtures. Operands remain easy; do not extend difficulty through length alone.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| precedence-calculation | calculation — Reuse current product/addition structures and add division variants. | generator / numeric | works-strictly-left-to-right / Arithmetic facts | none | A: multiply/divide before add/subtract | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| parentheses-calculation | calculation — Go beyond choosing the first operation to compute the final value. | generator / numeric | ignores-parentheses / Arithmetic facts | none | B: one grouping override | KaTeX only; no visual/media dependency | Yes | No | No | No |
| equal-precedence-calculation | calculation — Evaluate the complete chain in left-to-right order. | generator / numeric | multiply-always-before-divide / Arithmetic facts | none | B: subtraction/addition and division/multiplication | KaTeX only; no visual/media dependency | Yes | No | No | No |
| signed-order | calculation — Apply known sign operations within the same precedence rule. | generator / numeric | drops-negative; groups-by-sign / INT_ADD, INT_SUB, INT_MUL, INT_DIV | none | C: short signed mixed operations | KaTeX only; no visual/media dependency | Yes | No | No | No |
| identify-first-operation | conceptual — Reuse first-operation and same-precedence conceptual families. | generator / singleChoice | addition-first; ignores-grouping / None | light | A: ordinary precedence; B: same precedence or parentheses | KaTeX only; no visual/media dependency | Yes | No | No | Yes |

**Representative archetypes (not bank items):**

- `(3+5)\cdot 2`
- `12\div 3\cdot 2`

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 8; conceptual: 2; required Bands A: 4; B: 4; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Full evaluation and conceptual choices for grouping, both equal-precedence pairs and signed mixtures; no new OPS_PARENS identity. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse OPS_ORDER_BASIC and its first-operation families. Current parentheses/equal-precedence evidence is conceptual only; add final-value families. Replacing old magnitude Bands with structural profiles needs explicit definition/policy version review.

<a id="skill-ops-powers"></a>

### OPS_POWERS — משמעות חזקה וריבועים

**Identity:** New stable ID proposed; short student label **חזקות וריבועים**; Domain **ORDER_OF_OPERATIONS**; optional Group **OPS_POWERS_ROOTS (proposed)**.

**Roadmap coverage:** A4.5, A4.6, A4.8.

**Target:** Interpret a natural exponent as repeated multiplication and distinguish a negative base from an external minus.

**Non-targets:** Exponent laws, negative/fractional exponents, quadratic equations or rote base/exponent vocabulary.

**Criticality:** P5. Power meaning is P4, but square facts and sign scope are P5 bottlenecks that evaluation-order mastery cannot diagnose.

**Prerequisites:** None.

**Supporting Skills:** Multiplication fact groups, INT_NEGATION, INT_MUL, OPS_ORDER_BASIC.

**Downstream:** Grade 8 algebra and Grade 9 polynomial/quadratic work.

**Primary misconceptions:** `base-times-exponent`, `doubles-base`, `minus-always-squared`, `negative-even-stays-negative`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / medium.

**Literacy target:** None/light.

**Bands:** A: positive-base repeated products and squares 1–12; B: negative base versus external minus, including odd/even exponents with small factors. Squares 13–20 are optional downstream extension.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| power-as-product | representation — Preserve factor count, including exponent one. | generator / singleChoice | base-times-exponent / None | light | A: translate power to repeated product | KaTeX only; no visual/media dependency | Yes | No | No | No |
| square-facts | calculation — Recall or calculate useful square values. | generator / numeric | doubles-base / Multiplication fact groups | none | A: squares 1–12 | KaTeX only; no visual/media dependency | Yes | No | Yes | Yes |
| negative-base-scope | conceptual — Identify exactly what the exponent acts on. | generator / singleChoice | minus-always-squared / INT_NEGATION, INT_MUL | light | B: parenthesized base versus leading minus | KaTeX only; no visual/media dependency | Yes | No | No | No |
| signed-power-value | calculation — Compute a power using sign and grouping. | generator / numeric | negative-even-stays-negative / INT_MUL, OPS_ORDER_BASIC | none | B: small even/odd exponent | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- `4^2`
- השוו `(-3)^2` ו־`-3^2`.

**Evidence policy proposal:** minimum 10 real Attempts; required categories representation: 3; calculation: 5; conceptual: 2; required Bands A: 6; B: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Repeated-product meaning, square inventory 1–12 and sign-scope contrast; optional 13–20 facts do not gate Entry. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID. Legacy expression engines supporting powers are not active Skill coverage.

<a id="skill-ops-square-roots"></a>

### OPS_SQUARE_ROOTS — שורש ריבועי של ריבוע מושלם

**Identity:** New stable ID proposed; short student label **שורשים בסיסיים**; Domain **ORDER_OF_OPERATIONS**; optional Group **OPS_POWERS_ROOTS (proposed)**.

**Roadmap coverage:** A4.7.

**Target:** Identify the nonnegative square root of a perfect-square value.

**Non-targets:** Irrational approximations, root laws, both solutions of a quadratic equation.

**Criticality:** P5. Inverse square retrieval can fail independently of computing squares.

**Prerequisites:** OPS_POWERS.

**Supporting Skills:** None.

**Downstream:** Later Pythagoras and Grade 9 quadratic equations.

**Primary misconceptions:** `halves-radicand`, `returns-plus-minus`, `negative-root-selected`, `uses-perimeter-relation`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / medium.

**Literacy target:** None/light.

**Bands:** A only: perfect squares 0,1–144. Range is deliberate fact coverage, not fake A/B/C symmetry; larger squares are optional.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| perfect-square-root | calculation — Return the principal root, including zero. | generator / numeric | halves-radicand; returns-plus-minus / None | none | A: root of a perfect square | KaTeX only; no visual/media dependency | Yes | No | Yes | Yes |
| root-square-relation | conceptual — Distinguish the radical value from solving an equation. | generator / singleChoice | negative-root-selected / None | light | A: choose nonnegative value whose square matches | KaTeX only; no visual/media dependency | Yes | No | No | No |
| square-area-side | representation — Connect area to side without requiring new geometry facts. | mixed / numeric | uses-perimeter-relation / OPS_POWERS | light | A: side from labelled square area | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | No | No | No | No |

**Representative archetypes (not bank items):**

- `\sqrt{81}`
- איזה מספר לא שלילי בריבוע נותן `49`?

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 6; conceptual: 4; required Bands A: 10. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Zero/one and squares through 12, principal-root misconception checks and optional reviewed area model; only Band A is mandatory. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID for inverse-power meaning; no reuse of future Pythagoras Skill.

<a id="skill-alg-equality"></a>

### ALG_EQUALITY — שוויון, משוואה ומשמעות פתרון

**Identity:** Reuse current ID; short student label **משמעות השוויון**; Domain **ALGEBRA_FOUNDATIONS**; optional Group **ALG_LANGUAGE (proposed)**.

**Roadmap coverage:** A5.11, A8.1, A8.2.

**Target:** Interpret equality as a relation and a proposed solution as a value making both sides equal.

**Non-targets:** Solving a multi-step equation or distinguishing every type of algebraic object.

**Criticality:** P5. Relational equality connects existing meaning families to solution verification without inventing a theorem-like Skill.

**Prerequisites:** None.

**Supporting Skills:** ALG_VARIABLE and ALG_SUBSTITUTE for solution verification; arithmetic facts.

**Downstream:** All equation transformations and later functions.

**Primary misconceptions:** `equals-means-next-answer`, `every-expression-needs-solving`, `checks-one-side-only`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / high / medium / none.

**Literacy target:** Light; no long explanations required.

**Bands:** A: numeric equalities and expression/equation distinction; B: check a supplied value; C: preserve existing symbolic equal-expression reasoning as extension.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| relational-equality | conceptual — Reuse current relation and misconception families. | generator / singleChoice | equals-means-next-answer / None | light | A: noncanonical equality | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| expression-versus-equation | conceptual — Distinguish an expression from an equation with a task to satisfy. | generator / singleChoice | every-expression-needs-solving / None | light | A: presence and meaning of equality | KaTeX only; no visual/media dependency | Yes | No | No | No |
| verify-candidate-solution | reasoning — Judge a given candidate without requiring a solution algorithm. | generator / singleChoice | checks-one-side-only / ALG_SUBSTITUTE, arithmetic facts | light | B: substitute then compare sides | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- איזה מהבאים הוא משוואה: `3x+2` או `3x+2=11`?
- האם `x=3` מקיים `2x+1=7`?

**Evidence policy proposal:** minimum 10 real Attempts; required categories conceptual: 6; reasoning: 4; required Bands A: 6; B: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Relation examples in both equality orientations, expression/equation contrast and both satisfying/non-satisfying candidate values. Sequence verification after substitution to avoid circular learning. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Keep ID and existing relation families. Add explicit equation/solution interpretation with family metadata. Earlier equality evidence supports the target but does not certify new verification coverage.

<a id="skill-alg-variable"></a>

### ALG_VARIABLE — משתנים, מקדמים ואיברים

**Identity:** Reuse current ID; short student label **שפת הביטוי**; Domain **ALGEBRA_FOUNDATIONS**; optional Group **ALG_LANGUAGE (proposed)**.

**Roadmap coverage:** A5.1–A5.6.

**Target:** Read variables, coefficients and signed terms in an expression, including implicit coefficients 1 and -1.

**Non-targets:** Combining terms, substituting values as primary work, verbose contextual reading.

**Criticality:** P5. The existing ID already includes explicit coefficients; hidden coefficients extend that same expression-reading identity. Independent coefficient Mastery is not justified yet.

**Prerequisites:** ALG_EQUALITY (relation subset only).

**Supporting Skills:** INT_NEGATION for negative coefficients.

**Downstream:** Like terms, distribution, equations and later slope/polynomials.

**Primary misconceptions:** `variable-is-label-or-operation`, `3x-means-3-plus-x`, `hidden-coefficient-missing`, `missing-minus-one`, `drops-term-sign`, `constant-is-coefficient`, `variable-is-person-name`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / high / none / high.

**Literacy target:** Mostly light; retain current moderate/high context items only outside gateway and speed profiles.

**Bands:** A: variable and explicit positive coefficient; B: signed/hidden coefficient; C: term boundaries and constant among several terms. A number is not added merely to create a harder Band.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| variable-concepts | conceptual — Reuse existing variable meaning/explicit coefficient questions. | generator / singleChoice | variable-is-label-or-operation / None | light | A: variable versus coefficient | KaTeX only; no visual/media dependency | Yes | No | No | No |
| implicit-multiplication | representation — Read 3x as multiplication, including reverse representation. | generator / singleChoice | 3x-means-3-plus-x / None | light | A: coefficient notation to product | KaTeX only; no visual/media dependency | Yes | No | No | No |
| hidden-coefficient | representation — Make the implicit signed multiplier explicit. | generator / singleChoice | hidden-coefficient-missing; missing-minus-one / INT_NEGATION | light | B: x=1x and -x=-1x | KaTeX only; no visual/media dependency | Yes | No | No | No |
| term-and-constant-reading | conceptual — Identify terms including their signs without simplifying them. | generator / singleChoice | drops-term-sign; constant-is-coefficient / INT_NEGATION | light | C: signed term boundaries and constant | KaTeX only; no visual/media dependency | Yes | No | No | No |
| contextual-variable-meaning | conceptual — Retain reviewed context as supplementary meaning evidence. | curated / singleChoice | variable-is-person-name / None | moderate | A: one brief context | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- השלימו: `-x=\square\cdot x`.
- מהו האיבר הקבוע ב־`3x-4`?

**Evidence policy proposal:** minimum 10 real Attempts; required categories conceptual: 5; representation: 5; required Bands A: 5; B: 3; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Explicit positive/negative coefficients, both hidden signs, term boundaries and constants; representation families resolve the existing impossible representation quota. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse ALG_VARIABLE; do not move hidden coefficients to ALG_LIKE_TERMS, which would confuse reading a term with operating on it. Expanded scope needs coverage-aware policy review; old Attempts are retained, not relabelled.

<a id="skill-alg-expressions"></a>

### ALG_EXPRESSIONS — תרגום בין מילים לביטויים

**Identity:** New stable ID proposed; short student label **מילים וביטויים**; Domain **ALGEBRA_FOUNDATIONS**; optional Group **ALG_LANGUAGE (proposed)**.

**Roadmap coverage:** A5.7–A5.10.

**Target:** Translate a short quantitative relation into an algebraic expression and back.

**Non-targets:** Long word problems, reading ability as the main difficulty, equation solving.

**Criticality:** P5. A learner can read coefficients but misinterpret greater-by versus times; relational translation has separate diagnostic value.

**Prerequisites:** ALG_VARIABLE.

**Supporting Skills:** FRAC_MEANING for half/third.

**Downstream:** Grade 8 word equations and function contexts.

**Primary misconceptions:** `greater-by-means-times`, `reverses-subtraction`, `half-means-minus-two`, `order-insensitive-translation`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / none / none / high.

**Literacy target:** Light by design; moderate only as optional later practice.

**Bands:** A: greater/smaller by; B: times, half/third and order-sensitive comparison. One relationship remains the target, not compound stories.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| additive-phrase-to-expression | representation — Map one additive comparison to a signed expression. | generator / singleChoice | greater-by-means-times; reverses-subtraction / None | light | A: greater by or smaller by | KaTeX only; no visual/media dependency | Yes | No | No | No |
| multiplicative-phrase-to-expression | representation — Distinguish multiplication/division from addition/subtraction. | generator / singleChoice | half-means-minus-two / FRAC_MEANING | light | B: times, half or third | KaTeX only; no visual/media dependency | Yes | No | No | No |
| expression-to-phrase | representation — Reverse the mapping with short parallel wording choices. | generator / singleChoice | order-insensitive-translation / None | light | A: additive relation; B: multiplicative relation | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- איזה ביטוי מתאר מספר הגדול מ־`x` ב־`3`?
- איזה ביטוי מתאר שליש מ־`x`?

**Evidence policy proposal:** minimum 10 real Attempts; required categories representation: 10; required Bands A: 4; B: 6. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** All four relation types and both translation directions; same-length distractors, explicit represented quantity and no unsupported reading demands. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID; contextual-variable-meaning asks what a letter represents and is not phrase-to-expression evidence.

<a id="skill-alg-substitute"></a>

### ALG_SUBSTITUTE — הצבה וערך ביטוי

**Identity:** Reuse current ID; short student label **הצבה**; Domain **ALGEBRA_FOUNDATIONS**; optional Group **ALG_LANGUAGE (proposed)**.

**Roadmap coverage:** A6.1–A6.6; supports A8.2.

**Target:** Replace only the specified variable with its given value, preserving structure, and evaluate when all values are known.

**Non-targets:** Solving for a variable; arbitrary algebraic manipulation; arithmetic dominating substitution.

**Criticality:** P5. Current symbolic replacement coverage does not prove numeric evaluation with zero or negative values.

**Prerequisites:** ALG_VARIABLE.

**Supporting Skills:** OPS_ORDER_BASIC; INT_ADD, INT_MUL for negative inputs.

**Downstream:** Checking equation solutions, tables, linear/quadratic functions.

**Primary misconceptions:** `concatenates-coefficient`, `drops-zero`, `omits-negative-parentheses`, `drops-parentheses`, `replaces-all-symbols`, `adds-value-without-replacing`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / high.

**Literacy target:** None/light, with both value and target expression explicitly shown.

**Bands:** A: positive and zero one-operation replacement; B: negative and two-operation evaluation; C: preserve parentheses or another unassigned variable. Never replace all letters with the supplied value.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| numeric-value-substitution | calculation — Substitute then compute; keep numbers easy enough to localize errors. | generator / numeric | concatenates-coefficient; drops-zero; omits-negative-parentheses / OPS_ORDER_BASIC, signed arithmetic | none | A: positive and zero; B: negative and two operations | KaTeX only; no visual/media dependency | Yes | No | No | No |
| parenthesized-substitution | representation — Choose the expression immediately after substitution. | generator / singleChoice | drops-parentheses / OPS_ORDER_BASIC | light | B: negative replacement in grouping; C: preserve nested outer structure | KaTeX only; no visual/media dependency | Yes | No | No | No |
| partial-substitution | representation — Reuse current B/C abstraction families leaving a or b unchanged. | generator / singleChoice | replaces-all-symbols / None | light | C: replace one symbol only | KaTeX only; no visual/media dependency | Yes | No | No | No |
| meaning-of-substitution | conceptual — Retain the explicit substitution-meaning family. | generator / singleChoice | adds-value-without-replacing / None | light | A: what replacement does | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- נתון `x=-2`. מה ערך `3x+1`?
- נתון `x=4`. הציבו ב־`a(x+b)` והשאירו את יתר האותיות.

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 6; representation: 4; conceptual: 2; required Bands A: 5; B: 5; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Zero, positive, negative, full evaluation, parentheses and selective replacement; separate replacement mistakes from supporting arithmetic in distractor design. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Keep ID and current partial-replacement families. Add zero/negative and actual numerical-evaluation families; the present calculation-labelled A is a choice of a replaced expression, not an evaluated value.

<a id="skill-alg-like-terms"></a>

### ALG_LIKE_TERMS — כינוס איברים דומים

**Identity:** New stable ID proposed; short student label **כינוס איברים**; Domain **ALGEBRA_FOUNDATIONS**; optional Group **ALG_SIMPLIFICATION (proposed)**.

**Roadmap coverage:** A7.1–A7.6.

**Target:** Combine coefficients of like terms while keeping unlike terms and constants separate.

**Non-targets:** Exponent laws, polynomial multiplication or hidden-coefficient reading as the only task.

**Criticality:** P5. Reading terms and operating on them are distinct failure sources.

**Prerequisites:** ALG_VARIABLE.

**Supporting Skills:** INT_ADD, INT_SUB.

**Downstream:** Linear equations, distributive simplification and Grade 9 polynomials.

**Primary misconceptions:** `x-plus-x-is-x-squared`, `hidden-coefficient-missing`, `loses-sign`, `combines-unlike-terms`, `adds-constant-to-coefficient`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / none.

**Literacy target:** None/light.

**Bands:** A: repeated x and positive coefficients; B: subtraction, implicit and negative coefficients; C: two variable types and constants requiring separation. Variable exponents stay simple.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| combine-positive-like-terms | calculation — Add coefficients without changing the variable. | generator / singleChoice | x-plus-x-is-x-squared / None | none | A: x+x and explicit coefficients | KaTeX only; no visual/media dependency | Yes | No | No | Yes |
| combine-signed-like-terms | calculation — Operate on signed coefficients, including cancellation. | generator / singleChoice | hidden-coefficient-missing; loses-sign / INT_ADD, INT_SUB | none | B: negative and hidden coefficients | KaTeX only; no visual/media dependency | Yes | No | No | No |
| separate-unlike-terms | conceptual — Decide which terms can combine and which must remain. | generator / multiChoice | combines-unlike-terms / None | light | C: two letters and constant | KaTeX only; no visual/media dependency | Yes | No | No | No |
| collect-mixed-expression | calculation — Simplify with constants separately. | generator / singleChoice | adds-constant-to-coefficient / INT_ADD, INT_SUB | none | C: reorder and collect like terms | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- בחרו ביטוי שווה ל־`x+x`.
- פשטו `3x-x+2y+4-1`.

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 8; conceptual: 2; required Bands A: 3; B: 3; C: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Add/subtract, implicit signs, zero result, unlike terms and constants; numeric-only evaluator cannot accept a typed expression, so use reviewed closed choices initially. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID. Use existing variable/coefficient evidence as support, not as mastery of simplification.

<a id="skill-alg-distribute"></a>

### ALG_DISTRIBUTE — חוק הפילוג וגורם משותף בסיסי

**Identity:** New stable ID proposed; short student label **חוק הפילוג**; Domain **ALGEBRA_FOUNDATIONS**; optional Group **ALG_SIMPLIFICATION (proposed)**.

**Roadmap coverage:** A7.7–A7.12.

**Target:** Multiply each term in a sum by one common factor and recognize the reverse factorization.

**Non-targets:** Binomial-by-binomial expansion, special-product formulas or advanced factoring.

**Criticality:** P5. Forward and reverse forms share one distributive invariant; reverse factoring is a family, not a separate Entry course.

**Prerequisites:** ALG_VARIABLE, ALG_LIKE_TERMS.

**Supporting Skills:** Multiplication facts; INT_MUL, INT_ADD for signed variants.

**Downstream:** Parenthesized equations and later algebraic technique.

**Primary misconceptions:** `distributes-first-term-only`, `loses-inner-negative`, `factors-one-term-only`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / none / medium / medium.

**Literacy target:** None/light.

**Bands:** A: numeric bridge and positive factor over plus; B: subtraction and negative external factor; C: three terms or a small obvious common factor. No product of two sums.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| numeric-distributive-bridge | representation — Translate numeric multiplication to an equivalent distributed form. | generator / singleChoice | distributes-first-term-only / Multiplication facts | light | A: split a known product into a sum | KaTeX only; no visual/media dependency | Yes | No | No | No |
| positive-factor-distribution | calculation — Multiply both terms, preserving operation signs. | generator / singleChoice | distributes-first-term-only / Multiplication facts | none | A: factor over plus; B: factor over minus | KaTeX only; no visual/media dependency | Yes | No | No | No |
| negative-factor-distribution | calculation — Apply the signed factor to every term. | generator / singleChoice | loses-inner-negative / INT_MUL, INT_ADD | none | B: negative external factor; C: three terms | KaTeX only; no visual/media dependency | Yes | No | No | No |
| basic-common-factor | reasoning — Recognize a common numerical factor in two terms. | generator / singleChoice | factors-one-term-only / AR_FACTORS_MULTIPLES optional | light | C: reverse an obvious distribution | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- פשטו `-2(x-3)`.
- בחרו כתיבה שקולה עם סוגריים ל־`3x+6`.

**Evidence policy proposal:** minimum 10 real Attempts; required categories representation: 2; calculation: 6; reasoning: 2; required Bands A: 5; B: 3; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Numeric bridge, plus/minus, negative factor, three terms and reverse common factor; distractors must represent genuine partial-distribution errors. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID; legacy INT_DISTRIBUTIVE is not an active catalog Skill and should not be resurrected as evidence by name.

<a id="skill-eq-add"></a>

### EQ_ADD — משוואות חיבור וחיסור בפעולה אחת

**Identity:** Reuse current ID; short student label **משוואות חיבור וחיסור**; Domain **EQUATIONS**; optional Group **EQ_ENTRY (proposed)**.

**Roadmap coverage:** A8.3, A8.4, A8.7; simple A8.14–15.

**Target:** Solve a one-step additive equation in each unknown position.

**Non-targets:** Systems, inequalities, variable-denominator equations, no/infinite solutions or Grade 8 expanded distribution.

**Criticality:** P5. Separate one-operation inverse knowledge from coordination of multiple transformations; use families for each structural complication.

**Prerequisites:** ALG_EQUALITY, ALG_VARIABLE.

**Supporting Skills:** INT_ADD, INT_SUB; FRAC_ADD_SUB for fraction applications.

**Downstream:** Grade 8 linear functions/inequalities and Grade 9 algebra.

**Primary misconceptions:** `wrong-inverse`, `x-equals-b-minus-a`, `changes-one-side-only`, `add-denominators`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / none.

**Literacy target:** None/light; no context is required to demonstrate the algebraic target.

**Bands:** A: x+a=b and x-a=b; B: a-x=b and signed values; C: preserve optional symbolic isolation. Keep one inverse additive relation as the target.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| unknown-plus-or-minus | calculation — Extend existing missing-addend work to missing difference. | generator / numeric | wrong-inverse / AR_ADD_FACTS, AR_SUB_FACTS | none | A: x+a=b and x-a=b | KaTeX only; no visual/media dependency | Yes | No | No | No |
| unknown-subtrahend | calculation — Isolate the unknown without reversing the equation incorrectly. | generator / numeric | x-equals-b-minus-a / INT_SUB | none | B: a-x=b | KaTeX only; no visual/media dependency | Yes | No | No | No |
| additive-inverse-meaning | conceptual — Reuse current inverse-concept and equality meaning. | generator / singleChoice | changes-one-side-only / None | light | A: balanced inverse operation | KaTeX only; no visual/media dependency | Yes | No | No | No |
| fraction-additive-equation | calculation — Apply known fraction arithmetic after equation meaning. | generator / numeric | add-denominators / FRAC_ADD_SUB | none | B: one additive inverse with simple fractions | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- `x-4=7`
- `9-x=3`

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 8; conceptual: 2; required Bands A: 6; B: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Every listed required operation orientation/family, solution verification and exact rational answers where applicable. Fraction families activate only after the relevant fraction content exists; they do not belong to the fraction chapter. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse ID. Current A/B only supplies additive missing-value structures; C is symbolic addition isolation. New subtraction orientations need new families, not another Skill.

<a id="skill-eq-mul"></a>

### EQ_MUL — משוואות כפל וחילוק בפעולה אחת

**Identity:** Reuse current ID; short student label **משוואות כפל וחילוק**; Domain **EQUATIONS**; optional Group **EQ_ENTRY (proposed)**.

**Roadmap coverage:** A8.5, A8.6, A8.8; simple A8.14–15.

**Target:** Solve a one-step multiplicative equation with a nonzero coefficient or known divisor.

**Non-targets:** Systems, inequalities, variable-denominator equations, no/infinite solutions or Grade 8 expanded distribution.

**Criticality:** P5. Separate one-operation inverse knowledge from coordination of multiple transformations; use families for each structural complication.

**Prerequisites:** ALG_EQUALITY, ALG_VARIABLE.

**Supporting Skills:** INT_MUL, INT_DIV; FRAC_MULTIPLY, FRAC_DIVIDE for fraction applications.

**Downstream:** Grade 8 linear functions/inequalities and Grade 9 algebra.

**Primary misconceptions:** `uses-product-as-factor`, `divides-again`, `drops-minus-one`, `changes-one-side-only`, `inverts-wrong-quantity`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / none.

**Literacy target:** None/light; no context is required to demonstrate the algebraic target.

**Bands:** A: ax=b with positive nonzero a; B: x/a=b and negative coefficient. Coefficient zero and variable denominators are excluded.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| unknown-factor | calculation — Reuse current multiplicative missing-value relation. | generator / numeric | uses-product-as-factor / Division fact groups | none | A: positive coefficient | KaTeX only; no visual/media dependency | Yes | No | No | No |
| unknown-dividend | calculation — Invert division by multiplying both sides. | generator / numeric | divides-again / Multiplication fact groups | none | B: x/a=b, a nonzero | KaTeX only; no visual/media dependency | Yes | No | No | No |
| negative-coefficient | calculation — Divide by the signed coefficient. | generator / numeric | drops-minus-one / INT_DIV, ALG_VARIABLE | none | B: negative including -1 | KaTeX only; no visual/media dependency | Yes | No | No | No |
| multiplicative-inverse-meaning | conceptual — Retain current inverse-concept family. | generator / singleChoice | changes-one-side-only / None | light | A: valid inverse operation | KaTeX only; no visual/media dependency | Yes | No | No | No |
| fraction-multiplicative-equation | calculation — Apply reciprocal reasoning in an equation, after fraction division. | generator / numeric | inverts-wrong-quantity / FRAC_DIVIDE | none | B: simple nonzero rational coefficient | KaTeX only; no visual/media dependency | No | No | No | No |

**Representative archetypes (not bank items):**

- `x/3=4`
- `-x=5`

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 8; conceptual: 2; required Bands A: 5; B: 5. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Every listed required operation orientation/family, solution verification and exact rational answers where applicable. Fraction families activate only after the relevant fraction content exists; they do not belong to the fraction chapter. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** Reuse ID. Current ax=b and symbolic isolation do not cover x/a=b or explicit negative coefficients.

<a id="skill-eq-linear-steps"></a>

### EQ_LINEAR_STEPS — משוואות לינאריות בכמה צעדים

**Identity:** New stable ID proposed; short student label **משוואות בכמה צעדים**; Domain **EQUATIONS**; optional Group **EQ_ENTRY (proposed)**.

**Roadmap coverage:** A8.9–A8.15.

**Target:** Solve a short unique-solution linear equation by coordinating simplification and equivalent transformations.

**Non-targets:** Systems, inequalities, variable-denominator equations, no/infinite solutions or Grade 8 expanded distribution.

**Criticality:** P5. Separate one-operation inverse knowledge from coordination of multiple transformations; use families for each structural complication.

**Prerequisites:** EQ_ADD, EQ_MUL, ALG_LIKE_TERMS, ALG_DISTRIBUTE.

**Supporting Skills:** ALG_SUBSTITUTE for checking; FRAC_ADD_SUB, FRAC_MULTIPLY, FRAC_DIVIDE for rational application.

**Downstream:** Grade 8 linear functions/inequalities and Grade 9 algebra.

**Primary misconceptions:** `undoes-in-forward-order`, `combines-across-equals-illegally`, `distributes-first-term-only`, `moves-without-sign-change`, `add-denominators`, `inverse-error`, `operation-on-one-side-only`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / none / medium / none.

**Literacy target:** None/light; no context is required to demonstrate the algebraic target.

**Bands:** A: two inverses; B: simplify first or one parenthesized group; C: variable on both sides and simple fractional applications. Require a unique solution, no variable denominator.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| two-step-linear | calculation — Undo two operations in a valid order. | generator / numeric | undoes-in-forward-order / EQ_ADD, EQ_MUL | none | A: ax+b=c and ax-b=c | KaTeX only; no visual/media dependency | Yes | No | No | No |
| simplify-first-equation | calculation — Reduce expression structure then solve. | generator / numeric | combines-across-equals-illegally / ALG_LIKE_TERMS | none | B: collect terms before solving | KaTeX only; no visual/media dependency | Yes | No | No | No |
| parenthesized-equation | calculation — Preserve equivalence through expansion and inverse operations. | generator / numeric | distributes-first-term-only / ALG_DISTRIBUTE | none | B: one distributive expansion | KaTeX only; no visual/media dependency | Yes | No | No | No |
| unknown-on-both-sides | calculation — Collect unknown terms and preserve both sides. | generator / numeric | moves-without-sign-change / ALG_LIKE_TERMS, EQ_ADD, EQ_MUL | none | C: ax+b=cx+d with a not equal c | KaTeX only; no visual/media dependency | Yes | No | No | No |
| fraction-equation-application | calculation — Use previously learned fraction operations within a unique-solution equation. | generator / numeric | add-denominators; inverse-error / FRAC_ADD_SUB, FRAC_MULTIPLY, FRAC_DIVIDE | none | C: small rational constants/coefficients | KaTeX only; no visual/media dependency | No | No | No | No |
| equivalence-step-check | reasoning — Choose a valid next line without free proof. | generator / singleChoice | operation-on-one-side-only / ALG_EQUALITY | light | A: check next inverse step; B: check simplify-first step | KaTeX only; no visual/media dependency | Yes | No | No | No |

**Representative archetypes (not bank items):**

- `2(x+3)=x+9`
- `x/2+1/3=5/6`

**Evidence policy proposal:** minimum 12 real Attempts; required categories calculation: 10; reasoning: 2; required Bands A: 4; B: 4; C: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Every listed required operation orientation/family, solution verification and exact rational answers where applicable. Fraction families activate only after the relevant fraction content exists; they do not belong to the fraction chapter. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID for coordinating transformations. Parentheses, both sides and fractions remain distinct families, not three additional Mastery identities. A8.16–17 no/infinite solutions stay out of Entry.

<a id="skill-coord-read-plot"></a>

### COORD_READ_PLOT — קריאה וסימון במערכת צירים

**Identity:** New stable ID proposed; short student label **נקודות במישור**; Domain **COORDINATES (new)**; optional Group **COORD_FOUNDATIONS (proposed)**.

**Roadmap coverage:** A9.1–A9.10.

**Target:** Map an ordered pair to a position and a position to its ordered pair using labelled perpendicular axes.

**Non-targets:** Slope, distance formula, dragging precision or hidden graph scales.

**Criticality:** P5. Ordered-pair meaning is an essential representation bottleneck, distinct from movement calculation.

**Prerequisites:** INT_NUMBER_LINE.

**Supporting Skills:** INT_COMPARE.

**Downstream:** Grade 8 linear functions and Grade 9 analytic representations.

**Primary misconceptions:** `reverse-ordered-pair`, `origin-is-one`, `misses-zero-coordinate`, `quadrant-sign-error`, `swaps-x-y`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / medium / none / high.

**Literacy target:** None/light; coordinate tuples are LTR math.

**Bands:** A: axes/origin and first quadrant; B: four quadrants; C: points on axes with one zero coordinate and clear non-unit ticks. The x-then-y order remains invariant.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| axes-origin-order | conceptual — Recognize coordinate conventions without a long story. | mixed / singleChoice | reverse-ordered-pair; origin-is-one / None | light | A: name axes, origin, first coordinate | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| read-point | representation — Read a labelled point, with a reviewed grid and visible scale. | mixed / singleChoice | reverse-ordered-pair; misses-zero-coordinate / INT_NUMBER_LINE | light | A: quadrant I; B: four quadrants; C: on axes | Reusable coordinate/graph SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| choose-plotted-position | representation — Choose the correct marked candidate for a supplied tuple. This is a closed plotting proxy, not a claim of drag/plot interaction. | mixed / singleChoice | quadrant-sign-error; swaps-x-y / INT_NUMBER_LINE | light | A: quadrant I; B: four quadrants; C: on axes | Reusable coordinate/graph SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |

**Representative archetypes (not bank items):**

- מהם שיעורי הנקודה `P`?
- איזו מהנקודות המסומנות מתאימה ל־`(-2,3)`?

**Evidence policy proposal:** minimum 10 real Attempts; required categories conceptual: 3; representation: 7; required Bands A: 5; B: 3; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Read and placement-proxy directions, every quadrant, origin and both axes; explicit correct scales, candidate separation and RTL tuple tests. Full interactive plotting remains future-only. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID; no executable coordinate Skills or families. Reviewed static composite grids can pilot all three families, but reusable coordinate rendering is required for a varied generated bank.

<a id="skill-coord-movement"></a>

### COORD_MOVEMENT — תנועה ומרחק במערכת צירים

**Identity:** New stable ID proposed; short student label **תנועה במישור**; Domain **COORDINATES (new)**; optional Group **COORD_FOUNDATIONS (proposed)**.

**Roadmap coverage:** A9.11–A9.13.

**Target:** Track the changing coordinate and find simple horizontal or vertical displacement/distance.

**Non-targets:** Diagonal distance, slope, Euclidean distance formula or route optimization.

**Criticality:** P5. A learner may read points correctly yet change both coordinates or confuse displacement with distance.

**Prerequisites:** COORD_READ_PLOT.

**Supporting Skills:** INT_ADD, INT_SUB.

**Downstream:** Interpreting change in graphs and later slope.

**Primary misconceptions:** `changes-both-coordinates`, `adds-to-wrong-coordinate`, `negative-distance`, `adds-always`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / medium / none / medium.

**Literacy target:** None/light.

**Bands:** A: move within a quadrant along one axis direction; B: cross an axis and compare signed change with nonnegative distance. Never move diagonally in core.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| one-coordinate-change | conceptual — Decide which coordinate changes and which stays fixed. | mixed / singleChoice | changes-both-coordinates / None | light | A: horizontal versus vertical | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| axis-aligned-destination | representation — Map a short displacement to a destination tuple. | mixed / singleChoice | adds-to-wrong-coordinate / INT_ADD | light | A: stay in a quadrant; B: cross an axis | Reusable coordinate/graph SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| axis-aligned-distance | calculation — Find distance between points with one coordinate equal. | mixed / numeric | negative-distance; adds-always / INT_SUB | none | A: same-sign coordinates; B: cross zero | Reusable coordinate/graph SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |

**Representative archetypes (not bank items):**

- מ־`(2,-1)` נעים שלוש יחידות למעלה.
- מה המרחק בין `(-2,3)` ל־`(4,3)`?

**Evidence policy proposal:** minimum 10 real Attempts; required categories conceptual: 3; representation: 3; calculation: 4; required Bands A: 5; B: 5. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Horizontal/vertical, both directions, with/without crossing zero, and distance distinct from signed change; static reviewed assets can pilot, reusable coordinate SVG required for scale. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID; signed arithmetic is supporting evidence and must not be counted as coordinate movement.

<a id="skill-graph-read"></a>

### GRAPH_READ — קריאת מידע ושינוי מגרף

**Identity:** New stable ID proposed; short student label **קריאת גרפים**; Domain **FUNCTION_FOUNDATIONS (new)**; optional Group **GRAPH_FOUNDATIONS (proposed)**.

**Roadmap coverage:** A10.1–A10.10.

**Target:** Read values, extrema, trends and a simple visible input domain from a labelled graph.

**Non-targets:** Slope formulas, graphing y=mx+b, interpolation not justified by the graph, interval algebra.

**Criticality:** P5. Axis decoding and reading behavior are needed before formal function equations.

**Prerequisites:** COORD_READ_PLOT.

**Supporting Skills:** INT_COMPARE.

**Downstream:** Grade 8 linear-function interpretation and Grade 9 function behavior.

**Primary misconceptions:** `swaps-quantities`, `omits-units`, `inverse-must-be-unique`, `confuses-x-with-extreme-value`, `higher-means-increasing`, `reads-y-range-as-domain`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / medium / medium / high.

**Literacy target:** Light; at most moderate for optional contextual application.

**Bands:** A: axes/quantities and one point or requested value; B: reverse lookup including multiple answers; C: extrema, trend intervals and visible domain. Use simple graphs and explicitly state discrete versus continuous reading.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| axes-and-point-meaning | representation — Map position to a pair of contextual quantities with units. | mixed / singleChoice | swaps-quantities; omits-units / None | light | A: identify quantities and interpret one point | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| graph-value-lookup | representation — Read both lookup directions without assuming the inverse is single-valued. | mixed / multiChoice | inverse-must-be-unique / None | light | A: y for x; B: x for y with all answers | Reusable coordinate/graph SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| graph-extrema | representation — Distinguish the extreme value from its input location; include tied extrema. | mixed / singleChoice | confuses-x-with-extreme-value / None | light | C: maximum/minimum and where attained | Reusable coordinate/graph SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| graph-trend | reasoning — Describe change over a specified part, not absolute height. | mixed / singleChoice | higher-means-increasing / None | light | B: increasing/decreasing/constant piece; C: compare pieces | Reusable coordinate/graph SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| visible-domain | conceptual — Identify allowable displayed inputs with simple endpoints or an explicit discrete set. | mixed / singleChoice | reads-y-range-as-domain / None | light | C: read shown input extent | Reusable coordinate/graph SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |

**Representative archetypes (not bank items):**

- לפי הגרף, מהו `y` כאשר `x=3`?
- באיזה קטע הגרף יורד?

**Evidence policy proposal:** minimum 12 real Attempts; required categories representation: 7; reasoning: 3; conceptual: 2; required Bands A: 2; B: 6; C: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Both lookup directions, axes units, tied extrema, constant segments, domain/range contrast and honest interpolation; reusable graph renderer before wide parameterized families. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID; generic image support can carry reviewed graphs but is not a graph-generation pipeline. Short static graphs are safe for an initial reviewed bank, with adequate structural diversity.

<a id="skill-function-relations"></a>

### FUNCTION_RELATIONS — קשרים, טבלאות ומשמעות פונקציה

**Identity:** New stable ID proposed; short student label **טבלה וגרף**; Domain **FUNCTION_FOUNDATIONS (new)**; optional Group **GRAPH_FOUNDATIONS (proposed)**.

**Roadmap coverage:** A10.11–A10.15.

**Target:** Connect table, graph and short description, and recognize one output for each input.

**Non-targets:** Linear-function formulas, slope, one-to-one requirement or formal set theory.

**Criticality:** P5. Translation and input-output uniqueness are not proven by point lookup alone.

**Prerequisites:** COORD_READ_PLOT, GRAPH_READ.

**Supporting Skills:** ALG_VARIABLE.

**Downstream:** Linear-function representations and later quadratic relations.

**Primary misconceptions:** `reverse-ordered-pair`, `skips-point`, `swaps-columns`, `height-confused-with-change`, `function-must-be-one-to-one`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / medium / none / high.

**Literacy target:** None/light for tables; light for deliberately short descriptions.

**Bands:** A: table to points and graph to table; B: description/graph mapping and function/nonfunction distinction. Repeated outputs are allowed; conflicting outputs for one input are not.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| table-to-points | representation — Transfer each ordered pair without changing input/output order. | mixed / singleChoice | reverse-ordered-pair / None | light | A: match rows to marked points | Reusable coordinate/graph SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| graph-to-table | representation — Select a table consistent with the graph. | mixed / singleChoice | skips-point; swaps-columns / None | light | A: recover rows from marked points | Reusable coordinate/graph SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| description-graph-translation | representation — Match a brief rise/fall/constant account to a graph. | mixed / singleChoice | height-confused-with-change / None | light | B: description to graph and graph to description | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| one-output-per-input | conceptual — Distinguish functions from nonfunctions, allowing many inputs to share an output. | mixed / singleChoice | function-must-be-one-to-one / None | light | B: tables/point sets with conflicting or repeated outputs | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |

**Representative archetypes (not bank items):**

- איזה גרף מתאים לטבלה הנתונה?
- האם הטבלה מתאימה פלט יחיד לכל קלט?

**Evidence policy proposal:** minimum 10 real Attempts; required categories representation: 8; conceptual: 2; required Bands A: 6; B: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Both table directions, both description directions, repeated-output positive examples and duplicate-input conflict nonexamples; no linear-function equation family. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID; use closed choices and KaTeX tables/composite images initially. A10.15 is explicitly selected Entry preparation, not a claim that all local government versions place full function theory in Grade 7.

## 6. Geometry Content Design Cards

Geometry begins with meanings and diagram language; names for congruence/similarity wait for those later concepts. Every geometry family uses the visual dependency and Reason Bank contracts below. Semantic clickable objects would be useful for all selection/identification families but are not required for the proposed closed-choice MVP.

<a id="skill-geo-angle-sense"></a>

### GEO_ANGLE_SENSE — משמעות זווית והערכת גודלה

**Identity:** New stable ID proposed; short student label **הבנת זוויות**; Domain **GEOMETRY (new)**; optional Group **GEO_ENTRY (proposed; Chapter groupings remain G1–G5)**.

**Roadmap coverage:** G1.1–G1.3.

**Target:** Interpret an angle as a turn/opening and estimate/classify its magnitude independently of arm length or orientation.

**Non-targets:** Protractor-operation skill, exact estimation of ambiguous drawings, triangle theorems.

**Criticality:** P5. Diagram interpretation must precede downstream geometry reasoning.

**Prerequisites:** None.

**Supporting Skills:** None.

**Downstream:** Angle relationships and later congruence/Pythagoras diagram reading.

**Primary misconceptions:** `longer-arms-bigger-angle`, `rotation-changes-angle`, `reflex-read-as-minor`, `straight-is-right`, `reflex-is-obtuse`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / medium / none / high.

**Literacy target:** None/light; short Hebrew choices only, no free proof.

**Bands:** A: vertex/arms and right/straight/full benchmarks; B: approximate 30,45,60 and reflex 270, with rotation and unequal arm lengths. Magnitude classification is invariant under drawing orientation.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| angle-object-meaning | conceptual — Identify the angle object; contrast equal openings with different arm lengths. | mixed / singleChoice | longer-arms-bigger-angle / None | light | A: vertex/arms and same opening | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| angle-benchmark-estimate | representation — Choose a reasonable benchmark from well-separated alternatives. | mixed / singleChoice | rotation-changes-angle; reflex-read-as-minor / None | light | A: 90,180,360; B: 30,45,60,270 | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| angle-classification | conceptual — Connect magnitude regions with names without making vocabulary the whole task. | mixed / singleChoice | straight-is-right; reflex-is-obtuse / None | light | A: acute/right/obtuse/straight; B: reflex/full turn | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |

**Representative archetypes (not bank items):**

- איזו זווית קרובה יותר ל־`60^\circ`?
- האם הארכת שוקי הזווית משנה את גודלה?

**Evidence policy proposal:** minimum 10 real Attempts; required categories conceptual: 6; representation: 4; required Bands A: 6; B: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Every named benchmark and type, rotated examples, unequal arm lengths and a marked reflex sweep; reviewed images suffice for pilot, generated angle variants require semantic Geometry SVG. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID: no active geometry catalog Skill or question family exists.

<a id="skill-geo-diagram-language"></a>

### GEO_DIAGRAM_LANGUAGE — קריאת שמות וסימונים גאומטריים

**Identity:** New stable ID proposed; short student label **קריאת שרטוט**; Domain **GEOMETRY (new)**; optional Group **GEO_ENTRY (proposed; Chapter groupings remain G1–G5)**.

**Roadmap coverage:** G1.4–G1.12.

**Target:** Identify named objects and infer only relations stated by labels, measurements or diagram marks.

**Non-targets:** Congruence/similarity notation, membership symbol, implication symbol or theorem proof.

**Criticality:** P5. Diagram interpretation must precede downstream geometry reasoning.

**Prerequisites:** GEO_ANGLE_SENSE (vertex/arms subset).

**Supporting Skills:** None.

**Downstream:** Every geometry chapter and Grade 9 use of givens.

**Primary misconceptions:** `wrong-middle-letter`, `same-vertex-means-same-angle`, `tick-is-parallel`, `right-box-is-equality`, `all-drawn-arcs-mean-equal`, `looks-equal-therefore-equal`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / none / medium / high.

**Literacy target:** None/light; short Hebrew choices only, no free proof.

**Bands:** A: three-letter angle and segment labels; B: ambiguous vertex naming, indexed/Greek labels and relation marks; C: distinguish marked facts from deceptive appearance. Meaning remains independent of page position.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| angle-name-reading | representation — Read a supplied angle name to select its sweep, and choose a correctly written name for a highlighted angle; this is closed naming, not free typing. | mixed / singleChoice | wrong-middle-letter; same-vertex-means-same-angle / None | light | A: middle letter and reversed order; B: single vertex only when unambiguous; indexed and Greek labels | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| segment-line-relation-marks | representation — Translate AB parallel/perpendicular/equal CD and their diagram marks both ways. | mixed / singleChoice | tick-is-parallel; right-box-is-equality / None | light | B: parallel, perpendicular, equal length | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| equal-angle-mark-reading | representation — Identify exactly which angles share a mark and which are 90 degrees. | mixed / multiChoice | all-drawn-arcs-mean-equal / None | light | B: equal arcs and right-angle box | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| marked-versus-apparent | reasoning — Select only licensed statements, including insufficient information. | mixed / multiChoice | looks-equal-therefore-equal / None | light | C: intentionally misleading drawing | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |

**Representative archetypes (not bank items):**

- איזו זווית היא `\angle ABC`?
- מה אפשר להסיק מן הסימונים בלבד?

**Evidence policy proposal:** minimum 10 real Attempts; required categories representation: 8; reasoning: 2; required Bands A: 3; B: 5; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Reversed angle names, ambiguous B versus B1/B2, Greek names, distinct equality-mark groups, parallel/perpendicular marks and counterexample drawings. Static reviewed models require an object manifest even before clicks exist. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID: no active geometry catalog Skill or question family exists.

<a id="skill-geo-angle-relations"></a>

### GEO_ANGLE_RELATIONS — קשרים וחישובים בזוויות

**Identity:** New stable ID proposed; short student label **קשרי זוויות**; Domain **GEOMETRY (new)**; optional Group **GEO_ENTRY (proposed; Chapter groupings remain G1–G5)**.

**Roadmap coverage:** G2.1–G2.8.

**Target:** Select and apply the relevant local angle relationship in one step, then in a short justified chain.

**Non-targets:** Every angle theorem as a separate Skill, arbitrary angle sums without stated geometry, long algebra.

**Criticality:** P5. Diagram interpretation must precede downstream geometry reasoning.

**Prerequisites:** GEO_DIAGRAM_LANGUAGE.

**Supporting Skills:** AR_ADD_FACTS, AR_SUB_FACTS; EQ_ADD only in optional algebraic variant.

**Downstream:** Parallel-line and triangle calculations; later geometry reasoning.

**Primary misconceptions:** `always-subtracts-from-180`, `all-adjacent-angles-supplementary`, `adjacent-equals-vertical`, `any-ray-bisects`, `right-number-wrong-reason`, `uses-only-one-rule`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / none / medium / none.

**Literacy target:** None/light; short Hebrew choices only, no free proof.

**Bands:** A: 90/180/360 totals and one relationship; B: vertical/bisected angles; C: two linked rules only. Do not make unrelated arithmetic harder.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| angle-total-complement | calculation — Find a missing part from a marked total. | mixed / numeric | always-subtracts-from-180 / AR_SUB_FACTS | none | A: right, straight or full turn | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| linear-pair | calculation — Use supplementary sum only when the line condition is shown. | mixed / numeric | all-adjacent-angles-supplementary / AR_SUB_FACTS | none | A: adjacent angles with other arms forming a line | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| vertical-or-bisected | calculation — Use equality from the correct relation; bisector may require halving the total. | mixed / numeric | adjacent-equals-vertical; any-ray-bisects / AR_DIV_F_2_5_10 | none | B: vertical equality or explicitly bisected angle | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| local-reason-choice | reasoning — Choose a semantic reason from 4–6 relevant options. | mixed / singleChoice | right-number-wrong-reason / None | light | A: one applicable fact; B: distinguish plausible competing reasons | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| two-rule-angle-chain | calculation — Combine exactly two local relationships, optionally selecting the missing intermediate step. | mixed / numeric | uses-only-one-rule / AR_SUB_FACTS | none | C: equality then supplementary total | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | No | No | No | No |

**Representative archetypes (not bank items):**

- זווית אחת בזוג צמודות היא `65^\circ`. מצאו את השנייה.
- בחרו נימוק לשוויון שתי הזוויות המסומנות.

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 8; reasoning: 2; required Bands A: 5; B: 3; C: 2. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Right/straight/full totals, valid linear pairs, vertical and bisector cases, 4–6 local reason choices, and two-step higher family. Test nonexamples where adjacency alone is insufficient. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID: no active geometry catalog Skill or question family exists.

<a id="skill-geo-parallel-angles"></a>

### GEO_PARALLEL_ANGLES — מקבילים, מאונכים וזוויות עם חותך

**Identity:** New stable ID proposed; short student label **מקבילים וזוויות**; Domain **GEOMETRY (new)**; optional Group **GEO_ENTRY (proposed; Chapter groupings remain G1–G5)**.

**Roadmap coverage:** G3.1–G3.9.

**Target:** Recognize parallel/perpendicular lines and apply corresponding/alternate-angle equality only with the needed parallel-line givens.

**Non-targets:** Proving parallelism from equal angles, coordinate slope tests or long chains.

**Criticality:** P5. Diagram interpretation must precede downstream geometry reasoning.

**Prerequisites:** GEO_DIAGRAM_LANGUAGE.

**Supporting Skills:** GEO_ANGLE_RELATIONS; AR_SUB_FACTS.

**Downstream:** Grade 8 geometry and Grade 9 deductive work.

**Primary misconceptions:** `perpendicular-must-be-page-vertical`, `same-side-is-alternate`, `equality-without-parallel-given`, `looks-parallel-is-given`, `wrong-angle-pair`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** low / medium / medium / high.

**Literacy target:** None/light; short Hebrew choices only, no free proof.

**Bands:** A: line relationships and transversal position; B: corresponding/alternate identification and one equality; C: combine with vertical angles. Rotate/transverse drawings without changing incidence.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| line-relationship-identification | conceptual — Identify the geometric relation from marks and geometry, including rotated forms. | mixed / singleChoice | perpendicular-must-be-page-vertical / None | light | A: parallel/perpendicular/transversal | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| transversal-angle-pair | representation — Identify angle positions without relying on a memorized upright picture. | mixed / singleChoice | same-side-is-alternate / None | light | B: corresponding versus alternate | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| parallel-angle-value | calculation — Transfer an angle measure using the applicable relationship. | mixed / numeric | equality-without-parallel-given / None | none | B: one equality with parallel givens | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| parallel-reason-check | reasoning — Choose the valid reason or insufficient information. | mixed / singleChoice | looks-parallel-is-given / None | light | B: test conditions of a proposed equality | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| parallel-vertical-chain | calculation — Link two known relations without proving new theorems. | mixed / numeric | wrong-angle-pair / GEO_ANGLE_RELATIONS | none | C: one equality plus vertical relation | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | No | No | No | No |

**Representative archetypes (not bank items):**

- אילו שתי זוויות הן מתאימות בשרטוט?
- נתונים שני ישרים מקבילים וחותך; מצאו את הזווית המסומנת.

**Evidence policy proposal:** minimum 10 real Attempts; required categories conceptual: 2; representation: 2; calculation: 4; reasoning: 2; required Bands A: 2; B: 7; C: 1. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Parallel/perpendicular, transversal, both pair types, numeric and condition-check families, rotated drawings; converse theorem deliberately excluded. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID: no active geometry catalog Skill or question family exists.

<a id="skill-geo-triangle-properties"></a>

### GEO_TRIANGLE_PROPERTIES — סוגי משולשים, ניצבים ויתר

**Identity:** New stable ID proposed; short student label **קריאת משולש**; Domain **GEOMETRY (new)**; optional Group **GEO_ENTRY (proposed; Chapter groupings remain G1–G5)**.

**Roadmap coverage:** G4.1, G4.2, G4.6–G4.8.

**Target:** Read triangle side/angle properties and identify legs and hypotenuse from the right-angle mark.

**Non-targets:** Isosceles theorem work, Pythagoras calculation or classification vocabulary without diagrams.

**Criticality:** P5. Diagram interpretation must precede downstream geometry reasoning.

**Prerequisites:** GEO_DIAGRAM_LANGUAGE.

**Supporting Skills:** None.

**Downstream:** Later congruence, isosceles work and Pythagoras.

**Primary misconceptions:** `equal-looking-is-equal`, `long-side-means-obtuse`, `bottom-side-is-hypotenuse`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / medium / none / high.

**Literacy target:** None/light; short Hebrew choices only, no free proof.

**Bands:** A: marked sides/angles and classification; B: rotated right triangles, legs/hypotenuse and intersecting classifications. Orientation does not define the base or hypotenuse.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| triangle-side-classification | conceptual — Use side relations and inclusive classification when justified; do not infer equal sides from appearance. | mixed / multiChoice | equal-looking-is-equal / None | light | A: scalene/isosceles/equilateral from marks | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| triangle-angle-classification | conceptual — Read angle properties without relying on tilt. | mixed / singleChoice | long-side-means-obtuse / None | light | A: acute/right/obtuse from marked angles | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| legs-and-hypotenuse | representation — Choose the side opposite the right angle and the two adjacent legs. | mixed / singleChoice | bottom-side-is-hypotenuse / None | light | B: right triangles in varied orientation | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |

**Representative archetypes (not bank items):**

- איזו צלע היא היתר במשולש המסומן?
- אילו תיאורים מתאימים למשולש לפי הסימונים?

**Evidence policy proposal:** minimum 10 real Attempts; required categories conceptual: 6; representation: 4; required Bands A: 6; B: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Both classification dimensions, rotated right triangles, multiple valid side-class labels where inclusive definitions apply, and no color-only clues. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID: no active geometry catalog Skill or question family exists.

<a id="skill-geo-triangle-angles"></a>

### GEO_TRIANGLE_ANGLES — סכום זוויות במשולש

**Identity:** New stable ID proposed; short student label **זוויות במשולש**; Domain **GEOMETRY (new)**; optional Group **GEO_ENTRY (proposed; Chapter groupings remain G1–G5)**.

**Roadmap coverage:** G4.3–G4.5, G4.9 optional.

**Target:** Use the triangle angle sum to determine missing information and choose a valid justification.

**Non-targets:** Congruence, isosceles angle theorems or advanced exterior-angle proof.

**Criticality:** P5. Diagram interpretation must precede downstream geometry reasoning.

**Prerequisites:** GEO_DIAGRAM_LANGUAGE, GEO_TRIANGLE_PROPERTIES.

**Supporting Skills:** AR_ADD_FACTS, AR_SUB_FACTS; EQ_ADD, EQ_LINEAR_STEPS in equation family.

**Downstream:** Later triangle geometry and Grade 9 proof chains.

**Primary misconceptions:** `sum-is-360`, `omits-one-angle`, `uses-straight-line-reason`, `uses-adjacent-internal-angle-only`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** high / none / medium / none.

**Literacy target:** None/light; short Hebrew choices only, no free proof.

**Bands:** A: two known angles and one missing; B: simple equation using a supplied relation; C: optional exterior angle with an explicitly extended side. C is P3/P4 support, not a required Entry gate.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| triangle-missing-angle | calculation — Subtract the known total from 180, including right triangles. | mixed / numeric | sum-is-360 / AR_ADD_FACTS, AR_SUB_FACTS | none | A: two known measures | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| triangle-equation | calculation — Form/use an elementary equation with triangle-sum meaning still visible. | mixed / numeric | omits-one-angle / EQ_ADD, EQ_LINEAR_STEPS | none | B: simple repeated-variable measures | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | No | No | No | No |
| triangle-reason-choice | reasoning — Choose the sum fact rather than an unrelated angle equality. | mixed / singleChoice | uses-straight-line-reason / None | light | A: justify the 180 total | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| exterior-angle-extension | reasoning — Optional one-rule consequence of linear pair plus triangle sum. | mixed / singleChoice | uses-adjacent-internal-angle-only / GEO_ANGLE_RELATIONS | light | C: one extended side | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | No | No | No | No |

**Representative archetypes (not bank items):**

- במשולש זוויות `40^\circ` ו־`65^\circ`; מצאו את השלישית.
- זוויות המשולש הן `x,x,40^\circ`; מצאו את `x`.

**Evidence policy proposal:** minimum 10 real Attempts; required categories calculation: 7; reasoning: 3; required Bands A: 7; B: 3. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Acute/obtuse/right shapes, known measures consistent with a triangle, sum and reason families; equation family waits for its algebra support. Exterior family optional and excluded from required policy. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID: no active geometry catalog Skill or question family exists.

<a id="skill-geo-special-segments"></a>

### GEO_SPECIAL_SEGMENTS — גובה וחוצה זווית במשולש

**Identity:** New stable ID proposed; short student label **גובה וחוצה זווית**; Domain **GEOMETRY (new)**; optional Group **GEO_ENTRY (proposed; Chapter groupings remain G1–G5)**.

**Roadmap coverage:** G5.1–G5.5.

**Target:** Identify an altitude or angle bisector from its defining vertex, perpendicularity or equal-angle conditions.

**Non-targets:** Median, construction tools, concurrence theorems or assuming one segment has all special properties.

**Criticality:** P5. Diagram interpretation must precede downstream geometry reasoning.

**Prerequisites:** GEO_DIAGRAM_LANGUAGE, GEO_TRIANGLE_PROPERTIES.

**Supporting Skills:** GEO_ANGLE_RELATIONS.

**Downstream:** Grade 8 triangle work and Grade 9 deductive geometry.

**Primary misconceptions:** `any-vertical-segment-is-altitude`, `any-internal-ray-bisects`, `altitude-always-bisects`, `altitude-must-be-inside`. These are semantic proposals, not a claim that final code IDs exist.

**Desired evidence mix:** none / medium / none / high.

**Literacy target:** None/light; short Hebrew choices only, no free proof.

**Bands:** A: internal altitude and marked bisector; B: contrast the definitions in rotated/right triangles; C: external altitude as P3 optional support. Definitions stay fixed when the opposite side is extended.

**Question families:**

| Family | Category / intended evidence | Production / answer type | Misconceptions / supporting Skills | Literacy | Structure by Band | Visual/media | Placement | Fluency | Timed | Survival |
|---|---|---|---|---|---|---|---|---|---|---|
| altitude-identification | representation — Identify the required vertex-to-side perpendicular relation. | mixed / singleChoice | any-vertical-segment-is-altitude / None | light | A: from vertex perpendicular to opposite side; B: rotated or coincident with a leg | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| bisector-identification | representation — Identify equal division of the vertex angle. | mixed / singleChoice | any-internal-ray-bisects / None | light | A: from vertex with equal arcs; B: contrast a non-bisecting internal ray | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | Yes | No | No | No |
| segment-definition-contrast | conceptual — Choose the necessary condition; explicitly allow insufficient data. | mixed / singleChoice | altitude-always-bisects / None | light | B: altitude versus bisector | Static reviewed image/SVG sufficient; semantic manifest for geometric objects | Yes | No | No | No |
| external-altitude | representation — Optional obtuse-triangle altitude without a new theorem. | mixed / singleChoice | altitude-must-be-inside / None | light | C: foot on extension of opposite side | Reusable Geometry SVG required for generated scale; reviewed static pilot possible | No | No | No | No |

**Representative archetypes (not bank items):**

- איזה קטע הוא גובה במשולש?
- מה בסימון מראה שהקטע חוצה את הזווית?

**Evidence policy proposal:** minimum 10 real Attempts; required categories representation: 6; conceptual: 4; required Bands A: 6; B: 4. No compulsory speed requirement; optional Timed/Survival performance does not redefine the Skill target. Section 9 supplies the simultaneous category/Band witness; section 12 adds structural readiness requirements that the current policy type alone cannot enforce.

**Readiness requirement:** Valid/nonvalid altitude and bisector, right/rotated/obtuse cases, explicit foot and side extension when needed; no median naming or curriculum target. Apply the shared seeded/anti-repeat or reviewed-visual gates in section 12.

**Reuse / migration:** New ID: no active geometry catalog Skill or question family exists.

## 7. Future semantic Geometry Reason Bank

These IDs name mathematical justifications, not Skill IDs or additional Mastery targets. Store each reason with its conditions; a correct numerical answer does not prove the learner chose the right reason. The MVP can ask a separate closed reason-selection question targeted to the same Skill. A composite answer-plus-reason evaluator is not assumed to exist. Present a small relevant set, typically 4–6 choices, never a global reason dropdown or free-text proof box. Each alternative must be plausible in the shown configuration; do not pad with advanced theorems.

| Proposed semantic reason ID | Hebrew student wording | Conditions / Skills and families |
|---|---|---|
| GEO_REASON_RIGHT_ANGLE_90 | זווית ישרה היא בת 90 מעלות | A right-angle mark or explicit perpendicular given; GEO_ANGLE_RELATIONS:angle-total-complement, GEO_DIAGRAM_LANGUAGE:equal-angle-mark-reading. |
| GEO_REASON_STRAIGHT_ANGLE_180 | זווית שטוחה היא בת 180 מעלות | Opposite rays/straight angle; GEO_ANGLE_RELATIONS:angle-total-complement. |
| GEO_REASON_FULL_TURN_360 | סכום הזוויות סביב נקודה בסיבוב מלא הוא 360 מעלות | The marked pieces partition exactly one full turn; GEO_ANGLE_RELATIONS:angle-total-complement. |
| GEO_REASON_LINEAR_PAIR_180 | זוויות צמודות היוצרות זווית שטוחה משלימות ל־180 מעלות | Common vertex/arm and other arms opposite; GEO_ANGLE_RELATIONS:linear-pair, two-rule-angle-chain. Mere adjacency is insufficient. |
| GEO_REASON_VERTICAL_ANGLES_EQUAL | זוויות קודקודיות שוות זו לזו | Opposite angle pair at two intersecting lines; GEO_ANGLE_RELATIONS:vertical-or-bisected; GEO_PARALLEL_ANGLES:parallel-vertical-chain. |
| GEO_REASON_BISECTOR_EQUAL_ANGLES | חוצה זווית מחלק אותה לשתי זוויות שוות | Bisector explicitly given or equal arcs provided; GEO_ANGLE_RELATIONS:vertical-or-bisected; GEO_SPECIAL_SEGMENTS:bisector-identification. |
| GEO_REASON_TRIANGLE_SUM_180 | סכום הזוויות במשולש הוא 180 מעלות | Three internal angles of the same triangle; GEO_TRIANGLE_ANGLES:triangle-missing-angle, triangle-equation, triangle-reason-choice. |
| GEO_REASON_PARALLEL_ALTERNATE_EQUAL | בין ישרים מקבילים, זוויות מתחלפות שוות | Parallel lines and the correct alternate pair with a transversal; GEO_PARALLEL_ANGLES:parallel-angle-value, parallel-reason-check. |
| GEO_REASON_PARALLEL_CORRESPONDING_EQUAL | בין ישרים מקבילים, זוויות מתאימות שוות | Parallel lines and the correct corresponding pair; same Skills/families as preceding row. Not the converse. |
| GEO_REASON_ALTITUDE_PERPENDICULAR | גובה יוצא מקודקוד ומאונך לצלע שמולו או להמשכה | Vertex and foot/side relation explicitly identified; GEO_SPECIAL_SEGMENTS:altitude-identification, external-altitude. |
| GEO_REASON_EQUAL_SEGMENT_MARKS | סימוני שוויון זהים מציינים קטעים שווים | Same mark group on specified segments; GEO_DIAGRAM_LANGUAGE:segment-line-relation-marks; GEO_TRIANGLE_PROPERTIES:triangle-side-classification. |
| GEO_REASON_EQUAL_ANGLE_MARKS | סימוני זוויות שווים מציינים זוויות שוות | Same arc group, not merely every decorative arc; GEO_DIAGRAM_LANGUAGE:equal-angle-mark-reading, marked-versus-apparent. |
| GEO_REASON_INSUFFICIENT_GIVENS | אין די נתונים כדי להסיק זאת | A selectable diagnostic outcome, not a theorem; GEO_DIAGRAM_LANGUAGE:marked-versus-apparent, GEO_PARALLEL_ANGLES:parallel-reason-check, GEO_SPECIAL_SEGMENTS:segment-definition-contrast. |

An optional exterior-angle family may justify its answer through TRIANGLE_SUM_180 plus LINEAR_PAIR_180; it does not need a separate mandatory theorem ID. Reasons should reference stable object IDs (which angle/line/triangle the rule concerns). Hebrew wording is reviewed for age and brevity; mathematical labels and values still go through KaTeX. Avoid teaching an implication symbol as part of selecting a reason.

## 8. Placement / gateway matrix

This is a content selection design, not an adaptive engine or final global test length. A1–A10 and G1–G5 are independent chapter gateways in a dependency-aware path. **One error never stops placement.** After an error, confirm the same Skill with a different structure/representation and lighter support; two failures at that target are meaningful, while errors on unrelated Skills are not a generic “two strikes” rule. If the confirmation succeeds, obtain another independent probe or retain uncertainty instead of guessing a location.

Proposed local bypass evidence: two independently successful core probes per required gateway Skill, spanning its gateway distinctions; a recent equivalent real Attempt may supply one when identity/profile validity is known. This is a provisional local evidence rule for teacher approval, not a final global item count or mastery pass percentage. Choice-only success should be corroborated by a different representation or numeric probe where available. Initial probes below are the first sweep, not a requirement to continue after a clear confirmed bottleneck. Stop the chapter at the earliest confirmed missing prerequisite, retain earlier results, and offer/resume after a fatigue cap whose duration/count remains pilot-calibrated. Do not silently skip an inaccessible renderer or an empty family.

| Chapter | Gateway Skills and valid family slice | Minimum initial probes (proposal) | Exclude from gateway | Confirmation after one error | Bypass coverage / meaningful failure |
|---|---|---|---|---|---|
| A1 | AR_ADD_FACTS:bounded-sum; AR_SUB_FACTS:bounded-difference; each AR_MUL_F_*:fact-family-product/commuted-product; each AR_DIV_F_*:numerical-dividend-quotient | One per ten atomic targets, offered adaptively in anchor-first order; stop to confirm a failing target before traversing all groups. | All prose/context, adjusted/three-addend expressions, current cancellation quotients, optional AR_FACTORS_MULTIPLES/AR_PLACE_VALUE. | Same atomic fact group, alternate factor order or related inverse check with tiny numbers. Do not confirm division using another cancellation expression. | Bypass requires coverage across the four multiplication and four division groups, not only 2/5/10. Repeated crossing-ten or anchored-fact failure locates remediation. Untimed gateway success never clears required sprint fluency. |
| A2 | FRAC_MEANING:equal-unit/benchmark-one; FRAC_EQUIV:expand/simplify/common-denominator; FRAC_COMPARE:common-unit-order; FRAC_ADD_SUB:both directions; FRAC_MULTIPLY:whole/fraction; FRAC_DIVIDE:reciprocal/direct divide | One per six required Skills, then one additional denominator-direction probe in FRAC_EQUIV and FRAC_ADD_SUB: initial local plan eight, adaptive not global. | Terminology-only numerator questions, large denominators, equations, long stories. | Separate conversion from operation: supply the common denominator or use a visual equal-unit check to identify whether support caused failure. | Bypass requires meaning, equivalence, comparison and all operation targets, including subtraction/unlike units. Repeated scaling failure places at equivalence; correct conversion plus failed operation places at that operation. |
| A3 | INT_NUMBER_LINE:read-signed-position; INT_COMPARE:signed-comparison; INT_NEGATION:opposite structure; four signed-operation A families | One per seven targets; additional opposite-pair/sign contrast when needed. | Large B/C arithmetic, symbolic sign conditions before algebra, prose-only line placement, current constructed dividend. | Same sign pattern with smaller magnitudes and changed order/visible line; contrast a competing sign pattern. | Require positive/negative direction and core sign structures; repeated same-Skill error locates that Skill. Preserve all existing reviewed families as ordinary practice. |
| A4 | OPS_ORDER_BASIC:precedence/parentheses/equal precedence; OPS_POWERS:power-as-product/negative-base-scope; OPS_SQUARE_ROOTS:root relation | One per three targets, plus one distinct grouping/equal-precedence probe. | Long chains, 13–20 square extension, root laws. | First-operation check versus final value, repeated product versus power value, square relation versus root recall. | Bypass needs grouping, precedence, power sign scope and principal-root meaning; distinguish arithmetic support from rule failure. |
| A5 | ALG_VARIABLE:hidden-coefficient/term reading; ALG_EXPRESSIONS:phrase translation; ALG_EQUALITY:expression-versus-equation | One per three targets, plus the other hidden coefficient sign and the contrasting additive/multiplicative phrase. | Current high-literacy variable context, algebra simplification, solution algorithm. | Make the hidden coefficient explicit or switch translation direction; do not test harder reading as confirmation. | Both x=1x and -x=-1x plus term/constant and relation translation must be covered; repeated target mismatch locates language stage. |
| A6 | ALG_SUBSTITUTE:numeric-value, parenthesized and partial replacement | Three initial structures: zero/positive, negative, partial/grouped replacement. | Large supporting products or unknown-value solving. | Ask for replaced expression before calculation; then evaluate a simpler one. | Replacement correct but arithmetic wrong prompts support remediation; repeated substitution-location/grouping errors locate A6. |
| A7 | ALG_LIKE_TERMS:signed/unlike; ALG_DISTRIBUTE:positive/negative and basic reverse | One per two Skills, then one signed and one reverse/condition contrast. | Expanded Grade 8 distribution, complex powers. | Read coefficient separately, then combine; compare correct/partial distribution with positive numbers. | Bypass requires like/unlike distinction, signed coefficients and every-term distribution; repeated operation error locates that Skill. |
| A8 | ALG_EQUALITY:verify-candidate; EQ_ADD:unknown-subtrahend; EQ_MUL:unknown-dividend/negative; EQ_LINEAR_STEPS:two-step, parentheses, both-sides | One per four gateway targets, with extra structural probes before recommending bypass of advanced families. | No/infinite solutions, word problems, variable denominators. Fraction applications only when A2 gateway already supports them. | Check a supplied solution, then isolate a single inverse operation; simplify a provided expression separately if necessary. | Bypass of whole A8 needs both one-step identities and multi-step structures, including a simple rational application after fraction evidence. Failure of support does not imply a new equation misconception. |
| A9 | COORD_READ_PLOT:read-point/choose-plotted-position; COORD_MOVEMENT:change/distance | Two read/position probes and one axis-aligned movement probe initially. | Fine motor plotting, diagonal distance, crowded scales. | Reverse read-to-position direction; use an axis point to isolate x/y order; simplify signed change. | Bypass requires read and position mapping across quadrants and zero coordinates plus horizontal/vertical meaning. Closed proxy does not claim free plotting mastery. |
| A10 | GRAPH_READ:lookup/trend/domain; FUNCTION_RELATIONS:table translation/one-output | One per two Skills, then reverse lookup and function-counterexample checks. | Slope formulas, ambiguous interpolation, long context. | Same relation as a table, or simpler graph with unchanged units; distinguish reverse lookup from one-output condition. | Bypass needs both lookup directions, extrema/trends/domain and representation uniqueness; repeated unit/order or relation failure locates the matching Skill. |
| G1 | GEO_ANGLE_SENSE:object/estimate; GEO_DIAGRAM_LANGUAGE:angle names/marks | One per two Skills plus one “looks like” counterexample. | Congruence/similarity symbols, ambiguous exact angle estimation. | Same opening with changed arm length/rotation; isolate the highlighted sweep or relevant mark group. | Bypass requires benchmark meaning and reliable use of labels/marks; repeated appearance-based inference blocks later geometry gateway recommendations. |
| G2 | GEO_ANGLE_RELATIONS:one total/equality family and local-reason-choice | Two initial probes using different rules. | Two-rule C chain as an initial probe, algebraic unknowns, long arithmetic. | Ask for the applicable reason with simple/known numbers; contrast adjacent and vertical pair. | Bypass spans totals, vertical equality and bisector meaning; repeated wrong-rule selection locates G2 even if arithmetic occasionally gives the same number. |
| G3 | GEO_PARALLEL_ANGLES:pair identification, numerical value, condition check | Two initial pair/condition probes, with numeric use before bypass. | Converse theorem, multi-rule C chain, absence of clear parallel markings. | Rotate the same incidence structure; supply the pair and ask if equality is licensed. | Require alternate and corresponding pairs with explicit parallel condition; repeated appearance-only or wrong-pair errors locate G3. |
| G4 | GEO_TRIANGLE_PROPERTIES:legs/hypotenuse and marked properties; GEO_TRIANGLE_ANGLES:missing angle/reason | One per two Skills, then rotated right-triangle and reason contrast. | Exterior angle as a gate, isosceles theorem inference, difficult equation. | Rotate triangle and preserve right mark; simplify numerical sum or ask which total applies. | Bypass covers right-triangle side meaning and sum, not just vocabulary. Repeated mark/side or total errors locate the relevant target. |
| G5 | GEO_SPECIAL_SEGMENTS:altitude, bisector and definition contrast | Two initial probes, one altitude and one bisector. | External altitude as a gate, median, free construction. | Change orientation; explicitly show right box or equal arcs and test the defining relation. | Bypass needs both definitions and distinction; repeated “every internal segment is both” failure locates G5. |

Bypass only changes path navigation when a later engine supports it. Real placement answers produce ordinary atomic Attempts; no fabricated Attempts, stars or Mastery are created. A failed visual question on an inaccessible/illegible asset is an infrastructure/accessibility failure, not mathematical evidence. Required arithmetic sprint completion uses a separately calibrated pure-calculation profile; neither a short conceptual gateway nor old mixed Timed results certify it.

The reciprocal product-one completion in A2 is a definition/meaning task, not a general equation-solving application. Fraction equations that require isolating a variable remain in A8 after the fraction operations.

## 9. Evidence-policy feasibility

### Current executable mismatches

The comparison was performed against the active exported definitions at the recorded commit, using positive requiredCategoryEvidence/requiredBandEvidence entries. Absence of a category or Band makes its quota impossible regardless of how often a student practices. The current validator/readiness checks do not enforce this cross-contract reachability. The following ten mismatches reproduce the dated audit; the other seventeen current Skills have no absent category/Band in their policy, which proves availability only, not good pedagogy or guaranteed scheduling.

| Current Skill | Unreachable requirement | Recommended later action | Why |
|---|---|---|---|
| AR_MUL_F_2_5_10 | category:conceptual | Add inverse-product-check conceptual content; review fluency policy independently. | Do not relabel cognitive categories or invent a Band merely to make the check pass. |
| AR_MUL_F_3_4 | category:conceptual | Add inverse-product-check conceptual content; review fluency policy independently. | Do not relabel cognitive categories or invent a Band merely to make the check pass. |
| AR_MUL_F_6_7 | category:conceptual | Add inverse-product-check conceptual content; review fluency policy independently. | Do not relabel cognitive categories or invent a Band merely to make the check pass. |
| AR_MUL_F_8_9 | category:conceptual | Add inverse-product-check conceptual content; review fluency policy independently. | Do not relabel cognitive categories or invent a Band merely to make the check pass. |
| AR_FACTORS_MULTIPLES | category:reasoning | Add common-candidate-check reasoning and limit required Bands to meaningful structures. | Do not relabel cognitive categories or invent a Band merely to make the check pass. |
| INT_NEGATION | category:reasoning; band:C | Modify policy: conceptual A/B, no artificial reasoning or C; add minus-role family for roadmap coverage. | Do not relabel cognitive categories or invent a Band merely to make the check pass. |
| INT_MUL | band:C | Modify policy: require actual A/B structures, not C; preserve reviewed sign families. | Do not relabel cognitive categories or invent a Band merely to make the check pass. |
| INT_DIV | band:C | Modify policy: require actual A/B structures, not C; preserve reviewed sign families. | Do not relabel cognitive categories or invent a Band merely to make the check pass. |
| FRAC_EQUIV | category:conceptual | Add value-preservation-check conceptual evidence and version policy for new subtargets. | Do not relabel cognitive categories or invent a Band merely to make the check pass. |
| ALG_VARIABLE | category:representation | Add implicit-multiplication and hidden-coefficient representation families. | Do not relabel cognitive categories or invent a Band merely to make the check pass. |

### Proposed positive-requirement witnesses — every Entry Skill

Each row below gives a **single realizable multiset of planned family/Band observations**. Its category and Band counts jointly satisfy the proposed quotas, so separate category/Band tables cannot conceal an incompatible intersection. Multiplicity means independent parameter/representation variants, not repeated identical questions. Family names are local to the row's Skill and correspond to its card. All proposed minimums are 10–12 Attempts and fit the current 50-Attempt coverage window. This is a mathematical availability proof for the planned bank; it is not evidence that content is implemented or teacher-reviewed.

Category/Band coverage currently counts observed Attempts, including incorrect ones; mastery score and accuracy remain separate. The first implementation pass must not reinterpret these counts as correct-answer quotas without an explicit model decision. Likewise minimumAttempts alone does not establish Mastery. A sequence that never presents a required family cannot supply its evidence: readiness plus intentional profile sampling are required.

| Proposed Skill | Minimum Attempts | Positive category requirements | Positive Band requirements | Constructive simultaneous witness |
|---|---|---|---|---|
| AR_ADD_FACTS | 12 | calculation: 8; conceptual: 4 | A: 6; B: 6 | 4 from bounded-sum/A; 4 from bounded-sum/B; 2 from missing-addend/A; 2 from missing-addend/B |
| AR_SUB_FACTS | 12 | calculation: 8; conceptual: 4 | A: 6; B: 6 | 4 from bounded-difference/A; 4 from bounded-difference/B; 2 from inverse-addition-check/A; 2 from inverse-addition-check/B |
| AR_MUL_F_2_5_10 | 12 | calculation: 8; conceptual: 4 | A: 6; B: 6 | 4 from fact-family-product/A; 4 from commuted-product/B; 2 from inverse-product-check/A; 2 from inverse-product-check/B |
| AR_DIV_F_2_5_10 | 12 | calculation: 8; conceptual: 4 | A: 6; B: 6 | 4 from numerical-dividend-quotient/A; 4 from numerical-dividend-quotient/B; 2 from inverse-quotient-check/A; 2 from inverse-quotient-check/B |
| AR_MUL_F_3_4 | 12 | calculation: 8; conceptual: 4 | A: 6; B: 6 | 4 from fact-family-product/A; 4 from commuted-product/B; 2 from inverse-product-check/A; 2 from inverse-product-check/B |
| AR_DIV_F_3_4 | 12 | calculation: 8; conceptual: 4 | A: 6; B: 6 | 4 from numerical-dividend-quotient/A; 4 from numerical-dividend-quotient/B; 2 from inverse-quotient-check/A; 2 from inverse-quotient-check/B |
| AR_MUL_F_6_7 | 12 | calculation: 8; conceptual: 4 | A: 6; B: 6 | 4 from fact-family-product/A; 4 from commuted-product/B; 2 from inverse-product-check/A; 2 from inverse-product-check/B |
| AR_DIV_F_6_7 | 12 | calculation: 8; conceptual: 4 | A: 6; B: 6 | 4 from numerical-dividend-quotient/A; 4 from numerical-dividend-quotient/B; 2 from inverse-quotient-check/A; 2 from inverse-quotient-check/B |
| AR_MUL_F_8_9 | 12 | calculation: 8; conceptual: 4 | A: 6; B: 6 | 4 from fact-family-product/A; 4 from commuted-product/B; 2 from inverse-product-check/A; 2 from inverse-product-check/B |
| AR_DIV_F_8_9 | 12 | calculation: 8; conceptual: 4 | A: 6; B: 6 | 4 from numerical-dividend-quotient/A; 4 from numerical-dividend-quotient/B; 2 from inverse-quotient-check/A; 2 from inverse-quotient-check/B |
| AR_FACTORS_MULTIPLES | 10 | conceptual: 8; reasoning: 2 | A: 4; B: 6 | 4 from identify-factors/A; 4 from identify-multiples/B; 2 from common-candidate-check/B |
| INT_NUMBER_LINE | 10 | conceptual: 4; representation: 6 | A: 4; B: 3; C: 3 | 4 from sign-zero-classification/A; 3 from read-signed-position/B; 3 from directed-move/C |
| INT_COMPARE | 10 | conceptual: 4; reasoning: 6 | A: 4; B: 6 | 4 from negative-versus-positive/A; 6 from signed-comparison/B |
| INT_NEGATION | 10 | conceptual: 10 | A: 4; B: 6 | 4 from opposite-number-structure/A; 3 from opposite-number-structure/B; 3 from minus-role-contrast/B |
| INT_ADD | 10 | calculation: 7; conceptual: 3 | A: 5; B: 3; C: 2 | 2 from negative-plus-positive-positive-result/A; 3 from negative-plus-positive-negative-result/B; 2 from negative-plus-negative/C; 3 from opposites-result-zero/A |
| INT_SUB | 10 | calculation: 7; conceptual: 3 | A: 5; B: 3; C: 2 | 2 from positive-minus-larger-positive/A; 3 from positive-minus-negative/B; 2 from negative-minus-positive/C; 3 from subtract-negative-as-addition/A |
| INT_MUL | 10 | calculation: 8; conceptual: 2 | A: 6; B: 4 | 3 from negative-times-positive/A; 3 from positive-times-negative/A; 2 from negative-times-negative/B; 2 from multiplication-sign-rules/B |
| INT_DIV | 10 | calculation: 8; conceptual: 2 | A: 8; B: 2 | 3 from negative-divided-by-positive/A; 3 from positive-divided-by-negative/A; 2 from negative-divided-by-negative/A; 2 from division-sign-rules/B |
| FRAC_MEANING | 10 | representation: 6; conceptual: 4 | A: 3; B: 5; C: 2 | 3 from equal-unit-representation/A; 3 from fraction-on-number-line/B; 2 from fraction-as-quotient/B; 2 from benchmark-one/C |
| FRAC_EQUIV | 12 | representation: 7; reasoning: 2; conceptual: 3 | A: 5; B: 4; C: 3 | 2 from expand-equivalent-fraction/A; 2 from simplify-equivalent-fraction/B; 3 from common-denominator-pair/C; 3 from value-preservation-check/A; 2 from negative-sign-equivalence/B |
| FRAC_COMPARE | 10 | reasoning: 5; conceptual: 3; representation: 2 | A: 3; B: 5; C: 2 | 3 from same-denominator-order/A; 3 from same-numerator-order/B; 2 from common-unit-order/C; 2 from visual-order/B |
| FRAC_ADD_SUB | 10 | calculation: 8; conceptual: 2 | A: 4; B: 4; C: 2 | 2 from add-same-denominator/A; 2 from subtract-same-denominator/A; 2 from add-unlike-denominators/B; 2 from subtract-unlike-denominators/C; 2 from unit-error-check/B |
| FRAC_MULTIPLY | 10 | calculation: 8; conceptual: 2 | A: 6; B: 4 | 4 from whole-times-fraction/A; 4 from fraction-times-fraction/B; 2 from scaling-size-check/A |
| FRAC_DIVIDE | 12 | conceptual: 3; calculation: 7; reasoning: 2 | A: 6; B: 6 | 3 from reciprocal-product-one/A; 3 from divide-by-unit-fraction/A; 4 from divide-general-fractions/B; 2 from division-rewrite-check/B |
| OPS_ORDER_BASIC | 10 | calculation: 8; conceptual: 2 | A: 4; B: 4; C: 2 | 2 from precedence-calculation/A; 2 from parentheses-calculation/B; 2 from equal-precedence-calculation/B; 2 from signed-order/C; 2 from identify-first-operation/A |
| OPS_POWERS | 10 | representation: 3; calculation: 5; conceptual: 2 | A: 6; B: 4 | 3 from power-as-product/A; 3 from square-facts/A; 2 from negative-base-scope/B; 2 from signed-power-value/B |
| OPS_SQUARE_ROOTS | 10 | calculation: 6; conceptual: 4 | A: 10 | 6 from perfect-square-root/A; 4 from root-square-relation/A |
| ALG_EQUALITY | 10 | conceptual: 6; reasoning: 4 | A: 6; B: 4 | 4 from relational-equality/A; 2 from expression-versus-equation/A; 4 from verify-candidate-solution/B |
| ALG_VARIABLE | 10 | conceptual: 5; representation: 5 | A: 5; B: 3; C: 2 | 3 from variable-concepts/A; 2 from implicit-multiplication/A; 3 from hidden-coefficient/B; 2 from term-and-constant-reading/C |
| ALG_EXPRESSIONS | 10 | representation: 10 | A: 4; B: 6 | 4 from additive-phrase-to-expression/A; 4 from multiplicative-phrase-to-expression/B; 2 from expression-to-phrase/B |
| ALG_SUBSTITUTE | 12 | calculation: 6; representation: 4; conceptual: 2 | A: 5; B: 5; C: 2 | 3 from numeric-value-substitution/A; 3 from numeric-value-substitution/B; 2 from parenthesized-substitution/B; 2 from partial-substitution/C; 2 from meaning-of-substitution/A |
| ALG_LIKE_TERMS | 10 | calculation: 8; conceptual: 2 | A: 3; B: 3; C: 4 | 3 from combine-positive-like-terms/A; 3 from combine-signed-like-terms/B; 2 from separate-unlike-terms/C; 2 from collect-mixed-expression/C |
| ALG_DISTRIBUTE | 10 | representation: 2; calculation: 6; reasoning: 2 | A: 5; B: 3; C: 2 | 2 from numeric-distributive-bridge/A; 3 from positive-factor-distribution/A; 3 from negative-factor-distribution/B; 2 from basic-common-factor/C |
| EQ_ADD | 10 | calculation: 8; conceptual: 2 | A: 6; B: 4 | 4 from unknown-plus-or-minus/A; 4 from unknown-subtrahend/B; 2 from additive-inverse-meaning/A |
| EQ_MUL | 10 | calculation: 8; conceptual: 2 | A: 5; B: 5 | 3 from unknown-factor/A; 3 from unknown-dividend/B; 2 from negative-coefficient/B; 2 from multiplicative-inverse-meaning/A |
| EQ_LINEAR_STEPS | 12 | calculation: 10; reasoning: 2 | A: 4; B: 4; C: 4 | 2 from two-step-linear/A; 2 from simplify-first-equation/B; 2 from parenthesized-equation/B; 2 from unknown-on-both-sides/C; 2 from fraction-equation-application/C; 2 from equivalence-step-check/A |
| COORD_READ_PLOT | 10 | conceptual: 3; representation: 7 | A: 5; B: 3; C: 2 | 3 from axes-origin-order/A; 3 from read-point/B; 2 from choose-plotted-position/A; 2 from choose-plotted-position/C |
| COORD_MOVEMENT | 10 | conceptual: 3; representation: 3; calculation: 4 | A: 5; B: 5 | 3 from one-coordinate-change/A; 3 from axis-aligned-destination/B; 2 from axis-aligned-distance/A; 2 from axis-aligned-distance/B |
| GRAPH_READ | 12 | representation: 7; reasoning: 3; conceptual: 2 | A: 2; B: 6; C: 4 | 2 from axes-and-point-meaning/A; 3 from graph-value-lookup/B; 2 from graph-extrema/C; 3 from graph-trend/B; 2 from visible-domain/C |
| FUNCTION_RELATIONS | 10 | representation: 8; conceptual: 2 | A: 6; B: 4 | 3 from table-to-points/A; 3 from graph-to-table/A; 2 from description-graph-translation/B; 2 from one-output-per-input/B |
| GEO_ANGLE_SENSE | 10 | conceptual: 6; representation: 4 | A: 6; B: 4 | 3 from angle-object-meaning/A; 4 from angle-benchmark-estimate/B; 3 from angle-classification/A |
| GEO_DIAGRAM_LANGUAGE | 10 | representation: 8; reasoning: 2 | A: 3; B: 5; C: 2 | 3 from angle-name-reading/A; 3 from segment-line-relation-marks/B; 2 from equal-angle-mark-reading/B; 2 from marked-versus-apparent/C |
| GEO_ANGLE_RELATIONS | 10 | calculation: 8; reasoning: 2 | A: 5; B: 3; C: 2 | 3 from angle-total-complement/A; 3 from vertical-or-bisected/B; 2 from two-rule-angle-chain/C; 2 from local-reason-choice/A |
| GEO_PARALLEL_ANGLES | 10 | conceptual: 2; representation: 2; calculation: 4; reasoning: 2 | A: 2; B: 7; C: 1 | 2 from line-relationship-identification/A; 2 from transversal-angle-pair/B; 3 from parallel-angle-value/B; 2 from parallel-reason-check/B; 1 from parallel-vertical-chain/C |
| GEO_TRIANGLE_PROPERTIES | 10 | conceptual: 6; representation: 4 | A: 6; B: 4 | 3 from triangle-side-classification/A; 3 from triangle-angle-classification/A; 4 from legs-and-hypotenuse/B |
| GEO_TRIANGLE_ANGLES | 10 | calculation: 7; reasoning: 3 | A: 7; B: 3 | 4 from triangle-missing-angle/A; 3 from triangle-equation/B; 3 from triangle-reason-choice/A |
| GEO_SPECIAL_SEGMENTS | 10 | representation: 6; conceptual: 4 | A: 6; B: 4 | 3 from altitude-identification/A; 3 from bisector-identification/A; 4 from segment-definition-contrast/B |

**Fluency feasibility:** the ten arithmetic fact Skills each have eight calculation observations in their witness, so six correct independent observations can be supplied by actual eligible calculation families. A pilot must still determine the speed bound; no new final ms/accuracy/questions-per-minute cutoff is set here. The existing FACT_FLUENCY_V1 currently uses six observations and a 5,000 ms median; that is an executable fact, not adoption of it as the final sprint standard. New fluency activation remains conditional on calibration. No other Skill receives a compulsory fluency requirement.

**Important limits of the current policy architecture:** it aggregates category and Band, not contentFamily, sign pattern, diagram structure or entry-profile version. The current correct-independent fluency window also is not filtered by an explicit sprint family. Consequently a feasible quota cannot by itself prove that a learner saw hidden coefficients, both fraction directions or the proper fluency slice. A later implementation needs explicit family/profile sampling and, for persistent diagnostic/expanded-scope claims, durable family/profile identity or another versioned coverage contract. Current Attempts do not persist contentFamily or full definition version/snapshot; backend category/Band losses are already documented in the dated audit. Never auto-credit expanded targets by replaying old category/Band counts as if they were new-family evidence. This is a real infrastructure dependency, not a reason to fragment every family into a new Skill.

**Mismatch result:** no proposed positive category/Band quota lacks a named planned family/Band witness. Empirical variation, human review, family-level persistence and calibrated fluency remain unproven until implementation/pilot; these are explicit release gates, not silently declared satisfied.

## 10. Mode/profile feasibility and arithmetic sprints

Current filter facts: Timed requires one common profile ID, allowed category/Band and `short-item`; Survival has its own category/Band whitelist plus `short-item`. A Skill flag alone does not prove any question survives filtering. Mixing incompatible future profiles also yields an empty scope under the current code and needs an explicit composition rule before launch.

| Current advertised mode | Advertised / nonempty Skills | Empty Skills | Later correction |
|---|---|---|---|
| Timed | 14 / 10 | INT_ADD, INT_SUB, INT_MUL, INT_DIV | Author/review small concrete A slices, then opt those families into a compatible profile; until then hide/disable the empty mode at supply-aware launch. Do not bulk-tag symbolic or large-magnitude items. |
| Survival | 27 / 12 | AR_PLACE_VALUE; all seven INT_*; FRAC_MEANING, FRAC_EQUIV; ALG_EQUALITY, ALG_VARIABLE, ALG_SUBSTITUTE; EQ_ADD, EQ_MUL | Choose actual family allowlists or remove mode advertisement. AR_PLACE_VALUE representation does not fit the current calculation/conceptual whitelist, and should not be forced into it. |
| Required arithmetic sprint | No authored required sprint profiles/Stages | All four mandatory sprint products absent | Implement explicitly after pure-calculation content and calibration; do not equate current TIMED_FLUENCY with the intended content profile. |

### Every proposed Skill: concrete eligible families

Fixed and Practice include all reviewed core families plus explicitly optional practice variants; the remaining columns are exhaustive recommended allowlists. “None” means do not advertise that mode. Every nonempty recommendation below maps to an actual family row in a card; Bands in parentheses restrict the slice. These are future profiles, not claims about current tags. Survival families authored as reasoning/representation cannot pass today's whitelist: either create a reviewed compatible profile later or keep that mode off. Family selectors also need literacy and visual-complexity constraints; `short-item` by itself is not the sprint contract.

| Skill | Fixed | Practice | Timed families | Survival families | Explicit arithmetic sprint families |
|---|---|---|---|---|---|
| AR_ADD_FACTS | Yes after readiness | Yes after readiness | bounded-sum | bounded-sum; missing-addend | bounded-sum |
| AR_SUB_FACTS | Yes after readiness | Yes after readiness | bounded-difference | bounded-difference; inverse-addition-check | bounded-difference |
| AR_MUL_F_2_5_10 | Yes after readiness | Yes after readiness | fact-family-product; commuted-product | fact-family-product; commuted-product; inverse-product-check | fact-family-product; commuted-product |
| AR_DIV_F_2_5_10 | Yes after readiness | Yes after readiness | numerical-dividend-quotient | numerical-dividend-quotient; inverse-quotient-check | numerical-dividend-quotient |
| AR_MUL_F_3_4 | Yes after readiness | Yes after readiness | fact-family-product; commuted-product | fact-family-product; commuted-product; inverse-product-check | fact-family-product; commuted-product |
| AR_DIV_F_3_4 | Yes after readiness | Yes after readiness | numerical-dividend-quotient | numerical-dividend-quotient; inverse-quotient-check | numerical-dividend-quotient |
| AR_MUL_F_6_7 | Yes after readiness | Yes after readiness | fact-family-product; commuted-product | fact-family-product; commuted-product; inverse-product-check | fact-family-product; commuted-product |
| AR_DIV_F_6_7 | Yes after readiness | Yes after readiness | numerical-dividend-quotient | numerical-dividend-quotient; inverse-quotient-check | numerical-dividend-quotient |
| AR_MUL_F_8_9 | Yes after readiness | Yes after readiness | fact-family-product; commuted-product | fact-family-product; commuted-product; inverse-product-check | fact-family-product; commuted-product |
| AR_DIV_F_8_9 | Yes after readiness | Yes after readiness | numerical-dividend-quotient | numerical-dividend-quotient; inverse-quotient-check | numerical-dividend-quotient |
| AR_FACTORS_MULTIPLES | Yes after readiness | Yes after readiness | None | identify-factors; identify-multiples | None |
| INT_NUMBER_LINE | Yes after readiness | Yes after readiness | None | sign-zero-classification | None |
| INT_COMPARE | Yes after readiness | Yes after readiness | None | negative-versus-positive; signed-comparison | None |
| INT_NEGATION | Yes after readiness | Yes after readiness | None | opposite-number-structure | None |
| INT_ADD | Yes after readiness | Yes after readiness | negative-plus-positive-positive-result (A); negative-plus-positive-negative-result (A); negative-plus-negative (A) | negative-plus-positive-positive-result (A); negative-plus-positive-negative-result (A); negative-plus-negative (A); opposites-result-zero | None |
| INT_SUB | Yes after readiness | Yes after readiness | positive-minus-larger-positive (A); positive-minus-negative (A); negative-minus-positive (A); negative-minus-negative (A) | positive-minus-larger-positive (A); positive-minus-negative (A); negative-minus-positive (A); negative-minus-negative (A); subtract-negative-as-addition | None |
| INT_MUL | Yes after readiness | Yes after readiness | negative-times-positive (A); positive-times-negative (A); negative-times-negative (A) | negative-times-positive (A); positive-times-negative (A); negative-times-negative (A); multiplication-sign-rules (A) | None |
| INT_DIV | Yes after readiness | Yes after readiness | negative-divided-by-positive (A); positive-divided-by-negative (A); negative-divided-by-negative (A) | negative-divided-by-positive (A); positive-divided-by-negative (A); negative-divided-by-negative (A); division-sign-rules (A) | None |
| FRAC_MEANING | Yes after readiness | Yes after readiness | None | benchmark-one | None |
| FRAC_EQUIV | Yes after readiness | Yes after readiness | None | value-preservation-check | None |
| FRAC_COMPARE | Yes after readiness | Yes after readiness | None | same-denominator-order | None |
| FRAC_ADD_SUB | Yes after readiness | Yes after readiness | None | add-same-denominator; subtract-same-denominator | None |
| FRAC_MULTIPLY | Yes after readiness | Yes after readiness | None | whole-times-fraction | None |
| FRAC_DIVIDE | Yes after readiness | Yes after readiness | None | None | None |
| OPS_ORDER_BASIC | Yes after readiness | Yes after readiness | None | precedence-calculation; identify-first-operation | None |
| OPS_POWERS | Yes after readiness | Yes after readiness | square-facts | square-facts | None |
| OPS_SQUARE_ROOTS | Yes after readiness | Yes after readiness | perfect-square-root | perfect-square-root | None |
| ALG_EQUALITY | Yes after readiness | Yes after readiness | None | relational-equality | None |
| ALG_VARIABLE | Yes after readiness | Yes after readiness | None | None | None |
| ALG_EXPRESSIONS | Yes after readiness | Yes after readiness | None | None | None |
| ALG_SUBSTITUTE | Yes after readiness | Yes after readiness | None | None | None |
| ALG_LIKE_TERMS | Yes after readiness | Yes after readiness | None | combine-positive-like-terms | None |
| ALG_DISTRIBUTE | Yes after readiness | Yes after readiness | None | None | None |
| EQ_ADD | Yes after readiness | Yes after readiness | None | None | None |
| EQ_MUL | Yes after readiness | Yes after readiness | None | None | None |
| EQ_LINEAR_STEPS | Yes after readiness | Yes after readiness | None | None | None |
| COORD_READ_PLOT | Yes after readiness | Yes after readiness | None | None | None |
| COORD_MOVEMENT | Yes after readiness | Yes after readiness | None | None | None |
| GRAPH_READ | Yes after readiness | Yes after readiness | None | None | None |
| FUNCTION_RELATIONS | Yes after readiness | Yes after readiness | None | None | None |
| GEO_ANGLE_SENSE | Yes after readiness | Yes after readiness | None | None | None |
| GEO_DIAGRAM_LANGUAGE | Yes after readiness | Yes after readiness | None | None | None |
| GEO_ANGLE_RELATIONS | Yes after readiness | Yes after readiness | None | None | None |
| GEO_PARALLEL_ANGLES | Yes after readiness | Yes after readiness | None | None | None |
| GEO_TRIANGLE_PROPERTIES | Yes after readiness | Yes after readiness | None | None | None |
| GEO_TRIANGLE_ANGLES | Yes after readiness | Yes after readiness | None | None | None |
| GEO_SPECIAL_SEGMENTS | Yes after readiness | Yes after readiness | None | None | None |

### Required arithmetic sprint content contract

Four separate student-facing stages: addition, subtraction, multiplication, division. Every item is a **single short numerical calculation**, no prose, context, conceptual explanation, arbitrary visual decoding or choices that mainly test a concept. `literacyDemand = none` is necessary but insufficient: inspect rendered prompt content. Math uses KaTeX and `\cdot`. Prefer numeric response to reduce guessing. No final pass percentage, session length, questions-per-minute or timing threshold is fixed in this pass.

| Current definition IDs / families | Suitability | Required content change / retained use |
|---|---|---|
| MVP_AR_ADD_FACTS_A_A — two-addend-sum A | Mathematical structure suitable: operands 0–10 and 1–10, sum at most 20. Not strict sprint-ready because the prompt includes חשבו:. | Use a math-only display family/profile; add explicit crossing-ten balance and zero in either position. |
| MVP_AR_ADD_FACTS_B_A — two-addend-sum B | Not core sprint scope: both operands 10–20, sum 20–40. | Keep optional mental-arithmetic extension; add a bounded sum-at-most-20 structural slice instead. |
| MVP_AR_ADD_FACTS_A_B and MVP_AR_ADD_FACTS_B_B — related-three-addend-sum | Not comparable two-addend fluency; expression adds an extra 1. | Retain ordinary practice if pedagogically useful; exclude from core sprint. |
| MVP_AR_SUB_FACTS_A_A and MVP_AR_SUB_FACTS_B_A — nonnegative-difference | Mathematical form suitable, but missing cross-ten coverage and still has prose prefix. B samples both operands 10–20, giving a limited difference subset. | Keep direct form with math-only prompts; add minuend 11–20 and smaller subtrahend that crosses ten. Include subtract-zero/equal operands. |
| MVP_AR_SUB_FACTS_A_B and MVP_AR_SUB_FACTS_B_B — adjusted-minuend-difference | Not a single-step subtraction: a+1-b. | Exclude from sprint; retain as an optional calculation strategy family. |
| For each of the four AR_MUL_F_* IDs: MVP_<Skill>_A_A, _A_B, _B_A, _B_B (16 definitions) | Both fact-family-product and commuted-product have suitable one-product structure; partners 1–5 / 6–10. All still display prose. | Reuse sign-free numeric logic and both orders; math-only display and deliberate zero/one coverage. Do not admit factor values outside that atomic group. |
| For each of the four AR_DIV_F_* IDs: MVP_<Skill>_A_A, _A_B, _B_A, _B_B (16 definitions) | Not direct quotient recall: expression shows a·b/a or (a·b)/a. | New numerical-dividend-quotient family computes a·b internally but displays a numerical dividend divided by a. This materially changes evidence and deserves a new family/definition identity or explicit reviewed version, not an unrecorded global string replacement. |
| All arithmetic missing-addend, commutative-equivalence, concrete-equal-groups, subtraction-as-removal, equal-sharing and grouping choices | Not sprint eligible, even when short or useful for Mastery. | Keep in Fixed/Practice and selected placement/concept profiles; do not relabel conceptual/representation/reasoning as calculation. |
| All signed operations, powers, roots, factors/multiples, algebra and geometry | Not part of the four arithmetic sprints. | Some have separate optional Timed/Survival slices in the mode matrix; no automatic inclusion in mandatory arithmetic fluency. |

Among the 40 currently Timed-eligible arithmetic calculation definitions, **19 have a potentially suitable direct mathematical structure** (one addition, two subtraction, sixteen multiplication); none is strictly sprint-ready as rendered because all carry the calculation instruction. The other 21 need scope/structure changes (three addition, two subtraction, sixteen division). These are definition counts at the recorded source commit, not counts of eventual question instances or new definitions to generate.

**Bounds:** addition uses two nonnegative addends with sum at most 20, explicitly balancing within-ten/cross-ten and zero cases. Subtraction uses 0 ≤ subtrahend ≤ minuend ≤ 20 with within-ten, across-ten, subtract-zero and equal cases. No arbitrary upper range of 40 just because a current Band uses it. Multiplication/division combine the four existing anchor-group IDs in one sprint each, with balanced group exposure, not a single easy-group pool. Each question still produces evidence for its one actual atomic ID. Overlapping facts such as 6·7 keep the generating family's declared anchor; never award two Skills from one response. Product partners 0–10 are allowed, division divisors are nonzero anchors and dividend zero is legitimate. Facts 11/12 and larger signed mental factors are separate extensions.

Pilot calibration must distinguish operation and item structure, device/input effort, supportive accommodations and fatigue. A low score attributable to reading or interface friction is not arithmetic fluency. Before enabling sprint bypass, define a profile/version signature and retain its actual evidence; old mixed Timed scores are not converted into sprint completion.

## 11. Visual and rendering dependencies

Existing implementation supports KaTeX math segments and one responsive image on a question, including an SVG asset; it does not supply a semantic coordinate/graph/geometry renderer or clickable-object evaluator. Use one composite reviewed image with labelled candidate objects and ordinary answer choices when a visual pilot is useful. Do not assume images inside choice content: choice content supports text/math, while the shared image belongs to the question. Alt text must preserve instructional information without leaking an answer; an equivalent accessible representation may be a separate reviewed family. A student must never be asked to estimate an exact unmarked value from a not-to-scale drawing.

| Dependency | Minimal contract for later implementation | Families / release boundary |
|---|---|---|
| Static reviewed visual (S) | Immutable asset/version, correct labelled objects/scale, contrast independent of color, meaningful alt, no label collisions. For geometry retain a semantic object manifest even when the shipped artifact is an image. | Fraction unit/set/line families, initial coordinate/graph pilots, named-angle/mark/triangle-language pilots. Existing image plumbing is reusable, but content is not yet authored. |
| Coordinate SVG (C) | Axes x/y, origin, labelled ticks and ranges, equal/reported scale, quadrants, points with stable semantic IDs, labels, horizontal/vertical movement highlights and distances. Deterministic scene parameters and screen-independent coordinates. | COORD_READ_PLOT and COORD_MOVEMENT generated families; closed candidate selection first. Unconstrained plotting/dragging requires a separate future question/evaluation contract. |
| Graph SVG (C) | Build on coordinate primitives: plotted samples/segments, labelled quantities/units, discrete versus continuous semantics, visible input domain/endpoints, tied extrema, trend intervals, table consistency and multiple reverse-lookup matches. | GRAPH_READ and FUNCTION_RELATIONS. Entry A10 now supplies the concrete content need; this is a required Entry-C dependency for generated scale, not an implementation claim. No CAS or linear-function equation curriculum. |
| Geometry SVG (G) | Points, segments, lines, triangles/polygons, labels, angle arcs including reflex/full sweeps, right-angle box, distinct equal-segment/equal-angle mark groups, parallel marks, numeric lengths/angles, highlighting and stable semantic object IDs. | All G-coded family rows; review static pilot variants first, then use semantic templates to vary orientations, labels and measures without corrupting relations. |
| Semantic object identity | An object ID identifies the mathematical segment/angle/triangle independently of label and pixel position. Relations refer to IDs; measure validity and mark-group consistency are checked against the model, not the SVG appearance. | Every geometry family. Future “select AB”, “select the hypotenuse” or “select corresponding angle” is useful but not required for this closed-choice Entry MVP. Do not build it in Pass 1. |
| Reason/answer identity | Choices reference a stable reason ID and relevant object IDs; numerical answer, selected object and reason are distinct meanings. | Closed reason-choice questions work first; composite answer-plus-reason scoring and typed geometry names are future extensions. |

For every geometry family its card explicitly marks S or G. Static S families can launch only after enough reviewed contrasting scenes exist. G families may pilot with static scenes but the intended generated bank is blocked until the reusable semantic renderer validates them. The model should represent incidence and conditions such as an altitude foot lying on a side extension; hand-positioning a perpendicular-looking segment does not establish the relation.

For reverse graph lookup, a constant segment may correspond to infinitely many inputs. A finite multiChoice question must then explicitly ask about the displayed candidate inputs, or offer a reviewed short range description; it must not present a finite list as the complete continuous solution set. Distinguish reading the graph's visible domain from reading the full axis extent. These are graph-reading distinctions, not an early inequalities course.

## 12. Content readiness and release gates

Readiness is based on structural coverage, not arbitrary counts of fixed items. The card-specific requirement is mandatory together with these shared gates. Families explicitly described as optional/supplemental (e.g. exterior angle, external altitude, square 13–20, heavy context) do not become accidental policy or placement requirements. “All core families” means the required distinctions named in that card, not every historical family in its inventory.

| Bank strategy | Proposed minimum usable content before activation | Why / verification |
|---|---|---|
| Generator-heavy | At least two meaningful core families or complementary structural strata when one target truly has only one calculation structure; every required Band/category and each sign/operation direction named in the card. Each generator validated with at least 100 deterministic seeds, plus explicit boundary cases. | A/B copies that only change arbitrary constants do not count as independent structures. Seed checks cover construction, exact answers, option uniqueness, target/support attribution and reproducibility, not human review. |
| Anti-repeat depth | For ordinary varied families, demonstrate ten consecutive usable items without an unintended exact repeat under the actual selector; for finite fact/benchmark domains, cover the full justified finite domain before repeat, with an explicit small-domain exception. | Do not create fake random wording parameters to pass variety checks. Two displays of one commuted fact may be one retrieval identity for balancing. These proposed checks are not implemented in this document. |
| Representation/concept-heavy | At least two complementary reviewed conceptual/visual families; cover the meaningful direction changes, valid/nonvalid cases and each named misconception. Geometric scenes include upright and rotated/reflected cases plus a misleading-appearance nonexample where appropriate. | No arbitrary requirement for 18 nearly identical fixed items. Finite curated assets are justified by essential representation/wording; generated visual variants still require human scene review. |
| Mixed | Routine generator coverage plus the distinct conceptual/reasoning/representation families required by the Skill; use the policy witness to prove reachability and the readiness card to check structures absent from category/Band quotas. | A large numeric bank cannot substitute for conceptual evidence; one terminology choice cannot substitute for a diagram family. |
| Family/policy/mode join | Every positive policy cell maps to available family/Band variants; every offered mode/profile retains at least one usable family after the actual filters, plus adequate anti-repeat supply. Mixed-profile scopes are tested explicitly. | Extend the later validation architecture to compare catalog policy, readiness, definition metadata and filters. Current validate-content success is not proof of these joins. |
| Human review | Review the actual rendered prompt/options/correction on desktop and narrow mobile; check mathematical meaning, sign/RTL order, difficulty, named misconceptions, support/literacy, numerical/visual correctness and accessible alternatives. | No automated humanReviewed assignment. Definition/version changes follow the authoring standard; retained unchanged content keeps its review under the current contract. |
| Expanded-target activation | Specify new family coverage requirements, versioned profiles/policies and treatment of earlier Attempts before presenting expanded mastery or bypass claims. | Current family-agnostic projection cannot demonstrate new distinctions just because they are now available. No retroactive fabricated evidence. |
| Student path simplicity | Show compact Chapter/Stage labels and four arithmetic sprint entries; use Skill Groups/diagnostic detail internally. Main-path changes occur only in a later authorized wave. | The design has 47 internal targets, not a requirement for 47 new student-facing chapters. Optional support stays outside the required gate. |

Accuracy/mastery cutoffs are not recalibrated here. For generator-heavy arithmetic, use integer/rational exactness and exclude unintended zero divisors. For comparisons/choices, account for equivalent expressions before claiming distractors are distinct. For multiChoice, explicitly choose all intended correct options; no accidental multiple correct answers under singleChoice. For signed work, test intended sign/result patterns directly. For visualization, numeric answer checks and scene relations must agree; rendered glyph/label checks are additional, not substitutes.

## 13. Existing-content reuse and migration matrix

| Current Skill | Entry action | ID/history/review implication |
|---|---|---|
| AR_PLACE_VALUE | Remove from main Entry path/initial gateway; retain optional remediation/free practice. | Never relabel old Attempts. Path removal changes navigation only; preserve all Skill/definition history. |
| AR_ADD_FACTS | Retain current ID; Keep ID and existing conceptual/reasoning families. Add bounded crossing-ten calculation coverage; do not repurpose the current larger Band B silently. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| AR_SUB_FACTS | Retain current ID; Retain current ID; existing nonnegative-difference A/B are valid subsets, but B currently samples both operands 10–20 and misses crossing-ten facts. Keep removal stories outside speed profiles. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| AR_MUL_F_2_5_10 | Retain current ID; Reuse ID and both direct families. Add an explicit conceptual inverse/check family; retain equal-group representation separately. Removing the visible calculation instruction is required for sprint display. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| AR_MUL_F_3_4 | Retain current ID; Reuse ID and both direct families. Add an explicit conceptual inverse/check family; retain equal-group representation separately. Removing the visible calculation instruction is required for sprint display. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| AR_MUL_F_6_7 | Retain current ID; Reuse ID and both direct families. Add an explicit conceptual inverse/check family; retain equal-group representation separately. Removing the visible calculation instruction is required for sprint display. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| AR_MUL_F_8_9 | Retain current ID; Reuse ID and both direct families. Add an explicit conceptual inverse/check family; retain equal-group representation separately. Removing the visible calculation instruction is required for sprint display. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| AR_DIV_F_2_5_10 | Retain current ID; Retain ID and sharing/grouping. Current exact-fact-family-quotient and grouping-preserving-quotient display a product divided by its factor; they are not direct recall evidence. Add a new numerical-dividend display family and remove the old cancellation shortcut families from the sprint/main recall slice, preserving historical Attempts. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| AR_DIV_F_3_4 | Retain current ID; Retain ID and sharing/grouping. Current exact-fact-family-quotient and grouping-preserving-quotient display a product divided by its factor; they are not direct recall evidence. Add a new numerical-dividend display family and remove the old cancellation shortcut families from the sprint/main recall slice, preserving historical Attempts. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| AR_DIV_F_6_7 | Retain current ID; Retain ID and sharing/grouping. Current exact-fact-family-quotient and grouping-preserving-quotient display a product divided by its factor; they are not direct recall evidence. Add a new numerical-dividend display family and remove the old cancellation shortcut families from the sprint/main recall slice, preserving historical Attempts. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| AR_DIV_F_8_9 | Retain current ID; Retain ID and sharing/grouping. Current exact-fact-family-quotient and grouping-preserving-quotient display a product divided by its factor; they are not direct recall evidence. Add a new numerical-dividend display family and remove the old cancellation shortcut families from the sprint/main recall slice, preserving historical Attempts. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| AR_FACTORS_MULTIPLES | Retain optional support; add common-candidate reasoning and review policy. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| OPS_ORDER_BASIC | Retain current ID; Reuse OPS_ORDER_BASIC and its first-operation families. Current parentheses/equal-precedence evidence is conceptual only; add final-value families. Replacing old magnitude Bands with structural profiles needs explicit definition/policy version review. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| INT_NUMBER_LINE | Retain current ID; Retain current four families; add direct visual location, rightward motion and explicit sign/zero classification. Current leftward verbal prompts are useful but not full axis coverage. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| INT_COMPARE | Retain current ID; Existing coverage is sufficient for A3.2–3; preserve reviewed families and RTL operand order. No need to invent a new signed-order Skill. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| INT_NEGATION | Retain current ID; Keep opposite families and zero item. Add minus-role contrast; remove unattainable reasoning/C requirements rather than manufacture harder negation. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| INT_ADD | Retain current ID; Reuse current calculation and conceptual families unchanged in meaning. Mode eligibility needs an explicitly reviewed short subset; do not bulk-tag all definitions. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| INT_SUB | Retain current ID; Reuse current calculation and conceptual families unchanged in meaning. Mode eligibility needs an explicitly reviewed short subset; do not bulk-tag all definitions. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| INT_MUL | Retain current ID; Reuse current calculation and conceptual families unchanged in meaning. Mode eligibility needs an explicitly reviewed short subset; do not bulk-tag all definitions. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| INT_DIV | Retain current ID; Reuse all sign structures. Current calculation displays also expose the constructed dividend as a product; make a later material display-family revision for direct division placement, keeping internal exactness and historical IDs intact. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| FRAC_MEANING | Retain current ID; Keep ID; current selected-parts/set/line families provide partial coverage. Retain numerator/denominator prompts sparingly. Add quotient meaning and beyond-one representations. Remove AR_PLACE_VALUE as a default dependency of the Entry profile; it is not the target. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| FRAC_EQUIV | Retain current ID; Reuse FRAC_EQUIV. Existing C forward asks why but is authored reasoning; add a genuinely conceptual invariant-check family rather than relabel it merely to satisfy a quota. Scope additions keep the value-preservation identity; no new expansion/simplification ID. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| ALG_EQUALITY | Retain current ID; Keep ID and existing relation families. Add explicit equation/solution interpretation with family metadata. Earlier equality evidence supports the target but does not certify new verification coverage. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| ALG_VARIABLE | Retain current ID; Reuse ALG_VARIABLE; do not move hidden coefficients to ALG_LIKE_TERMS, which would confuse reading a term with operating on it. Expanded scope needs coverage-aware policy review; old Attempts are retained, not relabelled. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| ALG_SUBSTITUTE | Retain current ID; Keep ID and current partial-replacement families. Add zero/negative and actual numerical-evaluation families; the present calculation-labelled A is a choice of a replaced expression, not an evaluated value. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| EQ_ADD | Retain current ID; Reuse ID. Current A/B only supplies additive missing-value structures; C is symbolic addition isolation. New subtraction orientations need new families, not another Skill. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |
| EQ_MUL | Retain current ID; Reuse ID. Current ax=b and symbolic isolation do not cover x/a=b or explicit negative coefficients. | Never relabel old Attempts. Unchanged definitions keep reviews; material new prompt/structure/category/range gets proper definition version/new ID and review. Policy changes need an explicit version and cannot imply new evidence was observed. |

The 21 new proposed IDs are: `FRAC_COMPARE`, `FRAC_ADD_SUB`, `FRAC_MULTIPLY`, `FRAC_DIVIDE`, `OPS_POWERS`, `OPS_SQUARE_ROOTS`, `ALG_EXPRESSIONS`, `ALG_LIKE_TERMS`, `ALG_DISTRIBUTE`, `EQ_LINEAR_STEPS`, `COORD_READ_PLOT`, `COORD_MOVEMENT`, `GRAPH_READ`, `FUNCTION_RELATIONS`, `GEO_ANGLE_SENSE`, `GEO_DIAGRAM_LANGUAGE`, `GEO_ANGLE_RELATIONS`, `GEO_PARALLEL_ANGLES`, `GEO_TRIANGLE_PROPERTIES`, `GEO_TRIANGLE_ANGLES`, `GEO_SPECIAL_SEGMENTS`. None exists in the executable catalog today. A future split/merge that actually changes what a Skill measures needs a deliberate mapping/reassessment decision; do not silently reuse a retired legacy ID merely because its name resembles the new target.

Current categories/Bands and readiness strategies sometimes reflect earlier authoring decisions: for example, ALG_SUBSTITUTE A chooses a replaced expression yet is labelled calculation, and FRAC_EQUIV's reviewed forms mix representation/reasoning. Future implementations must classify each actual cognitive task honestly. Changing a category or Band to a proposed design requires review/version handling; the inventory records the executable fact, while the proposed cards specify the intended evidence. A semantic category review may split one old family into clearer task families instead of changing meaning under one unchanged definition.

## 14. Proposed implementation waves after design

Wave labels are dependencies, not a promise that geometry waits for every algebra extension. Coordinate and Geometry renderer groundwork can start as soon as its semantic scene contract is reviewed; the critical learner releases remain bounded and fully reviewed.

| Wave | Catalog | Renderer / infrastructure | Question-family work | Evidence-policy work | Path / profile work | Validation | Human review |
|---|---|---|---|---|---|---|---|
| Entry-A — arithmetic, fractions, signed reuse, powers/roots | Retain fact/INT/equivalence identities; add four fraction-operation/order and two power/root IDs. Keep AR_PLACE_VALUE active outside core. | Exact rational answer/display audit; reviewed fraction/signed-line visuals; supply-aware mode availability. No full geometry engine required. | Direct dividend, bounded add/subtract, four math-only sprint pools; useful fraction families; small signed-line/role additions; power/root families. | Fix fact conceptual gap, FRAC_EQUIV conceptual gap, optional factors reasoning and INT C/negation mismatches; approve draft witness policies and fluency calibration plan. | Later remove positional structure from required stages/shortcut; keep optional remediation. Compose four sprints only after content/calibration; keep atomic attribution. | Actual filter supply, policy-family reachability, 100 seeds plus boundaries, anti-repeat, rational equivalence, visible cdot/no prose in sprint. | Review reused versus changed definitions separately; teacher validates fraction sequence and reasonable fact bounds. |
| Entry-B — algebra/equations | Reuse five current ALG/EQ IDs; add expression translation, like terms, distribution and multi-step equation IDs. | Closed math-choice correctness; versioned structural profile/Attempt evidence contract before expanded mastery claims. | Hidden ±1, term/constant reading, zero/negative substitution/evaluation; operations and all specified equation orientations; fraction application only after Entry-A. | Resolve ALG_VARIABLE representation gap; honest task categories, feasible witnesses and treatment of old evidence. | Compact language→substitution→operations→equations sequence; prerequisite support remains advisory; no A11+ activation. | Substitution actually shown, exact solutions, no variable denominators, single/multi choice semantics, definition/policy versions. | Teacher checks coefficient placement, equation split, workload and signed/fraction support load. |
| Entry-C — coordinates/graphs | Add two coordinate and two graph/function-foundation IDs; new Domains/groups as reviewed. | Shared coordinate/graph SVG for generated scale; static reviewed pilot and accessible alternatives; no free plotting evaluator yet. | Read/position proxy, movement/distance, axis/point/lookup/extrema/trend/domain, table/description and uniqueness families. | Representation and conceptual/reasoning witnesses must be achievable; no blanket Timed/Survival eligibility. | Add A9/A10 only after content ready; label plotting proxy honestly and preserve future interaction boundary. | Geometry of grids/scales, tuple RTL, multiple reverse lookup answers, tied extrema, input domain, table consistency. | Review visuals at narrow widths, noncolor decoding, low literacy and whether the closed plotting proxy is sufficient for Entry release. |
| Entry-D — G1–G5 | Add seven geometry IDs; no theorem-per-Skill expansion. | Semantic Geometry SVG, stable object/mark IDs and reason vocabulary; static scene pilots; no clicks or construction tool. | Angle meaning/names/marks; local and parallel relations; triangle properties/sum; altitude/bisector. | Witnesses plus family/scene diversity; optional exterior/external-altitude families cannot gate required policy. | Language-first Chapters; no congruence/similarity notation, median or Pythagoras stages. | Incidence, angle sums, mark consistency, right angle, reflex sweep, rotated/deceptive layouts, accessible alternatives, reason validity. | Teacher reviews every core relation/scene template and confirms Grade 7 prerequisite level; no automatic approval. |
| Entry-E — placement and cumulative profiles | No new Skills merely for gateways, review or sprint presentation. | Adaptive gateway state/resume and evidence persistence; profile identity/version and cross-device evidence fidelity decision. | Reuse the P allowlists and their confirmation variants; fill any diagnostic contrast absent from core families. | Validate family/profile coverage and distinguish observation counts, correctness, mastery and bypass. No artificial Attempts. | Integrate gateways, fatigue breaks and explicit required sprint evidence; design bounded cumulative retrieval using only introduced Skills. | One-error confirmation, repeated same-target failure, resume/cap, empty-supply rejection, bypass without stars/mastery fabrication. | Pilot placement load, bypass evidence, sprint timing, accommodations and optional versus required review decisions. |

Required staged release artifacts in each later wave: reviewed taxonomy delta, family inventory with stable IDs/versions, policy/mode reachability report, rendered review samples, target/support/literacy audit and explicit path changes. A wave cannot claim completion because catalog entries exist without the required content. No deployment is part of Pass 1.

## 15. Decisions requiring teacher approval

These are reviewable proposals; this design pass does not pause for approval or assume it has been given.

1. Approve the **47-target taxonomy (26 reused/21 new)**, including optional AR_FACTORS_MULTIPLES and removal of AR_PLACE_VALUE from the required Entry path/initial gateway.
2. Approve keeping hidden coefficients/term reading inside ALG_VARIABLE; one FRAC_EQUIV with expansion/reduction/common-denominator/sign families; combined FRAC_ADD_SUB; and one EQ_LINEAR_STEPS with diagnostic structural families.
3. Approve the concrete arithmetic bounds (addition total ≤20, subtraction minuend ≤20, anchor facts with partners through 10); decide acceptable optional fact extensions and zero/identity exposure.
4. Pilot the four required sprints: accuracy/speed thresholds, duration, retry/support rules and accommodations remain open. The present five-second fact policy is not automatically the final sprint standard.
5. Review the provisional 10–12 Attempt category/Band witnesses and the separate family coverage needed to prevent old evidence from overstating expanded targets; decide how policy versions affect visible completion.
6. Approve the gateway probes/confirmation strategy and bypass evidence. Set fatigue/resume limits after observing weak learners; do not finalize one global test length from this document.
7. Confirm that closed candidate-position selection is a sufficient initial plotting proxy and approve accessible visual alternatives; genuine unconstrained plotting remains a separate interaction project.
8. Confirm the scope of simple rational equation applications and reverse distribution. They must not pull in variable denominators or Grade 8 product-of-sums techniques.
9. Keep G4.9 exterior angle and G5.3 external altitude optional lower-priority families; decide their release timing without making them entry gates.
10. Review Hebrew labels/reason wording and inclusive triangle classifications. Distinguish a right-angle mark, equal-angle arcs and decorative highlighting; no curriculum should depend on “looks like”.

## 16. Risks, unresolved questions and Pass 1 boundaries

- **Current readiness false assurance:** the bank passes its existing manifest but ten policies and nineteen Skill/mode combinations are empty/unreachable. Content size alone will not repair the joins.
- **Evidence identity:** family/definition/profile versions are not fully preserved in Attempts/backend. Expanded reuse and planned diagnostics require an explicit durable evidence contract before they can support reliable mastery/bypass claims across time/devices.
- **Fluency versus current mode metadata:** none of the current arithmetic calculation prompts is strict prose-free sprint output, and all current division recall candidates expose a product. Removing that shortcut changes the assessed demand and needs content review, not a typography exemption.
- **Visual validity/accessibility:** a static image can support a reviewed pilot but cannot guarantee generator scene correctness. Asset alternatives, label collision checks and noncolor decoding need implementation and teacher testing.
- **Government revision differences:** local modular drafts and the 2025–26 schedule disagree on some placement of topics, including broader geometry/Pythagoras material. This plan follows the user-authorized roadmap's Entry selection and cites local sources for the narrower prerequisite claims only.
- **Scope expansion without diagnostic inflation:** keeping families under an existing Skill is intentional, but current category/Band counts cannot distinguish every family. Do not solve missing teacher diagnostics by multiplying Skill IDs indiscriminately or claiming a not-yet-built dashboard exists.
- **Pedagogical validation pending:** proposed thresholds and family scopes are implementable designs, not classroom efficacy findings. Field calibration may adjust profile bounds/sequence without rewriting historical Attempts.

Pass 1 changes documentation only. It adds no executable Skills, QuestionDefinitions, generators, learning-path entries, renderers, reason evaluator, placement engine or Mastery/session behavior. The [documentation index](README.md) links this blueprint. Duplicate root historical stubs are removed; references point to archived full documents. FUTURE_IDEAS is historical under archive. The old duplicate roadmap and topics.csv were already absent from the workspace when inspected; no active source/script/package consumer of topics.csv was found. Government source files are unchanged and remain local reference assets.
