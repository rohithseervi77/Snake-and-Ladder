/**
 * Sorting Algorithms with Step Tracing (CO3)
 * Insertion Sort, Counting Sort, Radix Sort, Merge Sort, Quick Sort, Heap Sort
 */

export interface SortStep {
  stepIndex: number;
  arrayState: number[];
  description: string;
  comparedIndices?: [number, number];
  swappedIndices?: [number, number];
}

/**
 * Insertion Sort: O(n^2) worst/avg, O(n) best (nearly sorted).
 */
export function insertionSortWithSteps(arr: number[]): { sorted: number[]; steps: SortStep[] } {
  const a = [...arr];
  const steps: SortStep[] = [];
  steps.push({ stepIndex: 0, arrayState: [...a], description: 'Initial array state' });

  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
    steps.push({
      stepIndex: steps.length,
      arrayState: [...a],
      description: `Inserted element ${key} into sorted subarray [0..${i}]`
    });
  }

  return { sorted: a, steps };
}

/**
 * Counting Sort: O(n + k) non-comparison sort for non-negative integers bounded by maxVal.
 */
export function countingSort(arr: number[]): number[] {
  if (arr.length <= 1) return [...arr];
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;

  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }

  return output;
}

/**
 * Radix Sort: LSD (Least Significant Digit) using Counting Sort as subroutine.
 * Complexity: O(d * (n + b))
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length <= 1) return [...arr];
  const a = [...arr];
  const max = Math.max(...a);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(a.length).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < a.length; i++) {
      const digit = Math.floor(a[i] / exp) % 10;
      count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = a.length - 1; i >= 0; i--) {
      const digit = Math.floor(a[i] / exp) % 10;
      output[count[digit] - 1] = a[i];
      count[digit]--;
    }

    for (let i = 0; i < a.length; i++) {
      a[i] = output[i];
    }
  }

  return a;
}

/**
 * Merge Sort: O(n log n) divide-and-conquer with stable partitioning.
 */
export function mergeSortWithSteps(arr: number[]): { sorted: number[]; steps: SortStep[] } {
  const steps: SortStep[] = [];
  const a = [...arr];
  steps.push({ stepIndex: 0, arrayState: [...a], description: 'Initial array state' });

  function merge(low: number, mid: number, high: number) {
    const left = a.slice(low, mid + 1);
    const right = a.slice(mid + 1, high + 1);
    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
      }
    }
    while (i < left.length) a[k++] = left[i++];
    while (j < right.length) a[k++] = right[j++];

    steps.push({
      stepIndex: steps.length,
      arrayState: [...a],
      description: `Merged subarrays [${low}..${mid}] and [${mid + 1}..${high}]`
    });
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      sort(low, mid);
      sort(mid + 1, high);
      merge(low, mid, high);
    }
  }

  sort(0, a.length - 1);
  return { sorted: a, steps };
}

/**
 * Quick Sort: O(n log n) average, O(n^2) worst case with Lomuto partition.
 */
export function quickSortWithSteps(arr: number[]): { sorted: number[]; steps: SortStep[] } {
  const steps: SortStep[] = [];
  const a = [...arr];
  steps.push({ stepIndex: 0, arrayState: [...a], description: 'Initial array state' });

  function partition(low: number, high: number): number {
    const pivot = a[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (a[j] <= pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({
      stepIndex: steps.length,
      arrayState: [...a],
      description: `Partitioned around pivot ${pivot} at index ${i + 1}`
    });
    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  sort(0, a.length - 1);
  return { sorted: a, steps };
}

/**
 * Heap Sort: O(n log n) in-place comparison sort using Max-Heap.
 */
export function heapSortWithSteps(arr: number[]): { sorted: number[]; steps: SortStep[] } {
  const steps: SortStep[] = [];
  const a = [...arr];
  steps.push({ stepIndex: 0, arrayState: [...a], description: 'Initial array state' });

  function heapify(n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && a[left] > a[largest]) largest = left;
    if (right < n && a[right] > a[largest]) largest = right;

    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      heapify(n, largest);
    }
  }

  const n = a.length;
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }
  steps.push({ stepIndex: steps.length, arrayState: [...a], description: 'Built initial Max-Heap' });

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    heapify(i, 0);
    steps.push({
      stepIndex: steps.length,
      arrayState: [...a],
      description: `Extracted max element to index ${i} and restored heap`
    });
  }

  return { sorted: a, steps };
}
