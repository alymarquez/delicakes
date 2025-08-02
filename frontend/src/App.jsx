import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider'

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Nosotros from './pages/SobreNosotros';
import Contacto from './pages/Contacto';

import CardProducto from './components/CardProducto/CardProducto';
import Login from './components/Login/Login'

import './App.css'
import Carrito from './pages/Carrito';
import DetalleProducto from './components/DetalleProducto/DetalleProducto';

function App() {
  return (
    <AuthProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/catalogo/:categoriaId" element={<CardProducto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos/:idProducto" element={<DetalleProducto/>} />
        </Routes>
      <Footer />
    </AuthProvider>

  )
}

export default App;