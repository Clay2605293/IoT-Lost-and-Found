import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Verificar si el usuario ya está logueado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirigir al Dashboard si el token existe
      navigate('/dashboard');
    }
  }, [navigate]);

  // Función para manejar el login
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/auth/login', { Matricula: matricula, password })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token); // Guardar el token en localStorage
        navigate('/dashboard'); // Redirigir al Dashboard después de iniciar sesión
      })
      .catch(err => {
        setError('Matrícula o contraseña incorrectos');
        console.error('Error en el login:', err);
      });
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
