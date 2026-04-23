/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ChapterList from './pages/ChapterList';
import Courses from './pages/Courses';
import CoursePlayer from './pages/CoursePlayer';
import LiveCourseDashboard from './pages/LiveCourseDashboard';
import Suggestions from './pages/Suggestions';
import EBookReader from './pages/EBookReader';
import TopicList from './pages/TopicList';
import TopicDetails from './pages/TopicDetails';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import MegaChallenge from './pages/MegaChallenge';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course-player" element={<CoursePlayer />} />
            <Route path="live-course-dashboard" element={<LiveCourseDashboard />} />
            <Route path="suggestions" element={<Suggestions />} />
            <Route path="ebook-reader" element={<EBookReader />} />
            <Route path="syllabus" element={<ChapterList />} />
            <Route path="chapters/:chapterId/topics" element={<TopicList />} />
            <Route path="topics/:topicId" element={<TopicDetails />} />
            <Route path="monthly-quiz" element={<MegaChallenge />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<AdminLogin />} />
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}
