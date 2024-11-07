import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode-generator';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [selectedQR, setSelectedQR] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:3001/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUserData(response.data);

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

  const handleShowQR = (product) => {
    const qr = QRCode(0, 'L');
    qr.addData(`http://localhost:3001/api/products/${product.id}`);
    qr.make();
    setSelectedQR(qr.createDataURL());
  };

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
                <button onClick={() => handleShowQR(product)}>Ver QR</button>
                <button onClick={() => console.log("Abrir modal para editar/borrar")}>Editar/Borrar</button>
              </li>
            ))}
          </ul>

          {selectedQR && (
            <div>
              <h3>Código QR para el objeto seleccionado:</h3>
              <img src={selectedQR} alt="QR Code" />
              <button onClick={() => setSelectedQR(null)}>Cerrar QR</button>
            </div>
          )}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Dashboard;
