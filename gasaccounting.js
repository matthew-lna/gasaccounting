const http = require('http');
const app = require('./app.js');

const port = 7770

const server = http.createServer(app);

server.listen(port);
console.log('Listening on localhost:' + port);