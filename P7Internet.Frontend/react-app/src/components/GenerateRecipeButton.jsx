import React from "react";
import axios from "axios";

const GenerateRecipeButton = () => {
  const GenerateRecipesHandler = async (event) => {
    event.preventDefault();

    const req = "Create 3 short and simple recipe for 4 people";

    try {
      const response = await axios.post("/public/sample/testrecipes", req, {
        params: {
          req,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <button onClick={GenerateRecipesHandler}>Generer opskrifter</button>;
};

export default GenerateRecipeButton;
