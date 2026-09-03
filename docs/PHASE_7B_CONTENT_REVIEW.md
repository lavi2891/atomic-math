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

## Deferred content

Multi-digit written algorithms, estimation, decimal content, fraction operations beyond equivalence, advanced order of operations, multi-step algebra/equations, coordinates, and the ratio/proportion/percent roadmap remain outside Phase 7B.
