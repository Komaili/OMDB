import fetch from "node-fetch";
import cheerio from "cheerio";
//import { attr } from "cheerio/lib/api/attributes";

// movie title to search will be appended to the end of this URL
const searchUrl = "https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=";
const movieUrl = "https://www.imdb.com/title/";

const searchCache = {};
const movieCache = {};

function searchMovies(searchTerm) {
  console.log("in search function");
  // If search page has already been visited, return it from cache
  if (searchCache[searchTerm]) {
    return Promise.resolve(searchCache[searchTerm]);
  }

  // Retrieves results page data
  return fetch(`${searchUrl}${searchTerm}`)
    .then((response) => response.text())
    .then((body) => {
      const movies = [];
      const $ = cheerio.load(body);
      $(".findResult").each(function (i, element) {
        const $element = $(element);
        const $image = $element.find("td a img");
        const $title = $element.find("td.result_text a");
        const imdbID = $title.attr("href").match(/title\/(.*)\//)[1];

        const movie = {
          image: $image.attr("src"),
          title: $title.text(),
          imdbID,
        };
        movies.push(movie);
      });

      // Add searchTerm to cache
      searchCache[searchTerm] = movies;

      return movies;
    });
}

function getMovie(imdbID) {
  // If movie page has already been visited, return it from cache
  // if (movieCache[imdbID]) {
  //   console.log("Serving from cache:", imdbID);
  //   return Promise.resolve(movieCache[imdbID]);
  // }

  return fetch(`${movieUrl}${imdbID}`)
    .then((response) => response.text())
    .then((body) => {
      // Match for finding the start of the pertinent info
      var matches = body.match(/{\"@type\":\"A/g);

      // Split body into array
      var arr = body.split(matches[0]);

      // Match for finding the end of pertinent info
      matches = body.match(/\"actor\":/g);

      // Retrieve sectioned data
      var data = arr[1].split(matches[0])[0];
      var dataArr = data.split(",").slice(4);

      for (let i = 0; i != dataArr.length; ++i) {
        var match = data.match(/\"/g);
        var quote = data.match(/"/g);
        dataArr[i] = dataArr[i].replace(match[0], "");
        dataArr[i] = dataArr[i].replace(match[0], "");
        dataArr[i] = dataArr[i].replace(match[0], "");
        dataArr[i] = dataArr[i].replace(match[0], "");
        dataArr[i] = dataArr[i].replace(quote[0], "");
      }

      var ratingValue = "";
      var contentRating = "";
      var datePublished = "";
      var genres = [];
      var date = "";
      var trailerVideo = "";
      var trailerThumbnail = "";

      var i = 0;
      while (i < dataArr.length) {
        var pair = dataArr[i].split(":");

        if (pair[0] == "ratingValue") {
          var rating = pair[1];
          rating = rating.replace("}", "");
          ratingValue = rating;
        } else if (pair[0] == "contentRating") {
          contentRating = pair[1];
        } else if (pair[0] == "genre") {
          while (
            i < dataArr.length &&
            dataArr[i].charAt(dataArr[i].length - 1) != "]"
          ) {
            genres.push(dataArr[i]);
            if (genres[genres.length - 1].charAt(0) == "g") {
              var match = "genre:[";
              genres[genres.length - 1] = genres[genres.length - 1].replace(
                match,
                ""
              );
            }
            ++i;
          }
          var lastGenre = dataArr[i];
          lastGenre = lastGenre.replace("]", "");
          genres.push(lastGenre);
        } else if (pair[0] == "datePublished") {
          datePublished = pair[1].split("-")[0];
        } else if (pair[0] == "embedUrl") {
          trailerVideo = pair[1];
        } else if (pair[0] == "contentUrl") {
          trailerThumbnail = pair[1] + pair[2];
          trailerThumbnail = trailerThumbnail.replace("}", "");
        }

        ++i;
      }

      const json1 = {
        ratingValue,
        contentRating,
        datePublished,
        genres,
        trailerVid: `https://www.imdb.com${trailerVideo}`,
        trailerThumbnail,
      };

      const $ = cheerio.load(body);
      const $title = $(".sc-94726ce4-1 h1");

      const title = $title
        .first()
        .contents()
        .filter(function () {
          return this.type === "text";
        })
        .text()
        .trim();

      // //TODO: Find better way than selector
      // const rating = $(
      //   "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-94726ce4-1.iNShGo > div > ul > li:nth-child(2) > span"
      // ).text();

      // const runTime = $(
      //   "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-94726ce4-1.iNShGo > div > ul > li:nth-child(3)"
      // )
      //   .first()
      //   .contents()
      //   .filter(function () {
      //     return this.type === "text";
      //   })
      //   .text()
      //   .trim();

      // // TODO: Do this in a more efficient way!!!

      // const genres = [];

      // $(
      //   "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-1cdfe45a-2.eHejrG > div.sc-1cdfe45a-10.cuzXyh > div.sc-1cdfe45a-4.wrDNM > div.sc-16ede01-8.hXeKyz.sc-1cdfe45a-11.eVPKIU > div"
      // )
      //   .children()
      //   .each((i, element) => {
      //     const sepString = element.attribs.href.split(/[=&]/);
      //     const genre = sepString[1];
      //     genres.push(genre);
      //   });
      //   // return genres;

      // const datePublished = $(
      //   "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-94726ce4-1.iNShGo > div > ul > li:nth-child(1) > span"
      // ).text();

      // const imdbRating = $(
      //   'div[data-testid="hero-rating-bar__aggregate-rating__score"] > span'
      // )
      //   .text()
      //   .split("/")[0];

      const poster = $(
        `#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-1cdfe45a-2.eHejrG > div.sc-1cdfe45a-3.eIAmdj > div > div.sc-43e10848-1.hNvLDX > div > div.ipc-media.ipc-media--poster-27x40.ipc-image-media-ratio--poster-27x40.ipc-media--baseAlt.ipc-media--poster-l.ipc-poster__poster-image.ipc-media__img > img`
      ).attr("src");

      const summary = $(
        'span[role="presentation"][data-testid="plot-xs_to_m"]'
      ).text();

      function getItem(itemArray) {
        return function (i, element) {
          const item = $(element).text().trim();
          itemArray.push(item);
        };
      }

      // TODO: Add directors
      const directors = [];
      $('span[itemProp="director"]').each(getItem(directors));

      // TODO: Add writers
      const writers = [];
      $('.credit_summary_item span[itemProp="creator"]').each(getItem(writers));

      const stars = [];
      $(
        "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-1cdfe45a-2.eHejrG > div.sc-1cdfe45a-10.cuzXyh > div.sc-1cdfe45a-4.wrDNM > div.sc-fa02f843-0.fjLeDR > ul > li:nth-child(3) > div"
      ).each(getItem(stars));

      // TODO: Add storyline
      const storyLine = $('#titleStoryLine div[itemProp="description"] p')
        .text()
        .trim();

      // TODO: Add companies
      const companies = [];
      $('span[itemType="http://schema.org/Organization"]').each(
        getItem(companies)
      );

      const trailer = $(
        "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-1cdfe45a-2.eHejrG > div.sc-1cdfe45a-3.eIAmdj > div > div.sc-43e10848-1.hNvLDX > div > a"
      ).attr("href");
      //const trailer = $('a[itemProp="trailer"]').attr("href");

      var json2 = {
        imdbID,
        title,
        // rating,
        // runTime,
        // genres,
        // datePublished,
        // imdbRating,
        //poster,
        summary,
        //directors,
        //writers,
        //stars,
        storyLine,
        //companies,
        //trailer: `https://www.imdb.com${trailer}`,
      };

      const result = {};
      let key;

      for (key in json1) {
        result[key] = json1[key];
      }

      for (key in json2) {
        result[key] = json2[key];
      }

      movieCache[imdbID] = result;

      return result;
    });
}

// function testMovie(imdbID) {
//   return fetch(`${movieUrl}${imdbID}`)
//     .then((response) => response.text())
//     .then((body) => {

//       // Match for finding the start of the pertinent info
//       var matches = body.match(/{\"@type\":\"A/g);

//       // Split body into array
//       var arr = body.split(matches[0]);

//       // Match for finding the end of pertinent info
//       matches = body.match(/\"actor\":/g)

//       // Retrieve sectioned data
//       var data = arr[1].split(matches[0])[0];
//       var dataArr = data.split(",").slice(4);

//       for(let i = 0; i != dataArr.length; ++i)
//       {
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
//       while(i < dataArr.length)
//       {
//         var pair = dataArr[i].split(":");

//         if(pair[0] == "ratingValue")
//         {
//           var rating = pair[1];
//           rating = rating.replace("}", "");
//           ratingValue = rating
//         }
//         else if(pair[0] == "contentRating")
//         {
//           contentRating = pair[1];
//         }
//         else if(pair[0] == "genre")
//         {
//           while(i < dataArr.length && dataArr[i].charAt(dataArr[i].length - 1) != "]")
//           {

//             genres.push(dataArr[i]);
//             if(genres[genres.length - 1].charAt(0) == "g")
//             {
//               var match = "genre:[";
//               genres[genres.length - 1] = genres[genres.length - 1].replace(match, "");
//             }
//             ++i;
//           }
//           var lastGenre = dataArr[i];
//           lastGenre = lastGenre.replace("]", "");
//           genres.push(lastGenre);
//         }
//         else if(pair[0] == "datePublished")
//         {
//           datePublished = pair[1].split("-")[0];
//         }
//         else if(pair[0] == "embedUrl")
//         {
//           trailerVideo = pair[1];
//         }
//         else if(pair[0] == "contentUrl")
//         {
//           trailerThumbnail = pair[1] + pair[2];
//           trailerThumbnail = trailerThumbnail.replace("}", "");
//         }

//         ++i;
//       }

//       const movie = {
//         ratingValue,
//         contentRating,
//         datePublished,
//         genres,
//         trailerVid: `https://www.imdb.com${trailerVideo}`,
//         trailerThumbnail
//       };
//       return movie;
//     });
// }

// function getMovieDeprecated(imdbID) {
//   // If movie page has already been visited, return it from cache
//   // if (movieCache[imdbID]) {
//   //   console.log("Serving from cache:", imdbID);
//   //   return Promise.resolve(movieCache[imdbID]);
//   // }

//   return fetch(`${movieUrl}${imdbID}`)
//     .then((response) => response.text())
//     .then((body) => {

//       const data = testMovie(imdbID);

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

//       // const poster = $(
//       //   `#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-1cdfe45a-2.eHejrG > div.sc-1cdfe45a-3.eIAmdj > div > div.sc-43e10848-1.hNvLDX > div > div.ipc-media.ipc-media--poster-27x40.ipc-image-media-ratio--poster-27x40.ipc-media--baseAlt.ipc-media--poster-l.ipc-poster__poster-image.ipc-media__img > img`
//       // ).attr("src");

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
//       $('.credit_summary_item span[itemProp="creator"]').each(getItem(writers));

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

//       const movie = {
//         imdbID,
//         title,
//         // rating,
//         // runTime,
//         // genres,
//         // datePublished,
//         // imdbRating,
//         poster,
//         summary,
//         directors,
//         writers,
//         stars,
//         storyLine,
//         companies,
//         trailer: `https://www.imdb.com${trailer}`,
//       };

//       const merged = {
//         data,
//         movie
//       };

//       movieCache[imdbID] = merged;

//       return merged;
//     });
// }

// module.exports = {
//   searchMovies,
//   getMovie,
// };

export { searchMovies, getMovie };
