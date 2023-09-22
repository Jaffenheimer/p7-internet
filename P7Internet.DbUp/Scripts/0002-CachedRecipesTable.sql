START TRANSACTION;

CREATE TABLE IF NOT EXISTS CachedRecipes 
(
    No          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Id          VARCHAR(250) NOT NULL,
    Category    VARCHAR(255) NOT NULL,
    Name        VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL
);
CREATE INDEX CachedRecipes_Name ON CachedRecipes(Name);

COMMIT;