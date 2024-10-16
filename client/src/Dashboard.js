import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [name, setName] = useState('');

  useEffect(() => {
    // Obtener el nombre almacenado en localStorage
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    } else {
      // Si no hay nombre, redirigir al login
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="Dashboard">
      <h1>Bienvenido, {name}</h1>
    </div>
  );
}

export default Dashboard;
