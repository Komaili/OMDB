<?php
  session_start();
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="footer.css" />
    <link rel="stylesheet" href="../navBar.css"/>
    <link rel="stylesheet" href="movies.css">
    <title>OMDB</title>
    <meta name="description" content="Genres page">
  </head>
  <body>




    <!-- NAVIGATION Link-->

    <h1> Our Movie Database</h1>

    <div id="banner"></div><br><br>

    <h2> Trending Movies </h2> <br>
    <div id="trending" class="category"></div>
    
    <h2> Netflix Originals </h2> <br>
    <div id="netflix-originals" class="category"></div>
    
    <h2> Top Rated Movies </h2> <br>
    <div id="top-rated" class="category"></div>

    <h2> Action Movies </h2> <br>
    <div id="action" class="category"></div>

    <h2> Comedy Movies </h2> <br>
    <div id="comedy" class="category"></div>

    <h2> Horror Movies </h2> <br>
    <div id="horror" class="category"></div>

    <h2> Romance Movies </h2> <br>
    <div id="romance" class="category"></div>

    <h2> Documentaries </h2> <br>
    <div id="docs" class="category"></div>

    
    <div id="2021-movies" class="category"></div>

    <div class="footer-dark">
      <footer>
          <div class="container2">
              <div class="row">
                  <div class="col-sm-6 col-md-3 item">
                      <h3>Website Description</h3>
                      <p>A website where you can search your favorite movies to see the trailer, description, ratings, and genre.</p>
                      <p>Moreover, you are able to login and store favorite movie links in the favorites page. </p>
                      <br>
                      <p>Creators: Brandon Hubacher, Taran Nudurumati, Zachary Moss, Komail Wahab </p>
                      <ul>
                          <li><a href="../contactPage/contactPage.html">Contact us</a></li>
                          <!-- <li><a href="../dummyPage.html">About us</a></li>
                          <li><a href="../dummyPage.html">Careers</a></li> -->
                      </ul>
                  </div>

                  <div class="col-md-6 item text"> <br><br>
                      <!-- <h3>Info</h3>
                      <p>A website where you can search your favorite movies to see the cast, plot, ratings, etc...</p>
                      <br>
                      <p>Creators: Brandon Hubacher, Taran Nudurumati, Zachary Moss, Komail Wahab </p> -->
                  </div>
                  <!-- <div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div> -->
              </div>
              <p class="copyright">Seal Team Six © 05/06/2022</p>
          </div>
      </footer>
  </div>
  <script src="movies.js" ></script>
  <script src="../createHead.js"></script>
  <script src="../navBar.js"></script>
</body>
</html>