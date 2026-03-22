import { useEffect } from 'react';
import { X, Command } from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const SHORTCUTS: Shortcut[] = [
  // Navigation
  { keys: ['G', 'H'], description: 'Go to Dashboard', category: 'Navigation' },
  { keys: ['G', 'P'], description: 'Go to Problems', category: 'Navigation' },
  { keys: ['G', 'C'], description: 'Go to Contests', category: 'Navigation' },
  { keys: ['G', 'L'], description: 'Go to Leaderboard', category: 'Navigation' },
  { keys: ['G', 'D'], description: 'Go to Daily Challenge', category: 'Navigation' },
  { keys: ['G', 'S'], description: 'Go to Study Plan', category: 'Navigation' },
  // Global
  { keys: ['⌘', 'K'], description: 'Open Search', category: 'Global' },
  { keys: ['?'], description: 'Show Keyboard Shortcuts', category: 'Global' },
  { keys: ['Esc'], description: 'Close dialogs / modals', category: 'Global' },
  // Problem Editor
  { keys: ['⌘', 'Enter'], description: 'Run code', category: 'Code Editor' },
  { keys: ['⌘', 'Shift', 'Enter'], description: 'Submit code', category: 'Code Editor' },
  { keys: ['⌘', '/'], description: 'Toggle comment', category: 'Code Editor' },
  { keys: ['⌘', 'Z'], description: 'Undo', category: 'Code Editor' },
  { keys: ['⌘', 'Shift', 'Z'], description: 'Redo', category: 'Code Editor' },
  { keys: ['Tab'], description: 'Indent code', category: 'Code Editor' },
  // Problems List
  { keys: ['R'], description: 'Random problem', category: 'Problems List' },
  { keys: ['F'], description: 'Toggle filters', category: 'Problems List' },
];

const CATEGORIES = [...new Set(SHORTCUTS.map(s => s.category))];

function Kbd({ children }: { children: string }) {
  return (
    <kbd style={{
      padding: '3px 8px', background: '#1e1e1e', border: '1px solid #333',
      borderBottomWidth: '2px', borderRadius: '5px', fontSize: '12px',
      fontFamily: 'monospace', color: '#eff1f6', display: 'inline-block',
    }}>
      {children}
    </kbd>
  );
}

export default function KeyboardShortcuts({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 990, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(6px)', padding: '20px',
      animation: 'fadeIn 0.15s ease-out',
    }} onClick={onClose}>
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <div style={{
        background: '#111', border: '1px solid #222', borderRadius: '18px',
        width: '100%', maxWidth: '680px', maxHeight: '85vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        animation: 'slideUp 0.18s ease-out',
        boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
      }} onClick={e => e.stopPropagation()}>
        <style>{`@keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }`}</style>

        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', background: '#ffa11620', border: '1px solid #ffa11640', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Command size={18} color="#ffa116" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#eff1f6' }}>Keyboard Shortcuts</h2>
              <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>Press <Kbd>?</Kbd> anywhere to open this</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Shortcuts grid */}
        <div style={{ overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {CATEGORIES.map(cat => (
            <div key={cat}>
              <h3 style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '700', color: '#ffa116', letterSpacing: '1px', textTransform: 'uppercase' }}>{cat}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {SHORTCUTS.filter(s => s.category === cat).map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', background: '#141414', borderRadius: '8px', gap: '12px',
                  }}>
                    <span style={{ fontSize: '14px', color: '#aaa' }}>{s.description}</span>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexShrink: 0 }}>
                      {s.keys.map((k, j) => (
                        <span key={j} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Kbd>{k}</Kbd>
                          {j < s.keys.length - 1 && <span style={{ color: '#444', fontSize: '11px' }}>+</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '14px 24px', borderTop: '1px solid #1e1e1e', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#444' }}>Press <Kbd>Esc</Kbd> to close</p>
        </div>
      </div>
    </div>
  );
}
