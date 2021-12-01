// load the things we need
var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();

var selectedID = "";
app.use(bodyParser.urlencoded({extended: true})); 

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

//render the individual edit page
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
    axios.post(`http://127.0.0.1:5000//api-fp1/add_user`, {
        first_name: first_name1,
        last_name: last_name1
    })
    res.render('pages/nuser_addrest.ejs', {body: req.body});
    });


//this form is associated with adding a new restaurant, it will take the input from the user and 
//call the add_restaurant API to update the database 
app.post('/nuser_restaurant_form', function(req, res){
    //variable to hold response for the id of the user who wants to add a restaurant
    id7 = req.body.id7
    //variable to hold response for restaurant names
    r_name0 = req.body.restaurant_name10
    r_name1 = req.body.restaurant_name11
    r_name2 = req.body.restaurant_name12
    r_name3 = req.body.restaurant_name13
    r_name4 = req.body.restaurant_name14
    r_name5 = req.body.restaurant_name15
    r_name6 = req.body.restaurant_name16
    r_name7 = req.body.restaurant_name17
    r_name8 = req.body.restaurant_name18
    r_name9 = req.body.restaurant_name19
    //each restaurant the user wants to add has its own call to the add_restaurant API, this helps to keep
    //the names of the restaurans clear and seperate 
    axios.post(`http://127.0.0.1:5000//api-fp1/add_restaurant`, {
        user_id: id7,
        restaurant_name: r_name0
    })
    axios.post(`http://127.0.0.1:5000//api-fp1/add_restaurant`, {
        user_id: id7,
        restaurant_name: r_name1
    })
    axios.post(`http://127.0.0.1:5000//api-fp1/add_restaurant`, {
        user_id: id7,
        restaurant_name: r_name2
    })
    axios.post(`http://127.0.0.1:5000//api-fp1/add_restaurant`, {
        user_id: id7,
        restaurant_name: r_name3
    })
    axios.post(`http://127.0.0.1:5000//api-fp1/add_restaurant`, {
        user_id: id7,
        restaurant_name: r_name4
    })
    //There are 5 required restaurants for each user, but since they can add up to 10 there needs to
    //be an if statement to determine if the user input more than the first 5, so it check the textbox 
    //for restaurants 6, 7, 8, 9, and 10 to see whether or not there is data that needs to be added to the database
    if (r_name5 != ''){
    axios.post(`http://127.0.0.1:5000//api-fp1/add_restaurant`, {
        user_id: id7,
        restaurant_name: r_name5
    })
    }
    if (r_name6 != ''){
    axios.post(`http://127.0.0.1:5000//api-fp1/add_restaurant`, {
        user_id: id7,
        restaurant_name: r_name6
    })
    }
    if (r_name7 != ''){
    axios.post(`http://127.0.0.1:5000//api-fp1/add_restaurant`, {
        user_id: id7,
        restaurant_name: r_name7
    })
    }   
    if (r_name8 != ''){
    axios.post(`http://127.0.0.1:5000//api-fp1/add_restaurant`, {
        user_id: id7,
        restaurant_name: r_name8
    })
    }
    if (r_name9 != ''){
    axios.post(`http://127.0.0.1:5000//api-fp1/add_restaurant`, {
        user_id: id7,
        restaurant_name: r_name9
    })
    }
    // use res.render to load up an ejs view file
    res.render('pages/edit_complete.ejs', {body: req.body});
    });


//render the individual edit page
app.get('/update_user_edit', function(req, res) {
    res.render('pages/update_user_edit');   
});
//this form is associated with updating a user profile, it will take the input from the user and 
//call the update_user API to update the database 
app.post('/update_user_form', function(req, res){
    //variable to hold response for the id of user to update name
    id2 = req.body.id2
    user_id = parseInt(id2)
    //variable to hold response for users first name
    first_name2 = req.body.first_name2
    //variable to hold response for users last name
    last_name2 = req.body.last_name2
    axios.put(`http://127.0.0.1:5000//api-fp1/update_user`, {
        user_id: user_id, 
        first_name: first_name2,
        last_name: last_name2  
    })
    // use res.render to load up an ejs view file
    res.render('pages/edit_complete.ejs', {body: req.body});
    });

//render the individual edit page
app.get('/delete_user_edit', function(req, res) {
    res.render('pages/delete_user_edit');   
});
//this form is associated with deleting a user, it will take the input from the user and 
//call the delete_user API to update the database 
app.post('/delete_user_form', function(req, res){
    //variable to hold response for the id of user to delete
    id3 = req.body.id3
    user_id = parseInt(id3)
    // use res.render to load up an ejs view file
    axios.delete(`http://127.0.0.1:5000//api-fp1/delete_user`, {
        data: {
            user_id : user_id
        }
    })
    res.render('pages/edit_complete.ejs', {body: req.body});
    }); 

//render the individual edit page
app.get('/add_restaurant_edit', function(req, res) {
    res.render('pages/add_restaurant_edit');   
});
//this form is associated with adding a new restaurant, it will take the input from the user and 
//call the add_restaurant API to update the database 
app.post('/add_restaurant_form', function(req, res){
    //variable to hold response for the id of the user who wants to add a restaurant
    id4 = req.body.id4
    //variable to hold response for users first name
    restaurant_name1 = req.body.restaurant_name1
    axios.post(`http://127.0.0.1:5000//api-fp1/add_restaurant`, {
        user_id: id4,
        restaurant_name: restaurant_name1
    })
    // use res.render to load up an ejs view file
    res.render('pages/edit_complete.ejs', {body: req.body});
    });

//render the individual edit page
app.get('/update_restaurant_edit', function(req, res) {
    res.render('pages/update_restaurant_edit');   
});
//this form is associated with adding updating a restaurant name, it will take the input from the user and 
//call the update_restaurant API to update the database 
app.post('/update_restaurant_form', function(req, res){
    //variable to hold response for the id of the user who wants to add a restaurant
    id5 = req.body.id5
    //variable to hold response for users first name
    restaurant_name2 = req.body.restaurant_name2
    axios.put(`http://127.0.0.1:5000//api-fp1/update_restaurant`, {
        restaurant_id: id5,   
        restaurant_name: restaurant_name2
    })
    // use res.render to load up an ejs view file
    res.render('pages/edit_complete.ejs', {body: req.body});
    });
 
//render the individual edit page
app.get('/delete_restaurant_edit', function(req, res) {
    res.render('pages/delete_restaurant_edit');   
});
//this form is associated with deleting a restaurant, it will take the restaurant ID from the user and 
//call the delete_restaurant API to update the database 
app.post('/delete_restaurant_form', function(req, res){
    //variable to hold response for users first name
    restaurant_name3 = req.body.restaurant_name3
    // use res.render to load up an ejs view file
    axios.delete(`http://127.0.0.1:5000//api-fp1/delete_restaurant`, {
        data: {
            restaurant_name: restaurant_name3
        }
    })
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
