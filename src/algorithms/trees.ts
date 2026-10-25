/**
 * Tree Data Structures: Binary Search Tree & AVL Trees (CO4)
 */

export class BSTNode {
  public val: number;
  public left: BSTNode | null = null;
  public right: BSTNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}

export class BinarySearchTree {
  public root: BSTNode | null = null;

  public insert(val: number): void {
    const newNode = new BSTNode(val);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) {
          curr.left = newNode;
          break;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = newNode;
          break;
        }
        curr = curr.right;
      }
    }
  }

  public search(val: number): boolean {
    let curr = this.root;
    while (curr) {
      if (curr.val === val) return true;
      if (val < curr.val) curr = curr.left;
      else curr = curr.right;
    }
    return false;
  }

  public inOrder(): number[] {
    const result: number[] = [];
    function traverse(node: BSTNode | null) {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  public preOrder(): number[] {
    const result: number[] = [];
    function traverse(node: BSTNode | null) {
      if (!node) return;
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  public postOrder(): number[] {
    const result: number[] = [];
    function traverse(node: BSTNode | null) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }
}

/**
 * AVL Tree Node & Self-Balancing Operations (CO4)
 */
export class AVLNode {
  public val: number;
  public height: number;
  public left: AVLNode | null = null;
  public right: AVLNode | null = null;

  constructor(val: number) {
    this.val = val;
    this.height = 1;
  }
}

export type RotationType = 'LL' | 'RR' | 'LR' | 'RL' | 'NONE';

export class AVLTree {
  public root: AVLNode | null = null;

  public getHeight(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  public getBalance(node: AVLNode | null): number {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  private updateHeight(node: AVLNode): void {
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  public rightRotate(y: AVLNode): AVLNode {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  public leftRotate(x: AVLNode): AVLNode {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  public insert(val: number): { root: AVLNode; rotationApplied: RotationType } {
    let rotation: RotationType = 'NONE';

    const insertNode = (node: AVLNode | null, value: number): AVLNode => {
      if (!node) return new AVLNode(value);

      if (value < node.val) {
        node.left = insertNode(node.left, value);
      } else if (value > node.val) {
        node.right = insertNode(node.right, value);
      } else {
        return node; // Duplicate values not allowed in standard AVL
      }

      this.updateHeight(node);
      const balance = this.getBalance(node);

      // LL Case: Left Left -> Right Rotate
      if (balance > 1 && value < node.left!.val) {
        rotation = 'LL';
        return this.rightRotate(node);
      }

      // RR Case: Right Right -> Left Rotate
      if (balance < -1 && value > node.right!.val) {
        rotation = 'RR';
        return this.leftRotate(node);
      }

      // LR Case: Left Right -> Left Rotate on left child, then Right Rotate on node
      if (balance > 1 && value > node.left!.val) {
        rotation = 'LR';
        node.left = this.leftRotate(node.left!);
        return this.rightRotate(node);
      }

      // RL Case: Right Left -> Right Rotate on right child, then Left Rotate on node
      if (balance < -1 && value < node.right!.val) {
        rotation = 'RL';
        node.right = this.rightRotate(node.right!);
        return this.leftRotate(node);
      }

      return node;
    };

    this.root = insertNode(this.root, val);
    return { root: this.root, rotationApplied: rotation };
  }

  public inOrder(): number[] {
    const result: number[] = [];
    function traverse(node: AVLNode | null) {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }
}
