START TRANSACTION;

CREATE TABLE IF NOT EXISTS User (
    Id VARCHAR(40) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255),
    Password_hash VARCHAR(255) NOT NULL,
    Password_salt VARCHAR(255) NOT NULL,
    Creation_date DateTime,
    Updated DateTime,
    PRIMARY KEY (id)
);

COMMIT;