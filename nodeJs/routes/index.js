var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/test');
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/test";
/* GET home page. */
// router.get('/', function(req, res) {
//   console.log("in get here")
//   res.send("hello");
// });


var dbUrl ="";


router.get("/", function(req, res) {
  console.log("At list he came here");
  MongoClient.connect(url, function(err, db) {

    var adminDb = db.admin();
    adminDb.listDatabases(function(err, result) {

      if(err){
        console.log(err);
      }
      else{
      dbnames = result.databases;
      
      db.close();
      var arrOfNames = [];
      dbnames.forEach(element => {
        arrOfNames.push( element.name );
      });
      console.log(arrOfNames);
      // res.render("index", { title: arrOfNames });
      // res.send(arrOfNames); for array format data
      
      res.send(dbnames);
    }});
  });
});


router.post('/', (req, res) => {
  console.log("IN node ........");

  console.log("body here" +req.body.name);

  this.dbUrl = "mongodb://localhost:27017/" + req.body.name;
  console.log(" .............new url = "+this.dbUrl);
 
 
  MongoClient.connect( this.dbUrl,(err,db)=>{
    if (err) throw err;
    // var coll = db.collection('testings');

    db.listCollections().toArray(function(err, collections) {
      if(err) console.log(err);
      // console.log(collections);
      res.send(collections);
    })
  })
});


router.post('/getdata', (req, res) => {
  // MongoClient.connect(dbUrl)
  console.log("....................."+req.body.name+".................");
  console.log(this.dbUrl);
  MongoClient.connect(this.dbUrl, (err,db)=>{
    console.log("In Function");
    // console.log(this.dbUrl);
    if (err){
      console.log(err);
    }
    else{
    var coll = db.collection(req.body.name);
    coll.find({}).toArray(function (err, result) {
        if (err) {
            // res.send(err);
            console.log(err);
        } else {
            res.send(result);
            // console.log(result);
        }
    })
    }
  })
});


module.exports = router;
