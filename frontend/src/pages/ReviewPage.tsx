import React from 'react';
import { Link } from 'react-router-dom';
import { Home, RotateCcw, Star } from 'lucide-react';

const ReviewPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto text-center py-12">
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <Star className="h-10 w-10 text-green-600" fill="currentColor" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Interview Completed!</h1>
        <p className="text-slate-600 mb-8 text-lg">
          Great job! Your session has been recorded and analyzed.
        </p>

        <div className="bg-slate-50 p-6 rounded-xl mb-8 text-left">
          <h3 className="font-bold text-slate-900 mb-2">Session Summary</h3>
          <ul className="space-y-2 text-slate-600">
            <li>• Duration: 15:30</li>
            <li>• Questions Answered: 5</li>
            <li>• Overall Score: 8.5/10</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/context"
            className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="mr-2 h-5 w-5" /> Practice Again
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" /> Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
