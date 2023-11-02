using System;

namespace P7Internet.Requests;

public class GetFavouriteRecipesRequest
{
    public Guid UserId { get; set; }
    
    public string SessionToken { get; set; }

    public GetFavouriteRecipesRequest()
    {
    }
}