//src/pages/Dashboard.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const username = localStorage.getItem('username'); //get username from localStorage
    const [qrCode, setQrCode] = useState(null);

    const handleGenerateQR = async () => {
        try {
            const token = localStorage.getItem('token'); // get jwt token for authorization
            const response = await axios.get('http://localhost:5000/api/qr/generate', {
                headers: {
                    Authorization: `Bearer ${token}`, //pass token in headers
                },
            });
            setQrCode(response.data.qrCode); //qr code data
        } catch (error) {
            alert(error.response.data.message || 'Error generating QR code!');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Welcome, {username || 'User'}</h2>
            
            <button
                onClick={handleGenerateQR}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Get QR Code
            </button>
            {qrCode && (
                <div className="mt-6">
                    <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                    <p className="text-gray-600 mt-2">Scan to enter the gym</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
