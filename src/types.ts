export type ResultKey =
  | 'sim'
  | 'parallel'
  | 'brain'
  | 'free'
  | 'bug'
  | 'loop'
  | 'observer';

export type Screen = 'intro' | 'question' | 'analysis' | 'result';

export type RarityType =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary'
  | 'unique';

export interface ScoreMap {
  sim?: number;
  parallel?: number;
  brain?: number;
  free?: number;
  bug?: number;
  loop?: number;
  observer?: number;
}

export type Scores = Record<ResultKey, number>;

export interface Choice {
  text: string;
  score: ScoreMap;
}

export interface Question {
  category: string;
  context: string;
  text: string;
  choices: Choice[];
}

export interface Stat {
  label: string;
  value: string;
}

export interface Result {
  emoji: string;
  rarity: RarityType;
  rarityLabel: string;
  type: string;
  title: string;
  shortDesc: string;
  desc: string;
  quote: string;
  quoteAuthor: string;
  stats: Stat[];
  color: string;
}
