START TRANSACTION;

CREATE TABLE IF NOT EXISTS FavouriteRecipesTable
(
    No       INT         NOT NULL AUTO_INCREMENT,
    UserId   VARCHAR(40) NOT NULL,
    RecipeId VARCHAR(40) NOT NULL,
    PRIMARY KEY (No)
);
CREATE INDEX FavouriteRecipesTable_UserId ON FavouriteRecipesTable (UserId);
CREATE INDEX FavouriteRecipesTable_RecipeId ON FavouriteRecipesTable (RecipeId);
COMMIT;
    