import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginScreen from './screens/LoginScreen';
import ProductListScreen from './screens/ProductListScreen';
import { useAuth } from './context/AuthContext';

function App() {
  const auth = useAuth();

  const authenticatedRoutes = (
    <Routes>
      <Route path="/products" element={<ProductListScreen />} />
      <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
  );

  return (
    <Router>
      {auth.isAuthenticated ? (
        authenticatedRoutes
      ) : (
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
