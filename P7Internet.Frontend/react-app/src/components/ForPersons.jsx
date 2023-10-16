import React from "react";
import { useSelector } from "react-redux";

const ForPersons = () => {
  const numPeople = useSelector((state) => state.recipeGeneration.numPeople);

  return (
    <div className="ForPersons">
      <h4>For {numPeople} personer</h4>
    </div>
  );
};

export default ForPersons;