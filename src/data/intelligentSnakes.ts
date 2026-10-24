import { IntelligentSnake } from '../types/evolution';

export const INTELLIGENT_SNAKES: IntelligentSnake[] = [
  {
    id: 'snake-14-7',
    from: 14,
    to: 7,
    name: 'Infinite Loop / Scope Shadowing Snake',
    misconceptionType: 'infinite_loop',
    explanation: 'Mutating an outer loop counter inside a nested helper without lexical variable scoping causes silent infinite loops.',
    codeSnippet: `for (i = 0; i < 10; i++) {
  processBatch(); // Helper mutates global i!
}`,
    choices: [
      {
        id: 'accept',
        title: 'Accept Descent (-7 Tiles)',
        description: 'Slide down from Tile 14 to Tile 7 with standard descent.',
        challengeType: 'none',
        recoveryDelta: 0,
        penaltyDelta: -7
      },
      {
        id: 'concept',
        title: 'Concept Recovery (+1 Tile Mitigated)',
        description: 'Explain lexical scope closures to land at Tile 8 instead.',
        challengeType: 'concept',
        recoveryDelta: 1,
        penaltyDelta: -6,
        challengeId: 'c-14-snake-concept'
      },
      {
        id: 'debugging',
        title: 'Deep Debugging Reversal (+3 Tiles Mitigated)',
        description: 'Fix the shadowing closure bug to land at Tile 10!',
        challengeType: 'debugging',
        recoveryDelta: 3,
        penaltyDelta: -4,
        challengeId: 'c-14-snake'
      }
    ]
  },
  {
    id: 'snake-19-11',
    from: 19,
    to: 11,
    name: 'Operator Precedence Pitfall Snake',
    misconceptionType: 'wrong_complexity',
    explanation: 'In most languages, strict equality (===) binds tighter than bitwise (&), causing (x & 1 === 0) to evaluate as x & (1 === 0).',
    codeSnippet: `function isEven(num) {
  return num & 1 === 0; // Evaluates as num & false!
}`,
    choices: [
      {
        id: 'accept',
        title: 'Accept Descent (-8 Tiles)',
        description: 'Slide from Tile 19 to Tile 11.',
        challengeType: 'none',
        recoveryDelta: 0,
        penaltyDelta: -8
      },
      {
        id: 'concept',
        title: 'Concept Recovery (+1 Tile Mitigated)',
        description: 'Identify bitwise operator evaluation rules to land at Tile 12.',
        challengeType: 'concept',
        recoveryDelta: 1,
        penaltyDelta: -7,
        challengeId: 'c-19-snake-concept'
      },
      {
        id: 'debugging',
        title: 'Deep Debugging Reversal (+3 Tiles Mitigated)',
        description: 'Wrap the boolean expression correctly to land at Tile 14!',
        challengeType: 'debugging',
        recoveryDelta: 3,
        penaltyDelta: -5,
        challengeId: 'c-19-snake'
      }
    ]
  },
  {
    id: 'snake-50-42',
    from: 50,
    to: 42,
    name: 'Off-by-One Boundary Snake',
    misconceptionType: 'off_by_one',
    explanation: 'Loop condition i <= arr.length accesses arr[arr.length], which is undefined / out-of-bounds in 0-indexed arrays.',
    codeSnippet: `for (let i = 0; i <= arr.length; i++) {
  if (arr[i] > arr[i + 1]) return false; // Crashes at end!
}`,
    choices: [
      {
        id: 'accept',
        title: 'Accept Descent (-8 Tiles)',
        description: 'Slide from Tile 50 to Tile 42.',
        challengeType: 'none',
        recoveryDelta: 0,
        penaltyDelta: -8
      },
      {
        id: 'concept',
        title: 'Concept Recovery (+1 Tile Mitigated)',
        description: 'Explain 0-based boundary termination to land at Tile 43.',
        challengeType: 'concept',
        recoveryDelta: 1,
        penaltyDelta: -7,
        challengeId: 'c-50-snake-concept'
      },
      {
        id: 'debugging',
        title: 'Deep Debugging Reversal (+3 Tiles Mitigated)',
        description: 'Correct the termination invariant to land at Tile 45!',
        challengeType: 'debugging',
        recoveryDelta: 3,
        penaltyDelta: -5,
        challengeId: 'c-50-snake'
      }
    ]
  },
  {
    id: 'snake-63-57',
    from: 63,
    to: 57,
    name: 'Severed Pointer Chain Snake',
    misconceptionType: 'null_pointer',
    explanation: 'Overwriting curr.next before saving the nextNode reference severs all subsequent nodes, orphaning them from memory.',
    codeSnippet: `while (curr !== null) {
  curr.next = prev; // Severed reference to remaining nodes!
  prev = curr;
  curr = curr.next;
}`,
    choices: [
      {
        id: 'accept',
        title: 'Accept Descent (-6 Tiles)',
        description: 'Slide from Tile 63 to Tile 57.',
        challengeType: 'none',
        recoveryDelta: 0,
        penaltyDelta: -6
      },
      {
        id: 'concept',
        title: 'Concept Recovery (+1 Tile Mitigated)',
        description: 'Recall temporary pointer assignments to land at Tile 58.',
        challengeType: 'concept',
        recoveryDelta: 1,
        penaltyDelta: -5,
        challengeId: 'c-63-snake-concept'
      },
      {
        id: 'debugging',
        title: 'Deep Debugging Reversal (+3 Tiles Mitigated)',
        description: 'Restore 3-pointer link reversal order to land at Tile 60!',
        challengeType: 'debugging',
        recoveryDelta: 3,
        penaltyDelta: -3,
        challengeId: 'c-63-snake'
      }
    ]
  },
  {
    id: 'snake-96-85',
    from: 96,
    to: 85,
    name: 'Stack Overflow / Unbalanced Tree Snake',
    misconceptionType: 'overflow',
    explanation: 'Sequential BST insertion degenerates into a linear linked list of depth N = 100,000, exhausting recursion stack memory.',
    codeSnippet: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    choices: [
      {
        id: 'accept',
        title: 'Accept Descent (-11 Tiles)',
        description: 'Slide from Tile 96 to Tile 85.',
        challengeType: 'none',
        recoveryDelta: 0,
        penaltyDelta: -11
      },
      {
        id: 'concept',
        title: 'Concept Recovery (+1 Tile Mitigated)',
        description: 'Explain tree balance factors to land at Tile 86.',
        challengeType: 'concept',
        recoveryDelta: 1,
        penaltyDelta: -10,
        challengeId: 'c-96-snake-concept'
      },
      {
        id: 'debugging',
        title: 'Deep Debugging Reversal (+3 Tiles Mitigated)',
        description: 'Apply iterative traversal / rotation proof to land at Tile 88!',
        challengeType: 'debugging',
        recoveryDelta: 3,
        penaltyDelta: -8,
        challengeId: 'c-96-snake'
      }
    ]
  }
];

export const INTELLIGENT_SNAKE_MAP = new Map<number, IntelligentSnake>();
INTELLIGENT_SNAKES.forEach(s => INTELLIGENT_SNAKE_MAP.set(s.from, s));
