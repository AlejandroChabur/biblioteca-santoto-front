import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Administrador from './components/Administrador';
import AboutUs from './components/AboutUs';
import Catalogo from './components/Catalogo';
import SearchResults from './components/SearchResults'; // Importa el componente de resultados de búsqueda
import Navigation from './components/Navigation';

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/administrador" element={<Administrador />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/catalogo" element={<Catalogo />} /> {/* Ruta del catálogo */}
                <Route path="/search" element={<SearchResults />} /> {/* Nueva ruta para resultados de búsqueda */}
            </Routes>
        </Router>
    );
}

export default App;
