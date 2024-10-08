import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { useAuth } from '../authContext/authContext.js'; // Import useAuth hook

const NavBar = () => {
    const { currentUser, logout } = useAuth(); // Get current user and logout function

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    return (
        <nav className="navbar">
            <ul className="navList">
                <li className="navItem">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "activeNavLink" : "navLink")}>
                        Home
                    </NavLink>
                </li>
                <li className="navItem">
                    <NavLink to="/leaderboards" className={({ isActive }) => (isActive ? "activeNavLink" : "navLink")}>
                        Leaderboards
                    </NavLink>
                </li>
                {currentUser && (
                    <li className="navItem">
                        <NavLink to="/game" className={({ isActive }) => (isActive ? "activeNavLink" : "navLink")}>
                            Game
                        </NavLink>
                    </li>
                )}
                {!currentUser ? (
                    <>
                        <li className="navItem">
                            <NavLink to="/login" className={({ isActive }) => (isActive ? "activeNavLink" : "navLink")}>
                                Log In
                            </NavLink>
                        </li>
                        <li className="navItem">
                            <NavLink to="/signup" className={({ isActive }) => (isActive ? "activeNavLink" : "navLink")}>
                                Sign Up
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <li className="navItem">
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
