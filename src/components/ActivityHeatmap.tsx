import { useMemo } from 'react';

// Generates last 365 days of mock data + real local storage
function generateHeatmapData(submissions: any[]) {
  const dates = new Map<string, number>();
  
  // Real submissions
  submissions.forEach(s => {
    const dStr = new Date(s.timestamp || s.date || 0).toISOString().split('T')[0];
    dates.set(dStr, (dates.get(dStr) || 0) + 1);
  });

  // Mock past data to make it look active (for demo)
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const dStr = new Date(now.getTime() - i * 86400000).toISOString().split('T')[0];
    if (!dates.has(dStr)) {
      if (Math.random() > 0.6) {
        dates.set(dStr, Math.floor(Math.random() * 5) + 1); // 1 to 5 submissions
      } else {
        dates.set(dStr, 0); // Active but 0, or just empty
      }
    }
  }

  return dates;
}

export default function ActivityHeatmap({ submissions }: { submissions: any[] }) {
  const data = useMemo(() => generateHeatmapData(submissions), [submissions]);
  
  // Create 52 weeks x 7 days grid
  const grid = useMemo(() => {
    const now = new Date();
    const weeks: { date: string; count: number }[][] = Array.from({ length: 52 }, () => Array(7).fill(null));
    
    // Start from last Sunday
    let current = new Date(now);
    current.setDate(current.getDate() - current.getDay() - (51 * 7));

    for (let w = 0; w < 52; w++) {
      for (let d = 0; d < 7; d++) {
        const dStr = current.toISOString().split('T')[0];
        weeks[w][d] = { date: dStr, count: data.get(dStr) || 0 };
        current.setDate(current.getDate() + 1);
      }
    }
    return weeks;
  }, [data]);

  const getColor = (count: number) => {
    if (count === 0) return '#1e1e1e';
    if (count <= 2) return '#00b8a340';
    if (count <= 4) return '#00b8a380';
    if (count <= 6) return '#00b8a3cc';
    return '#00b8a3';
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '3px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
        {grid.map((week, wIdx) => (
          <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {week.map((day, dIdx) => (
              <div
                key={`${wIdx}-${dIdx}`}
                title={`${day.count} submissions on ${day.date}`}
                style={{
                  width: '12px', height: '12px', borderRadius: '3px',
                  background: getColor(day.count),
                  transition: 'transform 0.1s', cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginTop: '10px', fontSize: '11px', color: '#6a6a6a' }}>
        <span>Less</span>
        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#1e1e1e' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#00b8a340' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#00b8a380' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#00b8a3cc' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#00b8a3' }} />
        <span>More</span>
      </div>
    </div>
  );
}
