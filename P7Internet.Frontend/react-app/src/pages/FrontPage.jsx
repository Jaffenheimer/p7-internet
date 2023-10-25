import React from "react";
import ContainerRight from "../components/ContainerRight";
import ContainerLeft from "../components/ContainerLeft";

const FrontPage = () => {
  return (
    <div className="App">
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
