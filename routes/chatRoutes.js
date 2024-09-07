const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

// Get all messages (for when a user joins the chat)
router.get('/messages', chatController.getAllMessages);

// Send a message (Optional, since we'll use Socket.IO mostly)
router.post('/messages', chatController.sendMessage);

module.exports = router;
