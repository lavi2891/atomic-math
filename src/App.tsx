import { lazy, Suspense } from "react";
import { PlaygroundScreen } from "@app/PlaygroundScreen";
import { appRouteFromSearch } from "@app/routing";

const StudentApp = lazy(() => import("@app/StudentApp"));
const QuestionReviewScreen = lazy(() => import("@app/contentReview/QuestionReviewScreen"));

export default function App() {
  const route = appRouteFromSearch(window.location.search);
  if (route === "question-review") return <Suspense fallback={<p dir="rtl">טוען כלי ביקורת…</p>}><QuestionReviewScreen /></Suspense>;
  if (route === "playground") return <PlaygroundScreen />;
  return <Suspense fallback={<p dir="rtl">טוען…</p>}><StudentApp /></Suspense>;
}
