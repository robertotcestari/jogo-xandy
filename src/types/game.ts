export interface GameImage {
  id: number;
  url: string;
  answer: string;
  description?: string;
}

export interface GameState {
  currentLevel: number;
  guess: string;
  guessHistory: string[];
  isCorrect: boolean;
  gameCompleted: boolean;
  easyMode: boolean;
}
