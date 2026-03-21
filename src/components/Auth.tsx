import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Code2, Mail, Lock, User, AlertCircle, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let success = false;
      if (isLogin) {
        success = await login(email, password);
        if (!success) setError('Incorrect email or password.');
      } else {
        if (!username || username.length < 3) {
          setError('Username must be at least 3 characters.');
          setLoading(false);
          return;
        }
        success = await signup(username, email, password);
        if (!success) setError('An account with this email already exists.');
      }
      if (success) navigate('/problems');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (focused?: boolean): React.CSSProperties => ({
    width: '100%', padding: '10px 14px 10px 40px',
    background: '#333', border: `1px solid ${focused ? '#ffa116' : '#3d3d3d'}`,
    borderRadius: '6px', color: '#eff1f6', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', display: 'flex' }}>
      {/* Left panel */}
      <div style={{
        display: 'none', flex: 1, background: '#1e1e1e', borderRight: '1px solid #3d3d3d',
        flexDirection: 'column', justifyContent: 'center', padding: '64px 72px',
        position: 'relative', overflow: 'hidden',
      }} className="lc-left-panel">
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '20%', left: '10%', width: '240px', height: '240px', background: '#ffa11618', borderRadius: '50%', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '280px', height: '280px', background: '#ff375f12', borderRadius: '50%', filter: 'blur(100px)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #ffa116, #ff6b00)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code2 size={22} color="#fff" />
            </div>
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#eff1f6' }}>Code<span style={{ color: '#ffa116' }}>Arena</span></span>
          </div>

          <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#eff1f6', lineHeight: 1.2, marginBottom: '20px' }}>
            Level Up Your<br />
            <span style={{ background: 'linear-gradient(90deg, #ffa116, #ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Coding Skills</span>
          </h2>
          <p style={{ color: '#8a8a8a', fontSize: '16px', lineHeight: 1.6, marginBottom: '48px' }}>
            Practice with 150+ curated problems, compete in weekly contests, and track your progress.
          </p>

          {[
            { stat: '150+', label: 'Problems' },
            { stat: '50K+', label: 'Users' },
            { stat: '500+', label: 'Companies' },
          ].map(s => (
            <div key={s.label} style={{ display: 'inline-block', marginRight: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffa116' }}>{s.stat}</div>
              <div style={{ fontSize: '13px', color: '#8a8a8a' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Logo (mobile) */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #ffa116, #ff6b00)', marginBottom: '12px' }}>
              <Code2 size={26} color="#fff" />
            </div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#eff1f6' }}>
              {isLogin ? 'Sign in to CodeArena' : 'Create your account'}
            </h1>
            <p style={{ margin: '6px 0 0', color: '#8a8a8a', fontSize: '14px' }}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => { setIsLogin(!isLogin); setError(''); }} style={{ background: 'none', border: 'none', color: '#ffa116', cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: 0 }}>
                {isLogin ? 'Register' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Card */}
          <div style={{ background: '#282828', border: '1px solid #3d3d3d', borderRadius: '12px', padding: '32px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {!isLogin && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#eff1f6', marginBottom: '6px' }}>Username</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#8a8a8a" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                      style={inputStyle()} placeholder="Choose a username" required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#eff1f6', marginBottom: '6px' }}>Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#8a8a8a" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    style={inputStyle()} placeholder="Enter your email" required
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#eff1f6' }}>Password</label>
                  {isLogin && <button type="button" style={{ background: 'none', border: 'none', color: '#ffa116', fontSize: '12px', cursor: 'pointer' }}>Forgot password?</button>}
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="#8a8a8a" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    style={{ ...inputStyle(), paddingRight: '40px' }} placeholder="Enter your password" required minLength={6}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8a8a8a' }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {!isLogin && password && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color={password.length >= 6 ? '#00b8a3' : '#8a8a8a'} />
                  <span style={{ fontSize: '12px', color: password.length >= 6 ? '#00b8a3' : '#8a8a8a' }}>At least 6 characters</span>
                </div>
              )}

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#ff375f12', border: '1px solid #ff375f40', borderRadius: '6px' }}>
                  <AlertCircle size={15} color="#ff375f" />
                  <span style={{ fontSize: '13px', color: '#ff6b6b' }}>{error}</span>
                </div>
              )}

              <button type="submit" disabled={loading} style={{
                padding: '11px', borderRadius: '6px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                background: loading ? '#555' : 'linear-gradient(135deg, #ffa116, #ff6b00)',
                color: '#fff', fontSize: '15px', fontWeight: '700',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'opacity 0.15s',
              }}>
                {loading ? <div style={{ width: '18px', height: '18px', border: '2px solid #ffffff50', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} /> : (
                  <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></>
                )}
              </button>
            </form>

            {/* Demo hint */}
            <div style={{ marginTop: '20px', padding: '12px', background: '#ffa11610', border: '1px solid #ffa11630', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#ffa116' }}>
                🚀 Demo: <strong>demo@codearena.com</strong> / <strong>demo123</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 768px) { .lc-left-panel { display: flex !important; } }
      `}</style>
    </div>
  );
}
