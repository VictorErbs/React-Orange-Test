import React from 'react';
import { Link, Navigate } from 'react-router-dom'; 
import './Home.css';
import backgroundVideo from './assets/a.mp4'; // Importe o vídeo de fundo

const Home = ({ registrationSuccess }) => {
  if (registrationSuccess) {
    return <Navigate to="/" replace />; 
  }

  return (
    <div className="home-container">
      {/* Adicione o vídeo de fundo */}
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Restante do conteúdo */}
      <h1>Orange The Game!</h1>
      <div className="button-container">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
