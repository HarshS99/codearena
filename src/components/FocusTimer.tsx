import { useState, useEffect, useRef } from 'react';
import { Timer, Pause, Play, RotateCcw, Coffee, Settings, X, Minus, Plus } from 'lucide-react';

type Mode = 'focus' | 'short' | 'long';

const MODE_DEFAULTS: Record<Mode, { label: string; duration: number; color: string }> = {
  focus: { label: 'Focus', duration: 25 * 60, color: '#ffa116' },
  short: { label: 'Short Break', duration: 5 * 60, color: '#00b8a3' },
  long:  { label: 'Long Break', duration: 15 * 60, color: '#7c3aed' },
};

function pad(n: number) { return String(n).padStart(2, '0'); }

export default function FocusTimer() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [mode, setMode] = useState<Mode>('focus');
  const [secondsLeft, setSecondsLeft] = useState(MODE_DEFAULTS.focus.duration);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [focusMins, setFocusMins] = useState(25);
  const [shortMins, setShortMins] = useState(5);
  const [longMins, setLongMins] = useState(15);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const m = MODE_DEFAULTS[mode];
  const totalSeconds = {
    focus: focusMins * 60,
    short: shortMins * 60,
    long: longMins * 60,
  }[mode];

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            setRunning(false);
            if (mode === 'focus') setSessions(n => n + 1);
            // Auto-notify
            if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
              new Notification(`CodeArena — ${MODE_DEFAULTS[mode].label} complete! 🎉`);
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode]);

  const changeMode = (m: Mode) => {
    setMode(m);
    setRunning(false);
    const d = { focus: focusMins * 60, short: shortMins * 60, long: longMins * 60 }[m];
    setSecondsLeft(d);
  };

  const reset = () => {
    setRunning(false);
    setSecondsLeft(totalSeconds);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;
  const circumference = 2 * Math.PI * 40; // r=40

  const requestNotifPermission = () => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  return (
    <>
      {/* Toggle button (above chatbot) */}
      <button
        onClick={() => { setOpen(!open); setMinimized(false); requestNotifPermission(); }}
        id="focus-timer-toggle"
        style={{
          position: 'fixed', bottom: '84px', right: '24px', zIndex: 997,
          width: '44px', height: '44px', borderRadius: '50%',
          background: running ? `linear-gradient(135deg, ${m.color}, ${m.color}aa)` : '#1a1a1a',
          border: `1.5px solid ${running ? m.color : '#2a2a2a'}`,
          cursor: 'pointer', boxShadow: running ? `0 4px 20px ${m.color}50` : '0 2px 8px rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.25s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        title="Focus Timer"
      >
        <Timer size={18} color={running ? '#fff' : m.color} />
        {running && (
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            width: '14px', height: '14px', borderRadius: '50%', background: '#ff375f',
            fontSize: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700',
          }}>●</span>
        )}
      </button>

      {/* Timer panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '140px', right: '24px', zIndex: 996,
          width: '280px', background: '#111', border: '1px solid #222',
          borderRadius: '18px', boxShadow: '0 12px 48px rgba(0,0,0,0.7)',
          overflow: 'hidden',
          maxHeight: minimized ? '52px' : '420px',
          transition: 'max-height 0.3s ease',
          animation: 'timerSlideIn 0.2s ease-out',
        }}>
          <style>{`@keyframes timerSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>

          {/* Header */}
          <div style={{ padding: '14px 16px', background: '#141414', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Timer size={16} color={m.color} />
              <span style={{ color: '#eff1f6', fontWeight: '700', fontSize: '14px' }}>Focus Timer</span>
              {sessions > 0 && <span style={{ fontSize: '11px', background: '#ffa11620', color: '#ffa116', padding: '1px 7px', borderRadius: '10px', fontWeight: '600' }}>×{sessions}</span>}
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => setShowSettings(!showSettings)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: showSettings ? m.color : '#555', padding: '4px', display: 'flex' }}>
                <Settings size={14} />
              </button>
              <button onClick={() => setMinimized(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: '4px', display: 'flex' }}>
                <Minus size={14} />
              </button>
              <button onClick={() => { setOpen(false); setRunning(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: '4px', display: 'flex' }}>
                <X size={14} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {showSettings ? (
                <div style={{ padding: '16px' }}>
                  <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#666', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Durations (minutes)</p>
                  {([['Focus', focusMins, setFocusMins, 5, 90], ['Short Break', shortMins, setShortMins, 1, 30], ['Long Break', longMins, setLongMins, 5, 60]] as const).map(([label, val, setter, min, max]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontSize: '13px', color: '#aaa' }}>{label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={() => { const nv = Math.max(min, val - 1); setter(nv); if(mode === ['focus','short','long'][[label === 'Focus', label === 'Short Break', label === 'Long Break'].indexOf(true)]) setSecondsLeft(nv * 60); }}
                          style={{ width: '24px', height: '24px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '6px', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: '#eff1f6', minWidth: '28px', textAlign: 'center' }}>{val}</span>
                        <button onClick={() => { const nv = Math.min(max, val + 1); setter(nv); if(mode === ['focus','short','long'][[label === 'Focus', label === 'Short Break', label === 'Long Break'].indexOf(true)]) setSecondsLeft(nv * 60); }}
                          style={{ width: '24px', height: '24px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '6px', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setShowSettings(false)} style={{ width: '100%', marginTop: '8px', padding: '8px', background: m.color, border: 'none', borderRadius: '8px', color: '#000', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                    Save & Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Mode tabs */}
                  <div style={{ display: 'flex', padding: '10px 12px', gap: '6px', background: '#0d0d0d' }}>
                    {(['focus', 'short', 'long'] as Mode[]).map(mod => (
                      <button key={mod} onClick={() => changeMode(mod)} style={{
                        flex: 1, padding: '6px 4px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '700', transition: 'all 0.15s',
                        background: mode === mod ? MODE_DEFAULTS[mod].color + '25' : 'transparent',
                        color: mode === mod ? MODE_DEFAULTS[mod].color : '#555',
                      }}>
                        {MODE_DEFAULTS[mod].label}
                      </button>
                    ))}
                  </div>

                  {/* Circle timer */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 16px' }}>
                    <div style={{ position: 'relative', width: '140px', height: '140px', marginBottom: '20px' }}>
                      <svg width="140" height="140" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e1e1e" strokeWidth="6" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke={m.color} strokeWidth="6"
                          strokeDasharray={`${(progress / 100) * circumference} ${circumference}`}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dasharray 0.5s linear' }}
                        />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '30px', fontWeight: '900', color: '#eff1f6', fontFamily: 'monospace', letterSpacing: '-1px' }}>
                          {pad(minutes)}:{pad(seconds)}
                        </span>
                        <span style={{ fontSize: '11px', color: m.color, fontWeight: '600', marginTop: '2px' }}>{m.label}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button onClick={reset} style={{ width: '36px', height: '36px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', transition: 'all 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#eff1f6'}
                        onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                        <RotateCcw size={14} />
                      </button>
                      <button onClick={() => setRunning(r => !r)} style={{
                        width: '52px', height: '52px', background: m.color,
                        border: 'none', borderRadius: '50%', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 4px 16px ${m.color}50`, transition: 'all 0.15s',
                      }}>
                        {running ? <Pause size={20} color="#fff" fill="#fff" /> : <Play size={20} color="#fff" fill="#fff" style={{ marginLeft: '2px' }} />}
                      </button>
                      <button onClick={() => changeMode(mode === 'focus' ? 'short' : 'focus')} style={{ width: '36px', height: '36px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', transition: 'all 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#00b8a3'}
                        onMouseLeave={e => e.currentTarget.style.color = '#555'}
                        title="Take a break">
                        <Coffee size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Sessions */}
                  <div style={{ padding: '10px 16px 16px', display: 'flex', justifyContent: 'center', gap: '6px' }}>
                    {Array.from({ length: Math.max(4, sessions + 1) }).map((_, i) => (
                      <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: i < sessions ? m.color : '#1e1e1e', border: `1px solid ${i < sessions ? m.color : '#2a2a2a'}` }} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
