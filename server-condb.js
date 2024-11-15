// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 5001;
app.use(cors());
app.use(bodyParser.json());

// Configurar la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Usuario de MySQL
  password: '12345', // Contraseña del usuario
  database: 'pagosvs', // Nombre de tu base de datos
  port: 3307
});

connection.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos con ID:', connection.threadId);
});

// Endpoint de prueba para verificar la conexión
app.get('/api/test-connection', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).json({ message: 'Error ejecutando la consulta' });
    } else {
      res.json({ message: 'Conexión exitosa', solution: results[0].solution });
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


// Endpoint de registro
app.post('/api/register', (req, res) => {
  const { nombre, email, password } = req.body; const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
  connection.query(query, [nombre, email, password], (err, results) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);
      res.status(500).json({ message: 'Error al registrar el usuario' });
      return;
    }
    res.json({ message: 'Registro exitoso' });
  });
});

// Endpoint de autenticación
app.post('/api/login', (req, res) => {
  const { usuario, clave } = req.body;

  // Verifica si el usuario existe y la clave coincide
  const usuarioEncontrado = usuarios.find(
    (u) => u.usuario === usuario && u.clave === clave
  );

  if (usuarioEncontrado) {
    res.json({ message: 'Autenticación exitosa' });
  } else {
    res.status(401).json({ message: 'Usuario o clave incorrectos' });
  }
});

// Endpoint de pago
app.post('/api/payment', (req, res) => {
  const { cardName, cardNumber, expiryDate, cvv, saveCard } = req.body;

  // Validación de los datos de pago
  if (cardNumber.length === 16 && cvv.length === 3 && expiryDate && cardName) {
    // Lógica de procesamiento del pago
    console.log('Datos del pago:', { cardName, cardNumber, expiryDate, cvv, saveCard });
    res.json({ message: 'Pago realizado con éxito' });
  } else {
    res.status(400).json({ message: 'Datos de pago incompletos o incorrectos' });
  }
});

app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM tu_tabla', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
