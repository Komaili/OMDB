<?php
  session_start();
  $_SESSION['current_url'] = "http" . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  $_SESSION['imdbID'] = explode('?', $_GET['imdbID'])[0];
  $_SESSION['title'] = explode('=', explode('?', $_GET['imdbID'])[1])[1];

  //$_SESSION['imdbID'] = $_GET['imdbID'];
  //$_SESSION['title'] = $_GET['title'];
?>

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
      <div style="top: -73px;" id="topnavContainer">
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
        <form method="POST">
          <button name="favorite" type="submit" id="favoriteButton">Add to favorites</button>
        </form>
      </div>
    </div>
    <br /><br />

    <?php
    $isDuplicate = false;
if($_SERVER['REQUEST_METHOD'] === 'POST')
{
  if(!isset($_COOKIE['username']))
  {
    authenticate();
  }

  $db_server = 'spring-2022.cs.utexas.edu';
  $db_username = 'cs329e_bulko_branhub';
  $db_password = 'marble+dwell8Inform';
  $db_dbName = 'cs329e_bulko_branhub';

  $mysqli = new mysqli($db_server, $db_username, $db_password, $db_dbName);

  if($mysqli->connect_errno) {
    die('CUSTOM Connect Error: ' . $mysqli->connect_errno . ": " . $mysqli-> connect_error);
  }

  // TODO: Make sure to restrict users from adding the same movie multiple times to favorites!!!

  // 
  

  // Add movie to the has_favorite table

  $query_add_movie_to_favorites = "INSERT INTO has_favorite VALUES (\"$_COOKIE[username]\", \"$_SESSION[imdbID]\")";

  // Issue the query
  $result = $mysqli->query($query_add_movie_to_favorites);

  // Verify the result
  if (!$result) {
    $errorMessage = $mysqli->error;
    
    if(explode(' ', $errorMessage)[0] == 'Duplicate')
    {
      $isDuplicate = true;
    }
    else
    {
      die("INSERTION INTO FAVORITES Query failed: ($mysqli->error <br> SQL query = $query");
    }
  }
  else
  {
    //header("Location: " . $_SESSION['current_url']);
  }


  // Create query to see if username is correct
  // $db_table = 'website_auth';
  //$query = "SELECT * FROM website_auth WHERE username = \"$username\"";

  // Check if movie is in movie table, if not add it
  if($isDuplicate)
  {
    echo "<script> alert(\"This movie already exists in your favorites\")</script>";
  }
  else
  {
    $query_movie_in_table = "SELECT movieID FROM movie WHERE movieID = \"$_GET[imdbID]\"";

    $result = $mysqli->query($query_movie_in_table);

    if (!$result) {
      die("CHECK IF MOVIE IN MOVIE Query failed: ($mysqli->error <br> SQL query = $query");
    }
    else
    {
      $row = $result->fetch_assoc();
      // If movie is not in movie table, add it to movie table
      if($row['movieID'] != $_SESSION['imdbID'])
      {
        //$url = "http" . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

        $url = $_SESSION['current_url'];

        $str = file_get_contents("moviePage.php");
        //$match = "/<span[^>]*id=\"title\">(.*?)<\/span>/";
        //$movieTitle = preg_match($match, $str);
        $query_add_movie_to_movie = "INSERT INTO movie VALUES (\"$_SESSION[imdbID]\", \"$_SESSION[title]\", \"$url\")";

        $result = $mysqli->query($query_add_movie_to_movie);

        if (!$result) {
          die("INSERT MOVIE INTO MOVIE Query failed: ($mysqli->error <br> SQL query = $query");
        }
        
        //header("Location: $_SESSION[current_url]");
      }
    }
  }

  //$query = "SELECT username, info FROM website_auth AS auth JOIN has_favorite AS hasFav ON auth.username = hasFav.username JOIN movie AS movie_table ON hasFav.movieID = movie_table.movieID";
  function authenticate() {
    header("Location: ../auth/login/loginPage.php");
  }
}

    ?>
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
