import { Challenge } from '../../types/challenge';

export const STAGE_51_60_CHALLENGES: Challenge[] = [
  {
    id: 'q-51-queue-adt',
    squareId: 51,
    co: 'CO2',
    title: 'Linear Queue FIFO Principle',
    topic: 'Array implementation of Queue',
    subtopic: 'FIFO Principle with FRONT and REAR',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In a standard array-based Linear Queue, which pointers are used to track insertions and deletions, and where do they occur?',
    options: [
      'Insertions occur at REAR; deletions occur at FRONT',
      'Insertions occur at FRONT; deletions occur at REAR',
      'Both insertions and deletions occur exclusively at TOP',
      'Insertions occur at index 0; deletions occur at index MAX-1'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think of a cafeteria or movie ticket queue.',
      'New people join the rear of the line and leave from the front.'
    ],
    explanation: 'A Queue follows the FIFO (First-In, First-Out) discipline: new elements are enqueued at the REAR pointer, while elements are dequeued from the FRONT pointer.',
    tags: ['queue', 'fifo', 'front_rear']
  },
  {
    id: 'q-52-enqueue-dequeue',
    squareId: 52,
    co: 'CO2',
    title: 'Dry-Run Linear Queue Operations',
    topic: 'Array implementation of Queue',
    subtopic: 'Linear Queue State Updates',
    skillCategory: 'dry_run',
    difficulty: 'easy',
    type: 'dry_run_trace',
    prompt: 'Given an empty linear queue of capacity 5:\n\nenqueue(10)\nenqueue(20)\ndequeue()\nenqueue(30)\nenqueue(40)\ndequeue()\n\nWhich elements remain in the queue, and what element is at FRONT?',
    options: [
      'Elements: [30, 40] with 30 at FRONT',
      'Elements: [10, 20] with 10 at FRONT',
      'Elements: [20, 30] with 20 at FRONT',
      'Elements: [40] with 40 at FRONT'
    ],
    correctOptionIndex: 0,
    hints: [
      'Enqueue adds to the back: 10, then 20 -> [10, 20].',
      'First dequeue removes the first element (10), leaving [20].',
      'Next enqueues add 30, 40 -> [20, 30, 40].',
      'Second dequeue removes 20, leaving [30, 40].'
    ],
    explanation: 'Initial: []. Enqueue 10, 20 -> [10, 20]. Dequeue removes 10 -> [20]. Enqueue 30, 40 -> [20, 30, 40]. Dequeue removes 20 -> [30, 40]. The FRONT element is 30.',
    tags: ['queue', 'dry_run', 'fifo']
  },
  {
    id: 'q-53-fake-overflow',
    squareId: 53,
    co: 'CO2',
    title: 'The Fake Overflow Problem',
    topic: 'Circular Queue',
    subtopic: 'Memory Wastage Problem in Linear Queues',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'A linear queue of capacity 5 has FRONT = 3 and REAR = 4. When a new enqueue is attempted, what happens and why is this termed "fake overflow"?',
    options: [
      'The queue reports Overflow because REAR == MAX - 1, even though slots 0, 1, and 2 are completely empty and wasted',
      'The queue automatically reallocates memory in O(1) time',
      'The queue overwrites slot 0 automatically without any error',
      'The front pointer is reset to 0 by the hardware'
    ],
    correctOptionIndex: 0,
    hints: [
      'In a linear queue, REAR has reached the last array slot (index 4).',
      'Elements at indices 0, 1, 2 were already dequeued.'
    ],
    explanation: 'In a simple linear queue, REAR == MAX - 1 signals overflow even though earlier dequeues have emptied indices 0, 1, and 2. This memory wastage is called "fake overflow" and motivated the invention of Circular Queues.',
    tags: ['fake_overflow', 'linear_queue', 'memory_wastage']
  },
  {
    id: 'q-54-circular-queue-concept',
    squareId: 54,
    co: 'CO2',
    title: 'Circular Queue Wrap-Around Formula',
    topic: 'Circular Queue',
    subtopic: 'Wrap-Around Indexing: (index + 1) % SIZE',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'output_prediction',
    prompt: 'In a Circular Queue of SIZE = 5, REAR is currently at index 4. If a valid enqueue operation is performed, what will be the new value of REAR?',
    options: [
      'REAR = 0, because (4 + 1) % 5 = 0',
      'REAR = 5',
      'REAR = -1',
      'REAR remains at 4'
    ],
    correctOptionIndex: 0,
    hints: [
      'Apply the modulo formula: REAR = (REAR + 1) % SIZE.',
      '(4 + 1) % 5 = 5 % 5 = ?'
    ],
    explanation: 'In a Circular Queue, pointers wrap around to the beginning using modulo arithmetic: REAR = (REAR + 1) % SIZE. When REAR is at 4, (4 + 1) % 5 = 0, wrapping around to reuse slot 0.',
    tags: ['circular_queue', 'wrap_around', 'modulo']
  },
  {
    id: 'q-55-circular-queue-conditions',
    squareId: 55,
    co: 'CO2',
    title: 'Circular Queue Full Condition',
    topic: 'Circular Queue',
    subtopic: 'Boundary Equations in Circular Arrays',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'Which mathematical condition correctly detects that a Circular Queue of size N is completely FULL?',
    options: [
      '(REAR + 1) % N == FRONT',
      'REAR == N - 1',
      'FRONT == REAR',
      'FRONT == (REAR + 1)'
    ],
    correctOptionIndex: 0,
    hints: [
      'The queue is full when advancing REAR by one position hits the FRONT pointer.',
      'Remember to wrap around with % N.'
    ],
    explanation: 'A Circular Queue is full when advancing the REAR index wraps around to land on the FRONT index: `(REAR + 1) % N == FRONT`. If `FRONT == REAR`, exactly one element is in the queue.',
    tags: ['circular_queue', 'full_condition', 'boundary']
  },
  {
    id: 'q-56-deque-operations',
    squareId: 56,
    co: 'CO2',
    title: 'Double-Ended Queue (Deque) Characteristics',
    topic: 'Types of Queues',
    subtopic: 'Input-Restricted & Output-Restricted Deques',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'What distinguishes an Input-Restricted Deque from an Output-Restricted Deque?',
    options: [
      'Input-restricted allows insertions at only one end, but deletions from both ends; Output-restricted allows deletions at only one end, but insertions at both ends',
      'Input-restricted only accepts positive integers',
      'Output-restricted operates only in LIFO stack mode',
      'There is no difference between the two'
    ],
    correctOptionIndex: 0,
    hints: [
      'Focus on the name: "Input-Restricted" restricts the input (insertion) side.',
      '"Output-Restricted" restricts the output (deletion) side.'
    ],
    explanation: 'An Input-Restricted Deque permits insertions at only one end (e.g. rear) but deletions at both ends. An Output-Restricted Deque permits deletions from only one end (e.g. front) but insertions at both ends.',
    tags: ['deque', 'types_of_queues', 'double_ended']
  },
  {
    id: 'q-57-priority-queue-intro',
    squareId: 57,
    co: 'CO2',
    title: 'Priority Queue Dequeue Invariant',
    topic: 'Types of Queues',
    subtopic: 'Priority Ordering & Key Scheduling',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'How does an element extraction in a Priority Queue differ from a standard FIFO Queue?',
    options: [
      'The element with the highest priority key is dequeued first, regardless of when it arrived',
      'Elements are dequeued in random order using a pseudo-random generator',
      'The last element inserted is always dequeued first (LIFO)',
      'Only the smallest integer value can be enqueued'
    ],
    correctOptionIndex: 0,
    hints: [
      'Think of an emergency triage room at a hospital.',
      'Patients with highest urgency are treated first, not first-come-first-served.'
    ],
    explanation: 'In a Priority Queue, each item has an associated priority key. The dequeue operation extracts the element with the highest priority (or lowest in a Min-Priority Queue), rather than strictly adhering to arrival order.',
    tags: ['priority_queue', 'types_of_queues']
  },
  {
    id: 'q-58-queue-applications',
    squareId: 58,
    co: 'CO2',
    title: 'Operating System Queue Applications',
    topic: 'Applications of Queues',
    subtopic: 'Round-Robin & OS Buffer Management',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'select_data_structure',
    prompt: 'Which data structure is primarily utilized by the operating system kernel to maintain ready processes in Round-Robin CPU scheduling?',
    options: [
      'Circular Queue (FIFO with cyclic time slices)',
      'Binary Search Tree',
      'Stack (LIFO)',
      'AVL Tree'
    ],
    correctOptionIndex: 0,
    hints: [
      'Processes must take turns in fair cyclic order.',
      'When a process exhausts its time quantum, it is placed at the back of the queue.'
    ],
    explanation: 'Round-Robin CPU scheduling requires fair cyclic time-slicing among active processes. A Circular FIFO Queue allows expired processes to be placed at REAR while the next process is dispatched from FRONT in O(1) time.',
    tags: ['applications_of_queues', 'round_robin', 'os_scheduling']
  },
  {
    id: 'q-59-queue-bfs-concept',
    squareId: 59,
    co: 'CO2',
    title: 'Why BFS Requires a Queue',
    topic: 'Applications of Queues',
    subtopic: 'Level-Order State Expansion',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'Why does Breadth-First Search (BFS) fundamentally require a Queue rather than a Stack?',
    options: [
      'A Queue enforces FIFO order, ensuring all vertices at distance d are visited and processed before any vertices at distance d + 1',
      'A Queue uses less memory than a Stack on all machines',
      'A Stack cannot store graph vertex numbers',
      'Graphs can only be linked to Queue data types in C++'
    ],
    correctOptionIndex: 0,
    hints: [
      'BFS explores level by level (concentric circles outward).',
      'FIFO guarantees earliest discovered nodes are explored first.'
    ],
    explanation: 'BFS discovers vertices level by level. Because vertices discovered first must be expanded first, the FIFO property of a Queue guarantees that all nodes at distance d are explored before advancing to distance d+1.',
    tags: ['bfs', 'queue_application', 'graph_search']
  },
  {
    id: 'q-60-checkpoint-queues',
    squareId: 60,
    co: 'CO2',
    title: 'Checkpoint 6: Circular Queue Lab Tracing',
    topic: 'Circular Queue',
    subtopic: 'Unit 6 Milestone Evaluation',
    skillCategory: 'dry_run',
    difficulty: 'hard',
    type: 'dry_run_trace',
    prompt: 'A circular queue has SIZE = 5. Initially FRONT = -1, REAR = -1.\n1. Enqueue 10, 20, 30, 40\n2. Dequeue two times\n3. Enqueue 50, 60, 70\nWhat are the final values of FRONT and REAR?',
    options: [
      'FRONT = 2, REAR = 1 (elements wrap around to indices 4, 0, 1)',
      'FRONT = 0, REAR = 4',
      'FRONT = 2, REAR = 4',
      'FRONT = 1, REAR = 2'
    ],
    correctOptionIndex: 0,
    hints: [
      'Step 1: Enqueue 10(0), 20(1), 30(2), 40(3) -> FRONT=0, REAR=3.',
      'Step 2: Dequeue twice removes 10, 20 -> FRONT advances to 2.',
      'Step 3: Enqueue 50 at index 4 (REAR=4).',
      'Enqueue 60 wraps around: (4+1)%5 = index 0 (REAR=0).',
      'Enqueue 70: (0+1)%5 = index 1 (REAR=1).'
    ],
    explanation: 'Initial: F=-1, R=-1. Enqueue 4 items -> F=0, R=3. Dequeue twice -> F=2, R=3. Enqueue 50 -> R=4. Enqueue 60 -> R=(4+1)%5=0. Enqueue 70 -> R=(0+1)%5=1. Result: FRONT = 2, REAR = 1.',
    tags: ['checkpoint', 'circular_queue_trace', 'exam_problem']
  },
  {
    id: 'q-extra-51',
    squareId: 51,
    co: 'CO2',
    title: 'Queue Underflow Condition',
    topic: 'Array implementation of Queue',
    subtopic: 'Queue Boundary Conditions',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'When does Queue Underflow occur during queue manipulation?',
    options: [
      'When attempting to dequeue an element from an empty queue',
      'When enqueueing into a full queue',
      'When REAR wraps around past 0',
      'When FRONT equals REAR'
    ],
    correctOptionIndex: 0,
    hints: [
      'Underflow refers to removing from an empty collection.',
      'Overflow refers to adding to a full collection.'
    ],
    explanation: 'Queue Underflow occurs when a dequeue operation is invoked on an empty queue (when FRONT == -1 or FRONT > REAR).',
    tags: ['queue', 'underflow', 'boundary']
  },
  {
    id: 'q-extra-54',
    squareId: 54,
    co: 'CO2',
    title: 'Advancing Front Pointer in Circular Queue',
    topic: 'Circular Queue',
    subtopic: 'Circular Dequeue Formula',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'output_prediction',
    prompt: 'In a Circular Queue of SIZE = 6, FRONT is at index 5. If one element is dequeued (and other elements remain), what is the new FRONT index?',
    options: [
      'FRONT = 0, because (5 + 1) % 6 = 0',
      'FRONT = 6',
      'FRONT = -1',
      'FRONT remains at 5'
    ],
    correctOptionIndex: 0,
    hints: [
      'FRONT advances using the exact same modulo wrap-around: (FRONT + 1) % SIZE.',
      '(5 + 1) % 6 = 6 % 6 = 0.'
    ],
    explanation: 'In a Circular Queue, FRONT wraps around to index 0 using `FRONT = (FRONT + 1) % SIZE`. For SIZE = 6 and FRONT = 5, (5 + 1) % 6 = 0.',
    tags: ['circular_queue', 'front_pointer', 'modulo']
  }
];
