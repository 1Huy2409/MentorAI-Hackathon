import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import { LiveInterviewManager } from '../../services/geminiService';
import type { CvAnalysisResult, QuickInterviewData, InterviewReview } from '../types';

const InterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isGeneratingReview, setIsGeneratingReview] = useState(false);
  const managerRef = useRef<LiveInterviewManager | null>(null);
  
  // Generate random heights once for audio bars
  const [barHeights] = useState(() => [...Array(5)].map(() => 20 + Math.random() * 40));

  // Get data from location state
  const analysis = location.state?.analysis as CvAnalysisResult;
  const quickData = location.state?.quickData as QuickInterviewData;
  const mode = quickData ? 'QUICK' : 'ANALYSIS';

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (managerRef.current) {
        managerRef.current.disconnect();
      }
    };
  }, []);

  const handleStartInterview = async () => {
    try {
      const manager = new LiveInterviewManager();
      managerRef.current = manager;

      // Set up AI speaking state callback
      manager.onAiSpeakingStateChange = (speaking: boolean) => {
        setIsAiSpeaking(speaking);
      };

      // Set up end interview callback
      manager.onEndInterview = () => {
        handleEndInterview();
      };

      // Connect based on mode
      if (mode === 'QUICK' && quickData) {
        await manager.connect('QUICK', { quickData });
      } else if (mode === 'ANALYSIS' && analysis) {
        await manager.connect('ANALYSIS', {
          weaknesses: analysis.weaknesses,
        });
      }

      setIsConnected(true);
    } catch (error) {
      console.error('Failed to start interview:', error);
      alert('Failed to start interview. Please check your microphone permissions and API key.');
    }
  };

  const handleEndInterview = async () => {
    if (!managerRef.current) return;

    setIsGeneratingReview(true);
    
    try {
      // Generate review before disconnecting
      const review: InterviewReview = await managerRef.current.generateReview();
      
      // Disconnect manager
      managerRef.current.disconnect();
      managerRef.current = null;
      
      setIsConnected(false);
      setIsGeneratingReview(false);
      
      // Navigate to review page with both analysis and interview review
      navigate('/review', { 
        state: { 
          analysis,
          interviewReview: review,
          mode
        } 
      });
    } catch (error) {
      console.error('Error generating review:', error);
      
      // Still disconnect and navigate even if review fails
      if (managerRef.current) {
        managerRef.current.disconnect();
        managerRef.current = null;
      }
      
      setIsConnected(false);
      setIsGeneratingReview(false);
      
      // Navigate back without review
      if (analysis) {
        navigate('/review', { state: { analysis } });
      } else {
        navigate('/menu');
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Implement actual mute functionality if needed
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center mb-6">
            <Mic className="h-12 w-12" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Mock Interview</h2>
          <p className="mb-8 text-slate-400">
            {mode === 'QUICK' 
              ? `Chuẩn bị phỏng vấn cho vị trí: ${quickData?.role}`
              : 'Chuẩn bị phỏng vấn dựa trên phân tích CV của bạn'}
          </p>
          
          <button 
            onClick={handleStartInterview}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            Bắt Đầu Phỏng Vấn
          </button>
          
          <p className="mt-6 text-sm text-slate-500">
            Đảm bảo microphone của bạn đã được kích hoạt
          </p>
          <p className="mt-2 text-xs text-slate-600">
            💡 Bạn có thể nói "dừng lại" hoặc "kết thúc" để kết thúc phỏng vấn
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
      {/* Generating Review Overlay */}
      {isGeneratingReview && (
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-semibold">Đang tạo đánh giá...</p>
            <p className="text-slate-400 text-sm mt-2">Vui lòng đợi trong giây lát</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-950/50 border-b border-slate-800 px-6 py-4">
        <h3 className="text-white font-semibold">Mock Interview Session</h3>
        <p className="text-slate-400 text-sm">
          {mode === 'QUICK' ? quickData?.role : 'CV Analysis Interview'}
        </p>
      </div>

      {/* Main Content - Audio Visualizer */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center mb-6 transition-all duration-300 ${
            isAiSpeaking 
              ? 'bg-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.4)] scale-110' 
              : 'bg-blue-600/20 shadow-[0_0_20px_rgba(37,99,235,0.2)]'
          }`}>
            <Mic className={`h-16 w-16 transition-colors ${
              isAiSpeaking ? 'text-emerald-400' : 'text-blue-400'
            }`} />
          </div>
          
          <p className="text-slate-400 text-lg">
            {isAiSpeaking ? 'AI đang nói...' : 'Đang lắng nghe...'}
          </p>
          
          {/* Simple audio wave animation */}
          <div className="flex gap-1 justify-center mt-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-blue-500 rounded-full transition-all duration-300 ${
                  isAiSpeaking ? 'animate-pulse' : ''
                }`}
                style={{
                  height: isAiSpeaking ? `${barHeights[i]}px` : '20px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-slate-950/50 border-t border-slate-800 px-6 py-6">
        <div className="flex gap-4 justify-center">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full transition-all ${
              isMuted 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </button>
          
          <button
            onClick={handleEndInterview}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all"
            title="End Interview"
          >
            <PhoneOff className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
