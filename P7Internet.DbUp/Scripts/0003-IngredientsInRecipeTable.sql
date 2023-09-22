START TRANSACTION;

CREATE TABLE IF NOT EXISTS IngredientsInRecipe
(
    Id                 INT PRIMARY KEY AUTO_INCREMENT,
    RecipeId           VARCHAR(40) NOT NULL,
    IngredientName     VARCHAR(255) NOT NULL
    
);

COMMIT;