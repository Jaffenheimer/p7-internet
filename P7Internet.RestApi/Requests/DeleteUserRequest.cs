using System;

namespace P7Internet.Requests;

public class DeleteUserRequest
{
    public Guid UserId { get; set; }
    public string SessionToken { get; set; }

    public DeleteUserRequest(Guid userId, string sessionToken)
    {
        UserId = userId;
        SessionToken = sessionToken;
    }
}