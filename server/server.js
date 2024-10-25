const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const JWT_SECRET = 'clave-secreta-del-jwt'; // Cambia esto por una clave secreta más segura

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'] // Incluir el header Authorization para enviar el token
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

// Ruta para el login
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

      // Si la contraseña es correcta, crear un token JWT con la Matrícula y el Nombre
      const token = jwt.sign({ matricula: user.Matricula, name: user.Name }, JWT_SECRET, { expiresIn: '1h' });

      // Enviar el token y el nombre al cliente
      res.json({ token, name: user.Name });
    });
  });
});

// Ruta para obtener los datos del usuario autenticado
app.get('/user', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token de la cabecera

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token JWT
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const matricula = decoded.matricula; // Obtener la Matrícula del token decodificado

    // Consultar los datos del usuario en la base de datos usando la Matrícula
    db.query('SELECT * FROM Users WHERE Matricula = ?', [matricula], (err, results) => {
      if (err) {
        console.log('Error en la consulta a la base de datos:', err);
        return res.status(500).json({ message: 'Error al obtener los datos del usuario' });
      }
      
      if (results.length > 0) {
        res.json(results[0]); // Enviar los datos del usuario al frontend
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    });
  });
});

// Ruta para registrar un nuevo usuario (guarda la contraseña usando bcrypt)
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
