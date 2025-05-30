import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import Dashboard from './components/Dashboard';

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
