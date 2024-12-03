// import React, { useState } from 'react';
// import './Auth.css';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function AdminLogin() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/admin/login', { email, password });
//             localStorage.setItem('token', response.data.token);
//             navigate('/admin/dashboard');
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2>Admin Login</h2>
//             <form onSubmit={handleLogin}>
//                 <label>Email:</label>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />

//                 <label>Password:</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />

//                 <button type="submit" className="btn">Login</button>
//             </form>
//             <p>
//                 <Link to="/admin/forgot-password">Forgot Password?</Link>
//             </p>
//         </div>
//     );
// }

// export default AdminLogin;
// import React, { useState } from 'react';
// import './Auth.css'; // Style for the form
// import { useNavigate } from 'react-router-dom';

// function LoginForm() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Simulate login (replace with actual API call)
//             if (email === "admin@example.com" && password === "password") {
//                 // Save token or session (if required)
//                 localStorage.setItem('isLoggedIn', true);
//                 navigate('/admin/dashboard'); // Redirect to Admin Dashboard
//             } else {
//                 alert("Invalid credentials");
//             }
//         } catch (error) {
//             console.error("Login failed", error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="auth-form">
//             <h2>Admin Login</h2>
//             <label>Email:</label>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//             <label>Password:</label>
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//             <button type="submit" className="btn">Login</button>
//         </form>
//     );
// }

// export default LoginForm;
import React, { useState } from 'react';
import './Auth.css';
import { useNavigate, Link } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Simulated login logic
            if (email === 'admin@example.com' && password === 'password') {
                localStorage.setItem('isLoggedIn', true);
                navigate('/admin/dashboard');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleLogin} className="auth-form">
            <h2>Admin Login</h2>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="btn">Login</button>
            <p>
                <Link to="/admin/forgot-password">Forgot Password?</Link>
            </p>
        </form>
    );
}

export default LoginForm;
