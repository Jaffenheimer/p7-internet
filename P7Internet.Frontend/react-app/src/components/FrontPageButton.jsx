import React from "react";
import { useDispatch } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import "react-toastify/dist/ReactToastify.css";

const FrontPageButton = () => {
  const dispatch = useDispatch();

  function goToPageFrontPage() {
    dispatch(pageActions.goToPage(Pages.frontPage));
  }
  return (
    <button onClick={goToPageFrontPage}>
      Tilbage til forsiden
    </button>
  );
};

export default FrontPageButton;
