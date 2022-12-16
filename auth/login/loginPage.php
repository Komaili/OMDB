<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./mainl.css">
    <title>Login</title>
  </head>
  <body>
    <div class="container">
    <form action="login.php" method="POST">
      <h1 class="form__title">Login</h1>

      <div class="form__input-group">
                <input type="text" class="form__input" id="username" name="username" autofocus placeholder="Username">
            </div>

      <br />

      <div class="form__input-group">
                <input type="password" class="form__input" id="password" name="password" autofocus placeholder="Password">
            </div>
      <br />

      <button class="form__button" type="submit">Login</button>

      <p>Don't have an account yet? <a href="../register/registerPage.php"> Sign up</a></p>
      <p>Click here to go back to <a href="../../homePage/homePage.php">Homepage</a></p>
    </form>

    <?php
      if(isset($_GET['error']))
      {
        echo '<font color="#FF0000"><p>Incorrect username or password</p>';
      }
    ?>
    </div>

  </body>
</html>
