using System;

namespace P7Internet.Response;

public class LogInResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string EmailAddress { get; set; }

    public LogInResponse(Guid id, string name, string emailAddress)
    {
        Id = id;
        Name = name;
        EmailAddress = emailAddress;
    }
}