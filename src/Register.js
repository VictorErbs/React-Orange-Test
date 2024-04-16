import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import backgroundVideo from './assets/a.mp4'; // Importe o vídeo de fundo
import './Register.css';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setRegistrationError('As senhas não coincidem.');
      return;
    }

    if (!validateEmail(email)) {
      setRegistrationError('Formato de e-mail inválido.');
      return;
    }

    try {
      await onRegister(username, email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setRegistrationError('Ocorreu um erro ao fazer o registro.');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="register-container">
      {/* Adicione o vídeo de fundo */}
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Restante do conteúdo */}
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {registrationError && <p className="error-message">{registrationError}</p>}
      </form>
      {/* Botão de voltar */}
      <button className="back-button" onClick={() => window.history.back()}>
        Voltar
      </button>
      {/* Link de login */}
      <Link to="/login" className="login-link">Já tem uma conta? Faça login aqui.</Link>
    </div>
  );
};

export default Register;
