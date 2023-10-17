import React, { useState } from "react";
import profile from "../data/profile.svg";

const ProfilePicture = () => {
  const [open, setOpen] = useState(false);

  function profileClick() {
    setOpen(!open);
  }

  const handleMenuOne = () => {
    setOpen(false);
  };

  const handleMenuTwo = () => {
    setOpen(false);
  };

  return (
    <div className="ProfilePicture">
      <img src={profile} alt="ProfilePicture" onClick={profileClick} />
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button onClick={handleMenuOne}>Favoritter</button>
          </li>
          <li className="menu-item">
            <button onClick={handleMenuTwo}>Indstillinger</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default ProfilePicture;
