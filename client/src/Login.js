import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Cambiar useHistory por useNavigate

function Login() {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Cambiar a useNavigate para redirigir

  // Función para manejar el login
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { Matricula: matricula, password })
      .then(response => {
        const { token, name } = response.data;
        localStorage.setItem('token', token); // Guardar el token en localStorage
        localStorage.setItem('name', name); // Guardar el nombre en localStorage
        setError('');
        navigate('/dashboard'); // Redirigir a la pantalla principal
      })
      .catch(err => {
        setError('Matrícula o contraseña incorrectos');
        console.error('Error en el login:', err);
      });
  };

  return (
    <div className="Login">
      <h1>Iniciar Sesión</h1>
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
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Enlace para redirigir al registro */}
      <button onClick={() => navigate('/registro')}>
        ¿No tienes cuenta? Regístrate
      </button>
    </div>
  );
}

export default Login;
