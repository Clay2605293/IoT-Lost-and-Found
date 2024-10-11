import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  // Función para obtener los usuarios desde el backend
  useEffect(() => {
    axios.get('http://localhost:3001/users') // Cambia la IP por 'localhost'
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);
  
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Usuarios</h1>
        <ul>
          {users.map(user => (
            <li key={user.ID}>{user.Name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
