import React, { useEffect } from "react";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { RecipeSelectionContainerRight } from "../components";
import { offersActions } from "../features/offersSlice";
import { useDispatch } from "react-redux";


const RecipeSelection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(offersActions.resetTotalPrice()); 
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <div className="AppContainer">
      <ToastContainer
        position="top-center"
        newestOnTop={true}
        closeButton={false}
        draggablePercent
      />
      <div className="headerContainer">
        <Header />
      </div>
      <div className={"split-container"}>
        <div className={"split-screen-left"}>
          <RecipeSelectionContainerLeft />
        </div>
        <div className={"split-screen-right"}>
          <RecipeSelectionContainerRight />
        </div>
      </div>
    </div>
  );
};

export default RecipeSelection;
