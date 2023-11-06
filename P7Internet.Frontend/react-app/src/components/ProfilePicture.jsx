import React, { useState } from "react";
import profile from "../data/profile.svg";
import "../App.css";
import { userActions } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useUserLogOutMutation } from "../services/userApiSlice";


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

  //console.log(storedNewUsername); // Access the stored username
  //console.log(value); // Access the stored session token

  const handleLogOut = async() => {
    if(!isLogOutLoading || !isLogOutError){

      const cookies = document.cookie;
      const cookieArray = cookies.split(';').map(cookie => cookie.trim());          
      const storedSessionToken = cookieArray.find(cookie => cookie.startsWith('sessionToken='));
      const splitToken = storedSessionToken.split('=');
      const sessionToken = splitToken.slice(1).join('=');

      const storedUserId = cookieArray.find(cookie => cookie.startsWith('userid='));
      const splitIdToken = storedUserId.split('=');
      const userId = splitIdToken.slice(1).join('=');
      
      
      try {
        const response = await userLogOut({ userId: userId, sessionToken: sessionToken });
        if(response){
          toast.success("Logget ud");
          dispatch(userActions.toggleTestLogin());
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
