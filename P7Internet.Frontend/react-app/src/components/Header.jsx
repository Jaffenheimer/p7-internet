import ProfilePicture from "./ProfilePicture";
import React from "react";
import LoginBox from "./LoginBox";
import Modal from "react-modal";
import { pageActions } from "../features/pageSlice";
import { useDispatch, useSelector } from "react-redux";
import FavoritesModalContainer from "./FavoritesModalContainer";
import { modalStyling } from "../objects/Modal";
import ModalContent from "./ModalContent";
import SettingBox from "./SettingBox";

const Header = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const loginModalShown = useSelector((state) => state.page.loginModalShown);
  const favoritesModalShown = useSelector(
    (state) => state.page.favoritesModalShown
  );
  const settingModalShown = useSelector(
    (state) => state.page.settingModalShown
  );

  const openLoginModal = () => dispatch(pageActions.openLoginModal());
  const closeLoginModal = () => dispatch(pageActions.closeLoginModal());
  const openFavoritesModal = () => dispatch(pageActions.openFavoritesModal());
  const closeFavoritesModal = () => dispatch(pageActions.closeFavoritesModal());
  const openSettingModal = () => dispatch(pageActions.openSettingModal());
  const closeSettingModal = () => dispatch(pageActions.closeSettingModal());

  return (
    <div className="header no-print">
      <Modal
        isOpen={loginModalShown}
        style={modalStyling}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        ariaHideApp={false}
      >
        <LoginBox closeModal={closeLoginModal} />
      </Modal>

      <Modal
        isOpen={settingModalShown}
        style={modalStyling}
        onRequestClose={closeSettingModal}
        contentLabel="Setting Modal"
        ariaHideApp={false}
      >
        <ModalContent
          title="Indstillinger"
          closeModal={closeSettingModal}
          Container={SettingBox}
        />
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
          Container={FavoritesModalContainer}
        ></ModalContent>
      </Modal>

      <div className="title">Opskriftsgenerator</div>
      {loggedIn ? (
        <ProfilePicture
          openFavoritesModal={openFavoritesModal}
          openSettingModal={openSettingModal}
        />
      ) : (
        <button onClick={openLoginModal}>Log Ind</button>
      )}
    </div>
  );
};

export default Header;
