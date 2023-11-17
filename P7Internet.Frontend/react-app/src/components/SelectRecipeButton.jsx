import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdditionalOwnedIngredientsPopup from "./AdditionalOwnedIngredientsPopup";
import Modal from "react-modal";
import { modalStyling } from "../objects/Modal";
import ModalContent from "./ModalContent";

const SelectRecipeButton = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.offers.stores);
  const toggleStateIsRadius = useSelector(
    (state) => state.offers.toggleStateIsRadius
  );
  const additionalOwnedIngredientsPopupIsOpen = useSelector(
    (state) => state.page.additionalOwnedIngredientsPopupIsOpen
  );

  function handleModalClose() {
    dispatch(pageActions.closeAdditionalOwnedIngredientsPopup());
    document.body.style.overflow = "visible"; //the default value
  }

  //handles all the logic for when the button is clicked
  function handleOnClick() {
    if (!toggleStateIsRadius && stores.length === 0) {
      toast.error("Tilføj mindst 1 butik for at vælge opskriften");
      return;
    }
    document.body.style.overflow = "hidden";
    dispatch(pageActions.openAdditionalOwnedIngredientsPopup(true));
  }

  return (
    <>
      <button id="selectRecipeButton" onClick={handleOnClick}>
        Vælg opskrift
      </button>
      <Modal
        isOpen={additionalOwnedIngredientsPopupIsOpen}
        style={modalStyling}
        onRequestClose={handleModalClose}
        contentLabel="Additional Owned Ingredients Modal"
        ariaHideApp={false}
      >
        <ModalContent
          title="Andre ingredienser du har?"
          closeModal={handleModalClose}
          Container={AdditionalOwnedIngredientsPopup}
        ></ModalContent>
      </Modal>
    </>
  );
};

export default SelectRecipeButton;
