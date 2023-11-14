using System.Collections.Generic;

namespace P7Internet.Requests;

public class IngredientRequest
{
    public List<string> Ingredients { get; set; }

    public IngredientRequest()
    {
    }

    public IngredientRequest(List<string> ingredients)
    {
        Ingredients = ingredients;
    }
}