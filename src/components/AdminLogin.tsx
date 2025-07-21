import React, { useState } from 'react';
import './AdminLogin.css';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Senha padrão - você pode mudar aqui ou implementar um sistema mais robusto
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simula um pequeno delay para dar feedback visual
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLoginSuccess();
      } else {
        setError('Senha incorreta. Tente novamente.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="admin-login-overlay" onKeyDown={handleKeyPress}>
      <div className="admin-login-modal">
        <div className="admin-login-header">
          <h2>🔐 Acesso Administrativo</h2>
          <button onClick={onClose} className="login-close-btn">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="login-field">
            <label htmlFor="admin-password">Senha do Administrador:</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha de admin..."
              className="login-input"
              autoFocus
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}

          <div className="login-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="login-cancel-btn"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="login-submit-btn"
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? '🔄 Verificando...' : '🔓 Entrar'}
            </button>
          </div>
        </form>

        <div className="login-info">
          <small>
            💡 <strong>Dica para desenvolvimento:</strong> A senha padrão é "admin123"
            <br />
            🔧 Para mudar a senha, edite o arquivo AdminLogin.tsx
          </small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
