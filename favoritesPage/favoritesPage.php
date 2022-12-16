<?php
  session_start();
  $_SESSION['current_url'] = "http" . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  if(!isset($_COOKIE['username']))
  {
    authenticate();
  }

  function authenticate() {
    header("Location: ../auth/login/loginPage.php");
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="favoritesPage.css" />
    <link rel="stylesheet" href="../navBar.css" />
    <link rel="stylesheet" href="footer.css" />
    <title>Favorites</title>
  </head>
  <body style="background: black;">
    <?php
      $db_server = 'spring-2022.cs.utexas.edu';
      $db_username = 'cs329e_bulko_branhub';
      $db_password = 'marble+dwell8Inform';
      $db_dbName = 'cs329e_bulko_branhub';

      $mysqli = new mysqli($db_server, $db_username, $db_password, $db_dbName);

      if($mysqli->connect_errno) {
        die('CUSTOM Connect Error: ' . $mysqli->connect_errno . ": " . $mysqli-> connect_error);
      }

      // Create query to see if username is correct
      // $db_table = 'website_auth';
      //$query = "SELECT * FROM website_auth WHERE username = \"$username\"";

      // Check if movie is in movie table, if not add it
      $query_get_favorites = "SELECT movie.title, movie.url FROM website_auth JOIN has_favorite ON website_auth.username = has_favorite.username JOIN movie ON has_favorite.movieID = movie.movieID WHERE website_auth.username = \"$_COOKIE[username]\"";
      $result = $mysqli->query($query_get_favorites);

      if (!$result) {
        die("Query failed: ($mysqli->error <br> SQL query = $query");
      }
      else
      {
	echo '<h1>Your Favorites</h1>';
	echo '<div style="text-align: center;" id="favoritesContainer">';
        echo '<ul>';

        while($row = $result->fetch_assoc())
        {
          echo '<li>' . '<a id=favMovie style="color: darkgray;" href=' . $row['url'] . ' id="favoriteLink">' . $row['title'] . '</a>' . '</li><br>';
        }

        echo '</ul>';
	echo '</div>';
      }
    ?>
    <div class="footer-dark">
      <footer>
          <div class="container2">
              <div class="row">
                  <div class="col-sm-6 col-md-3 item">
                      <h3>Website Description</h3>
                      <p>A website where you can search your favorite movies to see the trailer, description, ratings, and genre.</p> <br>
                      <p>Moreover, you are able to login and store favorite movies in the favorites page. </p> 
                      <br> <br>
                      <p>Creators: Brandon Hubacher, Taran Nudurumati, Zachary Moss, Komail Wahab </p> <br>
                          <a href="../contactPage/contactPage.html">Contact us</a>
                  </div>

                  <div class="col-md-6 item text"> <br><br>
                      <!-- <h3>Info</h3>
                      <p>A website where you can search your favorite movies to see the cast, plot, ratings, etc...</p>
                      <br>
                      <p>Creators: Brandon Hubacher, Taran Nudurumati, Zachary Moss, Komail Wahab </p> -->
                  </div>
                  <!-- <div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div> -->
              </div>
              <p class="copyright">Seal Team Six &copy; 05/06/2022</p>
          </div>
      </footer>
  </div>

    <script src="../createHead.js"></script>
    <script src="../navBar.js"></script>
  </body>
</html>
