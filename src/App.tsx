import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import GameImage from './components/GameImage';
import GuessInput from './components/GuessInput';
import GuessHistory from './components/GuessHistory';
import GameComplete from './components/GameComplete';
import WordHint from './components/WordHint';
import EasyModeToggle from './components/EasyModeToggle';
import HintButtons from './components/HintButtons';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { 
  loadGameLevels, 
  saveGameLevels, 
  generateGameImages, 
  checkAnswer,
  type GameLevel 
} from './data/gameData';
import type { GameState } from './types/game';
import './App.css';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    guess: '',
    guessHistory: [],
    isCorrect: false,
    gameCompleted: fa.
    0lse,
    easyMode: false,
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [gameLevels, setGameLevels] = useState<GameLevel[]>([]);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Carrega os níveis do jogo na inicialização
  useEffect(() => {
    const levels = loadGameLevels();
    setGameLevels(levels);
  }, []);

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

  const gameImages = generateGameImages(gameLevels);
  const currentImage = gameImages[gameState.currentLevel];
  const totalLevels = gameImages.length;

  // Dicas para cada fase
  const hintsByLevel: string[][] = gameLevels.map(level => level.hints);

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

  const handleAdminSave = (newLevels: GameLevel[]) => {
    setGameLevels(newLevels);
    saveGameLevels(newLevels);
    // Reset do jogo para a primeira fase com as novas configurações
    setGameState({
      currentLevel: 0,
      guess: '',
      guessHistory: [],
      isCorrect: false,
      gameCompleted: false,
      easyMode: gameState.easyMode,
    });
  };

  const handleAdminAccess = () => {
    if (isAdminAuthenticated) {
      setShowAdminPanel(true);
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowAdminLogin(false);
    setShowAdminPanel(true);
  };

  const handleCloseAdmin = () => {
    setShowAdminPanel(false);
    setShowAdminLogin(false);
  };

  // Adiciona listener para teclas de acesso ao admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        if (isAdminAuthenticated) {
          setShowAdminPanel(true);
        } else {
          setShowAdminLogin(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated]);

  // Verifica se há dados válidos
  if (gameLevels.length === 0 || !currentImage) {
    return (
      <div className="app">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Carregando jogo...</h2>
          <p>Se o problema persistir, pressione Ctrl+Shift+A para configurar o jogo.</p>
        </div>
      </div>
    );
  }

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
          <EasyModeToggle
            easyMode={gameState.easyMode}
            onToggle={handleEasyModeToggle}
          />
          <button
            onClick={handleAdminAccess}
            className={`admin-access-btn ${isAdminAuthenticated ? 'admin-authenticated' : ''}`}
            title={isAdminAuthenticated ? 'Painel de Administração (Autenticado)' : 'Acesso Administrativo (Ctrl+Shift+A)'}
          >
            {isAdminAuthenticated ? '🔓' : '⚙️'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="game-layout">
          <div className="image-section">
            <GameImage
              imageUrl={currentImage.url}
              alt={`Fase ${gameState.currentLevel + 1}`}
              level={gameState.currentLevel + 1}
              totalLevels={totalLevels}
            />
          </div>
          <div className="hints-section">
            <HintButtons hints={hintsByLevel[gameState.currentLevel] || []} />
          </div>
        </div>

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

      {showAdminLogin && (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setShowAdminLogin(false)}
        />
      )}

      {showAdminPanel && (
        <AdminPanel
          levels={gameLevels}
          onSave={handleAdminSave}
          onClose={handleCloseAdmin}
        />
      )}
    </div>
  );
}

export default App;
