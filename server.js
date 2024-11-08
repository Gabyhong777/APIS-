const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());

// Datos de ejemplo para autenticación
const usuarios = [
  { usuario: 'Admin', clave: 'Admin' } 
];

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

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});