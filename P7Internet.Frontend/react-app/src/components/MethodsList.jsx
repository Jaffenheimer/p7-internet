import React from "react";

const MethodsList = ({ methods }) => {
  return (
    <div className="methods">
      <h2>Metode:</h2>
      <ol>
        {methods.map((method) => (
          <li key={method}>{method}</li>
        ))}
      </ol>
    </div>
  );
};

export default MethodsList;
