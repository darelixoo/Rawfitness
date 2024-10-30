// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, mobile }),
        });

        if (response.ok) {
            alert('Registration successful! You can now log in.');
            navigate('/login'); // Redirect to Login page
        } else {
            const data = await response.json();
            alert(data.message || 'Registration failed! Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleRegister}>
                <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Register</h2>
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
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
                />
                <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
                    Register
                </button>
                <p className="text-center mt-4">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here</a>
                </p>
            </form>
        </div>
    );
};

export default Register;