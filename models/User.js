const bcrypt = require('bcryptjs');
const pool = require('../config/db');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  // Save the user to the database with a hashed password
  async save() {
    console.log("pass");
    
    const salt = await bcrypt.genSalt(10);
    console.log("jdjd");
    console.log(this.password);
    console.log(this.username);
    
    const hashedPassword = await bcrypt.hash(this.password, salt);
    console.log("hiadada");
    
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [this.username, hashedPassword]
    );
    console.log("hi1");
    
    return result.rows[0].id;
  }

  // Static method to find a user by username
  static async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }

  // Compare password with the hashed password
  static async comparePassword(inputPassword, storedPassword) {
    return bcrypt.compare(inputPassword, storedPassword);
  }
}

module.exports = User;
