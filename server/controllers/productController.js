const db = require('../config/db');

// Función para agregar un producto
exports.addProduct = (req, res) => {
  const { matricula, Name, Status, Type } = req.body;
  if (!matricula || !Name || !Type) {
    return res.status(400).send('Todos los campos son requeridos');
  }

  db.query(
    'INSERT INTO Objects (Matricula, Name, Status, Type) VALUES (?, ?, ?, ?)',
    [matricula, Name, Status || 'encontrado', Type],
    (err) => {
      if (err) {
        console.error('Error al agregar el producto:', err);
        return res.status(500).send('Error al agregar el producto');
      }
      res.send('Producto agregado correctamente');
    }
  );
};

// Función para obtener productos de un usuario
exports.getProductsByUser = (req, res) => {
  const { matricula } = req.params;

  db.query(
    'SELECT * FROM Objects WHERE Matricula = ?',
    [matricula],
    (err, results) => {
      if (err) {
        console.error('Error al obtener productos:', err);
        return res.status(500).send('Error al obtener productos');
      }
      res.json(results);
    }
  );
};

// Función para actualizar el producto
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { Name, Type } = req.body;

  if (!Name || !Type) {
    return res.status(400).send('Todos los campos son requeridos');
  }

  db.query(
    'UPDATE Objects SET Name = ?, Type = ? WHERE id = ?',
    [Name, Type, id],
    (err) => {
      if (err) {
        console.error('Error al actualizar el producto:', err);
        return res.status(500).send('Error al actualizar el producto');
      }
      res.send('Producto actualizado correctamente');
    }
  );
};

// Función para eliminar el producto
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM Objects WHERE id = ?',
    [id],
    (err) => {
      if (err) {
        console.error('Error al eliminar el producto:', err);
        return res.status(500).send('Error al eliminar el producto');
      }
      res.send('Producto eliminado correctamente');
    }
  );
};
