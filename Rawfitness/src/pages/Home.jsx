// src/pages/Home.jsx
import React from 'react';

const Home = () => {
    return (
        <div className="text-center py-16 px-4">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to RawFitness</h1>
            <p className="text-lg text-gray-700 mb-4">
                Join us on your journey to fitness with personalized training, world-class equipment, and flexible membership plans.
            </p>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
                Get Started
            </button>
        </div>
    );
};

export default Home;
