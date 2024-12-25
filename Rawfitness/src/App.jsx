import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Membership from './pages/Membership';
import Dashboard from './pages/Dashboard';

// private route component to protect the dashboard
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // check if token is in localStorage
    return token ? children : <Navigate to="/login" />;
};

// redirect handler component
const RedirectIfLoggedIn = ({ children }) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard'); // redirect to dashboard if logged in
        }
    }, [navigate]);
    
    return children;
};

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<RedirectIfLoggedIn><Home /></RedirectIfLoggedIn>} />
                        <Route path="/login" element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
                        <Route path="/membership" element={<Membership />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Dashboard Route */}
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
