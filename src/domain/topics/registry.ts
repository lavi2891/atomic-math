import type { GradeId, Topic, TopicId } from "./types";

export const TOPICS: Topic[] = [
  {
    id: "SIGNED_NUMBERS",
    title: "מספרים מכוונים",
    order: 1,
    icon: "signedNumbers",
    colorToken: "topicBlue",
  },
  {
    id: "ALGEBRA_EXPRESSIONS",
    title: "ביטויים אלגבריים",
    order: 2,
    icon: "algebraExpressions",
    colorToken: "topicPurple",
  },
  {
    id: "ALGEBRAIC_EXPRESSION_COMPARISON",
    title: "השוואת ביטויים אלגבריים",
    order: 3,
    icon: "algebraExpressions",
    colorToken: "topicPurple",
  },
  {
    id: "COORDINATE_PLANE",
    title: "מערכת צירים",
    order: 4,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "SUBSTITUTION_IN_EXPRESSIONS",
    title: "הצבה בביטויים אלגבריים",
    order: 5,
    icon: "algebraExpressions",
    colorToken: "topicPurple",
  },
  {
    id: "WORD_PROBLEMS",
    title: "בעיות מילוליות",
    order: 6,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "EQUATIONS",
    title: "משוואות",
    order: 7,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "LINEAR_FUNCTION",
    title: "משוואת הקו הישר",
    order: 8,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "GRAPH_READING",
    title: "קריאת גרפים",
    order: 9,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "PERCENTAGES",
    title: "אחוזים",
    order: 9.5,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "INEQUALITIES",
    title: "אי שוויונים",
    order: 10,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "TRIANGLE_CONGRUENCE",
    title: "חפיפת משולשים",
    order: 11,
    icon: "triangles",
    colorToken: "topicOrange",
  },
  {
    id: "TRIANGLE_MEDIAN",
    title: "תיכון במשולש",
    order: 12,
    icon: "triangles",
    colorToken: "topicOrange",
  },
  {
    id: "QUADRATIC_FUNCTION",
    title: "פונקציה ריבועית",
    order: 13,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "IDENTITIES",
    title: "נוסחאות הכפל המקוצר",
    order: 14,
    icon: "algebraExpressions",
    colorToken: "topicPurple",
  },
  {
    id: "QUADRATIC_FORMULA",
    title: "נוסחת שורשים",
    order: 15,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "PROBABILITY",
    title: "הסתברות",
    order: 16,
    icon: "signedNumbers",
    colorToken: "topicBlue",
  },
  {
    id: "QUADRILATERALS",
    title: "גיאומטריה משפחת המרובעים",
    order: 17,
    icon: "triangles",
    colorToken: "topicOrange",
  },
  {
    id: "TRIANGLE_GEOMETRY",
    title: "גיאומטריה משולשים",
    order: 18,
    icon: "triangles",
    colorToken: "topicOrange",
  },
  {
    id: "PARABOLA_ANALYSIS",
    title: "חקירת פרבולה",
    order: 19,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "PARABOLA_WORD_PROBLEMS",
    title: "בעיות מילוליות ובעיות קיצון פרבולה וישר",
    order: 20,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "ANALYTIC_GEOMETRY",
    title: "גיאומטריה אנליטית",
    order: 21,
    icon: "triangles",
    colorToken: "topicOrange",
  },
  {
    id: "TRIGONOMETRY",
    title: "טריגונומטריה",
    order: 22,
    icon: "triangles",
    colorToken: "topicOrange",
  },
  {
    id: "PRECALCULUS",
    title: "קדם אנליזה",
    order: 23,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "DERIVATIVE_AND_POLYNOMIAL_ANALYSIS",
    title: "נגזרת וחקירה של פולינום",
    order: 24,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
];

export const TOPICS_BY_GRADE: Record<GradeId, TopicId[]> = {
  GRADE_7: [
    "ALGEBRA_EXPRESSIONS",
    "SIGNED_NUMBERS",
    "ALGEBRAIC_EXPRESSION_COMPARISON",
    "COORDINATE_PLANE",
    "SUBSTITUTION_IN_EXPRESSIONS",
    "WORD_PROBLEMS",
  ],
  GRADE_8: [
    "EQUATIONS",
    "LINEAR_FUNCTION",
    "GRAPH_READING",
    "PERCENTAGES",
    "INEQUALITIES",
    "TRIANGLE_CONGRUENCE",
    "TRIANGLE_MEDIAN",
  ],
  GRADE_9: [
    "QUADRATIC_FUNCTION",
    "IDENTITIES",
    "QUADRATIC_FORMULA",
    "PROBABILITY",
    "QUADRILATERALS",
    "TRIANGLE_GEOMETRY",
    "PARABOLA_ANALYSIS",
    "PARABOLA_WORD_PROBLEMS",
  ],
  GRADE_10: [
    "ANALYTIC_GEOMETRY",
    "TRIGONOMETRY",
    "PRECALCULUS",
    "DERIVATIVE_AND_POLYNOMIAL_ANALYSIS",
  ],
};

export function listTopics(): Topic[] {
  return [...TOPICS].sort((a, b) => a.order - b.order);
}

export function listTopicsByGrade(gradeId: GradeId): Topic[] {
  const topicIds = new Set(TOPICS_BY_GRADE[gradeId]);
  return listTopics().filter((topic) => topicIds.has(topic.id));
}

export function getTopicById(id: TopicId): Topic | undefined {
  return TOPICS.find((topic) => topic.id === id);
}
