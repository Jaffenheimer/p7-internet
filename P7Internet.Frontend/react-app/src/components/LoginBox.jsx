import React, { useState } from "react";
import cross from "../data/cross.svg";
import { useDispatch } from "react-redux";
import { userActions } from "../features/userSlice";
import { toast } from "react-toastify";
import {
  checkValidVerificationCode,
  checkValidPassword,
  userInputValidation,
} from "../helperFunctions/inputValidation";
import { checkValidEmail } from "../helperFunctions/inputValidation";
import { addCookies } from "../helperFunctions/cookieHandler";
import "react-toastify/dist/ReactToastify.css";
import {
  useUserCreateMutation,
  useUserLoginMutation,
  useUserResetPasswordEmailRequestMutation,
  useUserResetPasswordMutation,
} from "../services/usersEndpoints";

const LoginBox = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [loggingIn, setLoggingIn] = useState(true);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [verifyingAccount, setVerifyingAccount] = useState(false);

  //States used to fetch data from backend
  const [userLogin, { isLogInLoading }] = useUserLoginMutation();
  const [userCreate, { isCreateLoading }] = useUserCreateMutation();
  const [
    userResetPasswordEmailRequest,
    // eslint-disable-next-line
    { isResetPasswordEmailRequestLoading },
  ] = useUserResetPasswordEmailRequestMutation();
  // eslint-disable-next-line
  const [userResetPassword, { isResetPasswordLoading }] =
    useUserResetPasswordMutation();

  async function handleSubmitForm(event) {
    event.preventDefault();

    if (!isLogInLoading || isCreateLoading) {
      /*
      Will try to createAcount or logIn to api Endpoint
      */

      try {
        let response;
        if (!creatingAccount) {
          response = await userLogin({
            username: username,
            password: password,
          }).unwrap();
        } else if (userInputValidation(username, password, email) === true) {
          response = await userCreate({
            username: username,
            password: password,
            email: email,
          }).unwrap();
        }

        if (response) {
          if (loggingIn) {
            toast.success("Velkommen tilbage, " + response.name);
          }
          if (creatingAccount) {
            toast.success("Verifikationskoden er sendt til din email");
            toast.success("Din bruger er nu oprettet!");
          }

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
        if (
          error.originalStatus === 400 &&
          error.data ===
            "User with the specified Username or Email already exists, please choose another Username or Email"
        ) {
          toast.error(
            "Brugernavnet eller emailen eksisterer allerede, vælg venligst et andet brugernavn eller email"
          );
        }
        if (loggingIn)
          toast.error("Brugernavnet eller kodeordet er forkert, prøv igen");
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
    setVerifyingAccount(false);
    if (page === "loggingIn") setLoggingIn(true);
    else if (page === "creatingAccount") setCreatingAccount(true);
    else if (page === "verifyingAccount") setVerifyingAccount(true);
  }

  async function sendVerificationCode() {
    if (checkValidEmail(email)) {
      try {
        //send email to backend
        const encodedEmail = encodeURIComponent(email);

        let response = await userResetPasswordEmailRequest({
          email: encodedEmail,
        }).unwrap();

        if (response) {
          setEmail("");
        }
      } catch (error) {
        console.log(error);
        if (error.originalStatus === 200) {
          toast.success("Din verifikationskode er sendt til din email");
        } else if (
          error.originalStatus === 400 &&
          error.data === "User does not exist"
        ) {
          toast.error("Emailen findes ikke i databasen");
        } else if (
          error.originalStatus === 400 &&
          error.data ===
            "Email is not confirmed, please confirm your email before resetting your password"
        ) {
          toast.error("Emailen er ikke bekræftet. Bekræft venligst emailen");
        }
      }
    } else {
      toast.error("Indtast venligst en gyldig email");
    }
  }

  async function resetPassword() {
    if (checkValidVerificationCode(verificationCode)) {
      if (checkValidPassword(password)) {
        try {
          await userResetPassword({
            password: password,
            verificationCode: verificationCode,
          }).unwrap();
        } catch (error) {
          console.log(error);
          if (error.originalStatus === 200) {
            toast.success("Dit kodeord er nu nulstillet");
            clearandclose();
          }
          if (
            error.originalStatus === 400 &&
            error.data ===
              "The verification code is not for resetting the password"
          ) {
            toast.error(
              "Denne verifikationskode er ikke til at nulstille kodeord"
            );
          } else if (
            error.originalStatus === 400 &&
            error.data === "No user found on the verification code"
          ) {
            toast.error("Din bruger er ikke fundet på denne verifikationskode");
          } else if (
            error.originalStatus === 400 &&
            error.data ===
              "Verification code was invalid, please check that the inserted value is correct"
          ) {
            toast.error(
              "Verfikationskoden er invalid, tjek venligst at den indtastede værdi er korrekt"
            );
          } else {
            toast.error("En fejl opstod med at sende verifikationsmailen");
          }
        }
      } else {
        toast.error("Du indtastede ikke et gyldigt kodeord");
      }
    } else {
      toast.error("Den indtastede kode er ugyldig. Prøv igen");
    }
  }

  return (
    <div className="LoginModal">
      <div className="imgcontainer">
        <h3>
          {verifyingAccount
            ? "Nulstil kodeord"
            : creatingAccount
            ? "Opret bruger"
            : "Login"}
          <img
            src={cross}
            alt="Back Cross"
            id="loginCross"
            onClick={closeModal}
          />
        </h3>
      </div>
      <div>
        {!creatingAccount ? (
          ""
        ) : (
          <form className="LoginForm" onSubmit={handleSubmitForm}>
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
          <form className="LoginForm" onSubmit={handleSubmitForm}>
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
            <a href="/#" onClick={() => setModalPage("creatingAccount")}>
              <br />
              Opret bruger
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
            <label>
              <b>Angiv dit nye kodeord</b>
            </label>
            <input
              type="password"
              placeholder="Indtast kodeordet"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <label>
              <b>Angiv verificeringskoden</b>
            </label>
            <input
              type="text"
              placeholder="Angiv koden her"
              value={verificationCode}
              onChange={(event) => setVerificationCode(event.target.value)}
            />
            <button onClick={() => resetPassword()}>Gendan</button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginBox;
