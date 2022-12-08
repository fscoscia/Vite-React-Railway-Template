import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginScreen from './screens/LoginScreen';

function App() {

  return (
   <Router>
    <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path="*" element={<Navigate to="/login" />}/>
    </Routes>
   </Router>
    
  )
}

export default App
