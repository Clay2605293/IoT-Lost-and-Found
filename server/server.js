const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Volvemos a usar bcrypt para encriptar las contraseñas
const jwt = require('jsonwebtoken'); // Para manejar autenticación con JWT

const app = express();
const JWT_SECRET = 'clave-secreta-del-jwt'; // Cambia esto por una clave secreta más segura

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3000', // Permitir solicitudes desde localhost
  methods: ['GET', 'POST'],        // Métodos permitidos
  allowedHeaders: ['Content-Type'] // Encabezados permitidos
}));

app.use(express.json()); // Para manejar JSON en las solicitudes

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: '127.0.0.1',
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

// Ruta para el login (verificación de Matrícula y contraseña usando bcrypt)
app.post('/login', (req, res) => {
  const { Matricula, password } = req.body;

  // Verificar si el usuario existe en la base de datos
  db.query('SELECT * FROM Users WHERE Matricula = ?', [Matricula], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).send('Error en la autenticación');
    }

    if (results.length === 0) {
      return res.status(401).send('Usuario no encontrado');
    }

    const user = results[0];

    // Comparar la contraseña proporcionada con la contraseña encriptada almacenada
    bcrypt.compare(password, user.Password, (err, isMatch) => {
      if (err) {
        console.error('Error al verificar la contraseña:', err);
        return res.status(500).send('Error en la autenticación');
      }

      if (!isMatch) {
        return res.status(401).send('Contraseña incorrecta');
      }

      // Si la contraseña es correcta, crear un token JWT
      const token = jwt.sign({ Matricula: user.Matricula }, JWT_SECRET, { expiresIn: '1h' });

      // Enviar el token al cliente
      res.json({ token });
    });
  });
});

// Ruta opcional para registrar un nuevo usuario (guarda la contraseña usando bcrypt)
app.post('/register', (req, res) => {
  const { Matricula, password, name } = req.body;

  // Encriptar la contraseña usando bcrypt
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error al encriptar la contraseña:', err);
      return res.status(500).send('Error al registrar usuario');
    }

    // Guardar el usuario con la matrícula y la contraseña encriptada
    db.query('INSERT INTO Users (Matricula, Password, Name) VALUES (?, ?, ?)', [Matricula, hash, name], (err, results) => {
      if (err) {
        console.error('Error al insertar usuario:', err);
        return res.status(500).send('Error al registrar usuario');
      }

      res.send('Usuario registrado correctamente');
    });
  });
});

// Iniciar el servidor en el puerto 3001
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
