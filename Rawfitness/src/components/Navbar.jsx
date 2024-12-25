// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem('token'); // remove token from local storage
        navigate('/login'); // Redirect to Login page
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    RawFitness
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/membership" className="hover:underline">Membership</Link>
                    
                    {token ? (
                        // Show logout button if user is logged in
                        <button onClick={handleLogout} className="hover:underline">
                            Logout
                        </button>
                    ) : (
                        // Show login and register links if user is not logged in
                        <>
                            <Link to="/login" className="hover:underline">Login</Link>
                            <Link to="/register" className="hover:underline">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
