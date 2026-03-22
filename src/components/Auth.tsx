import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Code2, Mail, Lock, User, AlertCircle, Eye, EyeOff,
  ArrowRight, CheckCircle2, Shield, Zap, Trophy
} from 'lucide-react';

type ValidationState = 'idle' | 'valid' | 'invalid';

function StrengthBar({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', '#ff375f', '#ffc01e', '#00b8a3', '#00d084'];
  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            flex: 1, height: '3px', borderRadius: '2px',
            background: i <= score ? colors[score] : '#3d3d3d',
            transition: 'background 0.2s'
          }} />
        ))}
      </div>
      {password && (
        <span style={{ fontSize: '11px', color: colors[score] }}>{labels[score]} password</span>
      )}
    </div>
  );
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [focusedField, setFocusedField] = useState('');

  // Live clock in top-right of left panel
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const getPasswordValidation = (): ValidationState => {
    if (!password) return 'idle';
    if (password.length >= 8 && /[0-9]/.test(password)) return 'valid';
    return 'invalid';
  };

  const getConfirmValidation = (): ValidationState => {
    if (!confirmPassword) return 'idle';
    return confirmPassword === password ? 'valid' : 'invalid';
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccessMsg('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
    setEmail('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Client-side validation
    if (!isLogin) {
      if (!username || username.trim().length < 3) {
        setError('Username must be at least 3 characters.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters.');
        return;
      }
      if (!/[0-9]/.test(password)) {
        setError('Password must contain at least one number.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please re-enter.');
        return;
      }
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      let success = false;
      if (isLogin) {
        success = await login(email, password);
        if (!success) setError('Incorrect email or password. Please try again.');
      } else {
        success = await signup(username.trim(), email, password);
        if (!success) setError('Registration failed. Please try again.');
      }
      if (success) {
        if (!isLogin) {
          setSuccessMsg('Account created! Redirecting…');
          setTimeout(() => navigate('/problems'), 800);
        } else {
          navigate('/problems');
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field: string, validation?: ValidationState): React.CSSProperties => {
    let borderColor = '#3d3d3d';
    if (focusedField === field) borderColor = '#ffa116';
    if (validation === 'valid') borderColor = '#00b8a3';
    if (validation === 'invalid') borderColor = '#ff375f';
    return {
      width: '100%', padding: '11px 14px 11px 40px',
      background: '#2a2a2a', border: `1px solid ${borderColor}`,
      borderRadius: '8px', color: '#eff1f6', fontSize: '14px', outline: 'none',
      boxSizing: 'border-box', transition: 'border-color 0.2s',
    };
  };

  const pwValidation = getPasswordValidation();
  const confirmValidation = getConfirmValidation();

  const features = [
    { icon: <Zap size={18} color="#ffa116" />, text: '150+ curated algorithm problems' },
    { icon: <Trophy size={18} color="#ffc01e" />, text: 'Weekly & Biweekly contests' },
    { icon: <Shield size={18} color="#00b8a3" />, text: 'Secure & private code execution' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', display: 'flex' }}>
      {/* Left panel */}
      <div style={{
        display: 'none', flex: 1,
        background: 'linear-gradient(160deg, #1a1a1a 0%, #111 100%)',
        borderRight: '1px solid #2a2a2a',
        flexDirection: 'column', justifyContent: 'center', padding: '64px 72px',
        position: 'relative', overflow: 'hidden',
      }} className="lc-left-panel">
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '15%', left: '5%', width: '300px', height: '300px', background: '#ffa11610', borderRadius: '50%', filter: 'blur(100px)' }} />
          <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '280px', height: '280px', background: '#ff375f0d', borderRadius: '50%', filter: 'blur(90px)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '200px', height: '200px', background: '#00b8a308', borderRadius: '50%', filter: 'blur(60px)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Live clock */}
          <div style={{ position: 'absolute', top: '-40px', right: 0, fontFamily: 'monospace', fontSize: '13px', color: '#555', letterSpacing: '1px' }}>
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '52px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #ffa116, #ff6b00)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px #ffa11640' }}>
              <Code2 size={24} color="#fff" />
            </div>
            <span style={{ fontSize: '26px', fontWeight: '800', color: '#eff1f6' }}>Code<span style={{ color: '#ffa116' }}>Arena</span></span>
          </div>

          <h2 style={{ fontSize: '44px', fontWeight: '900', color: '#eff1f6', lineHeight: 1.15, marginBottom: '20px' }}>
            Master<br />
            <span style={{ background: 'linear-gradient(90deg, #ffa116, #ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Algorithms.</span>
          </h2>
          <p style={{ color: '#6a6a6a', fontSize: '16px', lineHeight: 1.7, marginBottom: '48px' }}>
            Practice with curated problems, compete in weekly contests, and track your growth as a developer.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '52px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ffffff08', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {f.icon}
                </div>
                <span style={{ color: '#aaa', fontSize: '15px' }}>{f.text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '40px' }}>
            {[['150+', 'Problems'], ['50K+', 'Users'], ['500+', 'Companies']].map(([stat, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '26px', fontWeight: '800', color: '#ffa116' }}>{stat}</div>
                <div style={{ fontSize: '12px', color: '#555', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {/* Logo (mobile visible, hidden on large screens) */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #ffa116, #ff6b00)', marginBottom: '14px', boxShadow: '0 0 28px #ffa11650' }}>
              <Code2 size={28} color="#fff" />
            </div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#eff1f6' }}>
              {isLogin ? 'Sign in to CodeArena' : 'Create your account'}
            </h1>
            <p style={{ margin: '8px 0 0', color: '#6a6a6a', fontSize: '14px' }}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={switchMode} style={{
                background: 'none', border: 'none', color: '#ffa116',
                cursor: 'pointer', fontSize: '14px', fontWeight: '600', padding: 0
              }}>
                {isLogin ? 'Register' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Card */}
          <div style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a',
            borderRadius: '16px', padding: '32px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Username - signup only */}
              {!isLogin && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#eff1f6', marginBottom: '7px' }}>
                    Username
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#5a5a5a" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input
                      type="text" value={username} onChange={e => setUsername(e.target.value)}
                      onFocus={() => setFocusedField('username')} onBlur={() => setFocusedField('')}
                      style={inputStyle('username')} placeholder="Choose a username"
                      autoComplete="username"
                    />
                  </div>
                  {username && username.length < 3 && (
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#ff375f' }}>Username must be at least 3 characters</p>
                  )}
                </div>
              )}

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#eff1f6', marginBottom: '7px' }}>
                  Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#5a5a5a" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField('')}
                    style={inputStyle('email')} placeholder="Enter your email"
                    required autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#eff1f6' }}>Password</label>
                  {isLogin && (
                    <button type="button" style={{ background: 'none', border: 'none', color: '#ffa116', fontSize: '12px', cursor: 'pointer', padding: 0 }}>
                      Forgot password?
                    </button>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="#5a5a5a" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    type={showPassword ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField('')}
                    style={{ ...inputStyle('password', !isLogin && password ? pwValidation : undefined), paddingRight: '44px' }}
                    placeholder={isLogin ? 'Enter your password' : 'Create a password (min. 8 chars)'}
                    required autoComplete={isLogin ? 'current-password' : 'new-password'}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#5a5a5a', padding: 0, display: 'flex'
                  }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {!isLogin && password && <StrengthBar password={password} />}
              </div>

              {/* Confirm Password - signup only */}
              {!isLogin && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#eff1f6', marginBottom: '7px' }}>
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Shield size={16} color="#5a5a5a" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocusedField('confirm')} onBlur={() => setFocusedField('')}
                      style={{ ...inputStyle('confirm', confirmPassword ? confirmValidation : undefined), paddingRight: '44px' }}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{
                      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#5a5a5a', padding: 0, display: 'flex'
                    }}>
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {confirmPassword && confirmValidation === 'invalid' && (
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#ff375f' }}>Passwords do not match</p>
                  )}
                  {confirmPassword && confirmValidation === 'valid' && (
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#00b8a3', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={11} /> Passwords match
                    </p>
                  )}
                </div>
              )}

              {/* Password rules reminder for signup */}
              {!isLogin && !password && (
                <div style={{ fontSize: '12px', color: '#5a5a5a', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span>Password requirements:</span>
                  <span>· At least 8 characters</span>
                  <span>· At least one number (0–9)</span>
                </div>
              )}

              {/* Error */}
              {error && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '11px 14px', background: '#ff375f12',
                  border: '1px solid #ff375f40', borderRadius: '8px'
                }}>
                  <AlertCircle size={15} color="#ff375f" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#ff6b6b' }}>{error}</span>
                </div>
              )}

              {/* Success */}
              {successMsg && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '11px 14px', background: '#00b8a312',
                  border: '1px solid #00b8a340', borderRadius: '8px'
                }}>
                  <CheckCircle2 size={15} color="#00b8a3" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#00b8a3' }}>{successMsg}</span>
                </div>
              )}

              {/* Submit */}
              <button type="submit" id="auth-submit-btn" disabled={loading} style={{
                padding: '12px', borderRadius: '8px', border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                background: loading ? '#333' : 'linear-gradient(135deg, #ffa116, #ff6b00)',
                color: '#fff', fontSize: '15px', fontWeight: '700',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'opacity 0.15s, transform 0.1s',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(255, 161, 22, 0.35)',
                marginTop: '4px',
              }}
                onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                {loading ? (
                  <div style={{ width: '18px', height: '18px', border: '2px solid #ffffff40', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                ) : (
                  <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></>
                )}
              </button>
            </form>

            {!isLogin && (
              <p style={{ margin: '16px 0 0', fontSize: '11px', color: '#3d3d3d', textAlign: 'center', lineHeight: 1.5 }}>
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </p>
            )}
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
