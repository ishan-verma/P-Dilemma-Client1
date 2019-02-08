var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
var http = require('http');

var name ="";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var tempDecision = {
    decision:""
}
app.get("/cooperate", function(req, res) {
    tempDecision.decision="cooperate";
    res.redirect("/");    
});

app.get("/defect", function(req, res) {
    tempDecision.decision="defect";
    res.redirect("/");    
});

app.get("/decision", function(req, res) {
    res.send(tempDecision); 
});

app.post("/player-name", function(req, res) {
    name =req.body.name;
    request.post('http://127.0.0.1:8080/add-player1').form({name:name})
    res.redirect("/");
});

app.get("/", function(req, res) {  
    if(name==""){
        res.render("player-name");
    }  
    else{
        res.render("index",{name:name});
    }
});

app.listen(8081, function () {
  console.log('Client #1 on :8081');
  
});