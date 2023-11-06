import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RemoveAllButton from "./RemoveAllButton";
import AddIngredientInput from "./AddIngredientInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddIngredientsForm = ({
  ingredientsList,
  addIngredient,
  removeAllHandler,
}) => {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = useState("");

  const excludeList = useSelector(
    (state) => state.recipeGeneration.excludeList
  );

  const ownedIngredientsList = useSelector(
    (state) => state.recipeGeneration.ownedIngredients
  );

  const handleChange = (event) => {
    setIngredient(event.target.value);
  };

  const ingredientIsInIngredientsObject = (ingredient, ingredientsObject) => {
    for (const ingredientObject of ingredientsObject) {
      if (ingredientObject.text === ingredient) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ingredient !== null && typeof ingredient !== "undefined") {
      if (ingredient === "") return;
      if (ingredientIsInIngredientsObject(ingredient, excludeList)) {
        toast.error(
          `"${ingredient}" er allerede tilføjet til listen af eksluderede ingredienser!`
        );
        return;
      }
      if (ingredientIsInIngredientsObject(ingredient, ownedIngredientsList)) {
        toast.error(
          `"${ingredient}" er allerede tilføjet til listen af ejede ingredienser!`
        );
        return;
      }
      if (ingredientsList.length >= 10) {
        toast.error("Du kan ikke tilføje flere end 10 ingredienser");
        return;
      }
      // only adds to ownedIngredient if non-dublicate
      dispatch(addIngredient(ingredient));
    }
    setIngredient("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <AddIngredientInput
        ingredient={ingredient}
        handleChange={handleChange}
      />
      <button type="submit">Tilføj</button>
      <RemoveAllButton handleClick={removeAllHandler} />
    </form>
  );
};

export default AddIngredientsForm;
