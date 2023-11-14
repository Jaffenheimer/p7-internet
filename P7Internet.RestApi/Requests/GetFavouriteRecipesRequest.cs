using System;

namespace P7Internet.Requests;

/// <summary>
/// 
/// </summary>
/// <param name="userId"></param>
/// <param name="sessionToken"></param>
public class GetFavouriteRecipesRequest
{
    public Guid UserId { get; set; }

    public string SessionToken { get; set; }

    public GetFavouriteRecipesRequest()
    {
    }

    public GetFavouriteRecipesRequest(Guid userId, string sessionToken)
    {
        UserId = userId;
        SessionToken = sessionToken;
    }
}