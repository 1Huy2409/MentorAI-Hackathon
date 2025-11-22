import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { BarChart, Calendar, TrendingUp, Award } from 'lucide-react';

interface InterviewRecord {
  id: number;
  date: string;
  position: string;
  score: number;
  duration: string;
  status: 'completed' | 'in-progress' | 'cancelled';
}

const HistoryPage: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with real data from API later
  const mockHistory: InterviewRecord[] = [
    { id: 1, date: '2024-11-20', position: 'Frontend Developer', score: 85, duration: '25 phút', status: 'completed' },
    { id: 2, date: '2024-11-18', position: 'React Developer', score: 78, duration: '30 phút', status: 'completed' },
    { id: 3, date: '2024-11-15', position: 'Full Stack Engineer', score: 92, duration: '28 phút', status: 'completed' },
    { id: 4, date: '2024-11-12', position: 'UI/UX Developer', score: 88, duration: '22 phút', status: 'completed' },
    { id: 5, date: '2024-11-10', position: 'Backend Developer', score: 75, duration: '27 phút', status: 'completed' },
  ];

  const stats = {
    totalInterviews: mockHistory.length,
    averageScore: Math.round(mockHistory.reduce((acc, curr) => acc + curr.score, 0) / mockHistory.length),
    highestScore: Math.max(...mockHistory.map(h => h.score)),
    completionRate: 100,
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 bg-emerald-500/10';
    if (score >= 70) return 'text-blue-400 bg-blue-500/10';
    return 'text-amber-400 bg-amber-500/10';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Hoàn thành</span>;
      case 'in-progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Đang thực hiện</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">Đã hủy</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Lịch sử phỏng vấn</h1>
            <p className="text-slate-400">Theo dõi tiến trình và kết quả của bạn</p>
          </div>
          <div className="text-sm text-slate-500">
            Xin chào, <span className="text-white font-semibold">{user?.name}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BarChart className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.totalInterviews}</span>
            </div>
            <p className="text-sm text-slate-400">Tổng số lần thi</p>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.averageScore}%</span>
            </div>
            <p className="text-sm text-slate-400">Điểm trung bình</p>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 hover:border-amber-500/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Award className="h-5 w-5 text-amber-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.highestScore}%</span>
            </div>
            <p className="text-sm text-slate-400">Điểm cao nhất</p>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.completionRate}%</span>
            </div>
            <p className="text-sm text-slate-400">Tỷ lệ hoàn thành</p>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">Chi tiết lịch sử</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Ngày</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Vị trí</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Điểm</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Thời gian</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {mockHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-300">{new Date(record.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-white">{record.position}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(record.score)}`}>
                        {record.score}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-400">{record.duration}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(record.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {mockHistory.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-slate-500 mb-2">Chưa có lịch sử phỏng vấn</div>
              <p className="text-sm text-slate-600">Bắt đầu phỏng vấn để xem thống kê của bạn</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default HistoryPage;
