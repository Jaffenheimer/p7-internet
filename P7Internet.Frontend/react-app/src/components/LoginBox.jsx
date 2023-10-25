import React, { useState } from "react";
import avatarIcon from "../data/profile.svg";
import cross from "../data/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../features/userSlice";
import toast from "react-hot-toast";

const LoginBox = ({ closeModal }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);

  const handleChangeFullname = (event) => setFullname(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleUserToLogIn = () => setCreatingAccount(false);
  const handleUserToCreateAccount = () => setCreatingAccount(true);

  function handleLogin() {
    //Find users that matches the username and password typed.
    const validUser = users.filter(
      (user) => user.username === username && user.password === password
    );

    if (validUser.length === 1) {
      //if the user exists
      dispatch(userActions.loginUser(validUser)); //the user is now logged in on redux
      closeModal();
    } else {
      toast.error("Kodeordet eller brugernavnet er indtastet forkert");
      setUsername("");
      setPassword("");
    }
  }

  //should happen in backend
  function checkValidFullname() {
    const fullnameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const isValidFullname = fullnameRegex.exec(fullname);
    if (isValidFullname === null) return false;
    else return true;
  }

  //should happen in backend
  //see what this regex accepts at https://jsfiddle.net/ghvj4gy9/
  function checkValidEmail() {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailRegex.exec(email);
    if (isValidEmail === null) return false;
    else return true;
  }

  //THE USERNAME VALIDATION SHOULD HAPPEN IN THE BACKEND
  //username: allowed characters are integers and upper/lowercase letters
  function checkValidUsername() {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const isValidUsername = usernameRegex.exec(username);
    if (isValidUsername === null) return false;
    else return true;
  }

  //THE PASSWORD VALIDATION SHOULD HAPPEN IN THE BACKEND
  //password: allowed characters are at least 1 numeric degit, one uppercase, one lowercase
  //and between 6 to 20 characters, excluding special characters.
  function checkValidPassword() {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; //
    const isValidPassword = passwordRegex.exec(password);
    if (isValidPassword === null) return false;
    else return true;
  }

  function handleCreateAccount() {
    const existsUser = users.filter((user) => user.username === username);

    if (existsUser.length > 0) toast.error("Brugernavnet er allerede taget.");
    else if (checkValidFullname() === false)
      toast.error(
        "Du har indtastet et ugyldigt navn. Den må kun bestå af bogstaver."
      );
    else if (checkValidEmail() === false)
      toast.error("Den indtastede email er ugyldig eller allerede i brug.");
    else if (checkValidUsername() === false)
      toast.error(
        "Brugernavnet er ugyldigt, da det kun må bestå af bogstaver og tal."
      );
    else if (checkValidPassword() === false)
      toast.error(
        "Kodeordet skal bestå af mindst et tal, et stort bogstav, et lille bogstav og være mellem 6 og 20 tegn langt uden brug af specielle tegn."
      );
    else {
      dispatch(userActions.addUser([fullname, email, username, password, []]));
      setCreatingAccount(false);
      document.getElementById("checkbox").checked = false;
      setFullname("");
      setEmail("");
      setUsername("");
      setPassword("");
      toast.success("Indsæt nu dine oplysninger for at logge ind.");
      toast.success("Din bruger er nu tilføjet til databasen!");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!creatingAccount) handleLogin();
    else handleCreateAccount();
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <div className="imgcontainer">
        <h3>
          {" "}
          {!creatingAccount ? "Login" : "Opret Bruger"}
          <img
            src={cross}
            alt="Back Arrow"
            id="loginCross"
            onClick={closeModal}
          />
        </h3>
        {!creatingAccount ? (
          <img src={avatarIcon} alt="Avatar" className="avatar" />
        ) : (
          <>
            <br></br>
            <br></br>
          </>
        )}
      </div>
      <div className="container">
        {!creatingAccount ? (
          ""
        ) : (
          <>
            <label>
              <b>Fulde navn</b>
            </label>
            <input
              type="text"
              placeholder="Indtast dit fulde navn"
              value={fullname}
              onChange={handleChangeFullname}
              required
            />
            <label>
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Indtast din email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
          </>
        )}
        <label>
          <b>Brugernavn</b>
        </label>
        <input
          type="text"
          placeholder="Indtast brugernavn"
          value={username}
          onChange={handleChangeUsername}
          required
        />

        <label>
          <b>Kodeord</b>
        </label>
        <input
          type="password"
          placeholder="Indtast kodeordet"
          value={password}
          onChange={handleChangePassword}
          required
        />

        <button type="submit">
          {!creatingAccount ? "Login" : "Tilføj Bruger"}
        </button>
        {!creatingAccount ? (
          <>
            <label>
              Husk mig: <input type="checkbox" />{" "}
            </label>
            <br />
            <a href="#">Glemt kodeord?</a>
            <br />
            <p id="noUserText">Ingen bruger:</p>
            <a href="#" onClick={handleUserToCreateAccount}>
              Opret Bruger
            </a>
          </>
        ) : (
          <>
            <p id="alreadyHasUserText">Har allerede en bruger:</p>
            <a href="#" onClick={handleUserToLogIn}>
              Log in
            </a>
          </>
        )}
      </div>
    </form>
  );
};

export default LoginBox;
