import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { problems, getAllCategories, getAllCompanies } from '../data/problemsComplete';
import { CheckCircle2, Circle, Search, ChevronDown, Dices } from 'lucide-react';

const diffColor: Record<string, string> = { Easy: '#00b8a3', Medium: '#ffc01e', Hard: '#ff375f' };
const diffBg:    Record<string, string> = { Easy: '#00b8a318', Medium: '#ffc01e18', Hard: '#ff375f18' };

export default function ProblemList() {
  const [search, setSearch]     = useState('');
  const [diff, setDiff]         = useState('All');
  const [cat, setCat]           = useState('All');
  const [company, setCompany]   = useState('All');
  const [activeTab, setActiveTab] = useState<'all'|'easy'|'medium'|'hard'>('all');
  const navigate = useNavigate();

  const solved: number[] = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
  const cats      = ['All', ...getAllCategories()];
  const companies = ['All', ...getAllCompanies()];

  const filtered = problems.filter(p => {
    const q = search.toLowerCase();
    const matchSearch  = p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.companies.some(c => c.toLowerCase().includes(q));
    const matchDiff    = diff === 'All' || p.difficulty === diff;
    const matchCat     = cat === 'All' || p.category === cat;
    const matchCompany = company === 'All' || p.companies.includes(company);
    const matchTab     = activeTab === 'all' || p.difficulty.toLowerCase() === activeTab;
    return matchSearch && matchDiff && matchCat && matchCompany && matchTab;
  });

  const easyCnt  = problems.filter(p => p.difficulty === 'Easy').length;
  const medCnt   = problems.filter(p => p.difficulty === 'Medium').length;
  const hardCnt  = problems.filter(p => p.difficulty === 'Hard').length;
  const solvedE  = solved.filter(id => problems.find(p => p.id === id)?.difficulty === 'Easy').length;
  const solvedM  = solved.filter(id => problems.find(p => p.id === id)?.difficulty === 'Medium').length;
  const solvedH  = solved.filter(id => problems.find(p => p.id === id)?.difficulty === 'Hard').length;

  const sel = (v: string, cur: string): React.CSSProperties => ({
    padding: '7px 12px', background: '#333', border: `1px solid ${v !== cur ? '#3d3d3d' : '#ffa116'}`,
    borderRadius: '6px', color: v !== cur ? '#8a8a8a' : '#ffa116', fontSize: '13px',
    cursor: 'pointer', appearance: 'none', outline: 'none', paddingRight: '28px',
  } as React.CSSProperties);

  // Global "R" shortcut for Random Problem
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't trigger if user is typing
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === 'r' || e.key === 'R') {
        const pList = filtered.length > 0 ? filtered : problems;
        const rand = pList[Math.floor(Math.random() * pList.length)];
        navigate(`/problem/${rand.id}`);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filtered, navigate]);

  const pickRandom = () => {
    const pList = filtered.length > 0 ? filtered : problems;
    const rand = pList[Math.floor(Math.random() * pList.length)];
    navigate(`/problem/${rand.id}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', paddingTop: '72px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px' }}>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Easy', solved: solvedE, total: easyCnt, color: '#00b8a3', bg: '#00b8a318' },
            { label: 'Medium', solved: solvedM, total: medCnt, color: '#ffc01e', bg: '#ffc01e18' },
            { label: 'Hard', solved: solvedH, total: hardCnt, color: '#ff375f', bg: '#ff375f18' },
            { label: 'Total Solved', solved: solved.length, total: problems.length, color: '#ffa116', bg: '#ffa11618' },
          ].map(s => (
            <div key={s.label} style={{ background: '#282828', border: '1px solid #3d3d3d', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '12px', color: '#8a8a8a', marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: s.color }}>{s.solved}<span style={{ fontSize: '13px', color: '#8a8a8a', fontWeight: '400' }}>/{s.total}</span></div>
              <div style={{ marginTop: '8px', height: '3px', background: '#3d3d3d', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${s.total > 0 ? (s.solved/s.total)*100 : 0}%`, background: s.color, borderRadius: '2px', transition: 'width 0.4s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Filters row */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
            <Search size={15} color="#8a8a8a" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search problems, companies..."
              style={{ width: '100%', padding: '8px 14px 8px 34px', background: '#282828', border: '1px solid #3d3d3d', borderRadius: '6px', color: '#eff1f6', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Selects */}
          {[
            { value: diff, setter: setDiff, options: ['All', 'Easy', 'Medium', 'Hard'], label: 'All Difficulties' },
            { value: cat, setter: setCat, options: cats, label: 'All Topics' },
            { value: company, setter: setCompany, options: companies, label: 'All Companies' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <select value={s.value} onChange={e => s.setter(e.target.value)} style={sel(s.value, 'All') as any}>
                {s.options.map(o => <option key={o} value={o}>{o === 'All' ? s.label : o}</option>)}
              </select>
              <ChevronDown size={13} color="#8a8a8a" style={{ position: 'absolute', right: '9px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          ))}

          {(diff !== 'All' || cat !== 'All' || company !== 'All' || search) && (
            <button onClick={() => { setDiff('All'); setCat('All'); setCompany('All'); setSearch(''); }}
              style={{ padding: '7px 12px', background: 'none', border: '1px solid #3d3d3d', borderRadius: '6px', color: '#8a8a8a', fontSize: '13px', cursor: 'pointer' }}>
              Reset
            </button>
          )}

          <div style={{ flex: 1 }} />

          <button onClick={pickRandom} style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px',
            background: '#ffa116', color: '#1a1a1a', border: 'none', borderRadius: '6px',
            fontWeight: '700', fontSize: '13px', cursor: 'pointer', transition: 'opacity 0.2s',
          }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <Dices size={15} /> Pick Random
          </button>
        </div>

        {/* Difficulty tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', borderBottom: '1px solid #3d3d3d', paddingBottom: '0' }}>
          {(['all', 'easy', 'medium', 'hard'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding: '8px 18px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '14px', fontWeight: '500', textTransform: 'capitalize',
              color: activeTab === t ? '#ffa116' : '#8a8a8a',
              borderBottom: activeTab === t ? '2px solid #ffa116' : '2px solid transparent',
              marginBottom: '-1px', transition: 'color 0.15s',
            }}>{t === 'all' ? `All (${problems.length})` : `${t.charAt(0).toUpperCase()+t.slice(1)} (${t==='easy'?easyCnt:t==='medium'?medCnt:hardCnt})`}</button>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: '13px', color: '#8a8a8a', alignSelf: 'center', paddingRight: '8px' }}>
            Showing {filtered.length} of {problems.length}
          </span>
        </div>

        {/* Table */}
        <div style={{ background: '#282828', border: '1px solid #3d3d3d', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #3d3d3d' }}>
                {['Status', 'Title', 'Solution', 'Acceptance', 'Difficulty'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '12px', color: '#8a8a8a', fontWeight: '600', letterSpacing: '0.05em', background: '#1e1e1e', whiteSpace: 'nowrap',
                    display: h === 'Solution' ? 'none' : 'table-cell',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => {
                const isSolved = solved.includes(p.id);
                return (
                  <tr key={p.id} style={{
                    borderBottom: idx < filtered.length - 1 ? '1px solid #3d3d3d20' : 'none',
                    background: idx % 2 === 0 ? 'transparent' : '#ffffff04',
                    transition: 'background 0.1s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#ffa11608')}
                    onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? 'transparent' : '#ffffff04')}
                  >
                    {/* Status */}
                    <td style={{ padding: '13px 16px', width: '48px' }}>
                      {isSolved
                        ? <CheckCircle2 size={16} color="#00b8a3" />
                        : <Circle size={16} color="#3d3d3d" />}
                    </td>
                    {/* Title */}
                    <td style={{ padding: '13px 16px' }}>
                      <Link to={`/problem/${p.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#8a8a8a', fontSize: '13px', minWidth: '30px' }}>{p.id}.</span>
                        <span style={{ color: '#eff1f6', fontSize: '14px', fontWeight: '500', transition: 'color 0.15s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#ffa116')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#eff1f6')}
                        >{p.title}</span>
                        {/* Topic tags */}
                        <div style={{ display: 'flex', gap: '4px', marginLeft: '4px', flexWrap: 'wrap' }}>
                          {p.topics?.slice(0, 2).map((t: string) => (
                            <span key={t} style={{ padding: '1px 6px', background: '#333', border: '1px solid #3d3d3d', borderRadius: '4px', fontSize: '11px', color: '#8a8a8a' }}>{t}</span>
                          ))}
                        </div>
                      </Link>
                    </td>
                    {/* Acceptance */}
                    <td style={{ padding: '13px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '13px', color: '#8a8a8a' }}>{p.acceptance}%</span>
                    </td>
                    {/* Difficulty */}
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', background: diffBg[p.difficulty], color: diffColor[p.difficulty] }}>
                        {p.difficulty}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div style={{ padding: '64px', textAlign: 'center' }}>
              <Search size={36} color="#3d3d3d" style={{ marginBottom: '12px' }} />
              <p style={{ margin: 0, color: '#eff1f6', fontSize: '16px', fontWeight: '600' }}>No problems found</p>
              <p style={{ margin: '6px 0 0', color: '#8a8a8a', fontSize: '13px' }}>Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Company tags */}
        <div style={{ marginTop: '24px', background: '#282828', border: '1px solid #3d3d3d', borderRadius: '10px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 14px', color: '#eff1f6', fontSize: '15px', fontWeight: '600' }}>Popular Companies</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Bloomberg', 'Adobe', 'Uber', 'Netflix', 'Goldman Sachs'].map(c => {
              const cnt = problems.filter(p => p.companies.includes(c)).length;
              const active = company === c;
              return (
                <button key={c} onClick={() => setCompany(active ? 'All' : c)} style={{
                  padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '500',
                  background: active ? '#ffa11620' : '#333', border: `1px solid ${active ? '#ffa11660' : '#3d3d3d'}`,
                  color: active ? '#ffa116' : '#8a8a8a', cursor: 'pointer', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  {c}
                  <span style={{ fontSize: '11px', padding: '1px 6px', background: active ? '#ffa11640' : '#3d3d3d', borderRadius: '4px', color: active ? '#ffa116' : '#555' }}>{cnt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
