import { Routes, Route } from "react-router-dom"; 
// Importa tus componentes
import './App.css';
import Home from './components/Home';
import LoginFormSesion from "./components/LoginScreens/LoginFormSesion"; // Formulario de inicio de sesión
import LoginForm from "./components/LoginScreens/LoginForm"; // Formulario de registro
import PrivateRoute from "./components/routing/PrivateRoute"; // Asegúrate de que este componente esté correctamente implementado
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from "./components/AdminDashBoard";

const App = () => {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginFormSesion />} /> {/* Formulario de inicio de sesión */}
                <Route path="/register" element={<LoginForm />} /> {/* Formulario de registro */}
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                
                {/* Rutas eliminadas para ForgotPassword, ResetPassword y PrivateScreen */}
            </Routes>
        </div>
    );
};

export default App;