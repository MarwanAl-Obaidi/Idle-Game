import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <div className="homeContainer">
            <h1>Welcome to the Idle Coin Game!</h1>
            <p>Start collecting coins and upgrading your earnings.</p>
            <Link to="/game">
                <button className="homeButton">Start Game</button>
            </Link>
        </div>
    );
};

export default Home;
