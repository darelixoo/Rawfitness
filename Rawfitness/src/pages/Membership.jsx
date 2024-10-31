// src/pages/Membership.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Membership = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleBuyMembership = async (membershipType) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/membership/buy',
                { membershipType },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccessMessage(response.data.message);
            setTimeout(() => navigate('/dashboard'), 1500); // Redirect after 1.5 seconds
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error purchasing membership.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
            <h2 className="text-4xl font-bold text-blue-600 mb-6">Membership Plans</h2>
            {errorMessage && <p className="text-red-500 mb-4 bg-red-100 p-2 rounded">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mb-4 bg-green-100 p-2 rounded">{successMessage}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl">
                {[
                    { type: '1 Year', price: 10000 },
                    { type: '6 Months', price: 6000 },
                    { type: '3 Months', price: 4000 },
                    { type: '1 Month', price: 2000 }
                ].map(plan => (
                    <div key={plan.type} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <h3 className="text-2xl font-semibold mb-2 text-gray-800">{plan.type}</h3>
                        <p className="text-lg mb-6 text-gray-600">₹{plan.price}</p>
                        <button 
                            className="mt-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition capitalize"
                            onClick={() => handleBuyMembership(plan.type.toLowerCase())}
                        >
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Membership;
