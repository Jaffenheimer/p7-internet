import React from "react";
import ContainerRight from "../components/ContainerRight";
import ContainerLeft from "../components/ContainerLeft";
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
          <ContainerLeft />
        </div>
        <div className={"split-screen-right"}>
          <ContainerRight />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
