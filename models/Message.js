const pool = require('../config/db');

class Message {
  constructor(username, text) {
    this.username = username;
    this.text = text;
  }

  // Save the message to the database
  async save() {
    const result = await pool.query(
      'INSERT INTO messages (username, text, created_at) VALUES ($1, $2, NOW()) RETURNING id',
      [this.username, this.text]
    );
    return result.rows[0].id;
  }

  // Static method to retrieve all messages
  static async getAll() {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at ASC');
    return result.rows;
  }
}

module.exports = Message;
