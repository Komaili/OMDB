// verfication comments 800 words

function isCorrectLength(_input) {
  // must be between 6 and 10
  input_length = _input.length;

  if (input_length < 800) {
    return true;
  } else {
    return false;
  }
}

function alertUser() {
  comment = document.getElementById("subject").value;

  if (!isCorrectLength(comment)) {
    // comment exceeds 799 characters
    window.alert(
      "Form not submitted. Ensure comment is less than 800 characters in length!"
    );
    event.preventDefault();
  }
}
