import React from 'react';
import type { CvAnalysisResult } from '../types';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { Link } from 'react-router-dom';

interface DashboardProps {
  analysis: CvAnalysisResult;
  onStartInterview: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ analysis, onStartInterview, onLogout }) => {
  const scoreData = [{ name: 'Score', value: analysis.matchingScore, fill: analysis.matchingScore > 70 ? '#34d399' : '#3b82f6' }];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center border-b border-slate-800 pb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Kết quả phân tích</h2>
            <div className="text-sm text-slate-500">Dashboard Overview</div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
               onClick={onStartInterview}
               className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Vào "Safe Arena" (Phỏng vấn thử)
            </button>
            <button><Link to='/history'>History</Link></button>
            <button 
              onClick={onLogout}
              className="text-slate-400 hover:text-red-400 p-3 rounded-lg hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
              title="Đăng xuất"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Score Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-lg">
            <h3 className="text-slate-400 uppercase text-sm font-semibold tracking-wider mb-4">Matching Score</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%" barSize={20} data={scoreData} startAngle={90} endAngle={-270}>
                   <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                   <RadialBar background dataKey="value" cornerRadius={30} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pt-8">
                 <span className={`text-5xl font-bold ${analysis.matchingScore > 70 ? 'text-emerald-400' : 'text-blue-400'}`}>
                    {analysis.matchingScore}%
                 </span>
                 <span className="text-slate-500 text-sm mt-2">Độ tương thích</span>
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-emerald-400 uppercase text-sm font-semibold tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Điểm mạnh
            </h3>
            <ul className="space-y-4">
              {analysis.strengths.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-lg">
             <h3 className="text-rose-400 uppercase text-sm font-semibold tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              Điểm mù (Cần cải thiện)
            </h3>
             <ul className="space-y-4">
              {analysis.weaknesses.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                   <svg className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rewrite Suggestions */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-blue-400 uppercase text-sm font-semibold tracking-wider mb-8">Gợi ý nâng cấp CV (AI Rewrite)</h3>
          <div className="space-y-8">
            {analysis.rewrittenPoints.map((point: { original: string; improved: string; reason: string }, idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-900/50 rounded-xl border border-slate-800/50 hover:border-blue-500/30 transition-colors">
                <div>
                  <div className="text-xs text-slate-500 mb-2 font-mono">BẢN GỐC</div>
                  <p className="text-slate-400 italic">"{point.original}"</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-3 top-0 bottom-0 w-px bg-slate-800 hidden md:block"></div>
                   <div className="text-xs text-emerald-500 mb-2 font-mono font-bold">BẢN NÂNG CẤP</div>
                   <p className="text-slate-200 font-medium">{point.improved}</p>
                   <p className="text-xs text-slate-500 mt-3 border-t border-slate-800 pt-2">💡 {point.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;