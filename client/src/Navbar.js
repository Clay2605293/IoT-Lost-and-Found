import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Opcional: archivo CSS para estilos

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Login</Link>
      <Link to="/registro">Registro</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/alta-producto">Alta de Producto</Link>
      <Link to="/send-message">Enviar Mensaje</Link>
    </nav>
  );
}

export default Navbar;
