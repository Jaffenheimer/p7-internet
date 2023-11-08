import React, { useState } from "react";
import profile from "../data/profile.svg";
import "../App.css";
import { userActions } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useUserLogOutMutation } from "../services/usersEndpoints";
import retriveCookie from "../helperFunctions/retriveCookie";


const ProfilePicture = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  function profileClick() {
    setOpen(!open);
  }

  const handleFavorites = () => {
    setOpen(false);
  };

  const handleSettings = () => {
    setOpen(false);
  };

  const [userLogOut, {isLogOutLoading, isLogOutError}] =  useUserLogOutMutation();

  //Functions is async because it needs to wait for the response from the backend
  const handleLogOut = async() => {
    if(!isLogOutLoading || !isLogOutError){   
      const sessionToken = retriveCookie('sessionToken='); 
      const userId = retriveCookie('userid=');

      //console.log(`Retrived tokens: UserId: ${userId}, sessionToken: ${sessionToken}`);
      
      try {
        //Enconding request to URI standart (handles symbols in request)
        const encodedSessionToken = encodeURIComponent(sessionToken);
        const encodedUserId = encodeURIComponent(userId);

        // Waits for the response and allows to use response (unwrap, because JSON)
        const response = await userLogOut({ userId: encodedUserId, sessionToken: encodedSessionToken });
        if(response){
          //console.log(response);
          toast.success("Logget ud");
          dispatch(userActions.logoutUser());
        }
        
      } catch (error) {
        toast.error("Kunne ikke loge ud", error);
      }
  }

  setOpen(false);

    
  };

  return (
    <div className="ProfilePicture">
      <img
        className="Profile"
        src={profile}
        alt="ProfilePicture"
        onClick={profileClick}
      />
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button onClick={handleFavorites}>Favoritter</button>
          </li>
          <li className="menu-item">
            <button onClick={handleSettings}>Indstillinger</button>
          </li>
          <li className="menu-item">
            <button onClick={handleLogOut}>Log ud</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default ProfilePicture;
