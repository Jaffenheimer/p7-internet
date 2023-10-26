using System;

namespace P7Internet.Requests;

public class DeleteFavouriteRecipeRequest
{
    public Guid UserId { get; set; }
    public Guid RecipeId { get; set; }
}