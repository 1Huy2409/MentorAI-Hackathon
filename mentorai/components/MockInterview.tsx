
import React, { useState, useEffect, useRef } from 'react';
import { LiveInterviewManager } from '../services/geminiService';
import { InputData, QuickInterviewData, InterviewMode } from '../types';

interface MockInterviewProps {
  mode: InterviewMode;
  cv?: InputData;
  jd?: InputData;
  weaknesses?: string[];
  quickData?: QuickInterviewData;
  onBack: () => void;
}

const MockInterview: React.FC<MockInterviewProps> = ({ 
  mode, 
  cv, 
  jd, 
  weaknesses, 
  quickData, 
  onBack 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionRef = useRef<LiveInterviewManager | null>(null);

  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        sessionRef.current.disconnect();
      }
    };
  }, []);

  const handleStartCall = async () => {
    setError(null);
    sessionRef.current = new LiveInterviewManager();
    
    sessionRef.current.onAiSpeakingStateChange = (speaking) => {
      setIsAiSpeaking(speaking);
    };

    try {
      await sessionRef.current.connect(mode, { cv, jd, weaknesses, quickData });
      setIsConnected(true);
    } catch (err) {
      console.error(err);
      setError("Không thể kết nối tới máy chủ hoặc không có quyền truy cập microphone.");
    }
  };

  const handleEndCall = () => {
    if (sessionRef.current) {
      sessionRef.current.disconnect();
    }
    setIsConnected(false);
    onBack();
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
      {/* Ambient Background */}
      <div className={`absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-950 transition-opacity duration-1000 ${isConnected ? 'opacity-100' : 'opacity-50'}`}></div>
      
      {/* Header */}
      <div className="relative z-10 h-16 flex items-center justify-between px-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isConnected ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-500'}`}></div>
          <h2 className="font-bold text-white tracking-wide text-lg">
            THE SAFE ARENA <span className="text-blue-400 text-sm font-normal ml-2">{mode === 'QUICK' ? 'Quick Mode' : 'Matching Mode'}</span>
          </h2>
        </div>
        <button onClick={handleEndCall} className="text-sm text-slate-400 hover:text-white transition-colors">
          {isConnected ? 'Thoát cuộc gọi' : 'Quay lại'}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        
        {!isConnected ? (
          <div className="text-center space-y-8 max-w-md animate-fade-in">
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border border-white/10 rounded-full"></div>
              <div className="absolute inset-0 border border-white/10 rounded-full animate-[ping_3s_ease-in-out_infinite]"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Sẵn sàng phỏng vấn?</h3>
              <p className="text-slate-400">
                {mode === 'QUICK' 
                  ? `Bạn sẽ phỏng vấn cho vị trí ${quickData?.role}.` 
                  : 'MentorAI sẽ đóng vai nhà tuyển dụng dựa trên phân tích CV.'}
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleStartCall}
              className="group relative px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
                Kết nối ngay
              </span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full space-y-12">
            
            {/* AI Visualizer */}
            <div className="relative flex items-center justify-center">
              {/* Core Orb */}
              <div className={`w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 blur-md transition-all duration-200 ${isAiSpeaking ? 'scale-110 shadow-[0_0_100px_rgba(59,130,246,0.6)]' : 'scale-100 shadow-[0_0_50px_rgba(59,130,246,0.2)]'}`}></div>
              
              {/* Outer Rings (Only animate when speaking) */}
              {isAiSpeaking && (
                <>
                  <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  <div className="absolute inset-0 border-2 border-indigo-400/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: '0.5s' }}></div>
                </>
              )}
              
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-white text-opacity-80 font-mono text-xs tracking-widest uppercase">
                   {isAiSpeaking ? 'MentorAI Speaking' : 'Listening...'}
                 </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center max-w-lg">
              <p className="text-xl text-slate-300 font-light leading-relaxed">
                {isAiSpeaking 
                  ? "Hãy lắng nghe câu hỏi..." 
                  : "Đang lắng nghe bạn. Hãy trả lời tự nhiên."}
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Mẹo: Sử dụng phương pháp STAR (Tình huống - Nhiệm vụ - Hành động - Kết quả)
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-8">
              <button 
                onClick={handleEndCall}
                className="w-14 h-14 rounded-full bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 flex items-center justify-center transition-all hover:scale-110"
                title="Kết thúc"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterview;
