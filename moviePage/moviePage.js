var ID = "";
var imdbMovieInfo;

window.onload = function () {
  const BASE_URL = "https://polar-woodland-00821.herokuapp.com/";
  const url = document.location.href;
  const imdbID = url.split("=")[1];
  console.log(imdbID);

  function getMovie(imdbID) {
    return fetch(`${BASE_URL}movie/${imdbID}`).then((res) => res.json());
  }

  // function getMovie(imdbID) {
  //   console.log("AHHHHHHHAHHHAHAHHHHAAHHA");
  //   // If movie page has already been visited, return it from cache
  //   // if (movieCache[imdbID]) {
  //   //   console.log("Serving from cache:", imdbID);
  //   //   return Promise.resolve(movieCache[imdbID]);
  //   // }

  //   return fetch(`${BASE_URL}movie/${imdbID}`)
  //     .then((response) => response.text())
  //     .then((body) => {
  //       console.log("INSIDE FETCH");
  //       console.log(body);

  //       // Match for finding the start of the pertinent info
  //       var matches = body.match(/{\"@type\":\"A/g);

  //       // Split body into array
  //       var arr = body.split(matches[0]);

  //       // Match for finding the end of pertinent info
  //       matches = body.match(/\"actor\":/g);

  //       // Retrieve sectioned data
  //       var data = arr[1].split(matches[0])[0];
  //       var dataArr = data.split(",").slice(4);

  //       for (let i = 0; i != dataArr.length; ++i) {
  //         var match = data.match(/\"/g);
  //         var quote = data.match(/"/g);
  //         dataArr[i] = dataArr[i].replace(match[0], "");
  //         dataArr[i] = dataArr[i].replace(match[0], "");
  //         dataArr[i] = dataArr[i].replace(match[0], "");
  //         dataArr[i] = dataArr[i].replace(match[0], "");
  //         dataArr[i] = dataArr[i].replace(quote[0], "");
  //       }

  //       var ratingValue = "";
  //       var contentRating = "";
  //       var datePublished = "";
  //       var genres = [];
  //       var date = "";
  //       var trailerVideo = "";
  //       var trailerThumbnail = "";

  //       var i = 0;
  //       while (i < dataArr.length) {
  //         var pair = dataArr[i].split(":");

  //         if (pair[0] == "ratingValue") {
  //           var rating = pair[1];
  //           rating = rating.replace("}", "");
  //           ratingValue = rating;
  //         } else if (pair[0] == "contentRating") {
  //           contentRating = pair[1];
  //         } else if (pair[0] == "genre") {
  //           while (
  //             i < dataArr.length &&
  //             dataArr[i].charAt(dataArr[i].length - 1) != "]"
  //           ) {
  //             genres.push(dataArr[i]);
  //             if (genres[genres.length - 1].charAt(0) == "g") {
  //               var match = "genre:[";
  //               genres[genres.length - 1] = genres[genres.length - 1].replace(
  //                 match,
  //                 ""
  //               );
  //             }
  //             ++i;
  //           }
  //           var lastGenre = dataArr[i];
  //           lastGenre = lastGenre.replace("]", "");
  //           genres.push(lastGenre);
  //         } else if (pair[0] == "datePublished") {
  //           datePublished = pair[1].split("-")[0];
  //         } else if (pair[0] == "embedUrl") {
  //           trailerVideo = pair[1];
  //         } else if (pair[0] == "contentUrl") {
  //           trailerThumbnail = pair[1] + pair[2];
  //           trailerThumbnail = trailerThumbnail.replace("}", "");
  //         }

  //         ++i;
  //       }

  //       const json1 = {
  //         ratingValue,
  //         contentRating,
  //         datePublished,
  //         genres,
  //         trailerVid: `https://www.imdb.com${trailerVideo}`,
  //         trailerThumbnail,
  //       };

  //       const $ = cheerio.load(body);
  //       const $title = $(".sc-94726ce4-1 h1");

  //       const title = $title
  //         .first()
  //         .contents()
  //         .filter(function () {
  //           return this.type === "text";
  //         })
  //         .text()
  //         .trim();

  //       // //TODO: Find better way than selector
  //       // const rating = $(
  //       //   "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-94726ce4-1.iNShGo > div > ul > li:nth-child(2) > span"
  //       // ).text();

  //       // const runTime = $(
  //       //   "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-94726ce4-1.iNShGo > div > ul > li:nth-child(3)"
  //       // )
  //       //   .first()
  //       //   .contents()
  //       //   .filter(function () {
  //       //     return this.type === "text";
  //       //   })
  //       //   .text()
  //       //   .trim();

  //       // // TODO: Do this in a more efficient way!!!

  //       // const genres = [];

  //       // $(
  //       //   "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-1cdfe45a-2.eHejrG > div.sc-1cdfe45a-10.cuzXyh > div.sc-1cdfe45a-4.wrDNM > div.sc-16ede01-8.hXeKyz.sc-1cdfe45a-11.eVPKIU > div"
  //       // )
  //       //   .children()
  //       //   .each((i, element) => {
  //       //     const sepString = element.attribs.href.split(/[=&]/);
  //       //     const genre = sepString[1];
  //       //     genres.push(genre);
  //       //   });
  //       //   // return genres;

  //       // const datePublished = $(
  //       //   "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-94726ce4-1.iNShGo > div > ul > li:nth-child(1) > span"
  //       // ).text();

  //       // const imdbRating = $(
  //       //   'div[data-testid="hero-rating-bar__aggregate-rating__score"] > span'
  //       // )
  //       //   .text()
  //       //   .split("/")[0];

  //       const poster = $(
  //         `#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-1cdfe45a-2.eHejrG > div.sc-1cdfe45a-3.eIAmdj > div > div.sc-43e10848-1.hNvLDX > div > div.ipc-media.ipc-media--poster-27x40.ipc-image-media-ratio--poster-27x40.ipc-media--baseAlt.ipc-media--poster-l.ipc-poster__poster-image.ipc-media__img > img`
  //       ).attr("src");

  //       const summary = $(
  //         'span[role="presentation"][data-testid="plot-xs_to_m"]'
  //       ).text();

  //       function getItem(itemArray) {
  //         return function (i, element) {
  //           const item = $(element).text().trim();
  //           itemArray.push(item);
  //         };
  //       }

  //       // TODO: Add directors
  //       const directors = [];
  //       $('span[itemProp="director"]').each(getItem(directors));

  //       // TODO: Add writers
  //       const writers = [];
  //       $('.credit_summary_item span[itemProp="creator"]').each(
  //         getItem(writers)
  //       );

  //       const stars = [];
  //       $(
  //         "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-1cdfe45a-2.eHejrG > div.sc-1cdfe45a-10.cuzXyh > div.sc-1cdfe45a-4.wrDNM > div.sc-fa02f843-0.fjLeDR > ul > li:nth-child(3) > div"
  //       ).each(getItem(stars));

  //       // TODO: Add storyline
  //       const storyLine = $('#titleStoryLine div[itemProp="description"] p')
  //         .text()
  //         .trim();

  //       // TODO: Add companies
  //       const companies = [];
  //       $('span[itemType="http://schema.org/Organization"]').each(
  //         getItem(companies)
  //       );

  //       const trailer = $(
  //         "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-1cdfe45a-2.eHejrG > div.sc-1cdfe45a-3.eIAmdj > div > div.sc-43e10848-1.hNvLDX > div > a"
  //       ).attr("href");
  //       //const trailer = $('a[itemProp="trailer"]').attr("href");

  //       var json2 = {
  //         imdbID,
  //         title,
  //         // rating,
  //         // runTime,
  //         // genres,
  //         // datePublished,
  //         // imdbRating,
  //         //poster,
  //         summary,
  //         //directors,
  //         //writers,
  //         //stars,
  //         storyLine,
  //         //companies,
  //         //trailer: `https://www.imdb.com${trailer}`,
  //       };

  //       const result = {};
  //       let key;

  //       for (key in json1) {
  //         result[key] = json1[key];
  //       }

  //       for (key in json2) {
  //         result[key] = json2[key];
  //       }

  //       movieCache[imdbID] = result;

  //       console.log(result);

  //       return result;
  //     });
  //}

  function showMovie(movie) {
    imdbMovieInfo = movie;
    apiMovieInfo = getConfig(movie.title);

    var spanTitle = document.querySelector("#title");
    spanTitle.textContent = movie.title;

    var spanImdbRating = document.querySelector("#imdbRating");
    spanImdbRating.textContent = movie.imdbRating;

    var spanDatePublished = document.querySelector("#datePublished");
    spanDatePublished.textContent = movie.datePublished;

    var spanContentRating = document.querySelector("#contentRating");
    spanContentRating.textContent = movie.rating;

    var spanRunTime = document.querySelector("#runTime");
    spanRunTime.textContent = movie.runTime;

    var imgPoster = document.querySelector("#poster");
    imgPoster.src = movie.poster;

    var genresList = document.querySelector("#genresList");
    // movie.genres.array.forEach((element) => {
    //   const li = document.createElement("li");
    //   li.textContent = element;
    //   genresList.appendChild(li);
    // });
    const li = document.createElement("li");
    li.innerHTML = movie.genres;
    genresList.appendChild(li);

    var spanSummary = document.querySelector("#summary");
    spanSummary.textContent = movie.summary;
  }

  // I believe this helps ensure that the scraper always gets all the information
  setTimeout(getMovie(imdbID).then(showMovie), 1000);
};

let getMovieTrailer = function (ID) {
  // console.log(ID);

  let url = "".concat(
    baseURL,
    "movie/11/videos/api_key=",
    APIKEY,
    "&language=en-US"
  );
  return fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log("getMovieTrailer");
      console.log(data);
      return data;
    });
};

// import fetch from "node-fetch";

// To fetch more details about a movie
// https://api.themoviedb.org/3/movie/<movie-id>?api_key=<APIKEY>

let baseURL = "https://api.themoviedb.org/3/";
let configData = null;
let baseImageURL = null;
let APIKEY = "4512ebfda658bfb30a37da5b059d4167";
let youtubeKey = "AIzaSyA6sKn1DzSpEbfWXq7PgMrvxB1e0P_EcI0";
let videoEmbedBaseURL = "https://www.youtube.com/embed/";

let getYoutubeVideo = function (id) {
  return fetch(
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=" +
      youtubeKey
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      return putTrailerOnPage(data);
    });
};

let getConfig = function (title) {
  let url = "".concat(baseURL, "configuration?api_key=", APIKEY);
  return fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      baseImageURL = data.images.secure_base_url;
      configData = data.images;
      // console.log("config:", data);
      runSearch(title);
    })
    .catch(function (err) {
      alert(err);
    });
};

let runSearch = function (keyword) {
  // let url = baseURL + "search/movie/api_key=" + APIKEY + "&query=" + keyword;
  let url = "".concat(
    baseURL,
    "search/movie?api_key=",
    APIKEY,
    "&query=",
    keyword
  );

  searchInfo = fetch(url)
    .then((result) => result.json())
    .then((data) => {
      console.log("DATA RESULTS");
      console.log(data.results);
      data.results.forEach((elem) => {
        if (
          imdbMovieInfo.title === elem.title &&
          imdbMovieInfo.datePublished === elem.release_date.split("-")[0]
        ) {
          ID = elem["id"];
          return getMovie(elem["id"]);
        }
      });

      // If no match, return null
      return null;
    });

  //console.log(searchInfo);

  //return getMovie(movieID);
};

let getMovie = function (id) {
  console.log(id);
  let url = "".concat(baseURL, "movie/", id, "?api_key=", APIKEY);

  movieInfo = fetch(url)
    .then((result) => result.json())
    .then((data) => {
      return putInfoOnPage(data);
    });

  url = "".concat(
    baseURL,
    "movie/",
    id,
    "/videos?api_key=",
    APIKEY,
    "&language=en-US"
  );
  trailerInfo = fetch(url)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      return putTrailerVideoOnPage(data);
    });

  //trailerInfo = getYoutubeVideo("1234");

  // console.log(movieInfo);
};

let putTrailerVideoOnPage = function (data) {
  trailerVideo = document.getElementById("trailerVideo");

  // Find a video that's an actual trailer
  trailerVideo.src = videoEmbedBaseURL + data.results[0]["key"];
  let trailerRegex = "Trailer";
  data.results.forEach((elem) => {
    if (elem.name.match(trailerRegex)) {
      trailerVideo.src = videoEmbedBaseURL + elem.key;
    }
    console.log(elem.name);
    console.log(elem.name.match(trailerRegex));
  });

  console.log(data.results);

  console.log(trailerVideo.src);

  poster = document.getElementById("poster");
  console.log(poster.naturalHeight);
  trailerVideo.style.height = poster.naturalHeight + "px";
  return data;
};

let putTrailerOnPage = function (data) {
  console.log("YOUTUBE THUMBNAIL");
  console.log(data);
  thumbnail = document.getElementById("thumbnail");
  thumbnail.src = data.items[0].snippet.thumbnails.high["url"];
};

let putInfoOnPage = function (data) {
  console.log("PUTTING ON PAGE");
  console.log(data);

  genresList = document.getElementById("genresList");

  // Remove empty bullet point that's at the beginning of the genresList
  genresList.removeChild(genresList.firstChild);
  poster = document.getElementById("poster");

  data.genres.forEach((elem) => {
    li = document.createElement("li");
    li.innerHTML = elem.name;
    genresList.appendChild(li);
  });

  // Poster sizes
  /*
  w92
  w154
  w185
  w342
  w500
  */
  poster.src = "https://image.tmdb.org/t/p/w342" + data.poster_path;
};
