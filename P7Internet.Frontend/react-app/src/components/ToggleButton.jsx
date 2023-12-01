import React from "react";

const ToggleButton = ({ toggle, toggleStateIsRadius }) => {
  return (
    <div className="toggleButton">
      {toggleStateIsRadius ? (
        <button className="toggleButtonLeft">Radius</button>
      ) : (
        <button
          onClick={toggle}
          className="toggleButtonLeft"
          style={{ backgroundColor: "#113946", color: "white" }}
        >
          {" "}
          Radius
        </button>
      )}
      {!toggleStateIsRadius ? (
        <button className="toggleButtonRight">Vælg Butikker</button>
      ) : (
        <button
          onClick={toggle}
          className="toggleButtonRight"
          style={{ backgroundColor: "#113946", color: "white" }}
        >
          {" "}
          Vælg Butikker
        </button>
      )}
    </div>
  );
};

export default ToggleButton;
