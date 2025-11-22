import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuickInterviewSetup from '../components/QuickInterviewSetup';
import type { QuickInterviewData } from '../types';

const QuickInterviewSetupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = (data: QuickInterviewData) => {
    // Navigate to interview page with quick interview data
    navigate('/interview', { state: { quickData: data } });
  };

  const handleBack = () => {
    navigate('/menu');
  };

  return (
    <QuickInterviewSetup
      onStart={handleStart}
      onBack={handleBack}
    />
  );
};

export default QuickInterviewSetupPage;
