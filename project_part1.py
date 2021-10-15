import flask
from flask import jsonify
from flask import request, make_response
from jinja2.loaders import ChoiceLoader, ModuleLoader
from sql import create_connection
from sql import execute_query
from sql import execute_read_query
import random
#imported random in order to user random.choice method for restaurant selection
#imported the sql file so that I could utilize the connection function as well as thequery functions
#imported the flask library to be able to fulfill the JSON requirements

#setting up an application name
app = flask.Flask(__name__) #sets up the application
app.config["DEBUG"] = True #allows errors to be shown in broswer

#CRUD for User_Profile Table
#Creating connection to the user profile table in the AWS database
#for each route, the naming convention is to have different names for endpoints, regardless of the method used
@app.route('/api-fp1/user_profile',methods=['GET'])
def api_users():
    #this route displays all the user profiles, I used this method for testing pruposes
    conn = create_connection("cis3368.cemoodnlbqm2.us-east-2.rds.amazonaws.com", "admin","fall21CIS#", "cis3368fall21")
    sql = "SELECT * FROM user_profile"
    user_profile = execute_read_query(conn, sql)
    #using the sql statement to select users, I did a read query to make them accessible
    results = []
    #made results an empty dictionary to store the users in so that I could return them as a JSON object
    for user in user_profile:
        results.append(user)
    return jsonify(results)

#new route for adding user to user profile table using POST method, 
#more intuitive for me to use each method depending on the intended task, rather than
#using GET for all of them
@app.route('/api-fp1/add_user',methods=['POST'])
#defintion for using add_user, begins with connection to db with necessary credentials
def api_add_user():
    conn = create_connection("cis3368.cemoodnlbqm2.us-east-2.rds.amazonaws.com", "admin","fall21CIS#", "cis3368fall21")
    request_data = request.get_json()
    #user input in postman for adding new user with their info
    #only ask for first and last name because user ID is automatically generated when a new user is added to the table
    first_name = request_data['first_name']
    last_name = request_data['last_name']
    #use CRUD OPS sql statements in order to change the database, the values are strings so they are in quotes
    #I used the same name in the python code as the ones already in the db just to keep things simple 
    #and make it clear which variable is being represented
    sql_query = "INSERT INTO user_profile (first_name, last_name) VALUES ('%s', '%s')" % (first_name, last_name)
    execute_query(conn, sql_query)
    #return statement shows up to user so that we know there were no erros and the query was carried through
    return "POST successful"
#when we make the user interface portion of the project, when someone want to add a new
#user profile there will first be a screen to add their name and assign them an id, using the add_user endpoint
#then it will move to the following screen where the user can add their 5-10 required restaurants
#this function will be done through the add_restaurant endpoint.

#new route for updating user in user profile table using PUT method
@app.route('/api-fp1/update_user',methods=['PUT'])
#update user defintion begins with the db connection with necessary credentials to access it
def api_update_user():
    conn = create_connection("cis3368.cemoodnlbqm2.us-east-2.rds.amazonaws.com", "admin","fall21CIS#", "cis3368fall21")
    request_data = request.get_json()
    #user must first enter ID, so that verify their identity and only have the ability to edit their own profile
    which_user = request_data['user_id']
    #then user must input first and last name, editing one or both to update their profile
    first_name = request_data['first_name']
    last_name = request_data['last_name']
    #once user has changed their deisred name the queries run and update the user_profile table
    #one query for first name and one for last name because doing 2 SET statements within one query did not update the info
    sql_query1 = """UPDATE user_profile SET first_name = '%s' WHERE user_id = %s """ % (first_name, which_user)
    sql_query2 = """UPDATE user_profile SET last_name = '%s' WHERE user_id = %s """ % (last_name, which_user)
    #this is an execute query and not a execute read query because we don't need to 
    #read and return any info to the user, just update internally in the db
    #there is one eexecute_query for each of changes that need to be made
    execute_query(conn, sql_query1)
    execute_query(conn, sql_query2)
    #finally, there is a return statement to let the user know the changes were made
    return 'PUT successful'

#new route for deleting user from user profile table using DELETE method
@app.route('/api-fp1/delete_user',methods=['DELETE'])
#delete user function also begins with the db connection
def api_delete_user():
    conn = create_connection("cis3368.cemoodnlbqm2.us-east-2.rds.amazonaws.com", "admin","fall21CIS#", "cis3368fall21")
    request_data = request.get_json()
    #the user must input their own ID in order to delete their account, this is to ensure
    #that others don't have the ability to delete another users accounts
    user_id = request_data['user_id']
    #the user ID is then used in the sql DELETE statement and the query is run
    delete_statement = "DELETE FROM user_profile WHERE user_id = %s" % (user_id)
    execute_query(conn,delete_statement)
    #once the users account has been deleted, this return message lets them know
    return 'DELETE successful'

#CRUD for Restaurant Tables
#new route for adding a restaurant using POST method
@app.route('/api-fp1/add_restaurant',methods=['POST'])
def api_add_restaurant():
    #establish connection with db in order to make edits
    conn = create_connection("cis3368.cemoodnlbqm2.us-east-2.rds.amazonaws.com", "admin","fall21CIS#", "cis3368fall21")
    request_data = request.get_json()
    #request user to enter their id so the restaurant is added to their profile
    #as well as asking for the name of the restaurant the want to add
    user_id = request_data['user_id']
    new_restaurant = request_data['restaurant_name']
    #the sql statement will insert the record intot the restaurant table 
    #with the required information
    add_statement =  "INSERT INTO restaurants (restaurant_name, user_id) VALUES ('%s', %s)" % (new_restaurant, user_id)
    execute_query(conn, add_statement)
    #once the query has been run the user will see the return statement letting them know the restaurant was added
    return 'POST successful'

#new route for updating restaurant in restaurant table using PUT method
@app.route('/api-fp1/update_restaurant',methods=['PUT'])
def api_update_restaurant():
    #create a connection to the db in order to access the table
    conn = create_connection("cis3368.cemoodnlbqm2.us-east-2.rds.amazonaws.com", "admin","fall21CIS#", "cis3368fall21")
    request_data = request.get_json()
    #request the id of the restaurant in the table that user want to change, 
    #and then what the user wants the updated name to be 
    current_restaurant_id = request_data['restaurant_id']
    new_restaurant_name = request_data['restaurant_name']
    #sql statement will update the restaurant name in the table 
    #and then tell the user the action was completed
    update_statement = """UPDATE restaurants SET restaurant_name = '%s' WHERE restaurant_id = %s """ % (new_restaurant_name, current_restaurant_id)
    execute_query(conn,update_statement)
    return 'PUT successful'

#new route for deleting restaurant from restaurant table using DELETE method
@app.route('/api-fp1/delete_restaurant',methods=['DELETE'])
def api_delete_restaurant():
    #create the connection to the db
    conn = create_connection("cis3368.cemoodnlbqm2.us-east-2.rds.amazonaws.com", "admin","fall21CIS#", "cis3368fall21")
    request_data = request.get_json()
    #user inputs the name of the restaurant they want to delete
    restaurant_to_delete = request_data['restaurant_name']
    #delete statement runs the sql command and the restaurant is deleted from the table
    delete_statement = "DELETE FROM restaurants WHERE restaurant_name = '%s'" % (restaurant_to_delete)
    execute_query(conn,delete_statement)
    #once the action has been completed, the user sees the return statement
    return 'DELETE successful'

#Random Restaurant Selection
#new route for selecting a restaurant from restaurant table based on which users are included in the party
#use GET method because we want the endpoint to return an item from the db
@app.route('/api-fp1/select_restaurant',methods=['GET'])
def api_random_restaurant():
    #create the connection to the db
    conn = create_connection("cis3368.cemoodnlbqm2.us-east-2.rds.amazonaws.com", "admin","fall21CIS#", "cis3368fall21")
    request_data = request.get_json()
    #empty list where the results of pulling the selected users restaurant will be appended
    results = []
    #select the restaurants available in the table with the matching user ID
    #this ensures that only those attending the dinner party will have their restaurants considered for choosing.
    #in POSTMAN, the user will input the user ID's as a list (that looks like --> {"user_id" = [1,2]}  )
    #that they want to be apart of the dinner party, this data is stored in variable which_user
    which_user = request_data['user_id']
    #once we have all the users for the party, we go through each person using a for loop 
    #and select their restaurants from the db using the sql statement, which finds restaurants using
    #the foriegn key user_id as the where to locating the restaurants
    for user in which_user:
        get_restaurants_sql = "SELECT restaurant_name FROM restaurants WHERE user_id = %s" % (user)
        users_restaurants = execute_read_query(conn, get_restaurants_sql)
        #then we append all the restaurants for curent user to a list, at the end of the user loop, this list will have
        #all the possible choices for the dinner parties restaurants
        for restaurant in users_restaurants:
            results.append(restaurant)     
    #from thatlist, we can use the random.choice method from the import random module to pick a random restaurant
    selected_restaurant = random.choice(results)
    #since it uses the GET method, it will just return the selection without changing anything in the db
    return jsonify(selected_restaurant)

#must have the app.run or none of the endpoints will be able to execute. 
app.run()
