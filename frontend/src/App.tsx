import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ContextFormPage from './pages/ContextFormPage';
import InterviewPage from './pages/InterviewPage';
import ReviewPage from './pages/ReviewPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainMenuPage from './pages/MainMenuPage';
import QuickInterviewSetupPage from './pages/QuickInterviewSetupPage';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import HistoryPage from './pages/HistoryPage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          <Route path="menu" element={
            <ProtectedRoute>
              <MainMenuPage />
            </ProtectedRoute>
          } />
          <Route path="quick-interview-setup" element={
            <ProtectedRoute>
              <QuickInterviewSetupPage />
            </ProtectedRoute>
          } />
          <Route path="history" element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          } />
          <Route path="context" element={
              <ProtectedRoute>
                <ContextFormPage />
              </ProtectedRoute>
            } />
            <Route path="interview" element={
              <ProtectedRoute>
                <InterviewPage />
              </ProtectedRoute>
            } />
          <Route path="review" element={
              <ProtectedRoute>
                <ReviewPage />
              </ProtectedRoute>
            } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
