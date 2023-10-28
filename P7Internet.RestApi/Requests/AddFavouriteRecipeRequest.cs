using System;

namespace P7Internet.Requests;

public class AddFavouriteRecipeRequest
{
    public Guid UserId { get; set; }
    public Guid RecipeId { get; set; }

    public AddFavouriteRecipeRequest()
    {
    }
}