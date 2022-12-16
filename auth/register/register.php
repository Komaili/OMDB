<?php
  $username = $_POST['username'];
  $password = $_POST['password'];

  $db_server = 'spring-2022.cs.utexas.edu';
  $db_username = 'cs329e_bulko_zach6';
  $db_password = 'Dollar+cask2Chalk';
  $db_dbName = 'cs329e_bulko_zach6';

  $mysqli = new mysqli($db_server, $db_username, $db_password, $db_dbName);

  if($mysqli->connect_errno) {
    die('CUSTOM Connect Error: ' . $mysqli->connect_errno . ": " . $mysqli-> connect_error);
  }

  // Escape User Input to help prevent SQL Injection
  $username = $mysqli->real_escape_string($username);
  $password = $mysqli->real_escape_string($password);

  // Create query to see if username already exists
  $db_table = 'website_auth';
  $query = "SELECT * FROM website_auth WHERE username = \"$username\"";

  // Issue the query
  $result = $mysqli->query($query);

  // Verify the result
  if (!$result) {
    die("Query failed: ($db->error <br> SQL query = $query");
  }
  else
  {
    $row = $result->fetch_assoc();
    if($row['username'] == $username || $_POST["password"] != $_POST["rpassword"])
    {
        header("Location: ./registerPage.php?error=1");
    }
    else
    {
      $query_add_user = "INSERT INTO website_auth VALUES (\"$username\", \"$password\")";

      $result_add_user = $mysqli->query($query_add_user);

      if (!$result_add_user) {
        die("Query failed: ($db->error <br> SQL query = $query_add_user");
      }
      else
      {
        header("Location: ../login/loginPage.php");
        exit;
      }
    }
  }
?>