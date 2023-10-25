import React from "react";
import ContainerRight from "../components/ContainerRight";
import ContainerLeft from "../components/ContainerLeft";
import Header from "../components/Header";


const FrontPage = () => {
  return (
    <div className="AppContainer2">
      <div className="header2">
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
    // <div style={{height: '100%'}} >
    //     <Header />
    //     <div className="App">
    //     <div className="AppLeft">
    //       <ContainerUpper />
    //     </div>
    //     <div className="AppRight">
    //       <ContainerRight />
    //     </div>
    //   </div>
    // </div>
  );
};

export default FrontPage;
