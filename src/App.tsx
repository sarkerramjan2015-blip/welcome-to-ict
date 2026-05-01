/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { doc, increment, serverTimestamp, setDoc } from 'firebase/firestore';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ChapterList from './pages/ChapterList';
import Courses from './pages/Courses';
import CoursePlayer from './pages/CoursePlayer';
import LiveCourseDashboard from './pages/LiveCourseDashboard';
import BoardQuestionsIndex from './pages/BoardQuestionsIndex';
import BoardQuestionDetails from './pages/BoardQuestionDetails';
import Suggestions from './pages/Suggestions';
import EBookReader from './pages/EBookReader';
import TopicList from './pages/TopicList';
import TopicDetails from './pages/TopicDetails';
import Terms from './pages/Terms';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import MegaChallenge from './pages/MegaChallenge';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import SuccessPage from './pages/SuccessPage';
import PaymentStatusPage from './pages/PaymentStatusPage';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LmsProvider } from './context/LmsContext';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';
import { firebaseDb } from './lib/firebase';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let isGaInitialized = false;
let lastTrackedPath = '';
let lastTrackedTrafficPath = '';

function GoogleAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    if (!isGaInitialized) {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      isGaInitialized = true;
    }

    const page = `${location.pathname}${location.search}`;

    if (page === lastTrackedPath) {
      return;
    }

    ReactGA.send({
      hitType: 'pageview',
      page,
      title: document.title,
    });
    lastTrackedPath = page;
  }, [location.pathname, location.search]);

  return null;
}

function FirestoreTrafficTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!firebaseDb) {
      return;
    }

    const page = `${location.pathname}${location.search}`;

    if (page === lastTrackedTrafficPath) {
      return;
    }

    lastTrackedTrafficPath = page;

    void setDoc(
      doc(firebaseDb, 'stats', 'traffic'),
      {
        pageViews: increment(1),
        lastPath: page,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    ).catch(error => {
      console.error('Failed to track Firestore page view:', error);
    });
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <GoogleAnalyticsTracker />
        <FirestoreTrafficTracker />
        <AuthProvider>
          <LmsProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="courses" element={<Courses />} />
                <Route path="course-player" element={<PrivateRoute><CoursePlayer /></PrivateRoute>} />
                <Route path="live-course-dashboard" element={<PrivateRoute><LiveCourseDashboard /></PrivateRoute>} />
                <Route path="suggestions" element={<Suggestions />} />
                <Route path="board-questions" element={<BoardQuestionsIndex />} />
                <Route path="board-questions/:boardYearSlug/:chapterSlug" element={<BoardQuestionDetails />} />
                <Route path="ebook-reader" element={<PrivateRoute><EBookReader /></PrivateRoute>} />
                <Route path="syllabus" element={<ChapterList />} />
                <Route path="chapters/:chapterId/topics" element={<TopicList />} />
                <Route path="topics/:topicId" element={<TopicDetails />} />
                <Route path="terms" element={<Terms />} />
                <Route path="monthly-quiz" element={<MegaChallenge />} />
                <Route path="payment/success" element={<SuccessPage />} />
                <Route path="payment/cancel" element={<PaymentStatusPage type="cancel" />} />
                <Route path="payment/fail" element={<PaymentStatusPage type="fail" />} />
                <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="admin" element={<AdminLogin />} />
                <Route path="admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              </Route>
            </Routes>
          </LmsProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
