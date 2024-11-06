import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Solicitud al backend para obtener los datos del usuario
      axios.get('http://localhost:3001/auth/user', {  // Cambia /user por /auth/user
        headers: {
          Authorization: `Bearer ${token}` // Enviar el token JWT en la cabecera
        }
      })
      .then(response => {
        setUserData(response.data); // Guardar los datos del usuario en el estado
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          // Si el error es 401, elimina el token y redirige al login
          localStorage.removeItem('token');
          navigate('/'); // Redirige al login
        } else {
          setError('Error al cargar los datos del usuario');
          console.error('Error al obtener los datos del usuario:', err);
        }
      });
    } else {
      setError('No se encontró el token de autenticación. Inicia sesión nuevamente.');
      navigate('/');
    }
  }, [navigate]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      {userData ? (
        <div>
          <h1>Bienvenido, {userData.Name}</h1> 
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Dashboard;
