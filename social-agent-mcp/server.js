const WebSocket = require('ws');
const http = require('http');

const PORT = 8080;
const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Mock state for social media accounts
let accounts = {
  twitter: { connected: false, username: null },
  linkedin: { connected: false, username: null }
};

console.log(`--- Social Media Agent MCP Bridge ---`);
console.log(`Status: Running on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
  console.log('Client connected from browser.');

  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    console.log('Received action:', data.type);

    switch (data.type) {
      case 'GET_STATUS':
        ws.send(JSON.stringify({ type: 'STATUS_UPDATE', payload: accounts }));
        break;

      case 'LOGIN_PLATFORM':
        // In a real app, this would trigger OAuth or return an Auth URL
        const platform = data.platform;
        console.log(`Attempting login for ${platform}...`);
        
        // Simulating a successful login
        setTimeout(() => {
          accounts[platform] = { connected: true, username: `Agent_${platform}_User` };
          ws.send(JSON.stringify({ 
            type: 'LOG', 
            content: `Successfully logged into ${platform} as Agent_${platform}_User`,
            level: 'success'
          }));
          ws.send(JSON.stringify({ type: 'STATUS_UPDATE', payload: accounts }));
        }, 1500);
        break;

      case 'POST_CONTENT':
        console.log(`Posting to ${data.platform}: ${data.content}`);
        ws.send(JSON.stringify({ type: 'LOG', content: `Post sent to ${data.platform}`, level: 'info' }));
        break;

      case 'FETCH_FEED':
        // Simulated feed data
        const mockFeed = [
          { id: 1, author: 'TechNews', text: 'AI is changing the world!', platform: 'twitter' },
          { id: 2, author: 'BusinessDaily', text: 'Market trends are up 5%', platform: 'twitter' }
        ];
        ws.send(JSON.stringify({ type: 'FEED_DATA', platform: data.platform, data: mockFeed }));
        break;
    }
  });

  ws.on('close', () => console.log('Client disconnected.'));
});

server.listen(PORT);