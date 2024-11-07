// productController.js
const db = require('../config/db');

exports.addProduct = (req, res) => {
  const { matricula, Name, Status, Type } = req.body;
  if (!matricula || !Name || !Status || !Type) {
    return res.status(400).send('Todos los campos son requeridos');
  }
  db.query(
    'INSERT INTO Objects (Matricula, Name, Status, Type) VALUES (?, ?, ?, ?)',
    [matricula, Name, Status, Type],
    (err) => {
      if (err) return res.status(500).send('Error al registrar producto');
      res.send('Producto registrado correctamente');
    }
  );
};

exports.getUserProducts = (req, res) => {  // Asegúrate de que esté definido
  const { matricula } = req.params;
  db.query(
    'SELECT * FROM Objects WHERE Matricula = ?',
    [matricula],
    (err, results) => {
      if (err) {
        console.error('Error al obtener los objetos:', err);
        return res.status(500).send('Error al obtener los objetos del usuario');
      }
      res.json(results);
    }
  );
};
