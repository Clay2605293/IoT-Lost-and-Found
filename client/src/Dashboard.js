import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [userProducts, setUserProducts] = useState([]); // Estado para almacenar los productos
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Solicitud para obtener los datos del usuario
      axios.get('http://localhost:3001/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUserData(response.data);

        // Después de obtener los datos del usuario, obtener los productos asociados
        axios.get(`http://localhost:3001/api/products/${response.data.Matricula}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(productResponse => {
          setUserProducts(productResponse.data);
        })
        .catch(err => {
          console.error('Error al obtener los objetos del usuario:', err);
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
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
          <h2>Tus objetos:</h2>
          <ul>
            {userProducts.map((product) => (
              <li key={product.id}>
                {product.Name} - {product.Type} - {product.Status}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Dashboard;
