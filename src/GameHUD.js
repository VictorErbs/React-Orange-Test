import React, { useState } from 'react'; 
import './GameHUD.css'; 
import backgroundVideo from './assets/a.mp4';

const GameHUD = () => {
  const [playerName, setPlayerName] = useState('');
  const [showStory ] = useState(true); // Alteração para permitir alteração de estado

  return (
    <div className="game-hud">
      {/* Vídeo de fundo */}
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hud-element name-input">
        <span className="label">Nome do Guerreiro:</span>
        <input
          type="text"
          placeholder='Nome do Guerreiro'
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <div className="hud-element submit-button">
        <button onClick={() => {
          if (playerName === 'Arthur') {
            // Avançar para a próxima fase
            // ...
          } else {
            // Exibir mensagem de erro
            alert('Nome do guerreiro incorreto!');
          }
        }}>Confirmar</button>
      </div>
      {showStory && (
        <div className="story-balloon">
          <p>
            Era uma vez, em um reino distante, um guerreiro chamado Arthur que...
          </p>
        </div>
      )}
    </div>
  );
};

export default GameHUD;
