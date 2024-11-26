const express = require('express');
const router = express.Router();
const db = require('../db'); // Módulo de conexión a la base de datos

// Registrar un nuevo usuario
router.post('/register', (req, res) => {
  const { nombre, correo, pwd, telefono, domicilio } = req.body;
  const query = `INSERT INTO cliente (nombre, correo, pwd, telefono, domicilio) VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [nombre, correo, pwd, telefono, domicilio], (err, result) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).json({ error: 'Error al registrar el usuario' });
    } else {
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    }
  });
});

module.exports = router;
