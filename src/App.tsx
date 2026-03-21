import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import NavbarEnhanced from './components/NavbarEnhanced';
import Dashboard from './components/Dashboard';
import ProblemList from './components/ProblemList';
import ProblemDetail from './components/ProblemDetailEnhanced';
import Leaderboard from './components/Leaderboard';
import Profile from './components/ProfileEnhanced';
import Contests from './components/contests';
import DailyChallenge from './components/DailyChallenge';
import StudyPlan from './components/StudyPlan';
import Bookmarks from './components/Bookmarks';
// import Companies from './components/Companies';
// import Assessments from './components/Assessments';
// import Premium from './components/Premium';
import { useEffect } from 'react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  // Initialize demo user
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.find((u: any) => u.email === 'demo@codearena.com')) {
      users.push({
        id: 'demo',
        username: 'demo_user',
        email: 'demo@codearena.com',
        password: 'demo123',
        solvedProblems: 0,
        rank: 125,
        rating: 1500,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
      });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {isAuthenticated && <NavbarEnhanced />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <ProblemList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/problem/:id"
          element={
            <ProtectedRoute>
              <ProblemDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contests"
          element={
            <ProtectedRoute>
              <Contests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daily"
          element={
            <ProtectedRoute>
              <DailyChallenge />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-plan"
          element={
            <ProtectedRoute>
              <StudyPlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
{/* <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessments"
          element={
            <ProtectedRoute>
              <Assessments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/premium"
          element={
            <ProtectedRoute>
              <Premium />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
