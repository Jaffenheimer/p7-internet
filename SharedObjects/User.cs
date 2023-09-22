using System;

namespace SharedObjects;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string EmailAddress { get; set; }
    public string PasswordHash { get; set; }
    public string PasswordSalt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public User(Guid id, string name, string emailAddress, string passwordHash, string passwordSalt, DateTime createdAt, DateTime updatedAt)
    {
        Id = id;
        Name = name;
        EmailAddress = emailAddress;
        PasswordHash = passwordHash;
        PasswordSalt = passwordSalt;
        CreatedAt = createdAt;
        UpdatedAt = updatedAt;
    }
}