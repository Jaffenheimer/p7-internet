import ProfilePicture from "./ProfilePicture";
import React from "react";
import LoginBox from "./LoginBox";
import Modal from "react-modal";
import { pageActions } from "../features/pageSlice";
import { useDispatch, useSelector } from "react-redux";
import FavoritesModalContainer from "./FavoritesModalContainer";
import HistoryModalContainer from "./HistoryModalContainer";
import { modalStyling } from "../objects/Modal";
import ModalContent from "./ModalContent";
import SettingsModalContainer from "./SettingsModalContainer";
import icon from "../data/recipe_oracle_icon.png";
import Pages from "../objects/Pages";

const Header = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const loginModalShown = useSelector((state) => state.page.loginModalShown);
  const favoritesModalShown = useSelector(
    (state) => state.page.favoritesModalShown
  );
  const historyModalShown = useSelector(
    (state) => state.page.historyModalShown
  );
  const settingModalShown = useSelector(
    (state) => state.page.settingModalShown
  );

  const openLoginModal = () => dispatch(pageActions.openLoginModal());
  const closeLoginModal = () => dispatch(pageActions.closeLoginModal());
  const closeFavoritesModal = () => dispatch(pageActions.closeFavoritesModal());
  const closeHistoryModal = () => dispatch(pageActions.closeHistoryModal());
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
          Container={SettingsModalContainer}
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
      <Modal
        isOpen={historyModalShown}
        style={modalStyling}
        onRequestClose={closeHistoryModal}
        contentLabel="History Modal"
        ariaHideApp={false}
      >
        <ModalContent
          title="Historik"
          closeModal={closeHistoryModal}
          Container={HistoryModalContainer}
        ></ModalContent>
      </Modal>
      <div
        className="title"
        onClick={() => dispatch(pageActions.goToPage(Pages.frontPage))}
      >
        OpskriftsOraklet
        <img src={icon} alt="logo" className="titleLogo" />
      </div>

      {loggedIn ? (
        <ProfilePicture />
      ) : (
        <button onClick={openLoginModal}>Log Ind</button>
      )}
    </div>
  );
};

export default Header;
