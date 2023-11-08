using System.ComponentModel.DataAnnotations;

namespace P7Internet.Requests;
/// <summary>
/// 
/// </summary>
/// <param name="userName"></param>
/// <param name="emailAddress"></param>
public class ConfirmEmailRequest
{
    public string UserName { get; set; }
    [EmailAddress] public string EmailAddress { get; set; }

    public ConfirmEmailRequest()
    {
    }

    public ConfirmEmailRequest(string userName, string emailAddress)
    {
        UserName = userName;
        EmailAddress = emailAddress;
    }
}