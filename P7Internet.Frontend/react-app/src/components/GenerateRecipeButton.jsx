import React from "react";
import axios from "axios";


const GenerateRecipeButton = () => {

  function handleOnClick() {
    GenerateRecipesHandler();
  }

  //insert comment about what the function does here
  const GenerateRecipesHandler = async (event) => {

    const req = "Create 3 short and simple recipes for 4 people";

    try {
      const response = await axios.post(
        "/public/sample/testrecipes",
        req,
        {
          params: {
            req,
          },
        },
        {
          "Access-Control-Allow-Origin": "*",
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <button onClick={handleOnClick}>Generer opskrifter</button>;
};

export default GenerateRecipeButton;
