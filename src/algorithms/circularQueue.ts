/**
 * Array implementation of Circular Queue (CO2)
 * Demonstrates wrap-around to reuse dequeued slots and solve linear queue fake overflow.
 */

export class CircularQueue<T = number> {
  private buffer: (T | null)[];
  private capacity: number;
  private frontIndex: number;
  private rearIndex: number;
  private count: number;

  constructor(capacity: number = 5) {
    this.capacity = capacity;
    this.buffer = new Array(capacity).fill(null);
    this.frontIndex = -1;
    this.rearIndex = -1;
    this.count = 0;
  }

  public enqueue(item: T): boolean {
    if (this.isFull()) {
      return false; // Circular Queue Overflow
    }

    if (this.isEmpty()) {
      this.frontIndex = 0;
      this.rearIndex = 0;
    } else {
      this.rearIndex = (this.rearIndex + 1) % this.capacity;
    }

    this.buffer[this.rearIndex] = item;
    this.count++;
    return true;
  }

  public dequeue(): T | null {
    if (this.isEmpty()) {
      return null; // Circular Queue Underflow
    }

    const item = this.buffer[this.frontIndex];
    this.buffer[this.frontIndex] = null;

    if (this.frontIndex === this.rearIndex) {
      // Last item removed, reset indices
      this.frontIndex = -1;
      this.rearIndex = -1;
    } else {
      this.frontIndex = (this.frontIndex + 1) % this.capacity;
    }

    this.count--;
    return item;
  }

  public front(): T | null {
    if (this.isEmpty()) return null;
    return this.buffer[this.frontIndex];
  }

  public rear(): T | null {
    if (this.isEmpty()) return null;
    return this.buffer[this.rearIndex];
  }

  public getFrontIndex(): number {
    return this.frontIndex;
  }

  public getRearIndex(): number {
    return this.rearIndex;
  }

  public isEmpty(): boolean {
    return this.count === 0;
  }

  public isFull(): boolean {
    return this.count === this.capacity;
  }

  public size(): number {
    return this.count;
  }

  public getCapacity(): number {
    return this.capacity;
  }

  public getBuffer(): (T | null)[] {
    return [...this.buffer];
  }

  public clear(): void {
    this.buffer = new Array(this.capacity).fill(null);
    this.frontIndex = -1;
    this.rearIndex = -1;
    this.count = 0;
  }
}
