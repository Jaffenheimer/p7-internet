import React from "react";
import cross from "../data/cross.svg";

const CloseModalCross = ({ closeModal }) => {
  return (
    <img
      data-testid="CloseModalCross"
      src={cross}
      alt="Back Cross"
      id="loginCross"
      onClick={closeModal}
    />
  );
};

export default CloseModalCross;
