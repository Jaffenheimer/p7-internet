using System.ComponentModel.DataAnnotations;

namespace P7Internet.Requests;

/// <summary>
/// 
/// </summary>
/// <param name="name"></param>
/// <param name="emailAddress"></param>
/// <param name="password"></param>
public class CreateUserRequest
{
    public string Name { get; set; }
    [EmailAddress] public string EmailAddress { get; set; }
    public string Password { get; set; }

    public CreateUserRequest()
    {
    }

    public CreateUserRequest(string name, string emailAddress, string password)
    {
        Name = name;
        EmailAddress = emailAddress;
        Password = password;
    }
}