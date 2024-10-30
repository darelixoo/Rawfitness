// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    RawFitness
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/membership" className="hover:underline">Membership</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
