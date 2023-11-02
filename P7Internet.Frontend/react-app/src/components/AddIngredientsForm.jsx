import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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

  const handleChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ingredient !== null && typeof ingredient !== "undefined") {
      if (ingredient === "") return;

      // receives the ingredient text (aka. name) from dict on store in format
      // {0:{id: '', text: ''}, 1:{id: '', text: ''}}¨
      var ingredientsDictionary = Object.values(ingredientsList);
      var ingredientText = [];

      ingredientsDictionary.forEach((ingredient) =>
        ingredientText.push(ingredient["text"])
      );
      if (ingredientText.includes(ingredient)) {
        toast.error(`"${ingredient}" er allerede tilføjet til listen!`);
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
        placeholder="Tilføj en ingrediens..."
      />
      <button type="submit" >Tilføj</button>
      <RemoveAllButton
        handleClick={removeAllHandler}
      />
    </form>
  );
};

export default AddIngredientsForm;
