<?php
  session_start();
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
  

  // Add movie to the has_favorite table

  $query_add_movie_to_favorites = "INSERT INTO has_favorite VALUES (\"$_COOKIE[username]\", \"$_SESSION[imdbID]\")";

  // Issue the query
  $result = $mysqli->query($query_add_movie_to_favorites);

  // Verify the result
  if (!$result) {
echo $_SESSION['imdbID'];
    die("INSERTION INTO FAVORITES Query failed: ($mysqli->error <br> SQL query = $query");
  }
  else
  {
    //header("Location: " . $_SESSION['current_url']);
  }


  // Create query to see if username is correct
  // $db_table = 'website_auth';
  //$query = "SELECT * FROM website_auth WHERE username = \"$username\"";

  // Check if movie is in movie table, if not add it
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
      
      header("Location: $_SESSION[current_url]");
    }
  }

  //$query = "SELECT username, info FROM website_auth AS auth JOIN has_favorite AS hasFav ON auth.username = hasFav.username JOIN movie AS movie_table ON hasFav.movieID = movie_table.movieID";
  function authenticate() {
    header("Location: ../auth/login/loginPage.php");
  } 
?>