<?php
  session_start();

  $username = $_POST['username'];
  $password = $_POST['password'];
  $_SESSION["username"] = $username;
  $_SESSION["password"] = $password;

  // debugging
  if (isset($_POST["username"])) {
    header("Location: ./".$_POST['username']."php");
  } else {
    header("Location: ./usernameDoesntExist.php");
  }
  //debugging

  $db_server = 'spring-2022.cs.utexas.edu';
  $db_username = 'cs329e_bulko_zach6';
  $db_password = 'Dollar+cask2Chalk';
  $db_dbName = 'cs329e_bulko_zach6';

  $mysqli = new mysqli($db_server, $db_username, $db_password, $db_dbName);

  if($mysqli->connect_errno) {
    die('CUSTOM Connect Error: ' . $mysqli->connect_errno . ": " . $mysqli-> connect_error);
  }

  // Create query to see if username is correct
  $db_table = 'website_auth';
  $query = "SELECT * FROM $db_table WHERE username = \"$username\"";

  // Issue the query
  $result = $mysqli->query($query);

  // Verify the result
  if (!$result) {
    die("Query failed: ($db->error <br> SQL query = $query");
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
        setcookie("login", "testLogin", time()+120, "/");
        header("Location: " . $_SESSION['current_url']);
      }
      else
      {
        header("Location: ../../homePage/homePage.php");
      }
    }
  }
?>