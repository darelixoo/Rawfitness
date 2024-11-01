import React, { useState, useCallback, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import axios from 'axios';

const ScanPoint = () => {
    const [data, setData] = useState('');
    const [message, setMessage] = useState('');
    const [isScanning, setIsScanning] = useState(false); // Prevents multiple scans

    const handleScan = useCallback(
        async (scannedData) => {
            // Check for valid scanned data and prevent double scans
            if (scannedData && scannedData.text && scannedData.text !== data) {
                console.log("Scanned Data: ", scannedData.text); // Log scanned data
                setData(scannedData.text); // Update the scanned data
                setIsScanning(true); // Lock scanning

                try {
                    const response = await axios.post('http://localhost:5000/api/scan', {
                        qrCode: scannedData.text,
                    });
                    console.log("API Response: ", response); // Log API response
                    setMessage(response.data.message || 'Scan successful.');

                    // Reset state after a delay to allow for another scan
                    setTimeout(() => {
                        setMessage(''); // Clear message
                        setData(''); // Clear scanned data for the next scan
                        setIsScanning(false); // Unlock scanning
                    }, 1500);
                } catch (error) {
                    console.error('Error during API call:', error);
                    const errorMsg = error.response?.data?.message || 'An error occurred while scanning.';
                    setMessage(errorMsg);

                    // Reset state after a delay
                    setTimeout(() => {
                        setMessage(''); // Clear message
                        setData(''); // Clear scanned data for the next scan
                        setIsScanning(false); // Unlock scanning
                    }, 1500);
                }
            }
        },
        [data] // Dependencies
    );

    const handleError = (err) => {
        console.error('Scan error:', err);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Scan Your QR Code</h2>
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <QrScanner
                    delay={300}
                    onError={handleError}
                    onScan={isScanning ? () => {} : handleScan} // Prevent scanning if already scanning
                    style={{ width: '100%' }}
                />
            </div>

            {message && (
                <p className="mt-4 text-lg font-semibold transition-opacity duration-300 ease-in-out text-center"
                   style={{ color: message.includes('successful') ? 'green' : 'red' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default ScanPoint;
