var user = require('./user')
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require('express-session');

var app = express();
app.use(express.static(path.join(__dirname,"/html")));

app.use(bodyParser.json());

app.use(session({secret: 'my-secret'}));
var sessions;

app.post('/signin', function (req, res) {
  sessions = req.session;
  var user_name = req.body.email;
  var password = req.body.password;
  
  
  user.validateSignIn(user_name,password,function(result)
  {
    if(result){
        sessions.username = user_name;
  	    res.send('Success');
    }
  else{
  	res.send('Wrong username and password');
  }
})
})

app.post('/signup', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    if(name && email && password)
    {
        user.signup(name,email,password);
    }
    else 
    {
        res.send('FAILURE TO SIGN UP, CHECK TEXT FIELDS')
    }
    
  })


  app.get('/home', function (req, res) {
    if(sessions && sessions.username){
      res.sendFile(__dirname + '/html/home.html');
    }
    else{
      res.send('unauthorized');
    }
  })





app.listen(3001,function(){
    console.log("Started listening on port", 3001);
})