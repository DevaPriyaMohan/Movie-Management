
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/moviedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  releaseYear: Number,
  genre: String,
  rating: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.post("/movies", async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
});

app.put("/movies/:id", async (req, res) => {
  const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

app.delete("/movies/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));