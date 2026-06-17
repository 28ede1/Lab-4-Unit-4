// Pets API — Express boilerplate
// Implements the endpoints described in api-spec.md

const express = require("express");

//"app" is the main worker that serves information requested to different clients.
const app = express();

//The "PORT" specified is the address for the server.
const PORT = 3000;

// Parse incoming JSON request bodies (needed for POST and PUT).
//The "app" is told to translate all responses to json so that they could be interpreted.
app.use(express.json());

// This is a "fake" database for explanatory purposes..normally 
// this would be a wayyy bigger list of elements. For the purposes 
// of demonstrating ADD/DELETE/EDIT Crud app capabilities.
// a sample fake database is all that is needed.
let pets = [
  { id: 1, name: "Rex", breed: "Labrador", age: 3, adopted: false },
  { id: 2, name: "Whiskers", breed: "Tabby", age: 5, adopted: true },
];


// the following methods determine functions that the "app" worker
// should do to fulfill CRUD capabilities.


// GET /pets — return all pets

// If the user requests pets information (as in "/pets")
// req contains everything the client sent
// res is the resulting response to send back.
// In this case, the "app" worker will always
// send a positive response code and the formatted pets object
app.get("/pets", (req, res) => {
  res.status(200).json(pets);
});

// GET /pets/:id — return a single pet by id
app.get("/pets/:id", (req, res) => {
  const id = Number(req.params.id);
  const pet = pets.find((p) => p.id === id);

  if (!pet) {
    return res.status(404).json({ error: `Pet with id ${id} not found.` });
  }

  res.status(200).json(pet);
});

// POST /pets — create a new pet (client sends the id)
app.post("/pets", (req, res) => {
  const { id, name, breed, age, adopted } = req.body;

  // All fields are required per the spec.
  if (
    name === undefined ||
    breed === undefined ||
    age === undefined ||
    adopted === undefined
  ) {
    return res
      .status(400)
      .json({ error: "name, breed, age, and adopted are required." });
  }

  const newPet = { id, name, breed, age, adopted };
  pets.push(newPet);

  res.status(201).json(newPet);
});

// PUT /pets/:id — update an existing pet
app.put("/pets/:id", (req, res) => {
  const id = Number(req.params.id);
  const pet = pets.find((p) => p.id === id);

  if (!pet) {
    return res.status(404).json({ error: `Pet with id ${id} not found.` });
  }

  const { name, breed, age, adopted } = req.body;

  // Update only the fields the client provided.
  if (name !== undefined) pet.name = name;
  if (breed !== undefined) pet.breed = breed;
  if (age !== undefined) pet.age = age;
  if (adopted !== undefined) pet.adopted = adopted;

  res.status(200).json(pet);
});

// DELETE /pets/:id — remove a pet
app.delete("/pets/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = pets.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Pet with id ${id} not found.` });
  }

  pets.splice(index, 1);

  res.status(200).json({ message: `Pet with id ${id} deleted.` });
});

// No particular specific URL given...when the user opens the API
// they will recieve a message.
app.get('/', (req, res) => {
    res.send('Welcome to the Adopt-a-Pet API!')
  })

app.get('/hello-world', (req, res) => {
    res.send("Hello, World!")
})

app.get('/hello-pet', (req, res) => {
    res.send("Hello, Pet!")
})

// Start the server
app.listen(PORT, () => {
  console.log(`Pets API listening on http://localhost:${PORT}`);
});

