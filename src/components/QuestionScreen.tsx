'use client';

import { Question } from '@/types';

const LETTERS = ['A', 'B', 'C', 'D'];

interface Props {
  active: boolean;
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelect: (i: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function QuestionScreen({
  active,
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelect,
  onNext,
  onPrev,
}: Props) {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;
  const isLast = questionIndex === totalQuestions - 1;

  return (
    <div className={`screen-wrap ${active ? 'visible' : 'hidden-down'}`}>
      <div className="glass-card w-full max-w-2xl p-8 sm:p-10">
        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-star-400/60 uppercase tracking-widest">
            {question.category}
          </span>
          <span className="text-xs text-star-400/60">
            {questionIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-star-500 to-nebula-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Context box */}
        <div className="bg-star-500/[0.07] border border-star-500/20 rounded-xl px-4 py-3 text-xs text-star-300/80 leading-relaxed mb-6">
          {question.context}
        </div>

        {/* Question text */}
        <p className="text-base sm:text-lg font-semibold text-white/90 leading-snug mb-6">
          {question.text}
        </p>

        {/* Choices */}
        <div className="flex flex-col gap-3 mb-8">
          {question.choices.map((c, i) => (
            <button
              key={i}
              className={`choice-btn ${selectedAnswer === i ? 'selected' : ''}`}
              onClick={() => onSelect(i)}
            >
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold mr-3 border transition-colors ${
                  selectedAnswer === i
                    ? 'bg-nebula-500 border-nebula-500 text-white'
                    : 'border-white/15 text-star-400/60'
                }`}
              >
                {LETTERS[i]}
              </span>
              {c.text}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={onPrev}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold border border-white/10 text-star-400/70 hover:border-star-500/40 hover:text-star-300 transition-all ${questionIndex === 0 ? 'invisible' : ''}`}
          >
            ← 이전
          </button>
          <button
            onClick={onNext}
            disabled={selectedAnswer === null}
            className={`px-7 py-2.5 rounded-full text-sm font-bold transition-all ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-star-600 to-nebula-500 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-star-500/25'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            {isLast ? '결과 분석 →' : '다음 →'}
          </button>
        </div>
      </div>
    </div>
  );
}
