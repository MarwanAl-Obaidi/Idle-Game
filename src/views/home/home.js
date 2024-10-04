import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={styles.container}>
            <h1>Welcome to the Idle Coin Game!</h1>
            <p>Start collecting coins and upgrading your earnings.</p>
            <Link to="/game">
                <button style={styles.button}>Start Game</button>
            </Link>
        </div>
    );
};

const styles = {
    container: { textAlign: 'center', marginTop: '50px' },
    button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' },
};

export default Home;
