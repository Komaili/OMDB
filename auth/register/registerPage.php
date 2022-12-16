<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="text/javascript" src="verification.js" defer> </script>
    <link rel="stylesheet" href="./main.css">
    <title>Sign Up</title>
  </head>
  <body>
    <div class="container">
    <form action="register.php" method="POST">
      <h1 class="form__title">Sign up</h1>

      <div class="form__input-group">
                <input type="text" class="form__input" id="username" name="username" autofocus placeholder="Username">
            </div>

      <br />

      <div class="form__input-group">
                <input type="text" class="form__input" id="password" name="password" autofocus placeholder="Password">
            </div>
      <br />

      <div class="form__input-group">
                <input type="text" class="form__input" id="rpassword" name="rpassword" autofocus placeholder="Repeat Password">
            </div>
      <br />

      <button class="form__button" onclick="main()" type="submit">Continue</button>

      <p>Already have an account? <a href="../login/loginPage.php"> Login</a></p>
      <p>Click here to go back to <a href="../../homePage/homePage.php">Homepage</a></p>
    </form>

    <?php
      if(isset($_GET['error']))
      {
        echo '<font color="#FF0000"><p>Invalid username and password pair</p>';
      }
    ?>
    </div>



  </body>
</html>
