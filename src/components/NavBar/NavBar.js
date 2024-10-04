import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/game" style={styles.navLink}>Game</Link>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#282c34',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-around',
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    },
    navItem: {
        margin: '0 10px',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
    },
};

export default NavBar;
