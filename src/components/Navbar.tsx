import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code2, LogOut, Trophy, User, ListTodo, Award } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CodeArena</span>
          </Link>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div className="flex items-center gap-1">
              <Link
                to="/problems"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/problems')
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <ListTodo className="w-4 h-4" />
                Problems
              </Link>
              <Link
                to="/leaderboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/leaderboard')
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <Trophy className="w-4 h-4" />
                Leaderboard
              </Link>
              <Link
                to="/contests"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/contests')
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <Award className="w-4 h-4" />
                Contests
              </Link>
            </div>
          )}

          {/* User Menu */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">{user.username}</p>
                  <p className="text-xs text-gray-400">Rating: {user.rating}</p>
                </div>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
