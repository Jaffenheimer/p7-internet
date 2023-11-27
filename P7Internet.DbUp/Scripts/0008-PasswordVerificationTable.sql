START TRANSACTION;

CREATE TABLE IF NOT EXISTS PasswordVerificationTable (
    UserId varchar(255) NOT NULL,
    VerificationCode VARCHAR(255) NOT NULL,
    ExpiresAt datetime NOT NULL,
    PRIMARY KEY (UserId, VerificationCode)
);

COMMIT;