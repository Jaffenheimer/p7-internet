import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useUserChangePasswordMutation,
  useUserConfirmEmailMutation,
  useUserDeleteUserMutation,
} from "../services/usersEndpoints";
import {
  getCookieSessionToken,
  getCookieUserId,
  getCookieUserName,
} from "../helperFunctions/cookieHandler";
import { checkValidTwoPasswords } from "../helperFunctions/inputValidation";
import { getCookies } from "../helperFunctions/cookieHandler";
import { pageActions } from "../features/pageSlice";
import { userActions } from "../features/userSlice";

const SettingsModalContainer = () => {
  const dispatch = useDispatch();
  const [userChangePassword] = useUserChangePasswordMutation();
  const [userConfirmEmail] = useUserConfirmEmailMutation();
  const [userDeleteUser] = useUserDeleteUserMutation();

  const [modalPage, setModalPage] = useState("settingPage");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  async function handleSubmitForm(event) {
    event.preventDefault();
    const username = getCookieUserName();
    const userId = getCookieUserId();
    const sessionToken = getCookies().sessionToken;

    let isValid = checkValidTwoPasswords(password, repeatedPassword);
    if (password === oldPassword) {
      toast.error(
        "Det nye kodeord kan ikke være det samme som det gamle kodeord"
      );
    } else if (isValid) {
      // send a request to API for changing the user's password
      try {
        let response = await userChangePassword({
          userId: userId,
          sessionToken: sessionToken,
          userName: username,
          oldPassword: oldPassword,
          newPassword: repeatedPassword,
        });
        if (response.error.originalStatus === 200) {
          toast.success("Dit kodeord er nu ændret");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function verifyEmail() {
    try {
      let userId = getCookieUserId();
      // send a request to API for confirming the user's email
      await userConfirmEmail({
        UserId: userId,
        VerificationCode: verificationCode,
      }).unwrap();
    } catch (error) {
      console.log(error);
      if (error.originalStatus === 200) {
        toast.success("Din email er nu bekræftet");
        dispatch(pageActions.closeSettingModal());
        setVerificationCode("");
      } else if (
        error.originalStatus === 400 &&
        error.data === "The email is already confirmed"
      ) {
        toast.warning("Emailen er allerede bekræftet");
      } else {
        toast.error("En fejl opstod med at sende verifikationsmailen");
      }
    }
  }

  async function deleteUser() {
    try {
      if (window.confirm("Er du sikker på du vil slette din bruger?")) {
        let response = await userDeleteUser({
          userId: getCookieUserId(),
          sessionToken: getCookieSessionToken(),
        });

        // close the modal and log the user out
        dispatch(pageActions.closeSettingModal());
        dispatch(userActions.logoutUser());
        if (response.error.originalStatus === 200) {
          toast.success("Din bruger er nu slettet");
        } else if (response.error.originalStatus === 404) {
          toast.error("Brugeren blev ikke fundet");
        } else if (response.error.originalStatus === 401) {
          toast.error("Sessionen er udløbet, log ind igen");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="SettingModal">
      {modalPage === "settingPage" ? (
        <>
          <div>
            <br />
            <label>
              <b>Verificer din email</b>
            </label>
          </div>
          <input
            type="text"
            placeholder="Indtast din verifikationskode"
            value={verificationCode}
            onChange={(event) => setVerificationCode(event.target.value)}
          />
          <button className="VerifyEmailButton" onClick={verifyEmail}>
            {" "}
            Verificer{" "}
          </button>
          <br />

          <a href="/#" onClick={() => setModalPage("ChangePasswordPage")}>
            <br />
            Skift kodeord
          </a>
          <a href="/#" onClick={() => deleteUser()}>
            <br />
            <br />
            Slet bruger
          </a>
        </>
      ) : (
        ""
      )}

      {modalPage === "ChangePasswordPage" ? (
        <form onSubmit={handleSubmitForm}>
          <label>
            <b>Indtast dit gamle kodeord</b>
          </label>
          <input
            type="password"
            placeholder="Indtast kodeordet"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            required
          />

          <label>
            <b>Indtast dit nye kodeord</b>
          </label>
          <input
            type="password"
            placeholder="Indtast kodeordet"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <label>
            <b>Gentag kodeordet</b>
          </label>
          <input
            type="password"
            placeholder="Indtast kodeordet"
            value={repeatedPassword}
            onChange={(event) => setRepeatedPassword(event.target.value)}
            required
          />
          <button className="ChangePasswordButton">Skift kodeord</button>

          <p id="alreadyHasUserText">Gå tilbage til indstillinger: </p>
          <a href="/#" onClick={() => setModalPage("settingPage")}>
            Her
          </a>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default SettingsModalContainer;
