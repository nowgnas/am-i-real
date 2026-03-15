'use client';

import { useState, useCallback } from 'react';
import StarCanvas from '@/components/StarCanvas';
import IntroScreen from '@/components/IntroScreen';
import QuestionScreen from '@/components/QuestionScreen';
import AnalysisScreen from '@/components/AnalysisScreen';
import ResultScreen from '@/components/ResultScreen';
import { QUESTIONS } from '@/data/questions';
import { Screen, ResultKey, Scores } from '@/types';

const EMPTY_SCORES: Scores = {
  sim: 0,
  parallel: 0,
  brain: 0,
  free: 0,
  bug: 0,
  loop: 0,
  observer: 0,
};

const RARITY_ORDER: ResultKey[] = [
  'sim',
  'parallel',
  'brain',
  'loop',
  'free',
  'observer',
  'bug',
];

function calculateResult(answers: (number | null)[]): ResultKey {
  const scores: Scores = { ...EMPTY_SCORES };

  QUESTIONS.forEach((q, i) => {
    const idx = answers[i];
    if (idx === null || idx === undefined) return;
    const choice = q.choices[idx];
    Object.entries(choice.score).forEach(([k, v]) => {
      scores[k as ResultKey] += v ?? 0;
    });
  });

  const sorted = Object.entries(scores).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    // tie-break: rarer type wins
    return (
      RARITY_ORDER.indexOf(b[0] as ResultKey) -
      RARITY_ORDER.indexOf(a[0] as ResultKey)
    );
  });

  const top = sorted[0][1];
  const second = sorted[1][1];

  // Very mixed answers → bug
  if (top > 0 && top - second <= 2) return 'bug';

  return sorted[0][0] as ResultKey;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(QUESTIONS.length).fill(null)
  );
  const [result, setResult] = useState<ResultKey | null>(null);

  const transition = useCallback((next: Screen) => {
    setPrevScreen((prev) => prev);
    setScreen(next);
  }, []);

  const startQuiz = () => {
    setCurrentQ(0);
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setResult(null);
    transition('question');
  };

  const selectAnswer = (choiceIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = choiceIndex;
      return next;
    });
  };

  const nextQuestion = () => {
    if (answers[currentQ] === null) return;

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      const finalAnswers = answers;
      const key = calculateResult(finalAnswers);
      setResult(key);
      transition('analysis');
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  };

  const showResult = useCallback(() => transition('result'), [transition]);
  const restartQuiz = () => {
    setScreen('intro');
    setPrevScreen(null);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-space-950">
      <StarCanvas />

      {/* Nebula blobs */}
      <div
        className="nebula-blob"
        style={{
          width: 520,
          height: 520,
          background: 'rgba(14,165,233,0.18)',
          top: -120,
          left: -120,
        }}
      />
      <div
        className="nebula-blob"
        style={{
          width: 420,
          height: 420,
          background: 'rgba(249,115,22,0.15)',
          bottom: -80,
          right: -80,
          animationDelay: '-4s',
        }}
      />
      <div
        className="nebula-blob"
        style={{
          width: 300,
          height: 300,
          background: 'rgba(16,185,129,0.12)',
          top: '40%',
          left: '60%',
          animationDelay: '-2s',
        }}
      />

      {/* Screens */}
      <IntroScreen active={screen === 'intro'} onStart={startQuiz} />

      <QuestionScreen
        active={screen === 'question'}
        question={QUESTIONS[currentQ]}
        questionIndex={currentQ}
        totalQuestions={QUESTIONS.length}
        selectedAnswer={answers[currentQ]}
        onSelect={selectAnswer}
        onNext={nextQuestion}
        onPrev={prevQuestion}
      />

      <AnalysisScreen
        active={screen === 'analysis'}
        onComplete={showResult}
      />

      {result && (
        <ResultScreen
          active={screen === 'result'}
          resultKey={result}
          onRestart={restartQuiz}
        />
      )}

      <div id="toast">복사 완료!</div>
    </main>
  );
}
