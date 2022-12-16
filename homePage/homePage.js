window.onload = function () {
  var url = document.location.href;
  var params = url.split("?")[1].split("&");
  var data = {};
  var tmp;

  for (let i = 0, l = params.length; i < l; ++i) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  var searchArr = data.search.split("%20");
  var searchTerm = "";
  for (let i = 0, l = searchArr.length; i < l; ++i) {
    searchTerm += searchArr[i];
  }
  //document.getElementById('')

  const form = document.querySelector("form");
  const searchInput = document.querySelector("input");
  var resultsList = document.querySelector("#results");
  //resultsList.location.href = "/searchPage/searchPage.html";

  const BASE_URL = "https://polar-woodland-00821.herokuapp.com/";

  getSearchResults(searchTerm).then(showResults);

  function getSearchResults(searchTerm) {
    return fetch(`${BASE_URL}search/${searchTerm}`).then((res) => res.json());
  }

  function showResults(results) {
    console.log("results");
    console.log(results);
    results.forEach((movie) => {
      console.log(movie);
      const li = document.createElement("li");
      const img = document.createElement("img");
      li.appendChild(img);
      img.src = movie.image;
      const a = document.createElement("a");
      a.textContent = '    ' + ' ' + movie.title;
      a.href = "/moviePage.html?imdbID=" + movie.imdbID;
      li.appendChild(a);
      // console.log(li);
      resultsList.appendChild(li);
    });
  }
};
