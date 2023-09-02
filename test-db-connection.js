const { Client } = require('pg');

// Configura las variables de entorno para la conexión a la base de datos en tu entorno de producción
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:7NbazxY0e8vOHx3z0V4y@containers-us-west-181.railway.app:6322/railway';

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
