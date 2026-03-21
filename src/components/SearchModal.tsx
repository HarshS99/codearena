import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileCode2 } from 'lucide-react';
import { problems } from '../data/problemsComplete';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filteredProblems = problems.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.id.toString() === query ||
    p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8); // Show max 8 results

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredProblems.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredProblems[selectedIndex]) {
          navigate(`/problem/${filteredProblems[selectedIndex].id}`);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredProblems, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10vh' }}
      onClick={onClose}
    >
      <div 
        style={{ width: '100%', maxWidth: '600px', backgroundColor: 'var(--lc-surface)', borderRadius: '12px', border: '1px solid var(--lc-border)', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--lc-border)' }}>
          <Search size={20} color="var(--lc-text-muted)" style={{ marginRight: '12px' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search problems, topics, or ID..."
            style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: 'var(--lc-text-primary)', fontSize: '16px', outline: 'none' }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--lc-text-muted)', display: 'flex', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '8px', maxHeight: '400px', overflowY: 'auto' }}>
          {filteredProblems.length > 0 ? (
            filteredProblems.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => {
                  navigate(`/problem/${p.id}`);
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px',
                  borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.1s',
                  backgroundColor: selectedIndex === idx ? '#ffffff10' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileCode2 size={16} color="var(--lc-text-muted)" />
                  <span style={{ color: 'var(--lc-text-primary)', fontSize: '15px' }}>{p.id}. {p.title}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--lc-text-muted)', fontSize: '12px', padding: '2px 8px', backgroundColor: '#ffffff0a', borderRadius: '12px' }}>{p.category}</span>
                  <span style={{ 
                    fontSize: '12px', fontWeight: '500',
                    color: p.difficulty === 'Easy' ? 'var(--lc-green)' : p.difficulty === 'Medium' ? 'var(--lc-yellow)' : 'var(--lc-red)'
                  }}>
                    {p.difficulty}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--lc-text-muted)', fontSize: '15px' }}>
              No problems found matching "{query}"
            </div>
          )}
        </div>
        
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--lc-border)', backgroundColor: '#ffffff02', display: 'flex', gap: '16px', color: 'var(--lc-text-muted)', fontSize: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><kbd style={{ backgroundColor: '#ffffff10', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>↑↓</kbd> to navigate</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><kbd style={{ backgroundColor: '#ffffff10', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>Enter</kbd> to select</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><kbd style={{ backgroundColor: '#ffffff10', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}

