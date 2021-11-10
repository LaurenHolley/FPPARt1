// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// home page 
app.get('/home', function(req, res) {
    res.render('pages/home');   
});

// edit user and restaurant profile page
app.get('/editpgs', function(req, res) {
    res.render('pages/about');
});

// random restaurant selection page
app.get('/randrest', function(req, res) {
    res.render('pages/randrest');
});

app.listen(8080);
console.log('8080 is the magic port');
