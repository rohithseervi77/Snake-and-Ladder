import { Challenge } from '../../types/challenge';

export const STAGE_41_50_CHALLENGES: Challenge[] = [
  {
    id: 'c-41-tree-inorder-bst',
    squareId: 41,
    title: 'BST Inorder Traversal Monotonicity',
    topic: 'Trees',
    subtopic: 'Binary Tree Traversals',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Why does an Inorder traversal (Left, Root, Right) of a valid Binary Search Tree (BST) visit the nodes in strictly non-decreasing order?',
    options: [
      'By definition of a BST, every key in the left subtree is < root, and every key in the right subtree is > root, matching Left-Root-Right order',
      'The CPU sorts the nodes in memory before running the recursive calls',
      'The call stack sorts memory addresses in increasing pointer order',
      'Inorder traversal automatically balances the tree during traversal'
    ],
    correctOptionIndex: 0,
    hints: [
      'Recall the BST property: all left descendants < root < all right descendants.',
      'Inorder visits: all left descendants, then root, then all right descendants.',
      'Applying this recursively across every subtree produces an ascending sequence.'
    ],
    explanation: 'The BST invariant guarantees that all values in leftSubtree < root.val < rightSubtree. Visiting leftSubtree first, then root.val, then rightSubtree means elements are yielded in strictly increasing order. Inorder traversal of a BST is effectively an O(N) sorted enumeration.',
    learningObjective: 'Understand the direct relationship between BST invariant structure and inorder traversal order.',
    commonMistake: 'Assuming preorder or postorder traversal also yields sorted elements.',
    tags: ['trees', 'bst', 'traversal']
  },
  {
    id: 'c-42-tree-bfs-level-order',
    squareId: 42,
    title: 'Level Order Traversal via FIFO Queue',
    topic: 'Trees',
    subtopic: 'Breadth-First Search on Trees',
    skillCategory: 'dry_run',
    difficulty: 'easy',
    type: 'code_trace',
    codeSnippet: `// Level order traversal using Queue:
// Tree: Root=1, Left=2, Right=3. Node 2 has Left=4, Right=5.
// Queue initially: [1]
// Pop 1, push children: Queue = [2, 3]
// Pop 2, push children: Queue = [3, 4, 5]
// What node is popped next from the queue?`,
    prompt: 'Following standard FIFO queue mechanics, which node is popped next after node 2?',
    options: [
      'Node 3 (the other node on the same level as node 2)',
      'Node 4 (the left child of node 2)',
      'Node 5 (the right child of node 2)',
      'Node 1 (re-enqueued for cycle detection)'
    ],
    correctOptionIndex: 0,
    hints: [
      'A Queue is First-In, First-Out (FIFO).',
      'Look at the queue state: [3, 4, 5].',
      'The element at the front of the queue is 3.'
    ],
    explanation: 'Breadth-First Search processes nodes level by level using a FIFO queue. Since node 3 was enqueued alongside node 2 (level 1), it sits ahead of node 2\'s children (4 and 5 on level 2) in the queue. Thus node 3 is popped next.',
    learningObjective: 'Trace FIFO queue state transitions in tree level-order traversals.',
    commonMistake: 'Popping the newest child immediately (LIFO stack behavior) instead of the oldest queued element.',
    tags: ['trees', 'bfs', 'queue']
  },
  {
    id: 'c-43-max-depth-tree',
    squareId: 43,
    title: 'Maximum Depth via Post-Order Recurrence',
    topic: 'Trees',
    subtopic: 'Tree Height & Depth Recursion',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'What is the recurrence relation for finding the maximum depth (height) of a binary tree node?',
    options: [
      'maxDepth(node) = 1 + Math.max(maxDepth(node.left), maxDepth(node.right)) (with base case 0 for null)',
      'maxDepth(node) = maxDepth(node.left) + maxDepth(node.right)',
      'maxDepth(node) = 1 + Math.min(maxDepth(node.left), maxDepth(node.right))',
      'maxDepth(node) = maxDepth(node.parent) - 1'
    ],
    correctOptionIndex: 0,
    hints: [
      'The height of a node depends on the taller of its two children.',
      'The current node itself contributes 1 to the depth.',
      'Base case: A null node has depth 0.'
    ],
    explanation: 'A tree\'s depth from any node is 1 (for the node itself) plus the maximum depth of its subtrees: `1 + Math.max(depth(left), depth(right))`. When `node === null`, depth is 0. This post-order traversal computes height bottom-up in O(N) time.',
    learningObjective: 'Formulate bottom-up divide-and-conquer recurrences on tree nodes.',
    commonMistake: 'Summing left and right heights instead of taking their maximum.',
    tags: ['trees', 'recursion', 'depth']
  },
  {
    id: 'c-44-validate-bst-bounds',
    squareId: 44,
    title: 'Validating BST: The Ancestor Range Invariant',
    topic: 'Trees',
    subtopic: 'Binary Search Tree Validation',
    skillCategory: 'debugging',
    difficulty: 'medium',
    type: 'bug_hunt',
    codeSnippet: `function isValidBST(root) {
  if (!root) return true;
  // FLAWED LOCAL CHECK:
  if (root.left && root.left.val >= root.val) return false;
  if (root.right && root.right.val <= root.val) return false;
  return isValidBST(root.left) && isValidBST(root.right);
}`,
    prompt: 'Why does only checking immediate children fail for tree `[10, 5, 15, null, null, 6, 20]`?',
    options: [
      'Node 6 is greater than its parent (5) but less than its ancestor root (10), violating the BST property across ancestors',
      'The function fails to check if root is null',
      'Binary search trees do not allow leaf nodes with value 20',
      'The recursion does not return a boolean value'
    ],
    correctOptionIndex: 0,
    hints: [
      'Inspect node 6: it is the left child of 15, so 6 < 15 is locally valid.',
      'Where does node 6 sit relative to the root 10? In root\'s right subtree!',
      'All nodes in the right subtree of 10 MUST be > 10. Node 6 violates this global invariant.'
    ],
    explanation: 'The BST property applies to ALL descendants, not just immediate children. In `[10, 5, 15, null, null, 6, 20]`, node 6 is in the right subtree of 10, so it must be > 10. However, 6 < 10. To validate correctly, we must pass down allowable value intervals: `(minBound, maxBound)`.',
    learningObjective: 'Maintain global ancestor interval constraints `(low, high)` when validating BSTs.',
    commonMistake: 'Only checking immediate left < root < right and missing ancestor boundary violations.',
    tags: ['trees', 'bst', 'debugging', 'invariants']
  },
  {
    id: 'c-45-lca-bst',
    squareId: 45,
    title: 'Lowest Common Ancestor in a BST',
    topic: 'Trees',
    subtopic: 'Lowest Common Ancestor (LCA)',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In a BST, given two nodes p and q with p.val < q.val, at what point does node `curr` represent their Lowest Common Ancestor (LCA)?',
    options: [
      'The moment p.val <= curr.val <= q.val (the values split across curr or one equals curr)',
      'When curr is the deepest leaf in the tree',
      'When curr.left === null and curr.right === null',
      'Only when curr.val === (p.val + q.val) / 2'
    ],
    correctOptionIndex: 0,
    hints: [
      'If both p and q are smaller than curr.val, where must their LCA lie? In curr.left.',
      'If both are greater than curr.val, where must their LCA lie? In curr.right.',
      'What happens when one is on the left and the other on the right?'
    ],
    explanation: 'Because a BST is ordered, if both p and q are less than curr, LCA must be in the left subtree. If both are greater, LCA must be in the right subtree. The first node where p and q split (or where curr equals p or q) is guaranteed to be their lowest common ancestor, runnable in O(H) time and O(1) space.',
    learningObjective: 'Leverage BST ordering properties to find Lowest Common Ancestors in O(H) time without storing paths.',
    commonMistake: 'Treating a BST LCA like a general binary tree LCA and doing full O(N) post-order traversals.',
    tags: ['trees', 'bst', 'lca']
  },
  {
    id: 'c-46-lca-binary-tree',
    squareId: 46,
    title: 'Lowest Common Ancestor in General Binary Tree',
    topic: 'Trees',
    subtopic: 'General LCA Post-Order Propagation',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'code_trace',
    codeSnippet: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ? left : right;
}`,
    prompt: 'What condition indicates that `root` is the Lowest Common Ancestor of nodes `p` and `q`?',
    options: [
      'Both `left` and `right` recursive calls return non-null, meaning p was found in one subtree and q in the other',
      'Both `left` and `right` return null',
      'root.val equals p.val + q.val',
      'The call stack depth exceeds the tree height'
    ],
    correctOptionIndex: 0,
    hints: [
      'If p is found in the left subtree, left is non-null.',
      'If q is found in the right subtree, right is non-null.',
      'If both subtrees return a match, root is where the paths diverge.'
    ],
    explanation: 'In a general binary tree without order invariants, we search bottom-up. If `lowestCommonAncestor` returns non-null from both left and right subtrees, then p and q reside in different branches of root. Therefore, root is their Lowest Common Ancestor and bubbles up to the caller.',
    learningObjective: 'Trace post-order bubble-up semantics for lowest common ancestors in arbitrary trees.',
    commonMistake: 'Assuming a binary tree has BST ordering properties.',
    tags: ['trees', 'lca', 'recursion']
  },
  {
    id: 'c-47-diameter-binary-tree',
    squareId: 47,
    title: 'Diameter of a Binary Tree Invariant',
    topic: 'Trees',
    subtopic: 'Tree Diameter & Longest Path',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'Why does the longest path between any two nodes in a binary tree (diameter) NOT necessarily pass through the root of the tree?',
    options: [
      'The longest path may exist entirely within a deeply nested subtree (e.g. left child has massive left and right subtrees)',
      'Diameter is only defined for leaf nodes',
      'The root node cannot have edges connected to it in a directed acyclic tree',
      'Binary tree diameter is always equal to 2 * height(root)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Can one child of root have a very deep left branch and a very deep right branch?',
      'If root\'s other child is null, the deepest path will stay entirely within that first child.',
      'Hence, we must compute `leftHeight + rightHeight` at EVERY node and track the global maximum.'
    ],
    explanation: 'A common misconception is that the diameter always passes through the global root. If the root\'s right subtree is tiny while its left subtree is huge with long left and right branches, the maximum path never touches the global root. We must update `maxDiameter = Math.max(maxDiameter, leftH + rightH)` at every node.',
    learningObjective: 'Distinguish between global root paths and localized subtree diameter invariants.',
    commonMistake: 'Computing only `leftHeight(root) + rightHeight(root)` and assuming it is the maximum diameter.',
    tags: ['trees', 'diameter', 'recursion']
  },
  {
    id: 'c-48-path-sum-root-leaf',
    squareId: 48,
    title: 'Path Sum: Root-to-Leaf Backtracking',
    topic: 'Trees',
    subtopic: 'Path Accumulation & Backtracking',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'In the Path Sum problem (finding if a root-to-leaf path sums to target), what defines a valid "leaf" node?',
    options: [
      'A node with strictly `node.left === null && node.right === null`',
      'Any node whose value is equal to targetSum',
      'A node with at least one null child pointer',
      'A node that has no parent pointer'
    ],
    correctOptionIndex: 0,
    hints: [
      'What is the definition of a leaf in graph theory and binary trees?',
      'A node with degree 1 in an undirected tree, or 0 children in a directed rooted tree.',
      'Both left AND right must be null.'
    ],
    explanation: 'A leaf node is strictly defined as a node with zero children (`!node.left && !node.right`). If a node has a null left child but a non-null right child, it is an internal node; the path cannot terminate there.',
    learningObjective: 'Accurately distinguish internal branch nodes with one child from true terminal leaf nodes.',
    commonMistake: 'Terminating path evaluation when encountering a single null child on an internal node.',
    tags: ['trees', 'dfs', 'path-sum']
  },
  {
    id: 'c-49-balanced-avl-condition',
    squareId: 49,
    title: 'Balanced Binary Tree: AVL Invariant',
    topic: 'Trees',
    subtopic: 'Balanced Trees & AVL Invariant',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'complexity_choice',
    prompt: 'What condition must hold for a binary tree to be considered "height-balanced" (like an AVL tree)?',
    options: [
      'For every node in the tree, the height difference between its left and right subtrees is at most 1: `Math.abs(hL - hR) <= 1`',
      'The total number of left nodes must equal the total number of right nodes',
      'All leaf nodes must be at the exact same depth',
      'Every node must have either 0 or 2 children'
    ],
    correctOptionIndex: 0,
    hints: [
      'Look at the balance factor definition in AVL trees.',
      'Balance factor = height(left) - height(right).',
      'Permissible values are strictly -1, 0, or +1 at every node.'
    ],
    explanation: 'A binary tree is height-balanced if and only if for EVERY node in the tree, `|height(left) - height(right)| <= 1`, and both left and right subtrees are also height-balanced. This guarantees O(log N) maximum tree depth.',
    learningObjective: 'Master the formal definition of height-balanced trees and bottom-up O(N) validation.',
    commonMistake: 'Confusing a complete/perfect binary tree with a height-balanced tree.',
    tags: ['trees', 'avl', 'balanced-tree']
  },
  {
    id: 'c-50-tree-right-side-view',
    squareId: 50,
    title: 'Binary Tree Right Side View',
    topic: 'Trees',
    subtopic: 'Level-by-Level Observation',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'When generating the Right Side View of a binary tree (the visible nodes when looking from the right side), which node is visible at each depth level?',
    options: [
      'The last node visited at each depth level in standard left-to-right BFS, or the first node visited in Root-Right-Left DFS',
      'Only nodes that are right children of their parents',
      'The node with the maximum numeric value on that level',
      'Only leaf nodes'
    ],
    correctOptionIndex: 0,
    hints: [
      'If a node on level 3 has no right sibling, its left cousin may be visible from the right side.',
      'So it is not just right children!',
      'It is simply the rightmost node existing on each vertical level.'
    ],
    explanation: 'The right side view consists of the rightmost node at each depth level. If a level only has nodes on the far left, that leftmost node is still visible from the right. In BFS, it is the last element of each level queue. In DFS with order (Root -> Right -> Left), it is the first node encountered at depth == result.length.',
    learningObjective: 'Derive perspective projection views of hierarchical structures using BFS queue boundaries.',
    commonMistake: 'Assuming the right side view only consists of nodes accessed via `.right` pointers.',
    tags: ['trees', 'bfs', 'dfs']
  }
];
