import React from 'react';
import './GameImage.css';

interface GameImageProps {
  imageUrl: string;
  alt: string;
  level: number;
  totalLevels: number;
}

const GameImage: React.FC<GameImageProps> = ({
  imageUrl,
  alt,
  level,
  totalLevels,
}) => {
  return (
    <div className="game-image-container">
      <div className="level-indicator">
        Fase {level} de {totalLevels}
      </div>
      <div className="image-wrapper">
        <img src={imageUrl} alt={alt} className="game-image" loading="lazy" />
      </div>
    </div>
  );
};

export default GameImage;
