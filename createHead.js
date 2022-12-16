window.onload = function () {
  // Create the link for the logo
  logoLink = document.createElement("a");
  logoLink.href = "../homePage/homePage.php";
  logoLink.className = "logoLink";

  // Create the logo image
  logoImage = document.createElement("img");
  logoImage.src = "/images/logo.png";
  logoImage.id = "logo";
  logoImage.alt = "LOGO";
  logoLink.innerHTML = '<img id="logo" src="../images/logo.png" alt="LOGO"/>';
  document.body.prepend(logoLink);

  // Create the nav
  nav = document.createElement("nav");
  nav.id = "nav";
  nav.innerHTML = '<ul id="nav-links">' + "";

  nav.innerHTML =
    '<ul id="nav-links">' +
    "<li>" +
    '<a href="../homePage/homePage.php">Home</a>' +
    "</li>" +
    "<li>" +
    '<a href="../favoritesPage/favoritesPage.php">Favorites</a>' +
    "</li>" +
    "<li>" +
    '<a href="../contactPage/contactPage.html">Contact Us</a>' +
    "</li>" +
    "</ul>" +
    '<div id="burger">' +
    '<div class="line1"></div>' +
    '<div class="line2"></div>' +
    '<div class="line3"></div>' +
    "</div>";
  document.body.prepend(nav);

  // Create the form
  form = document.createElement("form");
  form.id = "searchForm";
  form.action = "../homePage/homePage.php";
  form.method = "get";

  form.innerHTML =
    '<div id="topnavContainer">' +
    '<input id="search" type="text" name="searchTerm" placeholder="Search OMDb: Movies"/>' +
    '<a href="../auth/register/registerPage.php">Sign Up</a>' +
    '<a href="../auth/login/loginPage.php">Login In</a>' +
    "</div>";
  '<div id="content">' + '<div id="movie-slider"></div>' + "</div>";
  document.body.prepend(form);

  // Code for web scraper
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
};
