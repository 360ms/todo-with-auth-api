## User requests:
#### Register User: POST => http://localhost:9000/api/users/create => Required fields: name, email, password
#### Login User:    POST => http://localhost:9000/api/users/login => Required fields: email, password

## Todo requests:
#### Create Todo:   POST => http://localhost:9000/api/todo/create => Required fields: task, userId
#### Get all todos: POST => http://localhost:9000/api/todo/getall => Required field: userId
#### Edit todo:     PUT => http://localhost:9000/api/todo/edit => Required field: task
#### Complete Todo: PUT => http://localhost:9000/api/todo/complete => Required fields: completed (Boolean value)
#### Delete Todo:   DELETE => http://localhost:9000/api/todo/delete => Required fields: id (todo id), userId
