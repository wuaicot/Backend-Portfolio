// const { Pool } = require('pg');
// require('dotenv').config();

//  //usamos variable de entorno de la bdd desplegada
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// module.exports = pool;


const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({

  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

pool.query('SELECT NOW()', (err, res) => {
  if(err) {
    console.log('Error al conectar a la base de datos', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
  pool.end();
});

module.exports = pool;




// user: process.env.DB_USER,
// host: process.env.DB_HOST,
// database: process.env.DB_DATABASE,
// password: process.env.DB_PASSWORD,
// port: process.env.DB_PORT