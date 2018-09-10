const http = require('http'); //How we require models

http.createServer(function(request,response) {
    response.writeHead(200); //status code in header
    response.write("Hello, this is a dog."); // Response body
    response.end(); // close the connection
}).listen(8080);  // Listen for connections on this port

console.log('listening on port 8080...');