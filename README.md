# Social Media Agent MCP Bridge

This local Node.js application acts as the bridge between your browser-based AI dashboard and your local machine/social media APIs.

## Prerequisites
- Node.js installed (v16 or higher)
- npm (comes with Node.js)

## Setup Instructions
1. Create a directory for the project.
2. Copy `package.json` and `server.js` into the directory.
3. Open your terminal in that directory.
4. Run `npm install` to install dependencies.
5. Run `npm start` to start the bridge.
6. Open the WebSim dashboard to begin managing your accounts.

## Security Note
This bridge runs on `localhost:8080`. The browser dashboard connects via WebSockets. Ensure you are running this in a trusted network environment.