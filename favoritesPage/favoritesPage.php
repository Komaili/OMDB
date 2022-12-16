<?php
  session_start();
  $_SESSION['current_url'] = "http" . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  if(!isset($_COOKIE['login']))
  {
    authenticate();
  }

  function authenticate() {
    header("Location: ../auth/login/loginPage.php");
  }

  // newFavPage();
  favPage();
  // make an sql select statement to get fav titles 
  $server = "spring-2022.cs.utexas.edu";
  $user = "cs329e_bulko_zach6";
  $pwd = "Dollar+cask2Chalk";
  $dbName = "cs329e_bulko_zach6";

  // connect to a MYSQL server
  $mysqli = new mysqli ($server, $user, $pwd, $dbName);

  $client_user = $_SESSION["username"];

  $command = "Select url from fav_movies where username = \"$client_user\"";
  $result = $mysqli->query($command);

  $counter = 1;
  for ($i=0; $i<5; $i++) {
    echo "<br>";
  }

  // check if there are no favorite movies for a specific user 
  $row_cnt = $result->num_rows;

  $message = $client_user . ", you have no favorite movies at this time.";
  if ($row_cnt == 0) {
    echo "<h2 style=\"text-align:center; color:white\"> $message</h2>";
  }

  // post favorite movie links
  while ($row = $result->fetch_assoc()) {

    // get the url 
    $url = $row["url"];

    echo "<p>" ."<h2 style=\"text-align:center;\"><a id=\"movie_link\" href=\"$url\">Favorite Movie ".strval($counter)."</a></h2></p>";
    // echo "<p>" ."<h2 style=\"text-align:center; color: white;\"><p><link href=\"$url\">Favorite Movie ".strval($counter)."</text></h2></p>";
    $counter +=1;
  }

function favPage(){
  print <<<favPage
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="favoritesPage.css" />
    <link rel="stylesheet" href="../navBar.css" />
    <title>Favorites</title>
  </head>
  <body>
    <a href="../homePage/homePage.php" class="logoLink"
    ><img id="logo" src="../images/logo.png" alt="LOGO"
  /></a>
    <nav id="nav">
    <ul id="nav-links">
      <li>
        <a href="../homePage/homePage.php">Home</a>
      </li>
      <li>
        <a href="../favoritesPage/favoritesPage.php">Favorites</a>
      </li>
      <li>
        <a href="../contactPage/contactPage.html">Contact Us</a>
      </li>
    </ul>

    <div id="burger">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line3"></div>
    </div>
  </nav>

<form id="searchForm" action="homePage.php" method="get">
  <div id="topnavContainer">
    <input
      id="search"
      type="text"
      name="searchTerm"
      placeholder="Search OMDb: Movies"
    />
    <a href="../auth/register/registerPage.php">Sign Up</a>
    <a href="../auth/login/loginPage.php">Login In</a>
  </div>
  <div id="content">
        <div id="movie-slider"></div>
      </div>
    </form>
    <script>
    const form = document.getElementById("searchForm");
    const searchInput = document.querySelector("input");

    form.addEventListener("keydown", function (event) {
      console.log("key was pressed");
      // TODO: Don't run if search bar is empty
      if (event.code === "Enter") {
        console.log("enter has been pressed");
        var searchTerm = searchInput.value;
        console.log("the search term is: " + searchTerm);
        var url =
          "../searchPage/searchPage.html?search=" +
          encodeURIComponent(searchTerm);

        document.location.href = url;
        event.preventDefault();
      }
    });
  </script>
  <div id="flexContainer">
    <div id="resultsContainer">
      <ul id="results"></ul>
    </div>
  </div>

  <script src="../homePage/homePage.js" charset="utf-8"></script>

  <script>
    document.addEventListener("click", function (event) {
      var target = event.target;

      // TODO: Develop more efficient logic to preclude generating movie page
      // for non movie links
      if (target.tagName === "A" && target.href.match("movie")) {
        console.log(target.href.split("."));

        var imdbID = target.href.split("=")[1];
        console.log("href: " + target.href);
        console.log("imdbID: " + imdbID);
        var url =
          "../moviePage/moviePage.php?imdbID=" + encodeURIComponent(imdbID);

        console.log(target.textContent);
        // a.textContent = movie.title;

        document.location.href = url;

        // Why is this required to make the page be directed to the proper path?
        event.preventDefault();
      }
    });
  </script>
  <!-- <script src="../createHead.js"></script> -->
  <script src="../navBar.js"></script>
  </body>
</html>
favPage;
}
?>
