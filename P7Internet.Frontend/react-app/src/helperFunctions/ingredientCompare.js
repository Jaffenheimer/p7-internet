
export function ingredientCompare(shortIngredients, longIngredients) {
  let ingredients = [];

  for (let i = 0; i < longIngredients.length; i++) {
    for (let j = 0; j < shortIngredients.length; j++) {
      if (
        longIngredients[i].includes(
          " " + shortIngredients[j].toLowerCase() + " "
        ) ||
        longIngredients[i].includes(
          " " + shortIngredients[j].toLowerCase() + ""
        )
      ) {
        ingredients.push(shortIngredients[j]);
        break; //Breaks out of the inner loop
      }else if (j === shortIngredients.length - 1){
        ingredients.push(longIngredients[i]);
        break;
      }
    }
  }

  return ingredients;
}


