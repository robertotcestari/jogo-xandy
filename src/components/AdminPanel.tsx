import React, { useState } from 'react';
import './AdminPanel.css';

interface GameLevel {
  answer: string;
  hints: string[];
}

interface AdminPanelProps {
  levels: GameLevel[];
  onSave: (levels: GameLevel[]) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ levels, onSave, onClose }) => {
  const [editedLevels, setEditedLevels] = useState<GameLevel[]>(levels);

  const updateLevel = (index: number, field: keyof GameLevel, value: string | string[]) => {
    setEditedLevels(prev => 
      prev.map((level, i) => 
        i === index ? { ...level, [field]: value } : level
      )
    );
  };

  const updateHint = (levelIndex: number, hintIndex: number, value: string) => {
    setEditedLevels(prev => 
      prev.map((level, i) => 
        i === levelIndex 
          ? { 
              ...level, 
              hints: level.hints.map((hint, j) => j === hintIndex ? value : hint)
            }
          : level
      )
    );
  };

  const addLevel = () => {
    setEditedLevels(prev => [
      ...prev,
      { answer: '', hints: ['', '', ''] }
    ]);
  };

  const removeLevel = (index: number) => {
    setEditedLevels(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(editedLevels);
    onClose();
  };

  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <h2>🔧 Painel de Administração</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="admin-content">
          <div className="admin-instructions">
            <p>Configure as respostas e dicas para cada fase do jogo:</p>
            <ul>
              <li>Adicione a imagem correspondente em <code>/public/images/[numero]-[resposta].jpg</code></li>
              <li>As dicas são reveladas progressivamente conforme o jogador clica</li>
            </ul>
          </div>

          <div className="levels-container">
            {editedLevels.map((level, levelIndex) => (
              <div key={levelIndex} className="level-editor">
                <div className="level-header">
                  <h3>Fase {levelIndex + 1}</h3>
                  <button 
                    onClick={() => removeLevel(levelIndex)}
                    className="remove-level-btn"
                    title="Remover fase"
                  >
                    🗑️
                  </button>
                </div>

                <div className="level-content">
                  <div className="field-group">
                    <label>Resposta:</label>
                    <input
                      type="text"
                      value={level.answer}
                      onChange={(e) => updateLevel(levelIndex, 'answer', e.target.value)}
                      placeholder="Ex: gato, carro, montanha..."
                      className="answer-input"
                    />
                  </div>

                  <div className="hints-group">
                    <label>Dicas:</label>
                    {level.hints.map((hint, hintIndex) => (
                      <div key={hintIndex} className="hint-input-group">
                        <span className="hint-label">Dica {hintIndex + 1}:</span>
                        <input
                          type="text"
                          value={hint}
                          onChange={(e) => updateHint(levelIndex, hintIndex, e.target.value)}
                          placeholder={`Digite a dica ${hintIndex + 1}...`}
                          className="hint-input"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="image-info">
                    <small>Imagem: <code>/public/images/{levelIndex + 1}-{level.answer || 'resposta'}.jpg</code></small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="admin-actions">
            <button onClick={addLevel} className="add-level-btn">
              ➕ Adicionar Nova Fase
            </button>
          </div>
        </div>

        <div className="admin-footer">
          <button onClick={onClose} className="cancel-btn">Cancelar</button>
          <button onClick={handleSave} className="save-btn">💾 Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
