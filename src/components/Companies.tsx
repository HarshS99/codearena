import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { problems } from '../data/problemsComplete';
import { Search, Building2, ChevronRight, TrendingUp, Star } from 'lucide-react';

const diffColor: Record<string, string> = { Easy: '#00b8a3', Medium: '#ffc01e', Hard: '#ff375f' };
const diffBg:    Record<string, string> = { Easy: '#00b8a318', Medium: '#ffc01e18', Hard: '#ff375f18' };

interface CompanyInfo {
  name: string;
  logo: string;
  color: string;
  tier: 'FAANG' | 'Top' | 'Mid';
  description: string;
  focus: string[];
}

const COMPANY_INFO: CompanyInfo[] = [
  { name: 'Google',        logo: 'G',  color: '#4285F4', tier: 'FAANG', description: 'Search, Cloud, AI/ML', focus: ['Algorithms', 'System Design', 'Math'] },
  { name: 'Amazon',        logo: 'A',  color: '#FF9900', tier: 'FAANG', description: 'E-commerce, AWS, Alexa', focus: ['Arrays', 'OOP', 'Distributed Systems'] },
  { name: 'Meta',          logo: 'M',  color: '#0866FF', tier: 'FAANG', description: 'Social, VR/AR, AI', focus: ['Graphs', 'Trees', 'Dynamic Programming'] },
  { name: 'Apple',         logo: '🍎', color: '#555',    tier: 'FAANG', description: 'Hardware, iOS, macOS', focus: ['System Design', 'Algorithms', 'C++'] },
  { name: 'Microsoft',     logo: 'MS', color: '#00A4EF', tier: 'FAANG', description: 'Azure, Office, Xbox', focus: ['Data Structures', 'OOP', 'SQL'] },
  { name: 'Netflix',       logo: 'N',  color: '#E50914', tier: 'Top',   description: 'Streaming, Recommendations', focus: ['Distributed Systems', 'Algorithms'] },
  { name: 'Bloomberg',     logo: 'BB', color: '#F2741D', tier: 'Top',   description: 'Finance, Analytics', focus: ['Arrays', 'Strings', 'Trees'] },
  { name: 'Adobe',         logo: 'Ad', color: '#FF0000', tier: 'Top',   description: 'Creative Cloud, PDFs', focus: ['Graphs', 'DP', 'Strings'] },
  { name: 'Uber',          logo: 'Ub', color: '#000',    tier: 'Top',   description: 'Ride-sharing, Delivery', focus: ['Geospatial', 'Graphs', 'System Design'] },
  { name: 'Goldman Sachs', logo: 'GS', color: '#7BC4E2', tier: 'Mid',   description: 'Finance, Trading', focus: ['Math', 'DP', 'Probability'] },
  { name: 'LinkedIn',      logo: 'Li', color: '#0077B5', tier: 'Mid',   description: 'Professional Network', focus: ['Graphs', 'Sorting', 'Search'] },
  { name: 'Oracle',        logo: 'Or', color: '#F80000', tier: 'Mid',   description: 'Database, Cloud', focus: ['SQL', 'Trees', 'System Design'] },
];

function CompanyCard({
  info, problemCount, easyCount, medCount, hardCount, isSelected, onClick,
}: {
  info: CompanyInfo; problemCount: number; easyCount: number; medCount: number; hardCount: number;
  isSelected: boolean; onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isSelected ? '#1e1e1e' : '#141414',
        border: `1px solid ${isSelected ? info.color + '60' : '#222'}`,
        borderRadius: '14px', padding: '20px', cursor: 'pointer',
        transition: 'all 0.2s', boxShadow: isSelected ? `0 0 20px ${info.color}20` : 'none',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.background = '#181818'; } }}
      onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.background = '#141414'; } }}
    >
      {isSelected && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: info.color, borderRadius: '14px 0 0 14px' }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '10px',
          background: info.color + '20', border: `1px solid ${info.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: info.logo.length === 1 ? '18px' : '12px', fontWeight: '900', color: info.color,
        }}>
          {info.logo}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h3 style={{ margin: 0, color: '#eff1f6', fontSize: '15px', fontWeight: '700' }}>{info.name}</h3>
            {info.tier === 'FAANG' && (
              <span style={{ fontSize: '9px', padding: '1px 6px', background: '#ffa11620', border: '1px solid #ffa11640', borderRadius: '10px', color: '#ffa116', fontWeight: '700', letterSpacing: '0.5px' }}>
                FAANG
              </span>
            )}
          </div>
          <p style={{ margin: 0, fontSize: '11px', color: '#555' }}>{info.description}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#eff1f6' }}>{problemCount}</div>
          <div style={{ fontSize: '10px', color: '#555' }}>problems</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        {[['Easy', easyCount, '#00b8a3'], ['Medium', medCount, '#ffc01e'], ['Hard', hardCount, '#ff375f']].map(([label, count, color]) => (
          <div key={label as string} style={{ flex: 1, padding: '6px 8px', background: `${color}10`, borderRadius: '6px', border: `1px solid ${color}25`, textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: color as string }}>{count as number}</div>
            <div style={{ fontSize: '10px', color: '#555' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Companies() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('All');
  const [companySearch, setCompanySearch] = useState('');
  const [tier, setTier] = useState<'All' | 'FAANG' | 'Top' | 'Mid'>('All');

  const solved: number[] = JSON.parse(localStorage.getItem('solvedProblems') || '[]');

  const companiesWithCounts = useMemo(() => {
    return COMPANY_INFO.map(info => {
      const companyProblems = problems.filter(p => p.companies.includes(info.name));
      return {
        info,
        total: companyProblems.length,
        easy: companyProblems.filter(p => p.difficulty === 'Easy').length,
        medium: companyProblems.filter(p => p.difficulty === 'Medium').length,
        hard: companyProblems.filter(p => p.difficulty === 'Hard').length,
      };
    }).sort((a, b) => b.total - a.total);
  }, []);

  const filteredCompanies = companiesWithCounts.filter(c => {
    const matchSearch = c.info.name.toLowerCase().includes(companySearch.toLowerCase());
    const matchTier = tier === 'All' || c.info.tier === tier;
    return matchSearch && matchTier;
  });

  const companyProblems = useMemo(() => {
    if (!selectedCompany) return [];
    return problems.filter(p => {
      const matchCompany = p.companies.includes(selectedCompany);
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
      const matchDiff = diffFilter === 'All' || p.difficulty === diffFilter;
      return matchCompany && matchSearch && matchDiff;
    });
  }, [selectedCompany, search, diffFilter]);

  const selectedInfo = selectedCompany ? COMPANY_INFO.find(c => c.name === selectedCompany) : null;

  // Trending / most asked overall
  const trendingProblems = useMemo(() => {
    return [...problems].sort((a, b) => b.companies.length - a.companies.length).slice(0, 5);
  }, []);

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', paddingTop: '60px', color: '#eff1f6' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(180deg,#1a1a1a,#0f0f0f)', borderBottom: '1px solid #1e1e1e', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <Building2 size={28} color="#ffa116" />
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '900' }}>Company-wise Problems</h1>
          </div>
          <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
            Practice problems asked in real interviews at top tech companies. Filter by company, difficulty, and topic.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>

        {/* Left: Company List */}
        <div style={{ width: '340px', flexShrink: 0 }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '160px' }}>
              <Search size={13} color="#555" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                value={companySearch} onChange={e => setCompanySearch(e.target.value)}
                placeholder="Search companies..."
                style={{ width: '100%', padding: '8px 10px 8px 30px', background: '#1a1a1a', border: '1px solid #222', borderRadius: '8px', color: '#eff1f6', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {(['All', 'FAANG', 'Top', 'Mid'] as const).map(t => (
              <button key={t} onClick={() => setTier(t)} style={{
                padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none',
                background: tier === t ? '#ffa116' : '#1a1a1a', color: tier === t ? '#000' : '#666',
                transition: 'all 0.15s',
              }}>{t}</button>
            ))}
          </div>

          {/* Company cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            {filteredCompanies.map(({ info, total, easy, medium, hard }) => (
              <CompanyCard
                key={info.name}
                info={info}
                problemCount={total}
                easyCount={easy}
                medCount={medium}
                hardCount={hard}
                isSelected={selectedCompany === info.name}
                onClick={() => {
                  setSelectedCompany(prev => prev === info.name ? null : info.name);
                  setSearch('');
                  setDiffFilter('All');
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: Problem list or default */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {selectedCompany && selectedInfo ? (
            <div>
              {/* Company header */}
              <div style={{
                background: '#141414', border: `1px solid ${selectedInfo.color}30`,
                borderRadius: '14px', padding: '20px 24px', marginBottom: '20px',
                boxShadow: `0 0 30px ${selectedInfo.color}10`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: selectedInfo.color + '20', border: `1px solid ${selectedInfo.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: selectedInfo.logo.length === 1 ? '22px' : '14px', fontWeight: '900', color: selectedInfo.color }}>
                    {selectedInfo.logo}
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '900' }}>{selectedInfo.name}</h2>
                    <p style={{ margin: 0, color: '#555', fontSize: '13px' }}>{selectedInfo.description}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedInfo.focus.map(f => (
                    <span key={f} style={{ padding: '4px 12px', background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: '20px', fontSize: '12px', color: '#888' }}>{f}</span>
                  ))}
                </div>
              </div>

              {/* Filters for problems */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
                  <Search size={13} color="#555" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search problems..."
                    style={{ width: '100%', padding: '9px 10px 9px 30px', background: '#1a1a1a', border: '1px solid #222', borderRadius: '8px', color: '#eff1f6', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                    <button key={d} onClick={() => setDiffFilter(d)} style={{
                      padding: '8px 14px', borderRadius: '8px', cursor: 'pointer',
                      fontSize: '13px', fontWeight: '600', transition: 'all 0.15s',
                      background: diffFilter === d ? (diffColor[d] || '#ffa116') + '20' : '#1a1a1a',
                      color: diffFilter === d ? (diffColor[d] || '#ffa116') : '#555',
                      border: `1px solid ${diffFilter === d ? (diffColor[d] || '#ffa116') + '50' : '#222'}`,
                    }}>{d}</button>
                  ))}
                </div>
              </div>

              <div style={{ color: '#555', fontSize: '12px', marginBottom: '12px' }}>
                Showing {companyProblems.length} problems from {selectedCompany}
              </div>

              {/* Problem table */}
              <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: '12px', overflow: 'hidden' }}>
                {companyProblems.length === 0 ? (
                  <div style={{ padding: '48px', textAlign: 'center' }}>
                    <Search size={32} color="#2a2a2a" style={{ marginBottom: '12px' }} />
                    <p style={{ margin: 0, color: '#555' }}>No problems found</p>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                        {['#', 'Problem', 'Acceptance', 'Difficulty', 'Frequency'].map(h => (
                          <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', color: '#444', fontWeight: '700', letterSpacing: '0.5px', background: '#111' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {companyProblems.map((p, i) => {
                        const isSolved = solved.includes(p.id);
                        const freq = Math.max(30, 100 - p.id * 2 + p.companies.length * 5); // simulated frequency
                        return (
                          <tr key={p.id}
                            style={{ borderBottom: i < companyProblems.length - 1 ? '1px solid #1a1a1a' : 'none', transition: 'background 0.1s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <td style={{ padding: '12px 16px', fontSize: '12px', color: '#444' }}>{p.id}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <Link to={`/problem/${p.id}`} style={{ textDecoration: 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{
                                    width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                                    background: isSolved ? '#00b8a3' : '#2a2a2a'
                                  }} />
                                  <span style={{ color: isSolved ? '#00b8a3' : '#eff1f6', fontSize: '14px', fontWeight: '500' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ffa116'}
                                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = isSolved ? '#00b8a3' : '#eff1f6'}
                                  >{p.title}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '4px', marginTop: '4px', marginLeft: '14px', flexWrap: 'wrap' }}>
                                  {p.topics.slice(0, 2).map(t => (
                                    <span key={t} style={{ fontSize: '10px', padding: '1px 6px', background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: '4px', color: '#555' }}>{t}</span>
                                  ))}
                                </div>
                              </Link>
                            </td>
                            <td style={{ padding: '12px 16px', fontSize: '13px', color: '#555' }}>{p.acceptance}%</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span style={{ padding: '3px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', background: diffBg[p.difficulty], color: diffColor[p.difficulty] }}>
                                {p.difficulty}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ height: '4px', width: '80px', background: '#1e1e1e', borderRadius: '2px', overflow: 'hidden' }}>
                                  <div style={{ height: '100%', width: `${Math.min(freq, 100)}%`, background: freq > 70 ? '#ffa116' : freq > 40 ? '#ffc01e' : '#555', borderRadius: '2px' }} />
                                </div>
                                <span style={{ fontSize: '11px', color: '#555' }}>{freq > 70 ? 'High' : freq > 40 ? 'Med' : 'Low'}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            /* Default: trending + pick a company */
            <div>
              {/* Trending problems */}
              <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 18px', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={16} color="#ffa116" /> Most Asked Across All Companies
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {trendingProblems.map((p, i) => (
                    <Link key={p.id} to={`/problem/${p.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 14px', background: '#111', borderRadius: '10px', border: '1px solid #1e1e1e', transition: 'border-color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#ffa11640'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e1e'}
                      >
                        <span style={{ fontSize: '18px', fontWeight: '900', color: i < 3 ? '#ffa116' : '#2a2a2a', minWidth: '28px' }}>#{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, color: '#eff1f6', fontSize: '14px', fontWeight: '600' }}>{p.title}</p>
                          <p style={{ margin: '2px 0 0', color: '#555', fontSize: '11px' }}>{p.companies.length} companies · {p.category}</p>
                        </div>
                        <span style={{ padding: '3px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', background: diffBg[p.difficulty], color: diffColor[p.difficulty], whiteSpace: 'nowrap' }}>
                          {p.difficulty}
                        </span>
                        <ChevronRight size={14} color="#333" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Company stats overview */}
              <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: '14px', padding: '24px' }}>
                <h3 style={{ margin: '0 0 18px', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Star size={16} color="#ffa116" /> Company Leaderboard
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {companiesWithCounts.slice(0, 8).map(({ info, total, easy, medium, hard }, i) => (
                    <div key={info.name}
                      onClick={() => { setSelectedCompany(info.name); setSearch(''); setDiffFilter('All'); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 14px', background: '#111', borderRadius: '10px', border: '1px solid #1e1e1e', cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = info.color + '50'; e.currentTarget.style.background = '#181818'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.background = '#111'; }}
                    >
                      <span style={{ fontSize: '14px', fontWeight: '900', color: i < 3 ? '#ffa116' : '#333', minWidth: '24px' }}>#{i + 1}</span>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: info.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: info.logo.length === 1 ? '16px' : '10px', fontWeight: '900', color: info.color, flexShrink: 0 }}>
                        {info.logo}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, color: '#eff1f6', fontSize: '14px', fontWeight: '600' }}>{info.name}</p>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '3px' }}>
                          {[['E', easy, '#00b8a3'], ['M', medium, '#ffc01e'], ['H', hard, '#ff375f']].map(([l, c, col]) => (
                            <span key={l as string} style={{ fontSize: '11px', color: col as string }}>{l}: {c}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#eff1f6' }}>{total}</span>
                        <p style={{ margin: 0, fontSize: '10px', color: '#555' }}>problems</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA: pick a company */}
              <div style={{ marginTop: '20px', padding: '24px', background: 'linear-gradient(135deg, #ffa11612, #ff375f08)', border: '1px solid #ffa11625', borderRadius: '14px', textAlign: 'center' }}>
                <Building2 size={28} color="#ffa116" style={{ marginBottom: '10px' }} />
                <p style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: '700', color: '#eff1f6' }}>Select a company to see its interview problems</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>Click any company card on the left to filter problems by company</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
