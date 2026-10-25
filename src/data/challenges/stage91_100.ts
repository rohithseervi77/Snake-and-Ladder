import { Challenge } from '../../types/challenge';

export const STAGE_91_100_CHALLENGES: Challenge[] = [
  {
    id: 'q-91-graph-representations',
    squareId: 91,
    co: 'CO4',
    title: 'Adjacency Matrix vs Adjacency List Space Comparison',
    topic: 'Graph Preliminaries',
    subtopic: 'Adjacency Matrix vs Adjacency List',
    skillCategory: 'compare_approaches',
    difficulty: 'easy',
    type: 'compare_approaches',
    prompt: 'You are representing a social network graph with V = 100,000 users and E = 200,000 friendship edges. Why is an Adjacency List overwhelmingly superior to an Adjacency Matrix here?',
    options: [
      'Adjacency List requires O(V + E) space (~300,000 entries), whereas an Adjacency Matrix requires O(V^2) space (10,000,000,000 entries = ~10 GB RAM)',
      'Adjacency List automatically prevents graph cycles',
      'Adjacency Matrix cannot store undirected edges',
      'Adjacency List runs Dijkstra in O(1) time'
    ],
    correctOptionIndex: 0,
    hints: [
      'Compute V^2 for 100,000 vertices: (10^5)^2 = 10^10 entries.',
      'A sparse graph has E << V^2.'
    ],
    explanation: 'For sparse graphs where E << V^2, an adjacency matrix allocates V*V slots (10 billion entries, wasting ~10-40 GB of RAM on mostly 0s). An adjacency list stores only actual edges, taking O(V + E) space (negligible megabytes).',
    tags: ['graph_representation', 'sparse_graph', 'space_complexity']
  },
  {
    id: 'q-92-bfs-traversal',
    squareId: 92,
    co: 'CO4',
    title: 'Breadth-First Search (BFS) Traversal Order',
    topic: 'Graph Traversals',
    subtopic: 'Queue-Based Level-Order Traversal',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'dry_run_trace',
    prompt: 'Given an undirected graph with edges: (A-B), (A-C), (B-D), (B-E), (C-F). Neighbors are enqueued in alphabetical order.\nStarting from vertex A, what is the exact BFS traversal order?',
    options: [
      'A, B, C, D, E, F',
      'A, B, D, E, C, F',
      'A, C, F, B, E, D',
      'F, E, D, C, B, A'
    ],
    correctOptionIndex: 0,
    hints: [
      'Level 0: Start at A.',
      'Level 1: Neighbors of A are B and C.',
      'Level 2: Neighbors of B are D, E; neighbor of C is F.'
    ],
    explanation: 'BFS uses a FIFO queue: 1) Enqueue A. 2) Dequeue A, enqueue neighbors B, C (queue: [B, C]). 3) Dequeue B, enqueue neighbors D, E (queue: [C, D, E]). 4) Dequeue C, enqueue neighbor F (queue: [D, E, F]). 5) Dequeue D, E, F. Result: A, B, C, D, E, F.',
    tags: ['bfs', 'traversal', 'queue_order']
  },
  {
    id: 'q-93-dfs-traversal',
    squareId: 93,
    co: 'CO4',
    title: 'Depth-First Search (DFS) Traversal Order',
    topic: 'Graph Traversals',
    subtopic: 'Recursive & Stack-Based Exploration',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'dry_run_trace',
    prompt: 'For the same graph with edges (A-B), (A-C), (B-D), (B-E), (C-F), neighbors are visited in alphabetical order.\nStarting from vertex A, what is the exact DFS traversal order?',
    options: [
      'A, B, D, E, C, F',
      'A, B, C, D, E, F',
      'A, C, F, B, E, D',
      'A, B, E, D, C, F'
    ],
    correctOptionIndex: 0,
    hints: [
      'DFS goes as deep as possible before backtracking.',
      'From A -> go to first neighbor B -> from B go to first neighbor D (dead end) -> backtrack to B -> go to E.'
    ],
    explanation: 'DFS follows deep paths: 1) Visit A -> visit first neighbor B. 2) From B -> visit first neighbor D. 3) D has no unvisited neighbors, backtrack to B. 4) From B -> visit neighbor E. 5) Backtrack to A. 6) From A -> visit neighbor C -> visit F. Result: A, B, D, E, C, F.',
    tags: ['dfs', 'backtracking', 'traversal']
  },
  {
    id: 'q-94-dijkstra-algorithm',
    squareId: 94,
    co: 'CO4',
    title: "Dijkstra's Algorithm Edge Relaxation",
    topic: 'Shortest Path Algorithm',
    subtopic: 'Single-Source Shortest Path with Min-Heap',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In Dijkstra\'s algorithm, what condition triggers the relaxation of an edge from vertex u to vertex v with weight w?',
    options: [
      'if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; }',
      'if (dist[v] + w < dist[u]) { dist[u] = dist[v] + w; }',
      'if (dist[u] == dist[v]) { dist[v] += w; }',
      'if (w < 0) { dist[v] = 0; }'
    ],
    correctOptionIndex: 0,
    hints: [
      'Relaxation checks if the path through u is shorter than the currently recorded distance to v.',
      'New candidate distance to v via u is dist[u] + weight(u, v).'
    ],
    explanation: 'Edge relaxation tests whether taking edge (u, v) offers a shorter path to v than previously found: if `dist[u] + weight(u, v) < dist[v]`, update `dist[v] = dist[u] + weight(u, v)`.',
    tags: ['dijkstra', 'relaxation', 'shortest_path']
  },
  {
    id: 'q-95-dijkstra-negative-edges',
    squareId: 95,
    co: 'CO4',
    title: 'Why Dijkstra Fails on Negative Edge Weights',
    topic: 'Shortest Path Algorithm',
    subtopic: 'Why Dijkstra Fails on Negative Edges',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'Why does Dijkstra\'s algorithm produce INCORRECT shortest paths on graphs containing negative edge weights?',
    options: [
      'Dijkstra greedily marks a vertex as permanently visited under the assumption that path lengths only increase; a negative edge could later offer a cheaper path to an already visited vertex',
      'Negative numbers cause integer overflow in the distance array',
      'Dijkstra\'s algorithm uses queues instead of stacks',
      'Adjacency lists cannot store negative numbers'
    ],
    correctOptionIndex: 0,
    hints: [
      'Dijkstra assumes that once vertex u is extracted from the min-heap, dist[u] is optimal and final.',
      'If an edge has negative weight, a path through a later vertex could reduce dist[u].'
    ],
    explanation: 'Dijkstra relies on the greedy invariant that once a vertex is finalized in the visited set, no shorter path to it can exist. Negative edge weights violate this invariant, because a detour through a negative edge could reduce the path cost after the vertex was already marked visited.',
    tags: ['dijkstra', 'negative_edges', 'greedy_failure']
  },
  {
    id: 'q-96-prim-mst',
    squareId: 96,
    co: 'CO4',
    title: "Prim's Minimum Spanning Tree Strategy",
    topic: 'Minimum Spanning Tree',
    subtopic: 'Greedy Cut Property from Single Seed Vertex',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'compare_approaches',
    prompt: 'How does Prim\'s algorithm grow the Minimum Spanning Tree (MST), and what graph data structure makes it most efficient for dense graphs?',
    options: [
      'It grows a single connected tree from a starting vertex, repeatedly adding the cheapest edge crossing into the unvisited set; Adjacency Matrix runs in O(V^2)',
      'It sorts all edges first and merges disconnected trees',
      'It removes maximum cycles until a tree remains',
      'It uses DFS to visit all vertices'
    ],
    correctOptionIndex: 0,
    hints: [
      'Prim maintains a single growing connected tree at all times.',
      'Contrast this with Kruskal, which maintains a forest of disconnected components.'
    ],
    explanation: 'Prim\'s algorithm grows a single connected component starting from an arbitrary root vertex, greedily adding the cheapest edge that connects the existing tree to an unvisited vertex. For dense graphs (E approx V^2), Prim with an Adjacency Matrix runs in optimal O(V^2) time.',
    tags: ['prim', 'mst', 'cut_property']
  },
  {
    id: 'q-97-kruskal-mst',
    squareId: 97,
    co: 'CO4',
    title: "Kruskal's Algorithm & Cycle Detection",
    topic: 'Minimum Spanning Tree',
    subtopic: 'Edge Sorting & Cycle Check',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'select_data_structure',
    prompt: 'In Kruskal\'s MST algorithm, all edges are sorted by weight ascending. What is the standard check performed before adding edge (u, v) to the MST?',
    options: [
      'Check if adding edge (u, v) creates a cycle; if it does NOT create a cycle, add it to the MST',
      'Check if u is smaller than v',
      'Check if both vertices are connected to the root',
      'Verify that the edge weight is an even number'
    ],
    correctOptionIndex: 0,
    hints: [
      'A spanning tree on V vertices cannot have any cycles.',
      'Adding an edge between two already connected vertices would form a cycle.'
    ],
    explanation: 'Kruskal\'s algorithm considers edges in non-decreasing order of weight. It adds edge (u, v) to the MST iff u and v belong to different components (i.e., adding the edge does not form a cycle). This repeats until V - 1 edges are selected.',
    tags: ['kruskal', 'mst', 'cycle_detection']
  },
  {
    id: 'q-98-huffman-coding',
    squareId: 98,
    co: 'CO4',
    title: 'Huffman Coding Prefix Property',
    topic: 'Huffman Coding',
    subtopic: 'Optimal Prefix Tree & Lossless Compression',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'In Huffman Coding, what is the "prefix-free property", and why is it essential for decompression?',
    options: [
      'No character\'s bit code is a prefix of another character\'s bit code, allowing instantaneous, unambiguous decoding without delimiters',
      'All bit codes must have the exact same length of 8 bits',
      'Every code must begin with a 0 bit',
      'The most frequent character must be assigned code 1111'
    ],
    correctOptionIndex: 0,
    hints: [
      'If \'A\' was "0" and \'B\' was "01", when reading "01...", you wouldn\'t know if it is \'A\' followed by \'1\' or \'B\'.',
      'Prefix-free ensures unique decodability.'
    ],
    explanation: 'A prefix-free code ensures that no code word is a prefix of any other code word. This guarantees that encoded bitstreams can be parsed uniquely and instantaneously from left to right without needing separators between characters.',
    tags: ['huffman', 'prefix_property', 'compression']
  },
  {
    id: 'q-99-strassen-multiplication',
    squareId: 99,
    co: 'CO4',
    title: "Strassen's Sub-Cubic Matrix Multiplication",
    topic: 'Strassen Matrix Multiplication',
    subtopic: 'Sub-Cubic O(n^2.807) Divide-and-Conquer',
    skillCategory: 'complexity',
    difficulty: 'hard',
    type: 'time_complexity',
    prompt: 'Standard recursive matrix multiplication requires 8 multiplications of (n/2 x n/2) submatrices. How many multiplications does Strassen\'s algorithm use, and what is the resulting time complexity?',
    options: [
      '7 multiplications; Complexity O(n^log2(7)) approx O(n^2.807)',
      '6 multiplications; Complexity O(n^2.58)',
      '8 multiplications; Complexity O(n^3)',
      '4 multiplications; Complexity O(n^2)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Strassen ingeniously uses algebraic additions/subtractions to save 1 multiplication.',
      '8 multiplications drops to 7 multiplications.',
      'T(n) = 7T(n/2) + O(n^2).'
    ],
    explanation: 'Strassen discovered formulas to compute the product of two 2x2 matrices using 7 scalar multiplications instead of 8. The recurrence T(n) = 7T(n/2) + Theta(n^2) solves via Master Theorem Case 1 to O(n^(log2 7)) approx O(n^2.807), beating standard cubic O(n^3) time.',
    tags: ['strassen', 'matrix_multiplication', 'divide_and_conquer']
  },
  {
    id: 'q-100-matrix-chain-order',
    squareId: 100,
    co: 'CO4',
    title: 'Matrix Chain Multiplication: Associative Ordering',
    topic: 'Ordering Matrix Multiplication',
    subtopic: 'Optimal Parenthesization to Minimize Multiplications',
    skillCategory: 'numerical',
    difficulty: 'hard',
    type: 'output_prediction',
    prompt: 'Given three matrices: A1 (10 x 100), A2 (100 x 5), A3 (5 x 50).\n1. Parenthesization 1: (A1 * A2) * A3\n2. Parenthesization 2: A1 * (A2 * A3)\nHow many scalar multiplications do they require, and which is optimal?',
    options: [
      '(A1 * A2) * A3 takes 7,500 operations (Optimal); A1 * (A2 * A3) takes 75,000 operations (10x slower!)',
      'Both take 50,000 operations because matrix multiplication is associative',
      'A1 * (A2 * A3) takes 7,500 operations; (A1 * A2) * A3 takes 75,000 operations',
      '(A1 * A2) * A3 takes 1,000 operations'
    ],
    correctOptionIndex: 0,
    hints: [
      'Multiplying (p x q) and (q x r) takes p * q * r multiplications.',
      '(A1 * A2): 10 * 100 * 5 = 5,000 (result is 10 x 5). Then (10x5) * (5x50) takes 10 * 5 * 50 = 2,500. Total = 7,500.',
      '(A2 * A3): 100 * 5 * 50 = 25,000 (result is 100 x 50). Then (10x100) * (100x50) takes 10 * 100 * 50 = 50,000. Total = 75,000.'
    ],
    explanation: 'Parenthesization 1: (A1*A2) takes 10*100*5 = 5,000 ops (matrix of 10x5). Multiplying by A3 takes 10*5*50 = 2,500 ops. Total = 7,500 ops. Parenthesization 2: (A2*A3) takes 100*5*50 = 25,000 ops (100x50). Multiplying A1 by this takes 10*100*50 = 50,000 ops. Total = 75,000 ops! The choice of order makes a 10x performance difference.',
    tags: ['matrix_chain', 'parenthesization', 'final_boss', 'capstone']
  },
  {
    id: 'q-extra-91',
    squareId: 91,
    co: 'CO4',
    title: 'Connected Components via BFS/DFS',
    topic: 'Graph Traversals',
    subtopic: 'Graph Connectivity',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'How can you find the total number of connected components in an undirected graph?',
    options: [
      'Loop through all vertices; whenever an unvisited vertex is found, increment component count and launch BFS/DFS to mark all reachable nodes',
      'Count the number of edges and divide by 2',
      'Run Dijkstra from vertex 0 only',
      'Multiply the adjacency matrix by itself'
    ],
    correctOptionIndex: 0,
    hints: [
      'Each call to BFS/DFS explores one complete connected component.',
      'Iterate through vertices 0 to V-1.'
    ],
    explanation: 'Iterate through all vertices. For each vertex that has not yet been marked visited, increment the component counter and run a BFS or DFS traversal to mark all vertices in that component. Total time is O(V + E).',
    tags: ['connected_components', 'bfs', 'dfs']
  },
  {
    id: 'q-extra-94',
    squareId: 94,
    co: 'CO4',
    title: 'Dijkstra Time Complexity with Min-Heap',
    topic: 'Shortest Path Algorithm',
    subtopic: 'Dijkstra Complexity Analysis',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'time_complexity',
    prompt: 'What is the time complexity of Dijkstra\'s algorithm implemented with an Adjacency List and a Binary Min-Heap (Priority Queue)?',
    options: [
      'O((V + E) log V)',
      'O(V^2)',
      'O(V * E)',
      'O(V log V)'
    ],
    correctOptionIndex: 0,
    hints: [
      'Extract-Min is called V times (V * log V).',
      'Decrease-Key / edge relaxation is called E times (E * log V).'
    ],
    explanation: 'With a binary min-heap, each of the V vertex extractions takes O(log V) time, and each of the E edge relaxations takes O(log V) time to update the heap. Total running time is O((V + E) log V).',
    tags: ['dijkstra', 'min_heap', 'complexity']
  },
  {
    id: 'q-extra-96',
    squareId: 96,
    co: 'CO4',
    title: 'Number of Edges in a Spanning Tree',
    topic: 'Minimum Spanning Tree',
    subtopic: 'MST Properties',
    skillCategory: 'numerical',
    difficulty: 'easy',
    type: 'output_prediction',
    prompt: 'A connected graph has V = 15 vertices and E = 35 edges. Exactly how many edges will its Minimum Spanning Tree (MST) contain?',
    options: ['14 edges (V - 1)', '15 edges', '35 edges', '7 edges'],
    correctOptionIndex: 0,
    hints: [
      'A spanning tree connects all V vertices without any cycles.',
      'Every tree with V vertices has V - 1 edges.'
    ],
    explanation: 'By definition, any spanning tree connecting V vertices must contain exactly V - 1 edges to connect all nodes without cycles. For V = 15, the MST contains exactly 14 edges.',
    tags: ['mst', 'spanning_tree', 'edge_count']
  },
  {
    id: 'q-extra-98',
    squareId: 98,
    co: 'CO4',
    title: 'Huffman Code Length and Frequency',
    topic: 'Huffman Coding',
    subtopic: 'Frequency Inversion in Huffman Trees',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In Huffman Coding, what is the relationship between a character\'s occurrence frequency and the length of its assigned binary bit code?',
    options: [
      'Characters with higher frequency receive shorter bit codes; characters with lower frequency receive longer bit codes',
      'All characters receive identical bit lengths',
      'Characters with higher frequency receive longer bit codes',
      'The bit length is determined solely by alphabetical order'
    ],
    correctOptionIndex: 0,
    hints: [
      'Frequent characters appear often in the text.',
      'Making common characters like \'e\' or space take fewer bits minimizes total file size.'
    ],
    explanation: 'Huffman Coding is an optimal greedy algorithm where high-frequency symbols are placed near the top of the tree (short codes), and rare symbols are placed near the bottom (longer codes), minimizing total expected file length.',
    tags: ['huffman', 'frequency', 'compression']
  }
];
