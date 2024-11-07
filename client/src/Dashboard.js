import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode-generator';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root'); // Configura el elemento raíz para accesibilidad

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [selectedQR, setSelectedQR] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [error, setError] = useState('');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('');
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
    setIsQRModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product); // Selecciona el producto para editar
    setEditName(product.Name); // Rellena el formulario con datos actuales
    setEditType(product.Type);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = () => {
    // Lógica para actualizar el producto en la base de datos
    axios.put(`http://localhost:3001/api/product/${selectedProduct.id}`, {
      Name: editName,
      Type: editType
    })
    .then(() => {
      // Actualiza el estado de los productos sin recargar
      setUserProducts(prevProducts =>
        prevProducts.map(p => (p.id === selectedProduct.id ? { ...p, Name: editName, Type: editType } : p))
      );
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    })
    .catch(err => {
      console.error('Error al actualizar el producto:', err);
      setError('Error al actualizar el producto');
    });
  };

  const handleDeleteProduct = () => {
    // Lógica para eliminar el producto
    axios.delete(`http://localhost:3001/api/product/${selectedProduct.id}`)
    .then(() => {
      // Elimina el producto del estado sin recargar
      setUserProducts(prevProducts => prevProducts.filter(p => p.id !== selectedProduct.id));
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    })
    .catch(err => {
      console.error('Error al eliminar el producto:', err);
      setError('Error al eliminar el producto');
    });
  };

  const closeModal = () => {
    setIsQRModalOpen(false);
    setSelectedQR(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
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
                <button onClick={() => handleEdit(product)}>Editar/Borrar</button>
              </li>
            ))}
          </ul>

          {/* Modal para QR */}
          <ReactModal
            isOpen={isQRModalOpen}
            onRequestClose={closeModal}
            contentLabel="Código QR"
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }
            }}
          >
            <h3>Código QR para el objeto seleccionado:</h3>
            {selectedQR && <img src={selectedQR} alt="QR Code" style={{ width: '150px', height: '150px' }} />}
            <button onClick={closeModal}>Cerrar</button>
          </ReactModal>

          {/* Modal para Editar/Borrar */}
          <ReactModal
            isOpen={isEditModalOpen}
            onRequestClose={closeEditModal}
            contentLabel="Editar/Borrar Producto"
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }
            }}
          >
            <h3>Editar Producto</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nombre del producto"
            />
            <select value={editType} onChange={(e) => setEditType(e.target.value)}>
              <option value="Dispositivo electrónico">Dispositivo electrónico</option>
              <option value="Mochila">Mochila</option>
              <option value="Recipiente de comida">Recipiente de comida</option>
              <option value="Recipiente de bebida">Recipiente de bebida</option>
              <option value="Objeto personal">Objeto personal</option>
              <option value="Otros">Otros</option>
            </select>
            <button onClick={handleUpdateProduct}>Actualizar</button>
            <button onClick={handleDeleteProduct} style={{ backgroundColor: 'red', color: 'white' }}>Eliminar</button>
            <button onClick={closeEditModal}>Cancelar</button>
          </ReactModal>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Dashboard;
