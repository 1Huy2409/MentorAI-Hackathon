import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-0 animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -z-0" />

      <div className="relative z-10 max-w-3xl space-y-8 animate-slide-up">
        <div className="inline-flex items-center px-3 py-1 space-x-2 border border-blue-500/30 rounded-full bg-blue-500/10">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">AI Career Co-pilot</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          Mentor<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">AI</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
          Nâng tầm sự nghiệp. Đánh thức tiềm năng.<br/>
          <span className="text-base md:text-lg text-slate-500 mt-2 block">
            Giúp bạn lấp đầy khoảng trống kỹ năng và tự tin chinh phục nhà tuyển dụng.
          </span>
        </p>

        <div className="pt-8">
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] active:scale-95"
          >
            <span className="relative z-10">Thử Thách Ngay</span>
            <div className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <p className="mt-4 text-sm text-slate-600">Miễn phí cho sinh viên & fresher</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
