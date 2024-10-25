import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Función para manejar el registro
  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { Matricula: matricula, password, name })
      .then(response => {
        setMessage('Usuario registrado correctamente');
        setError('');
        navigate('/'); // Redirigir al login después del registro
      })
      .catch(err => {
        setError('Error al registrar usuario');
        console.error('Error en el registro:', err);
      });
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <button onClick={() => navigate('/')}>
        ¿Ya tienes cuenta? Inicia sesión
      </button>
    </div>
  );
}

export default Registro;
