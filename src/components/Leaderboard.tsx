import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Trophy, TrendingUp, Medal, Flame, Globe, Users, Star } from 'lucide-react';

const allUsers = [
  { rank: 1,  username: 'code_ninja',    rating: 2850, solved: 487, streak: 45, country: 'IN', change: +12 },
  { rank: 2,  username: 'algo_master',   rating: 2720, solved: 456, streak: 30, country: 'US', change: -2  },
  { rank: 3,  username: 'dev_legend',    rating: 2650, solved: 423, streak: 22, country: 'CN', change: +5  },
  { rank: 4,  username: 'byte_warrior',  rating: 2580, solved: 398, streak: 18, country: 'US', change: 0   },
  { rank: 5,  username: 'tech_guru',     rating: 2510, solved: 375, streak: 12, country: 'KR', change: +3  },
  { rank: 6,  username: 'code_samurai',  rating: 2445, solved: 352, streak: 28, country: 'JP', change: -1  },
  { rank: 7,  username: 'pixel_knight',  rating: 2390, solved: 334, streak: 9,  country: 'DE', change: +6  },
  { rank: 8,  username: 'debug_hero',    rating: 2340, solved: 318, streak: 15, country: 'IN', change: -4  },
  { rank: 9,  username: 'stack_wizard',  rating: 2280, solved: 295, streak: 7,  country: 'UK', change: +2  },
  { rank: 10, username: 'binary_beast',  rating: 2220, solved: 276, streak: 20, country: 'BR', change: 0   },
  { rank: 11, username: 'tree_climber',  rating: 2165, solved: 258, streak: 5,  country: 'CA', change: +8  },
  { rank: 12, username: 'hash_master',   rating: 2110, solved: 242, streak: 3,  country: 'AU', change: -3  },
  { rank: 13, username: 'graph_walker',  rating: 2055, solved: 228, streak: 11, country: 'FR', change: +1  },
  { rank: 14, username: 'dp_genius',     rating: 2000, solved: 215, streak: 8,  country: 'US', change: -6  },
  { rank: 15, username: 'bit_flipper',   rating: 1945, solved: 202, streak: 6,  country: 'IN', change: +4  },
];

const rankColor = { 1: '#ffd700', 2: '#c0c0c0', 3: '#cd7f32' } as Record<number, string>;
const medalLabel = { 1: '🥇', 2: '🥈', 3: '🥉' } as Record<number, string>;

type Period = 'global' | 'weekly' | 'monthly';

export default function Leaderboard() {
  const { user } = useAuth();
  const [period, setPeriod] = useState<Period>('global');

  const data = [...allUsers];
  if (user && !data.find(u => u.username === user.username)) {
    data.push({ rank: user.rank, username: user.username, rating: user.rating, solved: user.solvedProblems, streak: 7, country: 'IN', change: 0 });
    data.sort((a, b) => a.rank - b.rank);
  }

  const podium = data.slice(0, 3);
  const rest   = data.slice(3);

  const s = (v: React.CSSProperties): React.CSSProperties => v;

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', paddingTop: '72px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '800', color: '#eff1f6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={26} color="#ffa116" /> Ranking
          </h1>
          <p style={{ margin: 0, color: '#8a8a8a', fontSize: '14px' }}>Top performers across the CodeArena community</p>
        </div>

        {/* Period tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: '#282828', borderRadius: '8px', padding: '4px', width: 'fit-content', border: '1px solid #3d3d3d' }}>
          {(['global', 'weekly', 'monthly'] as Period[]).map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding: '7px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer',
              background: period === p ? '#ffa116' : 'transparent',
              color: period === p ? '#1a1a1a' : '#8a8a8a',
              fontSize: '13px', fontWeight: period === p ? '700' : '500',
              textTransform: 'capitalize', transition: 'all 0.15s',
            }}>{p === 'global' ? '🌍 Global' : p === 'weekly' ? '📅 Weekly' : '📆 Monthly'}</button>
          ))}
        </div>

        {/* Top-3 podium */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[podium[1], podium[0], podium[2]].map((entry, i) => {
            const realRank = i === 0 ? 2 : i === 1 ? 1 : 3;
            const sizes = { 1: '80px', 2: '64px', 3: '64px' };
            return (
              <div key={entry.username} style={{
                background: '#282828', border: `1px solid ${realRank === 1 ? '#ffd70060' : realRank === 2 ? '#c0c0c060' : '#cd7f3260'}`,
                borderRadius: '12px', padding: '24px 16px', textAlign: 'center',
                transform: realRank === 1 ? 'translateY(-12px)' : 'none',
                boxShadow: realRank === 1 ? '0 8px 32px rgba(255,161,22,0.15)' : 'none',
                position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '18px' }}>{medalLabel[realRank]}</div>
                {/* Avatar */}
                <div style={{ width: sizes[realRank as keyof typeof sizes], height: sizes[realRank as keyof typeof sizes], borderRadius: '50%', background: `linear-gradient(135deg, ${rankColor[realRank]}, ${rankColor[realRank]}88)`, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${rankColor[realRank]}`, fontSize: '28px', fontWeight: '800', color: '#1a1a1a' }}>
                  {entry.username.charAt(0).toUpperCase()}
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#eff1f6', marginBottom: '4px' }}>{entry.username}</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: rankColor[realRank] }}>{entry.rating.toLocaleString()}</div>
                <div style={{ fontSize: '12px', color: '#8a8a8a', marginTop: '4px' }}>{entry.solved} solved</div>
              </div>
            );
          })}
        </div>

        {/* Stats banner */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { icon: <Users size={18} color="#ffa116" />, label: 'Registered Users', value: '52,847' },
            { icon: <Globe size={18} color="#00b8a3" />, label: 'Countries', value: '134' },
            { icon: <Flame size={18} color="#ff6b00" />, label: 'Active Today', value: '8,231' },
          ].map(s => (
            <div key={s.label} style={{ background: '#282828', border: '1px solid #3d3d3d', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', background: '#333', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#eff1f6' }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: '#8a8a8a' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Full table */}
        <div style={{ background: '#282828', border: '1px solid #3d3d3d', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #3d3d3d', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star size={16} color="#ffa116" />
            <span style={{ color: '#eff1f6', fontWeight: '600', fontSize: '15px' }}>Full Rankings</span>
            <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#8a8a8a' }}>{data.length} users</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #3d3d3d', background: '#1e1e1e' }}>
                {['Rank', 'User', 'Rating', 'Solved', 'Streak', 'Change'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', color: '#8a8a8a', fontWeight: '600', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((entry, idx) => {
                const isMe = user?.username === entry.username;
                return (
                  <tr key={entry.username} style={{
                    borderBottom: idx < data.length - 1 ? '1px solid #3d3d3d20' : 'none',
                    background: isMe ? '#ffa11610' : idx % 2 === 0 ? 'transparent' : '#ffffff04',
                    borderLeft: isMe ? '3px solid #ffa116' : '3px solid transparent',
                  }}>
                    <td style={{ padding: '13px 16px' }}>
                      {entry.rank <= 3
                        ? <span style={{ fontSize: '18px' }}>{medalLabel[entry.rank]}</span>
                        : <span style={{ color: '#8a8a8a', fontWeight: '700', fontSize: '14px' }}>#{entry.rank}</span>
                      }
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: `linear-gradient(135deg, ${isMe ? '#ffa116' : '#6366f1'}, ${isMe ? '#ff6b00' : '#8b5cf6'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', color: '#fff', flexShrink: 0 }}>
                          {entry.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ color: isMe ? '#ffa116' : '#eff1f6', fontWeight: '600', fontSize: '14px' }}>
                            {entry.username} {isMe && <span style={{ fontSize: '11px', color: '#ffa116', background: '#ffa11620', padding: '1px 6px', borderRadius: '4px', marginLeft: '4px' }}>You</span>}
                          </div>
                          <div style={{ fontSize: '11px', color: '#8a8a8a' }}>{entry.country}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <TrendingUp size={14} color="#ffa116" />
                        <span style={{ color: '#eff1f6', fontWeight: '700', fontSize: '15px' }}>{entry.rating.toLocaleString()}</span>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ color: '#8a8a8a', fontSize: '14px' }}>{entry.solved}</span>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Flame size={13} color="#ff6b00" />
                        <span style={{ color: '#ff6b00', fontSize: '13px', fontWeight: '600' }}>{entry.streak}</span>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: entry.change > 0 ? '#00b8a3' : entry.change < 0 ? '#ff375f' : '#8a8a8a' }}>
                        {entry.change > 0 ? `▲${entry.change}` : entry.change < 0 ? `▼${Math.abs(entry.change)}` : '–'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
