const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres', // 
  host: 'localhost',  // 
  database: 'PAGOSBACKEND',
  password: 'Riizeisseven777', 
  port: 5432, 
});

// Datos de ejemplo para autenticación
const usuarios = [
  { usuario: 'Admin', clave: 'Admin' } 
];

// Endpoint de autenticación
app.post('/api/login', async (req, res) => {
  const { nombre, password } = req.body;

  try {
    const query = 'SELECT * FROM usuarios WHERE nombre = $1 AND password = $2';
    const result = await pool.query(query, [nombre, password]);

    if (result.rows.length > 0) {
      res.json({ message: 'Autenticación exitosa' });
    } else {
      res.status(401).json({ message: 'Usuario o clave incorrectos' });
    }
  } catch (error) {
    console.error('Error al autenticar el usuario:', error);
    res.status(500).json({ message: 'Error al autenticar el usuario' });
  }
});

/*app.post('/api/login', (req, res) => {
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
});*/

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

app.post('/api/register', (req, res) => {
  const { nombre, email, password } = req.body;

  const query = 'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)';
  pool.query(query, [nombre, email, password], (err, results) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);
      res.status(500).json({ message: 'Error al registrar el usuario' });
      return;
    }
    res.json({ message: 'Registro exitoso' });
  });
});



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});