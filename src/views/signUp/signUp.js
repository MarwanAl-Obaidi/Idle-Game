import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import { useAuth } from '../../components/authContext/authContext.js';
import { useNavigate } from 'react-router-dom';
import './signUp.css';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await signup(email, password);
            alert("Signed up successfully!");
            navigate("/game");
        } catch (error) {
            alert("Failed to sign up: " + error.message);
        }
    }

    return (
        <div>
            <NavBar />
            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="signup-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        className="signup-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <input
                        type="password"
                        className="signup-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                    <button className="signup-button" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}
