export interface User {
  id: string;
  username: string;
  email: string;
  solvedProblems: number;
  rank: number;
  rating: number;
  avatar?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string[];
  companies: string[];
  topics: string[];
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  testCases: TestCase[];
  starterCode: {
    [key: string]: string;
  };
  acceptance: number;
  submissions: number;
  hints?: string[];
  editorial?: {
    approach: string;
    complexity: {
      time: string;
      space: string;
    };
    solution: Record<string, string>;
  };
  similarProblems?: string[];
}

export interface Discussion {
  id: string;
  problemId: string;
  author: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  timestamp: number;
  tags: string[];
}

export interface Submission {
  id: string;
  problemId: string;
  userId: string;
  code: string;
  language: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
  runtime?: string;
  memory?: string;
  timestamp: number;
  passedTests?: number;
  totalTests?: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  rating: number;
  solvedProblems: number;
  avatar?: string;
}
