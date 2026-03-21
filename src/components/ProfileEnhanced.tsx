import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { problems } from '../data/problemsComplete';
import { Trophy, Calendar, Code2, Star, Award, TrendingUp, Target, Zap, CheckCircle2, Edit2, MapPin, Link as LinkIcon, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const diffColor: Record<string, string> = { Easy: '#00b8a3', Medium: '#ffc01e', Hard: '#ff375f' };
const diffBg:    Record<string, string> = { Easy: '#00b8a318', Medium: '#ffc01e18', Hard: '#ff375f18' };

function ActivityHeatmap() {
  const cells: { date: string; count: number; level: number }[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const count = Math.random() > 0.68 ? Math.floor(Math.random() * 5) : 0;
    cells.push({ date: d.toISOString().split('T')[0], count, level: count === 0 ? 0 : count <= 1 ? 1 : count <= 2 ? 2 : count <= 3 ? 3 : 4 });
  }

  const levelColors = ['#282828', '#00431a', '#006d29', '#009a3c', '#00b851'];
  const weeks: (typeof cells[0] | null)[][] = [];
  let week: (typeof cells[0] | null)[] = [];
  const firstDay = new Date(cells[0].date).getDay();
  for (let i = 0; i < firstDay; i++) week.push(null);
  cells.forEach((c, i) => {
    week.push(c);
    if ((firstDay + i) % 7 === 6) { weeks.push(week); week = []; }
  });
  if (week.length > 0) weeks.push(week);

  return (
    <div>
      <div style={{ fontSize: '13px', color: '#8a8a8a', marginBottom: '12px' }}>
        {cells.filter(c => c.count > 0).length} days active in the past year
      </div>
      <div style={{ display: 'flex', gap: '3px', overflowX: 'auto', paddingBottom: '4px' }}>
        {weeks.map((w, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {w.map((d, di) => (
              <div key={di} title={d ? `${d.date}: ${d.count} solved` : ''} style={{ width: '10px', height: '10px', borderRadius: '2px', background: d ? levelColors[d.level] : 'transparent', cursor: d ? 'pointer' : 'default', transition: 'transform 0.1s' }}
                onMouseEnter={e => { if (d) (e.target as HTMLElement).style.transform = 'scale(1.4)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
        <span style={{ fontSize: '11px', color: '#8a8a8a' }}>Less</span>
        {levelColors.map((c, i) => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '2px', background: c }} />)}
        <span style={{ fontSize: '11px', color: '#8a8a8a' }}>More</span>
      </div>
    </div>
  );
}

export default function ProfileEnhanced() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'solved'|'submissions'|'badges'>('solved');
  const [solvedIds, setSolvedIds] = useState<number[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const storedSolved = localStorage.getItem('codearena_solved');
      if (storedSolved) {
        setSolvedIds(JSON.parse(storedSolved).map(Number));
      }
      const storedSubs = localStorage.getItem('codearena_submissions');
      if (storedSubs) {
        setSubmissions(JSON.parse(storedSubs));
      }
    }
  }, [user]);

  if (!user) return null;

  const easy   = problems.filter(p => p.difficulty === 'Easy');
  const medium = problems.filter(p => p.difficulty === 'Medium');
  const hard   = problems.filter(p => p.difficulty === 'Hard');
  const easyS  = easy.filter(p => solvedIds.includes(p.id)).length;
  const medS   = medium.filter(p => solvedIds.includes(p.id)).length;
  const hardS  = hard.filter(p => solvedIds.includes(p.id)).length;
  const total  = solvedIds.length;

  const badges = [
    { icon: '🏆', title: 'First Solve',      desc: 'Solved your first problem',       unlocked: total > 0   },
    { icon: '⚡', title: 'Speed Demon',       desc: 'Fast problem solver',             unlocked: total > 5   },
    { icon: '🎯', title: '10-Problem Streak', desc: 'Solved 10 problems',              unlocked: total >= 10 },
    { icon: '⭐', title: 'Easy Master',       desc: 'Solved 10 easy problems',         unlocked: easyS >= 10 },
    { icon: '🔥', title: 'Consistent Coder',  desc: 'Maintained a 7-day streak',       unlocked: true        },
    { icon: '💎', title: 'Hard Crusher',      desc: 'Solved 3 hard problems',          unlocked: hardS >= 3  },
  ];

  const skills = [
    { name: 'Arrays & Hashing',    pct: 85, color: '#ffa116' },
    { name: 'Two Pointers',        pct: 70, color: '#00b8a3' },
    { name: 'Binary Search',       pct: 60, color: '#ffc01e' },
    { name: 'Linked List',         pct: 75, color: '#6366f1' },
    { name: 'Trees',               pct: 65, color: '#8b5cf6' },
    { name: 'Dynamic Programming', pct: 45, color: '#ff375f' },
  ];

  const card = (style?: React.CSSProperties): React.CSSProperties => ({
    background: '#282828', border: '1px solid #3d3d3d', borderRadius: '12px', ...style,
  });

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', paddingTop: '72px' }}>

      {/* Cover / Hero */}
      <div style={{ height: '120px', background: 'linear-gradient(135deg, #ffa11640, #ff375f20, #6366f140)', borderBottom: '1px solid #3d3d3d', position: 'relative' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px 40px' }}>
        {/* Avatar row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', marginBottom: '24px', marginTop: '-40px', position: 'relative', zIndex: 1 }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffa116, #ff375f)', border: '4px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, paddingBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#eff1f6' }}>{user.username}</h1>
              <span style={{ padding: '3px 10px', background: '#ffa11620', border: '1px solid #ffa11640', borderRadius: '12px', fontSize: '12px', color: '#ffa116', fontWeight: '600' }}>Top 15%</span>
            </div>
            <div style={{ color: '#8a8a8a', fontSize: '13px', marginTop: '2px' }}>{user.email}</div>
          </div>
          <button style={{ padding: '8px 16px', background: 'none', border: '1px solid #3d3d3d', borderRadius: '6px', color: '#8a8a8a', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Edit2 size={13} /> Edit Profile
          </button>
        </div>

        {/* Bio + links */}
        <div style={card({ padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8a8a8a', fontSize: '13px' }}>
            <MapPin size={14} /> India
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8a8a8a', fontSize: '13px' }}>
            <LinkIcon size={14} /> <span style={{ color: '#ffa116' }}>github.com/{user.username}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8a8a8a', fontSize: '13px' }}>
            <Calendar size={14} /> Joined Mar 2024
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <Trophy size={16} color="#ffa116" />
            <span style={{ color: '#eff1f6', fontWeight: '700', fontSize: '14px' }}>Rating: {user.rating}</span>
            <span style={{ color: '#3d3d3d' }}>|</span>
            <span style={{ color: '#8a8a8a', fontSize: '14px' }}>Rank #{user.rank}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
          {/* Left column */}
          <div>
            {/* Solved overview */}
            <div style={card({ padding: '20px', marginBottom: '20px' })}>
              <h2 style={{ margin: '0 0 16px', color: '#eff1f6', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code2 size={18} color="#ffa116" /> Solved Problems
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {/* Donut */}
                <div style={{ position: 'relative', width: '90px', height: '90px', flexShrink: 0 }}>
                  <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '90px', height: '90px' }}>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3d3d3d" strokeWidth="2.4" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ffa116" strokeWidth="2.4"
                      strokeDasharray={`${(total / problems.length) * 100} 100`} strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#eff1f6' }}>{total}</span>
                    <span style={{ fontSize: '9px', color: '#8a8a8a' }}>/ {problems.length}</span>
                  </div>
                </div>
                {/* Bars */}
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {([['Easy', easyS, easy.length] as const, ['Medium', medS, medium.length] as const, ['Hard', hardS, hard.length] as const]).map(([d, s, t]) => (
                    <div key={d}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontSize: '13px', color: diffColor[d], fontWeight: '600' }}>{d}</span>
                        <span style={{ fontSize: '13px', color: '#8a8a8a' }}>{s} / {t}</span>
                      </div>
                      <div style={{ height: '6px', background: '#3d3d3d', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${t > 0 ? (s/t)*100 : 0}%`, background: diffColor[d], borderRadius: '3px', transition: 'width 0.5s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '2px', borderBottom: '1px solid #3d3d3d', marginBottom: '16px' }}>
                {(['solved', 'submissions', 'badges'] as const).map(t => (
                  <button key={t} onClick={() => setActiveTab(t)} style={{
                    padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: activeTab === t ? '600' : '400',
                    color: activeTab === t ? '#ffa116' : '#8a8a8a', borderBottom: activeTab === t ? '2px solid #ffa116' : '2px solid transparent', marginBottom: '-1px', transition: 'color 0.15s', textTransform: 'capitalize',
                  }}>{t}</button>
                ))}
              </div>

              {/* Solved tab */}
              {activeTab === 'solved' && (
                solvedIds.length > 0
                  ? <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {problems.filter(p => solvedIds.includes(p.id)).slice(0, 8).map(p => (
                        <Link key={p.id} to={`/problem/${p.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#333', borderRadius: '6px', border: '1px solid #3d3d3d', transition: 'background 0.1s' }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#3a3a3a')}
                          onMouseLeave={e => (e.currentTarget.style.background = '#333')}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle2 size={14} color="#00b8a3" />
                            <span style={{ fontSize: '13px', color: '#eff1f6' }}>{p.title}</span>
                          </div>
                          <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', background: diffBg[p.difficulty], color: diffColor[p.difficulty] }}>{p.difficulty}</span>
                        </Link>
                      ))}
                    </div>
                  : <div style={{ textAlign: 'center', padding: '32px 0', color: '#555' }}>
                      <Code2 size={36} color="#3d3d3d" style={{ marginBottom: '8px' }} />
                      <p style={{ margin: 0, color: '#8a8a8a', fontSize: '14px' }}>No solved problems yet. <Link to="/problems" style={{ color: '#ffa116' }}>Start solving!</Link></p>
                    </div>
              )}

              {/* Submissions tab */}
              {activeTab === 'submissions' && (
                submissions.length > 0
                  ? <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {submissions.slice(0, 8).map((s: any, i: number) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#333', borderRadius: '6px' }}>
                          <div>
                            <div style={{ fontSize: '13px', color: '#eff1f6', fontWeight: '500' }}>{s.problemTitle}</div>
                            <div style={{ fontSize: '11px', color: '#8a8a8a', marginTop: '2px' }}>{s.language} · {s.time || 'recently'}</div>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: '600', color: s.status === 'Accepted' ? '#00b8a3' : '#ff375f' }}>{s.status}</span>
                        </div>
                      ))}
                    </div>
                  : <div style={{ textAlign: 'center', padding: '32px 0' }}>
                      <p style={{ margin: 0, color: '#8a8a8a', fontSize: '14px' }}>No submissions yet.</p>
                    </div>
              )}

              {/* Badges tab */}
              {activeTab === 'badges' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                  {badges.map((b, i) => (
                    <div key={i} style={{ padding: '14px', borderRadius: '8px', background: b.unlocked ? '#ffa11610' : '#333', border: `1px solid ${b.unlocked ? '#ffa11440' : '#3d3d3d'}`, opacity: b.unlocked ? 1 : 0.5, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '24px' }}>{b.icon}</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: b.unlocked ? '#eff1f6' : '#8a8a8a' }}>{b.title}</div>
                        <div style={{ fontSize: '11px', color: '#8a8a8a', marginTop: '2px' }}>{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Activity heatmap */}
            <div style={card({ padding: '20px', marginBottom: '20px' })}>
              <h2 style={{ margin: '0 0 16px', color: '#eff1f6', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} color="#ffa116" /> Activity
              </h2>
              <ActivityHeatmap />
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Stats card */}
            <div style={card({ padding: '20px', marginBottom: '16px' })}>
              <h3 style={{ margin: '0 0 14px', color: '#eff1f6', fontSize: '15px', fontWeight: '700' }}>Stats</h3>
              {[
                { label: 'Global Rank',     value: `#${user.rank}`,  color: '#ffa116', icon: <Trophy size={14} color="#ffa116" /> },
                { label: 'Rating',          value: user.rating,       color: '#eff1f6', icon: <TrendingUp size={14} color="#00b8a3" /> },
                { label: 'Current Streak',  value: '7 days 🔥',       color: '#ff6b00', icon: <Zap size={14} color="#ff6b00" /> },
                { label: 'Solutions',       value: total,             color: '#eff1f6', icon: <Target size={14} color="#8b5cf6" /> },
                { label: 'Reputation',      value: '1,250',           color: '#eff1f6', icon: <Star size={14} color="#ffc01e" /> },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #3d3d3d20' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#8a8a8a', fontSize: '13px' }}>
                    {s.icon} {s.label}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div style={card({ padding: '20px', marginBottom: '16px' })}>
              <h3 style={{ margin: '0 0 14px', color: '#eff1f6', fontSize: '15px', fontWeight: '700' }}>Skills</h3>
              {skills.map(s => (
                <div key={s.name} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '13px', color: '#eff1f6' }}>{s.name}</span>
                    <span style={{ fontSize: '12px', color: '#8a8a8a' }}>{s.pct}%</span>
                  </div>
                  <div style={{ height: '4px', background: '#3d3d3d', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: '2px', transition: 'width 0.5s' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={card({ padding: '16px 20px' })}>
              <h3 style={{ margin: '0 0 12px', color: '#eff1f6', fontSize: '15px', fontWeight: '700' }}>Links</h3>
              {[
                { icon: <Github size={15} />, label: 'GitHub', href: '#' },
                { icon: <Twitter size={15} />, label: 'Twitter', href: '#' },
                { icon: <LinkIcon size={15} />, label: 'Portfolio', href: '#' },
              ].map(l => (
                <a key={l.label} href={l.href} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', color: '#8a8a8a', fontSize: '13px', textDecoration: 'none', borderBottom: '1px solid #3d3d3d20', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffa116')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#8a8a8a')}
                >
                  {l.icon} {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
