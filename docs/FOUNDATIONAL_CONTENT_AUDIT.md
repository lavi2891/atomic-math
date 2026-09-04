# Foundational content audit — Phase 7B.2 — 2026-09-04

המעבר בדק את כל הבנק הפעיל מול `Content Authoring Standard v1`, בלי לשנות Mastery, persistence של תלמידים, sync או backend. מצב הבנק לפני המעבר היה 197 definitions: 195 generated ו־2 curated. אחריו יש 169 definitions: 167 generated ו־2 curated.

## 1. מיקוד פדגוגי ו־Skill drift

נמצאו 18 generators מסוג calculation שהפיקו עדות לא נקייה:

- שישה definitions של `ALG_SUBSTITUTE` הציגו חישוב מספרי בלי משימת הצבה מפורשת.
- שישה definitions של `EQ_ADD` הציגו חיבור/חיסור בלי משוואה ונעלם.
- שישה definitions של `EQ_MUL` הציגו כפל/חילוק בלי משוואה ונעלם.

המשפחות האלה הוסרו מהבנק הפעיל. משפחות `MVP_ALG_SUBSTITUTE_A/B/C`, `MVP_EQ_ADD_A/B/C` ו־`MVP_EQ_MUL_A/B/C` נשארו והוגדרו כרצף מבני: numerical substitution/equation → symbol אחד → פתרון סימבולי. ב־`EQ_ADD` תוקנה גם שגיאת תשובה ב־Band A: במשוואה `□ + b = a + b` התשובה הנכונה היא `a`, לא `b`.

`AR_FACTORS_MULTIPLES` אינו מציג עוד “חשבו” כללי במשפחות calculation. הניסוח מבקש למצוא כפולה מסוימת או את הכפולה הבאה, והטווחים A/B/C אינם חופפים באופן שמאפשר ל־Band קשה להפיק באופן שגרתי instance קל יותר.

## 2. Difficulty ו־Bands

- `ALG_SUBSTITUTE`, `EQ_ADD` ו־`EQ_MUL`: הוסרו 18 Bands/definitions שהקשו בעיקר דרך magnitude ולא דרך יעד ה־Skill; שלוש רמות מבניות נשמרו בכל Skill.
- `OPS_ORDER_BASIC_FIRST_A/B/C`: עוצב מחדש מרצף מספרים גדלים לרצף של שתי פעולות, שלוש פעולות וסוגריים.
- `AR_ADD_FACTS_COMMUTE_A/B`: A מבקש לזהות ביטוי חילופי; B מבקש להשלים שוויון חילופי.
- `AR_PLACE_VALUE_GEN_A/B/C`: הוגדר במפורש כ־structure של מספר בן 2/3/4 ספרות.
- `FRAC_MEANING_PARTS_A/B/C`: גבולות המכנה הופרדו ל־`3–6`, `6–10`, `10–16`, כך שהמעבר מבוסס magnitude הוא דטרמיניסטי.
- `INT_COMPARE`: שלוש רמות magnitude זהות הוחלפו ב־שלילי מול אפס, שליליים סמוכים ושני גדלים שליליים בלתי תלויים.
- `INT_NEGATION`: שש הגדרות magnitude צומצמו לשתי רמות אמיתיות—נגדי של חיובי ונגדי של שלילי. `CONTENT_READINESS` דורש עבור Skill זה רק A/B.
- שאלות חוקי הסימנים של `INT_ADD`, `INT_SUB`, `INT_MUL` ו־`INT_DIV` צומצמו מעותקי magnitude למבני סימנים שונים. מספר ההגדרות המושפעות ירד מ־21 ל־11. משפחות calculation של אותן פעולות נשארו A/B/C, מפני שבהן magnitude מגדיל fluency וחישוב בפועל.

## 3. מספרים מכוונים ו־Skill invariants

כל משפחות calculation של `INT_ADD`, `INT_SUB`, `INT_MUL` ו־`INT_DIV` עדיין משתמשות בגדלים טבעיים וב־`signPattern` מפורש. משפחות conceptual מבניות רשאיות לשנות `exprTemplate` ו־`signPattern` בין Bands, אך חייבות להצהיר על `structuralStage` ייחודי. validator ממשיך לחסום instance חיובי בלבד ב־Skill מכוון, תוצאה אפס ללא משפחת zero/opposites מפורשת ואובדן של פעולת היעד.

## 4. Math rendering ו־RTL

כל הנתונים המתמטיים שנותרו בתוך prose הועברו ל־inline math ב־32 definitions:

- `MVP_AR_SUB_FACTS_REMOVE_A/B`;
- שמונה definitions של context בכפל;
- 16 definitions של sharing/grouping בחילוק;
- `MVP_INT_NUMBER_LINE_LEFT_A/B/C`;
- `MVP_FRAC_MEANING_PARTS_A/B/C`.

`studentMathContentWarnings` מזהה כעת ספרה בתוך text segment ומעלה אזהרה לבדיקת author. סימון מתמטי גולמי, מספר שלילי גולמי, רצף operators ושבר פגום נשארים שגיאות blocking. options מסוג single/multi choice ממשיכים לעבור דרך `authoredChoiceContent` ו־`ContentRenderer`, ולכן מספר שלילי, שבר, ביטוי אלגברי ושילוב עברית+math מקבלים בידוד LTR בתוך ה־RTL.

## 5. Curated ומספרים קבועים

ההיסטוריה הגלובלית לפני המרת הבנק כללה 142 definitions curated עם מספרים קבועים; כולם הומרו בעבר ל־generators מבניים. במצב הנוכחי יש שני curated בלבד:

| `definitionId` | `curationReason` | הצדקה קצרה |
|---|---|---|
| `MVP_ALG_VARIABLE_CONTEXT_BASIC_CURATED` | `deliberate-example` | הניסוח ההקשרי עצמו מבחין בין אות לבין הכמות שהיא מייצגת; אין מספר קבוע. |
| `MVP_ALG_VARIABLE_CONTEXT_REASONING_CURATED` | `deliberate-example` | הערכים 18 ו־25 יוצרים שתי קבוצות קונקרטיות שונות כדי להמחיש שערך המשתנה תלוי בהקשר. |

רק הפריט השני מכיל literals מספריים. אין curated numeric question ואין פריט קבוע ללא `curationReason` ו־`curationJustificationHe`.

## 6. Distractors, תשובות וניסוח

- `EQ_ADD_A` קיבל תשובה נכונה מתמטית ומסיח “המחובר הגלוי” מותאם.
- `EQ_MUL_A/B/C` מציג משוואות אמיתיות ומסיחים של שימוש במכפלה כתשובה, שימוש בגורם הגלוי, כפל במקום חילוק, חיבור גורמים והשמטת גורם.
- `OPS_ORDER_BASIC` מבדיל בין עבודה משמאל לימין, התעלמות מסוגריים והנחה שכל הפעולות מבוצעות יחד.
- contexts של כפל וחילוק נשארו קצרים וקונקרטיים ושומרים על ההבחנה בין repeated groups, equal sharing ו־grouping.
- validator בודק option כפול, מסיח ששווה מתמטית לתשובה הנכונה, תשובה נכונה חסרה ו־misconception metadata חסר.

## 7. Review ו־re-review

`QuestionReviewRecord` שומר כעת `definitionVersion`. עבור definition עם tag בשם `requires-rereview`, רשומה ישנה או רשומה שגרסתה אינה תואמת מוצגת כ־unreviewed ונכללת במסנן re-review. הערה ישנה נשמרת לעיון, אך אינה מעניקה אישור לגרסה החדשה.

בבנק הפעיל 123 definitions מסומנים `requires-rereview`, בקבוצות הבאות:

- כל 36 משפחות calculation של מספרים מכוונים (`MVP_INT_ADD_*`, `MVP_INT_SUB_*`, `MVP_INT_MUL_*`, `MVP_INT_DIV_*`);
- כל 53 ה־reviewed concept generators של ערך המקום, עובדות בסיס, contexts, גורמים/כפולות, ציר, שברים וסדר פעולות;
- 11 ה־signed concept generators המבניים;
- 15 ה־algebra/equation generators המבניים;
- ששת calculation generators של `AR_FACTORS_MULTIPLES`;
- שני פריטי `ALG_VARIABLE` curated.

לפי export שסופק, ההגדרות שאושרו היו `MVP_INT_ADD_B_A`, `MVP_INT_ADD_C_A` ו־`MVP_OPS_ORDER_BASIC_A_A`. שתי הראשונות כבר הוצאו מהבנק הפעיל במעבר signed-number הקודם. `MVP_OPS_ORDER_BASIC_A_A` נשאר ללא שינוי גם במעבר הנוכחי, כולל snapshot של seed 42 (`4+2*2` → `8`). לכן אין definition מאושר פעיל שתוכנו השתנה במעבר 7B.2; מנגנון הגרסה מונע הישנות של אישור שקט בעתיד.

## 8. Validation שנוסף

- magnitude Bands דורשים כעת `hard.min >= easy.max` בפרמטר קושי משותף, במקום לקבל טווחים חופפים רק משום ששני הקצוות עלו.
- כל family מרובת Bands עם `difficultyFeature: "structure"` דורשת `structuralStage` ייחודי.
- `pedagogicalTargetingIssues` דורש משוואה גלויה ב־`EQ_*`, הצבה מפורשת ב־`ALG_SUBSTITUTE`, שפת גורמים/כפולות ב־`AR_FACTORS_MULTIPLES`, שני ערכים גלויים ב־`INT_COMPARE` ושפת מספר נגדי ב־`INT_NEGATION`.
- prose number מקבל warning; שאר הפרות math/RTL הן blocking.
- בדיקות review מוכיחות שאישור בגרסה קודמת חוזר ל־unreviewed ושאישור מחדש עם הגרסה הנוכחית נשמר גם לאחר יצירת repository מחדש.

## 9. שאלות פדגוגיות פתוחות להכרעת מורה

1. `AR_FACTORS_MULTIPLES` הוא עדיין Skill משולב, בעוד שהבנק הפעיל עשיר יותר בכפולות מאשר בגורמים. נדרשת החלטה אם לפצל taxonomy או להוסיף משפחת factor-identification מאוזנת.
2. ב־`FRAC_EQUIV` וב־`INT_NUMBER_LINE` magnitude נשאר ממד קושי. הוא דטרמיניסטי, אך כדאי לאשר בבדיקת מורה אם הוא משקף קושי משמעותי מספיק או שיש לעבור לרצף מבני.
3. `ALG_VARIABLE_A/B` בודק תחילה משמעות משתנה ואז זיהוי מקדם. יש לאשר אם זהו רצף Difficulty מתאים או שתי קטגוריות evidence נפרדות.
4. יש לאשר שהערכים הקבועים 18 ו־25 בפריט `MVP_ALG_VARIABLE_CONTEXT_REASONING_CURATED` אכן רצויים כ־deliberate example ולא עדיף ניסוח ללא literals.
