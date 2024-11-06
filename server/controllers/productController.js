const db = require('../config/db');

exports.addProduct = (req, res) => {
  const { matricula, Status, Foto } = req.body;

  if (!matricula || !Status || !Foto) {
    return res.status(400).send('Todos los campos son requeridos');
  }

  db.query(
    'INSERT INTO Objects (Matricula, Status, Foto) VALUES (?, ?, ?)',
    [matricula, Status, Foto],
    (err) => {
      if (err) return res.status(500).send('Error al registrar producto');
      res.send('Producto registrado correctamente');
    }
  );
};
