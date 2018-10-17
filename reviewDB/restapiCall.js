var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app = express();


/*      Gives unexpected token error
var json = 
{ "_id": "<ObjectId>",               
  "reviews": [ 
    "first_name": "Andrew", 
    "last_name": "Lawson",
    "accountID": 123, 
    "gender": "M", 
    "reviewDate": "10-3-2018", 
    "stars": 5, 
    "verifiedPurchaser": true, 
    "review": "Great Product! I love it." 
  ] 
};
*/

var json = '{ "_id": "<ObjectId>",' +
'  "reviews": [ ' +
'    "first_name": "Andrew", ' +              // Unexpected token :
'    "last_name": "Lawson", ' +
'    "accountID": 123, ' +
'    "gender": "M", '+
'    "reviewDate": "10-3-2018", ' +
'    "stars": 5, ' +
'    "verifiedPurchaser": true, ' +
'    "review": "Great Product! I love it." ' +
'  ] ' +
'}; ';


var jsonFile = JSON.parse(JSON.stringify(json));

app.get('/review/:reviewid', function(request, response) {
  response.send(jsonFile);
});

app.get('/review/:n/:stars', function(request, response) {
  response.send(jsonFile);
});


app.get('/review/:n/:from_date/:to_date', function(request, response) {
  response.send(jsonFile);
});


app.post('/review/:reviewid', function(request, response){
    response.send(jsonFile);
})

app.put('/review/:reviewid', function(request, response){
    response.send(jsonFile);
})

app.delete('/review/:reviewid', function(request, response){
    response.send(jsonFile);
})

app.listen(8080);