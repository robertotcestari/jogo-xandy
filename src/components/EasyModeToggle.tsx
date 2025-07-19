import React from 'react';
import './EasyModeToggle.css';

interface EasyModeToggleProps {
  easyMode: boolean;
  onToggle: () => void;
}

const EasyModeToggle: React.FC<EasyModeToggleProps> = ({
  easyMode,
  onToggle,
}) => {
  return (
    <div className="easy-mode-toggle-container">
      <label className="easy-mode-toggle">
        <input
          type="checkbox"
          checked={easyMode}
          onChange={onToggle}
          className="easy-mode-checkbox"
        />
        <span className="easy-mode-slider"></span>
        <span className="easy-mode-label">
          {easyMode ? '🎯 Modo Fácil' : '🔥 Modo Normal'}
        </span>
      </label>
    </div>
  );
};

export default EasyModeToggle;
