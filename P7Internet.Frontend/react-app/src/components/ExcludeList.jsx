import React, { useState, useRef } from "react";
import cross from "../data/cross.svg";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch, useSelector } from "react-redux";

const ExcludeList = () => {
  const [ingredient, setIngredient] = useState("");
  const dispatch = useDispatch(); 

  const excludeList = useSelector(
    (state) => state.recipeGeneration.excludeList
  );

  function addIngredientToList(event, inputField, list) {
    // Prevents the page from reloading
    event.preventDefault();

    // Creates a new list item
    var listItem = document.createElement("li");
    // Adds the input value to the list item
    listItem.innerHTML = inputField.value;
    // Adds the list item to the list
    list.appendChild(listItem);
    inputField.value = "";
  }

  const handleRemove = (event, ingredient) => {
    event.preventDefault();
    dispatch(recipeGenerationActions.removeExcludedIngredient(ingredient.id));
  };

  function submitAdd(event) {
    if (
      document.getElementById("ExcludedIngredientsList").childElementCount <= 1 
    ) {
        event.preventDefault(); 
        document.getElementById("InputFieldExclude").value = "";
        dispatch(recipeGenerationActions.addExcludedIngredient(ingredient));

      // addIngredientToList(
      //   event,
      //   document.getElementById("InputFieldExclude"),
      //   document.getElementById("ExcludedIngredientsList")
      // );
    } else {
      event.preventDefault();
      alert("Du kan ikke tilføje flere ingredienser");
    }
  }

  function submitRemoveAll() {
    dispatch(recipeGenerationActions.clearAllExcludedIngredient());
    console.log(excludeList); 
    //Mangler at blive fikset
    var list = document.getElementById("ExcludedIngredientsList");
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }
  return (
    <div id="ExcludeList">
      <p id="ExcludeListText">Ekskluder ingredienser</p>
      <form id="ExcludeForm" onSubmit={submitAdd}>
        <input
          id="InputFieldExclude"
          type="text"
          placeholder="Ekskluder ingrediens"
          value={ingredient}
          onChange={(event) => setIngredient(event.target.value)}
        />
        <div id="ExcludedIngredientsList">
          <ul>
            {excludeList.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.text}
              <img
                src={cross}
                alt="cross"
                onClick={(event) => handleRemove(event, ingredient)}
              />
              </li>
            ))}
          </ul>
        </div>
      </form>
      <button id="RemoveButton" onClick={submitRemoveAll}>
        Fjern alle
      </button>
    </div>
  );
};

export default ExcludeList;
