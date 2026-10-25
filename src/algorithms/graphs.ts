/**
 * Graph Algorithms, Traversals, Shortest Path & MST (CO4)
 * BFS, DFS, Dijkstra, Prim, Kruskal, Huffman Coding
 */

export interface Edge {
  u: string;
  v: string;
  weight: number;
}

export class Graph {
  public adjList: Map<string, Array<{ node: string; weight: number }>>;

  constructor() {
    this.adjList = new Map();
  }

  public addVertex(v: string): void {
    if (!this.adjList.has(v)) {
      this.adjList.set(v, []);
    }
  }

  public addEdge(u: string, v: string, weight: number = 1, directed: boolean = false): void {
    this.addVertex(u);
    this.addVertex(v);
    this.adjList.get(u)!.push({ node: v, weight });
    if (!directed) {
      this.adjList.get(v)!.push({ node: u, weight });
    }
  }

  /**
   * Breadth-First Search (BFS) using Queue (FIFO)
   */
  public bfs(start: string): string[] {
    const visited = new Set<string>();
    const queue: string[] = [start];
    const order: string[] = [];

    visited.add(start);

    while (queue.length > 0) {
      const u = queue.shift()!;
      order.push(u);

      const neighbors = this.adjList.get(u) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          queue.push(neighbor.node);
        }
      }
    }

    return order;
  }

  /**
   * Depth-First Search (DFS) using Call Stack / LIFO
   */
  public dfs(start: string): string[] {
    const visited = new Set<string>();
    const order: string[] = [];

    const traverse = (u: string) => {
      visited.add(u);
      order.push(u);

      const neighbors = this.adjList.get(u) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.node)) {
          traverse(neighbor.node);
        }
      }
    };

    traverse(start);
    return order;
  }

  /**
   * Dijkstra's Algorithm: Single-source shortest path with non-negative edge weights
   */
  public dijkstra(start: string): Map<string, number> {
    const distances = new Map<string, number>();
    const unvisited = new Set<string>();

    for (const v of this.adjList.keys()) {
      distances.set(v, Infinity);
      unvisited.add(v);
    }
    distances.set(start, 0);

    while (unvisited.size > 0) {
      // Find unvisited vertex with minimum distance
      let minNode: string | null = null;
      let minDist = Infinity;

      for (const node of unvisited) {
        const dist = distances.get(node)!;
        if (dist < minDist) {
          minDist = dist;
          minNode = node;
        }
      }

      if (!minNode || minDist === Infinity) break;

      unvisited.delete(minNode);

      const neighbors = this.adjList.get(minNode) || [];
      for (const neighbor of neighbors) {
        if (unvisited.has(neighbor.node)) {
          const newDist = minDist + neighbor.weight;
          if (newDist < distances.get(neighbor.node)!) {
            distances.set(neighbor.node, newDist);
          }
        }
      }
    }

    return distances;
  }

  /**
   * Prim's Minimum Spanning Tree (MST)
   */
  public prim(start: string): { mstEdges: Edge[]; totalWeight: number } {
    const inMST = new Set<string>([start]);
    const mstEdges: Edge[] = [];
    let totalWeight = 0;
    const totalVertices = this.adjList.size;

    while (inMST.size < totalVertices) {
      let minEdge: Edge | null = null;

      for (const u of inMST) {
        const neighbors = this.adjList.get(u) || [];
        for (const neighbor of neighbors) {
          if (!inMST.has(neighbor.node)) {
            if (!minEdge || neighbor.weight < minEdge.weight) {
              minEdge = { u, v: neighbor.node, weight: neighbor.weight };
            }
          }
        }
      }

      if (!minEdge) break; // Disconnected graph

      inMST.add(minEdge.v);
      mstEdges.push(minEdge);
      totalWeight += minEdge.weight;
    }

    return { mstEdges, totalWeight };
  }
}

/**
 * Huffman Coding: Frequency Node & Prefix Code Generator (CO4)
 */
export interface HuffmanNode {
  char?: string;
  freq: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
}

export function buildHuffmanTree(frequencies: Record<string, number>): HuffmanNode | null {
  const heap: HuffmanNode[] = Object.entries(frequencies).map(([char, freq]) => ({
    char,
    freq
  }));

  if (heap.length === 0) return null;

  while (heap.length > 1) {
    heap.sort((a, b) => a.freq - b.freq);
    const left = heap.shift()!;
    const right = heap.shift()!;
    const parent: HuffmanNode = {
      freq: left.freq + right.freq,
      left,
      right
    };
    heap.push(parent);
  }

  return heap[0];
}

export function generateHuffmanCodes(root: HuffmanNode | null): Record<string, string> {
  const codes: Record<string, string> = {};
  function traverse(node: HuffmanNode | undefined, code: string) {
    if (!node) return;
    if (node.char !== undefined) {
      codes[node.char] = code || '0';
      return;
    }
    traverse(node.left, code + '0');
    traverse(node.right, code + '1');
  }
  traverse(root ?? undefined, '');
  return codes;
}

/**
 * Matrix Chain Multiplication (Ordering Matrix Multiplication - CO4)
 * Returns the minimum number of scalar multiplications needed to multiply a chain of matrices.
 * Dimensions array p of size n+1 where matrix i has dimension p[i-1] x p[i].
 */
export function matrixChainOrder(p: number[]): number {
  const n = p.length - 1;
  const m: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let L = 2; L <= n; L++) {
    for (let i = 0; i < n - L + 1; i++) {
      const j = i + L - 1;
      m[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        const cost = m[i][k] + m[k + 1][j] + p[i] * p[k + 1] * p[j + 1];
        if (cost < m[i][j]) {
          m[i][j] = cost;
        }
      }
    }
  }

  return m[0][n - 1];
}
