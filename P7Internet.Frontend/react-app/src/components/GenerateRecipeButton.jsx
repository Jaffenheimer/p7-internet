import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";


const GenerateRecipeButton = () => {
  const dispatch = useDispatch();

  function goToPageFullRecipeSelection() {
    dispatch(pageActions.goToPage(Pages.RecipeSelection));
  }

  //handles all the logic for when the button is clicked
  function handleOnClick() {
    GenerateRecipesHandler();
    goToPageFullRecipeSelection();
  }

  //insert comment about what the function does here
  const GenerateRecipesHandler = async () => {

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
