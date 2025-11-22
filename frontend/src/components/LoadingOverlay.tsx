import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping"></div>
        <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-4 bg-blue-500/10 rounded-full blur-md animate-pulse"></div>
      </div>
      <h3 className="mt-8 text-2xl font-light text-white tracking-widest animate-pulse">
        SCANNING YOUR FUTURE
      </h3>
      <p className="mt-2 text-slate-500 text-sm">MentorAI đang phân tích dữ liệu...</p>
    </div>
  );
};

export default LoadingOverlay;
