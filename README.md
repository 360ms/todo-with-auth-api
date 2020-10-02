## User requests:
#### Register User: Method: POST => URL: localhost:9000/api/users/create => Required fields: name, email, password
#### Login User:    Method: POST => URL: localhost:9000/api/users/login => Required fields: email, password

## Todo requests:
#### Create Todo:   Method: POST => URL: localhost:9000/api/todo/create => Required fields: task, userId
#### Get all todos: Method: POST => URL: localhost:9000/api/todo/getall => Required fields: userId
#### Edit todo:     Method: PUT => URL: localhost:9000/api/todo/edit => Required fields: task
#### Complete Todo: Method: PUT => URL: localhost:9000/api/todo/complete => Required fields: completed (Boolean value)
#### Delete Todo:   Method: DELETE => URL: localhost:9000/api/todo/delete => Required fields: id (todo id), userId
