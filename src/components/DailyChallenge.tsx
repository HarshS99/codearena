import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { problems } from '../data/problemsComplete';
import { Calendar, Flame, CheckCircle2, Clock, Gift, ChevronRight, Star, Lock } from 'lucide-react';

const diffColor: Record<string, string> = { Easy: '#00b8a3', Medium: '#ffc01e', Hard: '#ff375f' };
const diffBg:    Record<string, string> = { Easy: '#00b8a318', Medium: '#ffc01e18', Hard: '#ff375f18' };

export default function DailyChallenge() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState('');
  const streak = 7;

  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const daily = problems[dayOfYear % problems.length];

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(); midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const weekDays = [
    { day: 'Mon', done: true },
    { day: 'Tue', done: true },
    { day: 'Wed', done: true },
    { day: 'Thu', done: true },
    { day: 'Fri', done: true },
    { day: 'Sat', done: true },
    { day: 'Sun', done: false, today: true },
  ];

  const streakRewards = [
    { days: 7,   reward: '🥉 Bronze Badge',  xp: 50,  earned: streak >= 7   },
    { days: 30,  reward: '🥈 Silver Badge',  xp: 200, earned: streak >= 30  },
    { days: 100, reward: '🥇 Gold Badge',    xp: 500, earned: streak >= 100 },
    { days: 365, reward: '💎 Diamond Badge', xp: 2000, earned: streak >= 365 },
  ];

  const pastChallenges = problems.slice(1, 6);

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', paddingTop: '72px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '800', color: '#eff1f6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={26} color="#ffa116" /> Daily Challenge
          </h1>
          <p style={{ margin: 0, color: '#8a8a8a', fontSize: '14px' }}>A new problem every day. Maintain your streak!</p>
        </div>

        {/* Streak bar */}
        <div style={{ background: 'linear-gradient(135deg, #ff6b0020, #ffa11620)', border: '1px solid #ffa11640', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b00, #ffa116)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={26} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#eff1f6' }}>{streak}-Day Streak! 🔥</div>
              <div style={{ fontSize: '13px', color: '#ffa116' }}>Solve today to keep it going!</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#8a8a8a', marginBottom: '2px' }}>Resets in</div>
            <div style={{ fontFamily: 'monospace', fontSize: '28px', fontWeight: '800', color: '#eff1f6', letterSpacing: '2px' }}>{timeLeft}</div>
          </div>
        </div>

        {/* Weekly strip */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', background: '#282828', border: '1px solid #3d3d3d', borderRadius: '12px', padding: '16px 20px' }}>
          {weekDays.map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ width: '100%', aspectRatio: '1', maxWidth: '48px', margin: '0 auto 6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: d.today ? 'linear-gradient(135deg, #ffa116, #ff6b00)' : d.done ? '#00b8a318' : '#333',
                border: d.today ? '2px solid #ffa116' : d.done ? '1px solid #00b8a340' : '1px solid #3d3d3d',
              }}>
                {d.done && !d.today ? <CheckCircle2 size={18} color="#00b8a3" /> : d.today ? <Star size={18} color="#fff" /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#555' }} />}
              </div>
              <span style={{ fontSize: '11px', color: d.today ? '#ffa116' : '#8a8a8a', fontWeight: d.today ? '700' : '400' }}>{d.day}</span>
            </div>
          ))}
          <div style={{ borderLeft: '1px solid #3d3d3d', paddingLeft: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '110px' }}>
            <div style={{ fontSize: '12px', color: '#8a8a8a' }}>This week</div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#00b8a3' }}>6/7 ✓</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
          {/* Today's problem */}
          <div>
            <div style={{ background: '#282828', border: '1px solid #3d3d3d', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ background: 'linear-gradient(135deg, #ffa11620, #ff375f10)', borderBottom: '1px solid #3d3d3d', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} color="#ffa116" />
                  <span style={{ color: '#eff1f6', fontWeight: '600', fontSize: '15px' }}>Today's Challenge</span>
                  <span style={{ fontSize: '12px', color: '#8a8a8a' }}>— {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: '#ffa11620', borderRadius: '20px', border: '1px solid #ffa11640' }}>
                  <Gift size={13} color="#ffa116" />
                  <span style={{ fontSize: '12px', color: '#ffa116', fontWeight: '600' }}>+50 XP Bonus</span>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ margin: '0 0 10px', fontSize: '22px', fontWeight: '800', color: '#eff1f6' }}>{daily.title}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', background: diffBg[daily.difficulty], color: diffColor[daily.difficulty] }}>{daily.difficulty}</span>
                      {daily.companies.slice(0, 3).map(c => (
                        <span key={c} style={{ padding: '2px 8px', borderRadius: '4px', background: '#333', border: '1px solid #3d3d3d', fontSize: '11px', color: '#8a8a8a' }}>{c}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#8a8a8a', flexShrink: 0 }}>
                    <Clock size={14} />
                    <span style={{ fontSize: '12px' }}>~25 min</span>
                  </div>
                </div>
                <p style={{ color: '#8a8a8a', fontSize: '14px', lineHeight: '1.7', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {daily.description}
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {daily.topics?.slice(0, 4).map(t => (
                    <span key={t} style={{ padding: '3px 10px', background: '#ffa11618', border: '1px solid #ffa11640', borderRadius: '12px', fontSize: '12px', color: '#ffa116', fontWeight: '500' }}>{t}</span>
                  ))}
                </div>
                <button onClick={() => navigate(`/problem/${daily.id}`)} style={{
                  width: '100%', padding: '13px', background: 'linear-gradient(135deg, #ffa116, #ff6b00)',
                  border: 'none', borderRadius: '8px', color: '#fff', fontSize: '15px', fontWeight: '700',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                  Start Today's Challenge <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Past challenges */}
            <div style={{ background: '#282828', border: '1px solid #3d3d3d', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #3d3d3d' }}>
                <span style={{ color: '#eff1f6', fontWeight: '600', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="#8a8a8a" /> Past Challenges
                </span>
              </div>
              {pastChallenges.map((p, i) => (
                <div key={p.id} onClick={() => navigate(`/problem/${p.id}`)} style={{
                  padding: '13px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  borderBottom: i < pastChallenges.length - 1 ? '1px solid #3d3d3d20' : 'none',
                  cursor: 'pointer', transition: 'background 0.1s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#00b8a3" />
                    <span style={{ color: '#eff1f6', fontSize: '14px' }}>{p.title}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', background: diffBg[p.difficulty], color: diffColor[p.difficulty] }}>{p.difficulty}</span>
                    <ChevronRight size={14} color="#555" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Streak rewards */}
            <div style={{ background: '#282828', border: '1px solid #3d3d3d', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #3d3d3d', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gift size={16} color="#ffa116" />
                <span style={{ color: '#eff1f6', fontWeight: '600', fontSize: '15px' }}>Streak Rewards</span>
              </div>
              <div style={{ padding: '12px' }}>
                {streakRewards.map((r, i) => (
                  <div key={i} style={{
                    padding: '12px', borderRadius: '8px', marginBottom: i < streakRewards.length - 1 ? '8px' : 0,
                    background: r.earned ? '#ffa11610' : '#333',
                    border: `1px solid ${r.earned ? '#ffa11640' : '#3d3d3d'}`,
                    opacity: r.earned ? 1 : 0.7,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: r.earned ? '#ffa116' : '#8a8a8a', marginBottom: '2px' }}>{r.reward}</div>
                      <div style={{ fontSize: '11px', color: '#8a8a8a' }}>{r.days}-day streak · +{r.xp} XP</div>
                    </div>
                    {r.earned
                      ? <CheckCircle2 size={18} color="#ffa116" />
                      : <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Lock size={13} color="#555" /><span style={{ fontSize: '11px', color: '#555' }}>{r.days - streak}d left</span></div>
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ background: '#282828', border: '1px solid #3d3d3d', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#eff1f6', marginBottom: '14px' }}>Your Stats</div>
              {[
                { label: 'Total Solved', value: 0, color: '#ffa116' },
                { label: 'Weekly Solves', value: 6, color: '#00b8a3' },
                { label: 'Best Streak',   value: 7, color: '#ff6b00' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #3d3d3d20' }}>
                  <span style={{ fontSize: '13px', color: '#8a8a8a' }}>{s.label}</span>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
