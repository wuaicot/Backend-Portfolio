const { Client } = require('pg');

// Configura las variables de entorno para la conexión a la base de datos en tu entorno de producción
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:JBVFWORW6B7gkDdPcnBU@containers-us-west-110.railway.app:6170/railway';

// Crea una instancia del cliente PostgreSQL
const client = new Client({
  connectionString: connectionString,
});

// Función para probar la conexión
async function testDatabaseConnection() {
  try {
    // Conecta al cliente
    await client.connect();
    console.log('Conexión exitosa a la base de datos.');

    // Realiza una consulta de prueba (por ejemplo, SELECT 1)
    const result = await client.query('SELECT 1');
    console.log('Resultado de la consulta de prueba:', result.rows);

    // Cierra la conexión
    await client.end();
    console.log('Conexión cerrada.');

  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Ejecuta la función de prueba de conexión
testDatabaseConnection();
