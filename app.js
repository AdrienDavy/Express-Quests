const express = require("express");
const database = require("./database");
const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");
require("dotenv").config();
const app = express();
const { validateMovie, validateUsers } = require("./validators.js");



const port = process.env.APP_PORT ?? 5000;
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list and users");
};


app.get("/", welcome);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);



app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);


app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post('/api/users', validateUsers, usersHandlers.postUsers);

app.put('/api/movies/:id', validateMovie, movieHandlers.updateMovie);
app.put('/api/users/:id', validateUsers, usersHandlers.updateUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
