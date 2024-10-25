import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Función para manejar el login
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { Matricula: matricula, password })
      .then(response => {
        const { token } = response.data; // Obtenemos solo el token
        localStorage.setItem('token', token); // Guardamos el token en localStorage
        setMessage('Login exitoso');
        setError('');
        navigate('/dashboard'); // Redirigir al dashboard después del login exitoso
      })
      .catch(err => {
        setError('Matrícula o contraseña incorrectos');
        console.error('Error en el login:', err);
      });
  };

  return (
    <div>
      <h1>Login</h1>
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
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <button onClick={() => navigate('/registro')}>
        ¿No tienes cuenta? Regístrate
      </button>
    </div>
  );
}

export default Login;
