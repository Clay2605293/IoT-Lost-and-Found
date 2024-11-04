import React from 'react';

function SendMessage() {
  const sendMessage = () => {
    // Número de WhatsApp y mensaje predefinido
    const number = '14155238886'; // Sin el signo +
    const message = 'join shoot-they';

    // Formatear el enlace de WhatsApp
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

    // Abrir el enlace en una nueva pestaña
    window.open(url, '_blank');
  };

  return (
    <div>
      <h1>Enviar Mensaje de WhatsApp</h1>
      <button onClick={sendMessage}>Enviar Mensaje</button>
    </div>
  );
}

export default SendMessage;
