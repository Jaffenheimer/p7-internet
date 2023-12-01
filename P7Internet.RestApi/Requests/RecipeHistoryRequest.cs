using System;

namespace P7Internet.Requests;

/// <summary>
/// 
/// </summary>
/// <param name="userId"></param>
/// <param name="sessionToken"></param>
public class RecipeHistoryRequest
{
    public Guid UserId { get; set; }
    public string SessionToken { get; set; }


    public RecipeHistoryRequest(Guid userId, string sessionToken)
    {
        UserId = userId;
        SessionToken = sessionToken;
    }
}