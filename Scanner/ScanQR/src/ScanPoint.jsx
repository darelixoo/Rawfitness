import React, { useState, useCallback, useEffect, useRef } from 'react';
import QrScanner from 'react-qr-scanner';
import axios from 'axios';

const ScanPoint = () => {
    const [message, setMessage] = useState('');
    const [isScanning, setIsScanning] = useState(false); // prevents multiple scans
    const timeoutRef = useRef(null); // for handling timeout reset
    const scannerRef = useRef(null); // for forcing scanner reset

    const handleScan = useCallback(
        async (scannedData) => {
            if (scannedData && scannedData.text && !isScanning) {
                console.log("Scanned Data: ", scannedData.text);
                setIsScanning(true);

                try {
                    const response = await axios.post('http://localhost:5000/api/scan', {
                        qrCode: scannedData.text,
                    });
                    console.log("API Response: ", response);
                    setMessage(response.data.message || 'Scan successful.');

                    // force reset scanner
                    if (scannerRef.current) {
                        scannerRef.current.state.delay = 0;
                        setTimeout(() => {
                            scannerRef.current.state.delay = 1000; // reset delay after pause
                        }, 500);
                    }

                    // clear message and scanning lock
                    timeoutRef.current = setTimeout(() => {
                        setMessage('');
                        setIsScanning(false);
                    }, 1500);
                } catch (error) {
                    console.error('Error during API call:', error);
                    setMessage(error.response?.data?.message || 'An error occurred while scanning.');

                    // Clear message and scanning lock
                    timeoutRef.current = setTimeout(() => {
                        setMessage('');
                        setIsScanning(false);
                    }, 1500);
                }
            }
        },
        [isScanning]
    );

    const handleError = (err) => {
        console.error('Scan error:', err);
    };

    // cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Scan Your QR Code</h2>
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <QrScanner
                    ref={scannerRef}
                    delay={1000}  // Increased delay to 1 second
                    onError={handleError}
                    onScan={handleScan}
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
