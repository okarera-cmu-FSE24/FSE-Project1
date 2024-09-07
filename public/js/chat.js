// Initialize Socket.IO
const socket = io();

// DOM Elements
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const messagesList = document.getElementById('messagesList');

// Listen for incoming messages and append them to the chat
socket.on('message', (message) => {
  const listItem = document.createElement('li');
  listItem.textContent = `${message.username === 'Me' ? 'Me' : message.username}: ${message.text} (${message.created_at})`;
  messagesList.appendChild(listItem);
});

// Send message when form is submitted
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const text = chatInput.value;
  if (text.trim() !== '') {
    socket.emit('chatMessage', { username: 'Me', text });
    chatInput.value = '';
  }
});

// Load all previous messages when the page loads
window.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/messages');
  const messages = await response.json();
  
  messages.forEach(message => {
    const listItem = document.createElement('li');
    listItem.textContent = `${message.username}: ${message.text} (${message.created_at})`;
    messagesList.appendChild(listItem);
  });
});
