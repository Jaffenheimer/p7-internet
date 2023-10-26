import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import NumberField from "./NumberField";
import DietaryRestrictions from "./DietaryRestrictions";
import ExcludeList from "./ExcludeList";
import LoginBox from "./LoginBox";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Allergens from "./Allergens";
import Modal from "react-modal";

//styling for the modal
const customStyles = {
  content: {
    height: "450px",
    overflow: "hidden",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

const ContainerRight = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [loggedIn, setLoggedIn] = useState(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  function SetLoggedInOnChange() {
    //component that dynamically changes when log in status changes
    if (loggedInUser.length === 1) setLoggedIn(true);
    else setLoggedIn(false);
  }

  return (
    <div className="ContainerRight">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <LoginBox closeModal={closeModal} />
      </Modal>
      <div>
        <Toaster />
      </div>
      <div className="ContainerRightTop">
        <div className="ContainerRightColumn">
          <h3 id="NumberPersonsText">Personer</h3>
        </div>
        <div className="ContainerRightColumn">
          <NumberField />
        </div>
        <div className="ContainerRightColumn">
          <SetLoggedInOnChange />
          {loggedIn ? (
            <ProfilePicture />
          ) : (
            <button onClick={openModal}>Log In</button>
          )}
        </div>
      </div>
      <div className="ContainerRightMiddle">
        <DietaryRestrictions />
        <Allergens />
      </div>
      <div className="ContainerRightBottom">
        <ExcludeList />
      </div>
    </div>
  );
};

export default ContainerRight;
