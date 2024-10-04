import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navList">
                <li className="navItem">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "activeNavLink" : "navLink")}>
                        Home
                    </NavLink>
                </li>
                <li className="navItem">
                    <NavLink to="/game" className={({ isActive }) => (isActive ? "activeNavLink" : "navLink")}>
                        Game
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
