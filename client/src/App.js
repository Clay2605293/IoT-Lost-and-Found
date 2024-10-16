import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre registro y login
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Solo usado en registro
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Función para manejar el login
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { Matricula: matricula, password })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token); // Guardar el token en localStorage
        setMessage('Login exitoso');
        setError('');
      })
      .catch(err => {
        setError('Matrícula o contraseña incorrectos');
        console.error('Error en el login:', err);
      });
  };

  // Función para manejar el registro
  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { Matricula: matricula, password, name })
      .then(response => {
        setMessage('Usuario registrado correctamente');
        setError('');
        setIsRegistering(false); // Cambiar al modo de login después de registrarse
      })
      .catch(err => {
        setError('Error al registrar usuario');
        console.error('Error en el registro:', err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{isRegistering ? 'Registro' : 'Login'}</h1>

        {/* Formularios */}
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
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
          
          {isRegistering && (
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <button type="submit">{isRegistering ? 'Registrar' : 'Login'}</button>
        </form>

        {/* Alternar entre registro y login */}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>

        {/* Mensajes de error y éxito */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </header>
    </div>
  );
}

export default App;
