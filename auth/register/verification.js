// HW 7 guidlines:
// The username must be between 6 and 10 characters long, inclusive.
// The username must contain only letters and digits.
// The username cannot begin with a digit.
// The password and the repeat password must match.
// The password must be between 6 and 10 characters long, inclusive.
// The password must contain only letters and digits.
// The password must have at least one lower case letter, at least one upper case letter, and at least one digit.
// Global variables
UC_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
LC_ALPHABET = "abcdefghijklmnopqrstuvwxyz"
DIGITS = "0123456789"

// test cases Question: what edge cases should I be aware of? 
function testCases() {
    // 1: The username must be between 6 and 10 characters long, inclusive.
    main('avs', 'Ab123456', 'Ab123456') // fail

    // 2: The username must contain only letters and digits.
    main('_user12_', 'Azerty1', 'Azerty1') // fail

    // 3: The username cannot begin with a digit.
    main('1user123', 'Azerty1', 'Azerty1') // fail

    // 4: The password and the repeat password must match.
    main('user123', 'Azerty1', 'Azerty2') // fail

    // 5: The password must be between 6 and 10 characters long, inclusive.
    main('user123', 'Azer1', 'Azert2') // fail

    // 6: The password must contain only letters and digits.
    main('user123', 'azertyuiop', 'azertyuiop') // fail

    // 7: The password must have at least one lower case letter, at least one upper case letter, and at least one digit.
    main('user123', 'AZERTY1', 'AZERTY1') // fail: no lower case letter
    main ('user123', 'azerty1', 'azerty1') // fail: no upper case letter
    main('user123', 'Azertyu', 'Azertyu') // fail: no digit

    // sucessful test cases
    main('user123', 'Azerty1', 'Azerty1') 
}

function main() {
    // get inputs
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    repeat_password = document.getElementById('rpassword').value;

    // check that the length is valid
    validLength_username = isCorrectLength(username)

    //assert funciton

    validLength_password = isCorrectLength(password)
    
    // check that the characters are valid
    validChars_username = hasValidChars(username, UC_ALPHABET, LC_ALPHABET, DIGITS)
    validChars_password = hasValidChars(password, UC_ALPHABET, LC_ALPHABET, DIGITS)

    // check that the username does not have a numeric first character
    isValidFirstChar_username = DIGITS.indexOf(username[0],0)==-1

    // check that the password and repeated passwrod match
    isMatching = (password == repeat_password) // this compares value inside the object

    // check that the password is strong
    strongPassword = (hasOneChar(password, LC_ALPHABET) && hasOneChar(password, UC_ALPHABET) && hasOneChar(password, DIGITS));

    // check if the inputs in the form are valid
    validForm = (validLength_username && validLength_password && validChars_username && validChars_password && isValidFirstChar_username && isMatching && strongPassword)
    console.log(strongPassword)
    console.log(validForm)


    // send alert
    if (validForm) {
        alert("User validated")
    }
    else {
        alert("Invalid username or password. \n\n" +
               "username: " + username + "\n" +
               "password: " + password + "\n" + 
               "repeat_password: " + repeat_password) 
        event.preventDefault();
    }
}

function isCorrectLength(_input) {
    // must be between 6 and 10
    input_length = _input.length;

    if (input_length >= 6 && input_length <= 10) {
        return true;
    }
    else {
        return false;
    }
}

function hasValidChars(_input, UC_ALPHABET, LC_ALPHABET, DIGITS) {
    input_length = _input.length;
    counter = 0;
    for(i=0; i<input_length; i++) {
        if ((UC_ALPHABET.indexOf(_input[i], 0) > -1) || (LC_ALPHABET.indexOf(_input[i],0) > -1) || (DIGITS.indexOf(_input[i],0) > -1)) {
            counter++
        }
    }
    return counter == input_length
}

// helper function
function hasOneChar(input1, input2) {
    for (i=0;i<input1.length; i++) {
        if (input2.indexOf(input1[i],0)>-1) {
            return true
        }
    }
    return false
}