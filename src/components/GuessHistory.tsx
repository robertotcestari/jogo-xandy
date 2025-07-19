import React from 'react';
import { calculateSimilarity } from '../data/gameData';
import './GuessHistory.css';

interface GuessHistoryProps {
  guesses: string[];
  correctAnswer: string;
}

const GuessHistory: React.FC<GuessHistoryProps> = ({
  guesses,
  correctAnswer,
}) => {
  if (guesses.length === 0) {
    return null;
  }

  return (
    <div className="guess-history-container">
      <h3 className="guess-history-title">Tentativas anteriores:</h3>
      <div className="guess-history-list">
        {guesses.map((guess, index) => {
          const similarity = calculateSimilarity(guess, correctAnswer);
          let itemClass = 'guess-item';

          if (similarity >= 0.8) {
            itemClass += ' guess-item-very-close'; // Verde para ≥80%
          } else if (similarity >= 0.5) {
            itemClass += ' guess-item-close'; // Amarelo para ≥50%
          }

          return (
            <span
              key={index}
              className={itemClass}
              title={`Similaridade: ${Math.round(similarity * 100)}%`}
            >
              {guess}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default GuessHistory;
