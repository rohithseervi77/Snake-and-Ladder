import { Challenge } from '../../types/challenge';

export const STAGE_81_90_CHALLENGES: Challenge[] = [
  {
    id: 'q-81-tree-preliminaries',
    squareId: 81,
    co: 'CO4',
    title: 'Tree Terminology & Edge Count',
    topic: 'Trees Preliminaries',
    subtopic: 'Root, Depth, Height, Leaves, Degree',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'A tree has exactly 25 vertices. How many edges must it contain?',
    options: ['24 edges (n - 1)', '25 edges', '50 edges', '12 edges'],
    correctOptionIndex: 0,
    hints: [
      'In any tree, every vertex except the root has exactly one incoming edge from its parent.',
      'Total edges = number of vertices - 1.'
    ],
    explanation: 'A fundamental theorem of tree graph theory states that any tree with n vertices contains exactly n - 1 edges, with zero cycles.',
    tags: ['trees', 'terminology', 'edge_count']
  },
  {
    id: 'q-82-tree-traversals',
    squareId: 82,
    co: 'CO4',
    title: 'Inorder Traversal of Binary Tree',
    topic: 'Trees Preliminaries',
    subtopic: 'Inorder, Preorder, Postorder Traversals',
    skillCategory: 'dry_run',
    difficulty: 'easy',
    type: 'output_prediction',
    prompt: 'Given a binary tree with root 1, left child 2 (with children 4, 5), and right child 3 (with child 6):\n        1\n       / \\\n      2   3\n     / \\   \\\n    4   5   6\n\nWhat is the INORDER traversal (Left, Root, Right)?',
    options: [
      '4, 2, 5, 1, 3, 6',
      '1, 2, 4, 5, 3, 6',
      '4, 5, 2, 6, 3, 1',
      '1, 2, 3, 4, 5, 6'
    ],
    correctOptionIndex: 0,
    hints: [
      'Inorder visits: Left Subtree, then Root, then Right Subtree.',
      'For root 1: Left is (4, 2, 5), Root is 1, Right is (3, 6).'
    ],
    explanation: 'Inorder order: Left-Root-Right. Left subtree of 1: inorder of 2 is (4, 2, 5). Then root 1. Right subtree of 1: 3 has no left, so visit 3, then right 6. Result: 4, 2, 5, 1, 3, 6.',
    tags: ['tree_traversal', 'inorder', 'binary_tree']
  },
  {
    id: 'q-83-bst-invariant-search',
    squareId: 83,
    co: 'CO4',
    title: 'BST Invariant & Inorder Sortedness',
    topic: 'Binary Search Tree and its Operations',
    subtopic: 'BST Property & Search Algorithm',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'What special property is ALWAYS true about the Inorder traversal of any Binary Search Tree (BST)?',
    options: [
      'The values are visited in strictly ascending sorted order',
      'The root node is always printed first',
      'All leaf nodes are printed before any parent nodes',
      'The values alternate between even and odd numbers'
    ],
    correctOptionIndex: 0,
    hints: [
      'Left < Root < Right.',
      'Since Inorder visits Left, then Root, then Right, values are always visited from smallest to largest.'
    ],
    explanation: 'Because a BST enforces left < root < right, an Inorder traversal (Left, Root, Right) recursively visits nodes in strictly ascending sorted order in O(n) time.',
    tags: ['bst', 'inorder_sorted', 'invariant']
  },
  {
    id: 'q-84-bst-insertion',
    squareId: 84,
    co: 'CO4',
    title: 'BST Insertion Tree Structure',
    topic: 'Binary Search Tree and its Operations',
    subtopic: 'Iterative & Recursive Node Insertion',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'dry_run_trace',
    prompt: 'Insert the following values sequentially into an initially empty BST:\n50, 30, 70, 20, 40, 60, 80\n\nWhich node becomes the RIGHT child of 30?',
    options: ['40', '20', '50', '60'],
    correctOptionIndex: 0,
    hints: [
      '50 is the root.',
      '30 is smaller than 50 (left of 50).',
      '40 is smaller than 50 (left) but larger than 30 (right of 30).'
    ],
    explanation: '50 is root. 30 goes left of 50. 70 goes right of 50. 20 is < 50 and < 30 (left child of 30). 40 is < 50 and > 30 (right child of 30). Thus, the right child of 30 is 40.',
    tags: ['bst_insertion', 'dry_run', 'tree_shape']
  },
  {
    id: 'q-85-bst-deletion',
    squareId: 85,
    co: 'CO4',
    title: 'BST Deletion of Node with Two Children',
    topic: 'Binary Search Tree and its Operations',
    subtopic: 'Deleting Leaf, Single-Child, and Two-Child Nodes',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'When deleting a node that has BOTH a left child and a right child from a BST, which node can safely replace its value without violating the BST invariant?',
    options: [
      'Its Inorder Successor (smallest node in its right subtree) OR its Inorder Predecessor (largest node in its left subtree)',
      'Any randomly chosen leaf node in the tree',
      'Its immediate parent node',
      'The left child always, regardless of value'
    ],
    correctOptionIndex: 0,
    hints: [
      'The replacement node must be greater than all nodes in the left subtree and smaller than all remaining nodes in the right subtree.',
      'The minimum of the right subtree or maximum of the left subtree satisfies this.'
    ],
    explanation: 'The Inorder Successor is guaranteed to be strictly greater than all nodes in the left subtree and strictly smaller than all other nodes in the right subtree. Replacing the deleted value with it and deleting the successor node preserves the BST invariant.',
    tags: ['bst_deletion', 'two_children', 'inorder_successor']
  },
  {
    id: 'q-86-inorder-successor',
    squareId: 86,
    co: 'CO4',
    title: 'Finding the Inorder Successor in a BST',
    topic: 'Binary Search Tree and its Operations',
    subtopic: 'Finding Next and Previous Keys',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'output_prediction',
    prompt: 'In a BST containing keys: 10, 20, 25, 30, 40, 50, 60, what is the Inorder Successor of node 30 if 30 has a right child 50 (which has left child 40 and right child 60)?',
    options: [
      '40 (the minimum element in the right subtree of 30)',
      '50',
      '60',
      '25'
    ],
    correctOptionIndex: 0,
    hints: [
      'If node X has a right subtree, its inorder successor is the leftmost (minimum) node in that right subtree.',
      'In the right subtree rooted at 50, left child is 40.'
    ],
    explanation: 'When node 30 has a right child (50), its inorder successor is found by going right once (50) and then following left pointers as far as possible (40). Hence, 40 is the minimum node in the right subtree.',
    tags: ['inorder_successor', 'bst_search']
  },
  {
    id: 'q-87-skewed-bst',
    squareId: 87,
    co: 'CO4',
    title: 'Degenerate Skewed BST Worst Case',
    topic: 'Binary Search Tree and its Operations',
    subtopic: 'O(n) Worst-Case Search Deterioration',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'If elements are inserted into an empty BST in sorted ascending order (e.g. 10, 20, 30, 40, 50), what is the resulting tree height and worst-case search complexity?',
    options: [
      'Height: n; Search Time: O(n) (degenerates into a right-skewed linked list)',
      'Height: log2(n); Search Time: O(log n)',
      'Height: 1; Search Time: O(1)',
      'Height: n^2; Search Time: O(n^2)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Each new element is larger than all previous elements.',
      'Every node only gets a right child, forming a single linear strand.'
    ],
    explanation: 'Sorted insertions place every node as the right child of the previous node. The tree degenerates into a right-skewed linked list with height h = n. Binary search advantages are lost, dropping to linear O(n) search time.',
    tags: ['skewed_bst', 'worst_case', 'degeneration']
  },
  {
    id: 'q-88-avl-balance-factor',
    squareId: 88,
    co: 'CO4',
    title: 'AVL Tree Balance Factor Definition',
    topic: 'AVL Trees',
    subtopic: 'Height-Balanced Trees: BF = h_L - h_R',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In an AVL Tree, how is the Balance Factor (BF) of a node defined, and what are its valid allowed values for a balanced node?',
    options: [
      'BF = height(left_subtree) - height(right_subtree); allowed values: {-1, 0, +1}',
      'BF = number_of_left_nodes - number_of_right_nodes; allowed values: {0, 1}',
      'BF = depth(node) - height(node); allowed values: any positive number',
      'BF = height(node) / 2; allowed values: integers'
    ],
    correctOptionIndex: 0,
    hints: [
      'Balance factor compares the heights of the left and right subtrees.',
      'The difference can never exceed 1 in absolute value.'
    ],
    explanation: 'In an AVL tree, Balance Factor BF = height(left) - height(right). An AVL node is balanced iff BF is in {-1, 0, +1}. If BF reaches +2 or -2, rebalancing rotations are immediately triggered.',
    tags: ['avl_tree', 'balance_factor', 'height_balanced']
  },
  {
    id: 'q-89-avl-single-rotations',
    squareId: 89,
    co: 'CO4',
    title: 'AVL Single Rotations: LL and RR Cases',
    topic: 'AVL Trees',
    subtopic: 'Right Rotation (LL) & Left Rotation (RR)',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'You insert a new node into the LEFT subtree of the LEFT child of node A, causing node A to have a Balance Factor of +2. What rotation fixes this imbalance?',
    options: [
      'Single Right Rotation (LL Rotation) on node A',
      'Single Left Rotation (RR Rotation) on node A',
      'Left-Right (LR) Double Rotation',
      'Right-Left (RL) Double Rotation'
    ],
    correctOptionIndex: 0,
    hints: [
      'Insertion happened in the Left child\'s Left subtree (LL).',
      'A single Right Rotation brings the left child up to become the new root.'
    ],
    explanation: 'An insertion in the left child\'s left subtree creates an LL imbalance (BF = +2). A single Right Rotation on node A pulls the left child up to the root position and pushes node A down to the right child, restoring balance in O(1) time.',
    tags: ['avl_rotations', 'll_rotation', 'right_rotate']
  },
  {
    id: 'q-90-checkpoint-avl',
    squareId: 90,
    co: 'CO4',
    title: 'Checkpoint 9: AVL Double Rotation (LR Case)',
    topic: 'AVL Trees',
    subtopic: 'Unit 9 Milestone Evaluation: LR and RL Rotations',
    skillCategory: 'dry_run',
    difficulty: 'hard',
    type: 'dry_run_trace',
    prompt: 'Insert into an empty AVL tree in order: 30, 10, 20.\n10 is inserted left of 30, and 20 is inserted right of 10 (LR zigzag).\nWhich sequence of rotations restores the AVL tree, and what is the final root?',
    options: [
      'Left Rotation on 10, then Right Rotation on 30 (LR Double Rotation); final root is 20',
      'Single Right Rotation on 30; final root is 10',
      'Single Left Rotation on 30; final root is 20',
      'Right-Left Rotation; final root is 30'
    ],
    correctOptionIndex: 0,
    hints: [
      'This is an LR case (left child, right grandchild).',
      'Step 1: Left Rotate on 10 -> 20 becomes left child of 30, 10 becomes left child of 20.',
      'Step 2: Right Rotate on 30 -> 20 becomes root with children 10 (left) and 30 (right).'
    ],
    explanation: 'Inserting 30, 10, 20 causes an LR imbalance at 30 (BF = +2, child BF = -1). Step 1: Left Rotate child 10 -> transforms zigzag into straight line 30-20-10. Step 2: Right Rotate parent 30 -> 20 becomes the new root with left child 10 and right child 30.',
    tags: ['checkpoint', 'avl_double_rotation', 'lr_case']
  },
  {
    id: 'q-extra-81',
    squareId: 81,
    co: 'CO4',
    title: 'Leaf Nodes in Strict Binary Tree',
    topic: 'Trees Preliminaries',
    subtopic: 'Binary Tree Properties',
    skillCategory: 'numerical',
    difficulty: 'medium',
    type: 'output_prediction',
    prompt: 'In any strictly binary tree (where every non-leaf node has exactly 2 children), if there are L leaf nodes, how many internal nodes I does the tree contain?',
    options: ['I = L - 1', 'I = L', 'I = 2L', 'I = L + 1'],
    correctOptionIndex: 0,
    hints: [
      'Test for a tree with root and 2 children: L = 2 leaves, I = 1 internal node.',
      '1 = 2 - 1.'
    ],
    explanation: 'A classic mathematical theorem for strictly binary trees states that the number of leaf nodes L always exceeds the number of internal nodes I by exactly 1: L = I + 1, so I = L - 1.',
    tags: ['binary_tree', 'leaves', 'properties']
  },
  {
    id: 'q-extra-88',
    squareId: 88,
    co: 'CO4',
    title: 'Maximum Height of AVL Tree',
    topic: 'AVL Trees',
    subtopic: 'AVL Height Bound',
    skillCategory: 'complexity',
    difficulty: 'hard',
    type: 'time_complexity',
    prompt: 'What is the theoretical maximum height of an AVL tree containing n nodes in terms of Big-O?',
    options: [
      'O(log2 n), specifically bounded by ~1.44 * log2(n)',
      'O(n)',
      'O(sqrt(n))',
      'O(n log n)'
    ],
    correctOptionIndex: 0,
    hints: [
      'The minimum number of nodes in an AVL tree of height h relates to Fibonacci numbers.',
      'Even in the worst-case, height is strictly logarithmic.'
    ],
    explanation: 'Because AVL trees maintain |BF| <= 1, the worst-case height (Fibonacci AVL tree) is bounded by h < 1.4404 * log2(n + 2) - 0.3277 = O(log n). This mathematically guarantees O(log n) lookup time in all cases.',
    tags: ['avl', 'height_bound', 'fibonacci_tree']
  },
  {
    id: 'q-extra-85',
    squareId: 85,
    co: 'CO4',
    title: 'Deleting Leaf Node in BST',
    topic: 'Binary Search Tree and its Operations',
    subtopic: 'BST Deletion Case 1',
    skillCategory: 'implementation',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'When deleting a leaf node (a node with 0 children) from a BST, what is the required operation?',
    options: [
      'Simply set the parent\'s pointer that references the leaf node to NULL and free the node',
      'Replace it with the root node',
      'Rotate the entire tree left',
      'Traverse the left subtree'
    ],
    correctOptionIndex: 0,
    hints: [
      'A leaf node has no children to preserve or reconnect.',
      'Just disconnect it from its parent.'
    ],
    explanation: 'Deleting a leaf node is the simplest BST deletion case: set the parent\'s corresponding left or right child pointer to NULL, and deallocate the leaf node memory.',
    tags: ['bst', 'leaf_deletion']
  }
];
