using System;

namespace P7Internet.Shared;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string EmailAddress { get; set; }
    public string PasswordHash { get; set; }
    public string PasswordSalt { get; set; }
    public DateTime CreatedAt { get; set; }

    public User(string name, string emailAddress)
    {
        Id = Guid.NewGuid();
        Name = name;
        EmailAddress = emailAddress;
        CreatedAt = DateTime.UtcNow;
    }
    
}