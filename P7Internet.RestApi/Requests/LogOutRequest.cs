using System;

namespace P7Internet.Requests;
/// <summary>
/// 
/// </summary>
/// <param name="userId"></param>
/// <param name="sessionToken"></param>
public class LogOutRequest
{
    public Guid UserId { get; set; }
    public string SessionToken { get; set; }

    public LogOutRequest()
    {
        
    }
    public LogOutRequest(Guid userId, string sessionToken)
    {
        UserId = userId;
        SessionToken = sessionToken;
    }
}