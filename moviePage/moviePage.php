<?php
session_start();
print <<<moviePage
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="moviePage.css" />
    <link rel="stylesheet" href="../navBar.css" />
    <!-- Make the title dynamic on the title of the movie -->
    <title>Movie</title>
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
    <br /><br />
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
    <div class="row1">
      <span id="title"></span>
      <!-- <span> | </span>
      <span id="imdbRating"></span> -->
    </div>
    <div class="row2">
      <span id="imdbRating"></span>
      <span> | </span>
      <span id="datePublished"></span>
      <span> | </span>
      <span id="contentRating"></span>
      <span> | </span>
      <span id="runTime"></span>
      <!-- <form action="">
        <input type="radio" name="" id=""></input>
      </form> -->
      <div id="genrenames">
        <ul id="genresList"></ul>
      </div>
      <div id="summaryfont">
        <span id="summary"></span>
      </div>
      <div id="favbutton">
      <script>
        $foobar = document.getElementById("title").innerText;
      </script>
        <form method="POST">
          <input type="hidden" name="hiddentitle" value="$foobar" />
          <button id="favoriteButton" name="favoriteButton"><span></span> Add to favorites</button>
        </form>
      </div>
    </div>
    <br /><br />
    <!-- Float this left and have genre and summary floated right -->

    <ul id="genresList"></ul>
    <div class="trailer">
      <img id="poster" src="" alt="" />
      <img id="thumbnail" src="" alt="" />
      <iframe id="trailerVideo" src="" frameborder="0"></iframe>
    </div>

    <!-- <div class="rightOfTrailer">
      <span id="genres">
        Genres
        <ul id="genresList"></ul>
      </span>
      Summary
      <span id="summary"></span>
    </div> -->
    <!-- <script src="../createHead.js"></script> -->
    <script src="moviePage.js"></script>
    <script src="../navBar.js"></script>
  </body>
</html>
moviePage;

  // check if fav button has been clicked
  if (isset($_POST["favoriteButton"])) {

    // check if user is logged in or not
    if (isset($_SESSION["username"])) {
      

      $server = "spring-2022.cs.utexas.edu";
      $user = "cs329e_bulko_zach6";
      $pwd = "Dollar+cask2Chalk";
      $dbName = "cs329e_bulko_zach6";

      // connect to a MYSQL server
      $mysqli = new mysqli ($server, $user, $pwd, $dbName);

      // sql column values
      $client_user = $_SESSION["username"];

//       echo <<<titleScript
//       "<script type="text/javascript">
//         var title = document.getElementById("title").innerHTML";
//         console.log(title);
//       </script>"
// titleScript; 
      
      // add movie title to sql database (username, url)
      // echo "<script> 
      // var title = document.getElementById(\"title\");
      // </script>";

      $title = $_POST["hiddentitle"];
      // getting the url from current page
      $protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
      $url = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

      // inserting information into database
      $command = "INSERT INTO fav_movies VALUES (\"$client_user\", \"$url\", \"$title\");";
      $result = $mysqli->query($command);

      // Verify the result
      if (!$result) {
        echo "<script> alert(\"This movie already exists in your favorites\")</script>";
      }

    } else {
      // user hasn't logged into the website
      header("Location: .././auth/login/loginPage.php");
    }
  }
?>
