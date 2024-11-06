import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "styles/SignUpIn.ccs";

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
    axios.post('http://localhost:3001/login', { Matricula: matricula, password })
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
    <div className="container">
      <div className="c1">
        <div className="c11">
          <h1 className="mainhead">LOST AND FOUND</h1>
        </div>
        <div className="c2">
          <form className="signin" onSubmit={handleLogin}>
            <h1 className="signup1">SIGN IN</h1>
            <br /><br /><br /><br />
            <input
              name="username"
              type="text"
              placeholder="Matrícula*"
              className="username"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña*"
              className="username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn">Get Started</button>
            <br /><br /><br /><br />
            <a href="">
              <p className="signup2">Forget Password?</p>
            </a>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
