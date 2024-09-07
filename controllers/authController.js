const AuthService = require('../services/authService');
const authService = new AuthService();

// Register user handler
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log(username,password);
    
    const userId = await authService.register(username, password);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user handler
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userId = await authService.login(username, password);
    res.status(200).json({ message: 'Login successful', userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
