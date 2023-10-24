using System;
using System.Security;
using SharedObjects;

public class CreateUserRequest
{
    public string Name { get; set; }
    public string EmailAddress { get; set; }
    public string Password { get; set; }

    public CreateUserRequest()
    {
        
    }
}