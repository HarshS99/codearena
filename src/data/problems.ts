import { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: ['Array', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple'],
    topics: ['Array', 'Hash Table'],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    testCases: [
      { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]' },
      { input: '[3,2,4]\n6', expectedOutput: '[1,2]' },
      { input: '[3,3]\n6', expectedOutput: '[0,1]' },
      { input: '[1,5,3,7,9]\n12', expectedOutput: '[2,4]', isHidden: true },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`
    },
    acceptance: 49.3,
    submissions: 12453678,
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Can you think of a faster way?',
      'Try using a HashMap to store the numbers you\'ve seen so far along with their indices.',
      'For each number, check if (target - number) exists in the HashMap.'
    ],
    editorial: {
      approach: `The brute force approach would be to check all possible pairs, giving O(n²) time complexity. However, we can optimize this using a hash map.

As we iterate through the array, for each number, we check if (target - current number) exists in our hash map. If it does, we found our pair! If not, we add the current number and its index to the hash map.

This gives us O(n) time complexity and O(n) space complexity.`,
      complexity: {
        time: 'O(n)',
        space: 'O(n)'
      },
      solution: {
        javascript: `var twoSum = function(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
};`,
        python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        
        for i, num in enumerate(nums):
            complement = target - num
            
            if complement in seen:
                return [seen[complement], i]
            
            seen[num] = i
        
        return []`
      }
    },
    similarProblems: ['2', '3', '5']
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    category: ['Linked List', 'Math'],
    companies: ['Amazon', 'Microsoft', 'Adobe'],
    topics: ['Linked List', 'Math', 'Recursion'],
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807.'
      },
      {
        input: 'l1 = [0], l2 = [0]',
        output: '[0]'
      }
    ],
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100].',
      '0 <= Node.val <= 9',
      'It is guaranteed that the list represents a number that does not have leading zeros.'
    ],
    testCases: [
      { input: '[2,4,3]\n[5,6,4]', expectedOutput: '[7,0,8]' },
      { input: '[0]\n[0]', expectedOutput: '[0]' },
      { input: '[9,9,9,9,9,9,9]\n[9,9,9,9]', expectedOutput: '[8,9,9,9,0,0,0,1]', isHidden: true }
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        `,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        
    }
}`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        
    }
};`
    },
    acceptance: 38.5,
    submissions: 5234567,
    hints: [
      'Keep track of the carry using a variable and simulate digits-by-digits sum starting from the head of the list.',
      'Remember to create a new node for each digit.'
    ],
    similarProblems: ['1', '3']
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: ['String', 'Sliding Window'],
    companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'],
    topics: ['Hash Table', 'String', 'Sliding Window'],
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    testCases: [
      { input: 'abcabcbb', expectedOutput: '3' },
      { input: 'bbbbb', expectedOutput: '1' },
      { input: 'pwwkew', expectedOutput: '3' },
      { input: 'dvdf', expectedOutput: '3', isHidden: true }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        `,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        
    }
};`
    },
    acceptance: 33.8,
    submissions: 8765432,
    hints: [
      'Use a sliding window approach with two pointers.',
      'Use a Set or Map to track characters in the current window.',
      'When you find a duplicate, move the left pointer.'
    ],
    similarProblems: ['1', '2']
  },
  {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: ['Array', 'Binary Search'],
    companies: ['Google', 'Amazon', 'Apple', 'Microsoft'],
    topics: ['Array', 'Binary Search', 'Divide and Conquer'],
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.'
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
      }
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10^6 <= nums1[i], nums2[i] <= 10^6'
    ],
    testCases: [
      { input: '[1,3]\n[2]', expectedOutput: '2.0' },
      { input: '[1,2]\n[3,4]', expectedOutput: '2.5' },
      { input: '[]\n[1]', expectedOutput: '1.0', isHidden: true }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    
};`,
      python: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        `,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        
    }
}`,
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        
    }
};`
    },
    acceptance: 35.2,
    submissions: 3456789,
    hints: [
      'The key is to use binary search on the smaller array.',
      'Try to partition both arrays such that the left half contains the smaller elements.'
    ],
    similarProblems: ['3']
  },
  {
    id: '5',
    title: 'Reverse Integer',
    difficulty: 'Easy',
    category: ['Math'],
    companies: ['Bloomberg', 'Apple', 'Amazon'],
    topics: ['Math'],
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).`,
    examples: [
      {
        input: 'x = 123',
        output: '321'
      },
      {
        input: 'x = -123',
        output: '-321'
      },
      {
        input: 'x = 120',
        output: '21'
      }
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ],
    testCases: [
      { input: '123', expectedOutput: '321' },
      { input: '-123', expectedOutput: '-321' },
      { input: '120', expectedOutput: '21' },
      { input: '0', expectedOutput: '0', isHidden: true }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    
};`,
      python: `class Solution:
    def reverse(self, x: int) -> int:
        `,
      java: `class Solution {
    public int reverse(int x) {
        
    }
}`,
      cpp: `class Solution {
public:
    int reverse(int x) {
        
    }
};`
    },
    acceptance: 27.1,
    submissions: 6789012,
    hints: [
      'Think about how to extract the last digit of a number.',
      'Use modulo and division operations.',
      'Be careful about integer overflow!'
    ],
    similarProblems: ['1']
  },
  {
    id: '6',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    category: ['Math'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    topics: ['Math'],
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
    examples: [
      {
        input: 'x = 121',
        output: 'true'
      },
      {
        input: 'x = -121',
        output: 'false'
      },
      {
        input: 'x = 10',
        output: 'false'
      }
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ],
    testCases: [
      { input: '121', expectedOutput: 'true' },
      { input: '-121', expectedOutput: 'false' },
      { input: '10', expectedOutput: 'false' },
      { input: '0', expectedOutput: 'true', isHidden: true }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    
};`,
      python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        `,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        
    }
};`
    },
    acceptance: 52.8,
    submissions: 8901234,
    hints: [
      'Can you solve it without converting to string?',
      'Try reversing half of the number.'
    ],
    similarProblems: ['5']
  },
  {
    id: '7',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: ['Array', 'Two Pointers'],
    companies: ['Amazon', 'Google', 'Facebook'],
    topics: ['Array', 'Two Pointers', 'Greedy'],
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.`,
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.'
      },
      {
        input: 'height = [1,1]',
        output: '1'
      }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    testCases: [
      { input: '[1,8,6,2,5,4,8,3,7]', expectedOutput: '49' },
      { input: '[1,1]', expectedOutput: '1' },
      { input: '[4,3,2,1,4]', expectedOutput: '16', isHidden: true }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    
};`,
      python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        `,
      java: `class Solution {
    public int maxArea(int[] height) {
        
    }
}`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        
    }
};`
    },
    acceptance: 54.2,
    submissions: 4567890,
    hints: [
      'Use two pointers starting from both ends.',
      'The width decreases as you move pointers, so you need to move the pointer pointing to the shorter line.'
    ],
    similarProblems: ['3']
  },
  {
    id: '8',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: ['Stack', 'String'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Facebook'],
    topics: ['String', 'Stack'],
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    testCases: [
      { input: '()', expectedOutput: 'true' },
      { input: '()[]{}', expectedOutput: 'true' },
      { input: '(]', expectedOutput: 'false' },
      { input: '([)]', expectedOutput: 'false', isHidden: true }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        `,
      java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`
    },
    acceptance: 40.5,
    submissions: 9876543,
    hints: [
      'Use a stack to keep track of opening brackets.',
      'When you encounter a closing bracket, check if it matches the most recent opening bracket.'
    ],
    similarProblems: ['7']
  }
];
