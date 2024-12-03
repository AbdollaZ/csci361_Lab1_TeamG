import React, { useState } from 'react';
import api from '../../services/api';

function RegisterAdmin() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admins/register', formData);
            alert('Admin registered successfully');
        } catch (error) {
            console.error('Error registering admin:', error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register Admin</h2>
            <label>Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
            <label>Email:</label>
            <input name="email" value={formData.email} onChange={handleChange} required />
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterAdmin;
