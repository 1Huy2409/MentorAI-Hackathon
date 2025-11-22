
import React, { useState } from 'react';
import { AppState, CvAnalysisResult, UserInput, QuickInterviewData, InterviewMode } from './types';
import Hero from './components/Hero';
import InputForm from './components/InputForm';
import LoadingOverlay from './components/LoadingOverlay';
import Dashboard from './components/Dashboard';
import MockInterview from './components/MockInterview';
import AuthForms from './components/AuthForms';
import MainMenu from './components/MainMenu';
import QuickInterviewSetup from './components/QuickInterviewSetup';
import { analyzeCvAndJd } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [userData, setUserData] = useState<UserInput>({ 
    cv: { type: 'text', value: '' }, 
    jd: { type: 'text', value: '' } 
  });
  const [quickData, setQuickData] = useState<QuickInterviewData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<CvAnalysisResult | null>(null);
  const [interviewMode, setInterviewMode] = useState<InterviewMode>('ANALYSIS');

  // Transition from Hero to Login
  const handleStart = () => {
    setAppState(AppState.LOGIN);
  };

  // Auth Handlers
  const handleLoginSuccess = () => {
    setAppState(AppState.MAIN_MENU);
  };

  const handleSwitchAuthMode = (mode: 'LOGIN' | 'REGISTER') => {
    setAppState(mode === 'LOGIN' ? AppState.LOGIN : AppState.REGISTER);
  };

  const handleLogout = () => {
    setUserData({ cv: { type: 'text', value: '' }, jd: { type: 'text', value: '' } });
    setAnalysisResult(null);
    setQuickData(null);
    setAppState(AppState.LOGIN);
  };

  // Main Menu Handlers
  const handleSelectMatching = () => {
    setAppState(AppState.INPUT);
  };

  const handleSelectQuickInterview = () => {
    setAppState(AppState.QUICK_INTERVIEW_SETUP);
  };

  const handleBackToMenu = () => {
    setAppState(AppState.MAIN_MENU);
  };

  // CV Matching Flow Handlers
  const handleInputSubmit = async (data: UserInput) => {
    setUserData(data);
    setAppState(AppState.ANALYZING);
    
    try {
      const result = await analyzeCvAndJd(data.cv, data.jd);
      setAnalysisResult(result);
      setAppState(AppState.RESULTS);
    } catch (error) {
      console.error("Analysis failed", error);
      // In a real app, show toast error here
      setAppState(AppState.INPUT);
    }
  };

  const handleStartFullInterview = () => {
    setInterviewMode('ANALYSIS');
    setAppState(AppState.INTERVIEW);
  };

  const handleBackToResults = () => {
    setAppState(AppState.RESULTS);
  };

  // Quick Interview Flow Handlers
  const handleStartQuickInterview = (data: QuickInterviewData) => {
    setQuickData(data);
    setInterviewMode('QUICK');
    setAppState(AppState.INTERVIEW);
  };

  const handleEndQuickInterview = () => {
     setAppState(AppState.QUICK_INTERVIEW_SETUP);
  };

  return (
    <div className="antialiased font-sans bg-slate-900 min-h-screen text-slate-100">
      {appState === AppState.LANDING && (
        <Hero onStart={handleStart} />
      )}

      {(appState === AppState.LOGIN || appState === AppState.REGISTER) && (
        <AuthForms 
          mode={appState === AppState.LOGIN ? 'LOGIN' : 'REGISTER'}
          onSwitchMode={handleSwitchAuthMode}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {appState === AppState.MAIN_MENU && (
        <MainMenu 
          onSelectMatching={handleSelectMatching}
          onSelectQuickInterview={handleSelectQuickInterview}
          onLogout={handleLogout}
        />
      )}

      {appState === AppState.INPUT && (
        <InputForm 
          onSubmit={handleInputSubmit} 
          isSubmitting={false} 
          onLogout={handleBackToMenu}
        />
      )}

      {appState === AppState.QUICK_INTERVIEW_SETUP && (
        <QuickInterviewSetup 
          onStart={handleStartQuickInterview}
          onBack={handleBackToMenu}
        />
      )}

      {appState === AppState.ANALYZING && (
        <LoadingOverlay />
      )}

      {appState === AppState.RESULTS && analysisResult && (
        <Dashboard 
          analysis={analysisResult} 
          onStartInterview={handleStartFullInterview} 
          onLogout={handleBackToMenu}
        />
      )}

      {appState === AppState.INTERVIEW && (
        <MockInterview 
          mode={interviewMode}
          cv={interviewMode === 'ANALYSIS' ? userData.cv : undefined} 
          jd={interviewMode === 'ANALYSIS' ? userData.jd : undefined} 
          weaknesses={interviewMode === 'ANALYSIS' && analysisResult ? analysisResult.weaknesses : undefined}
          quickData={interviewMode === 'QUICK' && quickData ? quickData : undefined}
          onBack={interviewMode === 'ANALYSIS' ? handleBackToResults : handleEndQuickInterview} 
        />
      )}
    </div>
  );
};

export default App;
