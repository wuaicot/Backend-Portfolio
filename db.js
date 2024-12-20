// const { Pool } = require('pg');
// require('dotenv').config();

//  //usamos variable de entorno de la bdd desplegada
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// module.exports = pool;


const { Pool } = require('pg');
require('dotenv').config();

console.log('Attempting to connect to the database...');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);

const pool = new Pool({
  user: process.env.DB_USER,        // Asegúrate de que las variables coincidan
  host: process.env.DB_HOST,        // con las del archivo .env
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Successfully connected to the database!');
    release();
  }
});

module.exports = pool;








// user: process.env.DB_USER,
// host: process.env.DB_HOST,
// database: process.env.DB_DATABASE,
// password: process.env.DB_PASSWORD,
// port: process.env.DB_PORT