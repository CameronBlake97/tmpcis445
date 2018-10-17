var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app = express();


var jsonFile =    function loadJSON(callback) {   
    
                        var xobj = new XMLHttpRequest();
                            xobj.overrideMimeType("application/json");
                        xobj.open('GET', 'file.json', true); // Replace 'my_data' with the path to your file
                        xobj.onreadystatechange = function () {
                              if (xobj.readyState == 4 && xobj.status == "200") {
                                
                                function init() {
                                loadJSON(function(response) {
                                var actual_JSON = JSON.parse(response);
                                });
                                }
                                
                                callback(xobj.responseText);
                              }
                        };
                        xobj.send(null);  
                     }


app.get('/review/:reviewid', function(request, response) {
  response.send(jsonFile);
});

app.get('/review/:n/:stars', function(request, response) {
  response.sendfile(__dirname + "/file.json");
});


app.get('/review/:n/:from_date/:to_date', function(request, response) {
  response.sendfile(__dirname + "/file.json");
});

/*
app.post({
    url: '/review/:reviewid',
    body: (__dirname + "/file.json"),
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body)
    }
});
*/

app.post('/review/:reviewid', function(request, response){
    response.sendfile(__dirname + "/file.json");
})

app.put('/review/:reviewid', function(request, response){
    response.sendfile(__dirname + "/file.json");
})

app.delete('/review/:reviewid', function(request, response){
    response.sendfile(__dirname + "/file.json");
})

app.listen(8080);