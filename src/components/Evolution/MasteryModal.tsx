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
        return 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/30';
      case 'expert':
        return 'text-[#8B5CF6] bg-[#8B5CF6]/15 border-[#8B5CF6]/30';
      case 'practitioner':
        return 'text-[#22D3EE] bg-[#22D3EE]/15 border-[#22D3EE]/30';
      default:
        return 'text-[#94A3B8] bg-[#080D1A] border-[#263449]';
    }
  };

  const selectedTopic = selectedTopicId ? topicMasteryMap[selectedTopicId] : topics[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1A]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#111827] border border-[#263449] rounded-2xl p-6 shadow-2xl text-[#F8FAFC] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#263449] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#22D3EE] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase font-mono tracking-wider text-[#22D3EE] font-semibold">
                  Cognitive Mastery Matrix
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#080D1A] border border-[#263449] text-[#94A3B8] font-mono">
                  Mastery Index: {averageScore}/100
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${
                  learningDebt < 30 
                    ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40' 
                    : learningDebt < 60 
                    ? 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40' 
                    : 'bg-[#F43F5E]/20 text-[#F43F5E] border-[#F43F5E]/40'
                }`}>
                  Learning Debt: {learningDebt}%
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#F8FAFC] tracking-tight">DSA Topic Mastery Dashboard</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[#172033] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Topic list layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 overflow-hidden">
          {/* Left: Topic list */}
          <div className="md:col-span-5 flex flex-col gap-3 overflow-hidden">
            <div className="relative">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#080D1A] border border-[#263449] rounded-lg text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#22D3EE]"
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
                        ? 'bg-[#2563EB]/20 border-2 border-[#2563EB] shadow-md'
                        : 'bg-[#172033] border-[#263449] hover:border-[#22D3EE]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-[#F8FAFC] truncate max-w-[170px]">
                        {topic.topicName}
                      </span>
                      <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border ${tierClass}`}>
                        {topic.level}
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-[#080D1A] rounded-full overflow-hidden mb-1">
                      <div
                        className="h-full bg-gradient-to-r from-[#2563EB] to-[#10B981] rounded-full transition-all"
                        style={{ width: `${topic.score}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-[#94A3B8] font-mono">
                      <span>Score: {topic.score}/100</span>
                      <span>{topic.correctCount}/{topic.attempts} Solved</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Topic Inspection */}
          <div className="md:col-span-7 flex flex-col justify-between overflow-y-auto bg-[#080D1A] border border-[#263449] rounded-xl p-4">
            {selectedTopic ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#263449] pb-3">
                  <div>
                    <h3 className="text-base font-bold text-[#F8FAFC]">{selectedTopic.topicName}</h3>
                    <span className="text-xs text-[#94A3B8]">
                      Last evaluated: {new Date(selectedTopic.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold font-mono text-[#22D3EE]">
                      {selectedTopic.score} <span className="text-xs text-[#94A3B8]">/ 100</span>
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
                  <div className="p-2.5 rounded-lg bg-[#172033] border border-[#263449] text-center">
                    <div className="text-[10px] text-[#94A3B8]">Attempts</div>
                    <div className="text-sm font-bold text-[#F8FAFC] font-mono">{selectedTopic.attempts}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#172033] border border-[#263449] text-center">
                    <div className="text-[10px] text-[#94A3B8]">Accuracy</div>
                    <div className="text-sm font-bold text-[#10B981] font-mono">
                      {selectedTopic.attempts > 0
                        ? `${Math.round((selectedTopic.correctCount / selectedTopic.attempts) * 100)}%`
                        : '0%'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#172033] border border-[#263449] text-center">
                    <div className="text-[10px] text-[#94A3B8]">First-Try</div>
                    <div className="text-sm font-bold text-[#22D3EE] font-mono">{selectedTopic.firstTryCount}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#172033] border border-[#263449] text-center">
                    <div className="text-[10px] text-[#94A3B8]">Hints Used</div>
                    <div className="text-sm font-bold text-[#F59E0B] font-mono">{selectedTopic.hintsUsedCount}</div>
                  </div>
                </div>

                {/* Anti-Inflation Calibration Note */}
                <div className="p-3 rounded-lg bg-[#172033] border border-[#2563EB]/40 text-xs text-[#22D3EE] flex items-start gap-2">
                  <Zap className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-[#94A3B8]">
                    <strong className="text-[#F8FAFC]">Evidence-based progression:</strong> High tier scores (60+) scale with diminished returns, requiring repeated independent solutions and comeback proofs to reach <strong className="text-[#10B981]">Mastery (85+)</strong>.
                  </p>
                </div>

                {/* Evidence Log */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-[#94A3B8]" />
                    Cognitive Evidence Trail
                  </h4>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {selectedTopic.evidence && selectedTopic.evidence.length > 0 ? (
                      selectedTopic.evidence.map((ev, i) => (
                        <div
                          key={i}
                          className="text-xs p-2 rounded-lg bg-[#172033] border border-[#263449] text-[#CBD5E1] flex items-start gap-2"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          <span className="leading-snug">{ev}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-[#64748B] italic p-2">No evidence recorded yet.</div>
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
