import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Confirmation';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Events from "./pages/Events";
import Confirmation from './pages/Confirmation';
import ChatSupport from "./pages/ChatSupport";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container my-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetails />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/checkout/success" element={<Checkout success />} />
                    <Route path="/checkout/cancel" element={<Checkout cancel />} />
                    <Route path="/admin" element={<ProtectedRoute admin><AdminDashboard /></ProtectedRoute>} />
                </Routes>
            </div>

            {/* 👇 Add ChatSupport here so it appears on all pages */}
            <ChatSupport />
        </BrowserRouter>
    );
}

export default App;
