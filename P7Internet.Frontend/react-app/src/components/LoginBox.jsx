import React, { useState } from "react";
import cross from "../data/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../features/userSlice";
import { toast } from 'react-toastify';
import { useUserCreateMutation, useUserLoginMutation } from "../services/usersEndpoints";
import 'react-toastify/dist/ReactToastify.css';


const LoginBox = ({ closeModal }) => {
  const dispatch = useDispatch();  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);

  //States used to fetch data from backend
  const [userLogin, {isLoginLoading, isLoginError}] =  useUserLoginMutation();
  const [userCreate, {isCreateLoading, isCreateError}] =  useUserCreateMutation();


  //Functions is async because the need to wait for the response from the backend
  const handleLogin =  async() => {
    //const cookies = document.cookie;  

    //Functions from redux that allows to test weather error or loading
    if(!isLoginLoading || !isLoginError){
        try {
          // Waits for the response and allows to use response (unwrap, because JSON)
          const response = await userLogin({username, password}).unwrap();
          if(response){
            toast.success("Velkommen tilbage, " + response.name);
            console.log(response);

            //Add data about user to cookie
            document.cookie = `username=${response.name};`;
            document.cookie = `userid=${response.id};`;
            document.cookie = `sessionToken=${response.sessionToken};`;  

            dispatch(userActions.toggleTestLogin());
            closeModal();
            setUsername("");
            setPassword("");
          }
          
        } catch (error) {
          toast.error("Kodeordet eller brugernavnet er indtastet forkert", error.massage);
          console.log("Error -- ", error.message); 
        }
    }
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

  const handleCreateAccount = async() => {
    // const existsUser = users.filter((user) => user.username === username);

    // if (existsUser.length > 0) toast.error("Brugernavnet er allerede taget.");
    // else 
    
    if (checkValidEmail() === false)
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

      if(!isCreateLoading || !isCreateError){
        try {
          const response = await userCreate({username, password, email}).unwrap();
          if (response){
            toast.success("Din bruger er nu oprettet!");

            document.cookie = `username=${response.name};`;
            document.cookie = `userid=${response.id};`;
            document.cookie = `sessionToken=${response.sessionToken};`;  
            
            dispatch(userActions.toggleTestLogin());
            dispatch(userActions.addUser([email, username, password, []]));
            setCreatingAccount(false);
            closeModal();
            
            setEmail("");
            setUsername("");
            setPassword("");
            
          }
        } catch (error) {
          toast.error("Kodeordet eller brugernavnet er indtastet forkert");
        }
      } 
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
            alt="Back Cross"
            id="loginCross"
            onClick={closeModal}
          />
        </h3>
      </div>
      <div className="container">
        {!creatingAccount ? (
          ""
        ) : (
          <>
            <label>
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Indtast din email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label>
          <b>Kodeord</b>
        </label>
        <input
          type="password"
          placeholder="Indtast kodeordet"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
            <a href="/#">Glemt kodeord?</a>
            <br />
            <p id="noUserText">Ingen bruger:</p>
            <a href="/#" onClick={() => setCreatingAccount(true)}>
              Opret Bruger
            </a>
          </>
        ) : (
          <>
            <p id="alreadyHasUserText">Har allerede en bruger:</p>
            <a href="/#" onClick={() => setCreatingAccount(false)}>
              Log in
            </a>
          </>
        )}
      </div>
    </form>
  );
};

export default LoginBox;
