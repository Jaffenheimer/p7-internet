import React from "react";
import ContainerRight from "../components/ContainerRight";
import ContainerLeft from "../components/ContainerLeft";
import { ToastContainer } from "react-toastify";

const FrontPage = () => {
  return (
    <div className="App">
        <ToastContainer 
        position="top-center"/>
      <div className="AppLeft">
        <ContainerLeft />
      </div>
      <div className="AppRight">
        <ContainerRight />
      </div>
    </div>
  );
};

export default FrontPage;
