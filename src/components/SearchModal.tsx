import React, { useEffect, useRef, useState } from 'react';
import { Search, X, BookOpen, Building2, Trophy, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const dummyResults = [
    { id: 1, type: 'Problem', title: 'Two Sum', difficulty: 'Easy', icon: <BookOpen size={14} color="#8a8a8a" />, path: '/problems/two-sum' },
    { id: 2, type: 'Company', title: 'Google', icon: <Building2 size={14} color="#8a8a8a" />, path: '/companies' },
    { id: 3, type: 'Contest', title: 'Weekly Contest 400', icon: <Trophy size={14} color="#8a8a8a" />, path: '/contests' },
    { id: 4, type: 'Daily', title: 'Valid Palindrome', icon: <Flame size={14} color="#8a8a8a" />, path: '/daily' },
  ];

  const filteredResults = query
    ? dummyResults.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
    : dummyResults;

  const handleResultClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '80px',
      }}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: '#282828',
          borderRadius: '12px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          border: '1px solid #3d3d3d',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid #3d3d3d' }}>
          <Search size={20} color="#8a8a8a" />
          <input
            autoFocus
            type="text"
            placeholder="Search problems, companies, contests..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#eff1f6',
              fontSize: '16px',
              padding: '0 16px',
              outline: 'none',
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#8a8a8a',
              display: 'flex',
              padding: '4px',
              borderRadius: '6px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3d3d3d')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '8px 0', overflowY: 'auto' }}>
          {filteredResults.length > 0 ? (
            <div style={{ padding: '8px 16px' }}>
              <div style={{ fontSize: '12px', color: '#8a8a8a', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
                {query ? 'Search Results' : 'Suggestions'}
              </div>
              {filteredResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    color: '#eff1f6',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffffff0f')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '6px', 
                      backgroundColor: '#3d3d3d', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      {result.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{result.title}</div>
                      <div style={{ fontSize: '12px', color: '#8a8a8a' }}>{result.type}</div>
                    </div>
                  </div>
                  {result.difficulty && (
                    <div style={{ 
                      fontSize: '12px', 
                      color: result.difficulty === 'Easy' ? '#00b8a3' : result.difficulty === 'Medium' ? '#ffa116' : '#ff375f',
                      backgroundColor: result.difficulty === 'Easy' ? '#00b8a320' : result.difficulty === 'Medium' ? '#ffa11620' : '#ff375f20',
                      padding: '2px 8px',
                      borderRadius: '12px',
                    }}>
                      {result.difficulty}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: '#8a8a8a' }}>
              No results found for "{query}"
            </div>
          )}
        </div>
        
        <div style={{ padding: '12px 16px', borderTop: '1px solid #3d3d3d', display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#8a8a8a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <kbd style={{ backgroundColor: '#3d3d3d', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>↵</kbd>
            <span>to select</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <kbd style={{ backgroundColor: '#282828', border: '1px solid #3d3d3d', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>esc</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
