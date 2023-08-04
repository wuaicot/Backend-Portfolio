const pool = require('../db');

class ContactMessage {
  static async create(name, email, message) {
    const query = {
      text: 'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      values: [name, email, message],
    };

    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw error;
    }
  }
}

module.exports = ContactMessage;
