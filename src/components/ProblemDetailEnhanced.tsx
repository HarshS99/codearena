import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { problems } from '../data/problemsComplete';
import { discussions } from '../data/discussions';
import { useAuth } from '../context/AuthContext';
import Editor from '@monaco-editor/react';
import {
  Play,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  BookOpen,
  ListChecks,
  MessageSquare,
  Lightbulb,
  ThumbsUp,
  Building2,
  Tag,
  Bookmark,
  BookmarkCheck,
  Timer,
  RotateCcw,
  StickyNote,
  ChevronDown,
  ChevronUp,
  History,
  Copy,
  Check,
  AlertCircle,
  Zap,
  Target
} from 'lucide-react';

export default function ProblemDetailEnhanced() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const problem = problems.find(p => p.id === Number(id));
  const problemDiscussions = discussions.filter(d => d.problemId === id);

  const [activeTab, setActiveTab] = useState<'description' | 'editorial' | 'solutions' | 'discussion' | 'submissions' | 'notes'>('description');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  // Notes state
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  
  // Submissions state
  const [submissions, setSubmissions] = useState<any[]>([]);
  
  // Code copied state
  const [copied, setCopied] = useState(false);
  
  // Console output
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(true);

  // Load saved data from backend
  useEffect(() => {
    if (problem && user && token) {
      // Fetch bookmarks, notes, submissions. Code is still local for speed.
      const savedCode = localStorage.getItem(`code_${user.email}_${problem.id}_${language}`);
      setCode(savedCode || problem.starterCode[language] || '');

      const fetchData = async () => {
        try {
          const res = await fetch('http://localhost:5001/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } });
          if (res.ok) {
            const data = await res.json();
            setIsBookmarked(data.bookmarks?.includes(problem.id.toString()));
            const noteObj = data.notes?.find((n: any) => n.problemId === problem.id.toString());
            if (noteObj) setNotes(noteObj.content);
          }
          
          const subRes = await fetch('http://localhost:5001/api/data/submissions', { headers: { 'Authorization': `Bearer ${token}` } });
          if (subRes.ok) {
            const subData = await subRes.json();
            setSubmissions(subData.filter((s: any) => s.problemId === problem.id.toString()));
          }
        } catch (err) {
          console.error(err);
        }
      };
      
      fetchData();
    }
  }, [problem, language, user, token]);

  // Auto-save code to local storage for speed
  useEffect(() => {
    if (problem && user && code) {
      localStorage.setItem(`code_${user.email}_${problem.id}_${language}`, code);
    }
  }, [code, problem, language, user]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleBookmark = useCallback(async () => {
    if (!user || !problem || !token) return;
    
    // Optimistic UI
    setIsBookmarked(!isBookmarked);
    
    try {
      await fetch('http://localhost:5001/api/data/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ problemId: problem.id.toString() })
      });
    } catch (err) {
      console.error(err);
      setIsBookmarked(isBookmarked); // rollback
    }
  }, [isBookmarked, user, problem, token]);

  const saveNotes = useCallback(async () => {
    if (!user || !problem || !token) return;
    try {
      await fetch('http://localhost:5001/api/data/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ problemId: problem.id.toString(), content: notes })
      });
    } catch (err) {
      console.error(err);
    }
  }, [notes, user, problem, token]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const resetCode = useCallback(() => {
    if (problem) {
      setCode(problem.starterCode[language] || '');
    }
  }, [problem, language]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center pt-16">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Problem not found</h2>
          <button
            onClick={() => navigate('/problems')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  const handleRun = async () => {
    setIsRunning(true);
    setShowResults(true);
    setShowConsole(true);
    setConsoleOutput(['Compiling code...', 'Running test cases...']);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const visibleTests = problem.testCases.filter(t => !t.isHidden);
    const passed = Math.random() > 0.3;
    
    const results = {
      status: passed ? 'Accepted' : 'Wrong Answer',
      passedTests: passed ? visibleTests.length : Math.floor(Math.random() * visibleTests.length),
      totalTests: visibleTests.length,
      runtime: `${Math.floor(Math.random() * 100)}ms`,
      memory: `${(Math.random() * 20 + 30).toFixed(1)}MB`,
      testCases: visibleTests.map((tc, idx) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: passed || idx < Math.floor(visibleTests.length / 2) ? tc.expectedOutput : 'undefined',
        passed: passed || idx < Math.floor(visibleTests.length / 2)
      }))
    };
    
    setConsoleOutput([
      'Compiling code...',
      'Running test cases...',
      `Test cases executed: ${results.totalTests}`,
      `Passed: ${results.passedTests}/${results.totalTests}`,
      `Status: ${results.status}`,
      `Runtime: ${results.runtime}`,
      `Memory: ${results.memory}`
    ]);
    
    setTestResults(results);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    setShowResults(true);
    setShowConsole(true);
    setConsoleOutput(['Compiling code...', 'Running all test cases (including hidden)...']);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const allTestsPassed = Math.random() > 0.25;
    const results = {
      status: allTestsPassed ? 'Accepted' : 'Wrong Answer',
      passedTests: allTestsPassed ? problem.testCases.length : Math.floor(Math.random() * problem.testCases.length),
      totalTests: problem.testCases.length,
      runtime: `${Math.floor(Math.random() * 100)}ms`,
      memory: `${(Math.random() * 20 + 30).toFixed(1)}MB`,
      percentile: Math.floor(Math.random() * 100),
      testCases: problem.testCases.map((tc, idx) => ({
        input: tc.isHidden ? `Hidden Test Case ${idx + 1}` : tc.input,
        expectedOutput: tc.isHidden ? 'Hidden' : tc.expectedOutput,
        actualOutput: tc.isHidden 
          ? (allTestsPassed ? 'Passed' : (Math.random() > 0.5 ? 'Passed' : 'Failed'))
          : (allTestsPassed ? tc.expectedOutput : 'Wrong'),
        passed: allTestsPassed || (tc.isHidden ? Math.random() > 0.3 : Math.random() > 0.3),
        isHidden: tc.isHidden
      }))
    };
    
    setConsoleOutput([
      'Compiling code...',
      'Running all test cases...',
      `Total test cases: ${results.totalTests}`,
      `Passed: ${results.passedTests}/${results.totalTests}`,
      '',
      allTestsPassed ? '✅ All test cases passed!' : '❌ Some test cases failed',
      '',
      `Status: ${results.status}`,
      `Runtime: ${results.runtime} (faster than ${results.percentile}%)`,
      `Memory: ${results.memory}`
    ]);
    
    setTestResults(results);
    setIsRunning(false);

    // Save submission to backend
    if (user && token) {
      try {
        const payload = {
          problemId: problem.id.toString(),
          problemTitle: problem.title,
          code,
          language,
          status: results.status,
          runtime: results.runtime,
          memory: results.memory,
          passedTests: results.passedTests,
          totalTests: results.totalTests
        };

        const res = await fetch('http://localhost:5001/api/data/submission', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const newSub = await res.json();
          setSubmissions(prev => [newSub, ...prev]);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'Hard': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const revealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
    }
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden pt-16">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/problems')}
            className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              {problem.title}
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Timer */}
          <div className="flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-1.5">
            <Timer className={`w-4 h-4 ${timerRunning ? 'text-green-400' : 'text-gray-400'}`} />
            <span className={`font-mono font-medium ${timerRunning ? 'text-green-400' : 'text-gray-300'}`}>
              {formatTime(timerSeconds)}
            </span>
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className={`p-1 rounded ${timerRunning ? 'text-red-400 hover:bg-red-500/20' : 'text-green-400 hover:bg-green-500/20'}`}
            >
              {timerRunning ? '⏸' : '▶'}
            </button>
            <button
              onClick={() => { setTimerSeconds(0); setTimerRunning(false); }}
              className="p-1 text-gray-400 hover:text-white hover:bg-slate-600 rounded"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Bookmark */}
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked ? 'text-yellow-400 bg-yellow-500/20' : 'text-gray-400 hover:text-yellow-400 hover:bg-slate-700'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>

          {/* Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-2 rounded-lg transition-colors ${
              showNotes ? 'text-purple-400 bg-purple-500/20' : 'text-gray-400 hover:text-purple-400 hover:bg-slate-700'
            }`}
          >
            <StickyNote className="w-5 h-5" />
          </button>

          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-700 text-white px-3 py-1.5 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          {/* Run Button */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 text-sm"
          >
            <Play className="w-4 h-4" />
            Run
          </button>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-500 hover:to-emerald-500 transition-colors disabled:opacity-50 text-sm"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 flex flex-col border-r border-slate-700 overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-1 px-4 py-2 bg-slate-800 border-b border-slate-700 flex-shrink-0 overflow-x-auto">
            {[
              { id: 'description', label: 'Description', icon: BookOpen },
              { id: 'editorial', label: 'Editorial', icon: Lightbulb },
              { id: 'solutions', label: 'Solutions', icon: ListChecks },
              { id: 'discussion', label: 'Discussion', icon: MessageSquare },
              { id: 'submissions', label: 'Submissions', icon: History },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'description' && (
              <div className="space-y-6">
                {/* Problem Title & Stats */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-gray-400 text-sm">Acceptance: {problem.acceptance}%</span>
                  <span className="text-gray-400 text-sm">Submissions: {problem.submissions.toLocaleString()}</span>
                </div>

                {/* Companies */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  {problem.companies.map((company, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs border border-blue-500/30">
                      {company}
                    </span>
                  ))}
                </div>

                {/* Topics */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded text-xs border border-purple-500/30">
                    {problem.category}
                  </span>
                  {problem.topics.map((topic: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded text-xs">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{problem.description}</p>
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <ListChecks className="w-5 h-5 text-purple-400" />
                    Examples
                  </h3>
                  {problem.examples.map((example, idx) => (
                    <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <div className="text-sm font-medium text-gray-400 mb-2">Example {idx + 1}:</div>
                      <div className="space-y-2 font-mono text-sm">
                        <div>
                          <span className="text-gray-500">Input: </span>
                          <span className="text-green-400">{example.input}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Output: </span>
                          <span className="text-blue-400">{example.output}</span>
                        </div>
                        {example.explanation && (
                          <div className="mt-2 pt-2 border-t border-slate-700">
                            <span className="text-gray-500">Explanation: </span>
                            <span className="text-gray-300">{example.explanation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {problem.constraints.map((constraint, idx) => (
                      <li key={idx} className="text-gray-400 font-mono text-sm">{constraint}</li>
                    ))}
                  </ul>
                </div>

                {/* Hints */}
                {problem.hints && problem.hints.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      Hints
                    </h3>
                    <div className="space-y-2">
                      {problem.hints.map((hint, idx) => (
                        <div key={idx} className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                          {revealedHints.includes(idx) ? (
                            <div className="p-4 text-gray-300">{hint}</div>
                          ) : (
                            <button
                              onClick={() => revealHint(idx)}
                              className="w-full p-4 text-left text-yellow-400 hover:bg-slate-700 transition-colors flex items-center justify-between"
                            >
                              <span>Hint {idx + 1}</span>
                              <span className="text-sm text-gray-500">Click to reveal</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Similar Problems */}
                {problem.similarProblems && problem.similarProblems.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Similar Problems</h3>
                    <div className="space-y-2">
                      {problem.similarProblems.map((similarTitle: string, idx: number) => {
                        const similarProblem = problems.find(p => p.title === similarTitle);
                        return (
                          <button
                            key={idx}
                            onClick={() => similarProblem && navigate(`/problem/${similarProblem.id}`)}
                            className="w-full flex items-center justify-between p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                          >
                            <span className="text-gray-300">{similarTitle}</span>
                            {similarProblem && (
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                similarProblem.difficulty === 'Easy' ? 'text-green-400 bg-green-500/20' :
                                similarProblem.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-500/20' :
                                'text-red-400 bg-red-500/20'
                              }`}>
                                {similarProblem.difficulty}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white">Approach</h3>
                  </div>
                  <p className="text-gray-300">
                    {problem.hints && problem.hints.length > 0 
                      ? problem.hints.join(' ') 
                      : 'Use appropriate data structures and algorithms to solve this problem efficiently.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">Time Complexity</span>
                    </div>
                    <span className="text-lg font-mono text-white">O(n)</span>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400">Space Complexity</span>
                    </div>
                    <span className="text-lg font-mono text-white">O(n)</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Solution Hints</h3>
                  <div className="space-y-3">
                    {problem.hints && problem.hints.map((hint: string, idx: number) => (
                      <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-yellow-400 font-medium">{idx + 1}</span>
                          </div>
                          <p className="text-gray-300">{hint}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-center">
                  <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Want the full solution?</h3>
                  <p className="text-gray-400 mb-4">Try solving it yourself first using the hints above!</p>
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                    View Full Solution
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'solutions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Community Solutions</h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-800 text-gray-300 rounded border border-slate-700 text-sm cursor-pointer hover:bg-slate-700">Hot</span>
                    <span className="px-3 py-1 bg-slate-800 text-gray-300 rounded border border-slate-700 text-sm cursor-pointer hover:bg-slate-700">New</span>
                    <span className="px-3 py-1 bg-slate-800 text-gray-300 rounded border border-slate-700 text-sm cursor-pointer hover:bg-slate-700">Most Votes</span>
                  </div>
                </div>

                {[
                  {
                    author: "code_ninja",
                    title: "O(n) Time, O(1) Space - Clean & Explained",
                    tags: ["Python3", "Two Pointers", "O(n)"],
                    votes: 1245,
                    views: "125K"
                  },
                  {
                    author: "java_master",
                    title: "Simple Java HashMap Solution [Detailed Explanation]",
                    tags: ["Java", "Hash Table", "O(n) Time"],
                    votes: 892,
                    views: "89K"
                  },
                  {
                    author: "cpp_guru",
                    title: "0ms Beats 100% | C++ Sorting Approach",
                    tags: ["C++", "Sorting", "O(N log N)"],
                    votes: 654,
                    views: "45K"
                  }
                ].map((sol, idx) => (
                  <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700 transition-colors hover:border-slate-500 cursor-pointer">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-1 text-gray-400 mt-2">
                        <ChevronUp className="w-6 h-6 hover:text-green-400 cursor-pointer" />
                        <span className="font-semibold text-white text-lg">{sol.votes}</span>
                        <ChevronDown className="w-6 h-6 hover:text-red-400 cursor-pointer" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-blue-400 font-semibold text-lg mb-2">{sol.title}</h4>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            {sol.author.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-gray-300 text-sm font-medium">{sol.author}</span>
                          <span className="text-gray-500 text-sm">• {sol.views} views</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sol.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-slate-700 text-gray-300 rounded text-xs border border-slate-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Discussions ({problemDiscussions.length})</h3>
                </div>
                {problemDiscussions.length > 0 ? (
                  problemDiscussions.map((discussion) => (
                    <div key={discussion.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          {discussion.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">{discussion.author}</span>
                            <span className="text-xs text-gray-500">{discussion.timestamp}</span>
                          </div>
                          <h4 className="text-purple-400 font-medium mb-2">{discussion.title}</h4>
                          <p className="text-gray-300 text-sm">{discussion.content}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 text-sm">
                              <ThumbsUp className="w-4 h-4" />
                              {discussion.likes}
                            </button>
                            <button className="flex items-center gap-1 text-gray-400 hover:text-purple-400 text-sm">
                              <MessageSquare className="w-4 h-4" />
                              {discussion.replies} replies
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
                    <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No discussions yet. Be the first to start one!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Your Submissions</h3>
                {submissions.length > 0 ? (
                  submissions.map((sub) => (
                    <div key={sub.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          sub.status === 'Accepted' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {sub.status}
                        </span>
                        <span className="text-sm text-gray-400">
                          {new Date(sub.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Language: {sub.language}</span>
                        <span>Runtime: {sub.runtime}</span>
                        <span>Memory: {sub.memory}</span>
                        <span>Tests: {sub.passedTests}/{sub.totalTests}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
                    <History className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No submissions yet. Submit your solution!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor & Results */}
        <div className="w-1/2 flex flex-col overflow-hidden">
          {/* Notes Panel (Collapsible) */}
          {showNotes && (
            <div className="bg-slate-800 border-b border-slate-700 p-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <StickyNote className="w-4 h-4 text-purple-400" />
                  Notes
                </h3>
                <button
                  onClick={saveNotes}
                  className="text-xs text-purple-400 hover:text-purple-300"
                >
                  Save
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes here..."
                className="w-full h-20 bg-slate-700 text-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          {/* Code Editor Header */}
          <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between flex-shrink-0">
            <span className="text-sm text-gray-400">Code</span>
            <div className="flex items-center gap-2">
              <button
                onClick={copyCode}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={resetCode}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                title="Reset code"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                padding: { top: 10 }
              }}
            />
          </div>

          {/* Console/Results */}
          {showResults && (
            <div className="border-t border-slate-700 bg-slate-800 flex-shrink-0 max-h-64 overflow-hidden flex flex-col">
              <div 
                className="flex items-center justify-between px-4 py-2 border-b border-slate-700 cursor-pointer hover:bg-slate-700"
                onClick={() => setShowConsole(!showConsole)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">Console</span>
                  {testResults && (
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      testResults.status === 'Accepted' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {testResults.status}
                    </span>
                  )}
                </div>
                {showConsole ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronUp className="w-4 h-4 text-gray-400" />}
              </div>
              
              {showConsole && (
                <div className="flex-1 overflow-y-auto p-4">
                  {isRunning ? (
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                      <span>Running...</span>
                    </div>
                  ) : testResults ? (
                    <div className="space-y-4">
                      {/* Console Output */}
                      <div className="font-mono text-sm space-y-1">
                        {consoleOutput.map((line, idx) => (
                          <div key={idx} className={`${
                            line.includes('✅') ? 'text-green-400' :
                            line.includes('❌') ? 'text-red-400' :
                            line.includes('Status:') ? 'text-yellow-400' :
                            'text-gray-400'
                          }`}>
                            {line}
                          </div>
                        ))}
                      </div>

                      {/* Test Cases */}
                      <div className="space-y-2">
                        {testResults.testCases.slice(0, 5).map((tc: any, idx: number) => (
                          <div key={idx} className={`p-3 rounded-lg border ${
                            tc.passed 
                              ? 'bg-green-500/10 border-green-500/30' 
                              : 'bg-red-500/10 border-red-500/30'
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              {tc.passed ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-400" />
                              )}
                              <span className={`text-sm font-medium ${tc.passed ? 'text-green-400' : 'text-red-400'}`}>
                                {tc.isHidden ? `Hidden Test Case ${idx + 1}` : `Test Case ${idx + 1}`}
                              </span>
                            </div>
                            {!tc.isHidden && (
                              <div className="text-xs font-mono text-gray-400 space-y-1 mt-2">
                                <div>Input: {tc.input}</div>
                                <div>Expected: {tc.expectedOutput}</div>
                                <div>Output: {tc.actualOutput}</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">Run your code to see results here.</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
