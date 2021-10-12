import flask
from flask import jsonify
from flask import request, make_response
from jinja2.loaders import ChoiceLoader, ModuleLoader
from sql import create_connection
from sql import execute_query
from sql import execute_read_query

#setting up an application name
app = flask.Flask(__name__) #sets up the application
app.config["DEBUG"] = True #allows errors to be shown in broswer

#CRUD for User_Profile Table
#Creating connection to the user profile table in the AWS database
@app.route('/api-fp1/user_profile',methods=['GET'])
def api_users():
    conn = create_connection("cis3368.cemoodnlbqm2.us-east-2.rds.amazonaws.com", "admin","fall21CIS#", "cis3368fall21")
    sql = "SELECT * FROM user_profile"
    user_profile = execute_read_query(conn, sql)
    results = []
    for user in user_profile:
        results.append(user)
    return jsonify(results)

#new route for adding user to user profile table using POST method
@app.route('/api-fp1/add_user',methods=['POST'])
def api_add_user():
    conn = create_connection("cis3368.cemoodnlbqm2.us-east-2.rds.amazonaws.com", "admin","fall21CIS#", "cis3368fall21")
    request_data = request.get_json()
    new_fname = request_data['first_name']
    new_lname = request_data['last_name']
    sql = "INSERT INTO user_profile (first_name, last_name) VALUES ('%s','%s')" % (new_fname, new_lname)
    execute_read_query(conn, sql)
    return 'POST successful'

#new route for updating user in user profile table using PUT method
#@app.route('/api-fp1/update_user',methods=['PUT'])
#def api_update_user():
    #request_data = request.get_json()
    #new_user_id = request_data['id']
   # new_fname = request_data['first_name']
    #new_lname = request_data['last_name']
    #user_profile.append({'id':new_user_id,'first_name':new_fname,'last_name':new_lname})
   # return 'PUT successful'

#new route for deleting user from user profile table using DELETE method
#@app.route('/api-fp1/delete_user',methods=['DELETE'])
#def api_delete_user():
    #request_data = request.get_json()
    #new_user_id = request_data['id']
    #new_fname = request_data['first_name']
    #new_lname = request_data['last_name']
    #user_profile.append({'id':new_user_id,'first_name':new_fname,'last_name':new_lname})
    #return 'POST successful'

#CRUD for Restaurant Tables
#new route for adding a restaurant using POST method
@app.route('/api-fp1/add_restaurant',methods=['POST'])
def api_add_restaurant():
    request_data = request.get_json()
    newid = request_data['id']
    newname = request_data['make']
    restaurant.append({'id':newid,'name':newname})
    return 'POST successful'

#new route for updating restaurant in restaurant table using PUT method
@app.route('/api-fp1/update_restaurant',methods=['PUT'])
def api_update_restaurant():
    request_data = request.get_json()
    newid = request_data['id']
    newname = request_data['make']
    sql_query = """UPDATE restaurant_profile SET newid = '%s' WHERE user_id = %s """ % (newid, which_restaurant)
    sql_query3 = """UPDATE restaurant_profile SET newmake = '%s' WHERE user_id = %s """ % (newmake, which_restaurant)
    execute_query(conn, sql_query)
    execute_query(conn, sql_query3)
    return 'PUT successful'

#new route for deleting restaurant from restaurant table using DELETE method
@app.route('/api-fp1/delete_restaurant',methods=['DELETE'])
def api_delete_restaurant():
    request_data = request.get_json()
    newid = request_data('newid')
    delete_state = "DELETE FROM restaurant_profile WHERE new_id = %s" % (new_id)
    execute_query(conn, delete_state)
    return 'DELETE successful'

#Random Restaurant Selection

app.run()

