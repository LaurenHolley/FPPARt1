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

app.get('/add_user_edit', function(req, res) {
    res.render('pages/add_user_edit');   
});
//this form is associated with adding a new user, it will take the input from the user and 
//call the add_user API to update the database 
app.post('/add_user_form', function(req, res){
    //variable to hold response for users first name
    first_name1 = req.body.first_name1
    //variable to hold response for users last name
    last_name1 = req.body.last_name1
    // use res.render to load up an ejs view file
    res.render('pages/add_user_edit.ejs', {body: req.body});
    });


app.get('/update_user_edit', function(req, res) {
    res.render('pages/update_user_edit');   
});
//this form is associated with updating a user profile, it will take the input from the user and 
//call the update_user API to update the database 
app.post('/update_user_form', function(req, res){
    //variable to hold response for the id of user to update name
    id2 = req.body.id2
    //variable to hold response for users first name
    first_name2 = req.body.first_name2
    //variable to hold response for users last name
    last_name2 = req.body.last_name2
    // use res.render to load up an ejs view file
    res.render('pages/edit_complete.ejs', {body: req.body});
    });

app.get('/delete_user_edit', function(req, res) {
    res.render('pages/delete_user_edit');   
});
//this form is associated with deleting a user, it will take the input from the user and 
//call the delete_user API to update the database 
app.post('/delete_user_form', function(req, res){
    //variable to hold response for the id of user to delete
    id3 = req.body.id3
    // use res.render to load up an ejs view file
    res.render('pages/edit_complete.ejs', {body: req.body});
    }); 

app.get('/add_restaurant_edit', function(req, res) {
    res.render('pages/add_restaurant_edit');   
});
//this form is associated with adding a new restaurant, it will take the input from the user and 
//call the add_restaurant API to update the database 
app.post('/add_restaurant_form', function(req, res){
    //variable to hold response for the id of the user who wants to add a restaurant
    id4 = req.body.id4
    //variable to hold response for users first name
    restuarant_name1 = req.body.restaurant_name1
    // use res.render to load up an ejs view file
    res.render('pages/edit_complete.ejs', {body: req.body});
    });

app.get('/update_restaurant_edit', function(req, res) {
    res.render('pages/update_restaurant_edit');   
});
//this form is associated with adding updating a restaurant name, it will take the input from the user and 
//call the update_restaurant API to update the database 
app.post('/update_restaurant_form', function(req, res){
    //variable to hold response for the id of the user who wants to add a restaurant
    id5 = req.body.id5
    //variable to hold response for users first name
    restuarant_name2 = req.body.restaurant_name2
    // use res.render to load up an ejs view file
    res.render('pages/edit_complete.ejs', {body: req.body});
    });
 
app.get('/delete_restaurant_edit', function(req, res) {
    res.render('pages/delete_restaurant_edit');   
});
//this form is associated with deleting a restaurant, it will take the restaurant ID from the user and 
//call the delete_restaurant API to update the database 
app.post('/delete_restaurant_form', function(req, res){
    //variable to hold response for users first name
    restuarant_name3 = req.body.restaurant_name3
    // use res.render to load up an ejs view file
    res.render('pages/edit_complete.ejs', {body: req.body});
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
