import React from 'react';
import './WordHint.css';

interface WordHintProps {
  correctAnswer: string;
  guessHistory: string[];
  easyMode: boolean;
}

const WordHint: React.FC<WordHintProps> = ({
  correctAnswer,
  guessHistory,
  easyMode,
}) => {
  if (!easyMode) {
    return null;
  }

  // Função para obter letras reveladas baseado no histórico
  const getRevealedLetters = (): Set<string> => {
    const revealed = new Set<string>();
    const normalizedAnswer = correctAnswer
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    guessHistory.forEach((guess) => {
      const normalizedGuess = guess
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      // Verifica cada posição para letras corretas na posição correta
      for (
        let i = 0;
        i < Math.min(normalizedGuess.length, normalizedAnswer.length);
        i++
      ) {
        if (normalizedGuess[i] === normalizedAnswer[i]) {
          revealed.add(normalizedAnswer[i]);
        }
      }
    });

    // Após 3 tentativas, revela letras que estão na palavra (mesmo que na posição errada)
    if (guessHistory.length >= 3) {
      guessHistory.forEach((guess) => {
        const normalizedGuess = guess
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        for (let i = 0; i < normalizedAnswer.length; i++) {
          if (normalizedGuess.includes(normalizedAnswer[i])) {
            revealed.add(normalizedAnswer[i]);
          }
        }
      });
    }

    return revealed;
  };

  const revealedLetters = getRevealedLetters();
  const normalizedAnswer = correctAnswer
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return (
    <div className="word-hint-container">
      <h4 className="word-hint-title">💡 Dica (Modo Fácil):</h4>
      <div className="word-hint-letters">
        {normalizedAnswer.split('').map((letter, index) => {
          const isRevealed = revealedLetters.has(letter);
          return (
            <span
              key={index}
              className={`word-hint-letter ${
                isRevealed ? 'word-hint-letter-revealed' : ''
              }`}
            >
              {isRevealed ? letter.toUpperCase() : '_'}
            </span>
          );
        })}
      </div>
      <div className="word-hint-info">
        {guessHistory.length === 0 && (
          <p>A palavra tem {normalizedAnswer.length} letras</p>
        )}
        {guessHistory.length >= 3 && (
          <p>Após 3 tentativas: letras corretas são reveladas!</p>
        )}
      </div>
    </div>
  );
};

export default WordHint;
