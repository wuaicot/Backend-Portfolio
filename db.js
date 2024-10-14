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
console.log('DB_USER:', process.env.PGDATA);
console.log('DB_HOST:', process.env.PGHOST);
console.log('DB_DATABASE:', process.env.PGPASSWORD);
console.log('DB_PASSWORD:', process.env.PGPORT);
console.log('DB_PORT:', process.env.PGUSER);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
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