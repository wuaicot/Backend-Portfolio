const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const ContactMessage = require('./models/ContactMessage');

require('dotenv').config();

// Función para enviar correo electrónico
const sendEmail = async (name, email, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    // Envía el correo electrónico
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Mensaje recibido',
      text: `Hola ${name},\n\nGracias por contactarme. Su solicitud será revisada y me pondré en contacto con usted.\n\nMensaje: ${message}`,
    });

    console.log('Correo enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('Error al enviar el correo');
  }
};

// Ruta POST para recibir y manejar el formulario de contacto
router.post('/contact', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://frontend-portfolio-production.up.railway.app');
  try {
    const { name, email, message } = req.body;

    // Validar los datos del formulario
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Por favor, rellene todos los campos.' });
    }

    // Crear un nuevo registro en la base de datos
    const newContactMessage = await ContactMessage.create(name, email, message);

    // Enviar correo electrónico
    await sendEmail(name, email, message);

    // Responder con un mensaje de éxito
    res.status(200).json({ message: '¡Mensaje recibido exitosamente! Verifica tu correo electrónico para la confirmación.' });
  } catch (error) {
    console.error('Error enviando el mensaje:', error);
    res.status(500).json({ message: 'Error enviando el mensaje. Por favor, inténtelo de nuevo más tarde.' });
  }
});

module.exports = router;
