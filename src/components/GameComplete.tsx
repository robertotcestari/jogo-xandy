import React from 'react';
import './GameComplete.css';

interface GameCompleteProps {
  onRestart: () => void;
  totalLevels: number;
}

const GameComplete: React.FC<GameCompleteProps> = ({
  onRestart,
  totalLevels,
}) => {
  return (
    <div className="game-complete-container">
      <div className="game-complete-content">
        <h1 className="game-complete-title">🎉 Parabéns!</h1>
        <p className="game-complete-message">
          Você completou todas as {totalLevels} fases do jogo!
        </p>
        <button onClick={onRestart} className="restart-button">
          Jogar Novamente
        </button>
      </div>
    </div>
  );
};

export default GameComplete;
