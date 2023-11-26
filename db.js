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

  user: process.env.PGUSER,
  host: process.env.PGHOST,
   //database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.DPGPORT
});

module.exports = pool;




// user: process.env.DB_USER,
// host: process.env.DB_HOST,
// database: process.env.DB_DATABASE,
// password: process.env.DB_PASSWORD,
// port: process.env.DB_PORT