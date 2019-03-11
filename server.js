const handler = require('serve-handler');
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer(handler);

server.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
