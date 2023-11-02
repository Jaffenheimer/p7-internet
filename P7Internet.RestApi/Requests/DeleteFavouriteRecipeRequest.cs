using System;

namespace P7Internet.Requests;

public class DeleteFavouriteRecipeRequest
{
    public Guid UserId { get; set; }
    public string SessionToken { get; set; }
    public Guid RecipeId { get; set; }
}