import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScanPoint from './ScanPoint';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ScanPoint />} />
                {/* Yahan aur routes add kar sakte hain agar zaroorat ho */}
            </Routes>
        </Router>
    );
};

export default App;
