var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

const bodyParser = require("body-parser");

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = "mongodb://omega.unasec.info"
const dbName = 'amazon'; 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  
  
  
    // Gets a review with id matching request parameter
  app.get('/review/:reviewid', function(request, response) {
    db.collection("reviews").aggregate([ { $match : { "review.id" : request.params.reviewid}} ]).toArray(function(err, results) {
      if (err) throw err
      response.send(JSON.stringify(results))
    })
  })



    // Gets n random reviews with x stars. -> n,x passed in as parameters
  app.get('/review/randomreview/:n/:stars', function(request, response) {
    var n = parseInt(request.params.n)
    var stars = parseInt(request.params.stars)
    
    db.collection("reviews").aggregate([ { $match : {"review.star_rating" : stars}}, {$sample : {size : n}} ]).toArray(function(err, results) {
        if (err) throw err
        response.send(JSON.stringify(results))
    })
  })  



    // Gets n random reviews within x/y date. -> n,x,y passed in as parameters 
  app.get('/review/:n/:from_date/:to_date', function(request, response) {
    var n = parseInt(request.params.n)
    var from_date = new Date(request.params.from_date)
    var to_date = new Date(request.params.to_date)
    
    db.collection("reviews").aggregate([ { $match : {"review.date" : {$gte : from_date, $lte: to_date}}}, {$sample : {size : n}} ]).toArray(function(err, results) {
        if (err) throw err
        response.send(JSON.stringify(results))
    })
  })



    // Gets an average of helpful votes for a specific product matching id passed in as parameter
  app.get('/review/helpful/:prodid', function(request, response){
    db.collection("reviews").aggregate([ { $match : {"product.id" : request.params.prodid}}, {$group : {_id : "$product.id", avgHelpful : {$avg : "$votes.helpful_votes" }}} ]).toArray(function(err, results){
      if (err) throw err
      response.send(JSON.stringify(results))
    })
  })
  
  
  
    // Gets the average review info for a specific customer matching the id passed in as parameter
  app.get('/review/info/:custid', function(request, response){
    db.collection("reviews").aggregate([ { $match : {"customer_id" : request.params.custid}}, {$group : {_id : "$product.category", avgStarRating : {$avg : "$review.star_rating" }, avgHelpfulVotes : {$avg : "$votes.helpful_votes" }}} ]).toArray(function(err, results){
      if (err) throw err
      response.send(JSON.stringify(results))
    })
  })
  
  
  
  // Sends the ~newest added document as the response. Useful for testing insert!
  app.get('/review/newest/added', function(request,response){
    db.collection("reviews").find().limit(1).sort({$natural:-1}).toArray(function(err, results){
      if (err) throw err
      response.send(JSON.stringify(results))
    })
  })
  
  
  
    // Gets the average of review stars from date x to y. -> x,y passed in as parameter
  app.get('/review/:from_date/:to_date', function(request, response) {
    var from_date = new Date(request.params.from_date)
    var to_date = new Date(request.params.to_date)
    
    db.collection("reviews").aggregate([ { $match : {"review.date" : {$gte : from_date, $lte: to_date}}}, {$group : {_id : null, avgReviewStars : {$avg : "$review.star_rating"}}}]).toArray(function(err, results) {
        if (err) throw err                                                                                            // could put `Average stars from ${from_date} to ${to_date} as id
        response.send(JSON.stringify(results))
    })
  })
  
  
  
    // Catch-all route -> sets status to 404 and sends a "not found" response
  app.get('*/:anything', function(request, response) {
    response.status(404).send(`Route ${request.params.anything} not found`)
  })
  
  
  
    // Inserts a review document into the database. -> Review document passed in through the request body.  *HAD NO NEED FOR reviewid PARAMETER*
  app.post('/review/:reviewid', function(request, response) {
    db.collection("reviews").insert(request.body , function(err, doc) {
      if (err) throw err
      console.log(doc)
    })
  })



    // Updates a review document matching the review id passed in as parameter. -> Updated review document passed in through request body.
  app.put('/review/:reviewid', function(request, response) {
    db.collection("reviews").update({"review.id" : request.params.reviewid}, request.body , function(err, doc) {
      if (err) throw err
      console.log(doc)
    })
  })



    // Deletes a document matching the review id passed in a parameter.
  app.delete('/review/:reviewid', function(request, response) {
    db.collection("reviews").remove({"review.id" : request.params.reviewid} , function(err, doc) {
      if (err) throw err
      console.log(doc)
    })
  })
})



app.listen(port, function () {
     console.log("Running on port " + port)
})