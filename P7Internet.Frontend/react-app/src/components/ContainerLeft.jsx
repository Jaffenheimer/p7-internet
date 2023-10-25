import React from "react";
import SearchBar from "./SearchBar";
import OwnedIngredientsList from "./OwnedIngredientsList";
import GenerateRecipeButton from "./GenerateRecipeButton";

const ContainerLeft = () => {
  return (
    <div className="ContainerLeft">
      <h1 id="RecipeGenerator">Opskriftsgenerator</h1>
      <div id="IngredientsBody">
        <h2>Ingredienser jeg gerne vil bruge:</h2>
        <SearchBar />
        <OwnedIngredientsList />
      </div>

      <div id="GenerateRecipeButton">
        <GenerateRecipeButton />
      </div>
    </div>
  );
};

export default ContainerLeft;
