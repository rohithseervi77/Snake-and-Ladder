import { Challenge } from '../../types/challenge';

export const STAGE_61_70_CHALLENGES: Challenge[] = [
  {
    id: 'q-61-array-vs-linked-list',
    squareId: 61,
    co: 'CO2',
    title: 'Array Lists vs Linked Lists Memory Model',
    topic: 'Array implementation of Lists',
    subtopic: 'Contiguous vs Dynamic Pointer Memory',
    skillCategory: 'compare_approaches',
    difficulty: 'easy',
    type: 'compare_approaches',
    prompt: 'What is the primary memory difference between an Array-based list and a Linked List in C/C++?',
    options: [
      'Arrays require contiguous memory blocks and have fixed size; Linked list nodes are allocated dynamically anywhere in heap memory and linked via pointers',
      'Arrays store elements in heap memory; linked lists store elements only in CPU registers',
      'Linked lists use less memory per element than arrays because pointers take 0 bytes',
      'Arrays can only store character data, while linked lists store integers'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think about where malloc / new allocates memory.',
      'Contiguous array blocks allow index arithmetic; linked lists can be fragmented.'
    ],
    explanation: 'Arrays require a single contiguous block of physical RAM, providing O(1) random access by index. Linked lists allocate individual nodes dynamically on the heap; nodes can be anywhere in memory and are connected by pointer addresses.',
    tags: ['linked_list', 'arrays', 'memory_allocation']
  },
  {
    id: 'q-62-sll-traversal',
    squareId: 62,
    co: 'CO2',
    title: 'Singly Linked List Traversal Loop',
    topic: 'Linked List and its Types',
    subtopic: 'Node Structure & Traversal Termination',
    skillCategory: 'code_trace',
    difficulty: 'easy',
    type: 'code_trace',
    prompt: 'Which C code snippet correctly traverses a Singly Linked List from `head` to the end and counts the number of nodes?',
    options: [
      'int count = 0; struct Node* curr = head; while (curr != NULL) { count++; curr = curr->next; }',
      'int count = 0; while (head->next != NULL) { count++; }',
      'for (int i = 0; i < sizeof(head); i++) { count++; }',
      'while (curr != head) { curr++; }'
    ],
    correctOptionIndex: 0,
    hints: [
      'Use a temporary pointer `curr` to avoid losing the original `head`.',
      'The last node in a singly linked list has its next pointer set to NULL.'
    ],
    explanation: 'To traverse without losing the head pointer, initialize `struct Node* curr = head;`. The loop `while (curr != NULL)` visits every node and advances via `curr = curr->next;` until NULL is encountered.',
    tags: ['singly_linked_list', 'traversal', 'pointers']
  },
  {
    id: 'q-63-sll-insertion',
    squareId: 63,
    co: 'CO2',
    title: 'Singly Linked List: Insert at Beginning',
    topic: 'Singly Linked List Operations',
    subtopic: 'Insert at Beginning, End, and After Node',
    skillCategory: 'implementation',
    difficulty: 'medium',
    type: 'complete_code',
    prompt: 'To insert a newly allocated `newNode` at the beginning of a Singly Linked List with pointer `head`, what is the correct two-line pointer sequence?',
    options: [
      'newNode->next = head; head = newNode;',
      'head = newNode; newNode->next = head;',
      'head->next = newNode; newNode = head;',
      'newNode = head->next; head = newNode;'
    ],
    correctOptionIndex: 0,
    hints: [
      'If you overwrite `head` first, you lose the reference to the existing list!',
      'Connect the new node to the old head first, then update head.'
    ],
    explanation: 'First, link `newNode->next = head;` so the new node points to the current first node. Then, update `head = newNode;` so the list begins with the new node. Swapping these lines causes an infinite loop / lost list.',
    tags: ['sll_insert', 'head_insert', 'pointer_order']
  },
  {
    id: 'q-64-sll-deletion-reverse',
    squareId: 64,
    co: 'CO2',
    title: 'In-Place Reversal of Singly Linked List',
    topic: 'Singly Linked List Operations',
    subtopic: 'Delete Head, Delete Key, Reverse Pointers',
    skillCategory: 'implementation',
    difficulty: 'hard',
    type: 'complete_code',
    prompt: 'To reverse a Singly Linked List in-place in O(n) time and O(1) space, we maintain three pointers: `prev`, `curr`, and `nextNode`. Inside the loop `while (curr != NULL)`, what is the correct 4-line pointer rotation?',
    options: [
      'nextNode = curr->next; curr->next = prev; prev = curr; curr = nextNode;',
      'curr->next = prev; prev = curr; curr = curr->next; nextNode = prev;',
      'prev = curr; curr = curr->next; curr->next = prev;',
      'nextNode = prev; prev = curr->next; curr = nextNode;'
    ],
    correctOptionIndex: 0,
    hints: [
      '1. Save the next node before reversing: nextNode = curr->next.',
      '2. Reverse current pointer: curr->next = prev.',
      '3. Step prev forward: prev = curr.',
      '4. Step curr forward: curr = nextNode.'
    ],
    explanation: 'To reverse in-place: 1) Save future: `nextNode = curr->next;` 2) Reverse link: `curr->next = prev;` 3) Advance prev: `prev = curr;` 4) Advance curr: `curr = nextNode;`. Finally, `head = prev;`.',
    tags: ['reverse_list', 'three_pointers', 'in_place']
  },
  {
    id: 'q-65-dll-structure',
    squareId: 65,
    co: 'CO2',
    title: 'Doubly Linked List Node Structure',
    topic: 'Doubly Linked List Implementation',
    subtopic: 'Bidirectional Pointers: prev and next',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'What structural feature allows a Doubly Linked List (DLL) to be traversed both forward and backward?',
    options: [
      'Each node contains two pointers: `prev` pointing to the predecessor, and `next` pointing to the successor',
      'The last node always loops back to the head node',
      'The elements are stored in a contiguous 2D matrix',
      'The list uses an integer index table'
    ],
    correctOptionIndex: 0,
    hints: [
      'Look at the prefix "Doubly".',
      'Each node links both to the left (prev) and to the right (next).'
    ],
    explanation: 'A Doubly Linked List node has three fields: `data`, a pointer `prev` to the prior node, and a pointer `next` to the following node. This permits bidirectional traversal and O(1) predecessor deletion.',
    tags: ['doubly_linked_list', 'node_structure', 'bidirectional']
  },
  {
    id: 'q-66-dll-operations',
    squareId: 66,
    co: 'CO2',
    title: 'Doubly Linked List: Deleting a Given Node',
    topic: 'Doubly Linked List Implementation',
    subtopic: 'Updating 4 Pointers during Insertion/Deletion',
    skillCategory: 'implementation',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'Given a pointer `del` pointing directly to an interior node in a Doubly Linked List, how is `del` deleted in O(1) time without traversing from head?',
    options: [
      'del->prev->next = del->next; del->next->prev = del->prev; free(del);',
      'del->next = NULL; del->prev = NULL;',
      'head = del->next; free(del);',
      'del->data = 0;'
    ],
    correctOptionIndex: 0,
    hints: [
      'Bypass `del` from the left: update the next pointer of the node before del.',
      'Bypass `del` from the right: update the prev pointer of the node after del.',
      'Release memory with free().'
    ],
    explanation: 'Because a DLL node has a `prev` pointer, we can access the preceding node directly: `del->prev->next = del->next;` bypasses del from the left, and `del->next->prev = del->prev;` bypasses del from the right. This achieves O(1) deletion without any traversal.',
    tags: ['dll_deletion', 'constant_time', 'pointer_update']
  },
  {
    id: 'q-67-cll-operations',
    squareId: 67,
    co: 'CO2',
    title: 'Circular Linked List Termination Condition',
    topic: 'Circular Linked List',
    subtopic: 'Head Cycle & Traversal Termination',
    skillCategory: 'code_trace',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In a non-empty Singly Circular Linked List, how do you detect that a full traversal of the list has completed?',
    options: [
      'When the traversal pointer `curr->next == head` (it has reached the node that loops back to the beginning)',
      'When `curr == NULL`',
      'When `curr->next == NULL`',
      'When `curr->data == -1`'
    ],
    correctOptionIndex: 0,
    hints: [
      'In a circular linked list, NO pointer is ever equal to NULL.',
      'The last node points back to `head`.'
    ],
    explanation: 'A circular linked list contains no NULL pointers; the last node links back to the head. Traversal begins at head and completes when `curr->next == head` (or using a `do { curr = curr->next; } while (curr != head);` loop).',
    tags: ['circular_linked_list', 'traversal', 'no_null']
  },
  {
    id: 'q-68-ll-stack-queue',
    squareId: 68,
    co: 'CO2',
    title: 'Linked List Implementation of Stack & Queue',
    topic: 'Linked List Implementation of Stack and Queue',
    subtopic: 'Dynamic Stack & Queue without Size Limits',
    skillCategory: 'implementation',
    difficulty: 'medium',
    type: 'select_data_structure',
    prompt: 'To implement a dynamic Queue using a Singly Linked List with `head` and `tail` pointers in O(1) time per operation, where should `enqueue` and `dequeue` take place?',
    options: [
      'enqueue at `tail` (insert at end) and dequeue at `head` (delete from beginning)',
      'enqueue at `head` and dequeue at `tail`',
      'both enqueue and dequeue at `tail`',
      'both enqueue and dequeue at `head`'
    ],
    correctOptionIndex: 0,
    hints: [
      'In a singly linked list, deleting the tail requires O(n) traversal to find the node before tail.',
      'Deleting the head (`head = head->next`) is O(1).',
      'Inserting at tail (`tail->next = node; tail = node;`) is O(1).'
    ],
    explanation: 'Deleting from the beginning (`head = head->next`) takes O(1) time. Inserting at the end with a tail pointer (`tail->next = newNode; tail = newNode;`) also takes O(1) time. Thus, enqueue at tail and dequeue at head gives O(1) for both operations.',
    tags: ['linked_queue', 'efficiency', 'o1_operations']
  },
  {
    id: 'q-69-polynomial-addition',
    squareId: 69,
    co: 'CO2',
    title: 'Polynomial Addition using Linked Lists',
    topic: 'Linked List Application — Polynomial Addition',
    subtopic: 'Adding Polynomials using Sorted Exponents',
    skillCategory: 'dry_run',
    difficulty: 'hard',
    type: 'output_prediction',
    prompt: 'You are adding two polynomials represented as linked lists sorted by descending exponent:\nP1: 4x^3 + 3x^2 + 5\nP2: 2x^3 + 6x + 2\n\nWhat is the resulting polynomial linked list?',
    options: [
      '6x^3 + 3x^2 + 6x + 7',
      '8x^3 + 9x^2 + 7',
      '6x^6 + 18x^2 + 10',
      '6x^3 + 9x^3 + 7'
    ],
    correctOptionIndex: 0,
    hints: [
      'Terms with exponent 3: 4x^3 + 2x^3 = 6x^3.',
      'Terms with exponent 2: 3x^2 (only in P1).',
      'Terms with exponent 1: 6x (only in P2).',
      'Constants (exponent 0): 5 + 2 = 7.'
    ],
    explanation: 'When exponents match (3), add coefficients: 4 + 2 = 6 -> 6x^3. When exponents differ, copy the term with the larger exponent: 3x^2 from P1, then 6x from P2. Finally, add constants 5 + 2 = 7. Result: 6x^3 + 3x^2 + 6x + 7.',
    tags: ['polynomial_addition', 'linked_list_application', 'exam_problem']
  },
  {
    id: 'q-70-checkpoint-linked-lists',
    squareId: 70,
    co: 'CO2',
    title: 'Checkpoint 7: Linked List Lab Exam Problem',
    topic: 'Linked List Application — Polynomial Addition',
    subtopic: 'Unit 7 Milestone Evaluation',
    skillCategory: 'debugging',
    difficulty: 'hard',
    type: 'find_bug',
    prompt: 'A student writes this code to delete a node with value `target` from a Singly Linked List:\n\nstruct Node* curr = head;\nwhile (curr->next != NULL && curr->next->data != target)\n    curr = curr->next;\ncurr->next = curr->next->next;\n\nWhat critical edge case does this code FAIL to handle?',
    options: [
      'It crashes with a Null Pointer Exception if the node to be deleted is the very first node (`head->data == target`)',
      'It cannot delete nodes with negative values',
      'It only works for lists with more than 100 nodes',
      'It fails if target is an even number'
    ],
    correctOptionIndex: 0,
    hints: [
      'Look at the condition: `curr->next->data != target`.',
      'What if the head itself contains `target`? The code never checks `head->data`.'
    ],
    explanation: 'If `head->data == target`, the head itself must be deleted (`head = head->next;`). The student\'s code only inspects `curr->next`, completely missing the first node and potentially dereferencing NULL if the list has only 1 element.',
    tags: ['checkpoint', 'linked_list_debugging', 'edge_case']
  },
  {
    id: 'q-extra-61',
    squareId: 61,
    co: 'CO2',
    title: 'Time Complexity of Linked List Deletion at Head',
    topic: 'Singly Linked List Operations',
    subtopic: 'Operation Complexity',
    skillCategory: 'complexity',
    difficulty: 'easy',
    type: 'time_complexity',
    prompt: 'What is the time complexity of deleting the first node (head) of a Singly Linked List?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    correctOptionIndex: 0,
    hints: [
      'Deleting head requires only: `head = head->next;`.',
      'No traversal is needed.'
    ],
    explanation: 'Deleting at the head requires simply pointing head to the second node: `head = head->next;`. This is a single pointer update, executing in O(1) constant time.',
    tags: ['sll', 'complexity', 'head_deletion']
  },
  {
    id: 'q-extra-65',
    squareId: 65,
    co: 'CO2',
    title: 'Detecting Memory Leaks in Linked Lists',
    topic: 'Doubly Linked List Implementation',
    subtopic: 'Dynamic Memory Deallocation',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In C, what function must be called on a deleted linked list node to prevent a memory leak in heap RAM?',
    options: ['free(node)', 'delete node', 'clear(node)', 'drop(node)'],
    correctOptionIndex: 0,
    hints: [
      'In C, memory allocated with malloc() must be released with its counterpart.',
      'The counterpart is free().'
    ],
    explanation: 'In C, dynamically allocated heap memory from `malloc()` remains allocated until explicitly released using `free(ptr)`. Neglecting to call `free()` leads to heap memory leaks.',
    tags: ['c_programming', 'free', 'memory_leak']
  }
];
