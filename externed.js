const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const ContactMessage = require('./models/ContactMessage');
const cors = require('cors');
require('dotenv').config();

const OAuth2 = google.auth.OAuth2;

// Configuración de CORS
const corsOptions = {
  origin: 'https://frontend-portfolio-production.up.railway.app', // Dominio permitido
  methods: 'GET,POST,OPTIONS,PUT,DELETE',
  credentials: true, // Permite el uso de cookies si es necesario
};

// Aplica CORS solo para las rutas de este router
router.use(cors(corsOptions));

// Función para enviar correo electrónico
const sendEmail = async (name, email, message) => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // URL de redireccionamiento de OAuth2
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken.token, // Utiliza el token de acceso
    },
  });

  try {
    // Envía el correo electrónico
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Mensaje recibido',
      text: `Hola ${name},\n\nGracias por contactarme. Su solicitud será revisada y me pondré en contacto con usted a la brevedad.\n\nMensaje: ${message}`,
    });
    console.log('Correo enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('Error al enviar el correo');
  }
};

// Ruta POST para recibir y manejar el formulario de contacto
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  console.log('Datos recibidos:', { name, email, message });

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Es necesario rellenar todos los campos.' });
  }

  try {
    // Crear un nuevo registro en la base de datos
    const newContactMessage = await ContactMessage.create({ name, email, message });

    // Responder con éxito
    return res.status(200).json({ message: 'Mensaje enviado con éxito.' });

    // Enviar correo electrónico
    await sendEmail(name, email, message);

    
    
  } catch (error) {
    console.error('Error enviando el mensaje:', error.stack); // Mostrar el stacktrace completo
    return res.status(500).json({ message: 'Error enviando el mensaje. Por favor, inténtelo de nuevo más tarde.' });
  }
});


module.exports = router;







//http://http://localhost:3000

// https://frontend-portfolio-production.up.railway.app