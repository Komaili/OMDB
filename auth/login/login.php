<?php
  session_start();

  $username = $_POST['username'];
  $password = $_POST['password'];

  $db_server = 'spring-2022.cs.utexas.edu';
  $db_username = 'cs329e_bulko_branhub';
  $db_password = 'marble+dwell8Inform';
  $db_dbName = 'cs329e_bulko_branhub';

  $mysqli = new mysqli($db_server, $db_username, $db_password, $db_dbName);

  if($mysqli->connect_errno) {
    die('CUSTOM Connect Error: ' . $mysqli->connect_errno . ": " . $mysqli-> connect_error);
  }

  // Create query to see if username is correct
  $db_table = 'website_auth';
  $query = "SELECT * FROM website_auth WHERE username = \"$username\"";

  // Issue the query
  $result = $mysqli->query($query);

  // Verify the result
  if (!$result) {
    die("Query failed: ($mysqli->error <br> SQL query = $query");
  }
  else
  {
    $row = $result->fetch_assoc();
    if($row['username'] != $username || $row['password'] != $password)
    {
        header("Location: ./loginPage.php?error=1");
    }
    else
    {
      if(isset($_SESSION['current_url']))
      {
	//$favorites = isset($_COOKIE['favorites']) ? $_COOKIE['favorites'] : "[Default]";
        //$favorites = json_decode($favorites);
        //setcookie('favorites', json_encode($favorites), time()+1000000, "/");
        //setcookie($username, $password, time()+1000000, "/");
	setcookie("username", $username, time()+1000000, "/");
	setcookie("password", $password, time()+1000000, "/");
        //header("Location: " . "/cs329e-bulko/branhub/test/OMDb/homePage/homePage.php");
        header("Location: " . $_SESSION['current_url']);
      }
      else
      {
        header("Location: ../../homePage/homePage.php");
      }
    }
  }
?>