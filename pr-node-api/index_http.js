// const fs = require('fs');

// // const data = fs.readFileSync('./data.txt', 'utf8');

// fs.readFile('./data.txt', 'utf8', function(err, data) {
//     console.log(data);
// });

const http = require('http');

const hostname = '127.0.0.1';

const port = 3000;

const server = http.createServer((req, res) => {

    if(req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    } else if(req.url === '/users'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('User List');
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }

    
});

server.listen(port, hostname, () => {
    console.log('running!');
});

