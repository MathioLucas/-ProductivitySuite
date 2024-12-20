const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

let clients = new Set();

wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    // Notify existing clients about the new user
    broadcast(JSON.stringify({ type: 'user_connected', count: clients.size }), ws);

    ws.on('message', (message) => {
        // Broadcast the received message to all other clients
        broadcast(message, ws);
    });
