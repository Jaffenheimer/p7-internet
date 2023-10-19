using System;
using SharedObjects;

public class CreateUserRequest
{
    public string Name { get; set; }
    public string EmailAddress { get; set; }
    public string PasswordHash { get; set; }
    public string PasswordSalt { get; set; }

    public CreateUserRequest()
    {
        
    }
}