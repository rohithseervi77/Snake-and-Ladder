export interface AlgorithmCard {
  id: string;
  name: string;
  category: 'Searching' | 'Sorting' | 'Graphs' | 'Trees';
  co: 'CO1' | 'CO2' | 'CO3' | 'CO4';
  purpose: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  whenToUse: string;
  keyInvariant: string;
}

export const ALGORITHM_CARDS: AlgorithmCard[] = [
  {
    id: 'card-binary-search',
    name: 'Binary Search',
    category: 'Searching',
    co: 'CO3',
    purpose: 'Search for a target value in a sorted array by repeatedly dividing the search interval in half.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1) iterative / O(log n) recursive call stack',
    whenToUse: 'When array is already sorted and random access by index is available in O(1) time.',
    keyInvariant: 'If target exists, it is guaranteed to lie within the current interval [low..high].'
  },
  {
    id: 'card-jump-search',
    name: 'Jump Search',
    category: 'Searching',
    co: 'CO3',
    purpose: 'Search a sorted array by jumping forward by fixed block steps of size sqrt(n), then scanning linearly backward.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(sqrt(n))',
      worst: 'O(sqrt(n))'
    },
    spaceComplexity: 'O(1)',
    whenToUse: 'When binary search backward jumps are costly (e.g. tape drives or single-direction streams).',
    keyInvariant: 'Optimal step size m = floor(sqrt(n)) minimizes total jump and linear scan operations.'
  },
  {
    id: 'card-merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    co: 'CO3',
    purpose: 'Divide-and-conquer sorting algorithm that divides array in half, sorts recursively, and merges sorted subarrays.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n) auxiliary array',
    whenToUse: 'When guaranteed worst-case O(n log n) performance and stable sorting are required.',
    keyInvariant: 'Subarrays [low..mid] and [mid+1..high] are sorted before the merge step combines them.'
  },
  {
    id: 'card-quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    co: 'CO3',
    purpose: 'In-place divide-and-conquer sorting algorithm that partitions elements around a chosen pivot.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n^2) (skewed partitions)'
    },
    spaceComplexity: 'O(log n) recursion call stack',
    whenToUse: 'General-purpose in-place sorting where low memory overhead and high cache locality are desired.',
    keyInvariant: 'After partitioning, pivot is placed at its final sorted position; left <= pivot and right > pivot.'
  },
  {
    id: 'card-heap-sort',
    name: 'Heap Sort',
    category: 'Sorting',
    co: 'CO3',
    purpose: 'Comparison sort that builds a binary Max-Heap and repeatedly extracts the root maximum to the end of the array.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1) in-place',
    whenToUse: 'When you need guaranteed O(n log n) time like Merge Sort, but cannot afford O(n) extra memory.',
    keyInvariant: 'Every parent node at index i satisfies arr[i] >= arr[2i+1] and arr[i] >= arr[2i+2].'
  },
  {
    id: 'card-bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'Graphs',
    co: 'CO4',
    purpose: 'Traverse or search graph vertices level-by-level using a FIFO Queue.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V) for queue and visited set',
    whenToUse: 'Finding the shortest path in unweighted graphs or finding all vertices at distance d.',
    keyInvariant: 'All vertices at distance d from source are visited before any vertex at distance d+1.'
  },
  {
    id: 'card-dfs',
    name: 'Depth-First Search (DFS)',
    category: 'Graphs',
    co: 'CO4',
    purpose: 'Traverse or search graph by exploring as deep as possible along each branch before backtracking.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V) for call stack and visited set',
    whenToUse: 'Detecting graph cycles, topological sorting, finding connected components, and solving mazes.',
    keyInvariant: 'Back edges discovered during directed DFS identify cycles in the graph.'
  },
  {
    id: 'card-dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'Graphs',
    co: 'CO4',
    purpose: 'Single-source shortest path algorithm for graphs with non-negative edge weights using a Min-Heap.',
    timeComplexity: {
      best: 'O(V log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)'
    },
    spaceComplexity: 'O(V) distances and priority queue',
    whenToUse: 'Routing, GPS navigation, and network latency optimization with non-negative weights.',
    keyInvariant: 'Once a vertex u is extracted from the min-heap, its recorded shortest distance dist[u] is final.'
  },
  {
    id: 'card-prim',
    name: "Prim's Algorithm",
    category: 'Graphs',
    co: 'CO4',
    purpose: 'Greedy algorithm that finds a Minimum Spanning Tree (MST) by growing a single connected tree from a starting vertex.',
    timeComplexity: {
      best: 'O(V log V)',
      average: 'O(E log V)',
      worst: 'O(E log V)'
    },
    spaceComplexity: 'O(V)',
    whenToUse: 'Designing minimum cost physical networks (cables, piping, roads) on dense graphs.',
    keyInvariant: 'The cut property: the minimum weight edge crossing from tree vertices to non-tree vertices must belong to the MST.'
  },
  {
    id: 'card-kruskal',
    name: "Kruskal's Algorithm",
    category: 'Graphs',
    co: 'CO4',
    purpose: 'Greedy algorithm that finds a Minimum Spanning Tree (MST) by sorting edges and adding non-cyclical edges.',
    timeComplexity: {
      best: 'O(E log E)',
      average: 'O(E log E)',
      worst: 'O(E log E)'
    },
    spaceComplexity: 'O(V + E)',
    whenToUse: 'Finding MST in sparse graphs with few edges (E << V^2).',
    keyInvariant: 'Edges are considered in non-decreasing weight order; exactly V - 1 non-cyclical edges are added.'
  },
  {
    id: 'card-huffman',
    name: 'Huffman Coding',
    category: 'Trees',
    co: 'CO4',
    purpose: 'Greedy algorithm that builds an optimal variable-length prefix code tree for lossless data compression.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    whenToUse: 'Data compression (JPEG, MP3, ZIP) where character frequencies vary widely.',
    keyInvariant: 'Prefix property: no character code is a prefix of another code, enabling instantaneous unambiguous decoding.'
  }
];
