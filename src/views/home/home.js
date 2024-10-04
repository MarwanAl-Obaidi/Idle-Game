import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../components/authContext/authContext';

const Home = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            <NavBar />
            <div className="homeContainer">
                <h1>Welcome to the Idle Coin Game!</h1>
                <p>Start collecting coins and upgrading your earnings.</p>
                {currentUser ? (
                    <Link to="/game">
                        <button className="homeButton">Start Game</button>
                    </Link>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="homeButton">Log In</button>
                        </Link>
                        <Link to="/signup">
                            <button className="homeButton">Sign Up</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
