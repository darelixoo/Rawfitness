import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/membership'); // Redirects to Membership page
    };

    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden">
            {/* Background Video */}
            <video 
                autoPlay 
                loop 
                muted 
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/6388427-uhd_3840_2160_25fps.mp4" type="video/mp4" /> 
            </video>

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            
            {/* Content Section */}
            <div className="relative z-10 text-center px-4 py-16 text-white">
                <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
                    Welcome to <span className="text-yellow-500">RawFitness</span>
                </h1>
                <p className="text-xl mb-6 font-medium drop-shadow-md">
                    Join us on your journey to fitness with personalized training, world-class equipment, and flexible membership plans.
                </p>

                {/* Benefits Section */}
                <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8 text-lg">
                    <div className="bg-yellow-500 bg-opacity-75 p-4 rounded-lg shadow-md">
                        <p>✅ Open 7 Days a Week</p>
                    </div>
                    <div className="bg-yellow-500 bg-opacity-75 p-4 rounded-lg shadow-md">
                        <p>✅ State-of-the-Art Equipment</p>
                    </div>
                    <div className="bg-yellow-500 bg-opacity-75 p-4 rounded-lg shadow-md">
                        <p>✅ Personalized Training</p>
                    </div>
                </div>

                {/* Get Started Button */}
                <button 
                    onClick={handleGetStarted} 
                    className="mt-10 px-8 py-4 bg-yellow-500 text-gray-900 font-bold text-lg rounded-full hover:bg-yellow-600 transition-transform transform hover:scale-105 shadow-lg"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Home;
