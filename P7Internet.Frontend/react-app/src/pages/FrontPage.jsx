import React from "react";
import ContainerRight from "../components/ContainerRight";
import ContainerUpper from "../components/ContainerUpper";
import Header from "../components/Header";

const FrontPage = () => {
  return (
    <div style={{height: '100%'}} >
        <Header />
        <div className="App">
        <div className="AppLeft">
          <ContainerUpper />
        </div>
        <div className="AppRight">
          <ContainerRight />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
