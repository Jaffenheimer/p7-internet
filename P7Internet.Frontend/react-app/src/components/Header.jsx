import ProfilePicture from "./ProfilePicture";
import React, { useState } from "react";
import LoginBox from "./LoginBox";
import Modal from "react-modal";
import { useEffect } from "react";
import { pageActions } from "../features/pageSlice";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const modalShown = useSelector((state) => state.page.modalShown);
  const [loggedIn, setLoggedIn] = useState(false);

  const openModal = () => dispatch(pageActions.openModal());
  const closeModal = () => dispatch(pageActions.closeModal());

  function SetLoggedInOnChange() {
    //component that dynamically changes when log in status changes
    useEffect(() => {
      if (loggedInUser.length === 1) setLoggedIn(true);
      else setLoggedIn(false);
    });
  }

  return (
    <div className="header no-print">
      <Modal
        isOpen={modalShown}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <LoginBox closeModal={closeModal} />
      </Modal>
      <div className="title">Opskriftsgenerator</div>
      <SetLoggedInOnChange /> {/* Dynamically check if user is logged in */}
      {loggedIn ? (
        <ProfilePicture />
      ) : (
        <button onClick={openModal}>Log In</button>
      )}
    </div>
  );
};

export default Header;
