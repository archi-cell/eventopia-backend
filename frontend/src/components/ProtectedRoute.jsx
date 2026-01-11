import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, admin = false }) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) return <Navigate to="/login" />;
    if (admin && user.role !== 'admin') return <Navigate to="/" />;
    return children;
}
