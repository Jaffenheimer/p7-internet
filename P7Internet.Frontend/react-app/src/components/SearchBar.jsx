import React, {useState, useRef} from "react";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [ingredient, setIngredient] = useState("");

  const handleChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      
      inputRef.current.value = '';

      console.log("ingredient: ", ingredient);

      if(ingredient !== null){
        console.log("ingredient: ", ingredient)
        dispatch(recipeGenerationActions.addOwnedIngredients(ingredient));
      }
      
  }; 

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="ingredient"
        ref={inputRef}
        value={ingredient}
        onChange={handleChange}
        placeholder="Tilføj en ingrediens..."
        />
      <button type="submit" >Tilføj</button>
    </form>
  );
};

export default SearchBar;
