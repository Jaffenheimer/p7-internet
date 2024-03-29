using System;

namespace P7Internet.Response;

/// <summary>
/// 
/// </summary>
/// <param name="id"></param>
/// <param name="sessionToken"></param>
/// <param name="name"></param>
/// <param name="emailAddress"></param>
public class LogInResponse
{
    public Guid Id { get; set; }
    public string SessionToken { get; set; }
    public string Name { get; set; }
    public string EmailAddress { get; set; }

    public LogInResponse(Guid id, string sessionToken, string name, string emailAddress)
    {
        Id = id;
        SessionToken = sessionToken;
        Name = name;
        EmailAddress = emailAddress;
    }
}