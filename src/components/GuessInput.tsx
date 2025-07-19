import React from 'react';
import './GuessInput.css';

interface GuessInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const GuessInput: React.FC<GuessInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = 'Digite sua resposta...',
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="guess-input-container">
      <form onSubmit={handleSubmit} className="guess-form">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="guess-input"
          autoComplete="off"
          autoFocus
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="guess-submit-btn"
        >
          Tentar
        </button>
      </form>
    </div>
  );
};

export default GuessInput;
