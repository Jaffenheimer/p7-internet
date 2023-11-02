using System;

namespace P7Internet.Requests;

public class LogOutRequest
{
    public Guid UserId { get; set; }
    public string SessionToken { get; set; }
}