using System;

namespace P7Internet.Requests;
/// <summary>
/// 
/// </summary>
/// <param name="userId"></param>
/// <param name="sessionToken"></param>
/// <param name="recipeId"></param>
public class DeleteFavouriteRecipeRequest
{
    public Guid UserId { get; set; }
    public string SessionToken { get; set; }
    public Guid RecipeId { get; set; }

    public DeleteFavouriteRecipeRequest()
    {
        
    }
    public DeleteFavouriteRecipeRequest(Guid userId, string sessionToken, Guid recipeId)
    {
        UserId = userId;
        SessionToken = sessionToken;
        RecipeId = recipeId;
    }
}