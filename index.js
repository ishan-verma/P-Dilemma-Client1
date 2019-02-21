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


/*
 *  alan's comment:
 *
 *  Rather than creating a separate repo for each client, it might have been easier
 *  to create a single client repo whereby it's behavior can be customized via environment
 *  variables.  relevent dev principle: DRY.
 *
 */

/*
 *  alan's comment:
 *
 *  The /cooperate and /defect endpoints could be combined into a single endpoint,
 *  which might simplify the client-side form submission.
 *
 *  Also, The current way that the client selects cooperate or defect (ie. by
 *  clicking an anchor html tag) causes a full navigation, which
 *  is less common than just doing an ajax call and relies on the serverside
 *  behavior (ie. the redirect) determine the next user experience.
 *
 */

/*
 *  alan's comment:
 *
 *  Not really a critique but just a brainstorm in-passing... this server code might be easier
 *  to follow if the endpoints meant to be hit from a browser were separate from
 *  endpoints meant to be hit from the "server".  For example, maybe somecould be prefixed with
 *  `/api/` and the others could be prefixed with `/app`.
 *
 */

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
