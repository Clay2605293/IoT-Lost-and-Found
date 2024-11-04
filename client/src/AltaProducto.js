import React, { useState } from 'react';
import axios from 'axios';

function AltaProducto() {
  const [status, setStatus] = useState('perdido'); // Estado predeterminado
  const [foto, setFoto] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Datos del producto
    const productData = {
      matricula: 'A01220835', // Matricula estática, puedes cambiarla o hacerla dinámica
      Status: status,
      Foto: foto
    };

    // Llamada al backend para almacenar el producto
    axios.post('http://localhost:3001/product', productData)
      .then(response => {
        setMessage('Producto registrado correctamente');
        setError('');
        setStatus('perdido');
        setFoto('');
      })
      .catch(err => {
        setError('Error al registrar el producto');
        setMessage('');
        console.error('Error al registrar el producto:', err);
      });
  };

  return (
    <div>
      <h2>Alta de Producto</h2>
      <form onSubmit={handleSubmit}>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="perdido">Perdido</option>
          <option value="encontrado">Encontrado</option>
        </select>
        <input
          type="text"
          placeholder="Foto (URL o nombre del archivo)"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          required
        />
        <button type="submit">Registrar Producto</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AltaProducto;
