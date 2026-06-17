Spec:

The "Pet" object:

{
	"id": int,
	"name": string,
	"breed": string,
	"age": int,
	"adopted": boolean
}

------------------------------------------------------
Method: GET
Path: /pets
Request body: None (because no extra meta data is needed)
Success - 200 OK - returns an array of "Pet" objects (empty [] if none):

[
  {"id": int, "name": string, "breed": string, "age": int, "adopted": boolean},
  {"id": int, "name": string, "breed": string, "age": int, "adopted": boolean}
]

Error - 500 Internal Server Error:
{ "error": "Unable to retrieve pets."}
------------------------------------------------------
Method: GET
Path: /pets/:id
URL param: id 
Request body: None (because no extra meta data is needed)
Success - 200 OK - returns a  "Pet" object:
{"id": int, "name": string, "breed": string, "age": int, "adopted": boolean}

Error - 404 Not Found error:
{ "error": "Pet with id 99 not found." }
------------------------------------------------------
Method: POST
Path: /pets
Request body: a "Pet" object (client sends the id):
{"id": int, "name": string, "breed": string, "age": int, "adopted": boolean}

Success - 201 Created - returns the newly created "Pet" object:
{"id": int, "name": string, "breed": string, "age": int, "adopted": boolean}

Error - 400 Bad Request (a required field is missing):
{ "error": "name, breed, age, and adopted are required." }
------------------------------------------------------
Method: PUT
Path: /pets/:id
URL param: id
Request body: a "Pet" object with the updated fields (client sends the id):
{"id": int, "name": string, "breed": string, "age": int, "adopted": boolean}

Success - 200 OK - returns the full updated "Pet" object:
{"id": int, "name": string, "breed": string, "age": int, "adopted": boolean}

Error - 404 Not Found error:
{ "error": "Pet with id 99 not found." }
------------------------------------------------------
Method: DELETE
Path: /pets/:id
URL param: id
Request body: None (because no extra meta data is needed)
Success - 200 OK - returns a confirmation message:
{ "message": "Pet with id 1 deleted." }

Error - 404 Not Found error:
{ "error": "Pet with id 99 not found." }
------------------------------------------------------