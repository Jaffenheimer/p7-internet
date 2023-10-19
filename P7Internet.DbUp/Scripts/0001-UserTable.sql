START TRANSACTION;

CREATE TABLE IF NOT EXISTS User (
    id   INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password_hash VARCHAR(255),
    password_salt VARCHAR(255),
    creation_date DateTime,
    updated DateTime,
    PRIMARY KEY (id)
);

COMMIT;