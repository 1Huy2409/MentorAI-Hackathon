import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Master Your Next Interview with <span className="text-blue-600">AI Precision</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
          Practice realistic interview scenarios, get instant feedback, and refine your answers with our advanced AI interviewer.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            to="/context" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Practice <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a 
            href="#features" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
          >
            Learn More
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Realistic Scenarios</h3>
            <p className="text-slate-600">Simulate real-world interview environments tailored to your job description.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Feedback</h3>
            <p className="text-slate-600">Receive detailed analysis on your tone, content, and delivery immediately.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Custom Context</h3>
            <p className="text-slate-600">Provide your own resume and job details for a personalized experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
