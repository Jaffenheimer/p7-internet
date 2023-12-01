import React from "react";
import { useSelector } from "react-redux";
import { ingredientIsOwned } from "../helperFunctions/ingredientHelper";
import { offersReducer } from "../features/offersSlice";
import { useGetOfferMutation } from "../services/offerEndpoints";

const RecipeIngredientElement = ({ ingredient }) => {
  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  var offer = FetchOffer(ingredient);

  return (
    <div
      className="RecipeIngredientElement"
      data-testid="RecipeIngredientElement"
    >
      <li>
        {ingredient.name}
        {ingredientIsOwned(ingredient, ownedIngredientsList) ? (
          <b> Ejet </b>
        ) : (
          ""
        )}
        <img
          className="IngredientStoreLogo"
          src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
          alt="new"
        />
      </li>
    </div>
  );
};

async function FetchOffer(ingredient) {
  //coords, pageSize, searchTerm, radius, upcoming
  var response = await useGetOfferMutation({
    coords: localStorage.getItem("geolocation"),
    pagesize: 1,
    searchTerm: ingredient,
    radius: 1,
    upcoming: false,
  });
  return response;
}

export default RecipeIngredientElement;

/*
ingredientObjects.push(
      new Offer(
        res.name,
        nanoid(),
        res.price,
        res.size,
        null,
        res.store,
        res.storeImage,
        res.created,
        res.ending
      )
    );
*/

/*
async function FetchOffer(ingredient) {
  //coords, pageSize, searchTerm, radius, upcoming
  var response = await useGetOfferMutation({
    coords: localStorage.getItem("geolocation"),
    pagesize: 1,
    searchTerm: ingredient.text,
    radius: 1,
    upcoming: false,
  }).unwrap();
  return response;
}
*/
