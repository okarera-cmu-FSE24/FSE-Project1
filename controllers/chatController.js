const Message = require('../models/Message');
const session = require('express-session');

// Handle fetching all messages (for when a user joins the chat)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.getAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load messages' });
  }
};

// Handle sending a message
exports.sendMessage = async (req, res) => {
  const { username, text } = req.body;
  
  try {
    const newMessage = new Message(username, text);
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};
