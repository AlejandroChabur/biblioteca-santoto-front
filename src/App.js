import React from 'react';
import { Routes, Route } from "react-router-dom";
// Importa tus componentes
import './App.css';
import Home from './components/Home';
import LoginFormSesion from "./components/LoginScreens/LoginFormSesion"; 
import LoginForm from "./components/LoginScreens/LoginForm"; 
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from "./components/AdminDashBoard";

const App = () => {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginFormSesion />} /> 
                <Route path="/register" element={<LoginForm />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />

              
            </Routes>
        </div>
    );
};

export default App;
