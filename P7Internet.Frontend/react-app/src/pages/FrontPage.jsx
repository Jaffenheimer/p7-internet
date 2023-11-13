import React from "react";
import ContainerRight from "../components/ContainerRight";
import FrontPageContainerLeft from "../components/FrontPageContainerLeft";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";

const FrontPage = () => {
  return (
    <div className="AppContainer">
      <ToastContainer 
        position="top-center"
        newestOnTop={true}
        closeButton={false}
        draggablePercent/>
      <div className="headerContainer">
        <Header />
      </div>
      <div className={"split-container"}>
        <div className={"split-screen-left"}>
          <FrontPageContainerLeft />
        </div>
        <div className={"split-screen-right"}>
          <ContainerRight />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
