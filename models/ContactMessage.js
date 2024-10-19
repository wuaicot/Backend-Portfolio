// models/ContactMessage.js

const pool = require('../db'); // Asegúrate de tener configurada tu conexión con PostgreSQL

class ContactMessage {
  static async create({ name, email, message }) {
    // Valida que los parámetros no sean nulos
    if (!name || !email || !message) {
      throw new Error('Todos los campos son obligatorios');
    }

    const query = `
      INSERT INTO contact_messages (name, email, message, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;

    const values = [name, email, message]; // Asegúrate de que los datos se pasen correctamente

    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Devuelve la fila insertada
    } catch (error) {
      console.error('Error creando el mensaje de contacto:', error);
      throw error; // Lanza el error para que pueda ser manejado en otro lugar
    }
  }
}

module.exports = ContactMessage;


