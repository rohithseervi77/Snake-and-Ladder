/**
 * Array implementation of Stack & Classic Applications (CO2)
 */

export class ArrayStack<T = number> {
  private items: T[];
  private capacity: number;

  constructor(capacity: number = 10) {
    this.capacity = capacity;
    this.items = [];
  }

  public push(item: T): boolean {
    if (this.isFull()) {
      return false; // Overflow
    }
    this.items.push(item);
    return true;
  }

  public pop(): T | null {
    if (this.isEmpty()) {
      return null; // Underflow
    }
    return this.items.pop() ?? null;
  }

  public peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
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

/**
 * Balanced Parentheses application using Stack (CO2)
 */
export function isBalancedParentheses(expression: string): boolean {
  const stack: string[] = [];
  const matchingPairs: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (const char of expression) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (char === ')' || char === '}' || char === ']') {
      if (stack.length === 0) return false;
      const top = stack.pop();
      if (top !== matchingPairs[char]) return false;
    }
  }

  return stack.length === 0;
}

/**
 * Precedence helper for infix to postfix
 */
function precedence(op: string): number {
  if (op === '+' || op === '-') return 1;
  if (op === '*' || op === '/') return 2;
  if (op === '^') return 3;
  return 0;
}

/**
 * Infix to Postfix conversion using Stack (CO2)
 */
export function infixToPostfix(infix: string): string {
  const stack: string[] = [];
  let postfix = '';

  for (const char of infix) {
    if (/[a-zA-Z0-9]/.test(char)) {
      postfix += char;
    } else if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        postfix += stack.pop();
      }
      stack.pop(); // discard '('
    } else if (['+', '-', '*', '/', '^'].includes(char)) {
      while (
        stack.length > 0 &&
        precedence(stack[stack.length - 1]) >= precedence(char)
      ) {
        postfix += stack.pop();
      }
      stack.push(char);
    }
  }

  while (stack.length > 0) {
    postfix += stack.pop();
  }

  return postfix;
}

/**
 * Postfix Evaluation using Stack (CO2)
 */
export function evaluatePostfix(postfix: string): number {
  const stack: number[] = [];
  const tokens = postfix.trim().split(/\s+/);

  for (const token of tokens) {
    if (!token) continue;
    if (!isNaN(Number(token))) {
      stack.push(Number(token));
    } else {
      const b = stack.pop() ?? 0;
      const a = stack.pop() ?? 0;
      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(Math.trunc(a / b));
          break;
        case '^':
          stack.push(Math.pow(a, b));
          break;
      }
    }
  }

  return stack.pop() ?? 0;
}
