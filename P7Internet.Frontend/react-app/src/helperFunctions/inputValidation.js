 //should happen in backend
  //see what this regex accepts at https://jsfiddle.net/ghvj4gy9/
  export function checkValidEmail(email) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailRegex.exec(email);
    if (isValidEmail === null) return false;
    else return true;
  }

  //THE USERNAME VALIDATION SHOULD HAPPEN IN THE BACKEND
  //username: allowed characters are integers and upper/lowercase letters
  export function checkValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const isValidUsername = usernameRegex.exec(username);
    if (isValidUsername === null) return false;
    else return true;
  }

  //THE PASSWORD VALIDATION SHOULD HAPPEN IN THE BACKEND
  //password: allowed characters are at least 1 numeric degit, one uppercase, one lowercase
  //and between 6 to 20 characters, excluding special characters.
  export function checkValidPassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; //
    const isValidPassword = passwordRegex.exec(password);
    if (isValidPassword === null) return false;
    else return true;
  }