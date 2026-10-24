# 🎲 Code & Ladders — Gamified DSA Learning Platform

> **From Arrays to Advanced DP — 100 Squares, 1 Journey.**  
> *A gamified, responsive Data Structures & Algorithms learning platform built around an interactive 1–100 serpentine board.*

---

## 🌟 Overview & Vision

**Code & Ladders** transforms the classic 100-square board game into a modern, academically rigorous educational gaming platform. Rather than dry algorithmic flashcards, players roll the dice, traverse 10 curated curriculum stages, encounter **Optimization Ladders** that test algorithmic efficiency leaps (e.g. $O(N^2) \to O(N)$), navigate **Intelligent Snakes** that test edge-case diagnosis, cast **Algorithm Energy Abilities**, and battle **Regional Bosses** culminating at Tile 100.

---

## 🚀 Key Features

### 1. 💯 100-Square Fully Authored Curriculum
- Exactly 100 uniquely authored questions across all 100 squares (no generic fallback templates).
- Every single challenge contains:
  - 3-Tier Progressive Hints (Tier 1: Concept, Tier 2: Algorithmic Pattern, Tier 3: Concrete Code Anchor)
  - Clear, academic explanation of correctness
  - 🎯 **Core Learning Objective**
  - ⚠️ **Common Trap / Pitfall**
- Spans 10 distinct curriculum stages:
  1. **Squares 1–10**: Foundations & Array Contiguous Memory Invariants
  2. **Squares 11–20**: Two-Pointers, Sliding Window, Prefix Sums, Kadane's Algorithm
  3. **Squares 21–30**: Linear Structures, Fast/Slow Pointer Cycle Detection, Monotonic Stacks
  4. **Squares 31–40**: Searching & Sorting (Binary Search Invariants, MergeSort, QuickSort, Quickselect)
  5. **Squares 41–50**: Trees & BST Invariants, Lowest Common Ancestor, AVL Balance Factors
  6. **Squares 51–60**: Binary Heaps, Dual-Heap Median Finder, Combinatorial Backtracking
  7. **Squares 61–70**: Graph Algorithms (BFS Shortest Path, Kahn's In-Degree, Dijkstra, DSU Kruskal)
  8. **Squares 71–80**: Greedy Choice Property, 0/1 Knapsack, Longest Common Subsequence
  9. **Squares 81–90**: Bitwise XOR Invariants, Brian Kernighan, Grid DP, Interval DP
  10. **Squares 91–100**: Trie, Monotonic Deque, Segment Trees, Tarjan's Bridges, Final Titan Boss

### 2. 🛡️ Anti-Exploit Consequence Integrity
- **No Penalty Bypass**: Closing the modal via the `X` button, Escape key, or background click never evades consequences.
- If a mistake is submitted, closing applies the calculated backward movement and economy penalty.
- Unsubmitted attempts require an explicit concession confirmation that applies the standard mistake penalty.

### 3. ⚡ 6 Functional Energy Abilities
Cast abilities powered by algorithmic energy earned through correct solutions:
- **🛡️ Invariant Shield (25⚡)**: Completely absorbs the next backward slide or snake trap.
- **⚡ Second Chance (30⚡)**: Grants 1 instant free retry on an incorrect attempt before any penalty applies.
- **🔍 Debug Scan (20⚡)**: Eliminates 1 incorrect distractor choice in the current challenge.
- **💡 Progressive Hints (Free / 10⚡ / 15⚡)**: Unlocks 3 tiers of progressive concept and code clues.
- **🪜 Optimization Overdrive (15⚡)**: Supercharges the next ladder climbed with $+2$ bonus tiles.
- **🎲 Quantum Reroll (15⚡)**: Rerolls the dice when hazardous traps lurk ahead.

### 4. 🕹️ Formal Game State Machine & Event Queue
- A deterministic finite state machine (`GamePhase`: `IDLE`, `ROLLING`, `MOVING`, `LANDING`, `CHALLENGE`, `EVALUATING`, `EVENT`, `REWARD`, `VICTORY`, `GAME_OVER`).
- Eliminates race conditions and double-rolling by guarding actions strictly in valid phases.
- **Sequential Event Queue**: Prevents overlapping modals when landing on multi-event tiles (e.g. Decision Crossroads + Square Challenge, Board Mutation + Challenge).

### 5. 👑 Tile 100 Grandmaster Boss & Victory Transition
- Tile 100 features a climactic boss encounter against the **Dynamic Programming Overlord**.
- Defeating the final boss triggers an immediate victory transition with particle celebrations and a complete post-game analysis.

### 6. 📊 Post-Game Analysis & Learning Dashboard
- Detailed statistical breakdown:
  - Final XP & Coin Balance
  - Accuracy Rate & Total Questions Solved vs Failed
  - Longest Correct Streak & Turns Completed
  - Ladders Climbed vs Traps Encountered
  - Algorithm Energy Cast
- **Cognitive Mastery Analysis**:
  - Highlights Top 2 Demonstrated Strengths
  - Recommends Top 2 Topics to Practice for interview readiness

### 7. 🪜 Algorithmic Optimization Ladders
- Compare brute-force solutions ($O(N^2)$) against optimal formulations ($O(N)$) side-by-side with complete code traces.
- Choose between Safe routes and Expert routes for higher rewards.

### 8. 🐍 Intelligent Debugging Snakes
- Diagnose real-world bugs (off-by-one errors, severed pointers, operator precedence).
- Choose between accepting the slide, Concept Recovery ($+1$ tile), or Debugging Recovery ($+3$ tiles).

### 9. 🤖 Live-Board Autoplay Demonstration Mode
- Demonstrates actual board traversal with real step animations and questions.
- Supports 3 speeds: 1x, 2x, 4x.
- Automatically pauses safely upon victory.

### 10. 🔊 Web Audio API Synthesizer
- Built-in zero-dependency procedural audio engine synthesizing rolls, step clicks, ladder fanfares, and level-up chimes.

---

## 🛠️ Tech Stack & Architecture

- **Runtime & Language**: Node.js v24+, TypeScript 5+, React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 with custom dark aesthetic
- **Icons**: Lucide React
- **Celebrations**: Canvas-Confetti
- **Testing**: Vitest (94 automated unit & integration tests)

---

## 📦 Getting Started

### Prerequisites
- Node.js `v18+` or `v20+` (Tested on `v24.22.1`)
- npm `v9+` (Tested on `v11.19.1`)

### Installation
```bash
# Clone the repository
git clone https://github.com/rohithseervi77/Snake-and-Ladder.git
cd "Snake and ladder"

# Install dependencies
npm install
```

### Development
```bash
# Start local development server
npm run dev
```
Open `http://localhost:5173`.

### Automated Testing
```bash
# Run Vitest test suite (94 tests)
npm test
```

### Production Build
```bash
# Typecheck and compile optimized bundle
npm run build
```

---

## 🧪 Test Verification

94 unit and integration tests across 7 suites verify:
- **Curriculum Completeness**: 100 uniquely authored challenges, 3-tier hints, learning objectives, and common mistake tags.
- **Anti-Exploit Security**: Penalty enforcement on modal closes and concessions.
- **Energy Abilities**: Invariant Shield deflection, Second Chance retries, Debug Scan option elimination.
- **State Machine**: Phase transition validation and prevention of double-rolling.
- **Post-Game Dashboard**: Accuracy calculation and topic recommendations.

---

## 📜 License
MIT License. Built for developers mastering Data Structures and Algorithms.
