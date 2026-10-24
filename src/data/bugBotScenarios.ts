import { BugBotScenario } from '../types/evolution';

export const BUGBOT_SCENARIOS: BugBotScenario[] = [
  {
    id: 'bugbot-1-array-bounds',
    title: 'BugBot Duel: Array Bounds Blunder',
    topic: 'Arrays and Strings',
    rivalTaunt: "Hah! I wrote this array reversal algorithm in record time. It's flawless! Can you even spot why it crashed in production?",
    buggyCode: `function reverseInPlace(arr) {
  for (let i = 0; i <= arr.length; i++) {
    let temp = arr[i];
    arr[i] = arr[arr.length - i];
    arr[arr.length - i] = temp;
  }
  return arr;
}`,
    bugExplanation: 'Two critical bugs: 1) Loop condition i <= arr.length accesses arr[arr.length] which is undefined (out-of-bounds), and 2) swapping up to length/2 is needed; looping all the way through reverses and then reverses back to original order!',
    errorCategory: 'Off-by-one / Boundary Error',
    options: [
      {
        text: 'The loop condition <= arr.length accesses out-of-bounds index, and looping past Math.floor(length/2) undoes the swaps.',
        isCorrect: true,
        explanation: 'Spot on! In 0-indexed arrays, the last element is length - 1, and in-place reversal only iterates up to n/2.',
      },
      {
        text: 'The temp variable is declared with let instead of const, causing a closure leakage.',
        isCorrect: false,
        explanation: 'Variables declared with let inside loops are properly block-scoped and do not cause bounds crashes.',
      },
      {
        text: 'Arrays in JavaScript cannot be modified in-place using indexing.',
        isCorrect: false,
        explanation: 'JavaScript arrays are mutable; elements can be modified directly via index assignment.',
      },
      {
        text: 'The function should use a while loop; for loops cannot reverse arrays.',
        isCorrect: false,
        explanation: 'Any loop construct can be used to reverse an array with proper index bounds.',
      },
    ],
    rewardXp: 40,
    rewardCoins: 25,
    rewardEnergy: 3,
  },
  {
    id: 'bugbot-2-infinite-loop',
    title: 'BugBot Duel: Linked List Cycle Freeze',
    topic: 'Linked Lists',
    rivalTaunt: "My two-pointer cycle detector is 1000x faster than Floyd's algorithm! Wait... why is my CPU fan spinning at maximum speed?",
    buggyCode: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    bugExplanation: "Fast pointer only advances by 1 node per iteration (fast = fast.next) instead of 2 (fast = fast.next.next). Because slow and fast start at the same node and both advance by 1, slow === fast is immediately true on the first step, or if fast isn't advancing faster, it can never catch up from behind!",
    errorCategory: 'Two-Pointer Step Invariant Violation',
    options: [
      {
        text: 'fast only moves 1 step per tick instead of 2 steps (fast.next.next), failing the Floyd Tortoise and Hare invariant.',
        isCorrect: true,
        explanation: 'Exactly right! For Floyd cycle finding, fast must move 2 steps while slow moves 1 step.',
      },
      {
        text: 'Linked lists must always be converted to arrays first before checking for cycles.',
        isCorrect: false,
        explanation: 'Converting to an array without cycle handling would cause an infinite loop during traversal.',
      },
      {
        text: 'The while condition should be fast !== null instead of fast && fast.next.',
        isCorrect: false,
        explanation: 'fast && fast.next is necessary to prevent null pointer exceptions when accessing fast.next.',
      },
      {
        text: 'The slow pointer should start at head.next while fast starts at head.',
        isCorrect: false,
        explanation: 'Starting both at head works properly as long as they step at different speeds (1 vs 2) before checking equality.',
      },
    ],
    rewardXp: 45,
    rewardCoins: 30,
    rewardEnergy: 3,
  },
  {
    id: 'bugbot-3-recursion-base-case',
    title: 'BugBot Duel: Recursion Stack Overflow',
    topic: 'Recursion and Backtracking',
    rivalTaunt: "Recursion is simple math! My Fibonacci calculator computes the n-th Fibonacci number with pure recursive elegance. Why did Node.js say 'Maximum call stack exceeded'?",
    buggyCode: `function fibonacci(n) {
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    bugExplanation: 'Missing base case for n = 0! For n = 2: fibonacci(2) calls fibonacci(1) [returns 1] and fibonacci(0). fibonacci(0) calls fibonacci(-1) and fibonacci(-2), spiraling into negative infinity and causing a stack overflow.',
    errorCategory: 'Missing / Incomplete Base Case',
    options: [
      {
        text: 'Missing base case for n <= 0; fibonacci(2) evaluates fibonacci(0) which descends into negative infinity.',
        isCorrect: true,
        explanation: 'Correct! A valid base case must cover both n === 0 and n === 1 (or n <= 1) to stop recursive branching.',
      },
      {
        text: 'Fibonacci numbers cannot be calculated recursively without importing an external math library.',
        isCorrect: false,
        explanation: 'Recursion is a native programming technique and requires no special math libraries.',
      },
      {
        text: 'The function returns a sum rather than a multiplied product.',
        isCorrect: false,
        explanation: 'Fibonacci is defined by summation: F(n) = F(n-1) + F(n-2).',
      },
      {
        text: 'Recursion depth in JavaScript is limited to 10 iterations.',
        isCorrect: false,
        explanation: 'Modern JavaScript runtimes support thousands of stack frames before overflowing.',
      },
    ],
    rewardXp: 50,
    rewardCoins: 30,
    rewardEnergy: 4,
  },
  {
    id: 'bugbot-4-greedy-trap',
    title: 'BugBot Duel: Greedy Coin Fallacy',
    topic: 'Dynamic Programming',
    rivalTaunt: "Why do programmers complain about Dynamic Programming? The Greedy approach always picks the largest coin first and gives the fewest coins. It's obviously optimal!",
    buggyCode: `function minCoinsGreedy(coins, amount) {
  coins.sort((a, b) => b - a); // descending
  let count = 0;
  for (let coin of coins) {
    while (amount >= coin) {
      amount -= coin;
      count++;
    }
  }
  return amount === 0 ? count : -1;
}`,
    bugExplanation: 'Greedy fails when coin denominations lack the matroid property! For example, with coins [1, 3, 4] and amount = 6: Greedy picks 4, then two 1s = 3 coins total (4, 1, 1). But the optimal solution is two 3s (3, 3) = 2 coins! DP is required for arbitrary coin sets.',
    errorCategory: 'Suboptimal Substructure / Greedy Trap',
    options: [
      {
        text: 'Greedy fails for arbitrary coin systems (e.g. coins [1, 3, 4] for amount 6 gives 3 coins [4,1,1] instead of optimal 2 [3,3]).',
        isCorrect: true,
        explanation: 'Exact analysis! Greedy is only optimal for canonical coin systems (like US currency); arbitrary denominations require DP.',
      },
      {
        text: 'Sorting in descending order inverts the coin values.',
        isCorrect: false,
        explanation: 'Sorting descending sorts largest to smallest numbers properly.',
      },
      {
        text: 'The count variable needs to be a BigInt to handle amounts over 10.',
        isCorrect: false,
        explanation: 'Standard Numbers in JS safely represent integers up to 2^53 - 1.',
      },
      {
        text: 'The while loop condition should check amount > coin instead of amount >= coin.',
        isCorrect: false,
        explanation: 'amount >= coin correctly allows taking a coin that matches the exact remaining amount.',
      },
    ],
    rewardXp: 55,
    rewardCoins: 35,
    rewardEnergy: 4,
  },
  {
    id: 'bugbot-5-graph-cycle',
    title: 'BugBot Duel: Graph DFS Eternal Loop',
    topic: 'Graph Algorithms',
    rivalTaunt: "My graph traversal explores every path with depth-first search in under 5 lines of code! Why is it crashing with stack overflow on cyclic graphs?",
    buggyCode: `function dfsTraversal(graph, node) {
  console.log("Visiting:", node);
  for (let neighbor of graph[node]) {
    dfsTraversal(graph, neighbor);
  }
}`,
    bugExplanation: 'No visited set! Without tracking visited nodes (e.g. using a Set), any bidirectional edge (A <-> B) or cycle (A -> B -> C -> A) results in mutual infinite recursion and stack overflow.',
    errorCategory: 'Unvisited Cycle Traversal',
    options: [
      {
        text: 'Missing a visited Set to record already-explored vertices, causing infinite recursion on any cycle.',
        isCorrect: true,
        explanation: 'Bullseye! Cyclic graphs require visited tracking (Set or boolean array) to prevent infinite loops.',
      },
      {
        text: 'DFS cannot be written recursively; graphs only permit queue-based BFS traversal.',
        isCorrect: false,
        explanation: 'DFS is naturally implemented recursively using the call stack, provided visited nodes are tracked.',
      },
      {
        text: 'console.log slows down the JavaScript engine so much that memory runs out.',
        isCorrect: false,
        explanation: 'console.log is I/O bound and does not cause stack overflows.',
      },
      {
        text: 'graph[node] should be accessed using bracket notation twice like graph[node][0].',
        isCorrect: false,
        explanation: 'Iterating over graph[node] with a for-of loop is standard adjacency list traversal.',
      },
    ],
    rewardXp: 60,
    rewardCoins: 40,
    rewardEnergy: 5,
  },
];
