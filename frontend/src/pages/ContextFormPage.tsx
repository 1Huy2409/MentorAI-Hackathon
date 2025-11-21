import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, User } from 'lucide-react';

const ContextFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState('');
  const [userContext, setUserContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd save this context to a store or pass it via state
    console.log('Starting interview with:', { jobDescription, userContext });
    navigate('/interview');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Setup Your Interview</h1>
        <p className="text-slate-600">Provide details to tailor the AI interviewer to your specific needs.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Job Description</h2>
          </div>
          <p className="text-sm text-slate-500 mb-4">Paste the full job description you are applying for.</p>
          <textarea
            required
            className="w-full h-48 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-slate-700"
            placeholder="e.g. Senior Frontend Engineer at Google..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your Context</h2>
          </div>
          <p className="text-sm text-slate-500 mb-4">Paste your resume, bio, or key points you want to highlight.</p>
          <textarea
            required
            className="w-full h-48 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-slate-700"
            placeholder="e.g. I have 5 years of experience with React..."
            value={userContext}
            onChange={(e) => setUserContext(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Start Interview <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContextFormPage;
