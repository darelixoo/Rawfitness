// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Membership from './pages/Membership';
import Dashboard from './pages/Dashboard';

// Private Route component to protect the Dashboard
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check if token is in localStorage
    return token ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
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
