import { Calendar, Clock, Trophy, Users, TrendingUp, PlayCircle, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

// Real-world contest dates (next Sunday and next Saturday from current date logic)
function getNextContest(dayOfWeek: number /* 0=Sun,6=Sat */, hourUTC: number = 2 /* 10:30 AM EST = 14:30 UTC */) {
  const now = new Date();
  const result = new Date(now);
  result.setUTCHours(hourUTC, 30, 0, 0);
  const diff = (dayOfWeek - now.getUTCDay() + 7) % 7 || 7;
  result.setUTCDate(now.getUTCDate() + diff);
  return result;
}

const WEEKLY_CONTEST_DATE = getNextContest(0);   // Sunday
const BIWEEKLY_CONTEST_DATE = getNextContest(6); // Saturday

function pad(n: number) { return String(n).padStart(2, '0'); }

function Countdown({ target, color = '#ffa116' }: { target: Date; color?: string }) {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const update = () => setDiff(Math.max(0, target.getTime() - Date.now()));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [target]);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const units = [
    ['Days', days],
    ['Hrs', hours],
    ['Min', minutes],
    ['Sec', seconds],
  ] as const;

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      {units.map(([label, val]) => (
        <div key={label} style={{ textAlign: 'center' }}>
          <div style={{
            background: '#111', border: `1px solid ${color}33`,
            borderRadius: '8px', padding: '10px 14px',
            color, fontSize: '26px', fontWeight: '800', fontFamily: 'monospace',
            minWidth: '54px', boxShadow: `0 0 12px ${color}22`,
            transition: 'all 0.3s'
          }}>
            {pad(val)}
          </div>
          <div style={{ color: '#555', fontSize: '10px', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

function formatContestDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
}

function formatContestTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
  });
}

export default function Contests() {
  const [registered, setRegistered] = useState<Set<number>>(new Set([1]));

  const toggleRegister = (id: number) => {
    setRegistered(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const upcomingContests = [
    {
      id: 1,
      title: 'Weekly Contest 402',
      date: formatContestDate(WEEKLY_CONTEST_DATE),
      time: formatContestTime(WEEKLY_CONTEST_DATE),
      target: WEEKLY_CONTEST_DATE,
      duration: '1h 30m',
      participants: 18453,
      problems: 4,
      type: 'Weekly',
    },
    {
      id: 2,
      title: 'Biweekly Contest 132',
      date: formatContestDate(BIWEEKLY_CONTEST_DATE),
      time: formatContestTime(BIWEEKLY_CONTEST_DATE),
      target: BIWEEKLY_CONTEST_DATE,
      duration: '1h 30m',
      participants: 8500,
      problems: 4,
      type: 'Biweekly',
    }
  ];

  const pastContests = [
    { id: 3, title: 'Weekly Contest 401',    date: 'Mar 16, 2025', rank: '-', participants: 32234, score: '0/4' },
    { id: 4, title: 'Biweekly Contest 131',  date: 'Mar 15, 2025', rank: '-', participants: 21876, score: '0/4' },
    { id: 5, title: 'Weekly Contest 400',    date: 'Mar 9, 2025',  rank: '-', participants: 30122, score: '0/4' },
    { id: 6, title: 'Biweekly Contest 130',  date: 'Mar 8, 2025',  rank: '-', participants: 19800, score: '0/4' },
    { id: 7, title: 'Weekly Contest 399',    date: 'Mar 2, 2025',  rank: '-', participants: 28900, score: '0/4' },
  ];

  const featured = upcomingContests[0];

  return (
    <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', color: '#eff1f6', paddingTop: '60px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)', borderBottom: '1px solid #222' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 20px', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#ffa11618', border: '1px solid #ffa11633', color: '#ffa116', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '20px', letterSpacing: '0.5px' }}>
              <Zap size={12} />  UPCOMING
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#eff1f6', marginBottom: '12px', lineHeight: 1.2 }}>
              {featured.title}
            </h1>
            <p style={{ color: '#666', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>
              Compete globally with thousands of developers. Solve {featured.problems} challenging problems, improve your rating, and win exclusive profile badges.
            </p>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '13px' }}>
                <Calendar size={15} color="#ffa116" /> <span>{featured.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '13px' }}>
                <Clock size={15} color="#ffa116" /> <span>{featured.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '13px' }}>
                <Users size={15} color="#ffa116" /> <span>{featured.participants.toLocaleString()} registered</span>
              </div>
            </div>
            <button
              onClick={() => toggleRegister(featured.id)}
              style={{
                backgroundColor: registered.has(featured.id) ? 'transparent' : '#ffa116',
                color: registered.has(featured.id) ? '#00b8a3' : '#fff',
                border: registered.has(featured.id) ? '2px solid #00b8a3' : '2px solid transparent',
                fontSize: '15px', fontWeight: '700',
                padding: '12px 32px', borderRadius: '10px', cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: registered.has(featured.id) ? 'none' : '0 4px 20px rgba(255, 161, 22, 0.4)'
              }}
            >
              {registered.has(featured.id) ? '✓ Registered' : 'Register Now'}
            </button>
          </div>

          {/* Live Countdown */}
          <div style={{ width: '320px', backgroundColor: '#1a1a1a', borderRadius: '16px', border: '1px solid #2a2a2a', padding: '28px', textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px', fontWeight: '600' }}>
              🔴 Live Countdown
            </div>
            <Countdown target={featured.target} color="#ffa116" />
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px', color: '#555' }}>
              <span>⏱ {featured.duration}</span>
              <span>📝 {featured.problems} Problems</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>

        {/* Main Column */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#eff1f6', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="#ffa116" /> Upcoming Contests
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
            {upcomingContests.map(c => (
              <div key={c.id} style={{
                backgroundColor: '#1a1a1a', borderRadius: '12px',
                border: '1px solid #2a2a2a',
                padding: '20px', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap',
                transition: 'border-color 0.2s, background 0.2s', cursor: 'pointer'
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#212121'; e.currentTarget.style.borderColor = '#ffa11640'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.borderColor = '#2a2a2a'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: '#ffa11612', border: '1px solid #ffa11625', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Trophy size={26} color="#ffa116" />
                  </div>
                  <div>
                    <h3 style={{ color: '#eff1f6', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>{c.title}</h3>
                    <div style={{ display: 'flex', gap: '14px', color: '#666', fontSize: '12px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {c.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {c.duration}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> {c.participants.toLocaleString()}</span>
                    </div>
                    {/* Mini countdown */}
                    <div style={{ marginTop: '8px' }}>
                      <MiniCountdown target={c.target} />
                    </div>
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); toggleRegister(c.id); }}
                  style={{
                    backgroundColor: registered.has(c.id) ? 'transparent' : '#ffa116',
                    color: registered.has(c.id) ? '#00b8a3' : '#000',
                    border: registered.has(c.id) ? '1px solid #00b8a3' : 'none',
                    padding: '9px 22px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                    whiteSpace: 'nowrap', transition: 'all 0.2s',
                  }}
                >
                  {registered.has(c.id) ? '✓ Registered' : 'Register'}
                </button>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#eff1f6', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="#888" /> Past Contests
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pastContests.map(c => (
              <div key={c.id} style={{
                backgroundColor: '#141414', borderRadius: '10px', border: '1px solid #222',
                padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'border-color 0.15s', cursor: 'pointer', gap: '12px', flexWrap: 'wrap'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#333'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#222'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#ffffff05', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Trophy size={20} color="#3a3a3a" />
                  </div>
                  <div>
                    <h3 style={{ color: '#aaa', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{c.title}</h3>
                    <div style={{ display: 'flex', gap: '14px', color: '#555', fontSize: '12px' }}>
                      <span>{c.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={11} /> {c.participants.toLocaleString()}</span>
                      <span>Score: {c.score}</span>
                    </div>
                  </div>
                </div>
                <button style={{
                  backgroundColor: 'transparent', color: '#888', border: '1px solid #2a2a2a',
                  padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.color = '#eff1f6'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#888'; }}
                >
                  <PlayCircle size={14} /> Virtual
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '300px', flexShrink: 0 }}>
          <div style={{ backgroundColor: '#1a1a1a', borderRadius: '14px', border: '1px solid #2a2a2a', padding: '24px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#eff1f6', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} color="#ffa116" /> My Contest Stats
            </h3>

            <div style={{ textAlign: 'center', marginBottom: '24px', padding: '20px', background: '#111', borderRadius: '12px', border: '1px solid #222' }}>
              <div style={{ fontSize: '40px', fontWeight: '900', color: '#ffa116', marginBottom: '4px' }}>1,500</div>
              <div style={{ fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <TrendingUp size={13} color="#00b8a3" style={{ color: '#00b8a3' }} />
                <span style={{ color: '#00b8a3' }}>+25 this week</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              {[
                ['Global Ranking', '12,453'],
                ['Contests Attended', '0'],
                ['Best Rank', '-'],
                ['Total Score', '0'],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#111', borderRadius: '8px' }}>
                  <span style={{ color: '#666' }}>{label}</span>
                  <span style={{ color: '#eff1f6', fontWeight: '700' }}>{val}</span>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%', marginTop: '16px', backgroundColor: '#111',
              color: '#888', padding: '11px', borderRadius: '8px',
              border: '1px solid #2a2a2a', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              transition: 'all 0.15s'
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#222'; e.currentTarget.style.color = '#eff1f6'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#111'; e.currentTarget.style.color = '#888'; }}
            >
              View Global Ranking
            </button>
          </div>

          {/* Next contests timing */}
          <div style={{ backgroundColor: '#1a1a1a', borderRadius: '14px', border: '1px solid #2a2a2a', padding: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#666', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Next Contests
            </h3>
            {upcomingContests.map(c => (
              <div key={c.id} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #1f1f1f' }}>
                <div style={{ fontSize: '13px', color: '#aaa', fontWeight: '600', marginBottom: '6px' }}>{c.title}</div>
                <MiniCountdown target={c.target} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniCountdown({ target }: { target: Date }) {
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    const update = () => setDiff(Math.max(0, target.getTime() - Date.now()));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [target]);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <span style={{ fontSize: '12px', color: '#ffa116', fontFamily: 'monospace', fontWeight: '600' }}>
      {days > 0 ? `${days}d ` : ''}{pad(hours)}:{pad(minutes)}:{pad(seconds)}
    </span>
  );
}
