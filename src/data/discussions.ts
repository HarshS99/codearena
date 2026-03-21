import { Discussion } from '../types';

export const discussions: Discussion[] = [
  {
    id: 'd1',
    problemId: '1',
    author: 'codeMaster',
    title: 'O(n) HashMap Solution - Clean & Elegant',
    content: `Here's a clean solution using a HashMap. The idea is simple:

1. Iterate through the array
2. For each number, check if (target - number) exists in the map
3. If yes, return the indices
4. If no, add the current number to the map

Time: O(n), Space: O(n)`,
    likes: 1234,
    replies: 56,
    timestamp: Date.now() - 86400000,
    tags: ['Hash Table', 'Solution']
  },
  {
    id: 'd2',
    problemId: '1',
    author: 'pythonLover',
    title: 'Question about edge cases',
    content: `What happens if the array is empty? Should we return an empty array or throw an error?`,
    likes: 23,
    replies: 8,
    timestamp: Date.now() - 172800000,
    tags: ['Question']
  },
  {
    id: 'd3',
    problemId: '1',
    author: 'algoExpert',
    title: 'Time Complexity Analysis',
    content: `Let's discuss why this is O(n):
- We iterate through the array once: O(n)
- HashMap lookup is O(1) on average
- HashMap insertion is O(1) on average

Total: O(n) * O(1) = O(n)`,
    likes: 567,
    replies: 34,
    timestamp: Date.now() - 259200000,
    tags: ['Time Complexity', 'Analysis']
  },
  {
    id: 'd4',
    problemId: '2',
    author: 'linkedListPro',
    title: 'Recursive vs Iterative Approach',
    content: `Both approaches work, but iterative is more space-efficient. Let me explain why...`,
    likes: 890,
    replies: 45,
    timestamp: Date.now() - 86400000,
    tags: ['Solution', 'Recursion']
  },
  {
    id: 'd5',
    problemId: '3',
    author: 'slidingWindowGuru',
    title: 'Sliding Window Pattern Explained',
    content: `The sliding window pattern is perfect for this problem. Here's the intuition...`,
    likes: 1567,
    replies: 89,
    timestamp: Date.now() - 172800000,
    tags: ['Sliding Window', 'Pattern']
  }
];
