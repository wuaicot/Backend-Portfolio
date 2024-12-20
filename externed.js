const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const ContactMessage = require('./models/ContactMessage');
require('dotenv').config();

const OAuth2 = google.auth.OAuth2;

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

  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN, // Accede al token de entorno
      },
    });
    
    // Envía el correo electrónico
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Mensaje recibido',
      text: `Hola ${name},\n\nGracias por contactarme. Su solicitud será revisada y me pondré en contacto con usted a la brevedad.\n\nMensaje: ${message}`,
    });

    console.log('Correo enviado correctamente.');
  } catch (error) {
    console.error('Error al obtener el token de acceso o enviar el correo:', error);
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

    
    
    // Responder con éxito después de enviar el correo
    return res.status(200).json({ message: 'Mensaje enviado con éxito.' });

    // Enviar correo electrónico      
    await sendEmail(name, email, message);

  } catch (error) {
    console.error('Error enviando el mensaje:', error);
    return res.status(500).json({ message: 'Error enviando el mensaje. Por favor, inténtelo de nuevo más tarde.' });
  }
});

module.exports = router;








//http://http://localhost:3000

// https://frontend-portfolio-production.up.railway.app