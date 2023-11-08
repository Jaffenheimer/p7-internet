import ProfilePicture from "./ProfilePicture";
import React from "react";
import LoginBox from "./LoginBox";
import Modal from "react-modal";
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
  //const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const loggedInd = useSelector((state) => state.user.loggedInd);

  //const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const modalShown = useSelector((state) => state.page.modalShown);

  const openModal = () => dispatch(pageActions.openModal());
  const closeModal = () => dispatch(pageActions.closeModal());


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
          {loggedInd ? (
            <ProfilePicture />
          ) : (
            <button onClick={openModal}>Log In</button>
          )}
    </div>
  );
};

export default Header;
