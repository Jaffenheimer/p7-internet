import Recipe from "./Recipe";

const recipe1 = new Recipe(
  "Spaghetti Aglio e Olio",
  [
    "400g spaghetti",
    "4 cloves garlic, minced",
    "1/4 cup olive oil",
    "1/2 teaspoon red pepper flakes",
    "Salt and pepper to taste",
    "Grated Parmesan cheese (optional)",
  ],
  [
    "Cook spaghetti according to package instructions until al dente. Drain and set aside.",
    "In a large pan, heat olive oil over medium heat. Add minced garlic and red pepper flakes. Sauté until garlic turns golden brown.",
    "Add cooked spaghetti to the pan and toss well to coat with garlic-infused oil.",
    "Season with salt and pepper to taste. Serve hot, optionally topped with grated Parmesan cheese.",
  ],
  "1879d133-7a02-4b49-91eb-4d76c2ac35ed"
);

const recipe2 = new Recipe(
  "Chicken Stir-Fry",
  [
    "500g boneless chicken breast, sliced",
    "2 bell peppers, sliced",
    "1 onion, sliced",
    "2 tablespoons soy sauce",
    "1 tablespoon oyster sauce",
    "1 tablespoon vegetable oil",
    "Salt and pepper to taste",
  ],
  [
    "Heat vegetable oil in a large skillet or wok over high heat.",
    "Add sliced chicken and cook until browned and cooked through.",
    "Add sliced bell peppers and onion to the skillet. Stir-fry for a few minutes until vegetables are slightly tender.",
    "In a small bowl, mix soy sauce and oyster sauce together. Pour the sauce over the chicken and vegetables. Stir well to combine.",
    "Season with salt and pepper to taste. Serve hot with steamed rice or noodles.",
  ],
  "23a6cc05-34f4-423a-a8f6-1b23946e08ba"
);

const recipe3 = new Recipe(
  "Caprese Salad",
  [
    "4 ripe tomatoes, sliced",
    "200g fresh mozzarella cheese, sliced",
    "Fresh basil leaves",
    "2 tablespoons balsamic glaze",
    "Salt and pepper to taste",
  ],
  [
    "Arrange tomato and mozzarella slices on a serving platter.",
    "Place a fresh basil leaf on top of each tomato and mozzarella slice.",
    "Drizzle balsamic glaze over the salad.",
    "Season with salt and pepper to taste. Serve immediately as a refreshing appetizer or side dish.",
  ],
  "41cc9736-2b6e-4398-9dba-bed608e3a386"
);

export const defaultRecipes = [recipe1, recipe2, recipe3];
