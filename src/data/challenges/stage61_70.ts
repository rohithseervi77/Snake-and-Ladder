import { Challenge } from '../../types/challenge';

export const STAGE_61_70_CHALLENGES: Challenge[] = [
  {
    id: 'c-61-graph-representation',
    squareId: 61,
    title: 'Adjacency List vs Adjacency Matrix',
    topic: 'Graph Algorithms',
    subtopic: 'Graph Representations & Memory Tradeoffs',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'For a sparse graph with V vertices and E edges (where E << V^2), why is an Adjacency List preferred over an Adjacency Matrix?',
    options: [
      'Adjacency List uses O(V + E) space and allows iterating over neighbors in O(deg(u)), whereas Adjacency Matrix wastes O(V^2) space and O(V) per vertex inspection',
      'Adjacency List enables O(1) edge existence queries between arbitrary vertices (u, v)',
      'Adjacency Matrix cannot store directed edges',
      'Adjacency Matrix cannot represent weighted graphs'
    ],
    correctOptionIndex: 0,
    hints: [
      'Consider a graph with 1,000,000 vertices and only 2,000,000 edges.',
      'An adjacency matrix requires a 1,000,000 x 1,000,000 table (~1 terabyte of RAM).',
      'An adjacency list only stores the 2,000,000 existing edges.'
    ],
    explanation: 'In sparse graphs (common in web, social networks, road maps), an adjacency matrix allocates V^2 cells, wasting memory on zeroes. Adjacency lists use strictly O(V + E) memory and allow visiting adjacent vertices in O(degree(v)) time rather than scanning all V columns.',
    learningObjective: 'Choose appropriate graph representations based on graph density and memory constraints.',
    commonMistake: 'Defaulting to an adjacency matrix for large graphs, causing Out-Of-Memory errors.',
    tags: ['graphs', 'representations', 'complexity']
  },
  {
    id: 'c-62-bfs-shortest-path',
    squareId: 62,
    title: 'BFS: Unweighted Shortest Path Invariant',
    topic: 'Graph Algorithms',
    subtopic: 'Breadth-First Search & Level Sets',
    skillCategory: 'conceptual',
    difficulty: 'easy',
    type: 'conceptual_mcq',
    prompt: 'Why does Breadth-First Search (BFS) guarantee finding the shortest path (minimum edge count) between two vertices in an unweighted graph?',
    options: [
      'BFS explores all vertices at distance d before touching any vertex at distance d + 1, ensuring the first time a target is dequeued is via the shortest path',
      'BFS uses a min-heap that sorts vertices by their vertex IDs',
      'BFS recurses down the deepest path first and backtracks on dead ends',
      'Edges in unweighted graphs are always sorted in increasing order'
    ],
    correctOptionIndex: 0,
    hints: [
      'BFS uses a FIFO queue.',
      'Vertices entered into the queue have monotonically non-decreasing distances from the source.',
      'The first time target is reached, no shorter route could exist.'
    ],
    explanation: 'Monotonic queue invariant: In BFS, all vertices at distance d are popped before any vertex at distance d+1 is popped. When target vertex v is first discovered, it is reached through the smallest possible number of hops. This holds strictly for graphs where all edge weights are equal/unweighted.',
    learningObjective: 'Master the level-synchronous property of BFS for unweighted shortest path problems.',
    commonMistake: 'Using Dijkstra\'s algorithm on an unweighted graph, adding unnecessary O(E log V) overhead over BFS\'s O(V + E).',
    tags: ['graphs', 'bfs', 'shortest-path']
  },
  {
    id: 'c-63-dfs-cycle-directed',
    squareId: 63,
    title: 'Directed Graph Cycle Detection: 3-Color States',
    topic: 'Graph Algorithms',
    subtopic: 'Cycle Detection & DFS Coloring',
    skillCategory: 'debugging',
    difficulty: 'medium',
    type: 'bug_hunt',
    codeSnippet: `// 3-Color state: 0 = Unvisited (White), 1 = Visiting / On Call Stack (Gray), 2 = Visited / Completed (Black)
function hasCycle(u, adj, state) {
  state[u] = 1; // Mark Visiting
  for (let v of adj[u]) {
    if (state[v] === 1) return true; // BACK EDGE FOUND!
    if (state[v] === 0 && hasCycle(v, adj, state)) return true;
  }
  state[u] = 2; // Mark Visited
  return false;
}`,
    prompt: 'What graph theoretic edge does `state[v] === 1` identify, and why does it prove the existence of a cycle?',
    options: [
      'A "Back Edge" to an active ancestor node currently on the DFS call stack, completing a directed loop',
      'A "Cross Edge" between two independent subtrees',
      'A "Forward Edge" to an already completed child node',
      'A self-loop caused by memory address aliasing'
    ],
    correctOptionIndex: 0,
    hints: [
      'State 1 (Gray) means the node was visited and its descendants are CURRENTLY being explored.',
      'If you reach a node that is currently being explored, you have circled back to an ancestor.',
      'An edge from a node to one of its active ancestors is a back edge, which forms a cycle.'
    ],
    explanation: 'In directed DFS, reaching a vertex currently in state 1 (VISITING) means there is an edge from u to an ancestor v currently on the DFS call stack. Since v can reach u and u points back to v, a directed cycle exists. This tri-color method detects cycles in O(V + E) time.',
    learningObjective: 'Distinguish back edges from cross edges and forward edges in directed DFS.',
    commonMistake: 'Using a simple boolean `visited` array (which only works for undirected graphs) and misidentifying cross edges as cycles.',
    tags: ['graphs', 'dfs', 'cycle-detection', 'invariants']
  },
  {
    id: 'c-64-bipartite-graph-coloring',
    squareId: 64,
    title: 'Bipartite Graph & Odd Cycle Invariant',
    topic: 'Graph Algorithms',
    subtopic: 'Graph Coloring & Bipartiteness',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'A graph is bipartite (2-colorable) if and only if it satisfies which fundamental graph theoretic condition?',
    options: [
      'It contains NO odd-length cycles (all cycles must have even lengths)',
      'The number of vertices must be an even integer',
      'Every vertex must have an even degree',
      'It must be a complete graph where every vertex connects to all others'
    ],
    correctOptionIndex: 0,
    hints: [
      'Try 2-coloring a triangle (cycle of length 3): Red -> Blue -> Red -> conflicts with first Red!',
      'What about a 4-cycle (square)? Red -> Blue -> Red -> Blue -> valid.',
      'Odd cycles make 2-coloring impossible.'
    ],
    explanation: 'König\'s Theorem: A graph is bipartite if and only if it contains no cycles of odd length. When 2-coloring with BFS/DFS, encountering an adjacent neighbor already painted with the current node\'s color immediately reveals an odd cycle, disproving bipartiteness.',
    learningObjective: 'Connect 2-coloring algorithms with the odd-cycle graph invariant.',
    commonMistake: 'Assuming a graph with an even number of vertices cannot have odd cycles.',
    tags: ['graphs', 'bipartite', 'coloring']
  },
  {
    id: 'c-65-topological-sort-kahn',
    squareId: 65,
    title: 'Topological Sort: Kahn\'s In-Degree Invariant',
    topic: 'Graph Algorithms',
    subtopic: 'Topological Ordering & In-Degrees',
    skillCategory: 'dry_run',
    difficulty: 'medium',
    type: 'code_trace',
    codeSnippet: `// Kahn's Algorithm for DAG:
// Compute inDegrees: [A: 0, B: 1, C: 1, D: 2]
// Edges: A->B, A->C, B->D, C->D
// Queue initially: [A]
// Dequeue A, decrement B and C: inDegrees become [B: 0, C: 0, D: 2]
// What vertices are added to the queue next?`,
    prompt: 'After processing vertex A, which vertices are enqueued next in Kahn\'s algorithm?',
    options: [
      'Both B and C (their in-degrees dropped to 0)',
      'Vertex D (because it has the highest in-degree)',
      'Only vertex B (alphabetical priority)',
      'Vertex A (re-enqueued for validation)'
    ],
    correctOptionIndex: 0,
    hints: [
      'A node is enqueued when all its prerequisites have been fulfilled (in-degree drops to 0).',
      'Both B and C had in-degree 1 from A.',
      'With A removed, both B and C now have in-degree 0.'
    ],
    explanation: 'Kahn\'s algorithm maintains a queue of vertices with in-degree 0 (ready to be scheduled). Dequeuing A removes its outgoing edges, reducing inDegrees of B and C from 1 to 0. Since both now have no remaining dependencies, both are pushed to the queue.',
    learningObjective: 'Master Kahn\'s in-degree zero queue invariant for dependency scheduling and DAG validation.',
    commonMistake: 'Enqueuing nodes whose in-degrees have not yet reached 0.',
    tags: ['graphs', 'topological-sort', 'kahns-algorithm']
  },
  {
    id: 'c-66-dijkstra-invariants',
    squareId: 66,
    title: 'Dijkstra\'s Algorithm & Non-Negative Weights',
    topic: 'Graph Algorithms',
    subtopic: 'Greedy Shortest Path',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'Why does standard Dijkstra\'s algorithm FAIL or run infinitely on graphs with negative edge weights?',
    options: [
      'Dijkstra assumes that extracting the minimum distance node from the priority queue finalizes its shortest path; negative edges violate this monotonic distance assumption',
      'Priority queues cannot compare negative numbers in binary heaps',
      'Negative edges cause graph adjacency lists to delete vertices',
      'Dijkstra\'s algorithm requires that the graph be bipartite'
    ],
    correctOptionIndex: 0,
    hints: [
      'Dijkstra is a greedy algorithm.',
      'Once a node u is settled (dist[u] is extracted from min-heap), Dijkstra never reconsiders it.',
      'If a negative edge later reduces the path to u, Dijkstra\'s finalized assumption is invalidated.'
    ],
    explanation: 'Dijkstra is greedy: it assumes adding an edge can only increase or maintain path cost (weights >= 0). Once a vertex is popped from the min-heap, its shortest distance is considered permanently settled. A negative edge can retroactively make a previously longer path shorter, invalidating the greedy invariant.',
    learningObjective: 'Understand the mathematical necessity of non-negative edge weights in Dijkstra\'s greedy proof.',
    commonMistake: 'Attempting to run Dijkstra on graphs with negative weights instead of Bellman-Ford or SPFA.',
    tags: ['graphs', 'dijkstra', 'greedy', 'invariants']
  },
  {
    id: 'c-67-bellman-ford-negative-cycles',
    squareId: 67,
    title: 'Bellman-Ford & Negative Weight Cycle Detection',
    topic: 'Graph Algorithms',
    subtopic: 'Dynamic Programming on Graphs',
    skillCategory: 'complexity',
    difficulty: 'hard',
    type: 'complexity_choice',
    prompt: 'Bellman-Ford relaxes all E edges (V - 1) times. Why does relaxing edges a V-th time detect the presence of a reachable negative-weight cycle?',
    options: [
      'In a graph without negative cycles, any shortest path contains at most V - 1 edges; if an edge can still be relaxed on the V-th pass, a negative cycle must exist',
      'The V-th pass inverts the edge weights to positive values',
      'V-1 edges cannot span all vertices in a disconnected graph',
      'The priority queue overflows on the V-th iteration'
    ],
    correctOptionIndex: 0,
    hints: [
      'A simple path visiting V vertices can have at most V - 1 edges without repeating a vertex.',
      'If repeating a vertex makes the total path weight smaller, what does that mean?',
      'It means spinning around that loop decreases total cost indefinitely (negative cycle).'
    ],
    explanation: 'Any shortest path without cycles touches at most V vertices, meaning it contains at most V - 1 edges. Therefore, V - 1 relaxation iterations guarantee shortest paths for all reachable vertices. If any distance can still decrease on the V-th iteration (`dist[u] + w < dist[v]`), a negative cycle must exist.',
    learningObjective: 'Understand the edge-bound theorem in shortest path theory and negative cycle detection.',
    commonMistake: 'Believing shortest paths can be defined in graphs with negative weight cycles reachable from the source.',
    tags: ['graphs', 'bellman-ford', 'complexity']
  },
  {
    id: 'c-68-dsu-path-compression-rank',
    squareId: 68,
    title: 'Disjoint Set Union (DSU): Near O(1) Amortized Time',
    topic: 'Graph Algorithms',
    subtopic: 'Disjoint Set Union (Union-Find)',
    skillCategory: 'complexity',
    difficulty: 'medium',
    type: 'complexity_choice',
    prompt: 'When Disjoint Set Union (DSU) incorporates BOTH Path Compression and Union by Rank (or Size), what is its amortized time complexity per operation?',
    options: [
      'O(alpha(N)) where alpha is the Inverse Ackermann function (practically <= 4 for all universe sizes)',
      'Strictly O(1) worst-case time per operation',
      'O(log N) worst-case time',
      'O(N) amortized time'
    ],
    correctOptionIndex: 0,
    hints: [
      'Path compression flattens the tree during find.',
      'Union by rank attaches the shorter tree under the taller tree.',
      'Together, they achieve an almost constant bound denoted by alpha(N).'
    ],
    explanation: 'Tarjan proved that combining Path Compression (`parent[x] = find(parent[x])`) and Union by Rank bounds the amortized cost per operation to O(alpha(N)), where alpha is the Inverse Ackermann function. For any conceivable input size (even N = 10^80, atoms in universe), alpha(N) < 5, making it practically constant.',
    learningObjective: 'Master the Inverse Ackermann complexity bound for optimized Disjoint Set Union.',
    commonMistake: 'Omitting path compression, which allows the tree to degenerate into an O(N) chain.',
    tags: ['graphs', 'dsu', 'union-find', 'complexity']
  },
  {
    id: 'c-69-kruskal-mst-greedy',
    squareId: 69,
    title: 'Kruskal\'s Minimum Spanning Tree (MST)',
    topic: 'Graph Algorithms',
    subtopic: 'Greedy Minimum Spanning Trees',
    skillCategory: 'conceptual',
    difficulty: 'medium',
    type: 'conceptual_mcq',
    prompt: 'In Kruskal\'s algorithm for Minimum Spanning Trees, what role does the Disjoint Set Union (DSU) structure play?',
    options: [
      'It checks in O(alpha(V)) whether the two endpoints of the lowest-weight edge already belong to the same connected component, preventing cycles',
      'It sorts all edges in ascending order of their weights',
      'It computes the shortest paths from the source vertex to all other vertices',
      'It calculates the degree of each vertex in the graph'
    ],
    correctOptionIndex: 0,
    hints: [
      'Kruskal considers edges from smallest weight to largest weight.',
      'If adding edge (u, v) creates a cycle, it must be rejected.',
      'How do we check if u and v are already connected? `find(u) === find(v)`.'
    ],
    explanation: 'Kruskal\'s sorts all E edges by weight. To form an MST without cycles, it iteratively picks the smallest available edge. It queries DSU: if `find(u) !== find(v)`, the edge connects two previously disjoint components; it is added to the MST and `union(u, v)` merges them. If they share a root, adding the edge would form a cycle.',
    learningObjective: 'Synthesize greedy edge ordering with DSU cycle avoidance in Kruskal\'s algorithm.',
    commonMistake: 'Assuming Kruskal\'s requires starting from an arbitrary root node like Prim\'s algorithm.',
    tags: ['graphs', 'kruskal', 'mst', 'greedy']
  },
  {
    id: 'c-70-prims-mst-cut-property',
    squareId: 70,
    title: 'Prim\'s Algorithm & The Cut Property',
    topic: 'Graph Algorithms',
    subtopic: 'Cut Property in Minimum Spanning Trees',
    skillCategory: 'conceptual',
    difficulty: 'hard',
    type: 'conceptual_mcq',
    prompt: 'The correctness of both Prim\'s and Kruskal\'s MST algorithms rests on the "Cut Property". What does the Cut Property state?',
    options: [
      'For any partition (cut) of vertices into two non-empty sets S and V-S, the minimum-weight edge crossing the cut must belong to some Minimum Spanning Tree',
      'Cutting any vertex from a tree produces two equal-sized subtrees',
      'The minimum spanning tree can be found by cutting the maximum weight cycle edge',
      'A cut in a graph always contains an even number of edges'
    ],
    correctOptionIndex: 0,
    hints: [
      'Divide vertices into two sets: visited S, and unvisited V - S.',
      'To connect these two sets, at least one crossing edge MUST be chosen.',
      'A greedy choice of the cheapest crossing edge is guaranteed to be safe.'
    ],
    explanation: 'The Cut Property theorem states that for any cut (partition of vertices into S and V-S), the lightest edge crossing between S and V-S can be safely included in the MST. Prim\'s algorithm repeatedly expands a single cut (visited vs unvisited), picking the minimum crossing edge via a priority queue.',
    learningObjective: 'Understand the mathematical Cut Property underpinning greedy MST algorithms.',
    commonMistake: 'Confusing the Cut Property with the Cycle Property (which states the heaviest edge in a cycle is never in the MST).',
    tags: ['graphs', 'mst', 'prims', 'theory']
  }
];
