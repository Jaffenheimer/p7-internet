import React, { useState } from "react";
import profile from "../data/profile.svg";
import "../App.css";
import { userActions } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  const handleLogOut = () => {
    toast.success("Logget ud");
    dispatch(userActions.toggleTestLogin());
    //dispatch(userActions.logoutUser()); //the user is now logged out
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
