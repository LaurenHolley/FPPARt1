// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/home', function(req, res) {
    res.render('pages/home');   
});

// about page
app.get('/editpgs', function(req, res) {
    res.render('pages/about');
});

// about page
app.get('/randrest', function(req, res) {
    res.render('pages/randrest');
});

app.listen(8080);
console.log('8080 is the magic port');
