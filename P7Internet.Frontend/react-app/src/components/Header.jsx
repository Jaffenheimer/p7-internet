import ProfilePicture from "./ProfilePicture";
import React, { useState } from "react";
import LoginBox from "./LoginBox";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { useEffect } from "react";

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

const Header = () => {
  //const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const testLogin = useSelector((state) => state.user.testlogin);
  //const [loggedIn, setLoggedIn] = useState(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // function SetLoggedInOnChange() {
  //   //component that dynamically changes when log in status changes
  //   useEffect(() => {
  //     if (testLogin == false) setLoggedIn(true);
  //     else setLoggedIn(false);
  //   })
  
  // }

  return (
    <div className="header">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <LoginBox closeModal={closeModal} />
      </Modal>
      <div className="title">Opskriftsgenerator</div>
          {testLogin ? (
            <ProfilePicture />
          ) : (
            <button onClick={openModal}>Log In</button>
          )}
    </div>
  );
};

export default Header;
