// load the things we need
var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();

var selectedID = "";
app.use(bodyParser.urlencoded()); 

// set the view engine to ejs
app.set('view engine', 'ejs');

//required module to make calls to REST API
const axios = require('axios');

// use res.render to load up an ejs view file

// home page 
app.get('/home', function(req, res) {
    res.render('pages/home');   
});

//dont forget to turn on the .py file for the api points

app.post('/process_form', function(req, res){
    //variable to hold response for users first name
    first_name1 = req.body.first_name1
    //variable to hold response for users last name
    var last_name = req.body.last_name1
    console.log("New user's first name is:"+first_name1);
    var u_first_name= req.body.first_name2
    console.log("Modified user's first name is:"+u_first_name);
    // use res.render to load up an ejs view file
    res.render('pages/editpgs', {body: req.body});
    });


// edit user and restaurants page
app.get('/editpgs', function(req, res) {
    //endpoint for adding a user
    res.render('pages/editpgs')
});

// random restaurant selection page
app.get('/randrest', function(req, res) {
    axios.get('http://127.0.0.1:5000/api-fp1/user_profile')
    .then((response)=>{
        
        var users = response.data;
        console.log(users);
        res.render('pages/randrest', {
            users: users
        });
    });
    
});

app.listen(8080);
console.log('8080 is the magic port');
