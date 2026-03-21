export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: { [key: string]: string };
  testCases: { input: string; expectedOutput: string; isHidden: boolean }[];
  hints: string[];
  companies: string[];
  topics: string[];
  acceptance: number;
  submissions: number;
  likes: number;
  dislikes: number;
  similarProblems: string[];
}

export const problems: Problem[] = [
  // ============== ARRAYS & HASHING ==============
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" }
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists."],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n    // Write your code here\n    \n};`,
      python: `def twoSum(nums, target):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", isHidden: false },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]", isHidden: false },
      { input: "[3,3]\n6", expectedOutput: "[0,1]", isHidden: true }
    ],
    hints: ["Try using a hash map to store values and their indices.", "For each number, check if target - num exists in the map."],
    companies: ["Google", "Amazon", "Microsoft", "Apple", "Meta", "Bloomberg", "Adobe", "Uber"],
    topics: ["Array", "Hash Table"],
    acceptance: 49.2,
    submissions: 12500000,
    likes: 45000,
    dislikes: 1200,
    similarProblems: ["3Sum", "Two Sum II", "4Sum"]
  },
  {
    id: 2,
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    examples: [
      { input: "nums = [1,2,3,1]", output: "true", explanation: "The element 1 appears twice." },
      { input: "nums = [1,2,3,4]", output: "false" },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    starterCode: {
      javascript: `function containsDuplicate(nums) {\n    // Write your code here\n    \n};`,
      python: `def containsDuplicate(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "true", isHidden: false },
      { input: "[1,2,3,4]", expectedOutput: "false", isHidden: false },
      { input: "[1,1,1,3,3,4,3,2,4,2]", expectedOutput: "true", isHidden: true }
    ],
    hints: ["Use a Set to track seen elements.", "If you see an element twice, return true."],
    companies: ["Amazon", "Google", "Apple", "Microsoft", "Adobe"],
    topics: ["Array", "Hash Table", "Sorting"],
    acceptance: 61.0,
    submissions: 5200000,
    likes: 8500,
    dislikes: 1100,
    similarProblems: ["Contains Duplicate II", "Contains Duplicate III"]
  },
  {
    id: 3,
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" }
    ],
    constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters."],
    starterCode: {
      javascript: `function isAnagram(s, t) {\n    // Write your code here\n    \n};`,
      python: `def isAnagram(s, t):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "anagram\nnagaram", expectedOutput: "true", isHidden: false },
      { input: "rat\ncar", expectedOutput: "false", isHidden: false },
      { input: "listen\nsilent", expectedOutput: "true", isHidden: true }
    ],
    hints: ["Count character frequencies in both strings.", "Compare the frequency maps."],
    companies: ["Amazon", "Microsoft", "Google", "Meta", "Bloomberg"],
    topics: ["Hash Table", "String", "Sorting"],
    acceptance: 62.5,
    submissions: 3800000,
    likes: 9200,
    dislikes: 290,
    similarProblems: ["Group Anagrams", "Find All Anagrams in a String"]
  },
  {
    id: 4,
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' }
    ],
    constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters."],
    starterCode: {
      javascript: `function groupAnagrams(strs) {\n    // Write your code here\n    \n};`,
      python: `def groupAnagrams(strs):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]', isHidden: false },
      { input: '[""]', expectedOutput: '[[""]]', isHidden: false },
      { input: '["a"]', expectedOutput: '[["a"]]', isHidden: true }
    ],
    hints: ["Use sorted string as key in a hash map.", "All anagrams will have the same sorted string."],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Uber"],
    topics: ["Array", "Hash Table", "String", "Sorting"],
    acceptance: 66.4,
    submissions: 2900000,
    likes: 14500,
    dislikes: 420,
    similarProblems: ["Valid Anagram", "Find All Anagrams in a String"]
  },
  {
    id: 5,
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.`,
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "k is in the range [1, the number of unique elements]", "It is guaranteed that the answer is unique."],
    starterCode: {
      javascript: `function topKFrequent(nums, k) {\n    // Write your code here\n    \n};`,
      python: `def topKFrequent(nums, k):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,1,1,2,2,3]\n2", expectedOutput: "[1,2]", isHidden: false },
      { input: "[1]\n1", expectedOutput: "[1]", isHidden: false },
      { input: "[4,1,-1,2,-1,2,3]\n2", expectedOutput: "[-1,2]", isHidden: true }
    ],
    hints: ["Use a hash map to count frequencies.", "Use bucket sort or heap to find top k elements."],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple", "Uber", "Oracle"],
    topics: ["Array", "Hash Table", "Divide and Conquer", "Sorting", "Heap", "Bucket Sort"],
    acceptance: 64.2,
    submissions: 2100000,
    likes: 12800,
    dislikes: 450,
    similarProblems: ["Word Frequency", "Kth Largest Element"]
  },
  {
    id: 6,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.`,
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" }
    ],
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30", "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."],
    starterCode: {
      javascript: `function productExceptSelf(nums) {\n    // Write your code here\n    \n};`,
      python: `def productExceptSelf(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,2,3,4]", expectedOutput: "[24,12,8,6]", isHidden: false },
      { input: "[-1,1,0,-3,3]", expectedOutput: "[0,0,9,0,0]", isHidden: false },
      { input: "[2,3,4,5]", expectedOutput: "[60,40,30,24]", isHidden: true }
    ],
    hints: ["Use prefix and suffix products.", "Store prefix products, then multiply with suffix on second pass."],
    companies: ["Amazon", "Meta", "Microsoft", "Apple", "Google", "Uber", "LinkedIn"],
    topics: ["Array", "Prefix Sum"],
    acceptance: 65.8,
    submissions: 2500000,
    likes: 16500,
    dislikes: 950,
    similarProblems: ["Trapping Rain Water", "Maximum Product Subarray"]
  },
  {
    id: 7,
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: `Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.`,
    examples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "The longest consecutive sequence is [1, 2, 3, 4]. Therefore its length is 4." },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" }
    ],
    constraints: ["0 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    starterCode: {
      javascript: `function longestConsecutive(nums) {\n    // Write your code here\n    \n};`,
      python: `def longestConsecutive(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int longestConsecutive(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[100,4,200,1,3,2]", expectedOutput: "4", isHidden: false },
      { input: "[0,3,7,2,5,8,4,6,0,1]", expectedOutput: "9", isHidden: false },
      { input: "[1,2,0,1]", expectedOutput: "3", isHidden: true }
    ],
    hints: ["Use a hash set for O(1) lookups.", "Only start counting from the beginning of a sequence."],
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Bloomberg", "Apple"],
    topics: ["Array", "Hash Table", "Union Find"],
    acceptance: 48.6,
    submissions: 1800000,
    likes: 14200,
    dislikes: 620,
    similarProblems: ["Binary Tree Longest Consecutive Sequence"]
  },

  // ============== TWO POINTERS ==============
  {
    id: 8,
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: "false", explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', output: "true", explanation: "s is an empty string after removing non-alphanumeric characters." }
    ],
    constraints: ["1 <= s.length <= 2 * 10^5", "s consists only of printable ASCII characters."],
    starterCode: {
      javascript: `function isPalindrome(s) {\n    // Write your code here\n    \n};`,
      python: `def isPalindrome(s):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "A man, a plan, a canal: Panama", expectedOutput: "true", isHidden: false },
      { input: "race a car", expectedOutput: "false", isHidden: false },
      { input: " ", expectedOutput: "true", isHidden: true }
    ],
    hints: ["Use two pointers from both ends.", "Skip non-alphanumeric characters."],
    companies: ["Meta", "Microsoft", "Amazon", "Apple", "Google", "Bloomberg"],
    topics: ["Two Pointers", "String"],
    acceptance: 44.2,
    submissions: 3500000,
    likes: 6800,
    dislikes: 7200,
    similarProblems: ["Palindrome Linked List", "Valid Palindrome II"]
  },
  {
    id: 9,
    title: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    category: "Two Pointers",
    description: `Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

You may not use the same element twice.`,
    examples: [
      { input: "numbers = [2,7,11,15], target = 9", output: "[1,2]", explanation: "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2." },
      { input: "numbers = [2,3,4], target = 6", output: "[1,3]" },
      { input: "numbers = [-1,0], target = -1", output: "[1,2]" }
    ],
    constraints: ["2 <= numbers.length <= 3 * 10^4", "-1000 <= numbers[i] <= 1000", "numbers is sorted in non-decreasing order.", "-1000 <= target <= 1000", "The tests are generated such that there is exactly one solution."],
    starterCode: {
      javascript: `function twoSum(numbers, target) {\n    // Write your code here\n    \n};`,
      python: `def twoSum(numbers, target):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[1,2]", isHidden: false },
      { input: "[2,3,4]\n6", expectedOutput: "[1,3]", isHidden: false },
      { input: "[-1,0]\n-1", expectedOutput: "[1,2]", isHidden: true }
    ],
    hints: ["Use two pointers, one at start and one at end.", "Move pointers based on current sum vs target."],
    companies: ["Amazon", "Microsoft", "Google", "Meta", "Apple"],
    topics: ["Array", "Two Pointers", "Binary Search"],
    acceptance: 60.5,
    submissions: 2100000,
    likes: 9500,
    dislikes: 1100,
    similarProblems: ["Two Sum", "Two Sum IV"]
  },
  {
    id: 10,
    title: "3Sum",
    difficulty: "Medium",
    category: "Two Pointers",
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" }
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    starterCode: {
      javascript: `function threeSum(nums) {\n    // Write your code here\n    \n};`,
      python: `def threeSum(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]", isHidden: false },
      { input: "[0,1,1]", expectedOutput: "[]", isHidden: false },
      { input: "[0,0,0]", expectedOutput: "[[0,0,0]]", isHidden: true }
    ],
    hints: ["Sort the array first.", "Fix one element and use two pointers for the rest.", "Skip duplicates to avoid duplicate triplets."],
    companies: ["Meta", "Amazon", "Microsoft", "Google", "Apple", "Bloomberg", "Adobe", "Uber"],
    topics: ["Array", "Two Pointers", "Sorting"],
    acceptance: 33.4,
    submissions: 4200000,
    likes: 24500,
    dislikes: 2200,
    similarProblems: ["Two Sum", "3Sum Closest", "4Sum"]
  },
  {
    id: 11,
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.`,
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The max area is between indices 1 and 8 with height 7." },
      { input: "height = [1,1]", output: "1" }
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    starterCode: {
      javascript: `function maxArea(height) {\n    // Write your code here\n    \n};`,
      python: `def maxArea(height):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49", isHidden: false },
      { input: "[1,1]", expectedOutput: "1", isHidden: false },
      { input: "[4,3,2,1,4]", expectedOutput: "16", isHidden: true }
    ],
    hints: ["Use two pointers at both ends.", "Move the pointer with smaller height inward.", "Track the maximum area found."],
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Bloomberg", "Goldman Sachs"],
    topics: ["Array", "Two Pointers", "Greedy"],
    acceptance: 54.3,
    submissions: 2800000,
    likes: 22500,
    dislikes: 1300,
    similarProblems: ["Trapping Rain Water"]
  },
  {
    id: 12,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers",
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "The elevation map can trap 6 units of rain water." },
      { input: "height = [4,2,0,3,2,5]", output: "9" }
    ],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    starterCode: {
      javascript: `function trap(height) {\n    // Write your code here\n    \n};`,
      python: `def trap(height):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int trap(int[] height) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int trap(vector<int>& height) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6", isHidden: false },
      { input: "[4,2,0,3,2,5]", expectedOutput: "9", isHidden: false },
      { input: "[4,2,3]", expectedOutput: "1", isHidden: true }
    ],
    hints: ["Water at each index = min(maxLeft, maxRight) - height[i].", "Use two pointers to avoid extra space.", "Track leftMax and rightMax while moving pointers."],
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Goldman Sachs", "Bloomberg", "Uber"],
    topics: ["Array", "Two Pointers", "Dynamic Programming", "Stack", "Monotonic Stack"],
    acceptance: 58.8,
    submissions: 2100000,
    likes: 26500,
    dislikes: 380,
    similarProblems: ["Container With Most Water", "Product of Array Except Self"]
  },

  // ============== SLIDING WINDOW ==============
  {
    id: 13,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Sliding Window",
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No profit possible." }
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    starterCode: {
      javascript: `function maxProfit(prices) {\n    // Write your code here\n    \n};`,
      python: `def maxProfit(prices):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5", isHidden: false },
      { input: "[7,6,4,3,1]", expectedOutput: "0", isHidden: false },
      { input: "[2,4,1]", expectedOutput: "2", isHidden: true }
    ],
    hints: ["Track the minimum price seen so far.", "At each step, calculate potential profit if selling today."],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple", "Bloomberg", "Goldman Sachs"],
    topics: ["Array", "Dynamic Programming"],
    acceptance: 54.5,
    submissions: 5200000,
    likes: 25500,
    dislikes: 850,
    similarProblems: ["Best Time to Buy and Sell Stock II", "Best Time to Buy and Sell Stock III"]
  },
  {
    id: 14,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: "3", explanation: 'The answer is "wke", with the length of 3.' }
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n    // Write your code here\n    \n};`,
      python: `def lengthOfLongestSubstring(s):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "abcabcbb", expectedOutput: "3", isHidden: false },
      { input: "bbbbb", expectedOutput: "1", isHidden: false },
      { input: "pwwkew", expectedOutput: "3", isHidden: true }
    ],
    hints: ["Use sliding window technique.", "Use a hash set to track characters in current window.", "Shrink window when duplicate found."],
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Bloomberg", "Adobe", "Uber", "Netflix"],
    topics: ["Hash Table", "String", "Sliding Window"],
    acceptance: 34.0,
    submissions: 8500000,
    likes: 32500,
    dislikes: 1450,
    similarProblems: ["Longest Substring with At Most Two Distinct Characters", "Minimum Window Substring"]
  },
  {
    id: 15,
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    category: "Sliding Window",
    description: `You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.`,
    examples: [
      { input: 's = "ABAB", k = 2', output: "4", explanation: "Replace the two 'A's with two 'B's or vice versa." },
      { input: 's = "AABABBA", k = 1', output: "4", explanation: "Replace the 'B' in the middle with 'A' to form 'AAAA'." }
    ],
    constraints: ["1 <= s.length <= 10^5", "s consists of only uppercase English letters.", "0 <= k <= s.length"],
    starterCode: {
      javascript: `function characterReplacement(s, k) {\n    // Write your code here\n    \n};`,
      python: `def characterReplacement(s, k):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int characterReplacement(String s, int k) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "ABAB\n2", expectedOutput: "4", isHidden: false },
      { input: "AABABBA\n1", expectedOutput: "4", isHidden: false },
      { input: "ABBB\n2", expectedOutput: "4", isHidden: true }
    ],
    hints: ["Use sliding window with character frequency count.", "Window is valid if length - maxFreq <= k.", "Track the maximum frequency character in window."],
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    topics: ["Hash Table", "String", "Sliding Window"],
    acceptance: 52.4,
    submissions: 850000,
    likes: 8200,
    dislikes: 380,
    similarProblems: ["Longest Substring with At Most K Distinct Characters", "Max Consecutive Ones III"]
  },
  {
    id: 16,
    title: "Minimum Window Substring",
    difficulty: "Hard",
    category: "Sliding Window",
    description: `Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".`,
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: "The minimum window substring is 'BANC'." },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""', explanation: "Both 'a's from t must be included in the window." }
    ],
    constraints: ["m == s.length", "n == t.length", "1 <= m, n <= 10^5", "s and t consist of uppercase and lowercase English letters."],
    starterCode: {
      javascript: `function minWindow(s, t) {\n    // Write your code here\n    \n};`,
      python: `def minWindow(s, t):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public String minWindow(String s, String t) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    string minWindow(string s, string t) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "ADOBECODEBANC\nABC", expectedOutput: "BANC", isHidden: false },
      { input: "a\na", expectedOutput: "a", isHidden: false },
      { input: "a\naa", expectedOutput: "", isHidden: true }
    ],
    hints: ["Use two hash maps for character frequencies.", "Expand window until valid, then shrink.", "Track minimum window found."],
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Apple", "LinkedIn", "Uber"],
    topics: ["Hash Table", "String", "Sliding Window"],
    acceptance: 40.5,
    submissions: 1800000,
    likes: 14500,
    dislikes: 650,
    similarProblems: ["Substring with Concatenation of All Words", "Minimum Size Subarray Sum"]
  },

  // ============== STACK ==============
  {
    id: 17,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" }
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    starterCode: {
      javascript: `function isValid(s) {\n    // Write your code here\n    \n};`,
      python: `def isValid(s):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "()", expectedOutput: "true", isHidden: false },
      { input: "()[]{}", expectedOutput: "true", isHidden: false },
      { input: "(]", expectedOutput: "false", isHidden: true }
    ],
    hints: ["Use a stack to track opening brackets.", "When you see a closing bracket, check if top of stack matches.", "Stack should be empty at the end."],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg", "Adobe"],
    topics: ["String", "Stack"],
    acceptance: 40.5,
    submissions: 6500000,
    likes: 18500,
    dislikes: 950,
    similarProblems: ["Generate Parentheses", "Longest Valid Parentheses"]
  },
  {
    id: 18,
    title: "Min Stack",
    difficulty: "Medium",
    category: "Stack",
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:
- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.`,
    examples: [
      { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: "[null,null,null,null,-3,null,0,-2]" }
    ],
    constraints: ["-2^31 <= val <= 2^31 - 1", "Methods pop, top and getMin operations will always be called on non-empty stacks.", "At most 3 * 10^4 calls will be made to push, pop, top, and getMin."],
    starterCode: {
      javascript: `var MinStack = function() {\n    // Initialize your data structure here\n};\n\nMinStack.prototype.push = function(val) {\n    \n};\n\nMinStack.prototype.pop = function() {\n    \n};\n\nMinStack.prototype.top = function() {\n    \n};\n\nMinStack.prototype.getMin = function() {\n    \n};`,
      python: `class MinStack:\n    def __init__(self):\n        pass\n\n    def push(self, val: int) -> None:\n        pass\n\n    def pop(self) -> None:\n        pass\n\n    def top(self) -> int:\n        pass\n\n    def getMin(self) -> int:\n        pass`,
      java: `class MinStack {\n    public MinStack() {\n        \n    }\n    \n    public void push(int val) {\n        \n    }\n    \n    public void pop() {\n        \n    }\n    \n    public int top() {\n        \n    }\n    \n    public int getMin() {\n        \n    }\n}`,
      cpp: `class MinStack {\npublic:\n    MinStack() {\n        \n    }\n    \n    void push(int val) {\n        \n    }\n    \n    void pop() {\n        \n    }\n    \n    int top() {\n        \n    }\n    \n    int getMin() {\n        \n    }\n};`
    },
    testCases: [
      { input: '["push","push","push","getMin","pop","top","getMin"]\n[[-2],[0],[-3],[],[],[],[]]', expectedOutput: "[null,null,null,-3,null,0,-2]", isHidden: false }
    ],
    hints: ["Use two stacks - one for values, one for minimums.", "Or store pairs of (value, currentMin) in single stack."],
    companies: ["Amazon", "Google", "Microsoft", "Bloomberg", "Apple"],
    topics: ["Stack", "Design"],
    acceptance: 52.3,
    submissions: 1500000,
    likes: 11500,
    dislikes: 750,
    similarProblems: ["Sliding Window Maximum", "Max Stack"]
  },
  {
    id: 19,
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    category: "Stack",
    description: `You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:
- The valid operators are '+', '-', '*', and '/'.
- Each operand may be an integer or another expression.
- The division between two integers always truncates toward zero.
- There will not be any division by zero.`,
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: "9", explanation: "((2 + 1) * 3) = 9" },
      { input: 'tokens = ["4","13","5","/","+"]', output: "6", explanation: "(4 + (13 / 5)) = 6" }
    ],
    constraints: ["1 <= tokens.length <= 10^4", 'tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].'],
    starterCode: {
      javascript: `function evalRPN(tokens) {\n    // Write your code here\n    \n};`,
      python: `def evalRPN(tokens):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int evalRPN(String[] tokens) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int evalRPN(vector<string>& tokens) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: '["2","1","+","3","*"]', expectedOutput: "9", isHidden: false },
      { input: '["4","13","5","/","+"]', expectedOutput: "6", isHidden: false },
      { input: '["10","6","9","3","+","-11","*","/","*","17","+","5","+"]', expectedOutput: "22", isHidden: true }
    ],
    hints: ["Use a stack to store operands.", "When you see an operator, pop two operands and push result."],
    companies: ["Amazon", "Google", "Microsoft", "LinkedIn"],
    topics: ["Array", "Math", "Stack"],
    acceptance: 45.8,
    submissions: 950000,
    likes: 5200,
    dislikes: 850,
    similarProblems: ["Basic Calculator", "Expression Add Operators"]
  },
  {
    id: 20,
    title: "Daily Temperatures",
    difficulty: "Medium",
    category: "Stack",
    description: `Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.`,
    examples: [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
      { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]" },
      { input: "temperatures = [30,60,90]", output: "[1,1,0]" }
    ],
    constraints: ["1 <= temperatures.length <= 10^5", "30 <= temperatures[i] <= 100"],
    starterCode: {
      javascript: `function dailyTemperatures(temperatures) {\n    // Write your code here\n    \n};`,
      python: `def dailyTemperatures(temperatures):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[73,74,75,71,69,72,76,73]", expectedOutput: "[1,1,4,2,1,1,0,0]", isHidden: false },
      { input: "[30,40,50,60]", expectedOutput: "[1,1,1,0]", isHidden: false },
      { input: "[30,60,90]", expectedOutput: "[1,1,0]", isHidden: true }
    ],
    hints: ["Use a monotonic decreasing stack.", "Store indices in stack, not values.", "Pop when current temp is greater than stack top."],
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Bloomberg"],
    topics: ["Array", "Stack", "Monotonic Stack"],
    acceptance: 66.4,
    submissions: 1200000,
    likes: 10500,
    dislikes: 240,
    similarProblems: ["Next Greater Element I", "Online Stock Span"]
  },

  // ============== BINARY SEARCH ==============
  {
    id: 21,
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums so return -1" }
    ],
    constraints: ["1 <= nums.length <= 10^4", "-10^4 < nums[i], target < 10^4", "All the integers in nums are unique.", "nums is sorted in ascending order."],
    starterCode: {
      javascript: `function search(nums, target) {\n    // Write your code here\n    \n};`,
      python: `def search(nums, target):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[-1,0,3,5,9,12]\n9", expectedOutput: "4", isHidden: false },
      { input: "[-1,0,3,5,9,12]\n2", expectedOutput: "-1", isHidden: false },
      { input: "[5]\n5", expectedOutput: "0", isHidden: true }
    ],
    hints: ["Use left and right pointers.", "Compare middle element with target.", "Narrow search range based on comparison."],
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    topics: ["Array", "Binary Search"],
    acceptance: 55.2,
    submissions: 2500000,
    likes: 8500,
    dislikes: 180,
    similarProblems: ["Search in Rotated Sorted Array", "First Bad Version"]
  },
  {
    id: 22,
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Binary Search",
    description: `You are given an m x n integer matrix matrix with the following two properties:

- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.`,
    examples: [
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" },
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", output: "false" }
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 100", "-10^4 <= matrix[i][j], target <= 10^4"],
    starterCode: {
      javascript: `function searchMatrix(matrix, target) {\n    // Write your code here\n    \n};`,
      python: `def searchMatrix(matrix, target):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3", expectedOutput: "true", isHidden: false },
      { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n13", expectedOutput: "false", isHidden: false },
      { input: "[[1]]\n1", expectedOutput: "true", isHidden: true }
    ],
    hints: ["Treat the 2D matrix as a 1D sorted array.", "Use binary search with index conversion."],
    companies: ["Amazon", "Microsoft", "Google", "Meta", "Bloomberg"],
    topics: ["Array", "Binary Search", "Matrix"],
    acceptance: 48.5,
    submissions: 1500000,
    likes: 11500,
    dislikes: 350,
    similarProblems: ["Search a 2D Matrix II"]
  },
  {
    id: 23,
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    category: "Binary Search",
    description: `Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.`,
    examples: [
      { input: "piles = [3,6,7,11], h = 8", output: "4" },
      { input: "piles = [30,11,23,4,20], h = 5", output: "30" },
      { input: "piles = [30,11,23,4,20], h = 6", output: "23" }
    ],
    constraints: ["1 <= piles.length <= 10^4", "piles.length <= h <= 10^9", "1 <= piles[i] <= 10^9"],
    starterCode: {
      javascript: `function minEatingSpeed(piles, h) {\n    // Write your code here\n    \n};`,
      python: `def minEatingSpeed(piles, h):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int minEatingSpeed(int[] piles, int h) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[3,6,7,11]\n8", expectedOutput: "4", isHidden: false },
      { input: "[30,11,23,4,20]\n5", expectedOutput: "30", isHidden: false },
      { input: "[30,11,23,4,20]\n6", expectedOutput: "23", isHidden: true }
    ],
    hints: ["Binary search on the eating speed k.", "For each k, calculate hours needed.", "Find minimum k that allows finishing in h hours."],
    companies: ["Google", "Amazon", "Meta", "DoorDash"],
    topics: ["Array", "Binary Search"],
    acceptance: 52.8,
    submissions: 650000,
    likes: 7500,
    dislikes: 350,
    similarProblems: ["Minimize Max Distance to Gas Station", "Capacity To Ship Packages"]
  },
  {
    id: 24,
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    description: `Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

- [4,5,6,7,0,1,2] if it was rotated 4 times.
- [0,1,2,4,5,6,7] if it was rotated 7 times.

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.`,
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "1", explanation: "The original array was [1,2,3,4,5] rotated 3 times." },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" },
      { input: "nums = [11,13,15,17]", output: "11" }
    ],
    constraints: ["n == nums.length", "1 <= n <= 5000", "-5000 <= nums[i] <= 5000", "All the integers of nums are unique.", "nums is sorted and rotated between 1 and n times."],
    starterCode: {
      javascript: `function findMin(nums) {\n    // Write your code here\n    \n};`,
      python: `def findMin(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int findMin(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[3,4,5,1,2]", expectedOutput: "1", isHidden: false },
      { input: "[4,5,6,7,0,1,2]", expectedOutput: "0", isHidden: false },
      { input: "[11,13,15,17]", expectedOutput: "11", isHidden: true }
    ],
    hints: ["The minimum is at the rotation point.", "Compare mid with right to determine which half to search."],
    companies: ["Meta", "Amazon", "Microsoft", "Google", "Bloomberg"],
    topics: ["Array", "Binary Search"],
    acceptance: 49.2,
    submissions: 1800000,
    likes: 10500,
    dislikes: 480,
    similarProblems: ["Search in Rotated Sorted Array", "Find Minimum in Rotated Sorted Array II"]
  },
  {
    id: 25,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    description: `There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.`,
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
      { input: "nums = [1], target = 0", output: "-1" }
    ],
    constraints: ["1 <= nums.length <= 5000", "-10^4 <= nums[i] <= 10^4", "All values of nums are unique.", "nums is an ascending array that is possibly rotated.", "-10^4 <= target <= 10^4"],
    starterCode: {
      javascript: `function search(nums, target) {\n    // Write your code here\n    \n};`,
      python: `def search(nums, target):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[4,5,6,7,0,1,2]\n0", expectedOutput: "4", isHidden: false },
      { input: "[4,5,6,7,0,1,2]\n3", expectedOutput: "-1", isHidden: false },
      { input: "[1]\n0", expectedOutput: "-1", isHidden: true }
    ],
    hints: ["One half of the array is always sorted.", "Determine which half is sorted, then check if target is there."],
    companies: ["Meta", "Amazon", "Microsoft", "Google", "Apple", "Bloomberg", "LinkedIn"],
    topics: ["Array", "Binary Search"],
    acceptance: 39.6,
    submissions: 3200000,
    likes: 20500,
    dislikes: 1250,
    similarProblems: ["Search in Rotated Sorted Array II", "Find Minimum in Rotated Sorted Array"]
  },

  // ============== LINKED LIST ==============
  {
    id: 26,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
      { input: "head = []", output: "[]" }
    ],
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    starterCode: {
      javascript: `function reverseList(head) {\n    // Write your code here\n    \n};`,
      python: `def reverseList(head):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]", isHidden: false },
      { input: "[1,2]", expectedOutput: "[2,1]", isHidden: false },
      { input: "[]", expectedOutput: "[]", isHidden: true }
    ],
    hints: ["Use three pointers: prev, curr, next.", "Or solve recursively."],
    companies: ["Amazon", "Microsoft", "Meta", "Google", "Apple", "Bloomberg"],
    topics: ["Linked List", "Recursion"],
    acceptance: 73.2,
    submissions: 3500000,
    likes: 16500,
    dislikes: 280,
    similarProblems: ["Reverse Linked List II", "Palindrome Linked List"]
  },
  {
    id: 27,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" }
    ],
    constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 <= Node.val <= 100", "Both list1 and list2 are sorted in non-decreasing order."],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {\n    // Write your code here\n    \n};`,
      python: `def mergeTwoLists(list1, list2):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,2,4]\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]", isHidden: false },
      { input: "[]\n[]", expectedOutput: "[]", isHidden: false },
      { input: "[]\n[0]", expectedOutput: "[0]", isHidden: true }
    ],
    hints: ["Use a dummy node to simplify edge cases.", "Compare heads and append smaller one."],
    companies: ["Amazon", "Microsoft", "Meta", "Google", "Apple", "Bloomberg"],
    topics: ["Linked List", "Recursion"],
    acceptance: 62.8,
    submissions: 4200000,
    likes: 17500,
    dislikes: 1650,
    similarProblems: ["Merge k Sorted Lists", "Merge Sorted Array"]
  },
  {
    id: 28,
    title: "Linked List Cycle",
    difficulty: "Easy",
    category: "Linked List",
    description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.`,
    examples: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true", explanation: "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed)." },
      { input: "head = [1,2], pos = 0", output: "true" },
      { input: "head = [1], pos = -1", output: "false" }
    ],
    constraints: ["The number of the nodes in the list is in the range [0, 10^4].", "-10^5 <= Node.val <= 10^5", "pos is -1 or a valid index in the linked-list."],
    starterCode: {
      javascript: `function hasCycle(head) {\n    // Write your code here\n    \n};`,
      python: `def hasCycle(head):\n    # Write your code here\n    pass`,
      java: `public class Solution {\n    public boolean hasCycle(ListNode head) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[3,2,0,-4]\n1", expectedOutput: "true", isHidden: false },
      { input: "[1,2]\n0", expectedOutput: "true", isHidden: false },
      { input: "[1]\n-1", expectedOutput: "false", isHidden: true }
    ],
    hints: ["Use Floyd's Tortoise and Hare algorithm.", "Use slow and fast pointers."],
    companies: ["Amazon", "Microsoft", "Meta", "Google", "Apple"],
    topics: ["Linked List", "Two Pointers", "Hash Table"],
    acceptance: 47.5,
    submissions: 3800000,
    likes: 11500,
    dislikes: 950,
    similarProblems: ["Linked List Cycle II", "Happy Number"]
  },
  {
    id: 29,
    title: "Reorder List",
    difficulty: "Medium",
    category: "Linked List",
    description: `You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln

Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

You may not modify the values in the list's nodes. Only nodes themselves may be changed.`,
    examples: [
      { input: "head = [1,2,3,4]", output: "[1,4,2,3]" },
      { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]" }
    ],
    constraints: ["The number of nodes in the list is in the range [1, 5 * 10^4].", "1 <= Node.val <= 1000"],
    starterCode: {
      javascript: `function reorderList(head) {\n    // Write your code here\n    \n};`,
      python: `def reorderList(head):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public void reorderList(ListNode head) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    void reorderList(ListNode* head) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,2,3,4]", expectedOutput: "[1,4,2,3]", isHidden: false },
      { input: "[1,2,3,4,5]", expectedOutput: "[1,5,2,4,3]", isHidden: false },
      { input: "[1]", expectedOutput: "[1]", isHidden: true }
    ],
    hints: ["Find middle using slow-fast pointers.", "Reverse second half.", "Merge two halves alternatively."],
    companies: ["Amazon", "Meta", "Microsoft", "Google", "Bloomberg"],
    topics: ["Linked List", "Two Pointers", "Stack", "Recursion"],
    acceptance: 52.8,
    submissions: 1200000,
    likes: 8500,
    dislikes: 290,
    similarProblems: ["Palindrome Linked List", "Delete the Middle Node"]
  },
  {
    id: 30,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Linked List",
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "The linked-lists are: [1->4->5, 1->3->4, 2->6]. Merging them into one sorted list: 1->1->2->3->4->4->5->6" },
      { input: "lists = []", output: "[]" },
      { input: "lists = [[]]", output: "[]" }
    ],
    constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500", "-10^4 <= lists[i][j] <= 10^4", "lists[i] is sorted in ascending order.", "The sum of lists[i].length will not exceed 10^4."],
    starterCode: {
      javascript: `function mergeKLists(lists) {\n    // Write your code here\n    \n};`,
      python: `def mergeKLists(lists):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[[1,4,5],[1,3,4],[2,6]]", expectedOutput: "[1,1,2,3,4,4,5,6]", isHidden: false },
      { input: "[]", expectedOutput: "[]", isHidden: false },
      { input: "[[]]", expectedOutput: "[]", isHidden: true }
    ],
    hints: ["Use a min-heap/priority queue.", "Or use divide and conquer approach."],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple", "Bloomberg", "Uber"],
    topics: ["Linked List", "Divide and Conquer", "Heap", "Merge Sort"],
    acceptance: 50.5,
    submissions: 1800000,
    likes: 15500,
    dislikes: 580,
    similarProblems: ["Merge Two Sorted Lists", "Ugly Number II"]
  },

  // ============== TREES ==============
  {
    id: 31,
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    description: `Given the root of a binary tree, invert the tree, and return its root.`,
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
      { input: "root = []", output: "[]" }
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 100].", "-100 <= Node.val <= 100"],
    starterCode: {
      javascript: `function invertTree(root) {\n    // Write your code here\n    \n};`,
      python: `def invertTree(root):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]", isHidden: false },
      { input: "[2,1,3]", expectedOutput: "[2,3,1]", isHidden: false },
      { input: "[]", expectedOutput: "[]", isHidden: true }
    ],
    hints: ["Recursively swap left and right children.", "Can also solve iteratively with a queue."],
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    topics: ["Tree", "DFS", "BFS", "Binary Tree"],
    acceptance: 74.5,
    submissions: 2200000,
    likes: 12500,
    dislikes: 180,
    similarProblems: ["Reverse Odd Levels of Binary Tree"]
  },
  {
    id: 32,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    description: `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" }
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 10^4].", "-100 <= Node.val <= 100"],
    starterCode: {
      javascript: `function maxDepth(root) {\n    // Write your code here\n    \n};`,
      python: `def maxDepth(root):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int maxDepth(TreeNode root) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expectedOutput: "3", isHidden: false },
      { input: "[1,null,2]", expectedOutput: "2", isHidden: false },
      { input: "[]", expectedOutput: "0", isHidden: true }
    ],
    hints: ["Use recursion: depth = 1 + max(left, right).", "Or use BFS and count levels."],
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "LinkedIn"],
    topics: ["Tree", "DFS", "BFS", "Binary Tree"],
    acceptance: 74.8,
    submissions: 3500000,
    likes: 10500,
    dislikes: 180,
    similarProblems: ["Balanced Binary Tree", "Minimum Depth of Binary Tree"]
  },
  {
    id: 33,
    title: "Same Tree",
    difficulty: "Easy",
    category: "Trees",
    description: `Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
      { input: "p = [1,2], q = [1,null,2]", output: "false" },
      { input: "p = [1,2,1], q = [1,1,2]", output: "false" }
    ],
    constraints: ["The number of nodes in both trees is in the range [0, 100].", "-10^4 <= Node.val <= 10^4"],
    starterCode: {
      javascript: `function isSameTree(p, q) {\n    // Write your code here\n    \n};`,
      python: `def isSameTree(p, q):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,2,3]\n[1,2,3]", expectedOutput: "true", isHidden: false },
      { input: "[1,2]\n[1,null,2]", expectedOutput: "false", isHidden: false },
      { input: "[1,2,1]\n[1,1,2]", expectedOutput: "false", isHidden: true }
    ],
    hints: ["Compare nodes recursively.", "Check if both null, one null, or values differ."],
    companies: ["Amazon", "Microsoft", "Meta", "Google"],
    topics: ["Tree", "DFS", "BFS", "Binary Tree"],
    acceptance: 58.5,
    submissions: 1800000,
    likes: 8500,
    dislikes: 170,
    similarProblems: ["Subtree of Another Tree"]
  },
  {
    id: 34,
    title: "Subtree of Another Tree",
    difficulty: "Easy",
    category: "Trees",
    description: `Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.`,
    examples: [
      { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" },
      { input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]", output: "false" }
    ],
    constraints: ["The number of nodes in the root tree is in the range [1, 2000].", "The number of nodes in the subRoot tree is in the range [1, 1000].", "-10^4 <= root.val <= 10^4", "-10^4 <= subRoot.val <= 10^4"],
    starterCode: {
      javascript: `function isSubtree(root, subRoot) {\n    // Write your code here\n    \n};`,
      python: `def isSubtree(root, subRoot):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isSubtree(TreeNode* root, TreeNode* subRoot) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[3,4,5,1,2]\n[4,1,2]", expectedOutput: "true", isHidden: false },
      { input: "[3,4,5,1,2,null,null,null,null,0]\n[4,1,2]", expectedOutput: "false", isHidden: false },
      { input: "[1,1]\n[1]", expectedOutput: "true", isHidden: true }
    ],
    hints: ["For each node in root, check if it matches subRoot.", "Use isSameTree helper function."],
    companies: ["Amazon", "Meta", "Google", "Microsoft"],
    topics: ["Tree", "DFS", "String Matching", "Binary Tree", "Hash Function"],
    acceptance: 46.5,
    submissions: 1200000,
    likes: 7200,
    dislikes: 420,
    similarProblems: ["Same Tree", "Count Univalue Subtrees"]
  },
  {
    id: 35,
    title: "Lowest Common Ancestor of a Binary Search Tree",
    difficulty: "Medium",
    category: "Trees",
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."`,
    examples: [
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6", explanation: "The LCA of nodes 2 and 8 is 6." },
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", output: "2" }
    ],
    constraints: ["The number of nodes in the tree is in the range [2, 10^5].", "-10^9 <= Node.val <= 10^9", "All Node.val are unique.", "p != q", "p and q will exist in the BST."],
    starterCode: {
      javascript: `function lowestCommonAncestor(root, p, q) {\n    // Write your code here\n    \n};`,
      python: `def lowestCommonAncestor(root, p, q):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[6,2,8,0,4,7,9,null,null,3,5]\n2\n8", expectedOutput: "6", isHidden: false },
      { input: "[6,2,8,0,4,7,9,null,null,3,5]\n2\n4", expectedOutput: "2", isHidden: false },
      { input: "[2,1]\n2\n1", expectedOutput: "2", isHidden: true }
    ],
    hints: ["Use BST property: left < root < right.", "If both p and q are smaller, go left. If both larger, go right."],
    companies: ["Meta", "Amazon", "Microsoft", "Google", "LinkedIn"],
    topics: ["Tree", "DFS", "Binary Search Tree", "Binary Tree"],
    acceptance: 62.2,
    submissions: 1500000,
    likes: 9200,
    dislikes: 280,
    similarProblems: ["Lowest Common Ancestor of a Binary Tree", "Smallest Common Region"]
  },

  // ============== HEAP / PRIORITY QUEUE ==============
  {
    id: 36,
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    category: "Heap",
    description: `Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?`,
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" }
    ],
    constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starterCode: {
      javascript: `function findKthLargest(nums, k) {\n    // Write your code here\n    \n};`,
      python: `def findKthLargest(nums, k):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[3,2,1,5,6,4]\n2", expectedOutput: "5", isHidden: false },
      { input: "[3,2,3,1,2,4,5,5,6]\n4", expectedOutput: "4", isHidden: false },
      { input: "[1]\n1", expectedOutput: "1", isHidden: true }
    ],
    hints: ["Use a min-heap of size k.", "Or use QuickSelect algorithm for O(n) average."],
    companies: ["Meta", "Amazon", "Microsoft", "Google", "Apple", "LinkedIn", "Netflix"],
    topics: ["Array", "Divide and Conquer", "Sorting", "Heap", "Quickselect"],
    acceptance: 66.2,
    submissions: 2500000,
    likes: 14500,
    dislikes: 720,
    similarProblems: ["Wiggle Sort II", "Top K Frequent Elements", "K Closest Points to Origin"]
  },
  {
    id: 37,
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    category: "Heap",
    description: `The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

Implement the MedianFinder class:
- MedianFinder() initializes the MedianFinder object.
- void addNum(int num) adds the integer num from the data stream to the data structure.
- double findMedian() returns the median of all elements so far.`,
    examples: [
      { input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]', output: "[null, null, null, 1.5, null, 2.0]" }
    ],
    constraints: ["-10^5 <= num <= 10^5", "There will be at least one element in the data structure before calling findMedian.", "At most 5 * 10^4 calls will be made to addNum and findMedian."],
    starterCode: {
      javascript: `var MedianFinder = function() {\n    \n};\n\nMedianFinder.prototype.addNum = function(num) {\n    \n};\n\nMedianFinder.prototype.findMedian = function() {\n    \n};`,
      python: `class MedianFinder:\n    def __init__(self):\n        pass\n\n    def addNum(self, num: int) -> None:\n        pass\n\n    def findMedian(self) -> float:\n        pass`,
      java: `class MedianFinder {\n    public MedianFinder() {\n        \n    }\n    \n    public void addNum(int num) {\n        \n    }\n    \n    public double findMedian() {\n        \n    }\n}`,
      cpp: `class MedianFinder {\npublic:\n    MedianFinder() {\n        \n    }\n    \n    void addNum(int num) {\n        \n    }\n    \n    double findMedian() {\n        \n    }\n};`
    },
    testCases: [
      { input: '["addNum","addNum","findMedian","addNum","findMedian"]\n[[1],[2],[],[3],[]]', expectedOutput: "[null,null,1.5,null,2.0]", isHidden: false }
    ],
    hints: ["Use two heaps: max-heap for left half, min-heap for right half.", "Balance the heaps so they differ by at most 1 in size."],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Bloomberg"],
    topics: ["Two Pointers", "Design", "Sorting", "Heap", "Data Stream"],
    acceptance: 51.2,
    submissions: 850000,
    likes: 10500,
    dislikes: 210,
    similarProblems: ["Sliding Window Median"]
  },

  // ============== BACKTRACKING ==============
  {
    id: 38,
    title: "Subsets",
    difficulty: "Medium",
    category: "Backtracking",
    description: `Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.`,
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]", output: "[[],[0]]" }
    ],
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All the numbers of nums are unique."],
    starterCode: {
      javascript: `function subsets(nums) {\n    // Write your code here\n    \n};`,
      python: `def subsets(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,2,3]", expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", isHidden: false },
      { input: "[0]", expectedOutput: "[[],[0]]", isHidden: false },
      { input: "[1,2]", expectedOutput: "[[],[1],[2],[1,2]]", isHidden: true }
    ],
    hints: ["Use backtracking with include/exclude choices.", "Or iteratively add each element to existing subsets."],
    companies: ["Meta", "Amazon", "Microsoft", "Google", "Bloomberg"],
    topics: ["Array", "Backtracking", "Bit Manipulation"],
    acceptance: 75.5,
    submissions: 1800000,
    likes: 13500,
    dislikes: 210,
    similarProblems: ["Subsets II", "Generalized Abbreviation", "Letter Case Permutation"]
  },
  {
    id: 39,
    title: "Combination Sum",
    difficulty: "Medium",
    category: "Backtracking",
    description: `Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.`,
    examples: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
      { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]" },
      { input: "candidates = [2], target = 1", output: "[]" }
    ],
    constraints: ["1 <= candidates.length <= 30", "2 <= candidates[i] <= 40", "All elements of candidates are distinct.", "1 <= target <= 40"],
    starterCode: {
      javascript: `function combinationSum(candidates, target) {\n    // Write your code here\n    \n};`,
      python: `def combinationSum(candidates, target):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[2,3,6,7]\n7", expectedOutput: "[[2,2,3],[7]]", isHidden: false },
      { input: "[2,3,5]\n8", expectedOutput: "[[2,2,2,2],[2,3,3],[3,5]]", isHidden: false },
      { input: "[2]\n1", expectedOutput: "[]", isHidden: true }
    ],
    hints: ["Use backtracking with remaining target.", "For each candidate, either skip or include (can include multiple times)."],
    companies: ["Amazon", "Meta", "Microsoft", "Google", "Apple", "Bloomberg"],
    topics: ["Array", "Backtracking"],
    acceptance: 69.2,
    submissions: 1500000,
    likes: 15500,
    dislikes: 320,
    similarProblems: ["Letter Combinations of a Phone Number", "Combination Sum II", "Combinations"]
  },
  {
    id: 40,
    title: "Permutations",
    difficulty: "Medium",
    category: "Backtracking",
    description: `Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.`,
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
      { input: "nums = [1]", output: "[[1]]" }
    ],
    constraints: ["1 <= nums.length <= 6", "-10 <= nums[i] <= 10", "All the integers of nums are unique."],
    starterCode: {
      javascript: `function permute(nums) {\n    // Write your code here\n    \n};`,
      python: `def permute(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,2,3]", expectedOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", isHidden: false },
      { input: "[0,1]", expectedOutput: "[[0,1],[1,0]]", isHidden: false },
      { input: "[1]", expectedOutput: "[[1]]", isHidden: true }
    ],
    hints: ["Use backtracking with a visited set.", "Try each unused element at each position."],
    companies: ["Meta", "Amazon", "Microsoft", "Google", "Apple", "Bloomberg", "LinkedIn"],
    topics: ["Array", "Backtracking"],
    acceptance: 76.5,
    submissions: 2000000,
    likes: 15500,
    dislikes: 260,
    similarProblems: ["Next Permutation", "Permutations II", "Permutation Sequence"]
  },
  {
    id: 41,
    title: "Word Search",
    difficulty: "Medium",
    category: "Backtracking",
    description: `Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: "true" },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: "false" }
    ],
    constraints: ["m == board.length", "n = board[i].length", "1 <= m, n <= 6", "1 <= word.length <= 15", "board and word consists of only lowercase and uppercase English letters."],
    starterCode: {
      javascript: `function exist(board, word) {\n    // Write your code here\n    \n};`,
      python: `def exist(board, word):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean exist(char[][] board, String word) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\nABCCED', expectedOutput: "true", isHidden: false },
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\nSEE', expectedOutput: "true", isHidden: false },
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\nABCB', expectedOutput: "false", isHidden: true }
    ],
    hints: ["Use DFS with backtracking from each cell.", "Mark visited cells temporarily during exploration."],
    companies: ["Amazon", "Microsoft", "Meta", "Google", "Bloomberg", "Apple"],
    topics: ["Array", "Backtracking", "Matrix"],
    acceptance: 42.2,
    submissions: 2200000,
    likes: 13500,
    dislikes: 550,
    similarProblems: ["Word Search II"]
  },

  // ============== GRAPHS ==============
  {
    id: 42,
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graphs",
    description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3" }
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
    starterCode: {
      javascript: `function numIslands(grid) {\n    // Write your code here\n    \n};`,
      python: `def numIslands(grid):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expectedOutput: "1", isHidden: false },
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expectedOutput: "3", isHidden: false },
      { input: '[["1","0","1"],["0","1","0"],["1","0","1"]]', expectedOutput: "5", isHidden: true }
    ],
    hints: ["Use DFS/BFS to explore each island.", "Mark visited land as '0' to avoid counting twice."],
    companies: ["Amazon", "Meta", "Microsoft", "Google", "Bloomberg", "Apple", "Uber"],
    topics: ["Array", "DFS", "BFS", "Union Find", "Matrix"],
    acceptance: 57.5,
    submissions: 3500000,
    likes: 19500,
    dislikes: 450,
    similarProblems: ["Surrounded Regions", "Number of Connected Components", "Max Area of Island"]
  },
  {
    id: 43,
    title: "Clone Graph",
    difficulty: "Medium",
    category: "Graphs",
    description: `Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.`,
    examples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]", explanation: "The graph has 4 nodes. Node 1's neighbors are 2 and 4. Node 2's neighbors are 1 and 3. etc." },
      { input: "adjList = [[]]", output: "[[]]" },
      { input: "adjList = []", output: "[]" }
    ],
    constraints: ["The number of nodes in the graph is in the range [0, 100].", "1 <= Node.val <= 100", "Node.val is unique for each node.", "There are no repeated edges and no self-loops in the graph.", "The Graph is connected and all nodes can be visited starting from the given node."],
    starterCode: {
      javascript: `function cloneGraph(node) {\n    // Write your code here\n    \n};`,
      python: `def cloneGraph(node):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public Node cloneGraph(Node node) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[[2,4],[1,3],[2,4],[1,3]]", expectedOutput: "[[2,4],[1,3],[2,4],[1,3]]", isHidden: false },
      { input: "[[]]", expectedOutput: "[[]]", isHidden: false },
      { input: "[]", expectedOutput: "[]", isHidden: true }
    ],
    hints: ["Use a hash map to track cloned nodes.", "Use DFS or BFS to traverse and clone."],
    companies: ["Meta", "Amazon", "Google", "Microsoft", "Bloomberg"],
    topics: ["Hash Table", "DFS", "BFS", "Graph"],
    acceptance: 52.8,
    submissions: 1200000,
    likes: 8200,
    dislikes: 350,
    similarProblems: ["Copy List with Random Pointer", "Clone Binary Tree With Random Pointer"]
  },
  {
    id: 44,
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    category: "Graphs",
    description: `There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.`,
    examples: [
      { input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]" },
      { input: "heights = [[1]]", output: "[[0,0]]" }
    ],
    constraints: ["m == heights.length", "n == heights[r].length", "1 <= m, n <= 200", "0 <= heights[r][c] <= 10^5"],
    starterCode: {
      javascript: `function pacificAtlantic(heights) {\n    // Write your code here\n    \n};`,
      python: `def pacificAtlantic(heights):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", expectedOutput: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]", isHidden: false },
      { input: "[[1]]", expectedOutput: "[[0,0]]", isHidden: false }
    ],
    hints: ["Start DFS/BFS from ocean edges (reverse flow).", "Find cells reachable from Pacific and Atlantic separately.", "Return intersection."],
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    topics: ["Array", "DFS", "BFS", "Matrix"],
    acceptance: 54.2,
    submissions: 650000,
    likes: 6200,
    dislikes: 1250,
    similarProblems: []
  },
  {
    id: 45,
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graphs",
    description: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.

Return true if you can finish all courses. Otherwise, return false.`,
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", explanation: "There are 2 courses. To take course 1 you should have finished course 0. So it is possible." },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false", explanation: "There are 2 courses. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible." }
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000", "prerequisites[i].length == 2", "0 <= ai, bi < numCourses", "All the pairs prerequisites[i] are unique."],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {\n    // Write your code here\n    \n};`,
      python: `def canFinish(numCourses, prerequisites):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "2\n[[1,0]]", expectedOutput: "true", isHidden: false },
      { input: "2\n[[1,0],[0,1]]", expectedOutput: "false", isHidden: false },
      { input: "3\n[[1,0],[2,1]]", expectedOutput: "true", isHidden: true }
    ],
    hints: ["This is cycle detection in a directed graph.", "Use DFS with three states: unvisited, visiting, visited.", "Or use topological sort with Kahn's algorithm."],
    companies: ["Amazon", "Meta", "Microsoft", "Google", "Apple", "Uber", "Intuit"],
    topics: ["DFS", "BFS", "Graph", "Topological Sort"],
    acceptance: 46.5,
    submissions: 1800000,
    likes: 13500,
    dislikes: 550,
    similarProblems: ["Course Schedule II", "Minimum Height Trees", "Parallel Courses"]
  },

  // ============== DYNAMIC PROGRAMMING ==============
  {
    id: 46,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2", explanation: "There are two ways: (1+1) or (2)" },
      { input: "n = 3", output: "3", explanation: "There are three ways: (1+1+1), (1+2), (2+1)" }
    ],
    constraints: ["1 <= n <= 45"],
    starterCode: {
      javascript: `function climbStairs(n) {\n    // Write your code here\n    \n};`,
      python: `def climbStairs(n):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "2", expectedOutput: "2", isHidden: false },
      { input: "3", expectedOutput: "3", isHidden: false },
      { input: "5", expectedOutput: "8", isHidden: true }
    ],
    hints: ["This is like Fibonacci sequence.", "dp[i] = dp[i-1] + dp[i-2]"],
    companies: ["Amazon", "Google", "Microsoft", "Apple", "Adobe", "Bloomberg"],
    topics: ["Math", "Dynamic Programming", "Memoization"],
    acceptance: 52.2,
    submissions: 3800000,
    likes: 17500,
    dislikes: 550,
    similarProblems: ["Min Cost Climbing Stairs", "Fibonacci Number", "N-th Tribonacci Number"]
  },
  {
    id: 47,
    title: "House Robber",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 1 + 3 = 4." },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total = 2 + 9 + 1 = 12." }
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    starterCode: {
      javascript: `function rob(nums) {\n    // Write your code here\n    \n};`,
      python: `def rob(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int rob(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "4", isHidden: false },
      { input: "[2,7,9,3,1]", expectedOutput: "12", isHidden: false },
      { input: "[2,1,1,2]", expectedOutput: "4", isHidden: true }
    ],
    hints: ["dp[i] = max(dp[i-1], dp[i-2] + nums[i])", "At each house, decide: skip or rob."],
    companies: ["Amazon", "Google", "Microsoft", "Cisco", "Adobe"],
    topics: ["Array", "Dynamic Programming"],
    acceptance: 49.5,
    submissions: 2200000,
    likes: 17500,
    dislikes: 350,
    similarProblems: ["Maximum Product Subarray", "House Robber II", "House Robber III"]
  },
  {
    id: 48,
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.`,
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4." },
      { input: "nums = [0,1,0,3,2,3]", output: "4" },
      { input: "nums = [7,7,7,7,7,7,7]", output: "1" }
    ],
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    starterCode: {
      javascript: `function lengthOfLIS(nums) {\n    // Write your code here\n    \n};`,
      python: `def lengthOfLIS(nums):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[10,9,2,5,3,7,101,18]", expectedOutput: "4", isHidden: false },
      { input: "[0,1,0,3,2,3]", expectedOutput: "4", isHidden: false },
      { input: "[7,7,7,7,7,7,7]", expectedOutput: "1", isHidden: true }
    ],
    hints: ["O(n²): dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]", "O(n log n): Use binary search with a patience sorting approach."],
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Bloomberg"],
    topics: ["Array", "Binary Search", "Dynamic Programming"],
    acceptance: 53.8,
    submissions: 1800000,
    likes: 16500,
    dislikes: 320,
    similarProblems: ["Increasing Triplet Subsequence", "Russian Doll Envelopes", "Longest String Chain"]
  },
  {
    id: 49,
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1" },
      { input: "coins = [2], amount = 3", output: "-1" },
      { input: "coins = [1], amount = 0", output: "0" }
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    starterCode: {
      javascript: `function coinChange(coins, amount) {\n    // Write your code here\n    \n};`,
      python: `def coinChange(coins, amount):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "[1,2,5]\n11", expectedOutput: "3", isHidden: false },
      { input: "[2]\n3", expectedOutput: "-1", isHidden: false },
      { input: "[1]\n0", expectedOutput: "0", isHidden: true }
    ],
    hints: ["dp[i] = min(dp[i - coin] + 1) for each coin", "Initialize with infinity, dp[0] = 0"],
    companies: ["Amazon", "Microsoft", "Google", "Apple", "Bloomberg", "Goldman Sachs"],
    topics: ["Array", "Dynamic Programming", "BFS"],
    acceptance: 43.2,
    submissions: 2500000,
    likes: 15500,
    dislikes: 380,
    similarProblems: ["Minimum Cost For Tickets", "Coin Change 2"]
  },
  {
    id: 50,
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: `Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

A common subsequence of two strings is a subsequence that is common to both strings.`,
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: "The longest common subsequence is 'ace' and its length is 3." },
      { input: 'text1 = "abc", text2 = "abc"', output: "3" },
      { input: 'text1 = "abc", text2 = "def"', output: "0" }
    ],
    constraints: ["1 <= text1.length, text2.length <= 1000", "text1 and text2 consist of only lowercase English characters."],
    starterCode: {
      javascript: `function longestCommonSubsequence(text1, text2) {\n    // Write your code here\n    \n};`,
      python: `def longestCommonSubsequence(text1, text2):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        // Write your code here\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        // Write your code here\n        \n    }\n};`
    },
    testCases: [
      { input: "abcde\nace", expectedOutput: "3", isHidden: false },
      { input: "abc\nabc", expectedOutput: "3", isHidden: false },
      { input: "abc\ndef", expectedOutput: "0", isHidden: true }
    ],
    hints: ["Use 2D DP where dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]", "If chars match: dp[i][j] = dp[i-1][j-1] + 1", "Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])"],
    companies: ["Amazon", "Google", "Microsoft", "Apple", "Bloomberg"],
    topics: ["String", "Dynamic Programming"],
    acceptance: 58.5,
    submissions: 1200000,
    likes: 11500,
    dislikes: 150,
    similarProblems: ["Longest Palindromic Subsequence", "Delete Operation for Two Strings", "Shortest Common Supersequence"]
  },

  {
    id: 51,
    title: "Valid Sudoku",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    description: "Given an input, solve the problem. This is a classic Arrays & Hashing problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Arrays"],
    acceptance: 69,
    submissions: 96569,
    likes: 3997,
    dislikes: 157,
    similarProblems: []
  },
  {
    id: 52,
    title: "Two Sum II",
    difficulty: "Medium",
    category: "Two Pointers",
    description: "Given an input, solve the problem. This is a classic Two Pointers problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Two Pointers"],
    acceptance: 47,
    submissions: 65197,
    likes: 2803,
    dislikes: 156,
    similarProblems: []
  },
  {
    id: 53,
    title: "Permutation in String",
    difficulty: "Medium",
    category: "Sliding Window",
    description: "Given an input, solve the problem. This is a classic Sliding Window problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Sliding Window"],
    acceptance: 44,
    submissions: 23666,
    likes: 1035,
    dislikes: 170,
    similarProblems: []
  },
  {
    id: 54,
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    category: "Sliding Window",
    description: "Given an input, solve the problem. This is a classic Sliding Window problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Sliding Window"],
    acceptance: 41,
    submissions: 70498,
    likes: 1969,
    dislikes: 56,
    similarProblems: []
  },
  {
    id: 55,
    title: "Generate Parentheses",
    difficulty: "Medium",
    category: "Stack",
    description: "Given an input, solve the problem. This is a classic Stack problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Stack"],
    acceptance: 51,
    submissions: 97901,
    likes: 5269,
    dislikes: 82,
    similarProblems: []
  },
  {
    id: 56,
    title: "Car Fleet",
    difficulty: "Medium",
    category: "Stack",
    description: "Given an input, solve the problem. This is a classic Stack problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Stack"],
    acceptance: 44,
    submissions: 63090,
    likes: 4367,
    dislikes: 74,
    similarProblems: []
  },
  {
    id: 57,
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    category: "Stack",
    description: "Given an input, solve the problem. This is a classic Stack problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Stack"],
    acceptance: 32,
    submissions: 52012,
    likes: 4572,
    dislikes: 142,
    similarProblems: []
  },
  {
    id: 58,
    title: "Time Based Key-Value Store",
    difficulty: "Medium",
    category: "Binary Search",
    description: "Given an input, solve the problem. This is a classic Binary Search problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Binary Search"],
    acceptance: 51,
    submissions: 27399,
    likes: 2585,
    dislikes: 37,
    similarProblems: []
  },
  {
    id: 59,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    description: "Given an input, solve the problem. This is a classic Binary Search problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Binary Search"],
    acceptance: 49,
    submissions: 46275,
    likes: 3610,
    dislikes: 112,
    similarProblems: []
  },
  {
    id: 60,
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    category: "Linked List",
    description: "Given an input, solve the problem. This is a classic Linked List problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Linked List"],
    acceptance: 50,
    submissions: 16089,
    likes: 5220,
    dislikes: 145,
    similarProblems: []
  },
  {
    id: 61,
    title: "Copy List with Random Pointer",
    difficulty: "Medium",
    category: "Linked List",
    description: "Given an input, solve the problem. This is a classic Linked List problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Linked List"],
    acceptance: 68,
    submissions: 97999,
    likes: 3540,
    dislikes: 129,
    similarProblems: []
  },
  {
    id: 62,
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    description: "Given an input, solve the problem. This is a classic Linked List problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Linked List"],
    acceptance: 35,
    submissions: 77319,
    likes: 1738,
    dislikes: 34,
    similarProblems: []
  },
  {
    id: 63,
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    category: "Linked List",
    description: "Given an input, solve the problem. This is a classic Linked List problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Linked List"],
    acceptance: 63,
    submissions: 54039,
    likes: 2920,
    dislikes: 113,
    similarProblems: []
  },
  {
    id: 64,
    title: "LRU Cache",
    difficulty: "Medium",
    category: "Linked List",
    description: "Given an input, solve the problem. This is a classic Linked List problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Linked List"],
    acceptance: 52,
    submissions: 52322,
    likes: 2231,
    dislikes: 71,
    similarProblems: []
  },
  {
    id: 65,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked List",
    description: "Given an input, solve the problem. This is a classic Linked List problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Linked List"],
    acceptance: 56,
    submissions: 40495,
    likes: 1225,
    dislikes: 78,
    similarProblems: []
  },
  {
    id: 66,
    title: "Reverse Nodes in k-Group",
    difficulty: "Hard",
    category: "Linked List",
    description: "Given an input, solve the problem. This is a classic Linked List problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Linked List"],
    acceptance: 40,
    submissions: 40389,
    likes: 5067,
    dislikes: 193,
    similarProblems: []
  },
  {
    id: 67,
    title: "Diameter of Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    description: "Given an input, solve the problem. This is a classic Trees problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Trees"],
    acceptance: 69,
    submissions: 31945,
    likes: 3072,
    dislikes: 25,
    similarProblems: []
  },
  {
    id: 68,
    title: "Balanced Binary Tree",
    difficulty: "Easy",
    category: "Trees",
    description: "Given an input, solve the problem. This is a classic Trees problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Trees"],
    acceptance: 42,
    submissions: 77135,
    likes: 5192,
    dislikes: 162,
    similarProblems: []
  },
  {
    id: 69,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Trees",
    description: "Given an input, solve the problem. This is a classic Trees problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Trees"],
    acceptance: 36,
    submissions: 96881,
    likes: 4782,
    dislikes: 174,
    similarProblems: []
  },
  {
    id: 70,
    title: "Binary Tree Right Side View",
    difficulty: "Medium",
    category: "Trees",
    description: "Given an input, solve the problem. This is a classic Trees problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Trees"],
    acceptance: 56,
    submissions: 101419,
    likes: 1665,
    dislikes: 115,
    similarProblems: []
  },
  {
    id: 71,
    title: "Count Good Nodes in Binary Tree",
    difficulty: "Medium",
    category: "Trees",
    description: "Given an input, solve the problem. This is a classic Trees problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Trees"],
    acceptance: 50,
    submissions: 64889,
    likes: 5371,
    dislikes: 139,
    similarProblems: []
  },
  {
    id: 72,
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "Trees",
    description: "Given an input, solve the problem. This is a classic Trees problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Trees"],
    acceptance: 41,
    submissions: 66889,
    likes: 5188,
    dislikes: 75,
    similarProblems: []
  },
  {
    id: 73,
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    category: "Trees",
    description: "Given an input, solve the problem. This is a classic Trees problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Trees"],
    acceptance: 62,
    submissions: 104470,
    likes: 5360,
    dislikes: 182,
    similarProblems: []
  },
  {
    id: 74,
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "Medium",
    category: "Trees",
    description: "Given an input, solve the problem. This is a classic Trees problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Trees"],
    acceptance: 50,
    submissions: 36138,
    likes: 2334,
    dislikes: 165,
    similarProblems: []
  },
  {
    id: 75,
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    category: "Trees",
    description: "Given an input, solve the problem. This is a classic Trees problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Trees"],
    acceptance: 42,
    submissions: 73330,
    likes: 1845,
    dislikes: 206,
    similarProblems: []
  },
  {
    id: 76,
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    category: "Trees",
    description: "Given an input, solve the problem. This is a classic Trees problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Trees"],
    acceptance: 51,
    submissions: 77439,
    likes: 3194,
    dislikes: 185,
    similarProblems: []
  },
  {
    id: 77,
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "Tries",
    description: "Given an input, solve the problem. This is a classic Tries problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Tries"],
    acceptance: 38,
    submissions: 15869,
    likes: 2611,
    dislikes: 127,
    similarProblems: []
  },
  {
    id: 78,
    title: "Design Add and Search Words Data Structure",
    difficulty: "Medium",
    category: "Tries",
    description: "Given an input, solve the problem. This is a classic Tries problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Tries"],
    acceptance: 38,
    submissions: 76429,
    likes: 2811,
    dislikes: 84,
    similarProblems: []
  },
  {
    id: 79,
    title: "Word Search II",
    difficulty: "Hard",
    category: "Tries",
    description: "Given an input, solve the problem. This is a classic Tries problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Tries"],
    acceptance: 35,
    submissions: 71023,
    likes: 1713,
    dislikes: 68,
    similarProblems: []
  },
  {
    id: 80,
    title: "Kth Largest Element in a Stream",
    difficulty: "Easy",
    category: "Heap / Priority Queue",
    description: "Given an input, solve the problem. This is a classic Heap / Priority Queue problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Heap / Priority Queue"],
    acceptance: 58,
    submissions: 69870,
    likes: 2350,
    dislikes: 35,
    similarProblems: []
  },
  {
    id: 81,
    title: "Last Stone Weight",
    difficulty: "Easy",
    category: "Heap / Priority Queue",
    description: "Given an input, solve the problem. This is a classic Heap / Priority Queue problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Heap / Priority Queue"],
    acceptance: 58,
    submissions: 71781,
    likes: 4440,
    dislikes: 122,
    similarProblems: []
  },
  {
    id: 82,
    title: "K Closest Points to Origin",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    description: "Given an input, solve the problem. This is a classic Heap / Priority Queue problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Heap / Priority Queue"],
    acceptance: 51,
    submissions: 81628,
    likes: 1047,
    dislikes: 208,
    similarProblems: []
  },
  {
    id: 83,
    title: "Task Scheduler",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    description: "Given an input, solve the problem. This is a classic Heap / Priority Queue problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Heap / Priority Queue"],
    acceptance: 37,
    submissions: 108712,
    likes: 1604,
    dislikes: 66,
    similarProblems: []
  },
  {
    id: 84,
    title: "Design Twitter",
    difficulty: "Medium",
    category: "Heap / Priority Queue",
    description: "Given an input, solve the problem. This is a classic Heap / Priority Queue problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Heap / Priority Queue"],
    acceptance: 54,
    submissions: 17985,
    likes: 824,
    dislikes: 131,
    similarProblems: []
  },
  {
    id: 85,
    title: "Subsets II",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Given an input, solve the problem. This is a classic Backtracking problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Backtracking"],
    acceptance: 64,
    submissions: 26297,
    likes: 3601,
    dislikes: 190,
    similarProblems: []
  },
  {
    id: 86,
    title: "Combination Sum II",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Given an input, solve the problem. This is a classic Backtracking problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Backtracking"],
    acceptance: 49,
    submissions: 86147,
    likes: 916,
    dislikes: 169,
    similarProblems: []
  },
  {
    id: 87,
    title: "Palindrome Partitioning",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Given an input, solve the problem. This is a classic Backtracking problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Backtracking"],
    acceptance: 57,
    submissions: 77538,
    likes: 3810,
    dislikes: 108,
    similarProblems: []
  },
  {
    id: 88,
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    category: "Backtracking",
    description: "Given an input, solve the problem. This is a classic Backtracking problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Backtracking"],
    acceptance: 62,
    submissions: 97784,
    likes: 2189,
    dislikes: 91,
    similarProblems: []
  },
  {
    id: 89,
    title: "N-Queens",
    difficulty: "Hard",
    category: "Backtracking",
    description: "Given an input, solve the problem. This is a classic Backtracking problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Backtracking"],
    acceptance: 32,
    submissions: 91045,
    likes: 4059,
    dislikes: 28,
    similarProblems: []
  },
  {
    id: 90,
    title: "Max Area of Island",
    difficulty: "Medium",
    category: "Graphs",
    description: "Given an input, solve the problem. This is a classic Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Graphs"],
    acceptance: 57,
    submissions: 41399,
    likes: 2383,
    dislikes: 165,
    similarProblems: []
  },
  {
    id: 91,
    title: "Walls and Gates",
    difficulty: "Medium",
    category: "Graphs",
    description: "Given an input, solve the problem. This is a classic Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Graphs"],
    acceptance: 51,
    submissions: 15865,
    likes: 2959,
    dislikes: 91,
    similarProblems: []
  },
  {
    id: 92,
    title: "Rotting Oranges",
    difficulty: "Medium",
    category: "Graphs",
    description: "Given an input, solve the problem. This is a classic Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Graphs"],
    acceptance: 57,
    submissions: 47928,
    likes: 3679,
    dislikes: 156,
    similarProblems: []
  },
  {
    id: 93,
    title: "Surrounded Regions",
    difficulty: "Medium",
    category: "Graphs",
    description: "Given an input, solve the problem. This is a classic Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Graphs"],
    acceptance: 59,
    submissions: 43574,
    likes: 2460,
    dislikes: 171,
    similarProblems: []
  },
  {
    id: 94,
    title: "Course Schedule II",
    difficulty: "Medium",
    category: "Graphs",
    description: "Given an input, solve the problem. This is a classic Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Graphs"],
    acceptance: 39,
    submissions: 50669,
    likes: 2194,
    dislikes: 51,
    similarProblems: []
  },
  {
    id: 95,
    title: "Graph Valid Tree",
    difficulty: "Medium",
    category: "Graphs",
    description: "Given an input, solve the problem. This is a classic Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Graphs"],
    acceptance: 42,
    submissions: 83854,
    likes: 5009,
    dislikes: 147,
    similarProblems: []
  },
  {
    id: 96,
    title: "Number of Connected Components in an Undirected Graph",
    difficulty: "Medium",
    category: "Graphs",
    description: "Given an input, solve the problem. This is a classic Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Graphs"],
    acceptance: 41,
    submissions: 63751,
    likes: 1099,
    dislikes: 134,
    similarProblems: []
  },
  {
    id: 97,
    title: "Redundant Connection",
    difficulty: "Medium",
    category: "Graphs",
    description: "Given an input, solve the problem. This is a classic Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Graphs"],
    acceptance: 64,
    submissions: 81266,
    likes: 4288,
    dislikes: 160,
    similarProblems: []
  },
  {
    id: 98,
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graphs",
    description: "Given an input, solve the problem. This is a classic Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Graphs"],
    acceptance: 62,
    submissions: 36383,
    likes: 2283,
    dislikes: 189,
    similarProblems: []
  },
  {
    id: 99,
    title: "Reconstruct Itinerary",
    difficulty: "Hard",
    category: "Advanced Graphs",
    description: "Given an input, solve the problem. This is a classic Advanced Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Advanced Graphs"],
    acceptance: 31,
    submissions: 25630,
    likes: 3645,
    dislikes: 110,
    similarProblems: []
  },
  {
    id: 100,
    title: "Min Cost to Connect All Points",
    difficulty: "Medium",
    category: "Advanced Graphs",
    description: "Given an input, solve the problem. This is a classic Advanced Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Advanced Graphs"],
    acceptance: 43,
    submissions: 103445,
    likes: 905,
    dislikes: 118,
    similarProblems: []
  },
  {
    id: 101,
    title: "Network Delay Time",
    difficulty: "Medium",
    category: "Advanced Graphs",
    description: "Given an input, solve the problem. This is a classic Advanced Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Advanced Graphs"],
    acceptance: 46,
    submissions: 87684,
    likes: 1264,
    dislikes: 123,
    similarProblems: []
  },
  {
    id: 102,
    title: "Swim in Rising Water",
    difficulty: "Hard",
    category: "Advanced Graphs",
    description: "Given an input, solve the problem. This is a classic Advanced Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Advanced Graphs"],
    acceptance: 59,
    submissions: 85378,
    likes: 2594,
    dislikes: 92,
    similarProblems: []
  },
  {
    id: 103,
    title: "Alien Dictionary",
    difficulty: "Hard",
    category: "Advanced Graphs",
    description: "Given an input, solve the problem. This is a classic Advanced Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Advanced Graphs"],
    acceptance: 33,
    submissions: 49743,
    likes: 3398,
    dislikes: 33,
    similarProblems: []
  },
  {
    id: 104,
    title: "Cheapest Flights Within K Stops",
    difficulty: "Medium",
    category: "Advanced Graphs",
    description: "Given an input, solve the problem. This is a classic Advanced Graphs problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Advanced Graphs"],
    acceptance: 61,
    submissions: 107227,
    likes: 1283,
    dislikes: 184,
    similarProblems: []
  },
  {
    id: 105,
    title: "Min Cost Climbing Stairs",
    difficulty: "Easy",
    category: "1D DP",
    description: "Given an input, solve the problem. This is a classic 1D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["1D DP"],
    acceptance: 32,
    submissions: 46403,
    likes: 4849,
    dislikes: 107,
    similarProblems: []
  },
  {
    id: 106,
    title: "House Robber II",
    difficulty: "Medium",
    category: "1D DP",
    description: "Given an input, solve the problem. This is a classic 1D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["1D DP"],
    acceptance: 42,
    submissions: 102696,
    likes: 4960,
    dislikes: 198,
    similarProblems: []
  },
  {
    id: 107,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "1D DP",
    description: "Given an input, solve the problem. This is a classic 1D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["1D DP"],
    acceptance: 65,
    submissions: 88074,
    likes: 1881,
    dislikes: 176,
    similarProblems: []
  },
  {
    id: 108,
    title: "Palindromic Substrings",
    difficulty: "Medium",
    category: "1D DP",
    description: "Given an input, solve the problem. This is a classic 1D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["1D DP"],
    acceptance: 51,
    submissions: 82340,
    likes: 1026,
    dislikes: 114,
    similarProblems: []
  },
  {
    id: 109,
    title: "Decode Ways",
    difficulty: "Medium",
    category: "1D DP",
    description: "Given an input, solve the problem. This is a classic 1D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["1D DP"],
    acceptance: 56,
    submissions: 83784,
    likes: 3120,
    dislikes: 136,
    similarProblems: []
  },
  {
    id: 110,
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    category: "1D DP",
    description: "Given an input, solve the problem. This is a classic 1D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["1D DP"],
    acceptance: 52,
    submissions: 27434,
    likes: 3302,
    dislikes: 118,
    similarProblems: []
  },
  {
    id: 111,
    title: "Word Break",
    difficulty: "Medium",
    category: "1D DP",
    description: "Given an input, solve the problem. This is a classic 1D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["1D DP"],
    acceptance: 30,
    submissions: 31164,
    likes: 3718,
    dislikes: 44,
    similarProblems: []
  },
  {
    id: 112,
    title: "Partition Equal Subset Sum",
    difficulty: "Medium",
    category: "1D DP",
    description: "Given an input, solve the problem. This is a classic 1D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["1D DP"],
    acceptance: 66,
    submissions: 63994,
    likes: 1116,
    dislikes: 17,
    similarProblems: []
  },
  {
    id: 113,
    title: "Unique Paths",
    difficulty: "Medium",
    category: "2D DP",
    description: "Given an input, solve the problem. This is a classic 2D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["2D DP"],
    acceptance: 47,
    submissions: 79739,
    likes: 4347,
    dislikes: 60,
    similarProblems: []
  },
  {
    id: 114,
    title: "Best Time to Buy and Sell Stock with Cooldown",
    difficulty: "Medium",
    category: "2D DP",
    description: "Given an input, solve the problem. This is a classic 2D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["2D DP"],
    acceptance: 55,
    submissions: 27760,
    likes: 3749,
    dislikes: 91,
    similarProblems: []
  },
  {
    id: 115,
    title: "Coin Change II",
    difficulty: "Medium",
    category: "2D DP",
    description: "Given an input, solve the problem. This is a classic 2D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["2D DP"],
    acceptance: 57,
    submissions: 88302,
    likes: 885,
    dislikes: 87,
    similarProblems: []
  },
  {
    id: 116,
    title: "Target Sum",
    difficulty: "Medium",
    category: "2D DP",
    description: "Given an input, solve the problem. This is a classic 2D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["2D DP"],
    acceptance: 54,
    submissions: 75108,
    likes: 4033,
    dislikes: 174,
    similarProblems: []
  },
  {
    id: 117,
    title: "Interleaving String",
    difficulty: "Medium",
    category: "2D DP",
    description: "Given an input, solve the problem. This is a classic 2D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["2D DP"],
    acceptance: 63,
    submissions: 22879,
    likes: 652,
    dislikes: 94,
    similarProblems: []
  },
  {
    id: 118,
    title: "Longest Increasing Path in a Matrix",
    difficulty: "Hard",
    category: "2D DP",
    description: "Given an input, solve the problem. This is a classic 2D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["2D DP"],
    acceptance: 67,
    submissions: 18445,
    likes: 4655,
    dislikes: 58,
    similarProblems: []
  },
  {
    id: 119,
    title: "Distinct Subsequences",
    difficulty: "Hard",
    category: "2D DP",
    description: "Given an input, solve the problem. This is a classic 2D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["2D DP"],
    acceptance: 57,
    submissions: 19231,
    likes: 3707,
    dislikes: 35,
    similarProblems: []
  },
  {
    id: 120,
    title: "Edit Distance",
    difficulty: "Hard",
    category: "2D DP",
    description: "Given an input, solve the problem. This is a classic 2D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["2D DP"],
    acceptance: 53,
    submissions: 52446,
    likes: 1467,
    dislikes: 41,
    similarProblems: []
  },
  {
    id: 121,
    title: "Burst Balloons",
    difficulty: "Hard",
    category: "2D DP",
    description: "Given an input, solve the problem. This is a classic 2D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["2D DP"],
    acceptance: 42,
    submissions: 17488,
    likes: 3094,
    dislikes: 112,
    similarProblems: []
  },
  {
    id: 122,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    category: "2D DP",
    description: "Given an input, solve the problem. This is a classic 2D DP problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["2D DP"],
    acceptance: 56,
    submissions: 25563,
    likes: 4091,
    dislikes: 134,
    similarProblems: []
  },
  {
    id: 123,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Greedy",
    description: "Given an input, solve the problem. This is a classic Greedy problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Greedy"],
    acceptance: 61,
    submissions: 94282,
    likes: 4264,
    dislikes: 120,
    similarProblems: []
  },
  {
    id: 124,
    title: "Jump Game",
    difficulty: "Medium",
    category: "Greedy",
    description: "Given an input, solve the problem. This is a classic Greedy problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Greedy"],
    acceptance: 65,
    submissions: 24173,
    likes: 4768,
    dislikes: 201,
    similarProblems: []
  },
  {
    id: 125,
    title: "Jump Game II",
    difficulty: "Medium",
    category: "Greedy",
    description: "Given an input, solve the problem. This is a classic Greedy problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Greedy"],
    acceptance: 57,
    submissions: 74229,
    likes: 2978,
    dislikes: 126,
    similarProblems: []
  },
  {
    id: 126,
    title: "Gas Station",
    difficulty: "Medium",
    category: "Greedy",
    description: "Given an input, solve the problem. This is a classic Greedy problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Greedy"],
    acceptance: 32,
    submissions: 101242,
    likes: 5214,
    dislikes: 209,
    similarProblems: []
  },
  {
    id: 127,
    title: "Hand of Straights",
    difficulty: "Medium",
    category: "Greedy",
    description: "Given an input, solve the problem. This is a classic Greedy problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Greedy"],
    acceptance: 48,
    submissions: 25010,
    likes: 3353,
    dislikes: 201,
    similarProblems: []
  },
  {
    id: 128,
    title: "Merge Triplets to Form Target Triplet",
    difficulty: "Medium",
    category: "Greedy",
    description: "Given an input, solve the problem. This is a classic Greedy problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Greedy"],
    acceptance: 38,
    submissions: 52446,
    likes: 3425,
    dislikes: 155,
    similarProblems: []
  },
  {
    id: 129,
    title: "Partition Labels",
    difficulty: "Medium",
    category: "Greedy",
    description: "Given an input, solve the problem. This is a classic Greedy problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Greedy"],
    acceptance: 68,
    submissions: 27659,
    likes: 1247,
    dislikes: 12,
    similarProblems: []
  },
  {
    id: 130,
    title: "Valid Parenthesis String",
    difficulty: "Medium",
    category: "Greedy",
    description: "Given an input, solve the problem. This is a classic Greedy problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Greedy"],
    acceptance: 60,
    submissions: 26344,
    likes: 2438,
    dislikes: 190,
    similarProblems: []
  },
  {
    id: 131,
    title: "Insert Interval",
    difficulty: "Medium",
    category: "Intervals",
    description: "Given an input, solve the problem. This is a classic Intervals problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Intervals"],
    acceptance: 69,
    submissions: 28417,
    likes: 1081,
    dislikes: 142,
    similarProblems: []
  },
  {
    id: 132,
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Intervals",
    description: "Given an input, solve the problem. This is a classic Intervals problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Intervals"],
    acceptance: 55,
    submissions: 105017,
    likes: 823,
    dislikes: 144,
    similarProblems: []
  },
  {
    id: 133,
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    category: "Intervals",
    description: "Given an input, solve the problem. This is a classic Intervals problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Intervals"],
    acceptance: 38,
    submissions: 19561,
    likes: 3965,
    dislikes: 156,
    similarProblems: []
  },
  {
    id: 134,
    title: "Meeting Rooms",
    difficulty: "Easy",
    category: "Intervals",
    description: "Given an input, solve the problem. This is a classic Intervals problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Intervals"],
    acceptance: 63,
    submissions: 84990,
    likes: 2536,
    dislikes: 38,
    similarProblems: []
  },
  {
    id: 135,
    title: "Meeting Rooms II",
    difficulty: "Medium",
    category: "Intervals",
    description: "Given an input, solve the problem. This is a classic Intervals problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Intervals"],
    acceptance: 48,
    submissions: 61814,
    likes: 872,
    dislikes: 146,
    similarProblems: []
  },
  {
    id: 136,
    title: "Minimum Interval to Include Each Query",
    difficulty: "Hard",
    category: "Intervals",
    description: "Given an input, solve the problem. This is a classic Intervals problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Intervals"],
    acceptance: 51,
    submissions: 26327,
    likes: 5060,
    dislikes: 207,
    similarProblems: []
  },
  {
    id: 137,
    title: "Rotate Image",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Given an input, solve the problem. This is a classic Math & Geometry problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Math"],
    acceptance: 61,
    submissions: 64913,
    likes: 4422,
    dislikes: 44,
    similarProblems: []
  },
  {
    id: 138,
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Given an input, solve the problem. This is a classic Math & Geometry problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Math"],
    acceptance: 53,
    submissions: 55796,
    likes: 643,
    dislikes: 151,
    similarProblems: []
  },
  {
    id: 139,
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Given an input, solve the problem. This is a classic Math & Geometry problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Math"],
    acceptance: 65,
    submissions: 35447,
    likes: 4457,
    dislikes: 49,
    similarProblems: []
  },
  {
    id: 140,
    title: "Happy Number",
    difficulty: "Easy",
    category: "Math & Geometry",
    description: "Given an input, solve the problem. This is a classic Math & Geometry problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Math"],
    acceptance: 48,
    submissions: 109326,
    likes: 2553,
    dislikes: 17,
    similarProblems: []
  },
  {
    id: 141,
    title: "Plus One",
    difficulty: "Easy",
    category: "Math & Geometry",
    description: "Given an input, solve the problem. This is a classic Math & Geometry problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Math"],
    acceptance: 39,
    submissions: 105479,
    likes: 2721,
    dislikes: 194,
    similarProblems: []
  },
  {
    id: 142,
    title: "Pow(x, n)",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Given an input, solve the problem. This is a classic Math & Geometry problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Math"],
    acceptance: 41,
    submissions: 24830,
    likes: 2507,
    dislikes: 65,
    similarProblems: []
  },
  {
    id: 143,
    title: "Multiply Strings",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Given an input, solve the problem. This is a classic Math & Geometry problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Math"],
    acceptance: 46,
    submissions: 41732,
    likes: 1353,
    dislikes: 208,
    similarProblems: []
  },
  {
    id: 144,
    title: "Detect Squares",
    difficulty: "Medium",
    category: "Math & Geometry",
    description: "Given an input, solve the problem. This is a classic Math & Geometry problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Math"],
    acceptance: 41,
    submissions: 102349,
    likes: 5406,
    dislikes: 182,
    similarProblems: []
  },
  {
    id: 145,
    title: "Single Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    description: "Given an input, solve the problem. This is a classic Bit Manipulation problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Bit Manipulation"],
    acceptance: 69,
    submissions: 94702,
    likes: 3207,
    dislikes: 94,
    similarProblems: []
  },
  {
    id: 146,
    title: "Number of 1 Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    description: "Given an input, solve the problem. This is a classic Bit Manipulation problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Bit Manipulation"],
    acceptance: 63,
    submissions: 80340,
    likes: 4920,
    dislikes: 98,
    similarProblems: []
  },
  {
    id: 147,
    title: "Counting Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    description: "Given an input, solve the problem. This is a classic Bit Manipulation problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Bit Manipulation"],
    acceptance: 32,
    submissions: 45205,
    likes: 3388,
    dislikes: 69,
    similarProblems: []
  },
  {
    id: 148,
    title: "Reverse Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    description: "Given an input, solve the problem. This is a classic Bit Manipulation problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Bit Manipulation"],
    acceptance: 31,
    submissions: 55861,
    likes: 3347,
    dislikes: 205,
    similarProblems: []
  },
  {
    id: 149,
    title: "Missing Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    description: "Given an input, solve the problem. This is a classic Bit Manipulation problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Bit Manipulation"],
    acceptance: 37,
    submissions: 74616,
    likes: 4028,
    dislikes: 75,
    similarProblems: []
  },
  {
    id: 150,
    title: "Sum of Two Integers",
    difficulty: "Medium",
    category: "Bit Manipulation",
    description: "Given an input, solve the problem. This is a classic Bit Manipulation problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Bit Manipulation"],
    acceptance: 52,
    submissions: 24563,
    likes: 4429,
    dislikes: 55,
    similarProblems: []
  },
  {
    id: 151,
    title: "Reverse Integer",
    difficulty: "Medium",
    category: "Bit Manipulation",
    description: "Given an input, solve the problem. This is a classic Bit Manipulation problem from the NeetCode 150 list.",
    examples: [
      { input: "example input", output: "example output" }
    ],
    constraints: ["Standard constraints apply."],
    starterCode: {
      javascript: "function solve() {\n  // Write your code here\n};"
    },
    testCases: [],
    hints: ["Think about the optimal data structure."],
    companies: ["Google", "Facebook", "Amazon"],
    topics: ["Bit Manipulation"],
    acceptance: 50,
    submissions: 45709,
    likes: 3619,
    dislikes: 198,
    similarProblems: []
  },
];

export const getProblems = () => problems;

export const getProblemById = (id: number) => problems.find(p => p.id === id);

export const getProblemsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard') => 
  problems.filter(p => p.difficulty === difficulty);

export const getProblemsByCategory = (category: string) => 
  problems.filter(p => p.category === category);

export const getProblemsByCompany = (company: string) =>
  problems.filter(p => p.companies.includes(company));

export const getAllCompanies = () => {
  const companies = new Set<string>();
  problems.forEach(p => p.companies.forEach((c: string) => companies.add(c)));
  return Array.from(companies).sort();
};

export const getAllCategories = () => {
  const categories = new Set<string>();
  problems.forEach(p => categories.add(p.category));
  return Array.from(categories);
};

export const getAllTopics = () => {
  const topics = new Set<string>();
  problems.forEach(p => p.topics.forEach((t: string) => topics.add(t)));
  return Array.from(topics).sort();
};
