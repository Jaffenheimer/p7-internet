START TRANSACTION;

CREATE TABLE IF NOT EXISTS CachedOfferTable
(
    No              INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Id              VARCHAR(250) NOT NULL,
    IngredientName  VARCHAR(250) NOT NULL,
    Price           DECIMAL NOT NULL,
    Store           VARCHAR(250) NOT NULL,
    CreatedAt       DATETIME NOT NULL
);
CREATE INDEX CachedOffer_Name ON CachedOfferTable(IngredientName);
CREATE INDEX CachedOffer_Store ON CachedOfferTable(Store);

COMMIT;