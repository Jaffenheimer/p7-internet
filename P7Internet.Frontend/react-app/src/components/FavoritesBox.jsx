import React, { useState } from "react";
import cross from "../data/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import { recipeActions } from "../features/recipeSlice";
import Pages from "../objects/Pages";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from "@reduxjs/toolkit";

const FavoritesBox = ({ closeModal }) => {
	const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const heartedRecipes = loggedInUser[0]['heartedRecipes']
	const recipes = useSelector((state) => state.recipe.recipes)
	const [selectValue, setSelectValue] = useState(heartedRecipes.length === 0 ? "" : heartedRecipes[0])
	
	const handleChangeSelect = (event) => setSelectValue(event.target.value);

  function handleSubmit(event) {
    event.preventDefault();

		var recipeTitles = []
		recipes.forEach( (recipe) => recipeTitles.push(recipe['title']))

		if(!recipeTitles.includes(selectValue)){
			toast.error(`${selectValue} er ikke i listen af opskrifter på databasen. Prøv at vælge en anden opskrift.`)
		}
		else{
			dispatch(recipeActions.setCurrentRecipeIndex(recipeTitles.indexOf(selectValue)))
			dispatch(pageActions.goToPage(Pages.fullRecipeView));
			closeModal()
		}
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <div className="imgcontainer">
        <h3>
					Favoritter
          <img
            src={cross}
            alt="Back Cross"
            id="loginCross"
            onClick={closeModal}
          />
        </h3>
      </div>
      <div className="container">
				{heartedRecipes.length === 0 ? <p>Ingen opskrifter er blevet markeret som favorit.</p> : 
				<>
					<select size="14" value={selectValue} onChange={handleChangeSelect}>
						{heartedRecipes.map((recipeTitle) => (
							<option value={recipeTitle} key={nanoid()}>{recipeTitle} </option>
						))}
					</select>
					<button onClick={handleSubmit}>Vælg</button>
				</>
				}
      </div>
    </form>
  );
};

export default FavoritesBox;
