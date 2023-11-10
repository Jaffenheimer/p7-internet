import React, { useState } from "react";
import cross from "../data/cross.svg";
import { useDispatch } from "react-redux";
import { userActions } from "../features/userSlice";
import { toast } from "react-toastify";
import {
  useUserCreateMutation,
  useUserLoginMutation,
} from "../services/usersEndpoints";
import "react-toastify/dist/ReactToastify.css";
import {
  checkValidEmail,
  checkValidUsername,
  checkValidPassword,
} from "../helperFunctions/inputValidation";

const LoginBox = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);

  //States used to fetch data from backend
  const [userLogin, { isLoginLoading, isLoginError }] = useUserLoginMutation();
  const [userCreate, { isCreateLoading, isCreateError }] =
    useUserCreateMutation();

  //Functions is async because it needs to wait for the response from the backend
  const handleLogin = async () => {
    /*
      If the login is not loading or there were no error then it will try to login, 
      if there is an an error it will be displayed 
    */
    if (!isLoginLoading || !isLoginError) {
      try {
        //Enconding request to URI standart (handles symbols in request)
        const encodedUsername = encodeURIComponent(username);
        const encodedPassword = encodeURIComponent(password);

        // Waits for the response and allows to use response (unwrap, because JSON)
        const response = await userLogin({
          username: encodedUsername,
          password: encodedPassword,
        }).unwrap();
        if (response) {
          toast.success("Velkommen tilbage, " + response.name);

          //Add data about user to cookie
          document.cookie = `username=${response.name};`;
          document.cookie = `userid=${response.id};`;
          document.cookie = `sessionToken=${response.sessionToken};`;

          //adds user to redux store
          dispatch(
            userActions.loginUser({
              id: response.id,
              name: response.name,
              email: response.emailAddress,
            })
          );

          closeModal();
          setUsername("");
          setPassword("");
        }
      } catch (error) {
        toast.error(
          "Kodeordet eller brugernavnet er indtastet forkert",
          error.massage
        );
        console.log("Error -- ", error.message);
      }
    }
  };

  //Functions is async because it needs to wait for the response from the backend
  const handleCreateAccount = async () => {
    if (checkValidEmail(email) === false)
      toast.error("Den indtastede email er ugyldig");
    else if (checkValidUsername(username) === false)
      toast.error(
        "Brugernavnet er ugyldigt, da det kun må bestå af bogstaver og tal."
      );
    else if (checkValidPassword(password) === false)
      toast.error(
        "Kodeordet skal bestå af mindst et tal, et stort bogstav, et lille bogstav og være mellem 6 og 20 tegn langt uden brug af specielle tegn."
      );
    else {
      /*
        If the login is not loading or there were no error then it will try to login, 
        if there is an an error it will be displayed 
      */
      if (!isCreateLoading || !isCreateError) {
        try {
          //Enconding request to URI standart (handles symbols in request)
          const encodedUsername = encodeURIComponent(username);
          const encodedPassword = encodeURIComponent(password);
          const encodedEmail = encodeURIComponent(email);

          // Waits for the response and allows to use response (unwrap, because JSON)
          const response = await userCreate({
            username: encodedUsername,
            password: encodedPassword,
            email: encodedEmail,
          }).unwrap();
          if (response) {
            toast.success("Din bruger er nu oprettet!");

            //Add data about user to cookie
            document.cookie = `username=${response.name};`;
            document.cookie = `userid=${response.id};`;
            document.cookie = `sessionToken=${response.sessionToken};`;

            //adds user to redux store
            dispatch(
              userActions.loginUser({
                id: response.id,
                name: response.name,
                email: response.emailAddress,
              })
            );
            setCreatingAccount(false);
            closeModal();

            setEmail("");
            setUsername("");
            setPassword("");
          }
        } catch (error) {
          toast.error("Kunne ikke lave en bruger");
        }
      }
    }
  };

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
