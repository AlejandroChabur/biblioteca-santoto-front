import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import LoginFormSesion from './components/LoginScreens/LoginFormSesion';
import LoginForm from './components/LoginScreens/LoginForm';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashBoard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginFormSesion />} />
                <Route path="/register" element={<LoginForm />} />

                {/* Rutas protegidas */}
                <Route
                    path="/student-dashboard"
                    element={<ProtectedRoute element={<StudentDashboard />} path="/student-dashboard" />}
                />
                <Route
                    path="/admin-dashboard"
                    element={<ProtectedRoute element={<AdminDashboard />} path="/admin-dashboard" />}
                />
            </Routes>
        </div>
    );
};

export default App;
