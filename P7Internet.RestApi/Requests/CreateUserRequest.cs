using System.ComponentModel.DataAnnotations;

namespace P7Internet.Requests;

public class CreateUserRequest
{
    public string Name { get; set; }
    [EmailAddress]public string EmailAddress { get; set; }
    public string Password { get; set; }

    public CreateUserRequest()
    {
        
    }
}