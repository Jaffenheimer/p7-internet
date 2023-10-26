START TRANSACTION;

CREATE TABLE IF NOT EXISTS UserTable (
    Id VARCHAR(40) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255),
    Password_hash VARCHAR(255) NOT NULL,
    Password_salt VARCHAR(255) NOT NULL,
    Creation_date DateTime,
    Updated DateTime,
    PRIMARY KEY (id)
);
CREATE INDEX UserTable_Id ON UserTable (Id);
CREATE INDEX UserTable_Name ON UserTable (Name);
CREATE INDEX UserTable_Email ON UserTable (Email);
COMMIT;