const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to My First Node.js Server! </h1>');
    }
    else if (req.url === '/posts' && req.method === 'GET') {
        const posts = fs.readFileSync('../data/posts.json', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(posts);
    }
    else {
        res.writeHead(404);
        res.end('Page not found');
    }
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});