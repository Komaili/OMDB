import express from "express";
import cors from "cors";

// There was difficulty importing because I had to figure out the new import and export functionality
import { searchMovies, getMovie } from "./scraper.js";

const app = express();
app.use(cors());

// app.get("/", (req, res) => {
//   TEST("tt0076759").then(movie => {
//     res.json(movie);
//   })
// });

app.get("/", (req, res) => {
  res.json({
    message: "Scraping is Fun!",
  });
});

// path will look like: /search/star wars
app.get("/search/:title", (req, res) => {
  searchMovies(req.params.title).then((movies) => {
    res.json(movies);
  });
});

// app.get("/movie/:imdbID", (req, res) => {
//   getMovie(req.params.imdbID).then((movie) => {
//     console.log(movie);
//     movie;
//     // res.json(movie);
//   });
// });

//path will look like: /movie/tt0076759
app.get("/movie/:imdbID", (req, res) => {
  getMovie(req.params.imdbID).then((movie) => {
    console.log("APP.GET");
    res.json(movie);
  });
});

// app.get("/movie/:imdbID", (req, res) => {
//   console.log("INSIDE INDEX LALLAALAL");
// });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
