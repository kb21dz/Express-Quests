require("dotenv").config();

const express = require("express");
const { hashPassword } = require("./auth.js");

const app = express();

app.use(express.json());

const port = 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
}; 

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");


app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.post("/api/movies", movieHandlers.postMovie);

app.put("/api/movies/:id", movieHandlers.updateMovie);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/users", userHandlers.postUser);

app.put("/api/users/:id", userHandlers.updateUser);

app.delete("/api/users/:id", userHandlers.deleteUser);

app.post("/api/users", hashPassword, userHandlers.postUser);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
