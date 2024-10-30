// src/pages/Membership.jsx
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Membership = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleBuyMembership = async (membershipType) => {
        try {
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
            const response = await axios.post(
                'http://localhost:5000/api/membership/buy', // Update with your API endpoint
                { membershipType },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(response.data.message); // Notify success
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error purchasing membership.");
        }
    };

    return (
        <div className="flex flex-col items-center text-center py-12 px-4">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Membership Plans</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
                {[
                    { type: '1 Year', price: 10000 },
                    { type: '6 Months', price: 6000 },
                    { type: '3 Months', price: 4000 },
                    { type: '1 Month', price: 2000 }
                ].map(plan => (
                    <div key={plan.type} className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col">
                        <h3 className="text-xl font-semibold mb-2">{plan.type}</h3>
                        <p className="text-lg mb-4">₹{plan.price}</p>
                        <button 
                            className="mt-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
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
