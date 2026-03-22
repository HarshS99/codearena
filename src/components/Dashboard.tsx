import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { problems } from '../data/problems';
import {
  CheckCircle2, Clock, Code2, ArrowRight, Flame,
  Target, TrendingUp, Trophy, Calendar, Activity
} from 'lucide-react';
import { useState, useEffect } from 'react';
import ActivityHeatmap from './ActivityHeatmap';

const diffColor = { Easy: '#00b8a3', Medium: '#ffc01e', Hard: '#ff375f' } as const;
const diffBg   = { Easy: '#00b8a318', Medium: '#ffc01e18', Hard: '#ff375f18' } as const;

function pad(n: number) { return String(n).padStart(2, '0'); }

function getNextSunday() {
  const now = new Date();
  const result = new Date(now);
  result.setUTCHours(14, 30, 0, 0); // 10:30 AM EST
  const diff = (7 - now.getUTCDay()) % 7 || 7;
  result.setUTCDate(now.getUTCDate() + diff);
  return result;
}

function LiveContestBanner() {
  const target = getNextSunday();
  const [diff, setDiff] = useState(Math.max(0, target.getTime() - Date.now()));

  useEffect(() => {
    const t = setInterval(() => setDiff(Math.max(0, target.getTime() - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);

  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  const timeStr = days > 0
    ? `${days}d ${pad(hours)}h ${pad(minutes)}m`
    : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffa11618, #ff375f10)',
      border: '1px solid #ffa11640', borderRadius: '10px',
      padding: '20px 24px', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '44px', height: '44px', background: '#ffa11620', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Calendar size={22} color="#ffa116" />
        </div>
        <div>
          <h3 style={{ margin: 0, color: '#eff1f6', fontSize: '16px', fontWeight: '700' }}>
            Weekly Contest · Starts in{' '}
            <span style={{ color: '#ffa116', fontFamily: 'monospace' }}>{timeStr}</span>
          </h3>
          <p style={{ margin: 0, color: '#8a8a8a', fontSize: '13px' }}>
            {target.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} · 90 min · 4 Problems
          </p>
        </div>
      </div>
      <Link to="/contests" style={{
        padding: '9px 18px', background: '#ffa116',
        borderRadius: '6px', color: '#1a1a1a',
        fontWeight: '700', fontSize: '14px', textDecoration: 'none'
      }}>
        Register Now
      </Link>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const solvedProblems: number[] = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
  const submissions: any[] = JSON.parse(localStorage.getItem('submissions') || '[]');

  // Live clock
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const recentSubs = submissions.slice(0, 6);
  const recommended = problems.filter(p => !solvedProblems.includes(Number(p.id))).slice(0, 4);

  const easy   = problems.filter(p => p.difficulty === 'Easy');
  const medium = problems.filter(p => p.difficulty === 'Medium');
  const hard   = problems.filter(p => p.difficulty === 'Hard');
  const easyS  = easy.filter(p => solvedProblems.includes(Number(p.id))).length;
  const medS   = medium.filter(p => solvedProblems.includes(Number(p.id))).length;
  const hardS  = hard.filter(p => solvedProblems.includes(Number(p.id))).length;

  const totalSolved   = solvedProblems.length;
  const totalProblems = problems.length;

  // Compute streak from submissions
  const submissionDays = new Set(
    submissions.map((s: any) => new Date(s.timestamp || s.date || 0).toLocaleDateString())
  );
  const streak = submissionDays.size;

  const card = (style?: React.CSSProperties): React.CSSProperties => ({
    background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px',
    padding: '20px', ...style,
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', paddingTop: '72px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px', display: 'grid', gap: '20px', gridTemplateColumns: '1fr' }}>

        {/* Welcome strip */}
        <div style={{
          background: 'linear-gradient(135deg, #ffa11615, #ff375f08)',
          border: '1px solid #ffa11630', borderRadius: '10px',
          padding: '20px 24px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#eff1f6' }}>
              Welcome back, <span style={{ color: '#ffa116' }}>{user?.username}</span> 👋
            </h1>
            <p style={{ margin: '4px 0 0', color: '#6a6a6a', fontSize: '13px' }}>
              {now.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
          </div>
          <Link to="/problems" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '9px 18px', background: '#ffa116', borderRadius: '6px',
            color: '#1a1a1a', fontWeight: '700', fontSize: '14px', textDecoration: 'none',
          }}>
            Solve a Problem <ArrowRight size={15} />
          </Link>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>

          {/* Solved donut */}
          <div style={card()}>
            <h3 style={{ margin: '0 0 16px', color: '#eff1f6', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={16} color="#ffa116" /> Progress Overview
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              {/* Circle */}
              <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
                <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100px', height: '100px' }}>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#2a2a2a" strokeWidth="2.4" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ffa116" strokeWidth="2.4"
                    strokeDasharray={`${totalProblems > 0 ? (totalSolved / totalProblems) * 100 : 0} 100`}
                    strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s' }}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: '#eff1f6' }}>{totalSolved}</span>
                  <span style={{ fontSize: '10px', color: '#6a6a6a' }}>/ {totalProblems}</span>
                </div>
              </div>
              {/* Bars */}
              <div style={{ flex: 1, minWidth: '120px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {([['Easy', easyS, easy.length] as const, ['Medium', medS, medium.length] as const, ['Hard', hardS, hard.length] as const]).map(([d, s, t]) => (
                  <div key={d}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', color: diffColor[d], fontWeight: '600' }}>{d}</span>
                      <span style={{ fontSize: '12px', color: '#6a6a6a' }}>{s}/{t}</span>
                    </div>
                    <div style={{ height: '4px', background: '#2a2a2a', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${t > 0 ? (s/t)*100 : 0}%`, background: diffColor[d], borderRadius: '2px', transition: 'width 0.5s' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={card({ display: 'flex', flexDirection: 'column', gap: '14px' })}>
            <h3 style={{ margin: 0, color: '#eff1f6', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} color="#ffa116" /> Stats
            </h3>
            {[
              { icon: <Flame size={18} color="#ff6b00" />, label: 'Active Days', value: streak > 0 ? `${streak} day${streak !== 1 ? 's' : ''}` : '0 days', bg: '#ff6b0020' },
              { icon: <Trophy size={18} color="#ffc01e" />, label: 'Global Rank', value: `#${user?.rank ?? '—'}`, bg: '#ffc01e20' },
              { icon: <TrendingUp size={18} color="#00b8a3" />, label: 'Rating', value: user?.rating ?? 1200, bg: '#00b8a320' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: '#111', borderRadius: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: '11px', color: '#6a6a6a' }}>{s.label}</div>
                  <div style={{ fontSize: '17px', fontWeight: '700', color: '#eff1f6' }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Submissions */}
          <div style={card()}>
            <h3 style={{ margin: '0 0 14px', color: '#eff1f6', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#ffa116" /> Recent Submissions
            </h3>
            {recentSubs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recentSubs.map((sub: any, idx: number) => {
                  const ts = sub.timestamp || sub.date;
                  const timeAgo = ts ? getTimeAgo(new Date(ts), now) : '';
                  return (
                    <div key={sub.id || idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#111', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {sub.status === 'Accepted'
                          ? <CheckCircle2 size={14} color="#00b8a3" />
                          : <Clock size={14} color="#ff375f" />
                        }
                        <div>
                          <p style={{ margin: 0, fontSize: '13px', color: '#eff1f6', fontWeight: '500' }}>{sub.problemTitle}</p>
                          <p style={{ margin: 0, fontSize: '11px', color: '#6a6a6a' }}>{sub.language}{timeAgo ? ` · ${timeAgo}` : ''}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: sub.status === 'Accepted' ? '#00b8a3' : '#ff375f' }}>{sub.status}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <Code2 size={40} color="#2a2a2a" style={{ marginBottom: '8px' }} />
                <p style={{ margin: 0, color: '#6a6a6a', fontSize: '13px' }}>No submissions yet</p>
                <p style={{ margin: '4px 0 0', color: '#444', fontSize: '12px' }}>Start solving problems!</p>
              </div>
            )}
          </div>
        </div>

        {/* Activity Heatmap Grid Item */}
        <div style={card({ gridColumn: '1 / -1' })}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#eff1f6', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} color="#ffa116" /> Activity Graph
            </h3>
            <span style={{ fontSize: '12px', color: '#6a6a6a' }}>{submissions.length} submissions in the last year</span>
          </div>
          <ActivityHeatmap submissions={submissions} />
        </div>

        {/* Recommended */}
        <div style={card()}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#eff1f6', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={16} color="#ffa116" /> Recommended For You
            </h3>
            <Link to="/problems" style={{ color: '#ffa116', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
            {recommended.map(p => (
              <Link key={p.id} to={`/problem/${p.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '14px', background: '#111', borderRadius: '8px',
                  border: '1px solid #2a2a2a', transition: 'border-color 0.15s, background 0.15s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#ffa11660'; (e.currentTarget as HTMLElement).style.background = '#1f1f1f'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; (e.currentTarget as HTMLElement).style.background = '#111'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#eff1f6', fontWeight: '600', flex: 1, marginRight: '8px' }}>{p.id}. {p.title}</span>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: diffBg[p.difficulty as keyof typeof diffBg], color: diffColor[p.difficulty as keyof typeof diffColor], fontWeight: '600', whiteSpace: 'nowrap' }}>{p.difficulty}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '11px', color: '#6a6a6a' }}>{p.acceptance}% Acceptance</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Live Contest Banner */}
        <LiveContestBanner />
      </div>
    </div>
  );
}

function getTimeAgo(date: Date, now: Date): string {
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}
