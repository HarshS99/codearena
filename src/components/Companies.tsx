import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { problems } from '../data/problemsComplete';
import { Search, Building2, Briefcase, TrendingUp, ChevronRight, Star } from 'lucide-react';

export default function Companies() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // Aggregate problems by company
  const companyStats = useMemo(() => {
    const stats: Record<string, { count: number; easy: number; medium: number; hard: number; problems: any[], logoColor: string }> = {};
    
    // Assign stable colors to companies based on name length/chars
    const getLogoColor = (name: string) => {
      const colors = [
        'from-blue-500 to-cyan-500', 
        'from-red-500 to-orange-500', 
        'from-green-500 to-emerald-500', 
        'from-purple-500 to-pink-500',
        'from-yellow-500 to-amber-500',
        'from-indigo-500 to-blue-600'
      ];
      let hash = 0;
      for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
      return colors[Math.abs(hash) % colors.length];
    };

    problems.forEach(p => {
      p.companies.forEach(company => {
        if (!stats[company]) {
          stats[company] = {
            count: 0, easy: 0, medium: 0, hard: 0, problems: [], logoColor: getLogoColor(company)
          };
        }
        stats[company].count++;
        if (p.difficulty === 'Easy') stats[company].easy++;
        else if (p.difficulty === 'Medium') stats[company].medium++;
        else stats[company].hard++;
        
        // keep up to 5 problems to show as examples
        if (stats[company].problems.length < 5) {
          stats[company].problems.push(p);
        }
      });
    });

    return Object.entries(stats)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const filteredCompanies = companyStats.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: 'var(--lc-bg)', minHeight: '100vh', paddingTop: '56px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--lc-text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Building2 size={32} color="var(--lc-orange)" />
            Top Tech Companies
          </h1>
          <p style={{ color: 'var(--lc-text-muted)', fontSize: '15px' }}>
            Practice questions asked in recent interviews by top tier tech companies.
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '32px', position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--lc-text-muted)' }} />
          <input
            type="text"
            placeholder="Search companies (e.g., Google, Amazon)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '12px 16px 12px 44px',
              backgroundColor: 'var(--lc-surface)', border: '1px solid var(--lc-border)',
              borderRadius: '8px', color: 'var(--lc-text-primary)', fontSize: '14px',
              outline: 'none'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--lc-orange)'}
            onBlur={e => e.target.style.borderColor = 'var(--lc-border)'}
          />
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {filteredCompanies.map(company => (
            <div 
              key={company.name}
              style={{
                backgroundColor: 'var(--lc-surface)',
                border: selectedCompany === company.name ? '1px solid var(--lc-orange)' : '1px solid var(--lc-border)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedCompany(selectedCompany === company.name ? null : company.name)}
              onMouseEnter={e => {
                if (selectedCompany !== company.name) e.currentTarget.style.borderColor = '#4a4a4a';
              }}
              onMouseLeave={e => {
                if (selectedCompany !== company.name) e.currentTarget.style.borderColor = 'var(--lc-border)';
              }}
            >
              {/* Card Header */}
              <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: selectedCompany === company.name ? '1px solid var(--lc-border)' : 'none' }}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${company.logoColor} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                  {company.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: 'var(--lc-text-primary)', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>{company.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--lc-text-muted)', fontSize: '13px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={14} /> {company.count} Problems</span>
                  </div>
                </div>
              </div>

              {/* Stats Bar (Hidden when expanded) */}
              {selectedCompany !== company.name && (
                <div style={{ padding: '0 20px 20px 20px', display: 'flex', gap: '8px' }}>
                  {company.easy > 0 && <span style={{ color: 'var(--lc-green)', fontSize: '12px', background: '#00b8a315', padding: '2px 8px', borderRadius: '12px' }}>Easy {company.easy}</span>}
                  {company.medium > 0 && <span style={{ color: 'var(--lc-yellow)', fontSize: '12px', background: '#ffc01e15', padding: '2px 8px', borderRadius: '12px' }}>Med {company.medium}</span>}
                  {company.hard > 0 && <span style={{ color: 'var(--lc-red)', fontSize: '12px', background: '#ff375f15', padding: '2px 8px', borderRadius: '12px' }}>Hard {company.hard}</span>}
                </div>
              )}

              {/* Expanded Content */}
              {selectedCompany === company.name && (
                <div style={{ padding: '16px 20px', backgroundColor: '#ffffff03' }}>
                  <p style={{ color: 'var(--lc-text-muted)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                    Top Problems
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {company.problems.map((p, idx) => (
                      <div 
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); navigate(`/problem/${p.id}`); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '10px 12px', backgroundColor: '#ffffff05', borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ffffff0a'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff05'}
                      >
                        <span style={{ color: 'var(--lc-text-primary)', fontSize: '14px', fontWeight: '500' }}>{p.title}</span>
                        <span style={{ 
                          fontSize: '12px', fontWeight: '500',
                          color: p.difficulty === 'Easy' ? 'var(--lc-green)' : p.difficulty === 'Medium' ? 'var(--lc-yellow)' : 'var(--lc-red)'
                        }}>
                          {p.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate('/problems'); }}
                    style={{ 
                      width: '100%', marginTop: '16px', padding: '10px',
                      backgroundColor: 'var(--lc-orange)', color: '#fff',
                      border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                    }}
                  >
                    View All {company.count} Problems <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--lc-text-muted)' }}>
            <Building2 size={48} style={{ margin: '0 auto 16px auto', opacity: 0.2 }} />
            <h3 style={{ color: 'var(--lc-text-primary)', fontSize: '20px', marginBottom: '8px' }}>No companies found</h3>
            <p>We couldn't find any companies matching "{searchQuery}"</p>
          </div>
        )}

      </div>
    </div>
  );
}
