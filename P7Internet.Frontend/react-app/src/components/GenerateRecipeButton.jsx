import React from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { pageActions } from '../features/pageSlice';
import Pages from '../objects/Pages'


const GenerateRecipeButton = () => {

  const dispatch = useDispatch();

  function goToPageFullRecipeView() {
    dispatch(pageActions.goToPage(Pages.fullRecipeView)); 
  }

  const GenerateRecipesHandler = async (event) => {
    event.preventDefault();

    const req = "Create 3 short and simple recipe for 4 people";

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
          'Access-Control-Allow-Origin': '*',
        }

      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }

    goToPageFullRecipeView()
  };

  return <button onClick={GenerateRecipesHandler}>Generer opskrifter</button>;
};

export default GenerateRecipeButton;
