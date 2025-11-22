
import React, { useState } from 'react';
import { QuickInterviewData } from '../types';

interface QuickInterviewSetupProps {
  onStart: (data: QuickInterviewData) => void;
  onBack: () => void;
}

const QuickInterviewSetup: React.FC<QuickInterviewSetupProps> = ({ onStart, onBack }) => {
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');

  const isReady = role.trim().length > 0 && experience.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReady) {
      onStart({ role, experience });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 flex items-center justify-center relative">
      
      {/* Background Decoration */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>

      <div className="w-full max-w-lg animate-fade-in z-10">
        <button 
          onClick={onBack}
          className="mb-6 text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại Dashboard
        </button>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-8">
             <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
             </div>
             <h2 className="text-2xl font-bold text-white">Thiết lập Phỏng vấn</h2>
             <p className="text-slate-400 mt-2 text-sm">Nhập thông tin để AI đóng vai người phỏng vấn phù hợp.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Vị trí ứng tuyển</label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="VD: Frontend Developer, Sales Executive..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Mức độ kinh nghiệm</label>
              <select 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-slate-600">Chọn mức độ kinh nghiệm</option>
                <option value="Internship (Thực tập sinh)">Internship (Thực tập sinh)</option>
                <option value="Fresher (Mới ra trường)">Fresher (Mới ra trường)</option>
                <option value="Junior (1-2 năm kinh nghiệm)">Junior (1-2 năm kinh nghiệm)</option>
                <option value="Mid-level (3-5 năm kinh nghiệm)">Mid-level (3-5 năm kinh nghiệm)</option>
                <option value="Senior (Trên 5 năm kinh nghiệm)">Senior (Trên 5 năm kinh nghiệm)</option>
                <option value="Manager / Leader">Manager / Leader</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!isReady}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg
                ${isReady 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-emerald-500/25 hover:-translate-y-0.5' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
            >
              Bắt Đầu Phỏng Vấn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuickInterviewSetup;
