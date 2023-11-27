import React, { useState } from "react";
import profile from "../data/profile.svg";
import "../App.css";
import { userActions } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pageActions } from "../features/pageSlice";
import { useUserLogOutMutation } from "../services/usersEndpoints";
import { deleteCookies, retriveCookie } from "../helperFunctions/cookieHandler";

const ProfilePicture = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  function profileClick() {
    setOpen(!open);
  }

  const handleFavorites = () => {
    setOpen(false);
    dispatch(pageActions.openFavoritesModal());
  };

  const handleSettings = () => {
    setOpen(false);
  };

  const [userLogOut, { isLogOutLoading }] = useUserLogOutMutation();

  //Functions is async because it needs to wait for the response from the backend
  const handleLogOut = async () => {
    /*
        If the login is not loading or there were no error then it will try to login, 
        if there is an an error it will be displayed 
    */
    if (!isLogOutLoading) {
      const sessionToken = retriveCookie("sessionToken=");
      const userId = retriveCookie("userid=");

      try {
        //Enconding request to URI standart (handles symbols in request)
        const encodedSessionToken = encodeURIComponent(sessionToken);
        const encodedUserId = encodeURIComponent(userId);

        // Waits for the response and allows to use response (unwrap, because JSON)
        const response = await userLogOut({
          userId: encodedUserId,
          sessionToken: encodedSessionToken,
        });
        if (response) {
          toast.success("Du loggede succesfuldt ud");
          dispatch(userActions.logoutUser());
          deleteCookies();
        }
      } catch (error) {
        console.log(error);
        toast.error("Kunne ikke logge ud");
      }
    }

    setOpen(false);
  };

  return (
    <div className="ProfilePicture" data-testid="ProfilePicture">
      <div className="dropdown-btn">
      <img
        className="Profile"
        src={profile}
        alt="ProfilePicture"
        onClick={profileClick}
      />
      </div>
      {open ? (
        <div className="dropdown"> 
        <ul className="dropdown-content">
          <li className="menu-item">
            <button id="FavoritesButton" onClick={handleFavorites}>Favoritter</button>
          </li>
          <li className="menu-item">
            <button id="SettingsButton" onClick={handleSettings}>Indstillinger</button>
          </li>
          <li className="menu-item">
            <button id="LogoutButton" onClick={handleLogOut}>Log ud</button>
          </li>
        </ul>
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePicture;
