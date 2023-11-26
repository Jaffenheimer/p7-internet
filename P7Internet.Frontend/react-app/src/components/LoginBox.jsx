import React, { useState } from "react";
import cross from "../data/cross.svg";
import { useDispatch } from "react-redux";
import { userActions } from "../features/userSlice";
import { toast } from "react-toastify";
import {
  checkValidVerificationCode,
  inputValidation,
  checkValidPassword,
} from "../helperFunctions/inputValidation";
import { checkValidEmail } from "../helperFunctions/inputValidation";
import { addCookies, getCookies } from "../helperFunctions/cookieHandler";
import "react-toastify/dist/ReactToastify.css";
import {
  useUserCreateMutation,
  useUserLoginMutation,
  useUserResetPasswordRequestMutation,
  useUserChangePasswordMutation,
} from "../services/usersEndpoints";

const LoginBox = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [repeatedResetPassword, setRepeatedResetPassword] = useState("");

  const [loggingIn, setLoggingIn] = useState(true);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  //States used to fetch data from backend
  const [userLogin, { isLogInLoading }] = useUserLoginMutation();
  const [userCreate, { isCreateLoading }] = useUserCreateMutation();
  const [userResetPasswordRequest, { isResetPasswordRequestLoading }] =
    useUserResetPasswordRequestMutation();
  const [userChangePassword, { isChangePassword }] =
    useUserChangePasswordMutation();

  async function handleSubmit(event) {
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
          toast.error("Brugernavnet eller kodeordet er forkert, prøv igen");
        else toast.error("Kunne ikke oprette bruger");
      }
    }
  }

  function clearandclose() {
    closeModal();
    setEmail("");
    setUsername("");
    setPassword("");
  }

  function setModalPage(page) {
    setLoggingIn(false);
    setCreatingAccount(false);
    setResettingPassword(false);
    setVerifyingAccount(false);
    if (page === "loggingIn") setLoggingIn(true);
    else if (page === "creatingAccount") setCreatingAccount(true);
    else if (page === "verifyingAccount") setVerifyingAccount(true);
    else if (page === "resettingPassword") setResettingPassword(true);
  }

  async function sendVerificationCode() {
    if (checkValidEmail(email)) {
      try {
        //send email to backend
        const encodedEmail = encodeURIComponent(email);

        let response = await userResetPasswordRequest({
          email: encodedEmail,
        });

        if (response) {
          if (response.error.originalStatus === 200) {
            toast.success("Din verifikationskode er sendt til din email");
            setEmail("");
          } else if (
            response.error.originalStatus === 400 &&
            response.error.data === "User does not exist"
          ) {
            toast.error("Emailen findes ikke i databasen");
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Kunne ikke sende emailen");
      }
    } else {
      toast.error("Indtast venligst en gyldig email");
    }
  }

  function activateVerificationCode() {
    if (checkValidVerificationCode(verificationCode)) {
      // TODO: need to check if verification code is valid on database
      setModalPage("resettingPassword");
      toast.success("Du indtastede en gyldig verifikationskode!");
      setVerificationCode("");
    } else {
      toast.error("Den indtastede kode er ugyldig. Prøv igen");
    }
  }

  async function tryResetPassword() {
    if (!(resetPassword === repeatedResetPassword))
      toast.error("De to kodeord er ikke ens. Prøv igen");
    else if (
      !checkValidPassword(resetPassword) ||
      !checkValidPassword(repeatedResetPassword)
    ) {
      toast.error(
        "Kodeordet skal være mindst 8 tegn langt og indeholde mindst et stort bogstav, et lille bogstav og et tal"
      );
    } else {
      // if valid password, requests password reset if cookies are present
      const cookies = document.cookie.split(";");

      if (cookies.length === 0)
        toast.error("Noget gik galt. Prøv at genindlæs siden og prøv igen");
      else {
        try {
          let { username, userid, sessionToken } = getCookies(cookies);
          const oldPassword = "Hammer123"; //TODO: get OldPassword from database

          const encodedUserId = encodeURIComponent(userid);
          const encodedSessionToken = encodeURIComponent(sessionToken);
          const encodedUsername = encodeURIComponent(username);
          const encodedOldPassword = encodeURIComponent(oldPassword); //TODO: get OldPassword from database
          const encodedPassword = encodeURIComponent(resetPassword);

          let response = await userChangePassword({
            userId: encodedUserId,
            sessionToken: encodedSessionToken, //maybe not include session token unless server gives new unique from reset-password-request
            username: encodedUsername,
            oldPassword: encodedOldPassword,
            newPassword: encodedPassword,
          }).unwrap();

          if (response) {
            console.log(response.error); // remember to remove
            if (response.error.originalStatus === 200) {
              setModalPage("loggingIn");
              toast.success("Dit kodeord er nu nulstillet");
              setResetPassword("");
              setRepeatedResetPassword("");
            } //needs handle on error response codes
          }
        } catch (error) {
          console.log(error);
          toast.error("Kunne ikke nulstille kodeordet");
        }
      }
    }
  }

  return (
    <div className="LoginModal">
      <div className="imgcontainer">
        <h3>
          {resettingPassword || verifyingAccount
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
            <a href="/#" onClick={() => setModalPage("loggingIn")}>
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
            <a href="/#" onClick={() => setModalPage("verifyingAccount")}>
              Glemt kodeord?
            </a>
            <br />
            <p id="noUserText">Ingen bruger:</p>
            <a href="/#" onClick={() => setModalPage("creatingAccount")}>
              Opret Bruger
            </a>
          </form>
        )}

        {!verifyingAccount ? (
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
              value={verificationCode}
              onChange={(event) => setVerificationCode(event.target.value)}
            />
            <button onClick={() => activateVerificationCode()}>Gendan</button>
          </>
        )}

        {!resettingPassword ? (
          ""
        ) : (
          <>
            <br></br>

            <label>
              <b>Indtast dit nye kodeord</b>
            </label>
            <input
              type="password"
              placeholder="Indtast kodeordet"
              value={resetPassword}
              onChange={(event) => setResetPassword(event.target.value)}
            />
            <br></br>
            <br></br>
            <br></br>
            <label>
              <b>Gentag det nye kodeord</b>
            </label>
            <input
              type="password"
              placeholder="Indtast kodeordet"
              value={repeatedResetPassword}
              onChange={(event) => setRepeatedResetPassword(event.target.value)}
            />
            <button onClick={() => tryResetPassword()}>Bekræft kodeord</button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginBox;
