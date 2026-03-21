import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { problems } from '../data/problemsComplete';
import { BookOpen, CheckCircle2, Circle, ChevronRight, Trophy, Target, Zap, Clock, Lock, TrendingUp, Play, Star } from 'lucide-react';

const diffColor: Record<string, string> = { Easy: '#00b8a3', Medium: '#ffc01e', Hard: '#ff375f' };
const diffBg:    Record<string, string> = { Easy: '#00b8a318', Medium: '#ffc01e18', Hard: '#ff375f18' };

const studyPlans = [
  { id: 'neetcode-75', title: 'NeetCode 75', emoji: '🎯', desc: '75 essential problems covering all important patterns', days: 30, perDay: 3, difficulty: 'Mixed', progress: 35, tag: 'Most Popular', tagColor: '#ffa116', topics: ['Arrays', 'Two Pointers', 'Stack', 'Binary Search', 'Trees', 'DP'] },
  { id: 'blind-75',    title: 'Blind 75',    emoji: '⚡', desc: 'The famous 75 questions to crack FAANG interviews',    days: 21, perDay: 4, difficulty: 'Medium-Hard', progress: 20, tag: 'Top Rated',     tagColor: '#00b8a3', topics: ['Arrays', 'Strings', 'DP', 'Graph', 'Intervals'] },
  { id: 'beginner',    title: 'DSA Beginner',emoji: '📚', desc: 'Start your coding journey with easy problems',          days: 14, perDay: 2, difficulty: 'Easy',         progress: 60, tag: 'Beginner',      tagColor: '#8b8bff', topics: ['Arrays', 'Strings', 'Math', 'Sorting'] },
  { id: 'dp-mastery',  title: 'DP Mastery',  emoji: '🧠', desc: 'Master Dynamic Programming with 50 curated problems',  days: 25, perDay: 2, difficulty: 'Hard',         progress: 10, tag: 'Advanced',      tagColor: '#ff375f', topics: ['1D DP', '2D DP', 'State Machine', 'Interval DP'] },
  { id: 'sql-50',      title: 'SQL 50',       emoji: '🗄️', desc: '50 SQL problems to master database queries',          days: 10, perDay: 5, difficulty: 'Easy-Medium',   progress: 0,  tag: 'New',          tagColor: '#ffc01e', topics: ['Select', 'Joins', 'Aggregation', 'Subquery'] },
  { id: 'interview',   title: 'Interview 150',emoji: '💼', desc: '150 must-do problems for technical interviews',        days: 45, perDay: 4, difficulty: 'Mixed',        progress: 5,  tag: 'Complete',     tagColor: '#6366f1', topics: ['All Topics'] },
];

const roadmap = [
  { name: 'Arrays & Hashing',     problems: problems.filter(p => p.category === 'Arrays & Hashing').slice(0, 7), done: true  },
  { name: 'Two Pointers',         problems: problems.filter(p => p.category === 'Two Pointers').slice(0, 5),     done: true  },
  { name: 'Sliding Window',       problems: problems.filter(p => p.category === 'Sliding Window').slice(0, 4),   done: false },
  { name: 'Stack',                problems: problems.filter(p => p.category === 'Stack').slice(0, 4),            done: false },
  { name: 'Binary Search',        problems: problems.filter(p => p.category === 'Binary Search').slice(0, 5),    done: false },
  { name: 'Linked List',          problems: [],                                                                  done: false },
  { name: 'Trees',                problems: [],                                                                  done: false },
  { name: 'Dynamic Programming',  problems: [],                                                                  done: false },
];

export default function StudyPlan() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'plans'|'roadmap'>('plans');
  const [expanded, setExpanded] = useState<string|null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', paddingTop: '72px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '800', color: '#eff1f6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={26} color="#ffa116" /> Study Plans
          </h1>
          <p style={{ margin: 0, color: '#8a8a8a', fontSize: '14px' }}>Follow structured learning paths curated by top engineers</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: '#282828', border: '1px solid #3d3d3d', borderRadius: '8px', padding: '4px', width: 'fit-content' }}>
          {(['plans', 'roadmap'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '7px 24px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: tab === t ? '700' : '500',
              background: tab === t ? '#ffa116' : 'transparent', color: tab === t ? '#1a1a1a' : '#8a8a8a', transition: 'all 0.15s', textTransform: 'capitalize',
            }}>{t === 'plans' ? '📋 Study Plans' : '🗺️ Topic Roadmap'}</button>
          ))}
        </div>

        {tab === 'plans' ? (
          <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              {[
                { icon: '📋', label: 'Plans Available', value: '6' },
                { icon: '✅', label: 'Plans Started',   value: '2' },
                { icon: '🎯', label: 'Avg Progress',    value: '28%' },
                { icon: '🔥', label: 'Problems Done',   value: '14' },
              ].map(s => (
                <div key={s.label} style={{ background: '#282828', border: '1px solid #3d3d3d', borderRadius: '10px', padding: '14px 16px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>{s.icon}</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#eff1f6' }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: '#8a8a8a' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Plans grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
              {studyPlans.map(plan => (
                <div key={plan.id} style={{ background: '#282828', border: `1px solid ${expanded === plan.id ? '#ffa11660' : '#3d3d3d'}`, borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.15s' }}
                  onClick={() => setExpanded(expanded === plan.id ? null : plan.id)}>
                  {/* Header */}
                  <div style={{ padding: '20px', borderBottom: '1px solid #3d3d3d20' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{plan.emoji}</div>
                        <div>
                          <div style={{ fontSize: '17px', fontWeight: '700', color: '#eff1f6' }}>{plan.title}</div>
                          <div style={{ fontSize: '12px', color: '#8a8a8a' }}>{plan.difficulty}</div>
                        </div>
                      </div>
                      <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', background: `${plan.tagColor}20`, color: plan.tagColor, border: `1px solid ${plan.tagColor}40`, whiteSpace: 'nowrap' }}>{plan.tag}</span>
                    </div>
                    <p style={{ margin: '0 0 14px', color: '#8a8a8a', fontSize: '13px', lineHeight: '1.5' }}>{plan.desc}</p>
                    {/* Topics */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      {plan.topics.slice(0, 4).map(t => <span key={t} style={{ padding: '2px 8px', background: '#333', border: '1px solid #3d3d3d', borderRadius: '4px', fontSize: '11px', color: '#8a8a8a' }}>{t}</span>)}
                      {plan.topics.length > 4 && <span style={{ padding: '2px 8px', background: '#333', border: '1px solid #3d3d3d', borderRadius: '4px', fontSize: '11px', color: '#555' }}>+{plan.topics.length - 4}</span>}
                    </div>
                    {/* Meta */}
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#8a8a8a', marginBottom: '14px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {plan.days} days</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Target size={12} /> {plan.perDay} problems/day</span>
                    </div>
                    {/* Progress */}
                    {plan.progress > 0 && (
                      <div style={{ marginBottom: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
                          <span style={{ color: '#8a8a8a' }}>Progress</span>
                          <span style={{ color: '#ffa116', fontWeight: '700' }}>{plan.progress}%</span>
                        </div>
                        <div style={{ height: '4px', background: '#3d3d3d', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${plan.progress}%`, background: '#ffa116', borderRadius: '2px', transition: 'width 0.5s' }} />
                        </div>
                      </div>
                    )}
                    <button onClick={e => { e.stopPropagation(); navigate('/problems'); }} style={{
                      width: '100%', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                      background: plan.progress > 0 ? 'linear-gradient(135deg, #ffa116, #ff6b00)' : '#333',
                      color: plan.progress > 0 ? '#fff' : '#8a8a8a', fontWeight: '700', fontSize: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    }}>
                      <Play size={14} /> {plan.progress > 0 ? 'Continue' : 'Start Plan'}
                    </button>
                  </div>

                  {/* Expanded problems */}
                  {expanded === plan.id && (
                    <div style={{ padding: '16px', background: '#1e1e1e', borderTop: '1px solid #3d3d3d' }}>
                      <div style={{ fontSize: '13px', color: '#8a8a8a', marginBottom: '10px' }}>Sample problems in this plan:</div>
                      {problems.slice(0, 5).map(p => (
                        <div key={p.id} onClick={e => { e.stopPropagation(); navigate(`/problem/${p.id}`); }} style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '8px 10px', borderRadius: '6px', marginBottom: '6px', cursor: 'pointer',
                          background: '#282828', border: '1px solid #3d3d3d', transition: 'background 0.1s',
                        }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                          onMouseLeave={e => (e.currentTarget.style.background = '#282828')}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Circle size={13} color="#555" />
                            <span style={{ fontSize: '13px', color: '#eff1f6' }}>{p.title}</span>
                          </div>
                          <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', background: diffBg[p.difficulty], color: diffColor[p.difficulty] }}>{p.difficulty}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Roadmap */
          <div style={{ maxWidth: '840px' }}>
            <div style={{ fontSize: '13px', color: '#8a8a8a', marginBottom: '20px', padding: '12px 16px', background: '#ffa11610', border: '1px solid #ffa11630', borderRadius: '8px' }}>
              💡 Complete topics in order — each unlocks the next. Click on a topic to see its problems.
            </div>
            {roadmap.map((topic, idx) => (
              <div key={topic.name} style={{ display: 'flex', gap: '0', marginBottom: '8px' }}>
                {/* Connector line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '16px', flexShrink: 0 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: topic.done ? 'linear-gradient(135deg, #ffa116, #ff6b00)' : idx <= 2 ? '#282828' : '#1e1e1e', border: `2px solid ${topic.done ? '#ffa116' : idx <= 2 ? '#3d3d3d' : '#2a2a2a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                    {topic.done ? <CheckCircle2 size={16} color="#fff" /> : idx <= 2 ? <span style={{ color: '#8a8a8a', fontSize: '13px', fontWeight: '700' }}>{idx + 1}</span> : <Lock size={14} color="#555" />}
                  </div>
                  {idx < roadmap.length - 1 && <div style={{ width: '2px', flex: 1, minHeight: '24px', background: topic.done ? '#ffa11640' : '#3d3d3d', marginTop: '4px' }} />}
                </div>
                {/* Card */}
                <div style={{ flex: 1, background: topic.done ? '#282828' : idx <= 2 ? '#282828' : '#1e1e1e', border: `1px solid ${topic.done ? '#ffa11640' : idx <= 2 ? '#3d3d3d' : '#2a2a2a'}`, borderRadius: '10px', padding: '14px 16px', marginBottom: idx < roadmap.length - 1 ? '8px' : 0, opacity: idx > 2 && !topic.done ? 0.5 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: topic.done ? '#ffa116' : '#eff1f6', marginBottom: '4px' }}>{topic.name}</div>
                      <div style={{ fontSize: '12px', color: '#8a8a8a' }}>{topic.problems.length > 0 ? `${topic.problems.length} problems` : 'Coming soon'}</div>
                    </div>
                    {topic.done && <CheckCircle2 size={18} color="#ffa116" />}
                    {!topic.done && idx <= 2 && <ChevronRight size={16} color="#8a8a8a" />}
                    {idx > 2 && !topic.done && <Lock size={16} color="#555" />}
                  </div>
                  {topic.problems.length > 0 && idx <= 2 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                      {topic.problems.slice(0, 4).map(p => (
                        <button key={p.id} onClick={() => navigate(`/problem/${p.id}`)} style={{
                          padding: '3px 10px', background: '#333', border: '1px solid #3d3d3d',
                          borderRadius: '4px', fontSize: '12px', color: '#8a8a8a', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '4px',
                        }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#ffa11660'; (e.currentTarget as HTMLElement).style.color = '#ffa116'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#3d3d3d'; (e.currentTarget as HTMLElement).style.color = '#8a8a8a'; }}
                        >
                          <Circle size={10} /> {p.title}
                        </button>
                      ))}
                      {topic.problems.length > 4 && <span style={{ padding: '3px 8px', fontSize: '12px', color: '#555' }}>+{topic.problems.length - 4} more</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
