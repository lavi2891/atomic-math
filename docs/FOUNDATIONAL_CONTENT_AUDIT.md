# ביקורת תוכן יסודי — Human Review — 2026-09-04

המעבר השתמש ב־`atomic-math-question-review-2026-09-04 (2).json` כמקור המשוב האנושי המחייב ובדק בעקבותיו גם את כל הבנק הפעיל. לא שונו Mastery, נתוני תלמידים, sync או backend.

> עדכון מאוחר ב־2026-09-04: הסעיפים ההיסטוריים בהמשך מתעדים את מצב הבנק של 168 definitions לפני ה־pass הפדגוגי הגלובלי האחרון. המצב המחייב כעת מתועד בסעיף 0.

## 0. Pedagogical consistency pass — מצב מחייב

- הבנק הפעיל כולל כעת 179 definitions:‏ 176 generated ו־3 curated, בתוך אותם 27 Skills וללא Domain חדש.
- ב־final refinement pass נוספו `MVP_AR_PLACE_VALUE_STANDARD_TO_EXPANDED_C` ו־`MVP_ALG_EQUALITY_EQUALS_RELATION_A`;‏ `MVP_FRAC_EQUIV_FORWARD_C`,‏ `MVP_FRAC_EQUIV_REVERSE_C` ו־`MVP_INT_ADD_OPPOSITES_B` שונו מהותית והועלו ל־version 6. חמש ההגדרות האלה דורשות review/re-review; אישורים של הגדרות שלא שונו נשמרו.
- `MVP_FRAC_MEANING_NUMBER_LINE_B` נבדק בפועל דרך `QuestionView`/`ContentRenderer` וב־batch של seeds 1–10, ברוחב desktop של 1440px וברוחב mobile של 390px. המרווחים בין הסימונים, יישור `0` ו־`1`, הסמן המשולש וכיוון ה־RTL נשארו ברורים ללא wrapping או overflow בעייתי; לכן ה־definition וה־rendering לא שונו ולא סומנו מחדש ל־re-review.
- הוסרו 6 definitions סמליים שבהם הידע התומך שלט במשימה: `MVP_AR_ADD_FACTS_COMMUTE_C`, `MVP_INT_DIV_NEG_POS_B`, `MVP_INT_DIV_POS_NEG_B`, `MVP_INT_DIV_NEG_NEG_B`, `MVP_FRAC_MEANING_PARTS_D`, `MVP_INT_SUB_NEGATIVE_REWRITE_B`.
- נוספו 15 definitions: `MVP_INT_NUMBER_LINE_DIRECTION_A`;‏ `MVP_FRAC_MEANING_NUMERATOR_A`, `MVP_FRAC_MEANING_DENOMINATOR_A`, `MVP_FRAC_MEANING_SET_B`, `MVP_FRAC_MEANING_NUMBER_LINE_B`;‏ `MVP_OPS_ORDER_BASIC_LEFT_TO_RIGHT_ADDSUB_A`, `MVP_OPS_ORDER_BASIC_LEFT_TO_RIGHT_DIVMUL_B`;‏ `MVP_INT_SUB_POS_MINUS_LARGER_POS_A/B/C`;‏ `MVP_INT_COMPARE_NEGATIVE_POSITIVE_A`;‏ `MVP_INT_NEGATION_ZERO_CURATED`;‏ `MVP_ALG_SUBSTITUTE_MEANING_A`, `MVP_EQ_ADD_INVERSE_CONCEPT_A`, `MVP_EQ_MUL_INVERSE_CONCEPT_A`.
- שונו מהותית: `MVP_AR_PLACE_VALUE_GEN_A/B/C`; כל `MVP_AR_MUL_F_*_CONTEXT_A/B`;‏ `MVP_AR_FACTORS_MULTIPLES_MULTI_A/B/C`;‏ `MVP_AR_FACTORS_MULTIPLES_FACTORS_A/B/C`;‏ `MVP_INT_NUMBER_LINE_LEFT_A/B/C`;‏ `MVP_FRAC_MEANING_PARTS_A/B/C`;‏ `MVP_FRAC_EQUIV_FORWARD_A/B/C`;‏ `MVP_FRAC_EQUIV_REVERSE_A/B/C`;‏ `MVP_OPS_ORDER_BASIC_FIRST_B/C`;‏ `MVP_INT_NEGATION_NEGATIVE_B`;‏ `MVP_INT_ADD_OPPOSITES_B`;‏ `MVP_INT_MUL_SIGN_A/B`;‏ `MVP_INT_DIV_SIGN_A/B`;‏ `MVP_ALG_EQUALITY_A/B/C`;‏ `MVP_ALG_VARIABLE_B`;‏ `MVP_ALG_SUBSTITUTE_B/C`;‏ `MVP_EQ_ADD_B`;‏ `MVP_EQ_MUL_B`; ושני `MVP_ALG_VARIABLE_CONTEXT_*_CURATED`.
- כל 94 ה־generated choice definitions הועלו לפחות ל־version 5 ונושאים `requires-rereview`, משום שכל rationale גנרי הוחלף במטא־דאטה אבחוני ספציפי. ההיקף המדויק הוא:
  - `MVP_AR_PLACE_VALUE_GEN_{A,B,C}`;‏ `MVP_AR_PLACE_VALUE_STANDARD_TO_EXPANDED_C`;‏ `MVP_AR_ADD_FACTS_{MISSING_A,COMMUTE_A,MISSING_B,COMMUTE_B}`;‏ `MVP_AR_SUB_FACTS_REMOVE_{A,B}`.
  - `MVP_AR_MUL_F_{2_5_10,3_4,6_7,8_9}_CONTEXT_{A,B}`;‏ `MVP_AR_DIV_F_{2_5_10,3_4,6_7,8_9}_{SHARING,GROUPING}_{A,B}`.
  - `MVP_AR_FACTORS_MULTIPLES_MULTI_{A,B,C}`;‏ `MVP_AR_FACTORS_MULTIPLES_FACTORS_{A,B,C}`.
  - `MVP_INT_NUMBER_LINE_LEFT_{A,B,C}`;‏ `MVP_INT_NUMBER_LINE_DIRECTION_A`;‏ `MVP_INT_COMPARE_SIGNED_{A,B,C}`;‏ `MVP_INT_COMPARE_NEGATIVE_POSITIVE_A`;‏ `MVP_INT_NEGATION_POSITIVE_A`;‏ `MVP_INT_NEGATION_NEGATIVE_B`;‏ `MVP_INT_ADD_OPPOSITES_{A,B}`;‏ `MVP_INT_SUB_NEGATIVE_REWRITE_A`;‏ `MVP_INT_MUL_SIGN_{A,B}`;‏ `MVP_INT_DIV_SIGN_{A,B}`.
  - `MVP_FRAC_MEANING_PARTS_{A,B,C}`;‏ `MVP_FRAC_MEANING_NUMERATOR_A`;‏ `MVP_FRAC_MEANING_DENOMINATOR_A`;‏ `MVP_FRAC_MEANING_SET_B`;‏ `MVP_FRAC_MEANING_NUMBER_LINE_B`;‏ `MVP_FRAC_EQUIV_{FORWARD,REVERSE}_{A,B,C}`.
  - `MVP_OPS_ORDER_BASIC_FIRST_{A,B,C}`;‏ `MVP_OPS_ORDER_BASIC_LEFT_TO_RIGHT_ADDSUB_A`;‏ `MVP_OPS_ORDER_BASIC_LEFT_TO_RIGHT_DIVMUL_B`.
  - `MVP_ALG_EQUALITY_{A,B,C}`;‏ `MVP_ALG_EQUALITY_EQUALS_RELATION_A`;‏ `MVP_ALG_VARIABLE_{A,B,C}`;‏ `MVP_ALG_SUBSTITUTE_{A,B,C}`;‏ `MVP_EQ_ADD_{A,B,C}`;‏ `MVP_EQ_MUL_{A,B,C}`;‏ `MVP_ALG_SUBSTITUTE_MEANING_A`;‏ `MVP_EQ_ADD_INVERSE_CONCEPT_A`;‏ `MVP_EQ_MUL_INVERSE_CONCEPT_A`.
- שלושת פריטי ה־curated הפעילים מסומנים ל־re-review:‏ `MVP_INT_NEGATION_ZERO_CURATED` (`edge-case`),‏ `MVP_ALG_VARIABLE_CONTEXT_BASIC_CURATED` ו־`MVP_ALG_VARIABLE_CONTEXT_REASONING_CURATED` (`deliberate-example`). אין curated קבוע ללא הצדקה.
- נוספו כללי blocking:‏ `representationKind` ל־`representation`, קטגוריה יציבה במשפחות magnitude, איסור rationale מסוג `Plausible misconception requiring author review`, ובדיקה שמסיחי factors/multiples אכן שגויים.
- לא נותר מקרה חוסם ידוע. `AR_FACTORS_MULTIPLES` נשאר Skill משולב ל־MVP, כאשר factors ו־multiples מופרדים ב־`contentFamily`; פיצול עתידי לשני Skills נשאר החלטת teacher/taxonomy. מספרים עשרוניים, פעולות בשברים ותחומי curriculum נוספים נשארו לגל הבא בלבד.

## 1. סיווג ה־export

ב־export נמצאו 380 רשומות. בתחילת המעבר 156 התאימו ל־definition פעיל ו־224 היו legacy שכבר הוחלף או הוצא מהבנק.

| סיווג פעיל בתחילת המעבר | כמות |
|---|---:|
| `approved` ללא note | 119 |
| `approved` עם note בר־פעולה | 8 |
| `needs-fix` עם note | 22 |
| `needs-fix` ללא note, בתוך family שנבדקה | 5 |
| `rejected` | 2 |

224 רשומות ה־legacy לא תוקנו מכנית. הן מופו למשפחות generated פעילות ונבדק שהמשוב שלהן מיושם במבנה החדש.

## 2. מיפוי legacy אל הבנק הפעיל

| ID או family ישנים | replacement פעיל |
|---|---|
| `MVP_*_CONCEPT_1...18` של place value, facts, contexts, fractions, number line ו־order | משפחות `MVP_*_GEN_*`, `*_MISSING_*`, `*_CONTEXT_*`, `*_SHARING_*`, `*_GROUPING_*`, `FRAC_*`, `INT_NUMBER_LINE_LEFT_*`, `OPS_ORDER_BASIC_FIRST_*` |
| `MVP_ALG_EQUALITY_COMMUTATIVE_*` | `MVP_ALG_EQUALITY_A/B/C` |
| `MVP_ALG_SUBSTITUTE_A_*`, `MVP_ALG_SUBSTITUTE_LINEAR_A` | `MVP_ALG_SUBSTITUTE_A/B/C` |
| `MVP_ALG_VARIABLE_COEFFICIENT_A`, `MVP_ALG_VARIABLE_MEANING_CURATED` | `MVP_ALG_VARIABLE_A/B/C` ושני `MVP_ALG_VARIABLE_CONTEXT_*_CURATED` |
| `MVP_EQ_ADD_A_*`, `MVP_EQ_ADD_MISSING_A` | `MVP_EQ_ADD_A/B/C` |
| `MVP_EQ_MUL_A_*`, `MVP_EQ_MUL_MISSING_A` | `MVP_EQ_MUL_A/B/C` |
| signed IDs כלליים כגון `MVP_INT_ADD_A_*`, `MVP_INT_MUL_A_*` | משפחות sign-pattern מפורשות `NEG_POS`, `POS_NEG`, `NEG_NEG` והמשפחות conceptual המבניות |
| `MVP_INT_COMPARE_ADJACENT_NEGATIVES_A` | `MVP_INT_COMPARE_SIGNED_B` |
| `MVP_INT_NEGATION_NEGATIVE_A` | `MVP_INT_NEGATION_NEGATIVE_B` |

## 3. משוב `approved` עם note

- `MVP_AR_ADD_FACTS_B_A/B`: נשמרו ללא שינוי; הטווחים כבר מקיימים `hard.min >= easy.max`.
- `MVP_AR_MUL_F_2_5_10_B_A`: נשמר ללא שינוי; `a` נשאר רק `2, 5, 10` ורק `b` מתקדם.
- `MVP_AR_ADD_FACTS_COMMUTE_B`: נשמר; נוסף `MVP_AR_ADD_FACTS_COMMUTE_C` סימבולי עם `a,b`.
- `MVP_FRAC_MEANING_PARTS_C`: נשמר; נוסף Band D סימבולי.
- `MVP_INT_ADD_OPPOSITES_A`: נשמר; נוסף Band B סימבולי.
- `MVP_AR_PLACE_VALUE_GEN_A`: המשוב דרש שינוי בתוכן הקיים, ולכן A/B/C הועלו ל־v4 וכעת דוגמים במכוון אחדות, עשרות, מאות ואלפים בהתאם לאורך המספר.
- `MVP_OPS_ORDER_BASIC_FIRST_B`: נשמר ללא שינוי. C כבר משתמש בסוגריים ובהתקדמות מבנית, ולא במספרים גדולים יותר.

ארבע notes מאושרות ב־legacy של מספרים מכוונים נבדקו מול ההחלפות: התבניות הנוכחיות מפרידות sign patterns ומשתמשות בסוגריים סביב operand שלילי.

## 4. דחיות ותיקוני תוכן

- `MVP_AR_SUB_FACTS_INVERSE_A` נדחה; כל family ה־inverse החלשה הוסרה, כולל Band B שלא נסקר.
- `MVP_ALG_VARIABLE_CONTEXT_REASONING_CURATED` הוחלף ב־v4 בניסוח שמבהיר שמדובר בשתי בדיקות נפרדות, ולא ב־`n` אחד שמקבל שני ערכים בו־זמנית.
- `MVP_ALG_VARIABLE_A` משתמש כעת ב־“משתנה; האות `x` מייצגת ערך מספרי”.
- `MVP_ALG_EQUALITY_A` מבקש במפורש לסמן את משפט השוויון הנכון.
- `MVP_ALG_SUBSTITUTE_A` כולל מסיח concatenation כגון `212`, מסיח חיבור במקום כפל ומסיח השמטת מקדם, עם `misconceptionId` מתאים.

## 5. Bands והפשטה סימבולית

נוספו ארבעה Bands חדשים: `MVP_AR_ADD_FACTS_COMMUTE_C`, `MVP_FRAC_MEANING_PARTS_D`, `MVP_INT_ADD_OPPOSITES_B`, `MVP_INT_SUB_NEGATIVE_REWRITE_B`.

בנוסף:

- `MVP_INT_NUMBER_LINE_LEFT_C` הוחלף ב־Band סימבולי עם `n` גלוי.
- שלושת `MVP_INT_DIV_*_B` הוחלפו בחילוק סימבולי שבו `m` גלוי ומתבטל, במקום הגדלת מספרים.
- שלושת `MVP_INT_DIV_*_C` הוסרו כ־Bands מלאכותיים.
- ב־`INT_MUL` נשארו A/B בלבד. B משתמש בגורם mental מכוון מתוך `10, 11, 20, 30` ובגורם נוסף עד 10; שלושת Bands C של כפל דו־ספרתי שרירותי הוסרו.
- `CONTENT_READINESS` דורש כעת A/B עבור `INT_MUL` ו־`INT_DIV`.

## 6. בעיות מילוליות וגורמים/כפולות

- שמונת contexts של כפל משתמשים רק בעצמים קונקרטיים—כדורים, קלפים, ספרים ועוגיות—ושואלים במפורש איזה תרגיל מוצא את הכמות הכוללת.
- 16 contexts של חילוק נוסחו מחדש בעברית טבעית. sharing מציין כמה עצמים יקבל כל ילד; grouping שואל כמה שקיות, מדפים, צלחות או סלים דרושים.
- שישה calculation definitions של `AR_FACTORS_MULTIPLES` שואלים במפורש על כפולה ועל הכפולה הבאה.
- נוספו שלושה `multiChoice` generators של זיהוי גורמים, כך שה־Skill המשולב מספק כעת עדות גם על factors וגם על multiples.

כל הנתונים, הביטויים, המשתנים, המספרים המכוונים והאפשרויות המתמטיות עוברים דרך `authoredStudentContent`/`authoredChoiceContent` ו־`ContentRenderer`. סריקת 16,600 samples אינה מוצאת raw mathematical text, רצף סימנים או fraction פגום.

## 7. Review ו־re-review

הבנק הסופי כולל 168 definitions: 166 generated ושני curated. שבעה definitions חדשים דורשים review:

- `MVP_AR_ADD_FACTS_COMMUTE_C`
- `MVP_AR_FACTORS_MULTIPLES_FACTORS_A/B/C`
- `MVP_FRAC_MEANING_PARTS_D`
- `MVP_INT_ADD_OPPOSITES_B`
- `MVP_INT_SUB_NEGATIVE_REWRITE_B`

כל שינוי student-facing קיים הועלה ל־v4. 19 approvals פעילים הפכו במכוון ל־unreviewed: ארבעה `MVP_AR_FACTORS_MULTIPLES_B/C_*`, `MVP_INT_MUL_NEG_POS_B`, שלושת `MVP_AR_PLACE_VALUE_GEN_*`, שלושה multiplication context Bands B, חמישה division context Bands B, `MVP_INT_DIV_POS_NEG_B`, `MVP_INT_DIV_NEG_NEG_B` ו־`MVP_INT_DIV_SIGN_B`.

שלושה approved Bands ישנים של `INT_MUL_*_C` הוצאו מהבנק מפני שהם הפרו את כלל העומס האריתמטי. 105 approvals פעילים נשמרו אפקטיביים. בפרט נשמרו ללא שינוי האישורים ל־`AR_ADD_FACTS_COMMUTE_A/B`, `FRAC_MEANING_PARTS_A/B/C`, `INT_ADD_OPPOSITES_A`, `OPS_ORDER_BASIC_FIRST_A/B/C`, `ALG_EQUALITY_B/C` ושני `EQ_*` B/C.

אישורי legacy ללא `definitionVersion` נשמרים עבור v3 ומטה. definition ששונה במעבר זה הוא v4 ולכן דורש אישור בעל `definitionVersion` תואם.

## 8. שאלות פתוחות להכרעת מורה

1. האם לפצל בעתיד את `AR_FACTORS_MULTIPLES` לשני Skills אטומיים, אף שכעת יש evidence נפרד לגורמים ולכפולות.
2. האם Band D הסימבולי של `FRAC_MEANING` מתאים לגיל היעד, או שעדיף לשמור אותו מחוץ ל־Quick Practice הבסיסי.
3. האם fixed values `18` ו־`25` ב־`MVP_ALG_VARIABLE_CONTEXT_REASONING_CURATED` עדיין רצויים לאחר תיקון הניסוח, או שעדיף generator הקשרי.
4. האם מבנה `INT_DIV` הסימבולי עם ביטול `m` מתאים ל־Skill היסודי או צריך לעבור בעתיד ל־Skill אלגברי תומך.


## 2026-09-04: Decimal positional structure supersedes digit-value drills

AR_PLACE_VALUE remains the same catalog Skill, now labelled **מבנה המספר העשרוני**: understanding how digits compose a base-10 whole number. This decision supersedes the earlier place-value recommendations in this audit.

Retired from the active MVP bank: `MVP_AR_PLACE_VALUE_GEN_A` and `MVP_AR_PLACE_VALUE_GEN_B` (identify-digit-value). No replacement digit/place terminology drills or diagnostic items were added.

Reworked from version 5 to 6: `MVP_AR_PLACE_VALUE_GEN_C` and `MVP_AR_PLACE_VALUE_STANDARD_TO_EXPANDED_C`.
New definitions, each version 6: `MVP_AR_PLACE_VALUE_EXPANDED_TO_STANDARD_A`, `MVP_AR_PLACE_VALUE_EXPANDED_TO_STANDARD_B`, `MVP_AR_PLACE_VALUE_STANDARD_TO_EXPANDED_A`, `MVP_AR_PLACE_VALUE_STANDARD_TO_EXPANDED_B`.

Final active coverage: six generated representation definitions, two directions (expanded-to-standard-form and standard-to-expanded-form), each with A/B/C progression. A uses three distinct nonzero digits; B uses three digits with a repeated digit in different places; C uses four digits with a guaranteed internal zero in either hundreds or tens, with repeated digits also possible. This changes structure, not only magnitude.

Distractors model compressed zero placeholders, adjacent place shifts, exchanged tens/hundreds, omitted nonzero terms and incorrect powers of ten. Every distractor is numerically unequal to the answer, and choices have distinct values. Simply omitting a zero term is equivalent and is never graded incorrect.

All six active definitions require re-review. Version-scoped review handling invalidates previous approvals only for the two reworked definitions; unrelated definition versions and approvals are unchanged. Structural content readiness remains satisfied. AR_PLACE_VALUE now uses its own DECIMAL_STRUCTURE evidence policy requiring 10 representation attempts and A/B/C coverage, rather than requiring conceptual terminology evidence. Historical attempt records are retained; no global mastery algorithm or unrelated Skill policy changes.

Future connections: this Skill supports multiplication/division by 10, decimals, and decimal place value. Those curriculum areas are intentionally not implemented in this pass.
