import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useUserConfirmEmailRequestMutation,
  useUserChangePasswordMutation,
  useUserConfirmEmailMutation,
} from "../services/usersEndpoints";
import { getCookieUserId } from "../helperFunctions/cookieHandler";
import { checkValidTwoPasswords } from "../helperFunctions/inputValidation";
import { getCookies } from "../helperFunctions/cookieHandler";

const SettingBox = ({ closeModal }) => {
  // eslint-disable-next-line
  const [userConfirmEmailRequest, { isConfirmEmailRequestLoading }] =
    useUserConfirmEmailRequestMutation();
    // eslint-disable-next-line
  const [userChangePassword, { isChangePasswordLoading }] =
    useUserChangePasswordMutation();
    // eslint-disable-next-line
  const [userConfirmEmail, { isConfirmEmailLoading }] =
    useUserConfirmEmailMutation();

  const [modalPage, setModalPage] = useState("settingPage");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  async function handleSubmitForm(event) {
    event.preventDefault();
    let cookies = getCookies();
    let username = cookies.username;
    let userId = cookies.userid;
    let sessionToken = cookies.sessionToken;

    let isValid = checkValidTwoPasswords(password, repeatedPassword);
    if (password === oldPassword) {
      toast.error(
        "Det nye kodeord kan ikke være det samme som det gamle kodeord"
      );
    } else if (isValid) {
      // send a request to API for changing the user's password
      try {
        console.log(sessionToken);
        let response = await userChangePassword({
          userId: userId,
          sessionToken: sessionToken,
          userName: username,
          oldPassword: oldPassword,
          newPassword: repeatedPassword,
        });
        if (response.error.originalStatus === 200) {
          toast.success("Verifikationskoden er sendt til din email");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function sendVerificationCode() {
    try {
      let userId = getCookieUserId();

      const encodedUserId = encodeURIComponent(userId);
      console.log(encodedUserId);
      // send a request to API for confirming the user's email
      await userConfirmEmailRequest({
        UserId: encodedUserId,
      }).unwrap();
    } catch (error) {
      if (error.originalStatus === 200) {
        toast.success("Verifikationskoden er sendt til din email");
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

  async function verifyEmail() {
    try {
      let userId = getCookieUserId();
      // send a request to API for confirming the user's email
      await userConfirmEmail({
        UserId: encodeURIComponent(userId),
        VerificationCode: encodeURIComponent(verificationCode),
      }).unwrap();
    } catch (error) {
      console.log(error);
      if (error.originalStatus === 200) {
        toast.success("Din email er nu bekræftet");
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

  return (
    <div className="SettingModal">
      {modalPage === "settingPage" ? (
        <>
          <div>
            <br />
            <label>
              <b>Verificer din email</b>
            </label>
            <button
              className="SendVerificationEmailButton"
              onClick={sendVerificationCode}
            >
              Send kode
            </button>
          </div>
          <input
            type="text"
            placeholder="Indtast din kode"
            value={verificationCode}
            onChange={(event) => setVerificationCode(event.target.value)}
          />
          <button className="VerifyEmailButton" onClick={verifyEmail}>
            {" "}
            Verificer{" "}
          </button>
          <br />

          <p id="alreadyHasUserText">Skift kodeord:</p>
          <a href="/#" onClick={() => setModalPage("ChangePasswordPage")}>
            Her
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

export default SettingBox;
