const { Pool } = require('pg');
require('dotenv').config();

// Utiliza la variable de entorno DATABASE_URL para la cadena de conexión
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;






// const { Pool } = require('pg');
// require('dotenv').config();


// const pool = new Pool({

//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT
// });

// module.exports = pool;




// user: process.env.DB_USER,
// host: process.env.DB_HOST,
// database: process.env.DB_DATABASE,
// password: process.env.DB_PASSWORD,
// port: process.env.DB_PORT