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
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://frontend-portfolio-production.up.railway.app/'
    : 'http://localhost:3000', // En desarrollo
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
};


     //sin interpolación
// const corsOptions = {
//   origin: 'http://localhost:3000', // Cambia esta línea para pruebas locales sin interpolación
//   credentials: true,
// };


// Aplicar CORS globalmente con opciones definidas
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Habilitar CORS para solicitudes preflight

// Ruta para manejar el formulario de contacto
app.use('/externed', contactRoute);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;









//          FOR DEVELOPMENT ENVIRONMENT

//http://http://localhost:3000

//https://frontend-portfolio-production.up.railway.app/