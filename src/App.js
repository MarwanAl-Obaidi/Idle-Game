import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import NavBar from './components/NavBar/NavBar.js';
import { AuthProvider } from './components/authContext/authContext.js';
import PrivateRoute from './components/privateRoute/privateRoute.js';
import Home from './views/home/home.js';
import Game from './views/game/game.js';
import Login from './views/logIn/logIn.js';
import SignUp from './views/signUp/signUp.js';
import Leaderboards from './views/leaderboards/leaderboards.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<PrivateRoute><Game /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
