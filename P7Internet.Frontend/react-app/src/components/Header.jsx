import ProfilePicture from "./ProfilePicture";
import React from "react";
import LoginBox from "./LoginBox";
import Modal from "react-modal";
import { pageActions } from "../features/pageSlice";
import { useDispatch, useSelector } from "react-redux";
import FavoritesBox from "./FavoritesBox";
import { modalStyling } from "../objects/Modal";
import ModalContent from "./ModalContent";

const Header = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const loginModalShown = useSelector((state) => state.page.loginModalShown);
  const favoritesModalShown = useSelector(
    (state) => state.page.favoritesModalShown
  );

  const openLoginModal = () => dispatch(pageActions.openLoginModal());
  const closeLoginModal = () => dispatch(pageActions.closeLoginModal());
  const openFavoritesModal = () => dispatch(pageActions.openFavoritesModal());
  const closeFavoritesModal = () => dispatch(pageActions.closeFavoritesModal());

  return (
    <div className="header no-print">
      <Modal
        isOpen={loginModalShown}
        style={modalStyling}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        ariaHideApp={false}
      >
        <ModalContent title></ModalContent>
        <LoginBox closeModal={closeLoginModal} />
      </Modal>
      <Modal
        isOpen={favoritesModalShown}
        style={modalStyling}
        onRequestClose={closeFavoritesModal}
        contentLabel="Favorites Modal"
        ariaHideApp={false}
      >
        <ModalContent
          title="Favoritter"
          closeModal={closeFavoritesModal}
          Container={FavoritesBox}
        ></ModalContent>
        {/* <FavoritesBox closeModal={closeFavoritesModal} /> */}
      </Modal>

      <div className="title">Opskriftsgenerator</div>
      {/* <SetLoggedInOnChange /> Dynamically check if user is logged in */}
      {loggedIn ? (
        <ProfilePicture openFavoritesModal={openFavoritesModal} />
      ) : (
        <button onClick={openLoginModal}>Log Ind</button>
      )}
    </div>
  );
};

export default Header;
