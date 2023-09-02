const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Usa la variable de entorno de Railway
});

async function runMigrations() {
  const client = await pool.connect();

  try {
    // Ejecuta tus migraciones aquí utilizando la conexión "client"
    await client.query('DROP TABLE IF EXISTS contact_messages;');
    await client.query('CREATE TABLE contact_messages (...);'); // Ejemplo de creación de tabla
    // Agrega más migraciones según sea necesario

    console.log('Migraciones completadas en el entorno de producción.');
  } catch (error) {
    console.error('Error en las migraciones:', error);
  } finally {
    client.release(); // Libera la conexión
  }
}

runMigrations();
