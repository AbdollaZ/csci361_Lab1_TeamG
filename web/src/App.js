import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import RegisterAdmin from './components/Auth/RegisterAdmin';
function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
                <Route path="/admin/register" element={<RegisterAdmin />} />
            </Routes>
        </div>
    );
}

export default App;

