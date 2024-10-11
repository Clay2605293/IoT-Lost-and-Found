const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3000', // Permitir solicitudes desde localhost
  methods: ['GET', 'POST'],        // Métodos permitidos
  allowedHeaders: ['Content-Type'] // Encabezados permitidos
}));



app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: '127.0.0.1', // Cambia 'localhost' a '127.0.0.1'
  user: 'root',
  password: 'SolSna260593',
  database: 'test'
});

// Conexión a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Ruta para obtener los usuarios
app.get('/users', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).send('Error al obtener los usuarios');
      return;
    }
    res.json(results);
  });
});

// Iniciar el servidor en el puerto 3001
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
