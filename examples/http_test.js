const http = require('http'); //How we require models

http.createServer(function(request,response) {
    response.writeHead(200); //status code in header
    let html = "<html>"
            + "<style>"
            + "body {background-color: blue}"
            + "body {color:red}"
            + "</style>"
            + "<head>"
            + "<center>The Lab</center>"
            + "</head>"
            + "<body>"
            + "<p> Hello, this is your dog.</p>"
            + "<p> Another paragraph maybe?</p>"
            + "</body>"
            + "</html>";
    response.write(html); // response body
    response.end(); // close the connection
    
}).listen(8080);

console.log('listening on port 8080...');