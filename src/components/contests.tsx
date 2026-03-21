import { Calendar, Clock, Trophy, Users, TrendingUp, PlayCircle } from 'lucide-react';

export default function Contests() {
  const upcomingContests = [
    {
      id: 1,
      title: 'Weekly Contest 400',
      date: 'Sunday, March 24, 2024',
      time: '10:30 AM EST',
      duration: '1h 30m',
      participants: 18453,
      isRegistered: true
    },
    {
      id: 2,
      title: 'Biweekly Contest 130',
      date: 'Saturday, March 30, 2024',
      time: '10:30 AM EST',
      duration: '1h 30m',
      participants: 5976,
      isRegistered: false
    }
  ];

  const pastContests = [
    {
      id: 3,
      title: 'Weekly Contest 399',
      date: 'Mar 17, 2024',
      rank: '-',
      participants: 32234,
      status: 'ended'
    },
    {
      id: 4,
      title: 'Biweekly Contest 129',
      date: 'Mar 16, 2024',
      rank: '-',
      participants: 21876,
      status: 'ended'
    },
    {
      id: 5,
      title: 'Weekly Contest 398',
      date: 'Mar 10, 2024',
      rank: '-',
      participants: 30122,
      status: 'ended'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--lc-bg)', minHeight: '100vh', paddingTop: '56px' }}>
      
      {/* Hero Section */}
      <div style={{ backgroundColor: '#282828', borderBottom: '1px solid var(--lc-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-block', backgroundColor: '#ffa11620', color: 'var(--lc-orange)', padding: '6px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: '600', marginBottom: '16px' }}>
              COMING SOON
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--lc-text-primary)', marginBottom: '16px' }}>
              Weekly Contest 400
            </h1>
            <p style={{ color: 'var(--lc-text-muted)', fontSize: '16px', marginBottom: '24px', maxWidth: '600px', lineHeight: '1.6' }}>
              Compete globally with thousands of developers in our milestone 400th contest. Solve 4 challenging problems, improve your rating, and win exclusive profile badges.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--lc-text-muted)' }}>
                <Calendar size={18} /> <span>Mar 24, 2024</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--lc-text-muted)' }}>
                <Clock size={18} /> <span>10:30 AM EST</span>
              </div>
            </div>
            <button style={{
              backgroundColor: 'var(--lc-orange)', color: '#fff', fontSize: '16px', fontWeight: '600',
              padding: '12px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              transition: 'all 0.2s', boxShadow: '0 4px 14px 0 rgba(255, 161, 22, 0.39)'
            }}>
              Register Now
            </button>
          </div>
          
          <div style={{ width: '400px', backgroundColor: '#1a1a1a', borderRadius: '12px', border: '1px solid var(--lc-border)', padding: '24px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--lc-text-muted)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              Starts In
            </h3>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {[['02', 'Days'], ['14', 'Hours'], ['45', 'Mins'], ['12', 'Secs']].map(([val, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ backgroundColor: '#282828', borderRadius: '8px', padding: '12px w-16', border: '1px solid #4a4a4a', color: 'var(--lc-text-primary)', fontSize: '28px', fontWeight: '700', fontFamily: 'monospace' }}>
                    {val}
                  </div>
                  <div style={{ color: 'var(--lc-text-muted)', fontSize: '11px', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', gap: '32px' }}>
        
        {/* Main Column */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--lc-text-primary)', marginBottom: '20px' }}>Upcoming Contests</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            {upcomingContests.map(c => (
              <div key={c.id} style={{
                backgroundColor: 'var(--lc-surface)', borderRadius: '12px', border: '1px solid var(--lc-border)',
                padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'background-color 0.2s', cursor: 'pointer'
              }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#383838'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--lc-surface)'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: '#ffa11615', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Trophy size={32} color="var(--lc-orange)" />
                  </div>
                  <div>
                    <h3 style={{ color: 'var(--lc-text-primary)', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{c.title}</h3>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--lc-text-muted)', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {c.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {c.duration}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> {c.participants.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <button style={{
                  backgroundColor: c.isRegistered ? '#ffffff0a' : 'var(--lc-orange)',
                  color: c.isRegistered ? 'var(--lc-green)' : '#fff',
                  border: c.isRegistered ? '1px solid var(--lc-green)' : 'none',
                  padding: '8px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
                }}>
                  {c.isRegistered ? 'Registered' : 'Register'}
                </button>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--lc-text-primary)', marginBottom: '20px' }}>Past Contests</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pastContests.map(c => (
              <div key={c.id} style={{
                backgroundColor: 'var(--lc-bg)', borderRadius: '12px', border: '1px solid var(--lc-border)',
                padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'border-color 0.2s', cursor: 'pointer'
              }} onMouseEnter={e => e.currentTarget.style.borderColor = '#4a4a4a'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--lc-border)'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#ffffff05', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Trophy size={24} color="#5a5a5a" />
                  </div>
                  <div>
                    <h3 style={{ color: 'var(--lc-text-primary)', fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>{c.title}</h3>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--lc-text-muted)', fontSize: '13px' }}>
                      <span>{c.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> {c.participants.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <button style={{
                  backgroundColor: 'transparent', color: 'var(--lc-text-primary)', border: '1px solid var(--lc-border)',
                  padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#ffffff0a'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                  <PlayCircle size={16} /> Virtual
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '320px' }}>
          <div style={{ backgroundColor: 'var(--lc-surface)', borderRadius: '12px', border: '1px solid var(--lc-border)', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--lc-text-primary)', marginBottom: '20px' }}>My Contest Rating</h3>
            
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--lc-green)', marginBottom: '4px' }}>1500</div>
              <div style={{ fontSize: '13px', color: 'var(--lc-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <TrendingUp size={14} color="var(--lc-green)" /> Top 15%
              </div>
            </div>

            <div style={{ height: '60px', borderBottom: '1px dashed #4a4a4a', position: 'relative', marginBottom: '24px' }}>
              <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', borderBottom: '2px solid var(--lc-green)', opacity: 0.5 }}></div>
              <div style={{ position: 'absolute', bottom: '-4px', left: '50%', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--lc-green)' }}></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--lc-text-muted)' }}>
                <span>Global Ranking</span>
                <span style={{ color: 'var(--lc-text-primary)', fontWeight: '600' }}>12,453</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--lc-text-muted)' }}>
                <span>Contests Attended</span>
                <span style={{ color: 'var(--lc-text-primary)', fontWeight: '600' }}>0</span>
              </div>
            </div>
            
            <button style={{
              width: '100%', marginTop: '24px', backgroundColor: '#ffffff0a', color: 'var(--lc-text-primary)',
              padding: '10px', borderRadius: '6px', border: '1px solid var(--lc-border)', fontSize: '13px', fontWeight: '600', cursor: 'pointer'
            }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ffffff15'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff0a'}>
              View Global Ranking
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
