import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScanPoint from './ScanPoint';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ScanPoint />} />
                
            </Routes>
        </Router>
    );
};

export default App;
