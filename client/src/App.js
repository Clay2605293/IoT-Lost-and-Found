import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registro from './Registro';
import Dashboard from './Dashboard';
import AltaProducto from './AltaProducto';
import SendMessage from './SendMessage'; // Supongamos que esta es la nueva página para enviar mensajes
import Navbar from './Navbar'; // Importa el Navbar

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alta-producto" element={<AltaProducto />} />
        <Route path="/send-message" element={<SendMessage />} />
      </Routes>
    </div>
  );
}

export default App;
