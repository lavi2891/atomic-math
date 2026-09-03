# Signed-number content audit — 2026-09-04

## Scope and result

The complete active `INT_*` bank was audited before further content review or expansion. The main defect was confined to the calculation generators for `INT_ADD`, `INT_SUB`, `INT_MUL`, and `INT_DIV`. Their former `a: integer` ranges made the sign accidental, so an Attempt could be recorded under a signed-operation Skill for ordinary positive arithmetic. The alternate templates also applied `-{a}` to an already signed sample, creating unintended double-negation structures such as `-(-9)`.

`INT_NUMBER_LINE`, `INT_COMPARE`, and `INT_NEGATION` already used positive magnitudes with structurally authored signs and did not produce unsigned substitutes for their learning targets. Their generated metadata now carries the same explicit `skillInvariant` and `signPattern` contract as the operation generators.

## Problematic retired families

The following 24 calculation definitions (two families × three Bands × four Skills) were retired:

- `INT_ADD:signed-sum`
- `INT_ADD:negated-first-addend`
- `INT_SUB:signed-difference`
- `INT_SUB:negative-minuend-difference`
- `INT_MUL:signed-product`
- `INT_MUL:negated-first-factor`
- `INT_DIV:exact-signed-quotient`
- `INT_DIV:negated-dividend-quotient`

This includes the specifically reported `MVP_INT_MUL_A_A`, `MVP_INT_MUL_A_B`, `MVP_INT_ADD_A_A`, and `MVP_INT_ADD_B_A`. These were generator-design problems. The Review Tool previously displayed the correct raw definition/range for `MVP_INT_ADD_B_A`, but the presentation did not make sampled values and transformations sufficiently clear; that separate metadata presentation problem is also fixed.

## Explicit replacement families

All calculation families now sample positive natural magnitudes `m` and `n` and author the signs in `exprTemplate`.

### `INT_ADD`

- `negative-plus-positive-positive-result`
- `negative-plus-positive-negative-result`
- `negative-plus-negative`
- `opposites-result-zero` (conceptual family; zero is deliberate and explicit)

### `INT_SUB`

- `positive-minus-negative`
- `negative-minus-positive`
- `negative-minus-negative`

### `INT_MUL`

- `negative-times-positive`
- `positive-times-negative`
- `negative-times-negative`

### `INT_DIV`

- `negative-divided-by-positive`
- `positive-divided-by-negative`
- `negative-divided-by-negative`

Each calculation family has A/B/C variants with the same template, `signPattern`, and `skillInvariant`. Only magnitude ranges change: A uses 1–10, B uses 11–30, and C uses 31–100. The exact-division templates construct the dividend from the sampled magnitudes, so answers remain integral without weakening the signed-operation target.

## Enforced invariants

`validate-content` now blocks active `INT_*` generators when:

- `skillInvariant` or `signPattern` is missing or incorrect;
- a family changes its executable template, sign pattern, or Skill invariant between Bands;
- a generated `INT_ADD`, `INT_SUB`, `INT_MUL`, or `INT_DIV` instance lacks a structurally negative operand;
- an instance does not use the operation named by its Skill;
- a numeric zero result appears outside an explicitly authored zero/opposites family;
- student-facing output exposes consecutive operators/signs.

The existing generated-instance checks still confirm definition identity, sampled parameter ranges, template reconstruction, deterministic reproduction, answer correctness, and Band difficulty.

## Review Tool

Reviewer Details now presents the `contentFamily`, a localized sign-pattern description, the fixed Skill invariant, sampled magnitude values, executable template, current instance, constraints, and Band differences above the raw technical metadata.

## Approved-content impact

The latest supplied review export marked `MVP_INT_ADD_B_A` and `MVP_INT_ADD_C_A` approved. Both belonged to the invalid accidental-sign family and are no longer active. Their replacement sign-pattern families must be reviewed afresh. `MVP_OPS_ORDER_BASIC_A_A` remains unchanged and does not require re-review.

The retired IDs remain valid historical identifiers on existing Attempts; no historical Attempt or Mastery data was rewritten. New Attempts can only be generated from the explicit signed families.
