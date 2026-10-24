import React, { useState } from 'react';
import { Award, CheckCircle, TrendingUp, HelpCircle, History, X, Search, Zap } from 'lucide-react';
import { TopicMasteryScore } from '../../types/evolution';

interface MasteryModalProps {
  isOpen: boolean;
  topicMasteryMap: Record<string, TopicMasteryScore>;
  onClose: () => void;
}

export const MasteryModal: React.FC<MasteryModalProps> = ({
  isOpen,
  topicMasteryMap,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  if (!isOpen) return null;

  const topics = Object.values(topicMasteryMap);
  const filteredTopics = topics.filter(t =>
    t.topicName.toLowerCase().includes(search.toLowerCase())
  );

  const averageScore = Math.round(
    topics.reduce((acc, t) => acc + t.score, 0) / (topics.length || 1)
  );
  const learningDebt = Math.max(0, 100 - averageScore);

  const getTierColor = (level: string) => {
    switch (level) {
      case 'master':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
      case 'expert':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'practitioner':
        return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/30';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const selectedTopic = selectedTopicId ? topicMasteryMap[selectedTopicId] : topics[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase font-mono tracking-wider text-indigo-400 font-semibold">
                  Cognitive Mastery Matrix
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  Mastery Index: {averageScore}/100
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${
                  learningDebt < 30 
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40' 
                    : learningDebt < 60 
                    ? 'bg-amber-950/40 text-amber-300 border-amber-800/40' 
                    : 'bg-rose-950/40 text-rose-300 border-rose-800/40'
                }`}>
                  Learning Debt: {learningDebt}%
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">DSA Topic Mastery Dashboard</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Topic list layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 overflow-hidden">
          {/* Left: Topic list */}
          <div className="md:col-span-5 flex flex-col gap-3 overflow-hidden">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="overflow-y-auto space-y-2 pr-1 flex-1">
              {filteredTopics.map((topic) => {
                const isSelected = (selectedTopic && selectedTopic.topicId === topic.topicId);
                const tierClass = getTierColor(topic.level);

                return (
                  <div
                    key={topic.topicId}
                    onClick={() => setSelectedTopicId(topic.topicId)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 shadow-md'
                        : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-white truncate max-w-[170px]">
                        {topic.topicName}
                      </span>
                      <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border ${tierClass}`}>
                        {topic.level}
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all"
                        style={{ width: `${topic.score}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>Score: {topic.score}/100</span>
                      <span>{topic.correctCount}/{topic.attempts} Solved</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Topic Inspection */}
          <div className="md:col-span-7 flex flex-col justify-between overflow-y-auto bg-slate-950/50 border border-slate-800 rounded-xl p-4">
            {selectedTopic ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedTopic.topicName}</h3>
                    <span className="text-xs text-slate-400">
                      Last evaluated: {new Date(selectedTopic.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold font-mono text-indigo-400">
                      {selectedTopic.score} <span className="text-xs text-slate-400">/ 100</span>
                    </div>
                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${getTierColor(
                        selectedTopic.level
                      )}`}
                    >
                      {selectedTopic.level} Tier
                    </span>
                  </div>
                </div>

                {/* Score Breakdown Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">Attempts</div>
                    <div className="text-sm font-bold text-white font-mono">{selectedTopic.attempts}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">Accuracy</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">
                      {selectedTopic.attempts > 0
                        ? `${Math.round((selectedTopic.correctCount / selectedTopic.attempts) * 100)}%`
                        : '0%'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">First-Try</div>
                    <div className="text-sm font-bold text-indigo-400 font-mono">{selectedTopic.firstTryCount}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">Hints Used</div>
                    <div className="text-sm font-bold text-amber-400 font-mono">{selectedTopic.hintsUsedCount}</div>
                  </div>
                </div>

                {/* Anti-Inflation Calibration Note */}
                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-xs text-indigo-200 flex items-start gap-2">
                  <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <strong>Evidence-based progression:</strong> High tier scores (60+) scale with diminished returns, requiring repeated independent solutions and comeback proofs to reach <strong>Mastery (85+)</strong>.
                  </p>
                </div>

                {/* Evidence Log */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-slate-400" />
                    Cognitive Evidence Trail
                  </h4>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {selectedTopic.evidence && selectedTopic.evidence.length > 0 ? (
                      selectedTopic.evidence.map((ev, i) => (
                        <div
                          key={i}
                          className="text-xs p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex items-start gap-2"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{ev}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-500 italic p-2">No evidence recorded yet.</div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
