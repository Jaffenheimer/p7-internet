import React from "react";
import FrontPageContainerRight from "../components/FrontPageContainerRight";
import FrontPageContainerLeft from "../components/FrontPageContainerLeft";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { getGeoLocation } from "../helperFunctions/getGeoLocation";

const FrontPage = () => {
  getGeoLocation();

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
          <FrontPageContainerLeft />
        </div>
        <div className={"split-screen-right"}>
          <FrontPageContainerRight />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
