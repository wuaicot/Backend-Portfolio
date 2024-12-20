//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contactRoute = require('./externed'); // Ruta del contacto
require('dotenv').config(); // Cargar las variables de entorno

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para parsear el body en JSON (ya incluido en Express)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Para datos de formularios

// Middleware para logging de peticiones HTTP
app.use(morgan('dev'));

// Configuración de CORS para entornos de desarrollo y producción
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL exacta de tu frontend
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
};

// Aplicar CORS globalmente
//app.use(cors(corsOptions));

// Middleware para manejar solicitudes preflight de CORS
//app.options('*', cors(corsOptions));

// Ruta para manejar el formulario de contacto
app.use('/externed', contactRoute);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message }); // Simplificado para producción
});

// Ruta de prueba para verificar el estado del servidor en Railway
app.get('/status', (req, res) => {
  res.status(200).send("Server is running correctly!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;











//          FOR DEVELOPMENT ENVIRONMENT

//http://http://localhost:3000

//https://frontend-portfolio-production.up.railway.app/