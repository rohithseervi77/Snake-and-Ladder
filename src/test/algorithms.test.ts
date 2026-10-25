import { describe, it, expect } from 'vitest';
import { ArrayStack, isBalancedParentheses, infixToPostfix, evaluatePostfix } from '../algorithms/stack';
import { ArrayQueue } from '../algorithms/queue';
import { CircularQueue } from '../algorithms/circularQueue';
import { SinglyLinkedList, DoublyLinkedList, addPolynomials } from '../algorithms/linkedList';
import { 
  insertionSortWithSteps, 
  countingSort, 
  radixSort, 
  mergeSortWithSteps, 
  quickSortWithSteps, 
  heapSortWithSteps 
} from '../algorithms/sorting';
import { 
  linearSearchWithSteps, 
  binarySearchWithSteps, 
  jumpSearchWithSteps, 
  HashTableChaining 
} from '../algorithms/searching';
import { BinarySearchTree, AVLTree } from '../algorithms/trees';
import { Graph, buildHuffmanTree, generateHuffmanCodes, matrixChainOrder } from '../algorithms/graphs';
import { solveMasterTheorem, getRecurrenceTreeLevelInfo } from '../algorithms/recurrence';

describe('Syllabus Algorithms Unit Verification', () => {

  describe('CO1 — Recurrence & Master Theorem', () => {
    it('solves Master Theorem Case 1: T(n) = 8T(n/2) + O(n^2) -> Θ(n^3)', () => {
      const res = solveMasterTheorem(8, 2, 2);
      expect(res.caseMatched).toBe(1);
      expect(res.complexity).toBe('Θ(n^3)');
      expect(res.log_b_a).toBe(3);
    });

    it('solves Master Theorem Case 2: T(n) = 2T(n/2) + O(n) -> Θ(n log n)', () => {
      const res = solveMasterTheorem(2, 2, 1);
      expect(res.caseMatched).toBe(2);
      expect(res.complexity).toBe('Θ(n log n)');
    });

    it('solves Master Theorem Case 3: T(n) = 2T(n/2) + O(n^2) -> Θ(n^2)', () => {
      const res = solveMasterTheorem(2, 2, 2);
      expect(res.caseMatched).toBe(3);
      expect(res.complexity).toBe('Θ(n^2)');
    });

    it('computes Recurrence Tree level info correctly', () => {
      const level2 = getRecurrenceTreeLevelInfo(2, 2, 2);
      expect(level2.subproblems).toBe(4); // 2^2
      expect(level2.subproblemSizeFraction).toBe('n / 4');
    });
  });

  describe('CO2 — Stacks & Expressions', () => {
    it('verifies ArrayStack LIFO operations and bounds', () => {
      const stack = new ArrayStack<number>(3);
      expect(stack.isEmpty()).toBe(true);
      stack.push(10);
      stack.push(20);
      stack.push(30);
      expect(stack.isFull()).toBe(true);
      expect(stack.peek()).toBe(30);
      expect(stack.pop()).toBe(30);
      expect(stack.pop()).toBe(20);
      expect(stack.pop()).toBe(10);
      expect(stack.pop()).toBeNull(); // Underflow guard
    });

    it('checks balanced parentheses correctly', () => {
      expect(isBalancedParentheses('{[()]}')).toBe(true);
      expect(isBalancedParentheses('{[}]')).toBe(false);
      expect(isBalancedParentheses('(((')).toBe(false);
    });

    it('converts infix to postfix and evaluates postfix expressions', () => {
      const postfix = infixToPostfix('a+b*(c-d)');
      expect(postfix).toBe('abcd-*+');
      const val = evaluatePostfix('3 4 2 * 1 5 - / +');
      expect(val).toBe(1); // 3 + (8 / -4) = 3 + (-2) = 1
    });
  });

  describe('CO2 — Queues & Circular Queues', () => {
    it('verifies FIFO Queue operations', () => {
      const q = new ArrayQueue<string>(3);
      q.enqueue('A');
      q.enqueue('B');
      expect(q.front()).toBe('A');
      expect(q.dequeue()).toBe('A');
      expect(q.dequeue()).toBe('B');
      expect(q.isEmpty()).toBe(true);
    });

    it('verifies Circular Queue modulo wrap-around', () => {
      const cq = new CircularQueue<number>(3);
      cq.enqueue(10);
      cq.enqueue(20);
      cq.enqueue(30);
      expect(cq.isFull()).toBe(true);
      expect(cq.dequeue()).toBe(10);
      cq.enqueue(40); // wraps around
      expect(cq.getBuffer()).toEqual([40, 20, 30]);
      expect(cq.front()).toBe(20);
      expect(cq.rear()).toBe(40);
    });
  });

  describe('CO2 — Linked Lists & Polynomials', () => {
    it('verifies Singly Linked List insertion and search', () => {
      const sll = new SinglyLinkedList<number>();
      sll.insertAtTail(10);
      sll.insertAtTail(20);
      sll.insertAtHead(5);
      expect(sll.toArray()).toEqual([5, 10, 20]);
      expect(sll.search(10)).toBe(true);
      expect(sll.search(99)).toBe(false);
    });

    it('verifies Doubly Linked List backward and forward traversal', () => {
      const dll = new DoublyLinkedList<number>();
      dll.insertAtTail(1);
      dll.insertAtTail(2);
      dll.insertAtTail(3);
      expect(dll.toArray()).toEqual([1, 2, 3]);
      expect(dll.toReverseArray()).toEqual([3, 2, 1]);
    });

    it('adds polynomials using linked lists', () => {
      const p1 = [
        { coeff: 3, exp: 2 },
        { coeff: 5, exp: 1 },
        { coeff: 1, exp: 0 }
      ];
      const p2 = [
        { coeff: 4, exp: 2 },
        { coeff: 2, exp: 0 }
      ];
      const result = addPolynomials(p1, p2);
      expect(result).toEqual([
        { coeff: 7, exp: 2 },
        { coeff: 5, exp: 1 },
        { coeff: 3, exp: 0 }
      ]);
    });
  });

  describe('CO3 — Sorting Algorithms', () => {
    const raw = [38, 27, 43, 3, 9, 82, 10];
    const sorted = [3, 9, 10, 27, 38, 43, 82];

    it('verifies insertion sort', () => {
      const res = insertionSortWithSteps([...raw]);
      expect(res.sorted).toEqual(sorted);
    });

    it('verifies merge sort', () => {
      const res = mergeSortWithSteps([...raw]);
      expect(res.sorted).toEqual(sorted);
    });

    it('verifies quick sort', () => {
      const res = quickSortWithSteps([...raw]);
      expect(res.sorted).toEqual(sorted);
    });

    it('verifies heap sort', () => {
      const res = heapSortWithSteps([...raw]);
      expect(res.sorted).toEqual(sorted);
    });

    it('verifies counting sort', () => {
      const res = countingSort([4, 2, 2, 8, 3, 3, 1]);
      expect(res).toEqual([1, 2, 2, 3, 3, 4, 8]);
    });

    it('verifies radix sort', () => {
      const res = radixSort([170, 45, 75, 90, 802, 24, 2, 66]);
      expect(res).toEqual([2, 24, 45, 66, 75, 90, 170, 802]);
    });
  });

  describe('CO3 — Searching Algorithms & Hashing', () => {
    const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

    it('verifies linear search', () => {
      expect(linearSearchWithSteps(arr, 23).foundIndex).toBe(5);
      expect(linearSearchWithSteps(arr, 99).foundIndex).toBe(-1);
    });

    it('verifies binary search', () => {
      expect(binarySearchWithSteps(arr, 23).foundIndex).toBe(5);
      expect(binarySearchWithSteps(arr, 99).foundIndex).toBe(-1);
    });

    it('verifies jump search', () => {
      expect(jumpSearchWithSteps(arr, 23).foundIndex).toBe(5);
      expect(jumpSearchWithSteps(arr, 99).foundIndex).toBe(-1);
    });

    it('verifies Hash Table with separate chaining', () => {
      const ht = new HashTableChaining<number>(7);
      ht.insert('apple', 100);
      ht.insert('banana', 200);
      expect(ht.get('apple')).toBe(100);
      expect(ht.get('banana')).toBe(200);
      expect(ht.get('cherry')).toBeNull();
    });
  });

  describe('CO4 — Trees & AVL', () => {
    it('verifies Binary Search Tree insertion and in-order sort', () => {
      const bst = new BinarySearchTree();
      [50, 30, 70, 20, 40, 60, 80].forEach(k => bst.insert(k));
      expect(bst.inOrder()).toEqual([20, 30, 40, 50, 60, 70, 80]);
      expect(bst.search(40)).toBe(true);
      expect(bst.search(99)).toBe(false);
    });

    it('verifies AVL Tree self-balancing with rotations', () => {
      const avl = new AVLTree();
      // Insert in ascending order (triggers RR rotation, rebalancing height)
      [10, 20, 30].forEach(k => avl.insert(k));
      expect(avl.inOrder()).toEqual([10, 20, 30]);
      expect(avl.root?.val).toBe(20); // 20 becomes new balanced root
      expect(avl.getHeight(avl.root)).toBe(2);
    });
  });

  describe('CO4 — Graphs & Algorithm Design', () => {
    it('verifies Graph BFS and DFS traversals', () => {
      const g = new Graph();
      g.addVertex('A');
      g.addVertex('B');
      g.addVertex('C');
      g.addVertex('D');
      g.addEdge('A', 'B', 1);
      g.addEdge('A', 'C', 1);
      g.addEdge('B', 'D', 1);
      g.addEdge('C', 'D', 1);

      const bfsOrder = g.bfs('A');
      expect(bfsOrder).toEqual(['A', 'B', 'C', 'D']);

      const dfsOrder = g.dfs('A');
      expect(dfsOrder[0]).toBe('A');
      expect(dfsOrder.length).toBe(4);
    });

    it('computes shortest paths using Dijkstra algorithm', () => {
      const g = new Graph();
      ['A', 'B', 'C', 'D'].forEach(v => g.addVertex(v));
      g.addEdge('A', 'B', 4);
      g.addEdge('A', 'C', 2);
      g.addEdge('C', 'B', 1);
      g.addEdge('B', 'D', 5);
      g.addEdge('C', 'D', 8);

      const dists = g.dijkstra('A');
      expect(dists.get('A')).toBe(0);
      expect(dists.get('C')).toBe(2);
      expect(dists.get('B')).toBe(3); // A -> C (2) + C -> B (1) = 3
      expect(dists.get('D')).toBe(8); // A -> C -> B -> D = 3 + 5 = 8
    });

    it('computes Minimum Spanning Tree using Prim algorithm', () => {
      const g = new Graph();
      ['A', 'B', 'C', 'D'].forEach(v => g.addVertex(v));
      g.addEdge('A', 'B', 1);
      g.addEdge('B', 'C', 2);
      g.addEdge('C', 'D', 3);
      g.addEdge('A', 'D', 10);

      const mst = g.prim('A');
      expect(mst.totalWeight).toBe(6); // 1 + 2 + 3 = 6
      expect(mst.mstEdges.length).toBe(3); // V - 1 edges
    });

    it('builds Huffman Coding Tree correctly', () => {
      const freqs = { A: 5, B: 9, C: 12, D: 13, E: 16, F: 45 };
      const root = buildHuffmanTree(freqs);
      expect(root).not.toBeNull();
      expect(root?.freq).toBe(100);
      const codes = generateHuffmanCodes(root);
      expect(codes['F'].length).toBe(1); // highest frequency gets 1 bit
    });

    it('solves Matrix Chain Multiplication optimal parenthesization', () => {
      // Matrices: A1 (10x30), A2 (30x5), A3 (5x60)
      const dims = [10, 30, 5, 60];
      const minMults = matrixChainOrder(dims);
      expect(minMults).toBe(4500);
    });
  });
});
