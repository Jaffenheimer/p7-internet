import ProfilePicture from "./ProfilePicture";
import React, { useState } from "react";
import LoginBox from "./LoginBox";
import Modal from "react-modal";
import { useEffect } from "react";
import { pageActions } from "../features/pageSlice";
import { useDispatch, useSelector } from "react-redux";
import FavoritesBox from "./FavoritesBox";

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
  const loginModalShown = useSelector((state) => state.page.loginModalShown);
  const favoritesModalShown = useSelector((state) => state.page.favoritesModalShown);

  const [loggedIn, setLoggedIn] = useState(false);

  const openLoginModal = () => dispatch(pageActions.openLoginModal());
  const closeLoginModal = () => dispatch(pageActions.closeLoginModal());
	const openFavoritesModal = () => dispatch(pageActions.openFavoritesModal());
  const closeFavoritesModal = () => dispatch(pageActions.closeFavoritesModal());

  function SetLoggedInOnChange() {
    //component that dynamically changes when log in status changes
    useEffect(() => {
      if (loggedInUser.length === 1) setLoggedIn(true);
      else setLoggedIn(false);
    })
  }

  return (
    <div className="header">
      <Modal
        isOpen={loginModalShown}
        style={customStyles}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        ariaHideApp={false}
      >
        <LoginBox closeModal={closeLoginModal} />
      </Modal>
			<Modal
        isOpen={favoritesModalShown}
        style={customStyles}
        onRequestClose={closeFavoritesModal}
        contentLabel="Favorites Modal"
        ariaHideApp={false}
      >
        <FavoritesBox closeModal={closeFavoritesModal} />
      </Modal>

      <div className="title">Opskriftsgenerator</div>
      <SetLoggedInOnChange/> {/* Dynamically check if user is logged in */}
          {loggedIn ? (
            <ProfilePicture openFavoritesModal={openFavoritesModal}/>
          ) : (
            <button onClick={openLoginModal}>Log In</button>
          )}
    </div>
  );
};

export default Header;
