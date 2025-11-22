import { useNavigate, useLocation } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import InterviewReviewCard from '../components/InterviewReviewCard';
import { useAuth } from '../hooks/useAuth';
import type { CvAnalysisResult, InterviewReview } from '../types';

const ReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  
  const analysis = location.state?.analysis as CvAnalysisResult;
  const interviewReview = location.state?.interviewReview as InterviewReview;

  // If we have interview review, show that instead
  if (interviewReview) {
    return (
      <InterviewReviewCard 
        review={interviewReview}
        onBackToMenu={() => navigate('/menu')}
      />
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        <div className="text-center">
          <p className="mb-4">No analysis data found.</p>
          <button 
            onClick={() => navigate('/context')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go back to Input
          </button>
        </div>
      </div>
    );
  }

  return (
    <Dashboard 
      analysis={analysis} 
      onStartInterview={() => navigate('/interview', { state: { analysis } })} 
      onLogout={logout} 
    />
  );
};

export default ReviewPage;
