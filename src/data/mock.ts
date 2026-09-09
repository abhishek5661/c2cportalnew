import type { LearningPath, PathModule, Problem, Submission } from '../types'

export const user = {
  name: 'Ananya',
  fullName: 'Ananya Sharma',
  level: 4,
  xp: 1250,
  nextLevelXp: 1500,
  weeklyXp: 1850,
  weeklyXpGoal: 2500,
  problemsSolved: 1248,
  streakDays: 23,
  bestStreak: 45,
  globalRank: 'Top 12%',
  overallProgress: 62,
  hoursSpent: 14,
  hoursGoal: 20,
  dailyGoalHours: 2,
  dailyGoalTarget: 3,
}

export const learningPaths: LearningPath[] = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Master problem solving and DSA concepts.',
    category: 'DSA',
    completion: 60,
    accent: 'brand',
    icon: 'code',
  },
  {
    id: 'aptitude',
    title: 'Aptitude',
    description: 'Excel in quantitative, logical and verbal ability.',
    category: 'Aptitude',
    completion: 40,
    accent: 'orange',
    icon: 'chart',
  },
  {
    id: 'programming',
    title: 'Programming',
    description: 'Learn to code in popular languages.',
    category: 'Programming',
    completion: 75,
    accent: 'green',
    icon: 'terminal',
  },
  {
    id: 'cs-fundamentals',
    title: 'CS Fundamentals',
    description: 'Strengthen core computer science concepts.',
    category: 'CS Fundamentals',
    completion: 30,
    accent: 'brand',
    icon: 'cpu',
  },
  {
    id: 'verbal',
    title: 'Verbal Ability',
    description: 'Improve reading and comprehension.',
    category: 'Soft Skills',
    completion: 20,
    accent: 'purple',
    icon: 'book',
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Build modern websites and web apps.',
    category: 'Domains',
    completion: 35,
    accent: 'orange',
    icon: 'globe',
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Learn ML concepts and build intelligent models.',
    category: 'Domains',
    completion: 10,
    accent: 'red',
    icon: 'brain',
  },
  {
    id: 'interview',
    title: 'Interview Prep',
    description: 'Prepare for interviews and placements.',
    category: 'DSA',
    completion: 25,
    accent: 'cyan',
    icon: 'briefcase',
  },
]

export const pathModules: PathModule[] = [
  {
    id: 'arrays-strings',
    title: 'Arrays & Strings',
    topicCount: 5,
    completion: 100,
    locked: false,
    topics: [
      { id: 'intro', title: 'Introduction', done: true },
      { id: 'arrays', title: 'Arrays', done: true },
      { id: '2d-arrays', title: '2D Arrays', done: true },
      { id: 'strings', title: 'Strings', done: true },
      { id: 'problems', title: 'Problems', done: true },
    ],
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    topicCount: 5,
    completion: 60,
    locked: false,
    topics: [
      { id: 'singly', title: 'Singly Linked List', done: true },
      { id: 'doubly', title: 'Doubly Linked List', done: true },
      { id: 'circular', title: 'Circular Linked List', done: true },
      { id: 'reversal', title: 'Reversal Patterns', done: false },
      { id: 'problems', title: 'Problems', done: false },
    ],
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    topicCount: 4,
    completion: 25,
    locked: false,
    topics: [
      { id: 'stack', title: 'Stack Basics', done: true },
      { id: 'queue', title: 'Queue Basics', done: false },
      { id: 'deque', title: 'Deque', done: false },
      { id: 'problems', title: 'Problems', done: false },
    ],
  },
  {
    id: 'trees',
    title: 'Trees',
    topicCount: 6,
    completion: 0,
    locked: true,
    topics: [],
  },
  {
    id: 'graphs',
    title: 'Graphs',
    topicCount: 7,
    completion: 0,
    locked: true,
    topics: [],
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    topicCount: 8,
    completion: 0,
    locked: true,
    topics: [],
  },
]

const pythonStarter = `def largestElement(nums):
    # Write your code here
    pass
`

export const problems: Problem[] = [
  {
    id: 'largest-element-in-an-array',
    number: 1,
    title: 'Largest Element in an Array',
    difficulty: 'Easy',
    topics: ['Arrays'],
    successRate: 92,
    solvedBy: 12400,
    solved: true,
    statement:
      'Given an array of integers nums, return the largest element in the array.',
    examples: [
      {
        input: 'nums = [3, 7, 2, 9, 5]',
        output: '9',
        explanation: 'The largest element in the array is 9.',
      },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [-10, -5, -20, -3]', output: '-3' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    hints: [
      'Try iterating through the array and keep track of the maximum element seen so far.',
      'Compare each element with the current maximum and update it if needed.',
      'Think about what value to return after the loop.',
    ],
    starterCode: { 'Python 3': pythonStarter },
  },
  {
    id: 'check-if-array-is-sorted',
    number: 2,
    title: 'Check if Array is Sorted',
    difficulty: 'Easy',
    topics: ['Arrays'],
    successRate: 88,
    solvedBy: 9800,
    solved: true,
    statement:
      'Given an array of integers nums, return true if it is sorted in non-decreasing order.',
    examples: [{ input: 'nums = [1, 2, 3]', output: 'true' }],
    constraints: ['1 <= nums.length <= 10^5'],
    hints: ['Compare every adjacent pair of elements.'],
    starterCode: { 'Python 3': 'def isSorted(nums):\n    pass\n' },
  },
  {
    id: 'remove-duplicates-from-sorted-array',
    number: 3,
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Medium',
    topics: ['Arrays'],
    successRate: 68,
    solvedBy: 7100,
    solved: false,
    statement:
      'Given a sorted array nums, remove the duplicates in-place and return the new length.',
    examples: [{ input: 'nums = [1, 1, 2]', output: '2' }],
    constraints: ['1 <= nums.length <= 10^5'],
    hints: ['Use two pointers.'],
    starterCode: { 'Python 3': 'def removeDuplicates(nums):\n    pass\n' },
  },
  {
    id: 'two-sum',
    number: 4,
    title: 'Two Sum',
    difficulty: 'Medium',
    topics: ['Arrays'],
    successRate: 71,
    solvedBy: 15300,
    solved: false,
    statement:
      'Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    hints: ['Store seen values in a hash map.', 'Look up target - nums[i].'],
    starterCode: {
      'Python 3':
        'class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        """\n        Return indices of the two numbers such that they add up to target.\n        """\n        # Write your code here\n',
    },
  },
  {
    id: 'longest-common-prefix',
    number: 5,
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    topics: ['Strings'],
    successRate: 85,
    solvedBy: 11200,
    solved: false,
    statement:
      'Write a function to find the longest common prefix string amongst an array of strings.',
    examples: [{ input: 'strs = ["flower","flow","flight"]', output: '"fl"' }],
    constraints: ['1 <= strs.length <= 200'],
    hints: ['Compare characters column by column.'],
    starterCode: { 'Python 3': 'def longestCommonPrefix(strs):\n    pass\n' },
  },
  {
    id: 'valid-anagram',
    number: 6,
    title: 'Valid Anagram',
    difficulty: 'Easy',
    topics: ['Strings'],
    successRate: 90,
    solvedBy: 10600,
    solved: true,
    statement:
      'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    examples: [{ input: 's = "anagram", t = "nagaram"', output: 'true' }],
    constraints: ['1 <= s.length <= 5 * 10^4'],
    hints: ['Count character frequencies.'],
    starterCode: { 'Python 3': 'def isAnagram(s, t):\n    pass\n' },
  },
  {
    id: 'group-anagrams',
    number: 7,
    title: 'Group Anagrams',
    difficulty: 'Medium',
    topics: ['Strings'],
    successRate: 63,
    solvedBy: 8700,
    solved: false,
    statement: 'Given an array of strings, group the anagrams together.',
    examples: [
      { input: 'strs = ["eat","tea","tan"]', output: '[["eat","tea"],["tan"]]' },
    ],
    constraints: ['1 <= strs.length <= 10^4'],
    hints: ['Use the sorted string as a key.'],
    starterCode: { 'Python 3': 'def groupAnagrams(strs):\n    pass\n' },
  },
  {
    id: 'longest-substring-without-repeating-characters',
    number: 8,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Hard',
    topics: ['Strings'],
    successRate: 45,
    solvedBy: 6300,
    solved: false,
    statement:
      'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [{ input: 's = "abcabcbb"', output: '3' }],
    constraints: ['0 <= s.length <= 5 * 10^4'],
    hints: ['Sliding window with a set.'],
    starterCode: {
      'Python 3': 'def lengthOfLongestSubstring(s):\n    pass\n',
    },
  },
]

export const submissions: Submission[] = [
  { id: 1, submittedOn: '24 May 2024, 10:32 AM', language: 'Python 3', verdict: 'Accepted', runtimeMs: 56, memoryMb: 14.2, testsPassed: 10, testsTotal: 10, score: 100 },
  { id: 2, submittedOn: '24 May 2024, 10:21 AM', language: 'Python 3', verdict: 'Wrong Answer', runtimeMs: 32, memoryMb: 13.8, testsPassed: 7, testsTotal: 10, score: 70 },
  { id: 3, submittedOn: '24 May 2024, 10:15 AM', language: 'Python 3', verdict: 'Accepted', runtimeMs: 52, memoryMb: 14.1, testsPassed: 10, testsTotal: 10, score: 100 },
  { id: 4, submittedOn: '24 May 2024, 10:10 AM', language: 'Python 3', verdict: 'Time Limit Exceeded', runtimeMs: null, memoryMb: null, testsPassed: 3, testsTotal: 10, score: 30 },
  { id: 5, submittedOn: '24 May 2024, 10:02 AM', language: 'Python 3', verdict: 'Accepted', runtimeMs: 48, memoryMb: 13.9, testsPassed: 10, testsTotal: 10, score: 100 },
  { id: 6, submittedOn: '24 May 2024, 09:58 AM', language: 'Python 3', verdict: 'Runtime Error', runtimeMs: null, memoryMb: null, testsPassed: 2, testsTotal: 10, score: 20 },
  { id: 7, submittedOn: '24 May 2024, 09:50 AM', language: 'Python 3', verdict: 'Accepted', runtimeMs: 55, memoryMb: 14.0, testsPassed: 10, testsTotal: 10, score: 100 },
  { id: 8, submittedOn: '24 May 2024, 09:42 AM', language: 'Python 3', verdict: 'Wrong Answer', runtimeMs: 29, memoryMb: 13.7, testsPassed: 8, testsTotal: 10, score: 80 },
  { id: 9, submittedOn: '24 May 2024, 09:35 AM', language: 'Python 3', verdict: 'Accepted', runtimeMs: 50, memoryMb: 14.1, testsPassed: 10, testsTotal: 10, score: 100 },
  { id: 10, submittedOn: '24 May 2024, 09:28 AM', language: 'Python 3', verdict: 'Accepted', runtimeMs: 47, memoryMb: 13.9, testsPassed: 10, testsTotal: 10, score: 100 },
]

export const journeySteps = [
  { id: 'master', title: 'Master', caption: 'Build strong foundations', state: 'done' as const },
  { id: 'build', title: 'Build', caption: 'Apply skills by building projects', state: 'done' as const },
  { id: 'compete', title: 'Compete', caption: 'Test your skills in contests', state: 'current' as const },
  { id: 'career', title: 'Career', caption: 'Prepare for placements & opportunities', state: 'locked' as const },
  { id: 'sustain', title: 'Sustain', caption: 'Keep improving everyday', state: 'locked' as const },
]

export const continueLearning = [
  { id: 'dsa', title: 'DSA', subtitle: 'Arrays & Strings', completion: 60, accent: 'purple' as const },
  { id: 'aptitude', title: 'Aptitude', subtitle: 'Number Systems', completion: 40, accent: 'orange' as const },
  { id: 'programming', title: 'Programming', subtitle: 'Functions in Python', completion: 75, accent: 'green' as const },
  { id: 'cs-fundamentals', title: 'CS Fundamentals', subtitle: 'Data Structures', completion: 30, accent: 'brand' as const },
  { id: 'verbal', title: 'Verbal Ability', subtitle: 'Reading Comprehension', completion: 20, accent: 'cyan' as const },
]

export const recommendations = [
  { id: 'dsa-practice', title: 'DSA Practice', caption: 'Solve 15 problems based on your level', action: 'Start Practice', accent: 'brand' as const },
  { id: 'aptitude-quiz', title: 'Aptitude Quiz', caption: 'Improve speed and accuracy', action: 'Take Quiz', accent: 'orange' as const },
  { id: 'build-project', title: 'Build a Project', caption: 'Create and deploy a real-world project', action: 'Explore Projects', accent: 'purple' as const },
  { id: 'contest', title: 'Upcoming Contest', caption: 'CodeSprint 2024 starts in 2 days', action: 'Register Now', accent: 'green' as const },
]

export const recommendedNext = [
  { id: 'dp-grids', title: 'DP on Grids', meta: 'DSA · Medium', duration: '15 min' },
  { id: 'time-work', title: 'Time & Work', meta: 'Aptitude · Easy', duration: '10 min' },
  { id: 'portfolio', title: 'Portfolio Website', meta: 'Build · Beginner', duration: '2 hrs' },
]

export const upcomingCalendar = [
  { id: 'codesprint', date: '24 MAY', title: 'CodeSprint 2024', kind: 'Contest', time: '10:00 AM' },
  { id: 'bootcamp', date: '26 MAY', title: 'Recruitment Bootcamp', kind: 'Live Session', time: '07:00 PM' },
  { id: 'resume', date: '28 MAY', title: 'Resume Building', kind: 'Workshop', time: '05:00 PM' },
]

export const leaderboard = [
  { rank: 1, name: 'Rohan Verma', xp: 2450, you: false },
  { rank: 2, name: 'Ananya', xp: 1850, you: true },
  { rank: 3, name: 'Priya Sharma', xp: 1620, you: false },
  { rank: 4, name: 'Karthik Reddy', xp: 1430, you: false },
  { rank: 5, name: 'Arjun Patel', xp: 1210, you: false },
]

export const skillsOverview = [
  { id: 'dsa', label: 'DSA', value: 60, accent: 'brand' as const },
  { id: 'aptitude', label: 'Aptitude', value: 40, accent: 'orange' as const },
  { id: 'programming', label: 'Programming', value: 75, accent: 'green' as const },
  { id: 'cs', label: 'CS Fundamentals', value: 30, accent: 'cyan' as const },
  { id: 'verbal', label: 'Verbal Ability', value: 20, accent: 'purple' as const },
]

export const focusAreas = [
  { id: 'arrays', label: 'Arrays', value: 80, accent: 'brand' as const },
  { id: 'loops', label: 'Loops', value: 70, accent: 'purple' as const },
  { id: 'conditionals', label: 'Conditionals', value: 65, accent: 'green' as const },
  { id: 'functions', label: 'Functions', value: 60, accent: 'orange' as const },
]

export const popularTopics = [
  { id: 'arrays', title: 'Arrays', domain: 'DSA' },
  { id: 'dp', title: 'Dynamic Programming', domain: 'DSA' },
  { id: 'number-systems', title: 'Number Systems', domain: 'Aptitude' },
  { id: 'python-basics', title: 'Python Basics', domain: 'Programming' },
  { id: 'sql-basics', title: 'SQL Basics', domain: 'DBMS' },
  { id: 'oops-concepts', title: 'OOPs Concepts', domain: 'Programming' },
]

export const numberSystemsLessons = [
  { id: 'intro', num: 1, title: 'Introduction to Number Systems', duration: '8 min', status: 'completed' as const },
  { id: 'natural-whole', num: 2, title: 'Natural & Whole Numbers', duration: '10 min', status: 'completed' as const },
  { id: 'integers', num: 3, title: 'Integers', duration: '12 min', status: 'in-progress' as const },
  { id: 'rational-irrational', num: 4, title: 'Rational & Irrational Numbers', duration: '15 min', status: 'locked' as const },
  { id: 'real-numbers', num: 5, title: 'Real Numbers', duration: '12 min', status: 'locked' as const },
  { id: 'laws-indices', num: 6, title: 'Laws of Indices', duration: '18 min', status: 'locked' as const },
  { id: 'hcf-lcm', num: 7, title: 'HCF & LCM', duration: '20 min', status: 'locked' as const },
  { id: 'unit-digit', num: 8, title: 'Unit Digit & Remainders', duration: '18 min', status: 'locked' as const },
  { id: 'factors', num: 9, title: 'Number of Factors', duration: '15 min', status: 'locked' as const },
  { id: 'divisibility', num: 10, title: 'Divisibility Rules', duration: '12 min', status: 'locked' as const },
  { id: 'prime-composite', num: 11, title: 'Prime & Composite Numbers', duration: '14 min', status: 'locked' as const },
  { id: 'practice-set', num: 12, title: 'Practice Set', duration: '25 min', status: 'locked' as const },
]

export const fourYearRoadmap = [
  {
    year: 1,
    badge: 'Year 1',
    title: 'Foundation Explorer',
    technical: [
      'Programming Basics (Python / C++)',
      'Basic Data Structures (Arrays, Strings, Linked Lists)',
      'Web Basics (HTML, CSS, JavaScript)',
      'Git & GitHub Tools',
    ],
    experiences: [
      'Mini Projects (Calculator, Portfolio)',
      '1–2 Beginner Contests',
      '1 Internal College Hackathon',
      'Technical Presentations & Peer Teaching',
    ],
    outcomes: [
      'Strong Coding Fundamentals',
      'Consistent Problem Solving Habits',
      'Presentation Confidence',
    ],
    status: 'current' as const,
  },
  {
    year: 2,
    badge: 'Year 2',
    title: 'Build & Strengthen Builder',
    technical: [
      'DSA (Advanced: Trees, BST, Heaps, Stacks, Queues)',
      'CS Fundamentals: DBMS (SQL, Normalization), OS, Computer Networks',
      'Full Stack Basics (React, Node.js / Python)',
      'OOPs Concepts & System Design Primer',
    ],
    experiences: [
      'Full Stack Web Projects',
      '2–3 Platform Coding Contests (LeetCode, Codeforces)',
      'Inter-College Hackathons (Build, Ship & Present)',
      'Open Source Start & Contributions',
    ],
    outcomes: [
      'Good Problem Solver Rating',
      'Strong Project Portfolio',
      'Teamwork & Collaboration Experience',
    ],
    status: 'upcoming' as const,
  },
  {
    year: 3,
    badge: 'Year 3',
    title: 'Specialize & Build Depth Engineer',
    technical: [
      'Advanced DSA (Graphs, DP, Greedy, Trie)',
      'Low Level & High Level System Design Basics',
      'Cloud & DevOps (AWS/GCP, Docker, CI/CD)',
      'Frontier Tech: AI / ML & LLMs Basics',
    ],
    experiences: [
      'Major Industry-Grade Projects',
      'National Hackathons (Track & Theme based)',
      'Summer / Part-Time Internship',
      'Open Source Maintainer / Core Contributor',
    ],
    outcomes: [
      'Real Industry Exposure',
      'Impactful ATS-Ready Resume',
      'Deep Technical Domain Mastery',
    ],
    status: 'upcoming' as const,
  },
  {
    year: 4,
    badge: 'Year 4',
    title: 'Prepare & Transition Industry Ready',
    technical: [
      'DSA Mastery & Timed Problem Solving',
      'System Design (Scalable Microservices, Caching, DBs)',
      'Company Specific Tech Stack & Questions',
      'Interview Preparation (Aptitude, Core CS, Behavioral)',
    ],
    experiences: [
      'Final Industry Grade Capstone Project',
      'Full-time / High Impact Internship',
      'Regular Mock Interviews (Technical + HR + Managerial)',
      'Campus Placements & Off-Campus Drives',
    ],
    outcomes: [
      'Interview Ready & Articulate',
      'Strong Resume & Verified Portfolio',
      'Multiple Tier-1 Job Offers',
    ],
    status: 'upcoming' as const,
  },
]

export const weeklyRitual = [
  { day: 'MON', label: 'DSA Practice', details: '1–2 Problems (Focus: Arrays & Two Pointers)', tone: 'brand' },
  { day: 'TUE', label: 'Development Work', details: 'Work on Project Feature & Code Review', tone: 'green' },
  { day: 'WED', label: 'CS Concept + Revise', details: 'Core CS Subject + Revise DSA Mistakes', tone: 'purple' },
  { day: 'THU', label: 'Contest / Timed Practice', details: 'Bi-weekly Timed Contest on LeetCode/Codeforces', tone: 'orange' },
  { day: 'FRI', label: 'Project / Feature Build', details: 'Deploy & Ship a working component', tone: 'cyan' },
  { day: 'SAT', label: 'Mock Interview / Presentation', details: 'Peer Mock Interview & Technical Explanations', tone: 'red' },
  { day: 'SUN', label: 'Review, Reflect, Plan', details: 'Analyze Weekly Analytics, Streaks & Plan Next Week', tone: 'brand' },
]

export const frameworkPillars = {
  coreSkills: [
    { title: 'DSA & Problem Solving', items: ['Arrays, Strings, Math', 'Recursion, Backtracking', 'Hashing, Two Pointers', 'Stack, Queue, Deque', 'Trees, BST, Heaps', 'Graphs, DP, Greedy', 'System Design (Basics)'] },
    { title: 'Programming', items: ['Strong in 1+ Language (C++/Java/Python)', 'OOPs Concepts', 'STL / Collections', 'Debugging Skills', 'Clean Code Quality'] },
    { title: 'CS Fundamentals', items: ['DBMS (SQL, Normalization)', 'Operating Systems', 'Computer Networks', 'Computer Architecture', 'Theory of Computation'] },
    { title: 'Development Skills', items: ['HTML, CSS, JavaScript', 'Frontend / Backend', 'APIs & REST', 'Databases (SQL & NoSQL)', 'Git & GitHub', 'Testing & Agile/SDLC'] },
    { title: 'Tools & Technologies', items: ['Linux Basics', 'Docker', 'CI/CD', 'Cloud (AWS/GCP Basics)', 'VS Code, Postman'] },
    { title: 'Frontier Technologies', items: ['AI / ML Basics', 'Generative AI & LLMs', 'Data Science', 'Cloud Native', 'DevOps', 'Cybersecurity Basics'] },
  ],
  personalSkills: [
    'Communication', 'Presentation', 'Confidence Building', 'Time Management', 'Teamwork & Collaboration', 'Leadership', 'Interview Skills', 'Resume & LinkedIn', 'Email & Professional Etiquette', 'Problem Solving Mindset', 'Adaptability & Learning Agility'
  ],
  experienceBuilding: [
    { title: 'Projects', desc: 'Mini Projects (Y1), Full Stack (Y2), Advanced (Y3), Industry Grade (Y4)' },
    { title: 'Hackathons', desc: 'Internal College, National Hackathons, Track & Theme Based, Build, Ship & Present' },
    { title: 'Coding Contests', desc: 'Weekly practice contests, Bi-weekly timed contests, LeetCode, Codeforces, CodeChef' },
    { title: 'Open Source', desc: 'Explore, Contribute, Create, Maintain' },
    { title: 'Internships', desc: 'Summer internships, Part-time / Remote, Real-world problems' },
    { title: 'Competitions', desc: 'Tech Events, Paper Presentations, Case Studies, Innovation Challenges' },
    { title: 'Community & Networking', desc: 'Tech Communities, Meetups & Workshops, Mentorship, LinkedIn Networking' },
    { title: 'Technical Presentations', desc: 'Project Demos, PPT Sessions, Explain Concepts, Peer Teaching' },
  ],
  careerPrep: [
    { title: 'Resume Building', desc: 'Impactful, ATS friendly, Projects, Skills, Achievements' },
    { title: 'GitHub & Portfolio', desc: 'Clean, Organized, Well Documented repositories and live demos' },
    { title: 'LinkedIn Branding', desc: 'Headline, About, Experience, Projects, Technical Posts' },
    { title: 'Aptitude & Reasoning', desc: 'Quantitative Aptitude, Logical Reasoning, Verbal Ability' },
    { title: 'Mock Interviews', desc: 'Technical + HR + Managerial Mock rounds with mentors' },
    { title: 'Company Preparation', desc: 'Onboarding process, Culture, Tech Stack, Recent hiring questions' },
    { title: 'Placement Training', desc: 'Group Discussions, HR Rounds, Salary Negotiation strategies' },
  ],
  continuousAssessment: [
    { title: 'Weekly Check-ins', desc: 'Track progress, tiny goals, consistency score' },
    { title: 'Monthly Skill Assessments', desc: 'DSA, Development, CS Fundamentals, Aptitude benchmarking' },
    { title: 'Performance Analytics', desc: 'Strengths, Weaknesses, Trends, Accuracy meters' },
    { title: 'Personalized Learning Path', desc: 'AI-driven adaptive roadmap based on student pacing' },
    { title: 'Mentor Feedback', desc: '1:1 Mentorship & Guidance from industry practitioners' },
    { title: 'Peer Feedback', desc: 'Code reviews, Project reviews, Mock interview critiques' },
    { title: 'Improvement Plan', desc: 'Focus areas, Recommended resources, Targeted practice' },
    { title: 'Repeat & Level Up', desc: 'Consistent improvement cycle until placement ready' },
  ],
  motivationSystem: [
    { title: 'Daily Micro-Challenges', desc: '5–20 mins daily practice bite' },
    { title: 'Streaks & Badges', desc: 'Gamification to stay consistent every day' },
    { title: 'Leaderboards', desc: 'Healthy competition with peers and batchmates' },
    { title: 'Achievement Unlocks', desc: 'Milestones & tangible skill rewards' },
    { title: 'Reminders & Nudges', desc: 'Stay on track with personalized smart notifications' },
    { title: 'Mentor Connect', desc: 'Regular motivation & personalized guidance' },
    { title: 'Student Community', desc: 'Support, collaborate, and grow together' },
  ]
}
