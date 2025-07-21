import React, { useState } from 'react';
import './HintButtons.css';

interface HintButtonsProps {
  hints: string[];
}

const HintButtons: React.FC<HintButtonsProps> = ({ hints }) => {
  const [revealed, setRevealed] = useState([false, false, false]);

  const handleReveal = (index: number) => {
    setRevealed((prev) => prev.map((r, i) => (i === index ? true : r)));
  };

  return (
    <div className="hint-buttons-container">
      {hints.map((hint, idx) => (
        <div key={idx} className="hint-item">
          <button
            className="hint-btn"
            onClick={() => handleReveal(idx)}
            disabled={revealed[idx]}
          >
            {`Dica ${idx + 1}`}
          </button>
          {revealed[idx] && (
            <span className="hint-text">{hint}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default HintButtons;
