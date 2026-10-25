/**
 * Array implementation of Linear Queue (CO2)
 */

export class ArrayQueue<T = number> {
  private items: T[];
  private capacity: number;

  constructor(capacity: number = 10) {
    this.capacity = capacity;
    this.items = [];
  }

  public enqueue(item: T): boolean {
    if (this.isFull()) {
      return false; // Queue Overflow
    }
    this.items.push(item);
    return true;
  }

  public dequeue(): T | null {
    if (this.isEmpty()) {
      return null; // Queue Underflow
    }
    return this.items.shift() ?? null;
  }

  public front(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public isFull(): boolean {
    return this.items.length >= this.capacity;
  }

  public size(): number {
    return this.items.length;
  }

  public toArray(): T[] {
    return [...this.items];
  }

  public clear(): void {
    this.items = [];
  }
}
