import React from "react";
import ContainerRight from "../components/ContainerRight";
import ContainerUpper from "../components/ContainerUpper";

const FrontPage = () => {
  return (
    <div className="App">
      <div className="AppLeft">
        <ContainerUpper />
        
      </div>
      <div className="AppRight">
        <ContainerRight />
      </div>
    </div>
  );
};

export default FrontPage;
