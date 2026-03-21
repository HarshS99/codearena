import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, Flame, ChevronDown, LogOut, User, Settings, Search } from 'lucide-react';
import SearchModal from './SearchModal';

const navLinks = [
  { path: '/problems', label: 'Problems' },
  { path: '/companies', label: 'Companies' },
  { path: '/contests', label: 'Contest' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/daily', label: 'Daily' },
  { path: '/study-plan', label: 'Study Plan' },
];

export default function NavbarEnhanced() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
    };
    document.addEventListener('mousedown', handler);
    
    // Search keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handler);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    setShowProfile(false);
    logout();
    navigate('/auth');
  };

  const streak = 7;
  const notifications = [
    { id: 1, msg: "🔥 You're on a 7-day streak!", time: '2h ago', unread: true },
    { id: 2, msg: '🏆 Badge unlocked: Speed Demon', time: '5h ago', unread: true },
    { id: 3, msg: '📅 New daily challenge available!', time: '8h ago', unread: false },
  ];
  const unread = notifications.filter(n => n.unread).length;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: '#1a1a1a', borderBottom: '1px solid #3d3d3d',
      height: '56px', display: 'flex', alignItems: 'center',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Logo */}
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginRight: '16px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '6px',
            background: 'linear-gradient(135deg, #ffa116, #ff6b00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: '800', color: '#fff',
          }}>CA</div>
          <span style={{ color: '#eff1f6', fontWeight: '700', fontSize: '16px' }}>Code<span style={{ color: '#ffa116' }}>Arena</span></span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1 }}>
          {navLinks.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} style={{
                padding: '6px 14px', borderRadius: '6px', fontSize: '14px', fontWeight: '500',
                textDecoration: 'none', transition: 'all 0.15s',
                color: active ? '#ffa116' : '#8a8a8a',
                background: active ? '#ffa11620' : 'transparent',
              }}
                onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = '#eff1f6'; }}
                onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = '#8a8a8a'; }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Search Bar Trigger */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', 
              backgroundColor: '#ffffff0a', border: '1px solid #3d3d3d', 
              padding: '6px 12px', borderRadius: '8px', color: '#8a8a8a',
              fontSize: '13px', cursor: 'pointer', outline: 'none', transition: 'all 0.2s',
              minWidth: '160px'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ffffff15'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff0a'}
          >
            <Search size={14} />
            <span style={{ flex: 1, textAlign: 'left' }}>Search...</span>
            <kbd style={{ backgroundColor: '#ffffff1a', padding: '2px 4px', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace' }}>⌘K</kbd>
          </button>

          {/* Streak */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: '#ff6b0020', borderRadius: '100px', border: '1px solid #ff6b0040' }}>
            <Flame size={14} color="#ff6b00" />
            <span style={{ color: '#ff6b00', fontSize: '13px', fontWeight: '700' }}>{streak}</span>
          </div>

          {/* Notifications */}
          <div ref={notifRef} style={{ position: 'relative' }}>
            <button onClick={() => setShowNotif(!showNotif)} style={{
              position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
              color: '#8a8a8a', padding: '6px', borderRadius: '6px',
              display: 'flex', alignItems: 'center',
            }}>
              <Bell size={18} />
              {unread > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  width: '16px', height: '16px', background: '#ff375f',
                  borderRadius: '50%', fontSize: '10px', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700',
                }}>{unread}</span>
              )}
            </button>
            {showNotif && (
              <div style={{
                position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: '300px',
                background: '#282828', border: '1px solid #3d3d3d', borderRadius: '10px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)', overflow: 'hidden',
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #3d3d3d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#eff1f6', fontWeight: '600', fontSize: '14px' }}>Notifications</span>
                  <button style={{ background: 'none', border: 'none', color: '#ffa116', fontSize: '12px', cursor: 'pointer' }}>Mark all read</button>
                </div>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '12px 16px', borderBottom: '1px solid #3d3d3d20',
                    background: n.unread ? '#ffa11608' : 'transparent',
                    display: 'flex', gap: '10px',
                  }}>
                    {n.unread && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffa116', marginTop: '6px', flexShrink: 0 }} />}
                    <div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#eff1f6' }}>{n.msg}</p>
                      <span style={{ fontSize: '11px', color: '#8a8a8a' }}>{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Premium Button */}
          <button 
            onClick={() => navigate('/premium')}
            style={{
              background: 'linear-gradient(135deg, #ffa116, #ff6b00)', color: '#fff',
              border: 'none', borderRadius: '6px', padding: '5px 14px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            }}
          >Premium</button>

          {/* Profile */}
          <div ref={profileRef} style={{ position: 'relative' }}>
            <button onClick={() => setShowProfile(!showProfile)} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #ffa116, #ff375f)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: '700', fontSize: '14px',
              }}>
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <ChevronDown size={14} color="#8a8a8a" style={{ transform: showProfile ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {showProfile && (
              <div style={{
                position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: '240px',
                background: '#282828', border: '1px solid #3d3d3d', borderRadius: '10px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)', overflow: 'hidden',
              }}>
                {/* User info */}
                <div style={{ padding: '16px', borderBottom: '1px solid #3d3d3d' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ffa116, #ff375f)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: '700', fontSize: '18px',
                    }}>{user?.username?.charAt(0).toUpperCase() || 'U'}</div>
                    <div>
                      <div style={{ color: '#eff1f6', fontWeight: '600', fontSize: '14px' }}>{user?.username}</div>
                      <div style={{ color: '#8a8a8a', fontSize: '12px' }}>{user?.email}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#ffa116', fontWeight: '700', fontSize: '16px' }}>{user?.rating ?? 1200}</div>
                      <div style={{ color: '#8a8a8a', fontSize: '11px' }}>Rating</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#00b8a3', fontWeight: '700', fontSize: '16px' }}>Top 15%</div>
                      <div style={{ color: '#8a8a8a', fontSize: '11px' }}>Rank</div>
                    </div>
                  </div>
                </div>
                {/* Menu items */}
                <div style={{ padding: '8px' }}>
                  {[
                    { icon: <User size={15} />, label: 'My Profile', action: () => { navigate('/profile'); setShowProfile(false); } },
                    { icon: <Settings size={15} />, label: 'Settings', action: () => setShowProfile(false) },
                  ].map(item => (
                    <button key={item.label} onClick={item.action} style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '9px 12px', borderRadius: '6px', background: 'none', border: 'none',
                      color: '#eff1f6', fontSize: '13px', cursor: 'pointer', textAlign: 'left',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      <span style={{ color: '#8a8a8a' }}>{item.icon}</span> {item.label}
                    </button>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid #3d3d3d', padding: '8px' }}>
                  <button onClick={handleLogout} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '9px 12px', borderRadius: '6px', background: 'none', border: 'none',
                    color: '#ff375f', fontSize: '13px', cursor: 'pointer', textAlign: 'left',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#ff375f18')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
