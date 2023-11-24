import React, { useState } from "react";
import cross from "../data/cross.svg";
import { useDispatch } from "react-redux";
import { userActions } from "../features/userSlice";
import { toast } from "react-toastify";
import {
  checkValidVerificationCode,
  inputValidation,
} from "../helperFunctions/inputValidation";
import { checkValidEmail } from "../helperFunctions/inputValidation";
import { addCookies } from "../helperFunctions/cookieHandler";
import "react-toastify/dist/ReactToastify.css";
import {
  useUserCreateMutation,
  useUserLoginMutation,
  useUserConfirmEmailMutation,
} from "../services/usersEndpoints";

const LoginBox = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resetCode, setResetCode] = useState("");

  const [loggingIn, setLoggingIn] = useState(true);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [verificationCode, setVerificationCode] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  //States used to fetch data from backend
  const [userLogin, { isLogInLoading }] = useUserLoginMutation();
  const [userCreate, { isCreateLoading }] = useUserCreateMutation();
  const [userConfirmEmail, { isConfirmEmailLoading }] =
    useUserConfirmEmailMutation();

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

  function setPage(page) {
    setLoggingIn(false);
    setCreatingAccount(false);
    setResettingPassword(false);
    setVerificationCode(false);
    if (page === "loggingIn") setLoggingIn(true);
    else if (page === "creatingAccount") setCreatingAccount(true);
    else if (page === "resettingPassword") setResettingPassword(true);
    else if (page === "verificationCode") setVerificationCode(true);
  }

  const sendVerificationCode = async () => {
    if (checkValidEmail(email)) {
      try {
        //send email to backend
        const encodedEmail = encodeURIComponent(email);
        const response = await userConfirmEmail({
          email: encodedEmail,
        });
        if (response) {
          toast.success("Din verifikationskode er sendt til din email");
        }
      } catch (error) {
        console.log(error);
        toast.error("Kunne ikke sende email");
      }
    } else {
      toast.error("Indtast venligst en gyldig email");
    }
  };

  function activateVerificationCode() {
    if (checkValidVerificationCode(verificationCode)) {
    }
    //send verification code to backend
    // success: setResettingPassword(false);
    // failure: toast.error("Forkert kode");
    setPage("verificationCode");
  }

  return (
    <div className="LoginModal">
      <div className="imgcontainer">
        <h3>
          {resettingPassword || verificationCode
            ? "Nulstil kodeord"
            : creatingAccount
            ? "Opret Bruger"
            : "Login"}
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
          <form className="LoginForm" onSubmit={handleSubmit}>
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
            <button type="submit"> Tilføj Bruger </button>
            <br />
            <br />
            <p id="alreadyHasUserText">Har allerede en bruger:</p>
            <a href="/#" onClick={() => setPage("loggingIn")}>
              Log in
            </a>
          </form>
        )}

        {!loggingIn ? (
          ""
        ) : (
          <form className="LoginForm" onSubmit={handleSubmit}>
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
            <button type="submit"> Login </button>
            {/* <label>
                Husk mig: <input type="checkbox" />{" "}
              </label> */}
            <br />
            <br />
            <a href="/#" onClick={() => setPage("resettingPassword")}>
              Glemt kodeord?
            </a>
            <br />
            <p id="noUserText">Ingen bruger:</p>
            <a href="/#" onClick={() => setPage("creatingAccount")}>
              Opret Bruger
            </a>
          </form>
        )}

        {!resettingPassword ? (
          ""
        ) : (
          <>
            <br></br>

            <label>
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Indtast din email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button onClick={() => sendVerificationCode()}>Send</button>
            <br></br>
            <br></br>
            <br></br>
            <label>
              <b>Angiv verificeringskoden</b>
            </label>
            <input
              type="text"
              placeholder="Angiv koden her"
              value={resetCode}
              onChange={(event) => setResetCode(event.target.value)}
            />
            <button onClick={() => activateVerificationCode()}>Gendan</button>
          </>
        )}

        {!verificationCode ? (
          ""
        ) : (
          <>
            <br></br>

            <label>
              <b>Nyt kodeord</b>
            </label>
            <input type="text" placeholder="Angiv koden her" />
            <br></br>
            <br></br>
            <br></br>
            <label>
              <b>Gentag kodeordet</b>
            </label>
            <input type="text" placeholder="Angiv koden her" />
            <button onClick={() => {}}>Bekræft kodeord</button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginBox;
