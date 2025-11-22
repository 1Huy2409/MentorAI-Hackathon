import React from 'react';
import { Trophy, TrendingUp, MessageSquare, Target, CheckCircle, AlertCircle } from 'lucide-react';
import type { InterviewReview } from '../types';

interface InterviewReviewCardProps {
  review: InterviewReview;
  onBackToMenu: () => void;
}

const InterviewReviewCard: React.FC<InterviewReviewCardProps> = ({ review, onBackToMenu }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-emerald-500/10 border-emerald-500/20';
    if (score >= 60) return 'bg-blue-500/10 border-blue-500/20';
    if (score >= 40) return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Kết Quả Phỏng Vấn</h1>
          <p className="text-slate-400">Đánh giá chi tiết về buổi phỏng vấn của bạn</p>
        </div>

        {/* Overall Score */}
        <div className={`rounded-2xl border p-8 mb-6 ${getScoreBackground(review.overallScore)}`}>
          <div className="text-center">
            <p className="text-slate-400 text-sm uppercase tracking-wide mb-2">Điểm Tổng Thể</p>
            <div className={`text-6xl font-bold ${getScoreColor(review.overallScore)}`}>
              {review.overallScore}
              <span className="text-2xl">/100</span>
            </div>
          </div>
        </div>

        {/* Detailed Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Kỹ Năng Chuyên Môn</p>
                <p className={`text-2xl font-bold ${getScoreColor(review.technicalScore)}`}>
                  {review.technicalScore}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Kỹ Năng Giao Tiếp</p>
                <p className={`text-2xl font-bold ${getScoreColor(review.communicationScore)}`}>
                  {review.communicationScore}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Sự Tự Tin</p>
                <p className={`text-2xl font-bold ${getScoreColor(review.confidenceScore)}`}>
                  {review.confidenceScore}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Điểm Mạnh</h3>
            </div>
            <ul className="space-y-2">
              {review.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Cần Cải Thiện</h3>
            </div>
            <ul className="space-y-2">
              {review.improvements.map((improvement, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Feedback */}
        <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Nhận Xét Chi Tiết</h3>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">{review.detailedFeedback}</p>
        </div>

        {/* Key Questions */}
        {review.keyQuestions && review.keyQuestions.length > 0 && (
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Câu Hỏi Quan Trọng</h3>
            <div className="space-y-6">
              {review.keyQuestions.map((item, idx) => (
                <div key={idx} className="border-l-2 border-blue-500 pl-4">
                  <p className="text-blue-400 font-medium mb-2">Q: {item.question}</p>
                  <p className="text-slate-400 text-sm mb-2 italic">A: {item.answer}</p>
                  <p className="text-slate-300 text-sm">📝 {item.evaluation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onBackToMenu}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
          >
            Về Menu Chính
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewReviewCard;
