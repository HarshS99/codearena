import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { problems } from '../data/problems';
import { discussions } from '../data/discussions';
import Editor from '@monaco-editor/react';
import {
  Play,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick,
  ChevronLeft,
  BookOpen,
  ListChecks,
  MessageSquare,
  Lightbulb,
  BookMarked,
  ThumbsUp,
  MessageCircle,
  Building2,
  Tag,
  TrendingUp
} from 'lucide-react';

export default function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = problems.find(p => p.id === id);
  const problemDiscussions = discussions.filter(d => d.problemId === id);

  const [activeTab, setActiveTab] = useState<'description' | 'editorial' | 'discussion' | 'submissions'>('description');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language] || '');
    }
  }, [problem, language]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
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
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResults = {
      status: Math.random() > 0.3 ? 'Accepted' : 'Wrong Answer',
      passedTests: Math.random() > 0.3 ? problem.testCases.filter(t => !t.isHidden).length : Math.floor(Math.random() * problem.testCases.filter(t => !t.isHidden).length),
      totalTests: problem.testCases.filter(t => !t.isHidden).length,
      runtime: `${Math.floor(Math.random() * 100)}ms`,
      memory: `${(Math.random() * 20 + 30).toFixed(1)}MB`,
      testCases: problem.testCases.filter(t => !t.isHidden).map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: Math.random() > 0.3 ? tc.expectedOutput : 'null',
        passed: Math.random() > 0.3
      }))
    };
    
    setTestResults(mockResults);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    setShowResults(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const allTestsPassed = Math.random() > 0.2;
    const mockResults = {
      status: allTestsPassed ? 'Accepted' : 'Wrong Answer',
      passedTests: allTestsPassed ? problem.testCases.length : Math.floor(Math.random() * problem.testCases.length),
      totalTests: problem.testCases.length,
      runtime: `${Math.floor(Math.random() * 100)}ms`,
      memory: `${(Math.random() * 20 + 30).toFixed(1)}MB`,
      testCases: problem.testCases.map((tc, idx) => ({
        input: tc.isHidden ? `Hidden Test Case ${idx + 1}` : tc.input,
        expectedOutput: tc.isHidden ? 'Hidden' : tc.expectedOutput,
        actualOutput: tc.isHidden ? (allTestsPassed ? 'Hidden (Passed)' : 'Hidden (Failed)') : (allTestsPassed ? tc.expectedOutput : 'Wrong'),
        passed: allTestsPassed ? true : Math.random() > 0.2
      }))
    };
    
    setTestResults(mockResults);
    setIsRunning(false);

    // Save submission
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.unshift({
      id: Date.now().toString(),
      problemId: problem.id,
      problemTitle: problem.title,
      code,
      language,
      status: mockResults.status,
      runtime: mockResults.runtime,
      memory: mockResults.memory,
      timestamp: Date.now(),
      passedTests: mockResults.passedTests,
      totalTests: mockResults.totalTests
    });
    localStorage.setItem('submissions', JSON.stringify(submissions.slice(0, 20)));

    if (allTestsPassed) {
      const solvedProblems = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
      if (!solvedProblems.includes(problem.id)) {
        solvedProblems.push(problem.id);
        localStorage.setItem('solvedProblems', JSON.stringify(solvedProblems));
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
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/problems')}
            className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">{problem.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              {problem.category.map((cat, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-slate-700 text-gray-300 rounded text-xs">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            Run
          </button>
          <button
            onClick={handleSubmit}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 border-r border-slate-700 overflow-y-auto bg-slate-900">
          <div className="p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-700">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                  activeTab === 'description'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Description
              </button>
              <button
                onClick={() => setActiveTab('editorial')}
                className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                  activeTab === 'editorial'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <BookMarked className="w-4 h-4" />
                Editorial
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                  activeTab === 'discussion'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Discussion
                <span className="text-xs bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded">
                  {problemDiscussions.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                  activeTab === 'submissions'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <ListChecks className="w-4 h-4" />
                Submissions
              </button>
            </div>

            {activeTab === 'description' ? (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Problem Description</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">{problem.description}</p>
                </div>

                {/* Examples */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
                  {problem.examples.map((example, idx) => (
                    <div key={idx} className="mb-4 bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <p className="text-sm text-gray-400 mb-2">Example {idx + 1}:</p>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-400">Input: </span>
                          <code className="text-purple-400 font-mono text-sm">{example.input}</code>
                        </div>
                        <div>
                          <span className="text-gray-400">Output: </span>
                          <code className="text-green-400 font-mono text-sm">{example.output}</code>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="text-gray-400">Explanation: </span>
                            <span className="text-gray-300 text-sm">{example.explanation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
                  <ul className="space-y-2">
                    {problem.constraints.map((constraint, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <code className="font-mono">{constraint}</code>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Companies */}
                {problem.companies && problem.companies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Companies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {problem.companies.map((company, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-sm border border-blue-500/30 font-medium">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topics */}
                {problem.topics && problem.topics.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Related Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {problem.topics.map((topic, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded text-sm border border-purple-500/30">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hints */}
                {problem.hints && problem.hints.length > 0 && (
                  <div>
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="flex items-center gap-2 text-lg font-semibold text-white mb-3 hover:text-purple-400 transition-colors"
                    >
                      <Lightbulb className="w-5 h-5" />
                      Hints ({problem.hints.length})
                    </button>
                    {showHints && (
                      <div className="space-y-2">
                        {problem.hints.map((hint, idx) => (
                          <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                            {revealedHints.includes(idx) ? (
                              <p className="text-gray-300 text-sm">{hint}</p>
                            ) : (
                              <button
                                onClick={() => revealHint(idx)}
                                className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                              >
                                💡 Click to reveal hint {idx + 1}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Similar Problems */}
                {problem.similarProblems && problem.similarProblems.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Similar Problems
                    </h3>
                    <div className="space-y-2">
                      {problem.similarProblems.map((problemId) => {
                        const similarProblem = problems.find(p => p.id === problemId);
                        return similarProblem ? (
                          <button
                            key={problemId}
                            onClick={() => navigate(`/problem/${problemId}`)}
                            className="w-full text-left px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                          >
                            <span className="text-purple-400 hover:text-purple-300">{similarProblem.title}</span>
                            <span className={`ml-2 text-xs ${getDifficultyColor(similarProblem.difficulty)}`}>
                              {similarProblem.difficulty}
                            </span>
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : activeTab === 'editorial' ? (
              <div className="space-y-6">
                {problem.editorial ? (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Approach</h3>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {problem.editorial.approach}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Time Complexity</h4>
                        <code className="text-green-400 font-mono text-lg">{problem.editorial.complexity.time}</code>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Space Complexity</h4>
                        <code className="text-blue-400 font-mono text-lg">{problem.editorial.complexity.space}</code>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Solution Code</h3>
                      <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                        <div className="bg-slate-900 px-4 py-2 border-b border-slate-700">
                          <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-slate-700 text-white px-3 py-1 rounded text-sm border border-slate-600"
                          >
                            {Object.keys(problem.editorial.solution).map(lang => (
                              <option key={lang} value={lang}>{lang}</option>
                            ))}
                          </select>
                        </div>
                        <pre className="p-4 overflow-x-auto">
                          <code className="text-gray-300 text-sm font-mono">
                            {problem.editorial.solution[language] || problem.editorial.solution.javascript}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <BookMarked className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Editorial coming soon</p>
                    <p className="text-gray-500 text-sm mt-2">Check back later for the official solution</p>
                  </div>
                )}
              </div>
            ) : activeTab === 'discussion' ? (
              <div className="space-y-4">
                {problemDiscussions.length > 0 ? (
                  problemDiscussions.map((discussion) => (
                    <div key={discussion.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-semibold">{discussion.title}</h4>
                        <div className="flex gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {discussion.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {discussion.replies}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-3 whitespace-pre-line">{discussion.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-purple-400">@{discussion.author}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(discussion.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {discussion.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No discussions yet</p>
                    <p className="text-gray-500 text-sm mt-2">Be the first to start a discussion!</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {(() => {
                  const submissions = JSON.parse(localStorage.getItem('submissions') || '[]')
                    .filter((s: any) => s.problemId === id);
                  
                  return submissions.length > 0 ? (
                    <div className="space-y-3">
                      {submissions.map((sub: any) => (
                        <div key={sub.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              {sub.status === 'Accepted' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-400" />
                              )}
                              <span className={`font-semibold ${
                                sub.status === 'Accepted' ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {sub.status}
                              </span>
                            </div>
                            <span className="text-sm text-gray-400">
                              {new Date(sub.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                            <span>{sub.language}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {sub.runtime}
                            </span>
                            <span className="flex items-center gap-1">
                              <MemoryStick className="w-4 h-4" />
                              {sub.memory}
                            </span>
                            <span>
                              {sub.passedTests}/{sub.totalTests} passed
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ListChecks className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No submissions yet</p>
                      <p className="text-gray-500 text-sm mt-2">Submit your solution to see history</p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col bg-slate-900">
          {/* Editor */}
          <div className="flex-1 overflow-hidden">
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
                wordWrap: 'on'
              }}
            />
          </div>

          {/* Test Results */}
          {showResults && testResults && (
            <div className="border-t border-slate-700 bg-slate-800 overflow-y-auto" style={{ maxHeight: '40%' }}>
              <div className="p-4">
                {/* Status Header */}
                <div className={`flex items-center gap-3 p-4 rounded-lg mb-4 ${
                  testResults.status === 'Accepted'
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-red-500/20 border border-red-500/30'
                }`}>
                  {testResults.status === 'Accepted' ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${
                      testResults.status === 'Accepted' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {testResults.status}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {testResults.passedTests} / {testResults.totalTests} test cases passed
                    </p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-300">
                      <Clock className="w-4 h-4" />
                      {testResults.runtime}
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <MemoryStick className="w-4 h-4" />
                      {testResults.memory}
                    </div>
                  </div>
                </div>

                {/* Test Cases */}
                <div className="space-y-2">
                  {testResults.testCases.map((tc: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border ${
                        tc.passed
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-red-500/10 border-red-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {tc.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-white font-medium text-sm">Test Case {idx + 1}</span>
                      </div>
                      <div className="space-y-1 text-xs font-mono">
                        <div>
                          <span className="text-gray-400">Input: </span>
                          <span className="text-gray-300">{tc.input}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Expected: </span>
                          <span className="text-green-400">{tc.expectedOutput}</span>
                        </div>
                        {!tc.passed && !tc.input.includes('Hidden') && (
                          <div>
                            <span className="text-gray-400">Got: </span>
                            <span className="text-red-400">{tc.actualOutput}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
