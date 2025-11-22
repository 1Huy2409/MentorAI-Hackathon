import React, { useState, useRef } from 'react';
import { UserInput, InputData } from '../types';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
  isSubmitting: boolean;
  onLogout: () => void;
}

const InputCard = ({ 
  title, 
  theme, 
  data, 
  onChange 
}: { 
  title: string; 
  theme: 'blue' | 'emerald'; 
  data: InputData; 
  onChange: (d: InputData) => void; 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isBlue = theme === 'blue';
  const themeColor = isBlue ? 'text-blue-400' : 'text-emerald-400';
  const borderColor = isBlue ? 'border-blue-500/30' : 'border-emerald-500/30';
  const ringColor = isBlue ? 'focus:ring-blue-500/50' : 'focus:ring-emerald-500/50';
  const bgHover = isBlue ? 'hover:bg-blue-500/5' : 'hover:bg-emerald-500/5';
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Raw = event.target?.result as string;
        // Split to get pure base64: "data:application/pdf;base64,XYZ..." -> "XYZ..."
        const base64Content = base64Raw.split(',')[1];
        onChange({
          type: 'file',
          value: base64Content,
          mimeType: file.type,
          fileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-slate-900/80 border ${borderColor} rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-opacity-50 group w-full`}>
      {/* Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/30 shrink-0">
        <h3 className={`font-bold uppercase tracking-wider flex items-center gap-2 ${themeColor}`}>
          <span className={`w-2 h-2 rounded-full ${isBlue ? 'bg-blue-400' : 'bg-emerald-400'}`}></span>
          {title}
        </h3>
        {/* Tab Switcher */}
        <div className="flex bg-slate-950 rounded-lg p-0.5 border border-slate-800/50">
          <button
            type="button"
            onClick={() => onChange({ ...data, type: 'text', value: data.type === 'text' ? data.value : '' })}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${data.type === 'text' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Văn bản
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...data, type: 'file', value: data.type === 'file' ? data.value : '', fileName: data.type === 'file' ? data.fileName : '' })}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${data.type === 'file' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Upload
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5 flex flex-col">
        {data.type === 'text' ? (
          <div className="flex-1 flex flex-col relative h-full">
             <textarea
              value={data.value}
              onChange={(e) => onChange({ ...data, value: e.target.value })}
              placeholder={title.includes('CV') ? "Dán nội dung CV hoặc Link..." : "Dán nội dung JD hoặc Link..."}
              className={`flex-1 w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 ${ringColor} transition-all resize-none text-sm leading-relaxed`}
              style={{ minHeight: '200px' }}
            />
             {data.value && (
                <button 
                  onClick={() => onChange({...data, value: ''})}
                  className="absolute bottom-4 right-4 text-xs text-slate-500 hover:text-slate-300 bg-slate-900/80 px-2 py-1 rounded border border-slate-800"
                >
                  Xóa
                </button>
             )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full">
            {!data.fileName ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`flex-1 border-2 border-dashed border-slate-800 ${bgHover} rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all group-hover:border-opacity-50 relative overflow-hidden min-h-[200px]`}
              >
                <div className={`p-4 rounded-full bg-slate-900/80 mb-3 ${themeColor} transition-transform group-hover:scale-110 shadow-lg`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-slate-400 font-medium text-sm">Nhấn để chọn file</p>
                <p className="text-slate-600 text-xs mt-1">Hỗ trợ PDF, TXT, Hình ảnh</p>
                
                {/* Decorative grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-slate-950/50 border border-slate-800 rounded-xl p-6 relative group/file min-h-[200px]">
                 <button 
                   onClick={() => onChange({ type: 'file', value: '', fileName: '' })}
                   className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-slate-900"
                   title="Xóa file"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                   </svg>
                 </button>
                 
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${isBlue ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                 </div>
                 <p className="text-slate-200 font-semibold text-center truncate max-w-full px-4">{data.fileName}</p>
                 <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-slate-500 text-xs">Đã tải lên</p>
                 </div>
              </div>
            )}
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".pdf,.txt,image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isSubmitting, onLogout }) => {
  const [cvData, setCvData] = useState<InputData>({ type: 'text', value: '' });
  const [jdData, setJdData] = useState<InputData>({ type: 'text', value: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cvData.value && jdData.value) {
      onSubmit({ cv: cvData, jd: jdData });
    }
  };

  const isReady = cvData.value && jdData.value;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl flex justify-between items-center mb-4 animate-fade-in">
          <div className="text-xl font-bold text-white">Mentor<span className="text-blue-500">AI</span></div>
          <button 
            onClick={onLogout}
            className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <span>Đăng xuất</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
      </div>

      <div className="w-full max-w-6xl animate-fade-in flex-1 flex flex-col justify-center py-4">
        
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Dữ liệu đầu vào</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">
            MentorAI phân tích CV và JD để tìm ra điểm phù hợp nhất. <br/>
            <span className="text-slate-500 text-sm">Hỗ trợ PDF, Hình ảnh hoặc Văn bản trực tiếp.</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 auto-rows-fr">
            {/* CV Section */}
            <div className="relative group h-full">
               <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/20 to-transparent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
               <div className="relative h-full">
                 <InputCard 
                    title="1. Hồ sơ ứng viên (CV)" 
                    theme="blue" 
                    data={cvData} 
                    onChange={setCvData} 
                 />
               </div>
            </div>

            {/* JD Section */}
            <div className="relative group h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative h-full">
                <InputCard 
                  title="2. Mô tả công việc (JD)" 
                  theme="emerald" 
                  data={jdData} 
                  onChange={setJdData} 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center pb-8">
            <button
              type="submit"
              disabled={!isReady || isSubmitting}
              className={`
                group relative px-12 py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3 overflow-hidden
                ${!isReady
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                  : 'bg-white text-slate-950 hover:bg-blue-50 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]'}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1s_infinite]"></div>
              
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang Phân Tích...</span>
                </>
              ) : (
                <>
                  <span>Bắt Đầu Phân Tích</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-2 ${!isReady ? 'opacity-0' : 'opacity-100'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;