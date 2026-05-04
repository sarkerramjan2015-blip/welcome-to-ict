/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminRoute from './components/routes/AdminRoute';
import PrivateRoute from './components/routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';

const ChapterList = lazy(() => import('./pages/ChapterList'));
const Courses = lazy(() => import('./pages/Courses'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const LiveCourseDashboard = lazy(() => import('./pages/LiveCourseDashboard'));
const BoardQuestionsIndex = lazy(() => import('./pages/BoardQuestionsIndex'));
const BoardQuestionDetails = lazy(() => import('./pages/BoardQuestionDetails'));
const Suggestions = lazy(() => import('./pages/Suggestions'));
const MCQPractice = lazy(() => import('./pages/MCQPractice'));
const EBookReader = lazy(() => import('./pages/EBookReader'));
const TopicList = lazy(() => import('./pages/TopicList'));
const TopicDetails = lazy(() => import('./pages/TopicDetails'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const MegaChallenge = lazy(() => import('./pages/MegaChallenge'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));
const PaymentStatusPage = lazy(() => import('./pages/PaymentStatusPage'));
const LmsRoute = lazy(() => import('./components/routes/LmsRoute'));

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let gaLoadPromise: Promise<void> | null = null;
let lastTrackedPath = '';

function PageLoader() {
  return (
    <div className="flex min-h-[45vh] flex-1 items-center justify-center px-6 text-center text-sm font-bold text-slate-500 dark:text-slate-300">
      Loading...
    </div>
  );
}

const runAfterFirstPaint = (callback: () => void) => {
  if (window.requestIdleCallback) {
    const id = window.requestIdleCallback(callback, { timeout: 3000 });
    return () => window.cancelIdleCallback?.(id);
  }

  const timeout = window.setTimeout(callback, 1600);
  return () => window.clearTimeout(timeout);
};

const loadGoogleAnalytics = (measurementId: string) => {
  if (window.gtag) {
    return Promise.resolve();
  }

  if (!gaLoadPromise) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });

    gaLoadPromise = new Promise(resolve => {
      const existingScript = document.getElementById('google-analytics');
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-analytics';
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.head.appendChild(script);
    });
  }

  return gaLoadPromise;
};

function GoogleAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || import.meta.env.DEV) {
      return undefined;
    }

    const page = `${location.pathname}${location.search}`;
    if (page === lastTrackedPath) {
      return undefined;
    }

    let cancelled = false;
    const cancelIdle = runAfterFirstPaint(() => {
      void loadGoogleAnalytics(GA_MEASUREMENT_ID).then(() => {
        if (cancelled || page === lastTrackedPath) return;

        window.gtag?.('event', 'page_view', {
          page_path: page,
          page_title: document.title,
          page_location: window.location.href,
        });
        lastTrackedPath = page;
      });
    });

    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <GoogleAnalyticsTracker />
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="suggestions" element={<Suggestions />} />
                <Route path="board-questions" element={<BoardQuestionsIndex />} />
                <Route path="board-questions/:boardYearSlug/:chapterSlug" element={<BoardQuestionDetails />} />
                <Route path="syllabus" element={<ChapterList />} />
                <Route path="chapters/:chapterId/topics" element={<TopicList />} />
                <Route path="terms" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="payment/cancel" element={<PaymentStatusPage type="cancel" />} />
                <Route path="payment/fail" element={<PaymentStatusPage type="fail" />} />
                <Route path="admin" element={<AdminLogin />} />

                <Route element={<LmsRoute />}>
                  <Route path="courses" element={<Courses />} />
                  <Route path="course-player" element={<PrivateRoute><CoursePlayer /></PrivateRoute>} />
                  <Route path="live-course-dashboard" element={<PrivateRoute><LiveCourseDashboard /></PrivateRoute>} />
                  <Route path="mcq-practice" element={<MCQPractice />} />
                  <Route path="ebook-reader" element={<PrivateRoute><EBookReader /></PrivateRoute>} />
                  <Route path="topics/:topicId" element={<TopicDetails />} />
                  <Route path="monthly-quiz" element={<MegaChallenge />} />
                  <Route path="payment/success" element={<SuccessPage />} />
                  <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
