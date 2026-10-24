import { Challenge } from '../../types/challenge';

export const STAGE_21_30_CHALLENGES: Challenge[] = [
  {
    id: 'c-21-linked-list-anatomy',
    squareId: 21,
    title: 'Linked List Node Memory Anatomy',
    topic: 'Linked Lists',
    subtopic: 'Node Structure & Pointer Referencing',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Unlike array elements stored contiguously in memory, how are nodes in a singly linked list laid out in RAM?',
    options: [
      'Nodes are scattered across arbitrary heap locations, connected solely by pointer memory addresses in each node\'s `next` field',
      'Nodes are stored in sequential RAM memory addresses separated by exactly 8 bytes',
      'All node values are packed into a single CPU register cache line',
      'The operating system virtual memory paging table maps them to contiguous disk blocks'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about how `new ListNode(val)` dynamically allocates memory.',
      'Can node 1 be at address 0x1000 and node 2 be at 0x8500?',
      'Yes, each node lives wherever heap allocation provides space, linked by explicit pointers.'
    ],
    explanation: 'Linked list nodes are independently allocated on the heap at non-contiguous memory locations. Accessing node i requires traversing i pointers from the head (`node = node.next`), which lacks cache locality and requires O(N) access time.',
    learningObjective: 'Understand heap allocation, pointer navigation, and lack of cache locality in linked lists.',
    commonMistake: 'Assuming linked lists benefit from CPU L1/L2 hardware prefetching like contiguous arrays.',
    tags: ['linked-lists', 'memory', 'pointers']
  },
  {
    id: 'c-22-list-reversal',
    squareId: 22,
    title: 'In-Place Linked List Reversal Invariant',
    topic: 'Linked Lists',
    subtopic: 'Pointer Manipulation',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'code_trace',
    codeSnippet: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next; // save next
    curr.next = prev;         // reverse pointer
    prev = curr;              // advance prev
    curr = nextTemp;          // advance curr
  }
  return prev;
}`,
    prompt: 'If the input list is 1 -> 2 -> 3 -> null, what is the value of `curr.next` right after the first iteration finishes?',
    options: [
      '`null` (because node 1 now points to `prev`, which was null)',
      '`node(2)` (the original next pointer was unchanged)',
      '`node(3)` (the tail of the list)',
      '`undefined`'
    ],
    correctOptionIndex: 0,
    hints: [
      'Trace step-by-step for node 1: prev is initially null.',
      'curr.next is reassigned to prev.',
      'So node 1\'s next pointer now points to null.'
    ],
    explanation: 'In the first iteration, curr is 1. `curr.next = prev` points node 1 to `null` (making it the future tail). Then `prev` becomes node 1, and `curr` moves to node 2. Node 1 now correctly points to null.',
    learningObjective: 'Master the 3-pointer invariant (prev, curr, nextTemp) for in-place linear reversals.',
    commonMistake: 'Reassigning curr.next before saving nextTemp, which severs the list and causes memory disconnection.',
    tags: ['linked-lists', 'reversal', 'pointers']
  },
  {
    id: 'c-23-floyd-cycle-invariant',
    squareId: 23,
    title: 'Floyd\'s Cycle Detection (Tortoise and Hare)',
    topic: 'Linked Lists',
    subtopic: 'Fast & Slow Pointers',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In Floyd\'s cycle detection algorithm, slow moves 1 step and fast moves 2 steps. Why is fast guaranteed to meet slow inside a cycle without jumping over it?',
    options: [
      'The relative distance between fast and slow decreases by exactly 1 step on every iteration inside the cycle',
      'The fast pointer pauses whenever slow reaches the cycle entry node',
      'The cycle length must be an exact multiple of the fast pointer\'s speed',
      'Fast pointer reverses direction when it detects the end of the list'
    ],
    correctOptionIndex: 0,
    hints: [
      'Consider the gap between fast and slow in modular cycle arithmetic.',
      'Each step: slow advances by 1, fast advances by 2.',
      'Relative speed: 2 - 1 = 1. A gap decreasing by 1 every step must hit 0 without skipping.'
    ],
    explanation: 'Relative distance analysis: In each step, the distance between fast and slow increases (or in the cycle, decreases from behind) by strictly 1 node: (dist - 1) % C. Because distance decreases by an integer step of 1, it cannot jump from 1 to -1; it must hit 0, guaranteeing collision within O(C) steps.',
    learningObjective: 'Understand relative velocity and discrete modular convergence in two-pointer algorithms.',
    commonMistake: 'Thinking fast pointer can "skip" over slow pointer if the cycle length is odd.',
    tags: ['linked-lists', 'two-pointers', 'cycle-detection']
  },
  {
    id: 'c-24-floyd-cycle-start',
    squareId: 24,
    title: 'Finding the Cycle Entry Point',
    topic: 'Linked Lists',
    subtopic: 'Mathematical Cycle Finding',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'After slow and fast meet in a linked list cycle, why does resetting one pointer to `head` and advancing both at 1 step per turn find the exact entry node of the cycle?',
    options: [
      'The distance from head to cycle entrance equals the distance from the meeting point to the cycle entrance along the cycle',
      'The meeting point is always exactly at the cycle entrance',
      'The fast pointer reverses its direction and bounces back to the head',
      'Both pointers reset their memory hash tables to clear visited flags'
    ],
    correctOptionIndex: 0,
    hints: [
      'Let L = distance from head to cycle entry, C = cycle length, d = distance from entry to meeting point.',
      'Slow traveled: L + d. Fast traveled: 2(L + d) = L + d + n*C => L = n*C - d.',
      'Traveling L from head and L from meeting point reaches the cycle entry simultaneously.'
    ],
    explanation: 'Algebraic proof: If distance from head to entry is L and entry to meeting point is d, slow traveled L + d and fast traveled 2(L + d). Thus L + d = n*C, meaning L = n*C - d. Walking L steps from the meeting point completes n full cycles and lands precisely at the entrance. Walking L steps from head also lands at the entrance.',
    learningObjective: 'Master the mathematical proof of Floyd\'s algorithm Phase II for finding cycle start.',
    commonMistake: 'Assuming the initial collision point between slow and fast is always the cycle entrance.',
    tags: ['linked-lists', 'floyd-algorithm', 'math']
  },
  {
    id: 'c-25-doubly-linked-deletion',
    squareId: 25,
    title: 'Doubly Linked List Node Deletion',
    topic: 'Linked Lists',
    subtopic: 'Doubly Linked Lists & Bidirectional Pointers',
    skillCategory: 'debugging',
    difficulty: 'medium',
    type: 'bug_hunt',
    codeSnippet: `function deleteNode(target) {
  // target is an arbitrary internal node in a doubly linked list
  if (target.prev !== null) {
    target.prev.next = target.next;
  }
  // BUG: What is missing before deleting target?
  target.next = null;
  target.prev = null;
}`,
    prompt: 'What critical pointer adjustment was omitted in this doubly linked list node deletion?',
    options: [
      'target.next.prev was not updated to point to target.prev (if target.next !== null)',
      'The head of the entire list was not reset to null',
      'A doubly linked list node cannot be deleted in O(1) time without full traversal',
      'target.val was not set to 0 before unlinking'
    ],
    correctOptionIndex: 0,
    hints: [
      'In a doubly linked list, each node has two incoming pointers: one from prev and one from next.',
      'We updated target.prev.next to bypass target.',
      'Did we update target.next.prev to bypass target?'
    ],
    explanation: 'In a doubly linked list, both neighboring nodes must be updated. While `target.prev.next = target.next` connects the predecessor forward, we must also set `target.next.prev = target.prev` (if target.next exists) to connect the successor backward. Omitting it breaks reverse traversals.',
    learningObjective: 'Correctly update bidirectional pointer invariants when mutating doubly linked lists.',
    commonMistake: 'Only rewiring the next pointer and neglecting the backward prev pointer.',
    tags: ['linked-lists', 'doubly-linked-list', 'debugging']
  },
  {
    id: 'c-26-dummy-head-pattern',
    squareId: 26,
    title: 'The Sentinel / Dummy Head Pattern',
    topic: 'Linked Lists',
    subtopic: 'Sentinel Nodes & Edge Cases',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Why do seasoned algorithms engineers use a `dummy = new ListNode(-1)` sentinel node when merging two sorted linked lists?',
    options: [
      'It eliminates edge case branching for the head node, ensuring every real node is attached via a uniform `curr.next` pointer',
      'It automatically sorts the list in descending order in the CPU cache',
      'It prevents JavaScript from garbage collecting the original list elements',
      'It reduces the time complexity of the merge from O(N) to O(1)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Without a dummy node, how do you determine which list provides the head?',
      'You need an `if (head === null)` check on the very first insertion.',
      'A dummy node provides a fixed non-null anchor so `curr.next = ...` works identically for all nodes.'
    ],
    explanation: 'A sentinel / dummy node provides a permanent anchor for the list head. Without it, special logic is required to initialize `head` on the first iteration. With `dummy`, every attachment is a standard `tail.next = chosenNode; tail = tail.next`. Returning `dummy.next` yields the complete result cleanly.',
    learningObjective: 'Simplify linked list algorithms and eliminate boundary edge cases using sentinel nodes.',
    commonMistake: 'Returning dummy instead of dummy.next, corrupting the list with the arbitrary sentinel value.',
    tags: ['linked-lists', 'sentinel-pattern', 'clean-code']
  },
  {
    id: 'c-27-monotonic-stack-invariant',
    squareId: 27,
    title: 'Monotonic Stack: Next Greater Element Invariant',
    topic: 'Stacks & Queues',
    subtopic: 'Monotonic Stack Mechanics',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'To find the Next Greater Element to the right for every element in an array in O(n) total time, which stack invariant must be maintained?',
    options: [
      'A monotonic decreasing stack (top of stack holds smaller elements, popped when a larger incoming element arrives)',
      'A monotonic increasing stack (stack is sorted strictly ascending from top to bottom)',
      'A random priority queue sorted by element index',
      'A FIFO queue where elements are popped after exactly 2 comparisons'
    ],
    correctOptionIndex: 0,
    hints: [
      'When an element arr[i] arrives, which pending elements can it serve as the "next greater" for?',
      'It serves as the answer for all pending elements in the stack that are smaller than arr[i].',
      'Thus, elements waiting in the stack must be in decreasing order; once a larger element appears, it resolves them.'
    ],
    explanation: 'A monotonic decreasing stack maintains elements in decreasing order from bottom to top. When an incoming element x is greater than stack.top(), x is the Next Greater Element for stack.top(). We pop and record the answer until stack.top() >= x or stack is empty, then push x. Each element is pushed and popped at most once, yielding O(N) total time.',
    learningObjective: 'Master monotonic stack invariants for linear-time nearest-greater/smaller element problems.',
    commonMistake: 'Using nested loops (O(N^2)) instead of maintaining a monotonic stack invariant in O(N).',
    tags: ['stacks', 'monotonic-stack', 'invariants']
  },
  {
    id: 'c-28-daily-temperatures-trace',
    squareId: 28,
    title: 'Daily Temperatures: Monotonic Stack Dry Run',
    topic: 'Stacks & Queues',
    subtopic: 'Stack Execution Tracing',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'code_trace',
    codeSnippet: `// Given temperatures = [73, 74, 75, 71, 69, 72, 76]
// Find how many days until a warmer temperature for each day
// At index 5 (temp = 72), stack contains indices [2, 3, 4] (temps 75, 71, 69)
// What index is popped first when temp 72 is processed?`,
    prompt: 'When processing temperature 72 (index 5) against stack `[2, 3, 4]`, which index is popped first and what wait time is calculated for it?',
    options: [
      'Index 4 (temp 69) is popped; wait time is 5 - 4 = 1 day',
      'Index 2 (temp 75) is popped; wait time is 5 - 2 = 3 days',
      'Index 3 (temp 71) is popped; wait time is 5 - 3 = 2 days',
      'No index is popped because 72 is smaller than 75'
    ],
    correctOptionIndex: 0,
    hints: [
      'Stack top is at the end of the array: index 4 has temperature 69.',
      'Is 72 > 69? Yes, so index 4 has found its warmer day.',
      'Wait time = current index (5) - popped index (4) = 1.'
    ],
    explanation: 'The top of the stack is index 4 (temp 69). Since current temp 72 > 69, index 4 is resolved first. Its wait duration is currentIndex (5) - poppedIndex (4) = 1 day. Then index 3 (temp 71) is compared next and also popped (5 - 3 = 2 days).',
    learningObjective: 'Trace stack indices and calculate distance metrics in monotonic stack algorithms.',
    commonMistake: 'Storing values instead of indices in the stack, losing the ability to calculate distance/time intervals.',
    tags: ['stacks', 'monotonic-stack', 'dry-run']
  },
  {
    id: 'c-29-queue-via-stacks',
    squareId: 29,
    title: 'Queue via Two Stacks: Amortized Analysis',
    topic: 'Stacks & Queues',
    subtopic: 'Amortized Complexity & Data Structure Design',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'complexity_choice',
    prompt: 'When implementing a FIFO Queue using two LIFO Stacks (`inStack` for enqueue and `outStack` for dequeue), what is the amortized time complexity of the `dequeue()` operation?',
    options: [
      'O(1) amortized time, because each element is moved from inStack to outStack exactly once during its entire lifetime',
      'O(N) strictly for every dequeue operation',
      'O(log N) amortized time due to stack tree rebalancing',
      'O(N^2) because all elements must be copied back to inStack after each pop'
    ],
    correctOptionIndex: 0,
    hints: [
      'When outStack is empty, all N elements in inStack are popped and pushed to outStack (reversing their order).',
      'How many times is an individual element transferred from inStack to outStack?',
      'Exactly once! So across N dequeues, total transfer cost is 2N operations, meaning 2N / N = O(1) per operation on average.'
    ],
    explanation: 'Amortized accounting method: When outStack is empty, we pour all elements from inStack to outStack. While this single call takes O(K) time, every element is moved to outStack exactly once and popped from outStack exactly once. Over N operations, the total work is 2N, giving an amortized cost of O(1) per dequeue.',
    learningObjective: 'Understand amortized complexity analysis using the potential/accounting method.',
    commonMistake: 'Assuming worst-case single-operation cost (O(N)) represents the average operational complexity.',
    tags: ['stacks', 'queues', 'amortized-analysis']
  },
  {
    id: 'c-30-circular-buffer',
    squareId: 30,
    title: 'Circular Buffer / Ring Queue Invariants',
    topic: 'Stacks & Queues',
    subtopic: 'Circular Arrays & Modulo Arithmetic',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In a fixed-size Circular Buffer of capacity K with `head` and `tail` pointers, how do you correctly calculate the next position of `tail` upon inserting an element?',
    options: [
      'tail = (tail + 1) % K',
      'tail = tail + 1; if (tail > K) tail = 0;',
      'tail = (tail * 2) % K',
      'tail = Math.min(tail + 1, K)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Indices in an array of size K run from 0 to K-1.',
      'When tail reaches K-1, the next index should wrap around to 0.',
      '(K - 1 + 1) % K = K % K = 0.'
    ],
    explanation: 'Modulo arithmetic `(index + 1) % K` wraps the index seamlessly back to 0 when it reaches the capacity boundary K. This avoids explicit branching and enables constant O(1) ring buffer updates for OS kernels and network packet queues.',
    learningObjective: 'Apply modular ring arithmetic to implement fixed-capacity circular queues.',
    commonMistake: 'Off-by-one errors using `> K` instead of `>= K` when manual boundary branching is attempted.',
    tags: ['queues', 'circular-buffer', 'invariants']
  }
];
