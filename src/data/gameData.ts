import type { GameImage } from '../types/game';

// Lista das respostas em ordem de fase
const gameAnswers = [
  'lala',
  'lele',
  'carro',
  'montanha',
  'praia',
  'hamburguer',
  'bicicleta',
  'casa',
];

// Gera automaticamente as imagens baseado na lista de respostas
export const gameImages: GameImage[] = gameAnswers.map((answer, index) => ({
  id: index + 1,
  url: `/images/${index + 1}-${answer}.jpg`,
  answer: answer,
  description: `Fase ${index + 1}: ${answer}`,
}));

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
