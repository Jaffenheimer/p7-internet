import React, { useState } from "react";
import profile from "../data/profile.svg";
import { userActions } from "../features/userSlice";
import { useDispatch} from "react-redux";

const ProfilePicture = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  function profileClick() {
    setOpen(!open);
  }

  const handleFavourites = () => {
    setOpen(false);
  };

  const handleSettings = () => {
    setOpen(false);
  };

	const handleLogOut = () => {
		dispatch(userActions.logoutUser()) //the user is now logged out
    setOpen(false);
  };

  return (
    <div className="ProfilePicture">
      <img src={profile} alt="ProfilePicture" onClick={profileClick} />
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button onClick={handleFavourites}>Favoritter</button>
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
