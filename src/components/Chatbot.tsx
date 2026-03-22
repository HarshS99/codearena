import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, RefreshCw, ChevronDown, Minimize2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: string;
}

const now = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

// Quick-reply suggestion chips
const QUICK_REPLIES = [
  'How do I get started?',
  'Which problems to solve first?',
  'How does rating work?',
  'What is Premium?',
  'Contest schedule?',
];

// Knowledge base — keyword-match responses
const KB: { patterns: RegExp[]; answer: string | null }[] = [
  {
    patterns: [/get started|beginner|start|new|first step/i],
    answer: `🚀 **Getting started is easy!**\n\n1. Go to **Problems** and sort by Easy\n2. Start with **Two Sum**, **Valid Parentheses**, **Reverse a Linked List**\n3. Aim for 2–3 problems per day\n4. Use the **Study Plan** page for a guided roadmap!\n\nWant me to recommend a beginner path?`,
  },
  {
    patterns: [/which problem|first problem|recommend|suggest/i],
    answer: `📚 **Recommended starter problems:**\n\n**Easy**\n• Two Sum (Array)\n• Valid Palindrome (Strings)\n• Best Time to Buy & Sell Stock\n\n**Then move to Medium:**\n• 3Sum, Longest Substring Without Repeating Chars\n\nAlso check out the **Study Plan** page for a structured 30-day roadmap! 🗺️`,
  },
  {
    patterns: [/rating|rank|ranking|score|how.*rated/i],
    answer: `🏆 **Rating System:**\n\nYour rating changes based on contest performance:\n• Win a contest → gain +50 to +150 rating\n• Lose or DNF → lose some rating\n• Rating starts at **1200** for all new users\n\nYou can see your current rating and global rank on your **Profile** page. The top 5% of users get a special 🥇 badge!`,
  },
  {
    patterns: [/premium|subscription|price|plan|pay|cost|upgrade/i],
    answer: `💎 **CodeArena Premium includes:**\n\n• All 150+ problems unlocked\n• Video explanations for every problem\n• Company-tagged questions (last 6 months)\n• AI code review & suggestions\n• Mock interview timer mode\n• Premium study plans\n• Priority Discord support\n\nPlans start at **₹599/month**. Check out the [Premium page](/premium) for details! 🎯`,
  },
  {
    patterns: [/contest|schedule|when.*contest|next contest|weekly/i],
    answer: `🗓️ **Contest Schedule:**\n\n• **Weekly Contest** → Every **Sunday at 8:00 AM IST**\n• **Biweekly Contest** → Every **other Saturday at 8:00 PM IST**\n\nContests last 90 minutes with 4 problems each. Your rating changes based on how you perform compared to others.\n\nVisit the **Contest** page to register and see live countdowns! 🔥`,
  },
  {
    patterns: [/company|google|amazon|meta|apple|microsoft|faang|interview/i],
    answer: `🏢 **Company-wise Prep:**\n\nVisit the **Companies** page to:\n• Filter problems asked by Google, Amazon, Meta, Apple, Microsoft, and more\n• See problem frequency (High/Med/Low)\n• Filter by difficulty (Easy/Medium/Hard)\n\n**Top FAANG topics:**\n• Google: Algorithms, Math, System Design\n• Amazon: Arrays, OOP, Distributed Systems\n• Meta: Graphs, Trees, Dynamic Programming`,
  },
  {
    patterns: [/streak|daily|challenge|day/i],
    answer: `🔥 **Daily Challenges & Streaks:**\n\n• A new problem is added every day on the **Daily** page\n• Solving it extends your 🔥 streak\n• Streaks appear on your profile and leaderboard\n\nTip: Solve the daily problem first thing in the morning to keep your streak going! Your current streak shows in the top navbar.`,
  },
  {
    patterns: [/study plan|roadmap|learning path|syllabus|curriculum/i],
    answer: `📖 **Study Plans available:**\n\n• **Blind 75** — The classic 75 must-solve problems\n• **NeetCode 150** — Extended version with harder problems  \n• **Top Interview 150** — Curated for FAANG interviews\n• **30-Day Beginner** — For those just starting out\n\nVisit the **Study Plan** page to pick your path and track progress!`,
  },
  {
    patterns: [/bookmark|save|saved|favorite|favourite/i],
    answer: `🔖 **Bookmarks:**\n\nYou can bookmark any problem by clicking the bookmark icon while solving it. Access all your saved problems from the **Bookmarks** section in your profile dropdown.\n\nBookmarks sync across sessions so you never lose your saved problems!`,
  },
  {
    patterns: [/leaderboard|top user|rank.*user|best.*user/i],
    answer: `🏅 **Leaderboard:**\n\nThe **Leaderboard** page shows:\n• Top users by contest rating\n• Problems solved count\n• Active streak\n• Country ranking\n\nYour rank updates after each contest. Compete weekly to climb the global leaderboard! 🌍`,
  },
  {
    patterns: [/language|python|javascript|java|cpp|c\+\+|code/i],
    answer: `💻 **Supported Languages:**\n\nCodeArena supports 4 languages in the code editor:\n• **JavaScript** (Node.js)\n• **Python** (3.x)\n• **Java** (OpenJDK)\n• **C++** (GCC)\n\nYou can switch languages using the dropdown in the problem editor. Your code auto-saves as you type!`,
  },
  {
    patterns: [/hint|stuck|help.*problem|can't solve|difficult/i],
    answer: `💡 **Stuck on a problem? Here's what to try:**\n\n1. **Read hints** — Every problem has 2–3 progressive hints (click the 💡 button)\n2. **Check complexity** — Think about the time/space limits\n3. **Draw it out** — Visualize the problem with examples\n4. **Look at similar problems** — Listed at the bottom of each problem\n5. **Premium editorial** — Step-by-step solution with visual explanation\n\nAnything specific you're working on?`,
  },
  {
    patterns: [/hello|hi|hey|howdy|what's up|sup/i],
    answer: null, // handled dynamically
  },
  {
    patterns: [/thank|thanks|ty|great|awesome|nice|good bot/i],
    answer: `You're welcome! 😊 Happy to help. If you have more questions, just ask! Keep coding and crushing those problems! 💪`,
  },
  {
    patterns: [/bye|goodbye|see you|cya/i],
    answer: `Goodbye! 👋 Keep grinding — you've got this! Come back anytime. 🔥`,
  },
];

function getResponse(text: string, username?: string): string {
  const trimmed = text.trim().toLowerCase();

  // Greeting
  if (/hello|hi|hey|howdy|what's up|sup/i.test(trimmed)) {
    return `Hey ${username || 'there'}! 👋 I'm **ArenaBot**, your CodeArena assistant.\n\nI can help you with:\n• Getting started & problem recommendations\n• Contest schedules & rating system\n• Premium features & pricing\n• Study plans & learning paths\n• Company-wise interview prep\n\nWhat would you like to know?`;
  }

  for (const entry of KB) {
    if (entry.patterns.some(p => p.test(trimmed))) {
      return entry.answer ?? `Hey ${username || 'there'}! 👋 I'm here to help!`;
    }
  }

  // Fallback
  return `Hmm, I'm not sure about that specific question. 🤔\n\nHere are things I *can* help with:\n• Problem recommendations\n• Contest info & schedules\n• Rating & leaderboard\n• Premium features\n• Study plans & company prep\n\nTry asking something like **"How does rating work?"** or **"Which problems should I solve first?"**`;
}

const INITIAL_MESSAGE: Message = {
  id: 0,
  from: 'bot',
  text: `Hey there! 👋 I'm **ArenaBot**, your CodeArena assistant.\n\nI can help you with problem recommendations, contest schedules, rating info, and more.\n\nWhat can I help you with today?`,
  time: now(),
};

// Markdown-lite renderer
function renderText(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold
    const parts = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
      j % 2 === 1 ? <strong key={j} style={{ color: '#ffa116' }}>{part}</strong> : part
    );
    // Bullet
    if (line.startsWith('• ')) {
      return <div key={i} style={{ paddingLeft: '8px', margin: '2px 0', display: 'flex', gap: '6px' }}>
        <span style={{ color: '#ffa116', flexShrink: 0 }}>•</span>
        <span>{parts.slice(1)}</span>
      </div>;
    }
    return <div key={i} style={{ margin: line === '' ? '4px 0' : '1px 0' }}>{parts}</div>;
  });
}

export default function Chatbot() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (open) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, minimized]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: nextId.current++, from: 'user', text: trimmed, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate typing delay
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const response = getResponse(trimmed, user?.username);
      const botMsg: Message = { id: nextId.current++, from: 'bot', text: response, time: now() };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      if (!open) setUnreadCount(c => c + 1);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([{ ...INITIAL_MESSAGE, time: now() }]);
    nextId.current = 1;
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => { setOpen(!open); setMinimized(false); }}
        id="chatbot-toggle"
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 999,
          width: '52px', height: '52px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #ffa116, #ff6b00)',
          border: 'none', cursor: 'pointer', boxShadow: '0 4px 24px #ffa11650',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.25s', transform: open ? 'scale(0.9)' : 'scale(1)',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = open ? 'scale(0.85)' : 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = open ? 'scale(0.9)' : 'scale(1)')}
      >
        {open ? <X size={22} color="#fff" /> : <MessageSquare size={22} color="#fff" />}
        {!open && unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: '-2px', right: '-2px',
            width: '18px', height: '18px', background: '#ff375f',
            borderRadius: '50%', fontSize: '11px', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700',
          }}>{unreadCount}</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '88px', right: '24px', zIndex: 998,
          width: '360px', borderRadius: '18px', overflow: 'hidden',
          boxShadow: '0 16px 60px rgba(0,0,0,0.7)', border: '1px solid #2a2a2a',
          display: 'flex', flexDirection: 'column',
          animation: 'chatSlideIn 0.2s ease-out',
          maxHeight: minimized ? '56px' : '520px',
          transition: 'max-height 0.3s ease',
        }}>
          <style>{`
            @keyframes chatSlideIn {
              from { opacity: 0; transform: translateY(16px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes typingPulse {
              0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
              40% { transform: scale(1); opacity: 1; }
            }
          `}</style>

          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1200, #1e1400)',
            borderBottom: '1px solid #2a2a2a',
            padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px',
            flexShrink: 0,
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffa116, #ff6b00)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: '0 2px 8px #ffa11640',
            }}>
              <Bot size={18} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#eff1f6', fontWeight: '700', fontSize: '14px', lineHeight: 1 }}>ArenaBot</div>
              <div style={{ color: '#00b8a3', fontSize: '11px', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00b8a3', display: 'inline-block' }} />
                Online · Always ready to help
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={resetChat} title="Reset chat" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: '4px', borderRadius: '6px', display: 'flex' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffa116'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                <RefreshCw size={14} />
              </button>
              <button onClick={() => setMinimized(m => !m)} title="Minimize" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: '4px', borderRadius: '6px', display: 'flex' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffa116'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                {minimized ? <ChevronDown size={14} /> : <Minimize2 size={14} />}
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages area */}
              <div style={{
                flex: 1, overflowY: 'auto', padding: '16px 14px', background: '#0f0f0f',
                display: 'flex', flexDirection: 'column', gap: '12px',
                scrollbarWidth: 'thin', scrollbarColor: '#2a2a2a transparent',
              }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{
                    display: 'flex', gap: '8px',
                    flexDirection: msg.from === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                  }}>
                    {msg.from === 'bot' && (
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffa116, #ff6b00)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Bot size={14} color="#fff" />
                      </div>
                    )}
                    <div style={{ maxWidth: '76%' }}>
                      <div style={{
                        padding: '10px 13px',
                        background: msg.from === 'user' ? 'linear-gradient(135deg, #ffa116, #ff6b00)' : '#1a1a1a',
                        borderRadius: msg.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        border: msg.from === 'bot' ? '1px solid #2a2a2a' : 'none',
                        fontSize: '13px', lineHeight: 1.5, color: '#eff1f6',
                      }}>
                        {msg.from === 'bot' ? renderText(msg.text) : msg.text}
                      </div>
                      <div style={{ fontSize: '10px', color: '#444', marginTop: '3px', textAlign: msg.from === 'user' ? 'right' : 'left', paddingLeft: '4px' }}>{msg.time}</div>
                    </div>
                    {msg.from === 'user' && (
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: '800', color: '#fff' }}>
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffa116, #ff6b00)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bot size={14} color="#fff" />
                    </div>
                    <div style={{ padding: '12px 16px', background: '#1a1a1a', borderRadius: '14px 14px 14px 4px', border: '1px solid #2a2a2a', display: 'flex', gap: '4px', alignItems: 'center' }}>
                      {[0, 160, 320].map(delay => (
                        <span key={delay} style={{
                          width: '7px', height: '7px', borderRadius: '50%', background: '#ffa116',
                          display: 'inline-block',
                          animation: `typingPulse 1.2s ${delay}ms ease-in-out infinite`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick replies */}
              <div style={{ background: '#0f0f0f', padding: '8px 14px 4px', display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none', borderTop: '1px solid #1a1a1a' }}>
                {QUICK_REPLIES.map(q => (
                  <button key={q} onClick={() => sendMessage(q)} style={{
                    whiteSpace: 'nowrap', padding: '5px 12px', borderRadius: '20px',
                    background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#aaa',
                    fontSize: '12px', cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#ffa11618'; e.currentTarget.style.color = '#ffa116'; e.currentTarget.style.borderColor = '#ffa11640'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#aaa'; e.currentTarget.style.borderColor = '#2a2a2a'; }}
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input bar */}
              <div style={{ background: '#111', borderTop: '1px solid #1e1e1e', padding: '10px 12px', display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  style={{
                    flex: 1, background: '#1a1a1a', border: '1px solid #2a2a2a',
                    borderRadius: '20px', padding: '9px 14px', color: '#eff1f6',
                    fontSize: '13px', outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#ffa11650')}
                  onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || typing}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: input.trim() ? 'linear-gradient(135deg, #ffa116, #ff6b00)' : '#1a1a1a',
                    border: `1px solid ${input.trim() ? 'transparent' : '#2a2a2a'}`,
                    cursor: input.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'all 0.2s',
                  }}
                >
                  <Send size={15} color={input.trim() ? '#fff' : '#444'} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
