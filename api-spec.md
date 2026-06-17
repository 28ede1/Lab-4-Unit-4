Spec:

Data Model — The "Pet" object:

{
	"id": int,
	"name": string,
	"breed": string,
	"age": int,
	"adopted": boolean
}

Field      | Type    | Required        | Notes
-----------|---------|-----------------|------------------------------------------------
id         | int     | yes (on create) | Unique identifier. Client sends it now; the DB will auto-increment in Lab 3.
name       | string  | yes             | The pet's name.
breed      | string  | yes             | The pet's breed (e.g. "Labrador", "Tabby").
age        | int     | yes             | Age in years. Stored as an int, not a string like "puppy".
adopted    | boolean | yes             | Whether the pet has been adopted. A new listing is conceptually false.

Decisions Log — Data Model

- Decision: Stored age as an int rather than a string like "puppy".
  Why: Ints are easy to sort and filter and avoid inconsistent free-text values.

- Decision: Used a single adopted boolean instead of a status string with multiple values.
  Why: A pet is either available or adopted — a boolean is the simplest accurate representation, and it's easy to expand into a status enum later.

- What I'd reconsider: Might add description (string, optional) so a foster family can record temperament/notes, and type (one of: dog, cat, bird, other) so listings can be filtered by animal. Neither is in the model yet.

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

Validation Rules — POST /pets:
- Required fields: name, breed, age, adopted. If any is missing (undefined), reject the request.
- 400 response when a required field is missing:
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

PUT vs PATCH — design note:
This route uses PUT. The implementation does a partial update (only fields present in the
body change, the rest are preserved), which is technically PATCH-like behavior. PUT was chosen
because it's the simpler, more familiar verb to standardize on at the in-memory stage, and the
"merge incoming fields over the existing record" pattern is easy to reason about. Could switch
to PATCH (or true full-replacement) later if strict semantics matter.
Updatable fields: name, breed, age, adopted.
------------------------------------------------------
Method: DELETE
Path: /pets/:id
URL param: id
Request body: None (because no extra meta data is needed)
Success - 200 OK - returns a confirmation message:
{ "message": "Pet with id 1 deleted." }

Error - 404 Not Found error:
{ "error": "Pet with id 99 not found." }

Note: The lab suggests 204 No Content (empty body) as the conventional DELETE success
response. This API intentionally returns 200 OK with a confirmation message instead, so the
client gets explicit feedback about which pet was removed.
------------------------------------------------------

Decisions Log — CRUD Implementation

- Most interesting spec-vs-code moment: The POST route originally returned a plain string
  ("Pet created successfully") instead of the created Pet object the spec promised. Caught it
  comparing the spec against the implementation and aligned the code to return the object as JSON.

- API design choice I'd defend: Chose to return 200 with a confirmation message on DELETE
  instead of the conventional 204 No Content. At the in-memory stage, confirming which pet was
  deleted is more useful when testing in Postman than an empty body.

- Something I found during testing that changed the spec: Confirmed GET /pets should return 200
  with an empty array [] when there are no pets (not a 404 or error) — documented the empty-state
  behavior explicitly in the GET /pets entry.

------------------------------------------------------

Spec Reconciliation — Lab 2

Routes verified
- GET /pets         — matches spec
- GET /pets/:id     — matches spec
- POST /pets        — mismatch found: returned a plain string instead of the created Pet object; resolved by returning res.status(201).json(newPet)
- PUT /pets/:id     — matches spec
- DELETE /pets/:id  — matches spec

Gaps found and resolved
- POST /pets returned res.status(201).send("Pet created successfully") but the spec documents
  returning the newly created Pet object — updated the implementation to return the object as JSON.

Intentional spec updates
- Added a Data Model table (types, required, notes) alongside the existing Pet object sketch.
- Added Validation Rules for POST /pets documenting required fields and the 400 body.
- Added a PUT vs PATCH design note recording why PUT was chosen and that the route does a partial update.
- Added a note on DELETE documenting the intentional choice of 200 + message over 204 No Content.

------------------------------------------------------

Implement and test these two routes:

app.get('/hello-world', (req, res) => {
    res.send("Hello, World!")
})

app.get('/hello-pet', (req, res) => {
    res.send("Hello, Pet!")
})