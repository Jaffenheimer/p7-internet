import React from "react";
import axios from "axios";

const GenerateRecipeButton = () => {
  const GenerateRecipesHandler = async (event) => {
    event.preventDefault();

    const req = "Create 5 short and simple recipe for 4 people";

    try {
      const response = await axios.post(
        "http://localhost:5000/public/sample/testrecipes",
        req,
        {
          params: {
            req,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <button onClick={GenerateRecipesHandler}>Generate</button>;
};

export default GenerateRecipeButton;
