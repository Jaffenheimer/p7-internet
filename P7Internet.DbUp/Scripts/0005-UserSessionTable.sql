START TRANSACTION;

CREATE TABLE IF NOT EXISTS UserSessionTable (
    UserId varchar(255) NOT NULL,
    SessionToken VARCHAR(255) NOT NULL,
    ExpiresAt datetime NOT NULL,
    PRIMARY KEY (UserId, SessionToken)
);

COMMIT;