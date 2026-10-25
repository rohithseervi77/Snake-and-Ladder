import { describe, it, expect } from 'vitest';
import { CURRICULUM_100, SQUARE_MAP } from '../data/curriculum100';
import { CHALLENGES } from '../data/challenges';

describe('Academic Syllabus Compliance & Zero Out-Of-Scope Verification', () => {

  const FORBIDDEN_WORDS = [
    'segment tree',
    'fenwick',
    'bitmask',
    'disjoint set union',
    'dsu',
    'trie',
    'two sum',
    'sliding window',
    'longest palindromic',
    'trapping rain water',
    'kmp algorithm',
    'rabin karp',
    'z algorithm',
    'suffix tree',
    'suffix array',
    'max flow',
    'min cut',
    'bipartite matching'
  ];

  it('verifies that exactly 100 curriculum squares exist', () => {
    expect(CURRICULUM_100.length).toBe(100);
  });

  it('verifies that every square strictly belongs to CO1, CO2, CO3, or CO4', () => {
    const validCOs = new Set(['CO1', 'CO2', 'CO3', 'CO4']);
    CURRICULUM_100.forEach(sq => {
      expect(validCOs.has(sq.co)).toBe(true);
    });
  });

  it('verifies correct distribution of Course Outcomes across all 100 squares', () => {
    // Squares 1 to 40 -> CO1
    for (let id = 1; id <= 40; id++) {
      const sq = SQUARE_MAP.get(id);
      expect(sq?.co).toBe('CO1');
    }

    // Squares 41 to 70 -> CO2
    for (let id = 41; id <= 70; id++) {
      const sq = SQUARE_MAP.get(id);
      expect(sq?.co).toBe('CO2');
    }

    // Squares 71 to 80 -> CO3
    for (let id = 71; id <= 80; id++) {
      const sq = SQUARE_MAP.get(id);
      expect(sq?.co).toBe('CO3');
    }

    // Squares 81 to 100 -> CO4
    for (let id = 81; id <= 100; id++) {
      const sq = SQUARE_MAP.get(id);
      expect(sq?.co).toBe('CO4');
    }
  });

  it('verifies ZERO forbidden out-of-syllabus topics in curriculum squares', () => {
    CURRICULUM_100.forEach(sq => {
      const text = `${sq.title} ${sq.topic} ${sq.subtopic} ${sq.summary} ${sq.checkpointTasks.join(' ')}`;
      FORBIDDEN_WORDS.forEach(forbidden => {
        const regex = new RegExp(`\\b${forbidden}\\b`, 'i');
        expect(regex.test(text)).toBe(false);
      });
    });
  });

  it('verifies ZERO forbidden out-of-syllabus topics in all 124+ challenge questions', () => {
    expect(CHALLENGES.length).toBeGreaterThanOrEqual(120);

    CHALLENGES.forEach(ch => {
      const text = `${ch.title} ${ch.topic} ${ch.prompt} ${(ch.options || []).join(' ')} ${ch.explanation}`;
      FORBIDDEN_WORDS.forEach(forbidden => {
        const regex = new RegExp(`\\b${forbidden}\\b`, 'i');
        expect(regex.test(text)).toBe(false);
      });
    });
  });

  it('verifies all 120+ challenges have valid syllabus course outcomes', () => {
    const validCOs = new Set(['CO1', 'CO2', 'CO3', 'CO4']);
    CHALLENGES.forEach(ch => {
      expect(validCOs.has(ch.co || 'CO1')).toBe(true);
      expect(ch.squareId).toBeGreaterThanOrEqual(1);
      expect(ch.squareId).toBeLessThanOrEqual(100);
      expect(ch.explanation.length).toBeGreaterThan(15);
    });
  });
});
