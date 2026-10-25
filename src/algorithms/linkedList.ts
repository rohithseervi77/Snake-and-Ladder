/**
 * Linked Lists: Singly, Doubly, Circular, and Polynomial Addition (CO2)
 */

export class SLLNode<T = number> {
  public value: T;
  public next: SLLNode<T> | null = null;

  constructor(value: T, next: SLLNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export class SinglyLinkedList<T = number> {
  public head: SLLNode<T> | null = null;

  public insertAtHead(value: T): void {
    const newNode = new SLLNode(value, this.head);
    this.head = newNode;
  }

  public insertAtTail(value: T): void {
    const newNode = new SLLNode(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = newNode;
  }

  public deleteValue(value: T): boolean {
    if (!this.head) return false;
    if (this.head.value === value) {
      this.head = this.head.next;
      return true;
    }
    let curr = this.head;
    while (curr.next && curr.next.value !== value) {
      curr = curr.next;
    }
    if (curr.next) {
      curr.next = curr.next.next;
      return true;
    }
    return false;
  }

  public reverse(): void {
    let prev: SLLNode<T> | null = null;
    let curr: SLLNode<T> | null = this.head;
    while (curr) {
      const nextNode: SLLNode<T> | null = curr.next;
      curr.next = prev;
      prev = curr;
      curr = nextNode;
    }
    this.head = prev;
  }

  public search(value: T): boolean {
    let curr = this.head;
    while (curr) {
      if (curr.value === value) return true;
      curr = curr.next;
    }
    return false;
  }

  public toArray(): T[] {
    const result: T[] = [];
    let curr = this.head;
    while (curr) {
      result.push(curr.value);
      curr = curr.next;
    }
    return result;
  }
}

export class DLLNode<T = number> {
  public value: T;
  public prev: DLLNode<T> | null = null;
  public next: DLLNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class DoublyLinkedList<T = number> {
  public head: DLLNode<T> | null = null;
  public tail: DLLNode<T> | null = null;

  public insertAtTail(value: T): void {
    const newNode = new DLLNode(value);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  public deleteValue(value: T): boolean {
    let curr = this.head;
    while (curr) {
      if (curr.value === value) {
        if (curr.prev) curr.prev.next = curr.next;
        else this.head = curr.next;

        if (curr.next) curr.next.prev = curr.prev;
        else this.tail = curr.prev;

        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  public search(value: T): boolean {
    let curr = this.head;
    while (curr) {
      if (curr.value === value) return true;
      curr = curr.next;
    }
    return false;
  }

  public toArray(): T[] {
    const result: T[] = [];
    let curr = this.head;
    while (curr) {
      result.push(curr.value);
      curr = curr.next;
    }
    return result;
  }

  public toReverseArray(): T[] {
    const result: T[] = [];
    let curr = this.tail;
    while (curr) {
      result.push(curr.value);
      curr = curr.prev;
    }
    return result;
  }
}

export class CircularLinkedList<T = number> {
  public head: SLLNode<T> | null = null;

  public insert(value: T): void {
    const newNode = new SLLNode(value);
    if (!this.head) {
      newNode.next = newNode;
      this.head = newNode;
      return;
    }
    let curr = this.head;
    while (curr.next !== this.head) {
      curr = curr.next!;
    }
    curr.next = newNode;
    newNode.next = this.head;
  }

  public toArray(maxElements: number = 10): T[] {
    if (!this.head) return [];
    const result: T[] = [];
    let curr = this.head;
    let count = 0;
    do {
      result.push(curr.value);
      curr = curr.next!;
      count++;
    } while (curr !== this.head && count < maxElements);
    return result;
  }
}

/**
 * Polynomial Term Node: coeff * x^exp
 */
export interface PolyTerm {
  coeff: number;
  exp: number;
}

/**
 * Linked List Application: Polynomial Addition (CO2)
 * Adds two polynomials sorted by descending exponent.
 */
export function addPolynomials(poly1: PolyTerm[], poly2: PolyTerm[]): PolyTerm[] {
  const result: PolyTerm[] = [];
  let i = 0;
  let j = 0;

  while (i < poly1.length && j < poly2.length) {
    if (poly1[i].exp === poly2[j].exp) {
      const sumCoeff = poly1[i].coeff + poly2[j].coeff;
      if (sumCoeff !== 0) {
        result.push({ coeff: sumCoeff, exp: poly1[i].exp });
      }
      i++;
      j++;
    } else if (poly1[i].exp > poly2[j].exp) {
      result.push({ ...poly1[i] });
      i++;
    } else {
      result.push({ ...poly2[j] });
      j++;
    }
  }

  while (i < poly1.length) {
    result.push({ ...poly1[i] });
    i++;
  }

  while (j < poly2.length) {
    result.push({ ...poly2[j] });
    j++;
  }

  return result;
}
