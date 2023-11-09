START TRANSACTION;

CREATE TABLE IF NOT EXISTS UserRecipeHistoryTable
(
    No       INT         NOT NULL AUTO_INCREMENT,
    UserId   VARCHAR(40) NOT NULL,
    RecipeId VARCHAR(40) NOT NULL,
    PRIMARY KEY (No)
);

CREATE INDEX FavouriteRecipesTable_UserId ON UserRecipeHistoryTable (UserId);
CREATE INDEX FavouriteRecipesTable_RecipeId ON UserRecipeHistoryTable (RecipeId);
COMMIT;