import type { GameImage } from '../types/game';

export interface GameLevel {
  answer: string;
  hints: string[];
}

// Configuração padrão das fases
const defaultGameLevels: GameLevel[] = [
  {
    answer: 'lala',
    hints: [
      'É uma palavra repetida.',
      'Começa com L.',
      'É algo que uma criança pode falar.',
    ],
  },
  {
    answer: 'lele',
    hints: [
      'Também é uma palavra repetida.',
      'Começa com L.',
      'É parecido com a anterior.',
    ],
  },
  {
    answer: 'carro',
    hints: [
      'Tem rodas.',
      'É usado para transporte.',
      'Pode ser de várias cores.',
    ],
  },
  {
    answer: 'montanha',
    hints: [
      'É um lugar alto.',
      'Tem neve em alguns lugares.',
      'É famoso para trilhas.',
    ],
  },
  {
    answer: 'praia',
    hints: [
      'Tem areia.',
      'É um destino de férias.',
      'Tem mar.',
    ],
  },
  {
    answer: 'hamburguer',
    hints: [
      'É comida.',
      'Tem pão e carne.',
      'Muito popular nos EUA.',
    ],
  },
  {
    answer: 'bicicleta',
    hints: [
      'Tem duas rodas.',
      'Usada para exercício.',
      'Não tem motor.',
    ],
  },
  {
    answer: 'casa',
    hints: [
      'É onde você mora.',
      'Tem portas e janelas.',
      'Pode ser grande ou pequena.',
    ],
  },
];

// Função para carregar as configurações do localStorage
export const loadGameLevels = (): GameLevel[] => {
  try {
    const stored = localStorage.getItem('game-levels');
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultGameLevels;
    }
  } catch (error) {
    console.warn('Erro ao carregar configurações do jogo:', error);
  }
  return defaultGameLevels;
};

// Função para salvar as configurações no localStorage
export const saveGameLevels = (levels: GameLevel[]): void => {
  try {
    localStorage.setItem('game-levels', JSON.stringify(levels));
  } catch (error) {
    console.error('Erro ao salvar configurações do jogo:', error);
  }
};

// Função para resetar para as configurações padrão
export const resetToDefaultLevels = (): GameLevel[] => {
  saveGameLevels(defaultGameLevels);
  return defaultGameLevels;
};

// Gera automaticamente as imagens baseado na lista de níveis
export const generateGameImages = (levels: GameLevel[]): GameImage[] => {
  return levels.map((level, index) => ({
    id: index + 1,
    url: `/images/${index + 1}-${level.answer}.jpg`,
    answer: level.answer,
    description: `Fase ${index + 1}: ${level.answer}`,
  }));
};

export const normalizeAnswer = (answer: string): string => {
  return answer
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

// Calcula a similaridade entre duas strings usando distância de Levenshtein
export const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = normalizeAnswer(str1);
  const s2 = normalizeAnswer(str2);

  if (s1.length === 0) return s2.length === 0 ? 1 : 0;
  if (s2.length === 0) return 0;

  const matrix = Array(s2.length + 1)
    .fill(null)
    .map(() => Array(s1.length + 1).fill(null));

  for (let i = 0; i <= s1.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= s2.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= s2.length; j++) {
    for (let i = 1; i <= s1.length; i++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j - 1][i] + 1,
        matrix[j][i - 1] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }

  const maxLength = Math.max(s1.length, s2.length);
  const distance = matrix[s2.length][s1.length];

  return (maxLength - distance) / maxLength;
};

export const checkAnswer = (
  userAnswer: string,
  correctAnswer: string
): boolean => {
  return normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);
};
