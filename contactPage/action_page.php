<?php
    error_reporting(E_ALL);
    ini_set("display_errors", "on");

    if ($_POST["firstname"] != "" && $_POST["lastname"] != "" && $_POST["subject"] != "") {
        $server = "spring-2022.cs.utexas.edu";
        $user = "cs329e_bulko_zach6";
        $pwd = "Dollar+cask2Chalk";
        $dbName = "cs329e_bulko_zach6";

        // connect to a MYSQL server
        $mysqli = new mysqli ($server, $user, $pwd, $dbName);

        // insert values from webpage into sql database
        $fname = $_POST["firstname"];
        $lname = $_POST["lastname"];
        $subject = $_POST["subject"];
        $command = "insert into comments VALUES(\"$fname\", \"$lname\", \"$subject\");";
        $result = $mysqli->query($command);
        
        // check if invalid input ex: redundant entry
        if (!$result) {
            echo '<script type="text/javascript">'; 
            echo 'alert("This is a redundant entry. In other words, the first name, last name, and comment combination exists in the database.");'; 
            echo 'window.location.href = "contactPage.html";';
            echo '</script>';
            // header("Location: ./contactPage.html");
            // echo "<script>alert(\"Invalid Input\");</script>"; // use ajax?
        } 
    } else {
        // all entries are empty
        echo '<script type="text/javascript">'; 
        echo 'alert("Make sure all entries are filled");'; 
        echo 'window.location.href = "contactPage.html";';
        echo '</script>';
        // header("Location: ./contactPage.html");
        // echo "<script>alert(\"Make sure all entries are filled\"); </script>"; // use ajax?
    }
    // go back to contactPage.html
    echo '<script type="text/javascript">'; 
    echo 'alert("Your comments have been recorded");'; 
    echo 'window.location.href = "contactPage.html";';
    echo '</script>';
    // echo '<script>alert("Your comments have been recorded")</script>';
    // inside echo redirect to the contactPage
?>