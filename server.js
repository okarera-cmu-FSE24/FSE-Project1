const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Session middleware (ensure this is included so the session is shared across routes and Socket.IO)
app.use(session({
  secret: 'snfksdmsmkfnslkow4k924u9fsmknvwk#EQ#4vwsxbvks(',
  resave: false,
  saveUninitialized: false,
}));

// Routes
app.use(authRoutes);
app.use(chatRoutes);

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Get the session from the socket
  const session = socket.request.session;
  
  // Listen for chatMessage event and save it with the username from session
  socket.on('chatMessage', async (msg) => {
    const username = session.username; // Get the username from session
    
    if (!username) {
      socket.emit('errorMessage', 'You need to be logged in to send messages');
      return;
    }

    // Save the message with the username
    const message = new Message(username, msg.text);
    const savedMessage = await message.save();
    
    // Broadcast the message, with "Me" replaced for the sender
    io.emit('message', { 
      username: username === session.username ? 'Me' : username, 
      text: msg.text, 
      created_at: new Date().toLocaleString() 
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
