import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Login.css';
import backgroundVideo from './assets/a.mp4'; // Importe o vídeo de fundo

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isAuthenticated = await onLogin(username, password);
      if (isAuthenticated) {
        setIsLoggedIn(true);
      } else {
        setLoginError('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setLoginError('Ocorreu um erro ao fazer login');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/gamehud" />;
  }

  return (
    <div className="login-container">
      {/* Adicione o vídeo de fundo */}
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Restante do conteúdo */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {loginError && <p className="error-message">{loginError}</p>}
      </form>
      {/* Adicione o botão de voltar abaixo do formulário */}
      <button className="back-button" onClick={() => window.history.back()}>
        Voltar
      </button>
      {/* Adicione o link de registro fora do botão de login */}
      <Link to="/register" className="register-link">Não tem uma conta? Registre-se aqui.</Link>
    </div>
  );
};

export default Login;
