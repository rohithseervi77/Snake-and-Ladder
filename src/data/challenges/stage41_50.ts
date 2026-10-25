import { Challenge } from '../../types/challenge';

export const STAGE_41_50_CHALLENGES: Challenge[] = [
  {
    id: 'q-41-stack-adt',
    squareId: 41,
    co: 'CO2',
    title: 'Stack Array Implementation Basics',
    topic: 'Array implementation of Stack',
    subtopic: 'LIFO Principle & Top Index Pointer',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In a 0-indexed array implementation of a Stack of capacity MAX, what is the initial value of the `top` pointer when the stack is empty?',
    options: ['-1', '0', '1', 'MAX - 1'],
    correctOptionIndex: 0,
    hints: [
      'Index 0 would mean an element is already present at array[0].',
      'An empty stack must point before the first valid array index.'
    ],
    explanation: 'When the array stack is empty, `top` is initialized to -1. When the first item is pushed, `top` is incremented to 0, placing the item at array[0].',
    tags: ['stack', 'top_pointer', 'array_stack']
  },
  {
    id: 'q-42-stack-overflow-underflow',
    squareId: 42,
    co: 'CO2',
    title: 'Stack Overflow and Underflow Conditions',
    topic: 'Array implementation of Stack',
    subtopic: 'Boundary Conditions & Guard Checks',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'For an array stack of capacity 5, which conditions correctly signal Stack Overflow and Stack Underflow?',
    options: [
      'Overflow: top == 4 (MAX - 1); Underflow: top == -1',
      'Overflow: top == 5; Underflow: top == 0',
      'Overflow: top == -1; Underflow: top == 5',
      'Overflow: top == 0; Underflow: top == -1'
    ],
    correctOptionIndex: 0,
    hints: [
      'For capacity 5, valid 0-based indices are 0, 1, 2, 3, 4.',
      'If top reaches 4, all 5 slots are occupied.'
    ],
    explanation: 'With 0-based indexing and MAX = 5, the last valid slot is index 4 (MAX - 1). If top == 4, pushing will cause Stack Overflow. If top == -1, popping causes Stack Underflow.',
    tags: ['stack', 'overflow', 'underflow']
  },
  {
    id: 'q-43-stack-operations',
    squareId: 43,
    co: 'CO2',
    title: 'Dry-Run Stack Operations',
    topic: 'Array implementation of Stack',
    subtopic: 'Trace Stack State Transitions',
    skillCategory: 'dry_run',
    difficulty: 'easy',
    type: 'dry_run_trace',
    prompt: 'An initially empty stack undergoes the following operations:\n\npush(10)\npush(20)\npush(30)\npop()\npush(40)\n\nWhat is the value returned by peek() (or top)?',
    options: ['40', '20', '30', '10'],
    correctOptionIndex: 0,
    hints: [
      'Track the stack from bottom to top: [10], then [10, 20], then [10, 20, 30].',
      'pop() removes 30.',
      'push(40) adds 40.'
    ],
    explanation: 'Operations: 1) push 10 -> [10]; 2) push 20 -> [10, 20]; 3) push 30 -> [10, 20, 30]; 4) pop removes 30 -> [10, 20]; 5) push 40 -> [10, 20, 40]. The top element is 40.',
    tags: ['stack', 'dry_run', 'peek']
  },
  {
    id: 'q-44-balanced-parentheses',
    squareId: 44,
    co: 'CO2',
    title: 'Balanced Parentheses Checking',
    topic: 'Balanced Parentheses',
    subtopic: 'Matching (), {}, [] with Stack',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'dry_run_trace',
    prompt: 'Which of the following bracket sequences is BALANCED according to the stack algorithm?',
    options: [
      '{ [ ( ) ] ( ) }',
      '{ [ ( ] ) }',
      '( ( [ ] )',
      '{ [ } ]'
    ],
    correctOptionIndex: 0,
    hints: [
      'Every closing bracket must match the most recently pushed opening bracket on the stack.',
      'In { [ ( ] ) }, the ] attempts to close while ( is still on top of the stack (mismatch).'
    ],
    explanation: 'In "{ [ ( ) ] ( ) }", every opening bracket is matched by its corresponding closing bracket in strict LIFO order, and the stack is empty at the end. In { [ ( ] ) }, `]` encounters `(` on top, which is invalid.',
    tags: ['balanced_parentheses', 'stack_application']
  },
  {
    id: 'q-45-expression-types',
    squareId: 45,
    co: 'CO2',
    title: 'Infix, Prefix and Postfix Identifications',
    topic: 'Infix to Postfix and Prefix',
    subtopic: 'Operator Placements & Polish Notations',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Which expression is in valid Postfix (Reverse Polish) notation for the arithmetic operation (A + B) * C?',
    options: [
      'A B + C *',
      '* + A B C',
      'A + B * C',
      'A B C + *'
    ],
    correctOptionIndex: 0,
    hints: [
      'In postfix, the operator immediately follows its two operands.',
      'First (A + B) becomes A B +.',
      'Then multiplying by C places * at the very end.'
    ],
    explanation: '(A + B) converts to postfix as "A B +". Then multiplying by C: (A B +) * C becomes "A B + C *". Prefix would be "* + A B C".',
    tags: ['postfix', 'infix', 'rpn']
  },
  {
    id: 'q-46-infix-to-postfix',
    squareId: 46,
    co: 'CO2',
    title: 'Infix to Postfix Operator Precedence',
    topic: 'Infix to Postfix and Prefix',
    subtopic: 'Shunting-Yard Stack Algorithm',
    skillCategory: 'numerical',
    difficulty: 'hard',
    type: 'output_prediction',
    prompt: 'Convert the following infix expression to postfix using a stack:\n\nA + B * C - D\n\nWhat is the resulting postfix expression?',
    options: [
      'A B C * + D -',
      'A B + C * D -',
      'A B C * D - +',
      '+ A * B C - D'
    ],
    correctOptionIndex: 0,
    hints: [
      '* has higher precedence than +.',
      'B * C must be evaluated before adding A.',
      '+ and - have equal precedence and associate left to right.'
    ],
    explanation: '* has higher precedence than +: B and C are combined first as "B C *". Next, the + is resolved with A as "A B C * +". Finally, when - is processed, the remaining operator is popped: "A B C * + D -".',
    tags: ['shunting_yard', 'precedence', 'infix_to_postfix']
  },
  {
    id: 'q-47-infix-to-prefix',
    squareId: 47,
    co: 'CO2',
    title: 'Infix to Prefix Conversion Steps',
    topic: 'Infix to Postfix and Prefix',
    subtopic: 'Reversal Method for Polish Notation',
    skillCategory: 'numerical',
    difficulty: 'hard',
    type: 'output_prediction',
    prompt: 'What is the prefix notation for the infix expression: (A - B / C) * (D * E - F)?',
    options: [
      '* - A / B C - * D E F',
      '- / A B C * - * D E F',
      '* - A B / C - D * E F',
      'A B C / - D E * F - *'
    ],
    correctOptionIndex: 0,
    hints: [
      'In prefix, operators precede their operands.',
      'Outer operator is * between two bracketed sub-expressions.',
      'Left sub-expression: - A / B C. Right sub-expression: - * D E F.'
    ],
    explanation: 'Left expression (A - B/C) in prefix is "- A / B C". Right expression (D*E - F) in prefix is "- * D E F". Combining with outer multiplication * yields: "* - A / B C - * D E F".',
    tags: ['prefix', 'polish_notation']
  },
  {
    id: 'q-48-eval-postfix',
    squareId: 48,
    co: 'CO2',
    title: 'Postfix Expression Numerical Evaluation',
    topic: 'Evaluation of Postfix and Prefix',
    subtopic: 'Single-Pass Numerical Evaluation',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'output_prediction',
    prompt: 'Evaluate the postfix expression using a stack:\n\n6 2 3 + * 4 /\n\nWhat is the final computed numerical result?',
    options: [
      '7',
      '12',
      '15',
      '30'
    ],
    correctOptionIndex: 0,
    hints: [
      'Push 6, 2, 3.',
      '+ pops 3 and 2: compute 2 + 3 = 5, push 5.',
      '* pops 5 and 6: compute 6 * 5 = 30, push 30.',
      'Push 4; / pops 4 and 30: compute 30 / 4 (integer division).'
    ],
    explanation: '1) Push 6, 2, 3. 2) On "+": pop 3, pop 2 -> 2 + 3 = 5, push 5 (stack: [6, 5]). 3) On "*": pop 5, pop 6 -> 6 * 5 = 30, push 30 (stack: [30]). 4) Push 4 (stack: [30, 4]). 5) On "/": pop 4, pop 30 -> 30 / 4 = 7 (integer division). Final result = 7.',
    tags: ['postfix_eval', 'stack_arithmetic']
  },
  {
    id: 'q-49-call-stack-recursion',
    squareId: 49,
    co: 'CO2',
    title: 'Function Call Stack & Memory Frames',
    topic: 'Recursion',
    subtopic: 'Activation Records & Call Stack Unwinding',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'What happens to the operating system call stack during execution of a recursive function that lacks a valid base case?',
    options: [
      'Stack frames accumulate continuously until memory is exhausted, triggering a Stack Overflow error',
      'The compiler automatically restarts the function from the beginning',
      'The call stack converts into a circular buffer',
      'The function returns 0 automatically after 100 iterations'
    ],
    correctOptionIndex: 0,
    hints: [
      'Each function call allocates an activation record in stack RAM.',
      'Without a base case, calls keep allocating indefinitely.'
    ],
    explanation: 'Every recursive call pushes an activation record (return address, parameters, local variables) onto the call stack. Without a terminating base case, the stack grows until stack memory is exhausted, throwing a Stack Overflow runtime exception.',
    tags: ['recursion', 'stack_overflow', 'call_frames']
  },
  {
    id: 'q-50-checkpoint-stacks',
    squareId: 50,
    co: 'CO2',
    title: 'Checkpoint 5: Stack Expression Evaluation',
    topic: 'Array implementation of Stack',
    subtopic: 'Unit 5 Milestone Evaluation',
    skillCategory: 'dry_run',
    difficulty: 'hard',
    type: 'output_prediction',
    prompt: 'Evaluate the following postfix expression using a stack:\n\n5 3 2 * + 4 2 / -\n\nWhat is the final answer?',
    options: [
      '9',
      '11',
      '7',
      '13'
    ],
    correctOptionIndex: 0,
    hints: [
      'Push 5, 3, 2.',
      '* computes 3 * 2 = 6; + computes 5 + 6 = 11.',
      'Push 4, 2; / computes 4 / 2 = 2.',
      'Final - computes 11 - 2.'
    ],
    explanation: '1) Push 5, 3, 2. 2) "*": 3 * 2 = 6, push 6 (stack: [5, 6]). 3) "+": 5 + 6 = 11, push 11 (stack: [11]). 4) Push 4, 2 (stack: [11, 4, 2]). 5) "/": 4 / 2 = 2, push 2 (stack: [11, 2]). 6) "-": 11 - 2 = 9. Final result = 9.',
    tags: ['checkpoint', 'postfix_evaluation', 'exam_problem']
  },
  {
    id: 'q-extra-41',
    squareId: 41,
    co: 'CO2',
    title: 'Time Complexity of Stack Push',
    topic: 'Array implementation of Stack',
    subtopic: 'Stack Operation Complexity',
    skillCategory: 'complexity',
    difficulty: 'easy',
    type: 'time_complexity',
    prompt: 'What is the time complexity of pushing an element onto an array-based stack of fixed capacity?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(top)'],
    correctOptionIndex: 0,
    hints: [
      'Push increments top and assigns to array[top].',
      'No loops are involved.'
    ],
    explanation: 'Push performs: `arr[++top] = val`. This consists of a single increment and direct array index write, executing in O(1) constant time.',
    tags: ['stack', 'complexity', 'constant_time']
  },
  {
    id: 'q-extra-44',
    squareId: 44,
    co: 'CO2',
    title: 'Stack Choice for Syntax Parsing',
    topic: 'Balanced Parentheses',
    subtopic: 'Identify the Data Structure',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'select_data_structure',
    prompt: 'Which data structure is the standard and most efficient choice for compiler syntax parsers to check balanced parentheses?',
    options: ['Stack', 'Queue', 'Binary Search Tree', 'Hash Table'],
    correctOptionIndex: 0,
    hints: [
      'The most recently opened parenthesis must be closed first (LIFO).',
      'Last In, First Out is the defining property of a Stack.'
    ],
    explanation: 'Parentheses nesting requires that the most recently opened bracket must be the first one closed. This strict LIFO (Last-In, First-Out) matching makes a Stack the optimal and standard data structure.',
    tags: ['data_structure_choice', 'stack', 'parentheses']
  }
];
