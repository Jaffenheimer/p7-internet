import React, { useState } from "react";
import cross from "../data/cross.svg";
import { useDispatch } from "react-redux";
import { userActions } from "../features/userSlice";
import { toast } from "react-toastify";
import { inputValidation } from "../helperFunctions/inputValidation";
import { addCookies } from "../helperFunctions/cookieHandler";
import "react-toastify/dist/ReactToastify.css";
import {
  useUserCreateMutation,
  useUserLoginMutation,
} from "../services/usersEndpoints";

const LoginBox = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);

  //States used to fetch data from backend
  const [userLogin, { isLogInLoading }] = useUserLoginMutation();
  const [userCreate, { isCreateLoading }] = useUserCreateMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLogInLoading || isCreateLoading) {
      /*
      Will try to createAcount or logIn to api Endpoint
      */
      try {
        const encodedUsername = encodeURIComponent(username);
        const encodedPassword = encodeURIComponent(password);

        let response;
        if (!creatingAccount) {
          response = await userLogin({
            username: encodedUsername,
            password: encodedPassword,
          }).unwrap();
        } else if (inputValidation(username, password, email) === true) {
          const encodedEmail = encodeURIComponent(email);
          response = await userCreate({
            username: encodedUsername,
            password: encodedPassword,
            email: encodedEmail,
          }).unwrap();
        }

        if (response) {
          if (!creatingAccount) toast.success("Din bruger er nu oprettet!");
          else toast.success("Velkommen tilbage, " + response.name);

          //Add data about user to cookie
          addCookies(response.name, response.id, response.sessionToken);

          //adds user to redux store
          dispatch(
            userActions.loginUser({
              id: response.id,
              name: response.name,
              email: response.emailAddress,
            })
          );

          if (!creatingAccount) setCreatingAccount(false);

          clearandclose();
        }
      } catch (error) {
        console.log(error);
        if (!creatingAccount)
          toast.error("Brugernavn eller Kodeord er forkert, prøv igen");
        else toast.error("Kunne ikke oprette bruger");
      }
    }
  };

  function clearandclose() {
    closeModal();
    setEmail("");
    setUsername("");
    setPassword("");
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <div className="imgcontainer">
        <h3>
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
            {/* <label>
              Husk mig: <input type="checkbox" />{" "}
            </label> */}
            <br />
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
