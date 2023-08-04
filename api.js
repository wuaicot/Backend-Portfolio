const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis')
const { OAuth2 } = google.auth.OAuth2; 
const ContactMessage = require('./models/ContactMessage');
require('dotenv').config();

const sendEmail = async (name, email, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: OAuth2,
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        accessToken: process.env.ACCESS_TOKEN,     
        expires: 3599,
      },
    });

    // Envía el correo electrónico
    await transporter.sendMail({
      from: 'wuaicot8@gmail.com',
      to: email,
      subject: 'Mensaje recibido',
      text: `Hola ${name},\n\nGracias por contactarme. Su solictud sera revisada, y me prondre en contacto con usted  \n\nMensaje: ${message}`,
    });

    console.log('Correo enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};


router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Crea un nuevo registro en la base de datos utilizando el modelo "ContactMessage"
    const newContactMessage = await ContactMessage.create(name, email, message);

    // Envía el correo electrónico
    sendEmail(name, email, message);

    // Responde con un mensaje de éxito
    res.status(200).json({ message: 'Message received successfully! Check your email for confirmation.' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message. Please try again later.' });
  }
});

module.exports = router;
