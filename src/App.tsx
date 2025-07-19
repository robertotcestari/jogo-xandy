import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import GameImage from './components/GameImage';
import GuessInput from './components/GuessInput';
import GuessHistory from './components/GuessHistory';
import GameComplete from './components/GameComplete';
import WordHint from './components/WordHint';
import EasyModeToggle from './components/EasyModeToggle';
import { gameImages, checkAnswer } from './data/gameData';
import type { GameState } from './types/game';
import './App.css';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    guess: '',
    guessHistory: [],
    isCorrect: false,
    gameCompleted: false,
    easyMode: false,
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Atualiza dimensões da janela para o confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Controla duração do confetti
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // 3 segundos de confetti

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const currentImage = gameImages[gameState.currentLevel];
  const totalLevels = gameImages.length;

  const handleGuessChange = (value: string) => {
    setGameState((prev) => ({
      ...prev,
      guess: value,
    }));
  };

  const handleGuessSubmit = () => {
    const userGuess = gameState.guess.trim();

    if (!userGuess) return;

    const isCorrect = checkAnswer(userGuess, currentImage.answer);

    if (isCorrect) {
      // Ativa confetti quando acerta
      setShowConfetti(true);

      // Resposta correta - avança para próxima fase
      const nextLevel = gameState.currentLevel + 1;

      if (nextLevel >= totalLevels) {
        // Jogo completo
        setGameState((prev) => ({
          ...prev,
          gameCompleted: true,
          isCorrect: true,
          guess: '',
        }));
      } else {
        // Próxima fase
        setGameState((prev) => ({
          ...prev,
          currentLevel: nextLevel,
          guess: '',
          guessHistory: [],
          isCorrect: true,
        }));
      }
    } else {
      // Resposta incorreta - adiciona ao histórico
      setGameState((prev) => ({
        ...prev,
        guessHistory: [userGuess, ...prev.guessHistory],
        guess: '',
        isCorrect: false,
      }));
    }
  };

  const handleRestart = () => {
    setShowConfetti(false);
    setGameState({
      currentLevel: 0,
      guess: '',
      guessHistory: [],
      isCorrect: false,
      gameCompleted: false,
      easyMode: gameState.easyMode, // Mantém o modo fácil selecionado
    });
  };

  const handleEasyModeToggle = () => {
    setGameState((prev) => ({
      ...prev,
      easyMode: !prev.easyMode,
    }));
  };

  if (gameState.gameCompleted) {
    return (
      <div className="app">
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={true}
          numberOfPieces={300}
          gravity={0.2}
        />
        <GameComplete onRestart={handleRestart} totalLevels={totalLevels} />
      </div>
    );
  }

  return (
    <div className="app">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      <header className="app-header">
        <h1>🎯 Jogo de Adivinhação</h1>
        <p>Adivinhe o que está na imagem!</p>
        <EasyModeToggle
          easyMode={gameState.easyMode}
          onToggle={handleEasyModeToggle}
        />
      </header>

      <main className="app-main">
        <GameImage
          imageUrl={currentImage.url}
          alt={`Fase ${gameState.currentLevel + 1}`}
          level={gameState.currentLevel + 1}
          totalLevels={totalLevels}
        />

        <WordHint
          correctAnswer={currentImage.answer}
          guessHistory={gameState.guessHistory}
          easyMode={gameState.easyMode}
        />

        <GuessInput
          value={gameState.guess}
          onChange={handleGuessChange}
          onSubmit={handleGuessSubmit}
          placeholder="Digite sua resposta..."
        />

        <GuessHistory
          guesses={gameState.guessHistory}
          correctAnswer={currentImage.answer}
        />
      </main>
    </div>
  );
}

export default App;
