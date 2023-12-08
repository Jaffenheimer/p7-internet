class Recipe {
  constructor(title, ingredients, method, id, shortIngredients) {
    this.id = id; 
    this.title = title;
    this.ingredients = ingredients;
    this.method = method;
    this.shortIngredients = shortIngredients;
  }
}

export default Recipe;
