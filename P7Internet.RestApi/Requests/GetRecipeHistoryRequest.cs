using System;

namespace P7Internet.Requests;

public class GetRecipeHistoryRequest
{
    public Guid UserId { get; set; }
    public string SessionToken { get; set; }

    public GetRecipeHistoryRequest(Guid userId, string sessionToken)
    {
        UserId = userId;
        SessionToken = sessionToken;
    }
}