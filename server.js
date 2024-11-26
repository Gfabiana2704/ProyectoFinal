const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Usa un puerto dinámico o por defecto 3000

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Tu usuario
  password: 'Rebeca#2704', // Tu contraseña
  database: 'dummping', // Nombre de la base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos dummping');

  // Prueba simple para verificar la conexión
  db.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('Error en consulta de prueba:', err);
    } else {
      console.log('Tablas en la base de datos:', results);
    }
  });
});

// Servir archivos estáticos
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));
app.use(express.static(__dirname));

// Rutas principales

// Ruta inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'inicio.html'));
});

// Registrar un usuario
app.post('/register', (req, res) => {
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

// Obtener lista de productos
app.get('/productos', (req, res) => {
  const query = 'SELECT * FROM producto';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).json({ error: 'Error al obtener los productos' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Agregar producto al carrito
app.post('/add-to-cart', (req, res) => {
  const { productoId, usuarioId, cantidad } = req.body;
  const query = `INSERT INTO carrito (producto_id, usuario_id, cantidad) VALUES (?, ?, ?)`;

  db.query(query, [productoId, usuarioId, cantidad], (err, result) => {
    if (err) {
      console.error('Error al agregar producto al carrito:', err);
      res.status(500).json({ error: 'Error al agregar al carrito' });
    } else {
      res.status(201).json({ message: 'Producto agregado al carrito exitosamente' });
    }
  });
});

// Eliminar producto del carrito
app.delete('/remove-from-cart/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM carrito WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto del carrito:', err);
      res.status(500).json({ error: 'Error al eliminar del carrito' });
    } else {
      res.status(200).json({ message: 'Producto eliminado del carrito exitosamente' });
    }
  });
});

// Confirmar pago
app.post('/pago', (req, res) => {
  const { usuarioId, total, metodoPago } = req.body;
  const query = `INSERT INTO pagos (usuario_id, total, metodo_pago) VALUES (?, ?, ?)`;

  db.query(query, [usuarioId, total, metodoPago], (err, result) => {
    if (err) {
      console.error('Error al procesar el pago:', err);
      res.status(500).json({ error: 'Error al procesar el pago' });
    } else {
      res.status(201).json({ message: 'Pago realizado exitosamente' });
    }
  });
});

// Escuchar en el puerto dinámico
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

