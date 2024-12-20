import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Login from './Components/Login';  
import Home from './Components/Home';    



const App = () => {
  return (
    <div className="app-container">
      {/* Routes for different pages */}
      <Routes>
        {/* Redirect default path to Signup */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />



      </Routes>
    </div>
  );
};

export default App;