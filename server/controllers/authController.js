const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/jwtUtils');

exports.login = (req, res) => {
  const { Matricula, password } = req.body;

  db.query('SELECT * FROM Users WHERE Matricula = ?', [Matricula], (err, results) => {
    if (err) return res.status(500).send('Error en la autenticación');

    if (results.length === 0) return res.status(401).send('Usuario no encontrado');

    const user = results[0];
    bcrypt.compare(password, user.Password, (err, isMatch) => {
      if (!isMatch) return res.status(401).send('Contraseña incorrecta');

      const token = jwt.sign({ matricula: user.Matricula, name: user.Name }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, name: user.Name });
    });
  });
};

exports.register = (req, res) => {
  const { Matricula, password, name, phone, email } = req.body;

  if (!Matricula || !password || !name || !phone || !email) {
    return res.status(400).send('Todos los campos son requeridos');
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).send('Error al registrar usuario');

    db.query(
      'INSERT INTO Users (Matricula, Password, Name, Phone, Email) VALUES (?, ?, ?, ?, ?)',
      [Matricula, hash, name, phone, email],
      (err) => {
        if (err) return res.status(500).send('Error al registrar usuario');
        res.send('Usuario registrado correctamente');
      }
    );
  });
};

exports.getUser = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });

    db.query('SELECT * FROM Users WHERE Matricula = ?', [decoded.matricula], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error al obtener los datos del usuario' });
      res.json(results[0]);
    });
  });
};
