import React, { useState } from 'react';
import './Auth.css';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/forgot-password', { email });
            setMessage('A password reset link has been sent to your email.');
        } catch (error) {
            console.error('Error sending reset email:', error);
            setMessage('Failed to send reset email. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="btn">Send Reset Link</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default ForgotPassword;
