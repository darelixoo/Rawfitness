// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });
            
            // store the jwt token in local storage
            localStorage.setItem('token', response.data.token);
            navigate('/Dashboard'); // redirect to dashboard
        } catch (error) {
            // Handle errors and alert the user
            alert(error.response?.data.message || 'Login failed! Please check your credentials.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleLogin}>
                <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
                />
                <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
                    Login
                </button>
                <p className="text-center mt-4">
                    New Client? <a href="/register" className="text-blue-600 hover:underline">Register here</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
