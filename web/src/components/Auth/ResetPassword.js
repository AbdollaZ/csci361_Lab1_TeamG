import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';

function ResetPassword() {
    const { token } = useParams(); // Get token from the URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            await axios.post('/admin/reset-password', { token, password });
            setMessage('Password reset successful.');
            navigate('/admin/login');
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <label>New Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn">Reset Password</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default ResetPassword;
