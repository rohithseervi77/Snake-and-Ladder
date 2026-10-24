# 🎲 Code & Ladders — Gamified DSA Learning Platform

> **From Arrays to Advanced DP — 100 Squares, 1 Journey.**  
> *A gamified, responsive Data Structures & Algorithms learning platform built around an interactive 1–100 serpentine board.*

---

## 🌟 Overview & Vision

**Code & Ladders** reimagines the classic 100-square board game into a modern, production-quality educational gaming experience. Rather than dry algorithmic flashcards, players roll the dice, traverse through 10 curated curriculum stages, encounter **Optimization Ladders** that test algorithmic efficiency leaps (e.g. $O(N^2) \to O(N)$), and navigate **Debugging Snakes** that simulate real-world edge cases and runtime pitfalls (off-by-one errors, recursion stack overflows, pointer severing, and operator precedence traps).

---

## 🚀 Key Features

### 1. 💯 100-Square Data-Driven Curriculum
- Exactly 100 uniquely numbered squares with structured metadata, difficulty ratings, checkpoint criteria, and prerequisite chains.
- Spans 10 distinct DSA stages:
  1. **Squares 1–10**: Programming Foundations (Variables, Conditionals, Loops, Functions, I/O)
  2. **Squares 11–20**: Arrays & Strings (Traversal, Two-Pointers, Sliding Window)
  3. **Squares 21–30**: Lists, Stacks & Queues (Pointers, LIFO/FIFO, Ring Buffers, Expression Evaluation)
  4. **Squares 31–40**: Searching & Sorting (Binary Search, Merge Sort, Quick Sort, Big-O Analysis)
  5. **Squares 41–50**: Trees & Heaps (Hierarchical Traversals, Heaps, BST Invariants)
  6. **Squares 51–60**: Hashing, Recursion & Backtracking (Hash Maps, Combinatorial Trees)
  7. **Squares 61–70**: Graph Algorithms (BFS/DFS, Topological Sort, Dijkstra, Prim/Kruskal)
  8. **Squares 71–80**: Greedy Algorithms & Dynamic Programming (Optimal Substructure, Memoization, Grid DP)
  9. **Squares 81–90**: Advanced DSA (Disjoint-Set Union, Segment Trees, AVL Trees, Bitmask DP)
  10. **Squares 91–100**: Interview Mastery & Grandmaster Corridor (System Design, KMP, Knapsack, Finish)

### 2. 🪜 Algorithmic Optimization Ladders
Ladders are not arbitrary shortcuts—they reward genuine algorithmic optimization:
- **Square 10 → 28**: Modular Abstraction & Class Encapsulation Leap
- **Square 36 → 46**: Divide-and-Conquer Breakthrough ($O(N^2)$ Bubble Sort $\to$ $O(N \log N)$ Merge Sort)
- **Square 54 → 67**: Optimal Substructure Acceleration (Greedy Intervals $\to$ Memoized String DP)
- **Square 71 → 88**: State-Space Minimax Alpha-Beta Pruning Leap
- **Square 82 → 92**: Near-Linear Connectivity Leap (Union-Find with Path Compression & Rank)

### 3. 🐍 Debugging Snakes & Edge-Case Traps
Snakes simulate treacherous edge-case failures and runtime bugs:
- **Square 14 → 7**: Variable Scope Shadowing Trap (accidental global counter mutation)
- **Square 19 → 11**: Bitwise Operator Precedence Pitfall (`num & 1 === 0` evaluation bug)
- **Square 50 → 42**: Off-by-One Array Boundary Violation (`arr[arr.length]` out-of-bounds crash)
- **Square 63 → 57**: Severed Pointer Chain in Linked List In-Place Reversal
- **Square 96 → 85**: Degenerate Skewed Tree Call Stack Overflow ($100,000$ recursion depth)

### 4. 🧠 Adaptive Learning Engine
- Transparent, deterministic learner model tracking attempts, accuracy, streaks, and subskills (`conceptual`, `tracing`, `implementation`, `complexity`, `optimization`, `debugging`).
- Generates **explainable recommendations** with concrete evidence:
  > *"Recommended because your recent accuracy in debugging is 0% across 2 attempts. Review loop boundary invariants on Square 14."*

### 5. 🔁 SuperMemo-2 (SM-2) Spaced Repetition
- Calculates spaced review intervals based on learner retrieval quality ($q \in [0, 5]$).
- Interleaves previously mastered topics to combat the forgetting curve.

### 6. 🤖 Live-Board Autoplay Demonstration Mode
- Demonstrates the **actual 100-square board** live (player marker moves square by square, animated dice roll, opens challenge previews, triggers snakes/ladders).
- Supports 3 speeds: **1x**, **2x**, **4x**.
- Controls: **Start**, **Pause**, **Resume**, **Stop**.
- **Mastery Integrity**: Autoplay awards **0 XP** and does **not** grant fake exam mastery.

### 7. 🔊 Web Audio API Synthesizer
- Built-in zero-dependency sound engine synthesizing rolls, step clicks, ladder fanfares, snake slides, and level-up chimes using Web Audio API oscillators.
- Fully controllable volume slider and mute toggle.

### 8. 📱 Responsive Indie Gaming Interface
- Mobile drawer / bottom sheet for small viewports ($320\text{px} - 768\text{px}$).
- Serpentine 10x10 grid with clean pastel palette and dynamic SVG vector paths.
- Accessible focus indicators, keyboard navigation, and reduced-motion toggle.

---

## 🛠️ Tech Stack & Architecture

- **Runtime & Language**: Node.js v24+, TypeScript 5+, React 19
- **Build Tool**: Vite 8 (builds in $< 500\text{ms}$)
- **Styling**: Tailwind CSS v4 with custom dark indie-game palette
- **Icons**: Lucide React
- **Celebrations**: Canvas-Confetti
- **Testing**: Vitest runner (19 automated unit & integration tests)

---

## 📦 Getting Started

### Prerequisites
- Node.js `v18+` or `v20+` (Tested on `v24.22.1`)
- npm `v9+` (Tested on `v11.19.1`)

### Installation
```bash
# Clone the repository
git clone <YOUR_REPO_URL>
cd "Snake and ladder"

# Install dependencies
npm install
```

### Development
```bash
# Start local development server with Hot Module Replacement
npm run dev
```
Open your browser at `http://localhost:5173`.

### Automated Testing
```bash
# Run Vitest test suite
npm test
```

### Production Build
```bash
# Typecheck and compile optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🧪 Automated Test Verification

The suite covers:
- **Game Logic**: Dice boundaries ($1 \dots 6$), serpentine coordinate inversion, step-by-step paths, mandatory checkpoint stops, bounce-back boundaries, and win conditions.
- **Curriculum Completeness**: All 100 squares validated, 10 stages verified, challenge IDs unique, and anti-repetition registry checked.
- **Adaptive Engine**: Bayesian-style learner profile updates, explainable recommendation generation, SM-2 interval expansion, and failure resets.

---

## 🔒 Security & Persistence
- Single-device persistence is stored safely via `localStorage`.
- No sensitive credentials, tokens, or external API secrets are required or stored.
- A safe **Reset Game** modal prevents accidental loss of progress.

---

## 📜 License
MIT License. Built for developers mastering Data Structures and Algorithms.
