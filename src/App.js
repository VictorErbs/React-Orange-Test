import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import GameHUD from './GameHUD';
import Home from './Home';
import './App.css'; // Importe o arquivo CSS para aplicar o estilo de imagem de fundo

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleLogin = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
  
    if (user) {
      setIsAuthenticated(true);
      alert('Logado com sucesso');
      return <Navigate to="/gamehud" />;
    } else {
      alert('Credenciais inválidas');
    }
  };

  const handleRegister = (username, email, password) => {
    const userExists = users.some((u) => u.username === username);

    if (userExists) {
      alert('Nome de usuário já está sendo usado');
    } else {
      setUsers([...users, { username, email, password }]);
      alert('Registro bem-sucedido!');
      setIsAuthenticated(true);
    }
  };

  return (
    <Router>
      <div className="app">
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleRegister} />} />
            <Route path="/game" element={isAuthenticated ? <GameHUD /> : <Navigate to="/login" />} />
            <Route path="/gamehud" element={<GameHUD />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
