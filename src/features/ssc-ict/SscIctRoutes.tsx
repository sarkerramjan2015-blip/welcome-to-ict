import { Navigate, Route, Routes } from 'react-router-dom';
import { isSscIctEnabled } from './config';
import {
  SscChapterPage,
  SscDashboardPage,
  SscFeatureDisabledPage,
  SscIctLanding,
  SscLeaderboardPage,
  SscPackagesPage,
  SscPracticePage,
  SscPreviewPage,
  SscQuizPage,
  SscReaderPage,
  SscResultPage,
  SscShortQuestionsPage,
} from './pages';

export default function SscIctRoutes() {
  if (!isSscIctEnabled) {
    return <SscFeatureDisabledPage />;
  }

  return (
    <Routes>
      <Route index element={<SscIctLanding />} />
      <Route path="packages" element={<SscPackagesPage />} />
      <Route path="chapter/:chapterSlug" element={<SscChapterPage />} />
      <Route path="chapter/:chapterSlug/preview" element={<SscPreviewPage />} />
      <Route path="chapter/:chapterSlug/read" element={<SscReaderPage />} />
      <Route path="chapter/:chapterSlug/practice" element={<SscPracticePage />} />
      <Route path="chapter/:chapterSlug/quiz" element={<SscQuizPage />} />
      <Route path="chapter/:chapterSlug/short-questions" element={<SscShortQuestionsPage />} />
      <Route path="dashboard" element={<SscDashboardPage />} />
      <Route path="result/:attemptId" element={<SscResultPage />} />
      <Route path="leaderboard" element={<SscLeaderboardPage />} />
      <Route path="*" element={<Navigate to="/ssc-ict" replace />} />
    </Routes>
  );
}

