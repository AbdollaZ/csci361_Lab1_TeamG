import React from 'react';
import LoginForm from './Auth/AdminLogin';
import './Home.css'; // Optional styles for the home page

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Admin Dashboard</h1>
            <p>Please log in to access your dashboard</p>
            <LoginForm />
        </div>
    );
}


export default Home;
