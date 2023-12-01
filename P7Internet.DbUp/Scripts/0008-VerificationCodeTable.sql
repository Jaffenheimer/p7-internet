START TRANSACTION;

CREATE TABLE IF NOT EXISTS VerificationCodeTable (
    UserId varchar(255) NOT NULL,
    VerificationCode VARCHAR(255) NOT NULL,
    ExpiresAt datetime NOT NULL,
    CodeType VARCHAR(255) NOT NULL DEFAULT '',
    PRIMARY KEY (UserId, VerificationCode)
);

COMMIT;