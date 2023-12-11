import React from "react";
import CloseModalCross from "./CloseModalCross";

const ModalContent = ({ Container, title, closeModal }) => {
  return (
    <>
      <div className="ModalHeaderContainer">
        <h3>
          {title}
          <CloseModalCross closeModal={closeModal} />
        </h3>
      </div>
      <Container closeModal={closeModal} />
    </>
  );
};

export default ModalContent;
