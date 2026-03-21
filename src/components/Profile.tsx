import { useAuth } from '../context/AuthContext';
import { Trophy, Award, Target, TrendingUp, Calendar, CheckCircle2, User } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  
  if (!user) return null;

  const solvedProblems = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
  
  // Mock submission history
  const recentSubmissions = [
    { problemId: '1', title: 'Two Sum', status: 'Accepted', time: '2 hours ago', runtime: '68ms' },
    { problemId: '2', title: 'Add Two Numbers', status: 'Accepted', time: '5 hours ago', runtime: '92ms' },
    { problemId: '3', title: 'Longest Substring', status: 'Wrong Answer', time: '1 day ago', runtime: '-' },
    { problemId: '6', title: 'Valid Parentheses', status: 'Accepted', time: '2 days ago', runtime: '45ms' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 mb-8">
          <div className="flex items-start gap-6">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
              <p className="text-gray-400 mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-400">Rank</p>
                    <p className="text-white font-bold">#{user.rank}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-xs text-gray-400">Rating</p>
                    <p className="text-white font-bold">{user.rating}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-xs text-gray-400">Solved</p>
                    <p className="text-white font-bold">{solvedProblems.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Problem Solving Stats */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Problem Stats
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-green-400">Easy</span>
                    <span className="text-gray-400">0 / 3</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-yellow-400">Medium</span>
                    <span className="text-gray-400">0 / 4</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-red-400">Hard</span>
                    <span className="text-gray-400">0 / 1</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Achievements
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs text-gray-400">First Solve</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3 text-center opacity-50">
                  <div className="w-12 h-12 mx-auto mb-2 bg-slate-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-xs text-gray-500">10 Solved</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3 text-center opacity-50">
                  <div className="w-12 h-12 mx-auto mb-2 bg-slate-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-xs text-gray-500">50 Solved</p>
                </div>
              </div>
            </div>

            {/* Activity Calendar */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                Activity
              </h2>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }).map((_, i) => {
                  const isActive = Math.random() > 0.7;
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded ${
                        isActive
                          ? 'bg-purple-500/50'
                          : 'bg-slate-700/30'
                      }`}
                      title={isActive ? 'Active' : 'Inactive'}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 mt-3">Last 5 weeks</p>
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">Recent Submissions</h2>
              <div className="space-y-3">
                {recentSubmissions.map((submission, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1">{submission.title}</h3>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`${
                            submission.status === 'Accepted'
                              ? 'text-green-400'
                              : 'text-red-400'
                          }`}>
                            {submission.status}
                          </span>
                          <span className="text-gray-400">{submission.time}</span>
                          {submission.runtime !== '-' && (
                            <span className="text-purple-400">Runtime: {submission.runtime}</span>
                          )}
                        </div>
                      </div>
                      {submission.status === 'Accepted' && (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {recentSubmissions.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No submissions yet</p>
                  <p className="text-gray-500 text-sm mt-2">Start solving problems to see your history</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
