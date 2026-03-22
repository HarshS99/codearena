import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Lock, Crown, Code2, TrendingUp, Video, MessageSquare, BookOpen, Star, ArrowRight, Sparkles } from 'lucide-react';

const PLANS = [
  {
    id: 'monthly',
    label: 'Monthly',
    price: '₹599',
    priceUSD: '$7',
    period: '/month',
    badge: null,
    desc: 'Cancel any time',
    savings: null,
  },
  {
    id: 'annual',
    label: 'Annual',
    price: '₹3,999',
    priceUSD: '$48',
    period: '/year',
    badge: 'BEST VALUE',
    desc: 'Save 44% vs monthly',
    savings: '₹3,189',
  },
  {
    id: 'lifetime',
    label: 'Lifetime',
    price: '₹9,999',
    priceUSD: '$119',
    period: ' one-time',
    badge: 'POPULAR',
    desc: 'Pay once, use forever',
    savings: null,
  },
];

const PREMIUM_FEATURES = [
  {
    icon: <Lock size={22} color="#ffa116" />,
    title: 'All 150+ Problems Unlocked',
    desc: 'Access all problems including premium-only ones with detailed editorial solutions.',
    tag: 'Content',
  },
  {
    icon: <Video size={22} color="#00b8a3" />,
    title: 'Video Explanations',
    desc: 'Watch step-by-step video walkthroughs for every problem with time & space complexity breakdowns.',
    tag: 'Learning',
  },
  {
    icon: <Building2Icon />,
    title: 'Company-Tagged Problems',
    desc: 'See exactly which companies asked each problem in the last 6 months.',
    tag: 'Interview Prep',
  },
  {
    icon: <Code2 size={22} color="#ffc01e" />,
    title: 'AI Code Review',
    desc: 'Get instant AI-powered feedback on your solutions, with suggestions for optimization.',
    tag: 'AI',
  },
  {
    icon: <TrendingUp size={22} color="#7c3aed" />,
    title: 'Mock Interviews',
    desc: 'Practice live coding interviews with a timer, real interview prompts, and auto-grading.',
    tag: 'Interview Prep',
  },
  {
    icon: <MessageSquare size={22} color="#ec4899" />,
    title: 'Discord Priority Support',
    desc: 'Get answers in a dedicated premium channel with faster response times.',
    tag: 'Support',
  },
  {
    icon: <BookOpen size={22} color="#06b6d4" />,
    title: 'Premium Study Plans',
    desc: 'Personalized 30, 60, and 90-day interview prep roadmaps curated by ex-FAANG engineers.',
    tag: 'Learning',
  },
  {
    icon: <Star size={22} color="#f59e0b" />,
    title: 'Profile Badge & Perks',
    desc: 'Stand out with a ⭐ Premium badge on your public profile and leaderboard.',
    tag: 'Profile',
  },
];

const TESTIMONIALS = [
  { name: 'Priya S.', role: 'SDE-2 @ Google', rating: 5, text: 'Got my Google offer after 3 months of CodeArena Premium. The company-tagged problems were insanely useful.' },
  { name: 'Rahul K.', role: 'Engineer @ Amazon', rating: 5, text: 'The mock interview feature made me so much more comfortable in real interviews. 10/10.' },
  { name: 'Arjun M.', role: 'SDE @ Microsoft', rating: 5, text: 'The video explanations are incredible. Finally understood how to approach DP problems properly.' },
];

function Building2Icon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffa116" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22V12h6v10" />
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={12} color="#ffa116" fill="#ffa116" />
      ))}
    </div>
  );
}

export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const plan = PLANS.find(p => p.id === selectedPlan)!;

  const faqs = [
    { q: 'Can I cancel my subscription?', a: 'Yes, you can cancel anytime from your account settings. You\'ll retain access until the end of your billing period.' },
    { q: 'Is there a free trial?', a: 'Yes! All new users get a 7-day free trial of Premium when they first register. No credit card required.' },
    { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and PayPal. All payments are processed securely.' },
    { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time from your account settings.' },
    { q: 'Is there a student discount?', a: 'Yes! Students get 50% off with a valid .edu email address. Apply during checkout.' },
  ];

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '60px', color: '#eff1f6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Hero */}
      <div style={{ position: 'relative', textAlign: 'center', padding: '72px 20px 60px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '10%', left: '20%', width: '400px', height: '400px', background: '#ffa11608', borderRadius: '50%', filter: 'blur(120px)' }} />
          <div style={{ position: 'absolute', top: '20%', right: '20%', width: '350px', height: '350px', background: '#7c3aed08', borderRadius: '50%', filter: 'blur(100px)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffa11615', border: '1px solid #ffa11630', borderRadius: '20px', padding: '5px 14px', fontSize: '12px', fontWeight: '700', color: '#ffa116', marginBottom: '24px', letterSpacing: '0.5px' }}>
            <Crown size={12} fill="#ffa116" /> PREMIUM MEMBERSHIP
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '900', lineHeight: 1.15, marginBottom: '18px', maxWidth: '700px', margin: '0 auto 18px' }}>
            Unlock Your Full
            <span style={{ display: 'block', background: 'linear-gradient(90deg, #ffa116, #ff6b00, #ffc01e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Interview Potential
            </span>
          </h1>
          <p style={{ color: '#555', fontSize: '17px', maxWidth: '540px', margin: '0 auto 32px', lineHeight: 1.6 }}>
            Join 50,000+ developers who landed jobs at top companies using CodeArena Premium.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {[['50K+', 'Premium Members'], ['92%', 'Got Job Offers'], ['4.9', 'Avg. Rating']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '900', color: '#ffa116' }}>{val}</div>
                <div style={{ fontSize: '12px', color: '#555', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 64px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '26px', fontWeight: '800', marginBottom: '32px' }}>Choose Your Plan</h2>

        {/* Plan selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {PLANS.map(p => (
            <div
              key={p.id}
              onClick={() => setSelectedPlan(p.id)}
              style={{
                background: selectedPlan === p.id ? 'linear-gradient(135deg, #1e1200, #1a1500)' : '#111',
                border: `2px solid ${selectedPlan === p.id ? '#ffa116' : '#1e1e1e'}`,
                borderRadius: '16px', padding: '24px', cursor: 'pointer',
                transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
                boxShadow: selectedPlan === p.id ? '0 0 30px #ffa11618' : 'none',
              }}
              onMouseEnter={e => { if (selectedPlan !== p.id) e.currentTarget.style.borderColor = '#2a2a2a'; }}
              onMouseLeave={e => { if (selectedPlan !== p.id) e.currentTarget.style.borderColor = '#1e1e1e'; }}
            >
              {p.badge && (
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: p.badge === 'BEST VALUE' ? '#ffa116' : '#7c3aed', color: '#fff', fontSize: '9px', fontWeight: '900', padding: '3px 8px', borderRadius: '10px', letterSpacing: '0.5px' }}>
                  {p.badge}
                </div>
              )}
              <div style={{ fontSize: '13px', fontWeight: '700', color: selectedPlan === p.id ? '#ffa116' : '#555', marginBottom: '12px' }}>{p.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontSize: '36px', fontWeight: '900', color: '#eff1f6' }}>{p.price}</span>
                <span style={{ fontSize: '13px', color: '#445' }}>{p.period}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#555' }}>{p.priceUSD}{p.period}</div>
              {p.savings && <div style={{ marginTop: '8px', fontSize: '12px', color: '#00b8a3', fontWeight: '600' }}>Save {p.savings}</div>}
              <div style={{ marginTop: '4px', fontSize: '11px', color: '#444' }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1a1200, #150f00)', border: '1px solid #ffa11630', borderRadius: '20px', padding: '36px', textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <Crown size={28} color="#ffa116" fill="#ffa11640" />
          </div>
          <h3 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800' }}>
            {plan.label} Plan — {plan.price}<span style={{ fontSize: '14px', color: '#555', fontWeight: '400' }}>{plan.period}</span>
          </h3>
          <p style={{ margin: '0 0 24px', color: '#555', fontSize: '13px' }}>{plan.desc}</p>
          <button
            onClick={() => alert('Payment integration coming soon! 🎉')}
            style={{
              background: 'linear-gradient(135deg, #ffa116, #ff6b00)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '14px 40px', fontSize: '16px', fontWeight: '800', cursor: 'pointer',
              boxShadow: '0 4px 24px #ffa11640', transition: 'all 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Zap size={18} fill="#fff" /> Get Premium {plan.label} <ArrowRight size={16} />
          </button>
          <p style={{ margin: '16px 0 0', fontSize: '12px', color: '#444' }}>🔒 Secure payment · Cancel anytime · 7-day free trial</p>
        </div>

        {/* Comparison table */}
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '800', marginBottom: '28px' }}>Free vs Premium</h2>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', overflow: 'hidden', marginBottom: '64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px', background: '#0a0a0a', borderBottom: '1px solid #1e1e1e' }}>
            <div style={{ padding: '16px 20px', fontSize: '13px', fontWeight: '700', color: '#555' }}>FEATURE</div>
            <div style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: '#555' }}>FREE</div>
            <div style={{ padding: '16px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: '#ffa116', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <Crown size={13} fill="#ffa116" /> PREMIUM
            </div>
          </div>
          {[
            { feature: 'Problem Access', free: '50 Problems', premium: '150+ Problems' },
            { feature: 'Video Explanations', free: false, premium: true },
            { feature: 'Company-Tagged Problems', free: false, premium: true },
            { feature: 'AI Code Review', free: false, premium: true },
            { feature: 'Mock Interviews', free: false, premium: true },
            { feature: 'Premium Study Plans', free: false, premium: true },
            { feature: 'Priority Support', free: false, premium: true },
            { feature: 'Contest Rating', free: true, premium: true },
            { feature: 'Profile Badge', free: false, premium: true },
          ].map((row, i) => (
            <div key={row.feature} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px', borderBottom: i < 8 ? '1px solid #141414' : 'none', background: i % 2 === 0 ? 'transparent' : '#0d0d0d' }}>
              <div style={{ padding: '14px 20px', fontSize: '14px', color: '#aaa' }}>{row.feature}</div>
              <div style={{ padding: '14px 16px', textAlign: 'center' }}>
                {typeof row.free === 'boolean'
                  ? (row.free ? <Check size={16} color="#00b8a3" /> : <span style={{ fontSize: '18px', color: '#2a2a2a' }}>—</span>)
                  : <span style={{ fontSize: '13px', color: '#555' }}>{row.free}</span>}
              </div>
              <div style={{ padding: '14px 16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {typeof row.premium === 'boolean'
                  ? (row.premium ? <Check size={16} color="#00b8a3" /> : <span style={{ fontSize: '18px', color: '#2a2a2a' }}>—</span>)
                  : <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffa116' }}>{row.premium}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Features Grid */}
      <div style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '64px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '26px', fontWeight: '800', marginBottom: '10px' }}>Everything in Premium</h2>
          <p style={{ textAlign: 'center', color: '#555', marginBottom: '48px', fontSize: '15px' }}>Everything you need to ace your next tech interview</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {PREMIUM_FEATURES.map((f, i) => (
              <div key={i} style={{
                background: '#111', border: '1px solid #1e1e1e', borderRadius: '14px', padding: '22px',
                transition: 'border-color 0.15s, background 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.background = '#161616'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.background = '#111'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '42px', height: '42px', background: '#1a1a1a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {f.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', padding: '2px 7px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', color: '#555', fontWeight: '600', letterSpacing: '0.3px' }}>{f.tag}</span>
                    <h4 style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: '700', color: '#eff1f6' }}>{f.title}</h4>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#555', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '800', marginBottom: '40px' }}>What Our Members Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '14px', padding: '24px' }}>
              <Stars n={t.rating} />
              <p style={{ margin: '12px 0 16px', color: '#aaa', fontSize: '14px', lineHeight: 1.6, fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #ffa116, #ff6b00)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '900', color: '#fff' }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#eff1f6' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#555' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 20px 64px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '800', marginBottom: '32px' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', overflow: 'hidden' }}>
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                style={{
                  width: '100%', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#eff1f6', textAlign: 'left' }}>{faq.q}</span>
                <span style={{ fontSize: '20px', color: '#ffa116', transform: activeFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>+</span>
              </button>
              {activeFaq === i && (
                <div style={{ padding: '0 20px 18px', fontSize: '14px', color: '#666', lineHeight: 1.6 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ background: 'linear-gradient(135deg, #1a1200, #0a0a0a)', borderTop: '1px solid #1e1e1e', padding: '64px 20px', textAlign: 'center' }}>
        <Sparkles size={32} color="#ffa116" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '12px' }}>Ready to Level Up?</h2>
        <p style={{ color: '#555', marginBottom: '32px', fontSize: '15px' }}>Start your 7-day free trial, no credit card required.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => alert('Payment integration coming soon! 🎉')}
            style={{
              background: 'linear-gradient(135deg, #ffa116, #ff6b00)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '14px 36px', fontSize: '16px', fontWeight: '800', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 24px #ffa11640',
            }}
          >
            <Crown size={18} fill="#fff" /> Try Premium Free
          </button>
          <Link to="/problems" style={{
            padding: '14px 36px', borderRadius: '12px', border: '1px solid #222',
            color: '#888', textDecoration: 'none', fontSize: '15px', fontWeight: '600',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
          }}>
            Continue Free →
          </Link>
        </div>
      </div>
    </div>
  );
}
