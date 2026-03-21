import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Zap, Video, Building2, TerminalSquare, HeartHandshake } from 'lucide-react';

export default function Premium() {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(true);

  const benefits = [
    { icon: <Building2 className="text-orange-500" size={24} />, title: "Company Questions", desc: "Target your studying to exactly what top companies are asking." },
    { icon: <Video className="text-blue-500" size={24} />, title: "Video Solutions", desc: "Premium highly-produced video explanations for thousands of questions." },
    { icon: <TerminalSquare className="text-green-500" size={24} />, title: "Mock Assessments", desc: "Simulate real online assessments with time limits and exact formats." },
    { icon: <Zap className="text-yellow-500" size={24} />, title: "Lightning Fast Judge", desc: "Premium users get priority queueing on our execution servers." },
  ];

  return (
    <div style={{ backgroundColor: 'var(--lc-bg)', minHeight: '100vh', paddingTop: '56px', paddingBottom: '80px' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#131313', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,161,22,0.15) 0%, rgba(26,26,26,0) 70%)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,192,30,0.1) 0%, rgba(26,26,26,0) 70%)', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffa11615', color: 'var(--lc-yellow)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>
            <Star size={14} fill="var(--lc-yellow)" /> LEVEL UP YOUR CAREER
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#fff', marginBottom: '24px', lineHeight: '1.2' }}>
            Get Hired Faster with <br/><span style={{ color: 'var(--lc-orange)' }}>CodeArena Premium</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--lc-text-muted)', marginBottom: '40px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Join over 2 million developers who have turbocharged their interview preparation with exclusive company questions, video solutions, and mock assessments.
          </p>

          {/* Pricing Toggle */}
          <div style={{ display: 'inline-flex', backgroundColor: '#282828', padding: '6px', borderRadius: '12px', marginBottom: '40px', border: '1px solid var(--lc-border)' }}>
            <button 
              onClick={() => setIsYearly(false)}
              style={{ padding: '10px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: !isYearly ? '#383838' : 'transparent', color: !isYearly ? '#fff' : 'var(--lc-text-muted)' }}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              style={{ padding: '10px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: isYearly ? '#383838' : 'transparent', color: isYearly ? '#fff' : 'var(--lc-text-muted)' }}
            >
              Yearly <span style={{ color: 'var(--lc-green)', fontSize: '12px', marginLeft: '6px' }}>Save 40%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div style={{ maxWidth: '1000px', margin: '-40px auto 80px auto', display: 'flex', gap: '24px', padding: '0 20px', position: 'relative', zIndex: 2, alignItems: 'stretch' }}>
        
        {/* Basic Plan */}
        <div style={{ flex: 1, backgroundColor: 'var(--lc-surface)', borderRadius: '16px', border: '1px solid var(--lc-border)', padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '20px', color: 'var(--lc-text-primary)', fontWeight: '600', marginBottom: '8px' }}>Basic</h3>
          <p style={{ color: 'var(--lc-text-muted)', fontSize: '14px', marginBottom: '24px' }}>Essential features to start your coding journey.</p>
          <div style={{ fontSize: '40px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>$0<span style={{ fontSize: '16px', color: 'var(--lc-text-muted)', fontWeight: '500' }}>/mo</span></div>
          <p style={{ color: 'var(--lc-text-muted)', fontSize: '13px', marginBottom: '32px' }}>Free forever</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', flex: 1 }}>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--lc-text-primary)', fontSize: '15px' }}><Check size={18} color="var(--lc-green)" /> 3000+ public questions</div>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--lc-text-primary)', fontSize: '15px' }}><Check size={18} color="var(--lc-green)" /> Participate in Contests</div>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--lc-text-primary)', fontSize: '15px' }}><Check size={18} color="var(--lc-green)" /> Basic study plans</div>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--lc-text-muted)', fontSize: '15px', opacity: 0.5 }}>✓ No Company tags</div>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--lc-text-muted)', fontSize: '15px', opacity: 0.5 }}>✓ No Video solutions</div>
          </div>

          <button style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--lc-border)', backgroundColor: 'transparent', color: 'var(--lc-text-primary)', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }} onClick={() => navigate('/problems')}>
            Get Started
          </button>
        </div>

        {/* Premium Plan */}
        <div style={{ flex: 1.1, backgroundColor: 'var(--lc-surface)', borderRadius: '16px', border: '2px solid var(--lc-orange)', padding: '40px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 20px 40px -10px rgba(255, 161, 22, 0.15)' }}>
          <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--lc-orange)', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={14} fill="#fff" /> MOST POPULAR
          </div>
          <h3 style={{ fontSize: '20px', color: 'var(--lc-orange)', fontWeight: '600', marginBottom: '8px' }}>Premium</h3>
          <p style={{ color: 'var(--lc-text-muted)', fontSize: '14px', marginBottom: '24px' }}>Everything you need to ace your tech interviews.</p>
          <div style={{ fontSize: '40px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
            ${isYearly ? '15' : '25'}<span style={{ fontSize: '16px', color: 'var(--lc-text-muted)', fontWeight: '500' }}>/mo</span>
          </div>
          <p style={{ color: 'var(--lc-text-muted)', fontSize: '13px', marginBottom: '32px' }}>Billed {isYearly ? 'annually ($180/yr)' : 'monthly'}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', flex: 1 }}>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--lc-text-primary)', fontSize: '15px', fontWeight: '500' }}><Check size={18} color="var(--lc-orange)" /> Everything in Basic</div>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--lc-text-primary)', fontSize: '15px', fontWeight: '500' }}><Check size={18} color="var(--lc-orange)" /> Target companies by frequency</div>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--lc-text-primary)', fontSize: '15px', fontWeight: '500' }}><Check size={18} color="var(--lc-orange)" /> Exclusive Premium solutions</div>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--lc-text-primary)', fontSize: '15px', fontWeight: '500' }}><Check size={18} color="var(--lc-orange)" /> Mock Assessments (OA & Phone)</div>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--lc-text-primary)', fontSize: '15px', fontWeight: '500' }}><Check size={18} color="var(--lc-orange)" /> Lightning fast judgement</div>
          </div>

          <button style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--lc-orange)', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 14px 0 rgba(255, 161, 22, 0.39)' }}>
            Subscribe Now
          </button>
        </div>

      </div>

      {/* Benefits Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '700', color: 'var(--lc-text-primary)', marginBottom: '48px' }}>Exclusive Premium Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ backgroundColor: '#ffffff03', borderRadius: '16px', padding: '32px', border: '1px solid var(--lc-border)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#ffffff08', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                {b.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--lc-text-primary)', marginBottom: '12px' }}>{b.title}</h3>
              <p style={{ color: 'var(--lc-text-muted)', fontSize: '15px', lineHeight: '1.6' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
