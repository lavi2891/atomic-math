# Foundational content audit — 2026-09-04

This follow-up audited all 184 active definitions (183 generated, one curated) against the additional human-review rules. Executable expressions and answer computation remain unchanged; display normalization is applied only when authored templates are rendered for students or reviewers.

## Atomic Skill identity across Bands

All multiplication and division fact-family generators were checked across every active Band and content family. No active definition drifted outside its atomic family: `AR_MUL_F_2_5_10` and `AR_DIV_F_2_5_10`, for example, keep parameter `a` restricted to 2, 5, or 10 in both A and B. Difficulty changes through the other factor and the question structure/context, not by replacing the target fact family.

The family sets now live in `ATOMIC_FACT_SKILL_VALUES` and are consumed by both authoring and validation. `validate-content` blocks a generator that adds an out-of-family value, omits a required family value, or loses the target multiplication/division operation. Every generated definition must declare `metadata.difficultyFeature`; magnitude-driven families retain the existing monotonic range audit. This records what actually creates the Band difference while keeping the Skill target stable.

## Student-facing sign notation

The shared display renderer now parenthesizes a negative operand after addition, subtraction, multiplication, or division. Raw executable forms such as `5+-3`, `7--2`, `4*-5`, and `8/-2` therefore display with the negative operand in parentheses. Positive expressions are unchanged. Validation samples every active generator and blocks consecutive-sign notation in prompts or answer options.

## Generated-instance metadata and `MVP_INT_ADD_B_A`

The reported `-13 + 4` instance is valid Band B output, not a wrong Band or transformed parameter: Band B declares `a` in `[-24, 24]` and `b` in `[4, 12]`; the sampled values are exactly `a=-13`, `b=4`, and the executable template is `{a}+{b}`. The confusion came from the review panel emphasizing declared ranges and the instantiated expression without placing the actual sampled values between them.

Question Review now shows sampled parameter values, identifies whether the instance belongs to the displayed definition, and explicitly describes authored negation transformations such as `-{a}`. Validation independently reconstructs every sampled expression from `exprTemplate` plus `sampledParams` and checks definition identity and declared parameter ranges.

## Choice-answer integrity

A global numeric-equivalence audit now rejects a generated choice distractor that evaluates to the same value as a marked-correct option. It found one real family issue: in `MVP_ALG_SUBSTITUTE_LINEAR_A/B/C`, the “replace multiplication with addition” distractor could equal the correct substituted expression for a few parameter combinations. A generator constraint now excludes those collisions. These three definitions require re-review; none was marked approved in the supplied review export.

## Taxonomy findings and proposal

No taxonomy IDs were changed in this pass.

- The current multiplication fact Skills are single-fact-family fluency Skills. Future single-digit × two-digit and two-digit × two-digit algorithms should not be added as harder Bands of those Skills; they should become separate atomic algorithm Skills. Distributive, partial-product, and standard-algorithm structures may remain content families where they measure the same target.
- Factors 9, 10, and 11 may use distinct strategies, but strategy alone does not yet justify splitting a fact Skill. Preserve strategy/structure as evidence metadata first; split only if teacher diagnosis or prerequisites must distinguish mastery of those strategies.
- `AR_FACTORS_MULTIPLES` currently combines factors and multiples at the taxonomy level, while the active generated conceptual family primarily assesses identification of multiples. A future migration should separate `AR_MULTIPLES_IDENTIFY` and `AR_FACTORS_IDENTIFY`, or add balanced factor-identification evidence before declaring the combined Skill ready. This requires an explicit taxonomy/migration decision and was intentionally not performed here.

## Approved-content impact

The approved definitions in the supplied export—`MVP_INT_ADD_B_A`, `MVP_INT_ADD_C_A`, and `MVP_OPS_ORDER_BASIC_A_A`—retain their executable templates, parameter rules, deterministic seed-42 expressions, and answers. Their Question Review presentation gains sampled-value/identity explanation. No approved definition requires re-review from this pass. The only content-generation change is the collision-prevention constraint on the unapproved `MVP_ALG_SUBSTITUTE_LINEAR_A/B/C` family.

## Fixed-number inventory

The preceding global conversion pass started with 142 curated definitions containing numeric literals and converted all 142 routine fixed definitions into 36 structural generators. The current bank retains zero curated definitions containing numeric literals, so there are no retained fixed-number IDs or questionable fixed-number cases to list. The sole curated definition, `MVP_ALG_VARIABLE_MEANING_CURATED`, contains no numeric literal and remains fixed because its wording is the pedagogical object.
