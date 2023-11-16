import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdditionalOwnedIngredientsPopup from "./AdditionalOwnedIngredientsPopup";
import Modal from "react-modal";
import { modalStyling } from "../objects/Modal";
import ModalContent from "./ModalContent";

const SelectRecipeButton = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.offers.stores);
  const [
    AdditionalOwnedIngredientsPopupIsOpen,
    setAdditionalOwnedIngredientsPopupIsOpen,
  ] = useState(false);
  const toggleStateIsRadius = useSelector(
    (state) => state.offers.toggleStateIsRadius
  );

  function goToPageFullRecipeView() {
    dispatch(pageActions.goToPage(Pages.fullRecipeView));
  }

  function handleModalClose() {
    setAdditionalOwnedIngredientsPopupIsOpen(false);
    goToPageFullRecipeView();
    document.body.style.overflow = "visible"; //the default value
  }

  //handles all the logic for when the button is clicked
  function handleOnClick() {
    if (!toggleStateIsRadius && stores.length === 0) {
      toast.error("Tilføj mindst 1 butik for at vælge opskriften");
      return;
    }
    document.body.style.overflow = "hidden";
    setAdditionalOwnedIngredientsPopupIsOpen(true);
    //goToPageFullRecipeView();
  }

  return (
    <>
      <button id="selectRecipeButton" onClick={handleOnClick}>
        Vælg opskrift
      </button>
      <Modal
        isOpen={AdditionalOwnedIngredientsPopupIsOpen}
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
