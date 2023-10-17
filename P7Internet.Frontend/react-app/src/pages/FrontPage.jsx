import React from "react";
import ContainerLower from "../components/ContainerLower";
import ContainerRight from "../components/ContainerRight";
import ContainerUpper from "../components/ContainerUpper";

const FrontPage = () => {
  return (
    <div className="App">
      <div className="AppLeft">
        <ContainerUpper />
        <ContainerLower />
      </div>
      <div className="AppRight">
        <ContainerRight />
      </div>
    </div>
  );
};

export default FrontPage;
