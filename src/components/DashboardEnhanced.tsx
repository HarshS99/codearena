import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { problems } from '../data/problemsEnhanced';
import {
  Trophy,
  Flame,
  Target,
  TrendingUp,
  Calendar,
  Code2,
  ChevronRight,
  Star,
  
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
  Play,
  Bookmark
} from 'lucide-react';

export default function DashboardEnhanced() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [streak, setStreak] = useState(7);
  const [timeLeft, setTimeLeft] = useState('');

  // Get today's daily challenge
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const dailyProblem = problems[dayOfYear % problems.length];

  // Get solved problems
  const solvedIds = JSON.parse(localStorage.getItem(`solved_${user?.email}`) || '[]');
  const solvedProblems = solvedIds.length;
  const easySolved = problems.filter(p => p.difficulty === 'Easy' && solvedIds.includes(p.id)).length;
  const mediumSolved = problems.filter(p => p.difficulty === 'Medium' && solvedIds.includes(p.id)).length;
  const hardSolved = problems.filter(p => p.difficulty === 'Hard' && solvedIds.includes(p.id)).length;

  // Timer for daily challenge
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate streak
  useEffect(() => {
    const savedStreak = localStorage.getItem(`streak_${user?.email}`);
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    } else {
      localStorage.setItem(`streak_${user?.email}`, '7');
    }
  }, [user]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400';
    }
  };

  // Recent activity (simulated)
  const recentActivity = [
    { type: 'solve', problem: 'Two Sum', time: '2 hours ago', status: 'Accepted' },
    { type: 'solve', problem: '3Sum', time: '5 hours ago', status: 'Accepted' },
    { type: 'attempt', problem: 'Merge K Sorted Lists', time: '1 day ago', status: 'Wrong Answer' },
    { type: 'solve', problem: 'Valid Parentheses', time: '2 days ago', status: 'Accepted' },
  ];

  // Recommended problems
  const recommendedProblems = problems.slice(10, 14);

  // Quick stats
  const stats = [
    { icon: CheckCircle2, label: 'Problems Solved', value: solvedProblems, color: 'text-green-400' },
    { icon: Flame, label: 'Day Streak', value: streak, color: 'text-orange-400' },
    { icon: Trophy, label: 'Rank', value: '#125', color: 'text-yellow-400' },
    { icon: Star, label: 'Rating', value: '1542', color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-purple-400">{user?.username}</span>! 👋
          </h1>
          <p className="text-gray-400">Ready to solve some problems today?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-700/50 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Challenge Card */}
            <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-2xl border border-purple-500/30 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Daily Challenge</h2>
                      <p className="text-sm text-purple-300">New problem every day!</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Resets in</div>
                    <div className="text-lg font-mono font-bold text-white">{timeLeft}</div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{dailyProblem.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(dailyProblem.difficulty)}`}>
                      {dailyProblem.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">{dailyProblem.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {dailyProblem.category.slice(0, 3).map((cat, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/problem/${dailyProblem.id}`)}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Challenge
                </button>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                Your Progress
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                  <div className="text-3xl font-bold text-green-400">{easySolved}</div>
                  <div className="text-sm text-gray-400">Easy</div>
                  <div className="text-xs text-gray-500 mt-1">
                    / {problems.filter(p => p.difficulty === 'Easy').length}
                  </div>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                  <div className="text-3xl font-bold text-yellow-400">{mediumSolved}</div>
                  <div className="text-sm text-gray-400">Medium</div>
                  <div className="text-xs text-gray-500 mt-1">
                    / {problems.filter(p => p.difficulty === 'Medium').length}
                  </div>
                </div>
                <div className="text-center p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                  <div className="text-3xl font-bold text-red-400">{hardSolved}</div>
                  <div className="text-sm text-gray-400">Hard</div>
                  <div className="text-xs text-gray-500 mt-1">
                    / {problems.filter(p => p.difficulty === 'Hard').length}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Total Progress</span>
                    <span className="text-white">{solvedProblems}/{problems.length}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                      style={{ width: `${(solvedProblems / problems.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Problems */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-400" />
                  Recommended for You
                </h2>
                <button
                  onClick={() => navigate('/problems')}
                  className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {recommendedProblems.map((problem) => (
                  <div
                    key={problem.id}
                    onClick={() => navigate(`/problem/${problem.id}`)}
                    className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Code2 className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      <div>
                        <div className="font-medium text-white group-hover:text-purple-400 transition-colors">
                          {problem.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {problem.companies.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak Card */}
            <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl border border-orange-500/30 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Flame className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{streak}</div>
                  <div className="text-orange-300">Day Streak 🔥</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Keep coding daily to maintain your streak!
              </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/problems')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
                >
                  <Code2 className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Browse Problems</span>
                </button>
                <button
                  onClick={() => navigate('/study-plan')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
                >
                  <BookOpen className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Study Plans</span>
                </button>
                <button
                  onClick={() => navigate('/contests')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
                >
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Contests</span>
                </button>
                <button
                  onClick={() => navigate('/bookmarks')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
                >
                  <Bookmark className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">Bookmarks</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-0">
                    <div>
                      <div className="text-sm text-white">{activity.problem}</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      activity.status === 'Accepted'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Teaser */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Achievements
                </h3>
                <button
                  onClick={() => navigate('/profile')}
                  className="text-xs text-purple-400 hover:text-purple-300"
                >
                  View all
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: '🎯', unlocked: true },
                  { icon: '🔥', unlocked: true },
                  { icon: '⚡', unlocked: true },
                  { icon: '🏆', unlocked: false },
                  { icon: '💎', unlocked: false },
                  { icon: '🚀', unlocked: false },
                  { icon: '👑', unlocked: false },
                  { icon: '🌟', unlocked: false },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square rounded-lg flex items-center justify-center text-2xl ${
                      badge.unlocked
                        ? 'bg-yellow-500/20 border border-yellow-500/30'
                        : 'bg-gray-700/30 opacity-40'
                    }`}
                  >
                    {badge.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
