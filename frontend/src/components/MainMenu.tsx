
import React from 'react';

interface MainMenuProps {
  onSelectMatching: () => void;
  onSelectQuickInterview: () => void;
  onViewHistory: () => void;
  onLogout: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onSelectMatching, onSelectQuickInterview, onViewHistory, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-6 flex flex-col relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-7xl mx-auto z-10 mb-16">
        <div className="flex justify-between items-center py-8 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-white">Mentor</span><span className="text-blue-400">AI</span>
            </h1>
            <p className="text-slate-500 font-light text-lg">Dashboard</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onViewHistory}
              className="px-5 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Lịch sử</span>
            </button>
            
            <button 
              onClick={onLogout}
              className="px-5 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
            >
              <span>Đăng xuất</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div className="w-full max-w-7xl mx-auto z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full animate-slide-up">
          
          {/* Option 1: CV Matching */}
          <button 
            onClick={onSelectMatching}
            className="group relative flex flex-col h-80 bg-slate-950/50 border border-slate-800 rounded-3xl p-8 text-left hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">CV & JD Matching</h3>
            <p className="text-slate-400 leading-relaxed">
              Tải lên CV và JD để AI phân tích độ phù hợp, tìm điểm mạnh/yếu và gợi ý chỉnh sửa. Sau đó có thể phỏng vấn thử dựa trên kết quả này.
            </p>
            
            <div className="mt-auto pt-6 flex items-center text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              Bắt đầu phân tích <span className="ml-2">→</span>
            </div>
          </button>

          {/* Option 2: Quick Interview */}
          <button 
            onClick={onSelectQuickInterview}
            className="group relative flex flex-col h-80 bg-slate-950/50 border border-slate-800 rounded-3xl p-8 text-left hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">Quick Interview</h3>
            <p className="text-slate-400 leading-relaxed">
              Không cần CV/JD. Chọn vị trí ứng tuyển và mức độ kinh nghiệm để bắt đầu phỏng vấn giả lập ngay lập tức với AI.
            </p>

             <div className="mt-auto pt-6 flex items-center text-emerald-400 font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              Vào phòng phỏng vấn <span className="ml-2">→</span>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
};

export default MainMenu;
