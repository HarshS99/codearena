import { Problem } from '../types';

export const problems: Problem[] = [
  // Arrays & Hashing (15 problems)
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: ['Array', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Adobe', 'Bloomberg', 'Oracle', 'Uber', 'Netflix'],
    topics: ['Array', 'Hash Table'],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] == 9' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ],
    constraints: ['2 <= nums.length <= 10^4', 'Only one valid answer exists'],
    testCases: [
      { input: '[2,7,11,15]\\n9', expectedOutput: '[0,1]' },
      { input: '[3,2,4]\\n6', expectedOutput: '[1,2]' },
      { input: '[3,3]\\n6', expectedOutput: '[0,1]', isHidden: true }
    ],
    starterCode: {
      javascript: `var twoSum = function(nums, target) {\n    \n};`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        `,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};`
    },
    acceptance: 49.3,
    submissions: 12453678,
    hints: ['Use a HashMap to store numbers and their indices', 'Check if (target - current) exists in map'],
    editorial: {
      approach: 'Use hash map for O(n) lookup',
      complexity: { time: 'O(n)', space: 'O(n)' },
      solution: {
        javascript: `var twoSum = function(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) return [map.get(complement), i];\n        map.set(nums[i], i);\n    }\n};`,
        python: `def twoSum(self, nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return [seen[target - num], i]\n        seen[num] = i`
      }
    }
  },
  {
    id: '217',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: ['Array', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Yahoo', 'Adobe'],
    topics: ['Array', 'Hash Table', 'Sorting'],
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' }
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    testCases: [
      { input: '[1,2,3,1]', expectedOutput: 'true' },
      { input: '[1,2,3,4]', expectedOutput: 'false' },
      { input: '[1,1,1,3,3,4,3,2,4,2]', expectedOutput: 'true', isHidden: true }
    ],
    starterCode: {
      javascript: `var containsDuplicate = function(nums) {\n    \n};`,
      python: `class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        `,
      java: `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        \n    }\n};`
    },
    acceptance: 61.2,
    submissions: 8234567,
    hints: ['Use a HashSet to track seen numbers', 'If number already in set, return true'],
    editorial: {
      approach: 'Use HashSet for O(1) lookups',
      complexity: { time: 'O(n)', space: 'O(n)' },
      solution: {
        javascript: `var containsDuplicate = function(nums) {\n    return new Set(nums).size !== nums.length;\n};`,
        python: `def containsDuplicate(self, nums):\n    return len(set(nums)) != len(nums)`
      }
    }
  },
  {
    id: '242',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: ['String', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Bloomberg', 'Uber'],
    topics: ['String', 'Hash Table', 'Sorting'],
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' }
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters'],
    testCases: [
      { input: '"anagram"\\n"nagaram"', expectedOutput: 'true' },
      { input: '"rat"\\n"car"', expectedOutput: 'false' },
      { input: '"listen"\\n"silent"', expectedOutput: 'true', isHidden: true }
    ],
    starterCode: {
      javascript: `var isAnagram = function(s, t) {\n    \n};`,
      python: `class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        `,
      java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        \n    }\n};`
    },
    acceptance: 63.8,
    submissions: 6789012,
    hints: ['Sort both strings and compare', 'Or use character frequency map'],
    editorial: {
      approach: 'Count character frequencies',
      complexity: { time: 'O(n)', space: 'O(1)' },
      solution: {
        javascript: `var isAnagram = function(s, t) {\n    if (s.length !== t.length) return false;\n    const count = {};\n    for (let char of s) count[char] = (count[char] || 0) + 1;\n    for (let char of t) {\n        if (!count[char]) return false;\n        count[char]--;\n    }\n    return true;\n};`,
        python: `def isAnagram(self, s, t):\n    return sorted(s) == sorted(t)`
      }
    }
  },
  {
    id: '49',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    category: ['Array', 'Hash Table', 'String'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Bloomberg', 'Adobe', 'Uber', 'Apple'],
    topics: ['Array', 'Hash Table', 'String', 'Sorting'],
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' }
    ],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100'],
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: '[""]', expectedOutput: '[[""]]' },
      { input: '["a"]', expectedOutput: '[["a"]]', isHidden: true }
    ],
    starterCode: {
      javascript: `var groupAnagrams = function(strs) {\n    \n};`,
      python: `class Solution:\n    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        `,
      java: `class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        \n    }\n};`
    },
    acceptance: 67.4,
    submissions: 3456789,
    hints: ['Use sorted string as key in hashmap', 'Or use character count array as key'],
    editorial: {
      approach: 'HashMap with sorted string as key',
      complexity: { time: 'O(n * k log k)', space: 'O(n * k)' },
      solution: {
        javascript: `var groupAnagrams = function(strs) {\n    const map = new Map();\n    for (let str of strs) {\n        const key = str.split('').sort().join('');\n        if (!map.has(key)) map.set(key, []);\n        map.get(key).push(str);\n    }\n    return Array.from(map.values());\n};`,
        python: `def groupAnagrams(self, strs):\n    groups = {}\n    for s in strs:\n        key = ''.join(sorted(s))\n        if key not in groups:\n            groups[key] = []\n        groups[key].append(s)\n    return list(groups.values())`
      }
    }
  },
  {
    id: '347',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    category: ['Array', 'Hash Table', 'Heap'],
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Bloomberg', 'Uber', 'Oracle'],
    topics: ['Array', 'Hash Table', 'Divide and Conquer', 'Sorting', 'Heap'],
    description: `Given an integer array nums and an integer k, return the k most frequent elements.`,
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' }
    ],
    constraints: ['1 <= nums.length <= 10^5', 'k is in the range [1, number of unique elements]'],
    testCases: [
      { input: '[1,1,1,2,2,3]\\n2', expectedOutput: '[1,2]' },
      { input: '[1]\\n1', expectedOutput: '[1]' },
      { input: '[4,1,-1,2,-1,2,3]\\n2', expectedOutput: '[-1,2]', isHidden: true }
    ],
    starterCode: {
      javascript: `var topKFrequent = function(nums, k) {\n    \n};`,
      python: `class Solution:\n    def topKFrequent(self, nums: List[int], k: int) -> List[int]:\n        `,
      java: `class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        \n    }\n};`
    },
    acceptance: 64.9,
    submissions: 2345678,
    hints: ['Use HashMap to count frequencies', 'Use Heap or Bucket Sort to find top K'],
    editorial: {
      approach: 'Bucket Sort using frequency array',
      complexity: { time: 'O(n)', space: 'O(n)' },
      solution: {
        javascript: `var topKFrequent = function(nums, k) {\n    const count = {};\n    const freq = Array(nums.length + 1).fill().map(() => []);\n    \n    for (let n of nums) count[n] = (count[n] || 0) + 1;\n    for (let n in count) freq[count[n]].push(parseInt(n));\n    \n    const res = [];\n    for (let i = freq.length - 1; i >= 0; i--) {\n        for (let n of freq[i]) {\n            res.push(n);\n            if (res.length === k) return res;\n        }\n    }\n};`,
        python: `def topKFrequent(self, nums, k):\n    count = {}\n    freq = [[] for i in range(len(nums) + 1)]\n    \n    for n in nums:\n        count[n] = 1 + count.get(n, 0)\n    for n, c in count.items():\n        freq[c].append(n)\n    \n    res = []\n    for i in range(len(freq) - 1, 0, -1):\n        for n in freq[i]:\n            res.append(n)\n            if len(res) == k:\n                return res`
      }
    }
  },
  
  // Two Pointers (5 problems)
  {
    id: '125',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    category: ['Two Pointers', 'String'],
    companies: ['Meta', 'Amazon', 'Microsoft', 'Google', 'Bloomberg', 'Apple'],
    topics: ['Two Pointers', 'String'],
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
      { input: 's = "race a car"', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 2 * 10^5'],
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { input: '"race a car"', expectedOutput: 'false' },
      { input: '" "', expectedOutput: 'true', isHidden: true }
    ],
    starterCode: {
      javascript: `var isPalindrome = function(s) {\n    \n};`,
      python: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        `,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};`
    },
    acceptance: 44.8,
    submissions: 4567890,
    hints: ['Use two pointers from start and end', 'Skip non-alphanumeric characters'],
    editorial: {
      approach: 'Two pointers from both ends',
      complexity: { time: 'O(n)', space: 'O(1)' },
      solution: {
        javascript: `var isPalindrome = function(s) {\n    let l = 0, r = s.length - 1;\n    while (l < r) {\n        while (l < r && !isAlphaNum(s[l])) l++;\n        while (r > l && !isAlphaNum(s[r])) r--;\n        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;\n        l++; r--;\n    }\n    return true;\n};\n\nfunction isAlphaNum(c) {\n    return /[a-zA-Z0-9]/.test(c);\n}`,
        python: `def isPalindrome(self, s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and not s[l].isalnum():\n            l += 1\n        while r > l and not s[r].isalnum():\n            r -= 1\n        if s[l].lower() != s[r].lower():\n            return False\n        l, r = l + 1, r - 1\n    return True`
      }
    }
  },
  {
    id: '15',
    title: '3Sum',
    difficulty: 'Medium',
    category: ['Array', 'Two Pointers'],
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Apple', 'Adobe', 'Bloomberg', 'Oracle'],
    topics: ['Array', 'Two Pointers', 'Sorting'],
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.`,
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', output: '[]' }
    ],
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    testCases: [
      { input: '[-1,0,1,2,-1,-4]', expectedOutput: '[[-1,-1,2],[-1,0,1]]' },
      { input: '[0,1,1]', expectedOutput: '[]' },
      { input: '[0,0,0]', expectedOutput: '[[0,0,0]]', isHidden: true }
    ],
    starterCode: {
      javascript: `var threeSum = function(nums) {\n    \n};`,
      python: `class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        `,
      java: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }\n};`
    },
    acceptance: 32.7,
    submissions: 5678901,
    hints: ['Sort the array first', 'Fix one element and use two pointers for the rest', 'Skip duplicates'],
    editorial: {
      approach: 'Sort + Two Pointers',
      complexity: { time: 'O(n²)', space: 'O(1)' },
      solution: {
        javascript: `var threeSum = function(nums) {\n    nums.sort((a, b) => a - b);\n    const res = [];\n    \n    for (let i = 0; i < nums.length; i++) {\n        if (i > 0 && nums[i] === nums[i-1]) continue;\n        \n        let l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            const sum = nums[i] + nums[l] + nums[r];\n            if (sum > 0) r--;\n            else if (sum < 0) l++;\n            else {\n                res.push([nums[i], nums[l], nums[r]]);\n                l++;\n                while (nums[l] === nums[l-1] && l < r) l++;\n            }\n        }\n    }\n    return res;\n};`,
        python: `def threeSum(self, nums):\n    res = []\n    nums.sort()\n    \n    for i, a in enumerate(nums):\n        if i > 0 and a == nums[i - 1]:\n            continue\n        \n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            threeSum = a + nums[l] + nums[r]\n            if threeSum > 0:\n                r -= 1\n            elif threeSum < 0:\n                l += 1\n            else:\n                res.append([a, nums[l], nums[r]])\n                l += 1\n                while nums[l] == nums[l - 1] and l < r:\n                    l += 1\n    return res`
      }
    }
  },
  {
    id: '11',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: ['Array', 'Two Pointers'],
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Bloomberg'],
    topics: ['Array', 'Two Pointers', 'Greedy'],
    description: `Given n non-negative integers height where each represents a point at coordinate (i, height[i]), find two lines that together with the x-axis form a container that contains the most water.`,
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
      { input: 'height = [1,1]', output: '1' }
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5'],
    testCases: [
      { input: '[1,8,6,2,5,4,8,3,7]', expectedOutput: '49' },
      { input: '[1,1]', expectedOutput: '1' },
      { input: '[4,3,2,1,4]', expectedOutput: '16', isHidden: true }
    ],
    starterCode: {
      javascript: `var maxArea = function(height) {\n    \n};`,
      python: `class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        `,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};`
    },
    acceptance: 54.6,
    submissions: 3456789,
    hints: ['Start with widest container', 'Move pointer with smaller height'],
    editorial: {
      approach: 'Two pointers from both ends',
      complexity: { time: 'O(n)', space: 'O(1)' },
      solution: {
        javascript: `var maxArea = function(height) {\n    let l = 0, r = height.length - 1;\n    let maxArea = 0;\n    \n    while (l < r) {\n        const area = (r - l) * Math.min(height[l], height[r]);\n        maxArea = Math.max(maxArea, area);\n        \n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    \n    return maxArea;\n};`,
        python: `def maxArea(self, height):\n    l, r = 0, len(height) - 1\n    res = 0\n    \n    while l < r:\n        area = (r - l) * min(height[l], height[r])\n        res = max(res, area)\n        \n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    \n    return res`
      }
    }
  },

  // Binary Search (7 problems)
  {
    id: '704',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: ['Array', 'Binary Search'],
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Bloomberg'],
    topics: ['Array', 'Binary Search'],
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.`,
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 10^4', 'All integers in nums are unique'],
    testCases: [
      { input: '[-1,0,3,5,9,12]\\n9', expectedOutput: '4' },
      { input: '[-1,0,3,5,9,12]\\n2', expectedOutput: '-1' },
      { input: '[5]\\n5', expectedOutput: '0', isHidden: true }
    ],
    starterCode: {
      javascript: `var search = function(nums, target) {\n    \n};`,
      python: `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        `,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};`
    },
    acceptance: 56.2,
    submissions: 2345678,
    hints: ['Use left and right pointers', 'Check middle element', 'Adjust pointers based on comparison'],
    editorial: {
      approach: 'Classic Binary Search',
      complexity: { time: 'O(log n)', space: 'O(1)' },
      solution: {
        javascript: `var search = function(nums, target) {\n    let l = 0, r = nums.length - 1;\n    \n    while (l <= r) {\n        const mid = Math.floor((l + r) / 2);\n        \n        if (nums[mid] === target) return mid;\n        if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    \n    return -1;\n};`,
        python: `def search(self, nums, target):\n    l, r = 0, len(nums) - 1\n    \n    while l <= r:\n        mid = (l + r) // 2\n        \n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            l = mid + 1\n        else:\n            r = mid - 1\n    \n    return -1`
      }
    }
  },
  {
    id: '33',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    category: ['Array', 'Binary Search'],
    companies: ['Meta', 'Amazon', 'Microsoft', 'Google', 'Apple', 'Bloomberg', 'Adobe'],
    topics: ['Array', 'Binary Search'],
    description: `There is an integer array nums sorted in ascending order (with distinct values). nums is rotated at an unknown pivot. Given the array after rotation and a target, return the index of target. If not found, return -1.`,
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 5000', 'All values are unique'],
    testCases: [
      { input: '[4,5,6,7,0,1,2]\\n0', expectedOutput: '4' },
      { input: '[4,5,6,7,0,1,2]\\n3', expectedOutput: '-1' },
      { input: '[1]\\n0', expectedOutput: '-1', isHidden: true }
    ],
    starterCode: {
      javascript: `var search = function(nums, target) {\n    \n};`,
      python: `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        `,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};`
    },
    acceptance: 39.4,
    submissions: 4567890,
    hints: ['Identify which half is sorted', 'Check if target is in sorted half'],
    editorial: {
      approach: 'Modified Binary Search',
      complexity: { time: 'O(log n)', space: 'O(1)' },
      solution: {
        javascript: `var search = function(nums, target) {\n    let l = 0, r = nums.length - 1;\n    \n    while (l <= r) {\n        const mid = Math.floor((l + r) / 2);\n        \n        if (nums[mid] === target) return mid;\n        \n        // Left sorted portion\n        if (nums[l] <= nums[mid]) {\n            if (target > nums[mid] || target < nums[l]) {\n                l = mid + 1;\n            } else {\n                r = mid - 1;\n            }\n        }\n        // Right sorted portion\n        else {\n            if (target < nums[mid] || target > nums[r]) {\n                r = mid - 1;\n            } else {\n                l = mid + 1;\n            }\n        }\n    }\n    \n    return -1;\n};`,
        python: `def search(self, nums, target):\n    l, r = 0, len(nums) - 1\n    \n    while l <= r:\n        mid = (l + r) // 2\n        if target == nums[mid]:\n            return mid\n        \n        # left sorted portion\n        if nums[l] <= nums[mid]:\n            if target > nums[mid] or target < nums[l]:\n                l = mid + 1\n            else:\n                r = mid - 1\n        # right sorted portion\n        else:\n            if target < nums[mid] or target > nums[r]:\n                r = mid - 1\n            else:\n                l = mid + 1\n    return -1`
      }
    }
  },

  // Linked List (6 problems)
  {
    id: '206',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: ['Linked List'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Adobe', 'Bloomberg', 'Uber'],
    topics: ['Linked List', 'Recursion'],
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' }
    ],
    constraints: ['The number of nodes is in the range [0, 5000]'],
    testCases: [
      { input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' },
      { input: '[1,2]', expectedOutput: '[2,1]' },
      { input: '[]', expectedOutput: '[]', isHidden: true }
    ],
    starterCode: {
      javascript: `var reverseList = function(head) {\n    \n};`,
      python: `class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        `,
      java: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};`
    },
    acceptance: 72.4,
    submissions: 5678901,
    hints: ['Use iterative approach with prev, curr pointers', 'Or use recursion'],
    editorial: {
      approach: 'Iterative with two pointers',
      complexity: { time: 'O(n)', space: 'O(1)' },
      solution: {
        javascript: `var reverseList = function(head) {\n    let prev = null, curr = head;\n    \n    while (curr) {\n        const next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    \n    return prev;\n};`,
        python: `def reverseList(self, head):\n    prev, curr = None, head\n    \n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    \n    return prev`
      }
    }
  },
  {
    id: '21',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: ['Linked List'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Adobe'],
    topics: ['Linked List', 'Recursion'],
    description: `Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.`,
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' }
    ],
    constraints: ['The number of nodes in both lists is in the range [0, 50]'],
    testCases: [
      { input: '[1,2,4]\\n[1,3,4]', expectedOutput: '[1,1,2,3,4,4]' },
      { input: '[]\\n[]', expectedOutput: '[]' },
      { input: '[]\\n[0]', expectedOutput: '[0]', isHidden: true }
    ],
    starterCode: {
      javascript: `var mergeTwoLists = function(list1, list2) {\n    \n};`,
      python: `class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        `,
      java: `class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};`
    },
    acceptance: 61.7,
    submissions: 4567890,
    hints: ['Use dummy head', 'Compare values and attach smaller one'],
    editorial: {
      approach: 'Iterative with dummy node',
      complexity: { time: 'O(n + m)', space: 'O(1)' },
      solution: {
        javascript: `var mergeTwoLists = function(list1, list2) {\n    const dummy = new ListNode();\n    let tail = dummy;\n    \n    while (list1 && list2) {\n        if (list1.val < list2.val) {\n            tail.next = list1;\n            list1 = list1.next;\n        } else {\n            tail.next = list2;\n            list2 = list2.next;\n        }\n        tail = tail.next;\n    }\n    \n    tail.next = list1 || list2;\n    return dummy.next;\n};`,
        python: `def mergeTwoLists(self, list1, list2):\n    dummy = ListNode()\n    tail = dummy\n    \n    while list1 and list2:\n        if list1.val < list2.val:\n            tail.next = list1\n            list1 = list1.next\n        else:\n            tail.next = list2\n            list2 = list2.next\n        tail = tail.next\n    \n    if list1:\n        tail.next = list1\n    elif list2:\n        tail.next = list2\n    \n    return dummy.next`
      }
    }
  },
  {
    id: '141',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    category: ['Linked List', 'Two Pointers'],
    companies: ['Amazon', 'Microsoft', 'Meta', 'Google', 'Apple', 'Bloomberg'],
    topics: ['Hash Table', 'Linked List', 'Two Pointers'],
    description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.`,
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true' },
      { input: 'head = [1,2], pos = 0', output: 'true' }
    ],
    constraints: ['The number of nodes is in the range [0, 10^4]'],
    testCases: [
      { input: '[3,2,0,-4]\\n1', expectedOutput: 'true' },
      { input: '[1,2]\\n0', expectedOutput: 'true' },
      { input: '[1]\\n-1', expectedOutput: 'false', isHidden: true }
    ],
    starterCode: {
      javascript: `var hasCycle = function(head) {\n    \n};`,
      python: `class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        `,
      java: `class Solution {\n    public boolean hasCycle(ListNode head) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        \n    }\n};`
    },
    acceptance: 48.3,
    submissions: 6789012,
    hints: ['Use Floyd\'s Cycle Detection (slow & fast pointers)', 'If fast catches slow, there\'s a cycle'],
    editorial: {
      approach: 'Floyd\'s Cycle Detection Algorithm',
      complexity: { time: 'O(n)', space: 'O(1)' },
      solution: {
        javascript: `var hasCycle = function(head) {\n    let slow = head, fast = head;\n    \n    while (fast && fast.next) {\n        slow = slow.next;\n        fast = fast.next.next;\n        \n        if (slow === fast) return true;\n    }\n    \n    return false;\n};`,
        python: `def hasCycle(self, head):\n    slow, fast = head, head\n    \n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    \n    return False`
      }
    }
  },

  // Stack (5 problems)
  {
    id: '20',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: ['String', 'Stack'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Bloomberg', 'Adobe', 'Uber'],
    topics: ['String', 'Stack'],
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only'],
    testCases: [
      { input: '"()"', expectedOutput: 'true' },
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' },
      { input: '"{[]}"', expectedOutput: 'true', isHidden: true }
    ],
    starterCode: {
      javascript: `var isValid = function(s) {\n    \n};`,
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        `,
      java: `class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};`
    },
    acceptance: 40.2,
    submissions: 8901234,
    hints: ['Use a stack to track opening brackets', 'Match closing brackets with stack top'],
    editorial: {
      approach: 'Stack-based matching',
      complexity: { time: 'O(n)', space: 'O(n)' },
      solution: {
        javascript: `var isValid = function(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    \n    for (let char of s) {\n        if (char in map) {\n            if (stack.pop() !== map[char]) return false;\n        } else {\n            stack.push(char);\n        }\n    }\n    \n    return stack.length === 0;\n};`,
        python: `def isValid(self, s):\n    stack = []\n    closeToOpen = { ")": "(", "]": "[", "}": "{" }\n    \n    for c in s:\n        if c in closeToOpen:\n            if stack and stack[-1] == closeToOpen[c]:\n                stack.pop()\n            else:\n                return False\n        else:\n            stack.append(c)\n    \n    return True if not stack else False`
      }
    }
  },

  // Trees (8 problems)
  {
    id: '104',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    category: ['Tree', 'DFS'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'LinkedIn'],
    topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    description: `Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' }
    ],
    constraints: ['The number of nodes is in the range [0, 10^4]'],
    testCases: [
      { input: '[3,9,20,null,null,15,7]', expectedOutput: '3' },
      { input: '[1,null,2]', expectedOutput: '2' },
      { input: '[]', expectedOutput: '0', isHidden: true }
    ],
    starterCode: {
      javascript: `var maxDepth = function(root) {\n    \n};`,
      python: `class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        `,
      java: `class Solution {\n    public int maxDepth(TreeNode root) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        \n    }\n};`
    },
    acceptance: 74.2,
    submissions: 5678901,
    hints: ['Use recursion (DFS)', 'Max depth = 1 + max(left depth, right depth)'],
    editorial: {
      approach: 'Recursive DFS',
      complexity: { time: 'O(n)', space: 'O(h)' },
      solution: {
        javascript: `var maxDepth = function(root) {\n    if (!root) return 0;\n    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n};`,
        python: `def maxDepth(self, root):\n    if not root:\n        return 0\n    return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`
      }
    }
  },
  {
    id: '226',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    category: ['Tree', 'DFS'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Bloomberg'],
    topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    description: `Given the root of a binary tree, invert the tree, and return its root.`,
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', output: '[2,3,1]' }
    ],
    constraints: ['The number of nodes is in the range [0, 100]'],
    testCases: [
      { input: '[4,2,7,1,3,6,9]', expectedOutput: '[4,7,2,9,6,3,1]' },
      { input: '[2,1,3]', expectedOutput: '[2,3,1]' },
      { input: '[]', expectedOutput: '[]', isHidden: true }
    ],
    starterCode: {
      javascript: `var invertTree = function(root) {\n    \n};`,
      python: `class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        `,
      java: `class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        \n    }\n};`
    },
    acceptance: 74.8,
    submissions: 3456789,
    hints: ['Swap left and right children recursively'],
    editorial: {
      approach: 'Recursive swap',
      complexity: { time: 'O(n)', space: 'O(h)' },
      solution: {
        javascript: `var invertTree = function(root) {\n    if (!root) return null;\n    \n    [root.left, root.right] = [root.right, root.left];\n    invertTree(root.left);\n    invertTree(root.right);\n    \n    return root;\n};`,
        python: `def invertTree(self, root):\n    if not root:\n        return None\n    \n    root.left, root.right = root.right, root.left\n    self.invertTree(root.left)\n    self.invertTree(root.right)\n    \n    return root`
      }
    }
  },

  // Dynamic Programming (10 problems)
  {
    id: '70',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: ['Dynamic Programming'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Adobe', 'Bloomberg'],
    topics: ['Math', 'Dynamic Programming', 'Memoization'],
    description: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 or 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1' }
    ],
    constraints: ['1 <= n <= 45'],
    testCases: [
      { input: '2', expectedOutput: '2' },
      { input: '3', expectedOutput: '3' },
      { input: '5', expectedOutput: '8', isHidden: true }
    ],
    starterCode: {
      javascript: `var climbStairs = function(n) {\n    \n};`,
      python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        `,
      java: `class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};`
    },
    acceptance: 52.1,
    submissions: 6789012,
    hints: ['This is Fibonacci sequence', 'dp[i] = dp[i-1] + dp[i-2]'],
    editorial: {
      approach: 'Dynamic Programming (Fibonacci)',
      complexity: { time: 'O(n)', space: 'O(1)' },
      solution: {
        javascript: `var climbStairs = function(n) {\n    if (n <= 2) return n;\n    \n    let one = 1, two = 2;\n    \n    for (let i = 3; i <= n; i++) {\n        let temp = one + two;\n        one = two;\n        two = temp;\n    }\n    \n    return two;\n};`,
        python: `def climbStairs(self, n):\n    if n <= 2:\n        return n\n    \n    one, two = 1, 2\n    \n    for i in range(3, n + 1):\n        one, two = two, one + two\n    \n    return two`
      }
    }
  },
  {
    id: '198',
    title: 'House Robber',
    difficulty: 'Medium',
    category: ['Array', 'Dynamic Programming'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Adobe'],
    topics: ['Array', 'Dynamic Programming'],
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected. Determine the maximum amount of money you can rob tonight without alerting the police.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 4.' },
      { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1, 3, and 5. Total = 2 + 9 + 1 = 12.' }
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    testCases: [
      { input: '[1,2,3,1]', expectedOutput: '4' },
      { input: '[2,7,9,3,1]', expectedOutput: '12' },
      { input: '[2,1,1,2]', expectedOutput: '4', isHidden: true }
    ],
    starterCode: {
      javascript: `var rob = function(nums) {\n    \n};`,
      python: `class Solution:\n    def rob(self, nums: List[int]) -> int:\n        `,
      java: `class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};`
    },
    acceptance: 49.7,
    submissions: 3456789,
    hints: ['For each house, decide: rob it or skip it', 'dp[i] = max(dp[i-1], nums[i] + dp[i-2])'],
    editorial: {
      approach: 'Dynamic Programming',
      complexity: { time: 'O(n)', space: 'O(1)' },
      solution: {
        javascript: `var rob = function(nums) {\n    let rob1 = 0, rob2 = 0;\n    \n    for (let n of nums) {\n        let temp = Math.max(n + rob1, rob2);\n        rob1 = rob2;\n        rob2 = temp;\n    }\n    \n    return rob2;\n};`,
        python: `def rob(self, nums):\n    rob1, rob2 = 0, 0\n    \n    for n in nums:\n        temp = max(n + rob1, rob2)\n        rob1 = rob2\n        rob2 = temp\n    \n    return rob2`
      }
    }
  },
  {
    id: '300',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    category: ['Array', 'Binary Search', 'Dynamic Programming'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Bloomberg'],
    topics: ['Array', 'Binary Search', 'Dynamic Programming'],
    description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.`,
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'The longest increasing subsequence is [2,3,7,101]' },
      { input: 'nums = [0,1,0,3,2,3]', output: '4' }
    ],
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
    testCases: [
      { input: '[10,9,2,5,3,7,101,18]', expectedOutput: '4' },
      { input: '[0,1,0,3,2,3]', expectedOutput: '4' },
      { input: '[7,7,7,7,7,7,7]', expectedOutput: '1', isHidden: true }
    ],
    starterCode: {
      javascript: `var lengthOfLIS = function(nums) {\n    \n};`,
      python: `class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        `,
      java: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        \n    }\n};`
    },
    acceptance: 52.3,
    submissions: 2345678,
    hints: ['Use DP array where dp[i] = length of LIS ending at i', 'Or use binary search with greedy approach'],
    editorial: {
      approach: 'Dynamic Programming',
      complexity: { time: 'O(n²)', space: 'O(n)' },
      solution: {
        javascript: `var lengthOfLIS = function(nums) {\n    const LIS = Array(nums.length).fill(1);\n    \n    for (let i = nums.length - 1; i >= 0; i--) {\n        for (let j = i + 1; j < nums.length; j++) {\n            if (nums[i] < nums[j]) {\n                LIS[i] = Math.max(LIS[i], 1 + LIS[j]);\n            }\n        }\n    }\n    \n    return Math.max(...LIS);\n};`,
        python: `def lengthOfLIS(self, nums):\n    LIS = [1] * len(nums)\n    \n    for i in range(len(nums) - 1, -1, -1):\n        for j in range(i + 1, len(nums)):\n            if nums[i] < nums[j]:\n                LIS[i] = max(LIS[i], 1 + LIS[j])\n    \n    return max(LIS)`
      }
    }
  },

  // Graphs (6 problems)
  {
    id: '200',
    title: 'Number of Islands',
    difficulty: 'Medium',
    category: ['Array', 'DFS', 'BFS'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Bloomberg', 'Uber'],
    topics: ['Array', 'Depth-First Search', 'Breadth-First Search', 'Union Find', 'Matrix'],
    description: `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' }
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300'],
    testCases: [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expectedOutput: '1' },
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expectedOutput: '3' },
      { input: '[["1","0","1","0","1"]]', expectedOutput: '3', isHidden: true }
    ],
    starterCode: {
      javascript: `var numIslands = function(grid) {\n    \n};`,
      python: `class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        `,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        \n    }\n};`
    },
    acceptance: 57.2,
    submissions: 4567890,
    hints: ['Use DFS/BFS to mark visited land cells', 'Count number of DFS/BFS calls'],
    editorial: {
      approach: 'DFS with visited marking',
      complexity: { time: 'O(m * n)', space: 'O(m * n)' },
      solution: {
        javascript: `var numIslands = function(grid) {\n    if (!grid || !grid.length) return 0;\n    \n    let count = 0;\n    const rows = grid.length, cols = grid[0].length;\n    \n    function dfs(r, c) {\n        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;\n        grid[r][c] = '0';\n        dfs(r + 1, c);\n        dfs(r - 1, c);\n        dfs(r, c + 1);\n        dfs(r, c - 1);\n    }\n    \n    for (let r = 0; r < rows; r++) {\n        for (let c = 0; c < cols; c++) {\n            if (grid[r][c] === '1') {\n                count++;\n                dfs(r, c);\n            }\n        }\n    }\n    \n    return count;\n};`,
        python: `def numIslands(self, grid):\n    if not grid:\n        return 0\n    \n    rows, cols = len(grid), len(grid[0])\n    islands = 0\n    \n    def dfs(r, c):\n        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':\n            return\n        grid[r][c] = '0'\n        dfs(r + 1, c)\n        dfs(r - 1, c)\n        dfs(r, c + 1)\n        dfs(r, c - 1)\n    \n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                islands += 1\n                dfs(r, c)\n    \n    return islands`
      }
    }
  },
  {
    id: '133',
    title: 'Clone Graph',
    difficulty: 'Medium',
    category: ['Graph', 'DFS', 'BFS'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Bloomberg'],
    topics: ['Hash Table', 'Depth-First Search', 'Breadth-First Search', 'Graph'],
    description: `Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.`,
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' },
      { input: 'adjList = [[]]', output: '[[]]' }
    ],
    constraints: ['The number of nodes is in the range [0, 100]'],
    testCases: [
      { input: '[[2,4],[1,3],[2,4],[1,3]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]' },
      { input: '[[]]', expectedOutput: '[[]]' },
      { input: '[]', expectedOutput: '[]', isHidden: true }
    ],
    starterCode: {
      javascript: `var cloneGraph = function(node) {\n    \n};`,
      python: `class Solution:\n    def cloneGraph(self, node: 'Node') -> 'Node':\n        `,
      java: `class Solution {\n    public Node cloneGraph(Node node) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        \n    }\n};`
    },
    acceptance: 51.8,
    submissions: 2345678,
    hints: ['Use HashMap to store old node -> new node mapping', 'Use DFS/BFS to traverse'],
    editorial: {
      approach: 'DFS with HashMap',
      complexity: { time: 'O(N + E)', space: 'O(N)' },
      solution: {
        javascript: `var cloneGraph = function(node) {\n    if (!node) return null;\n    \n    const oldToNew = new Map();\n    \n    function dfs(node) {\n        if (oldToNew.has(node)) return oldToNew.get(node);\n        \n        const copy = new Node(node.val);\n        oldToNew.set(node, copy);\n        \n        for (let nei of node.neighbors) {\n            copy.neighbors.push(dfs(nei));\n        }\n        \n        return copy;\n    }\n    \n    return dfs(node);\n};`,
        python: `def cloneGraph(self, node):\n    oldToNew = {}\n    \n    def dfs(node):\n        if node in oldToNew:\n            return oldToNew[node]\n        \n        copy = Node(node.val)\n        oldToNew[node] = copy\n        for nei in node.neighbors:\n            copy.neighbors.append(dfs(nei))\n        return copy\n    \n    return dfs(node) if node else None`
      }
    }
  },

  // Sliding Window (4 problems)
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: ['String', 'Hash Table', 'Sliding Window'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Adobe', 'Bloomberg', 'Uber'],
    topics: ['Hash Table', 'String', 'Sliding Window'],
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc"' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b"' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke"' }
    ],
    constraints: ['0 <= s.length <= 5 * 10^4'],
    testCases: [
      { input: '"abcabcbb"', expectedOutput: '3' },
      { input: '"bbbbb"', expectedOutput: '1' },
      { input: '"pwwkew"', expectedOutput: '3', isHidden: true }
    ],
    starterCode: {
      javascript: `var lengthOfLongestSubstring = function(s) {\n    \n};`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        `,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};`
    },
    acceptance: 34.2,
    submissions: 7890123,
    hints: ['Use sliding window with HashSet', 'Remove chars from left when duplicate found'],
    editorial: {
      approach: 'Sliding Window with HashSet',
      complexity: { time: 'O(n)', space: 'O(min(m, n))' },
      solution: {
        javascript: `var lengthOfLongestSubstring = function(s) {\n    const charSet = new Set();\n    let l = 0, res = 0;\n    \n    for (let r = 0; r < s.length; r++) {\n        while (charSet.has(s[r])) {\n            charSet.delete(s[l]);\n            l++;\n        }\n        charSet.add(s[r]);\n        res = Math.max(res, r - l + 1);\n    }\n    \n    return res;\n};`,
        python: `def lengthOfLongestSubstring(self, s):\n    charSet = set()\n    l = 0\n    res = 0\n    \n    for r in range(len(s)):\n        while s[r] in charSet:\n            charSet.remove(s[l])\n            l += 1\n        charSet.add(s[r])\n        res = max(res, r - l + 1)\n    \n    return res`
      }
    }
  },

  // Backtracking (3 problems)
  {
    id: '46',
    title: 'Permutations',
    difficulty: 'Medium',
    category: ['Array', 'Backtracking'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Bloomberg'],
    topics: ['Array', 'Backtracking'],
    description: `Given an array nums of distinct integers, return all the possible permutations.`,
    examples: [
      { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
      { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' }
    ],
    constraints: ['1 <= nums.length <= 6', '-10 <= nums[i] <= 10', 'All the integers of nums are unique'],
    testCases: [
      { input: '[1,2,3]', expectedOutput: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
      { input: '[0,1]', expectedOutput: '[[0,1],[1,0]]' },
      { input: '[1]', expectedOutput: '[[1]]', isHidden: true }
    ],
    starterCode: {
      javascript: `var permute = function(nums) {\n    \n};`,
      python: `class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        `,
      java: `class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        \n    }\n};`
    },
    acceptance: 75.4,
    submissions: 3456789,
    hints: ['Use backtracking', 'Swap elements to generate permutations'],
    editorial: {
      approach: 'Backtracking',
      complexity: { time: 'O(n * n!)', space: 'O(n)' },
      solution: {
        javascript: `var permute = function(nums) {\n    const res = [];\n    \n    function backtrack(current) {\n        if (current.length === nums.length) {\n            res.push([...current]);\n            return;\n        }\n        \n        for (let num of nums) {\n            if (!current.includes(num)) {\n                current.push(num);\n                backtrack(current);\n                current.pop();\n            }\n        }\n    }\n    \n    backtrack([]);\n    return res;\n};`,
        python: `def permute(self, nums):\n    res = []\n    \n    def backtrack(curr):\n        if len(curr) == len(nums):\n            res.append(curr[:])\n            return\n        \n        for n in nums:\n            if n not in curr:\n                curr.append(n)\n                backtrack(curr)\n                curr.pop()\n    \n    backtrack([])\n    return res`
      }
    }
  },

  // Tries (2 problems)
  {
    id: '208',
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    category: ['Design', 'Trie'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Bloomberg'],
    topics: ['Hash Table', 'String', 'Design', 'Trie'],
    description: `Implement the Trie class with insert, search, and startsWith methods.`,
    examples: [
      { input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]', output: '[null, null, true, false, true, null, true]' }
    ],
    constraints: ['1 <= word.length, prefix.length <= 2000', 'word and prefix consist only of lowercase English letters'],
    testCases: [
      { input: '["Trie","insert","search"]\\n[[],["apple"],["apple"]]', expectedOutput: '[null,null,true]' },
      { input: '["Trie","insert","startsWith"]\\n[[],["apple"],["app"]]', expectedOutput: '[null,null,true]', isHidden: true }
    ],
    starterCode: {
      javascript: `class Trie {\n    constructor() {\n        \n    }\n    \n    insert(word) {\n        \n    }\n    \n    search(word) {\n        \n    }\n    \n    startsWith(prefix) {\n        \n    }\n}`,
      python: `class Trie:\n    def __init__(self):\n        \n    \n    def insert(self, word: str) -> None:\n        \n    \n    def search(self, word: str) -> bool:\n        \n    \n    def startsWith(self, prefix: str) -> bool:\n        `,
      java: `class Trie {\n    public Trie() {\n        \n    }\n    \n    public void insert(String word) {\n        \n    }\n    \n    public boolean search(String word) {\n        \n    }\n    \n    public boolean startsWith(String prefix) {\n        \n    }\n}`,
      cpp: `class Trie {\npublic:\n    Trie() {\n        \n    }\n    \n    void insert(string word) {\n        \n    }\n    \n    bool search(string word) {\n        \n    }\n    \n    bool startsWith(string prefix) {\n        \n    }\n};`
    },
    acceptance: 63.7,
    submissions: 1234567,
    hints: ['Use nested hash maps for each node', 'Mark end of word with a flag'],
    editorial: {
      approach: 'Trie with nested objects',
      complexity: { time: 'O(m) for all operations', space: 'O(n * m)' },
      solution: {
        javascript: `class TrieNode {\n    constructor() {\n        this.children = {};\n        this.isWord = false;\n    }\n}\n\nclass Trie {\n    constructor() {\n        this.root = new TrieNode();\n    }\n    \n    insert(word) {\n        let cur = this.root;\n        for (let c of word) {\n            if (!(c in cur.children)) {\n                cur.children[c] = new TrieNode();\n            }\n            cur = cur.children[c];\n        }\n        cur.isWord = true;\n    }\n    \n    search(word) {\n        let cur = this.root;\n        for (let c of word) {\n            if (!(c in cur.children)) return false;\n            cur = cur.children[c];\n        }\n        return cur.isWord;\n    }\n    \n    startsWith(prefix) {\n        let cur = this.root;\n        for (let c of prefix) {\n            if (!(c in cur.children)) return false;\n            cur = cur.children[c];\n        }\n        return true;\n    }\n}`,
        python: `class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.isWord = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    \n    def insert(self, word):\n        cur = self.root\n        for c in word:\n            if c not in cur.children:\n                cur.children[c] = TrieNode()\n            cur = cur.children[c]\n        cur.isWord = True\n    \n    def search(self, word):\n        cur = self.root\n        for c in word:\n            if c not in cur.children:\n                return False\n            cur = cur.children[c]\n        return cur.isWord\n    \n    def startsWith(self, prefix):\n        cur = self.root\n        for c in prefix:\n            if c not in cur.children:\n                return False\n            cur = cur.children[c]\n        return True`
      }
    }
  }
];
