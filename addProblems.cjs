const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'data', 'problemsComplete.ts');
let content = fs.readFileSync(targetPath, 'utf8');

const additionalProblems = [
  // Arrays & Hashing
  ["Longest Consecutive Sequence", "Medium", "Arrays & Hashing"],
  ["Valid Sudoku", "Medium", "Arrays & Hashing"],
  // Two Pointers
  ["Valid Palindrome", "Easy", "Two Pointers"],
  ["Two Sum II", "Medium", "Two Pointers"],
  ["3Sum", "Medium", "Two Pointers"],
  ["Container With Most Water", "Medium", "Two Pointers"],
  ["Trapping Rain Water", "Hard", "Two Pointers"],
  // Sliding Window
  ["Best Time to Buy and Sell Stock", "Easy", "Sliding Window"],
  ["Longest Substring Without Repeating Characters", "Medium", "Sliding Window"],
  ["Longest Repeating Character Replacement", "Medium", "Sliding Window"],
  ["Permutation in String", "Medium", "Sliding Window"],
  ["Minimum Window Substring", "Hard", "Sliding Window"],
  ["Sliding Window Maximum", "Hard", "Sliding Window"],
  // Stack
  ["Valid Parentheses", "Easy", "Stack"],
  ["Min Stack", "Medium", "Stack"],
  ["Evaluate Reverse Polish Notation", "Medium", "Stack"],
  ["Generate Parentheses", "Medium", "Stack"],
  ["Daily Temperatures", "Medium", "Stack"],
  ["Car Fleet", "Medium", "Stack"],
  ["Largest Rectangle in Histogram", "Hard", "Stack"],
  // Binary Search
  ["Binary Search", "Easy", "Binary Search"],
  ["Search a 2D Matrix", "Medium", "Binary Search"],
  ["Koko Eating Bananas", "Medium", "Binary Search"],
  ["Find Minimum in Rotated Sorted Array", "Medium", "Binary Search"],
  ["Search in Rotated Sorted Array", "Medium", "Binary Search"],
  ["Time Based Key-Value Store", "Medium", "Binary Search"],
  ["Median of Two Sorted Arrays", "Hard", "Binary Search"],
  // Linked List
  ["Reverse Linked List", "Easy", "Linked List"],
  ["Merge Two Sorted Lists", "Easy", "Linked List"],
  ["Reorder List", "Medium", "Linked List"],
  ["Remove Nth Node From End of List", "Medium", "Linked List"],
  ["Copy List with Random Pointer", "Medium", "Linked List"],
  ["Add Two Numbers", "Medium", "Linked List"],
  ["Linked List Cycle", "Easy", "Linked List"],
  ["Find the Duplicate Number", "Medium", "Linked List"],
  ["LRU Cache", "Medium", "Linked List"],
  ["Merge k Sorted Lists", "Hard", "Linked List"],
  ["Reverse Nodes in k-Group", "Hard", "Linked List"],
  // Trees
  ["Invert Binary Tree", "Easy", "Trees"],
  ["Maximum Depth of Binary Tree", "Easy", "Trees"],
  ["Diameter of Binary Tree", "Easy", "Trees"],
  ["Balanced Binary Tree", "Easy", "Trees"],
  ["Same Tree", "Easy", "Trees"],
  ["Subtree of Another Tree", "Easy", "Trees"],
  ["Lowest Common Ancestor of a Binary Search Tree", "Medium", "Trees"],
  ["Binary Tree Level Order Traversal", "Medium", "Trees"],
  ["Binary Tree Right Side View", "Medium", "Trees"],
  ["Count Good Nodes in Binary Tree", "Medium", "Trees"],
  ["Validate Binary Search Tree", "Medium", "Trees"],
  ["Kth Smallest Element in a BST", "Medium", "Trees"],
  ["Construct Binary Tree from Preorder and Inorder Traversal", "Medium", "Trees"],
  ["Binary Tree Maximum Path Sum", "Hard", "Trees"],
  ["Serialize and Deserialize Binary Tree", "Hard", "Trees"],
  // Tries
  ["Implement Trie (Prefix Tree)", "Medium", "Tries"],
  ["Design Add and Search Words Data Structure", "Medium", "Tries"],
  ["Word Search II", "Hard", "Tries"],
  // Heap / Priority Queue
  ["Kth Largest Element in a Stream", "Easy", "Heap / Priority Queue"],
  ["Last Stone Weight", "Easy", "Heap / Priority Queue"],
  ["K Closest Points to Origin", "Medium", "Heap / Priority Queue"],
  ["Kth Largest Element in an Array", "Medium", "Heap / Priority Queue"],
  ["Task Scheduler", "Medium", "Heap / Priority Queue"],
  ["Design Twitter", "Medium", "Heap / Priority Queue"],
  ["Find Median from Data Stream", "Hard", "Heap / Priority Queue"],
  // Backtracking
  ["Subsets", "Medium", "Backtracking"],
  ["Combination Sum", "Medium", "Backtracking"],
  ["Permutations", "Medium", "Backtracking"],
  ["Subsets II", "Medium", "Backtracking"],
  ["Combination Sum II", "Medium", "Backtracking"],
  ["Word Search", "Medium", "Backtracking"],
  ["Palindrome Partitioning", "Medium", "Backtracking"],
  ["Letter Combinations of a Phone Number", "Medium", "Backtracking"],
  ["N-Queens", "Hard", "Backtracking"],
  // Graphs
  ["Number of Islands", "Medium", "Graphs"],
  ["Max Area of Island", "Medium", "Graphs"],
  ["Clone Graph", "Medium", "Graphs"],
  ["Walls and Gates", "Medium", "Graphs"],
  ["Rotting Oranges", "Medium", "Graphs"],
  ["Pacific Atlantic Water Flow", "Medium", "Graphs"],
  ["Surrounded Regions", "Medium", "Graphs"],
  ["Course Schedule", "Medium", "Graphs"],
  ["Course Schedule II", "Medium", "Graphs"],
  ["Graph Valid Tree", "Medium", "Graphs"],
  ["Number of Connected Components in an Undirected Graph", "Medium", "Graphs"],
  ["Redundant Connection", "Medium", "Graphs"],
  ["Word Ladder", "Hard", "Graphs"],
  // Advanced Graphs
  ["Reconstruct Itinerary", "Hard", "Advanced Graphs"],
  ["Min Cost to Connect All Points", "Medium", "Advanced Graphs"],
  ["Network Delay Time", "Medium", "Advanced Graphs"],
  ["Swim in Rising Water", "Hard", "Advanced Graphs"],
  ["Alien Dictionary", "Hard", "Advanced Graphs"],
  ["Cheapest Flights Within K Stops", "Medium", "Advanced Graphs"],
  // 1D DP
  ["Climbing Stairs", "Easy", "1D DP"],
  ["Min Cost Climbing Stairs", "Easy", "1D DP"],
  ["House Robber", "Medium", "1D DP"],
  ["House Robber II", "Medium", "1D DP"],
  ["Longest Palindromic Substring", "Medium", "1D DP"],
  ["Palindromic Substrings", "Medium", "1D DP"],
  ["Decode Ways", "Medium", "1D DP"],
  ["Coin Change", "Medium", "1D DP"],
  ["Maximum Product Subarray", "Medium", "1D DP"],
  ["Word Break", "Medium", "1D DP"],
  ["Longest Increasing Subsequence", "Medium", "1D DP"],
  ["Partition Equal Subset Sum", "Medium", "1D DP"],
  // 2D DP
  ["Unique Paths", "Medium", "2D DP"],
  ["Longest Common Subsequence", "Medium", "2D DP"],
  ["Best Time to Buy and Sell Stock with Cooldown", "Medium", "2D DP"],
  ["Coin Change II", "Medium", "2D DP"],
  ["Target Sum", "Medium", "2D DP"],
  ["Interleaving String", "Medium", "2D DP"],
  ["Longest Increasing Path in a Matrix", "Hard", "2D DP"],
  ["Distinct Subsequences", "Hard", "2D DP"],
  ["Edit Distance", "Hard", "2D DP"],
  ["Burst Balloons", "Hard", "2D DP"],
  ["Regular Expression Matching", "Hard", "2D DP"],
  // Greedy
  ["Maximum Subarray", "Medium", "Greedy"],
  ["Jump Game", "Medium", "Greedy"],
  ["Jump Game II", "Medium", "Greedy"],
  ["Gas Station", "Medium", "Greedy"],
  ["Hand of Straights", "Medium", "Greedy"],
  ["Merge Triplets to Form Target Triplet", "Medium", "Greedy"],
  ["Partition Labels", "Medium", "Greedy"],
  ["Valid Parenthesis String", "Medium", "Greedy"],
  // Intervals
  ["Insert Interval", "Medium", "Intervals"],
  ["Merge Intervals", "Medium", "Intervals"],
  ["Non-overlapping Intervals", "Medium", "Intervals"],
  ["Meeting Rooms", "Easy", "Intervals"],
  ["Meeting Rooms II", "Medium", "Intervals"],
  ["Minimum Interval to Include Each Query", "Hard", "Intervals"],
  // Math & Geometry
  ["Rotate Image", "Medium", "Math & Geometry"],
  ["Spiral Matrix", "Medium", "Math & Geometry"],
  ["Set Matrix Zeroes", "Medium", "Math & Geometry"],
  ["Happy Number", "Easy", "Math & Geometry"],
  ["Plus One", "Easy", "Math & Geometry"],
  ["Pow(x, n)", "Medium", "Math & Geometry"],
  ["Multiply Strings", "Medium", "Math & Geometry"],
  ["Detect Squares", "Medium", "Math & Geometry"],
  // Bit Manipulation
  ["Single Number", "Easy", "Bit Manipulation"],
  ["Number of 1 Bits", "Easy", "Bit Manipulation"],
  ["Counting Bits", "Easy", "Bit Manipulation"],
  ["Reverse Bits", "Easy", "Bit Manipulation"],
  ["Missing Number", "Easy", "Bit Manipulation"],
  ["Sum of Two Integers", "Medium", "Bit Manipulation"],
  ["Reverse Integer", "Medium", "Bit Manipulation"]
];

const existingTitles = new Set();
// Extract existing titles using a regex
let match;
const regex = /title:\s*["']([^"']+)["']/g;
while ((match = regex.exec(content)) !== null) {
  existingTitles.add(match[1]);
}

let newProblemsStr = "";
let currentId = 51;

additionalProblems.forEach(([title, difficulty, category]) => {
  if (!existingTitles.has(title)) {
    newProblemsStr += `
  {
    id: ${currentId++},
    title: "${title}",
    difficulty: "${difficulty}",
    category: "${category}",
    description: "Given an input, solve the problem. This is a classic ${category} problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\\n  // Write your code here\\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["${category.split(' & ')[0]}"],
    acceptance: ${Math.floor(Math.random() * 40) + 30},
    submissions: ${Math.floor(Math.random() * 100000) + 10000},
    likes: ${Math.floor(Math.random() * 5000) + 500},
    dislikes: ${Math.floor(Math.random() * 200) + 10},
    similarProblems: []
  },`;
  }
});

if (newProblemsStr) {
  // Insert before the last closing bracket "];"
  const insertIndex = content.lastIndexOf("];");
  content = content.slice(0, insertIndex) + newProblemsStr + "\n" + content.slice(insertIndex);
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log('Added ' + (currentId - 51) + ' new problems');
} else {
  console.log('No new problems to add');
}
