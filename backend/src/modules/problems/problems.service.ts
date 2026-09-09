import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivityLogService } from '../activity-logs/activity-log.service';
import { QueryProblemDto, SubmitProblemDto } from './problems.dto';

export interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  successRate: number;
  solvedBy: number;
  statement: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  hints: string[];
}

@Injectable()
export class ProblemsService {
  private readonly problems: Problem[] = [
    {
      id: 'two-sum',
      number: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      topics: ['Arrays', 'Hash Table'],
      successRate: 72,
      solvedBy: 14500,
      statement:
        'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
        },
      ],
      constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Only one valid answer exists.'],
      hints: ['Store previously seen values in a map.', 'Check if target - current exists.'],
    },
    {
      id: 'best-time-to-buy-and-sell-stock',
      number: 2,
      title: 'Best Time to Buy and Sell Stock',
      difficulty: 'Easy',
      topics: ['Arrays', 'Dynamic Programming'],
      successRate: 64,
      solvedBy: 9800,
      statement:
        'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
      examples: [
        {
          input: 'prices = [7,1,5,3,6,4]',
          output: '5',
          explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.',
        },
      ],
      constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
      hints: ['Track minimum price so far and maximum profit achievable.'],
    },
    {
      id: 'maximum-subarray',
      number: 3,
      title: 'Maximum Subarray (Kadane’s)',
      difficulty: 'Medium',
      topics: ['Arrays', 'Divide and Conquer', 'Dynamic Programming'],
      successRate: 58,
      solvedBy: 8700,
      statement:
        'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
      examples: [
        {
          input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
          output: '6',
          explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
        },
      ],
      constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
      hints: ['If the running sum becomes negative, reset it to 0.'],
    },
    {
      id: 'valid-parentheses',
      number: 4,
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      topics: ['Stack', 'Strings'],
      successRate: 84,
      solvedBy: 16200,
      statement:
        'Given a string s containing just the characters (, ), {, }, [ and ], determine if the input string is valid.',
      examples: [
        { input: 's = "()[]{}"', output: 'true' },
        { input: 's = "(]"', output: 'false' },
      ],
      constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only ()[]{}'],
      hints: ['Use a stack to match opening and closing brackets.'],
    },
    {
      id: 'longest-substring-without-repeating-characters',
      number: 5,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      topics: ['Hash Table', 'String', 'Sliding Window'],
      successRate: 46,
      solvedBy: 6400,
      statement:
        'Given a string s, find the length of the longest substring without repeating characters.',
      examples: [
        { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
      ],
      constraints: ['0 <= s.length <= 5 * 10^4'],
      hints: ['Use a sliding window with left and right pointers and a set of seen chars.'],
    },
  ];

  constructor(private readonly activityLogService: ActivityLogService) {}

  findAll(query?: QueryProblemDto): Problem[] {
    let result = this.problems;

    if (query?.difficulty) {
      result = result.filter((p) => p.difficulty.toLowerCase() === query.difficulty!.toLowerCase());
    }

    if (query?.tag) {
      result = result.filter((p) => p.topics.some((t) => t.toLowerCase().includes(query.tag!.toLowerCase())));
    }

    if (query?.search) {
      const q = query.search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.statement.toLowerCase().includes(q));
    }

    return result;
  }

  findOne(id: string): Problem {
    const p = this.problems.find((item) => item.id === id || String(item.number) === id);
    if (!p) {
      throw new NotFoundException(`Problem "${id}" not found`);
    }
    return p;
  }

  async submit(dto: SubmitProblemDto) {
    const problem = this.findOne(dto.problemId);

    // Mock evaluation and activity fact recording
    const runtimeMs = Math.floor(Math.random() * 40) + 25;
    const memoryMb = +(13.5 + Math.random() * 2).toFixed(1);
    const points = problem.difficulty === 'Easy' ? 50 : problem.difficulty === 'Medium' ? 100 : 150;

    // Record immutable activity fact
    const activityFact = await this.activityLogService.create({
      studentId: dto.studentId,
      type: 'practice',
      skill: problem.topics[0] || 'DSA',
      title: `Solved #${problem.number}: ${problem.title}`,
      points,
      confidence: 0.88,
    });

    return {
      submissionId: `sub-${Date.now()}`,
      problemId: problem.id,
      verdict: 'Accepted',
      testsPassed: 10,
      testsTotal: 10,
      runtimeMs,
      memoryMb,
      score: 100,
      pointsEarned: points,
      activityFactId: activityFact.id,
      submittedAt: new Date().toISOString(),
    };
  }
}
