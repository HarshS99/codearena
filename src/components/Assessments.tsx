import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, PlayCircle, Trophy, Target, Building2, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Assessments() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const assessments = [
    {
      id: 'google-oa',
      company: 'Google',
      title: 'Google Online Assessment',
      duration: '90 Min',
      questions: 2,
      difficulty: 'Hard',
      logoColor: 'from-blue-500 to-cyan-500',
      isPremium: false,
      completed: false
    },
    {
      id: 'amazon-oa',
      company: 'Amazon',
      title: 'Amazon SDE Assessment',
      duration: '120 Min',
      questions: 2,
      difficulty: 'Medium',
      logoColor: 'from-red-500 to-orange-500',
      isPremium: true,
      completed: false
    },
    {
      id: 'meta-oa',
      company: 'Meta',
      title: 'Meta Hacker Cup Prep',
      duration: '75 Min',
      questions: 4,
      difficulty: 'Hard',
      logoColor: 'from-blue-600 to-indigo-600',
      isPremium: true,
      completed: true
    },
    {
      id: 'microsoft-oa',
      company: 'Microsoft',
      title: 'Microsoft Codility Assessment',
      duration: '110 Min',
      questions: 3,
      difficulty: 'Medium',
      logoColor: 'from-green-500 to-emerald-500',
      isPremium: false,
      completed: false
    }
  ];

  const handleStart = (isPremium: boolean) => {
    // If we had a real premium state, we'd check it here. For now we route to premium or problem list.
    if (isPremium) {
      navigate('/premium');
    } else {
      // Mock starting an assessment by going to the first problem
      navigate('/problem/1');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--lc-bg)', minHeight: '100vh', paddingTop: '56px' }}>
      
      {/* Hero Section */}
      <div style={{ backgroundColor: '#282828', borderBottom: '1px solid var(--lc-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--lc-text-primary)', marginBottom: '16px' }}>
              Interview Assessments
            </h1>
            <p style={{ color: 'var(--lc-text-muted)', fontSize: '16px', marginBottom: '24px', maxWidth: '600px', lineHeight: '1.6' }}>
              Experience real online assessments from top tech companies. Practice under time constraints and get a realistic estimate of your interview readiness.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={() => navigate('/companies')}
                style={{
                  backgroundColor: 'var(--lc-surface)', color: 'var(--lc-text-primary)', fontSize: '15px', fontWeight: '600',
                  padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--lc-border)', cursor: 'pointer',
                  transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffffff0a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--lc-surface)'}
              >
                <Building2 size={18} /> View Companies
              </button>
            </div>
          </div>
          
          <div style={{ width: '300px', backgroundColor: 'var(--lc-surface)', borderRadius: '12px', padding: '24px', textAlign: 'center', border: '1px solid var(--lc-border)' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: '#ffa11615', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Target size={32} color="var(--lc-orange)" />
            </div>
            <h3 style={{ color: 'var(--lc-text-primary)', fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Your Readiness</h3>
            <p style={{ color: 'var(--lc-text-muted)', fontSize: '14px', marginBottom: '16px' }}>Complete 5 assessments to unlock your readiness score.</p>
            <div style={{ height: '6px', backgroundColor: '#383838', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '20%', height: '100%', backgroundColor: 'var(--lc-orange)' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--lc-text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={20} color="var(--lc-yellow)" /> Featured Assessments
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {assessments.map(c => (
             <div 
               key={c.id}
               style={{
                 backgroundColor: 'var(--lc-surface)', borderRadius: '12px', border: '1px solid var(--lc-border)',
                 padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column'
               }}
             >
               {c.isPremium && (
                 <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: '#ffc01e20', color: 'var(--lc-yellow)', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                   <Lock size={12} /> Premium
                 </div>
               )}
               {c.completed && (
                 <div style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--lc-green)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '500' }}>
                   <CheckCircle2 size={16} /> Completed
                 </div>
               )}

               <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                 <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.logoColor} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                   {c.company.charAt(0)}
                 </div>
                 <div>
                   <h3 style={{ color: 'var(--lc-text-primary)', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>{c.title}</h3>
                   <span style={{ color: 'var(--lc-text-muted)', fontSize: '13px' }}>{c.company}</span>
                 </div>
               </div>

               <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flex: 1 }}>
                 <div style={{ backgroundColor: '#ffffff05', padding: '10px 16px', borderRadius: '8px', flex: 1 }}>
                   <span style={{ color: 'var(--lc-text-muted)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Questions</span>
                   <span style={{ color: 'var(--lc-text-primary)', fontSize: '16px', fontWeight: '600' }}>{c.questions}</span>
                 </div>
                 <div style={{ backgroundColor: '#ffffff05', padding: '10px 16px', borderRadius: '8px', flex: 1 }}>
                   <span style={{ color: 'var(--lc-text-muted)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Duration</span>
                   <span style={{ color: 'var(--lc-text-primary)', fontSize: '16px', fontWeight: '600' }}>{c.duration}</span>
                 </div>
               </div>

               <button 
                 onClick={() => handleStart(c.isPremium)}
                 style={{
                   width: '100%', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '15px',
                   cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s',
                   backgroundColor: c.completed ? '#ffffff0a' : (c.isPremium ? 'var(--lc-yellow)' : 'var(--lc-orange)'),
                   color: c.completed ? 'var(--lc-text-primary)' : (c.isPremium ? '#000' : '#fff'),
                   border: c.completed ? '1px solid var(--lc-border)' : 'none'
                 }}
                 onMouseEnter={e => {
                   if (c.completed) e.currentTarget.style.backgroundColor = '#ffffff15';
                   else e.currentTarget.style.opacity = '0.9';
                 }}
                 onMouseLeave={e => {
                   if (c.completed) e.currentTarget.style.backgroundColor = '#ffffff0a';
                   else e.currentTarget.style.opacity = '1';
                 }}
               >
                 {c.completed ? 'Review Results' : (c.isPremium ? <><Lock size={16} /> Unlock Premium</> : <><PlayCircle size={18} /> Start Attempt</>)}
               </button>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
