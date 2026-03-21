import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { problems } from '../data/problemsComplete';
import { useAuth } from '../context/AuthContext';
import {
  Bookmark,
  Search,
  Filter,
  PlayCircle,
  X,
  List,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function Bookmarks() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [solvedIds, setSolvedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  useEffect(() => {
    if (user && token) {
      const fetchData = async () => {
        try {
          const res = await fetch('http://localhost:5001/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setBookmarkedIds(data.bookmarks?.map(Number) || []);
            setSolvedIds(data.solvedProblems?.map(Number) || []);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
  }, [user, token]);

  const bookmarkedProblems = useMemo(() => {
    return problems.filter(p => bookmarkedIds.includes(p.id));
  }, [bookmarkedIds]);

  const filteredProblems = bookmarkedProblems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || problem.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const removeBookmark = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    
    // Optimistic UI updates
    const newBookmarks = bookmarkedIds.filter(b => b !== id);
    setBookmarkedIds(newBookmarks);
    
    if (user && token) {
      try {
        await fetch('http://localhost:5001/api/data/bookmark', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ problemId: id.toString() })
        });
      } catch (err) {
        console.error(err);
        // rollback on error
        setBookmarkedIds(bookmarkedIds);
      }
    }
  };

  const easyCount = bookmarkedProblems.filter(p => p.difficulty === 'Easy').length;
  const medCount = bookmarkedProblems.filter(p => p.difficulty === 'Medium').length;
  const hardCount = bookmarkedProblems.filter(p => p.difficulty === 'Hard').length;
  const completedCount = bookmarkedProblems.filter(p => solvedIds.includes(p.id)).length;
  const progress = bookmarkedProblems.length > 0 ? (completedCount / bookmarkedProblems.length) * 100 : 0;

  return (
    <div style={{ backgroundColor: 'var(--lc-bg)', minHeight: '100vh', paddingTop: '56px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px', display: 'flex', gap: '24px' }}>
        
        {/* Left Sidebar (List Details) */}
        <div style={{ width: '300px', flexShrink: 0 }}>
          <div style={{ backgroundColor: 'var(--lc-surface)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--lc-border)' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--lc-border)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--lc-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Bookmark size={32} color="#fff" fill="#fff" />
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--lc-text-primary)', marginBottom: '8px' }}>Favorite</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--lc-text-muted)', fontSize: '13px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'demo'}`} style={{ width: '16px', height: '16px', borderRadius: '50%' }} alt="avatar"/> {user?.username}</div>
                <span>•</span>
                <span>{bookmarkedProblems.length} questions</span>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <button 
                  onClick={() => filteredProblems.length > 0 && navigate(`/problem/${filteredProblems[0].id}`)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    backgroundColor: 'var(--lc-orange)', color: '#fff', border: 'none', borderRadius: '8px',
                    padding: '8px 0', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'opacity 0.2s', opacity: filteredProblems.length > 0 ? 1 : 0.5
                  }}
                  disabled={filteredProblems.length === 0}
                >
                  <PlayCircle size={16} /> Practice
                </button>
              </div>

              {/* Progress */}
              <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--lc-text-primary)', fontSize: '14px', fontWeight: '600' }}>Progress</span>
                <span style={{ color: 'var(--lc-text-muted)', fontSize: '12px' }}>{completedCount} / {bookmarkedProblems.length}</span>
              </div>
              <div style={{ height: '6px', backgroundColor: '#383838', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, backgroundColor: 'var(--lc-green)', borderRadius: '4px', transition: 'width 0.3s ease' }} />
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--lc-text-primary)', marginBottom: '16px' }}>Difficulty Count</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--lc-text-muted)', fontSize: '13px' }}>Easy</span>
                  <span style={{ color: 'var(--lc-text-primary)', fontSize: '13px', fontWeight: '600' }}>{easyCount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--lc-text-muted)', fontSize: '13px' }}>Medium</span>
                  <span style={{ color: 'var(--lc-text-primary)', fontSize: '13px', fontWeight: '600' }}>{medCount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--lc-text-muted)', fontSize: '13px' }}>Hard</span>
                  <span style={{ color: 'var(--lc-text-primary)', fontSize: '13px', fontWeight: '600' }}>{hardCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content (Problem List) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Controls */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--lc-text-muted)' }} />
              <input
                type="text"
                placeholder="Search questions"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '8px 12px 8px 36px',
                  backgroundColor: 'var(--lc-surface)', border: '1px solid var(--lc-border)',
                  borderRadius: '6px', color: 'var(--lc-text-primary)', fontSize: '14px',
                  outline: 'none'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--lc-orange)'}
                onBlur={e => e.target.style.borderColor = 'var(--lc-border)'}
              />
            </div>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              style={{
                backgroundColor: 'var(--lc-surface)', border: '1px solid var(--lc-border)',
                borderRadius: '6px', color: 'var(--lc-text-primary)', fontSize: '14px',
                padding: '8px 16px', outline: 'none', cursor: 'pointer'
              }}
            >
              <option value="all">Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Table */}
          <div style={{ backgroundColor: 'var(--lc-surface)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 100px 120px 40px', gap: '16px', padding: '12px 16px', borderBottom: '1px solid var(--lc-border)', color: 'var(--lc-text-muted)', fontSize: '13px', fontWeight: '600' }}>
              <div>Status</div>
              <div>Title</div>
              <div>Difficulty</div>
              <div>Acceptance</div>
              <div></div>
            </div>
            
            {filteredProblems.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredProblems.map((p, index) => {
                  const isSolved = solvedIds.includes(p.id);
                  const isEven = index % 2 === 0;
                  return (
                    <div 
                      key={p.id}
                      onClick={() => navigate(`/problem/${p.id}`)}
                      style={{ 
                        display: 'grid', gridTemplateColumns: '40px 1fr 100px 120px 40px', gap: '16px', 
                        padding: '12px 16px', backgroundColor: isEven ? 'transparent' : '#ffffff03',
                        cursor: 'pointer', transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ffffff08'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = isEven ? 'transparent' : '#ffffff03'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {isSolved ? <CheckCircle2 size={18} color="var(--lc-green)" /> : <div style={{ width: '18px' }} />}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
                        <span style={{ color: 'var(--lc-text-primary)', fontSize: '14px', fontWeight: '500' }}>
                          {p.id}. {p.title}
                        </span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <span style={{ backgroundColor: '#ffffff10', padding: '2px 6px', borderRadius: '10px', fontSize: '11px', color: 'var(--lc-text-muted)' }}>
                            {p.category}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ 
                          fontSize: '13px', fontWeight: '500',
                          color: p.difficulty === 'Easy' ? 'var(--lc-green)' : p.difficulty === 'Medium' ? 'var(--lc-yellow)' : 'var(--lc-red)'
                        }}>
                          {p.difficulty}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', color: 'var(--lc-text-primary)', fontSize: '13px' }}>
                        {p.acceptance}%
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={(e) => removeBookmark(e, p.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--lc-text-muted)', padding: '4px' }}
                          title="Remove from Favorite"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--lc-text-muted)' }}>
                <List size={40} style={{ margin: '0 auto 16px auto', opacity: 0.3 }} />
                <p>No questions found in this list.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
