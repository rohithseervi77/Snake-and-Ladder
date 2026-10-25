/**
 * Searching Algorithms & Complexity Steps (CO3)
 * Linear Search, Binary Search, Jump Search
 */

export interface SearchStep {
  stepIndex: number;
  lowIndex?: number;
  midIndex?: number;
  highIndex?: number;
  currentIndex?: number;
  currentValue?: number;
  explanation: string;
}

/**
 * Linear Search: O(n) worst/avg, O(1) best.
 */
export function linearSearchWithSteps(arr: number[], target: number): { foundIndex: number; steps: SearchStep[] } {
  const steps: SearchStep[] = [];
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      stepIndex: i + 1,
      currentIndex: i,
      currentValue: arr[i],
      explanation: `Checking index ${i}: element is ${arr[i]} (target: ${target})`
    });
    if (arr[i] === target) {
      return { foundIndex: i, steps };
    }
  }
  return { foundIndex: -1, steps };
}

/**
 * Binary Search: O(log n) on sorted array.
 */
export function binarySearchWithSteps(arr: number[], target: number): { foundIndex: number; steps: SearchStep[] } {
  const steps: SearchStep[] = [];
  let low = 0;
  let high = arr.length - 1;
  let stepCount = 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      stepIndex: stepCount++,
      lowIndex: low,
      midIndex: mid,
      highIndex: high,
      currentValue: arr[mid],
      explanation: `Search range [${low}..${high}], calculated mid index ${mid} with value ${arr[mid]}`
    });

    if (arr[mid] === target) {
      return { foundIndex: mid, steps };
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return { foundIndex: -1, steps };
}

/**
 * Jump Search: O(sqrt(n)) on sorted array with optimal block size m = floor(sqrt(n)).
 */
export function jumpSearchWithSteps(arr: number[], target: number): { foundIndex: number; steps: SearchStep[] } {
  const steps: SearchStep[] = [];
  const n = arr.length;
  const stepSize = Math.floor(Math.sqrt(n));
  let prev = 0;
  let step = stepSize;
  let stepNum = 1;

  while (step < n && arr[Math.min(step, n) - 1] < target) {
    steps.push({
      stepIndex: stepNum++,
      currentIndex: Math.min(step, n) - 1,
      currentValue: arr[Math.min(step, n) - 1],
      explanation: `Jumping by block size ${stepSize}: checked index ${Math.min(step, n) - 1} (${arr[Math.min(step, n) - 1]} < ${target})`
    });
    prev = step;
    step += stepSize;
  }

  // Linear search within the identified block
  while (prev < Math.min(step, n)) {
    steps.push({
      stepIndex: stepNum++,
      currentIndex: prev,
      currentValue: arr[prev],
      explanation: `Linear scan in block at index ${prev}: value is ${arr[prev]}`
    });
    if (arr[prev] === target) {
      return { foundIndex: prev, steps };
    }
    prev++;
  }

  return { foundIndex: -1, steps };
}

/**
 * Hash Table with Separate Chaining (CO3)
 */
export class HashTableChaining<V = string> {
  private size: number;
  private buckets: Array<Array<{ key: number | string; value: V }>>;

  constructor(size: number = 7) {
    this.size = size;
    this.buckets = Array.from({ length: size }, () => []);
  }

  private hash(key: number | string): number {
    if (typeof key === 'number') {
      return Math.abs(key) % this.size;
    }
    let h = 0;
    for (let i = 0; i < key.length; i++) {
      h = (h * 31 + key.charCodeAt(i)) % this.size;
    }
    return h;
  }

  public insert(key: number | string, value: V): void {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    const existing = bucket.find(item => item.key === key);
    if (existing) {
      existing.value = value;
    } else {
      bucket.push({ key, value });
    }
  }

  public get(key: number | string): V | null {
    const idx = this.hash(key);
    const item = this.buckets[idx].find(b => b.key === key);
    return item ? item.value : null;
  }

  public getBuckets(): Array<Array<{ key: number | string; value: V }>> {
    return this.buckets;
  }
}
