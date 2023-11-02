using System.Collections.Generic;

namespace P7Internet.Requests;

public class RecipeRequest
{
    public string OpenAiString { get; }
    public List<string> Ingredients { get; }
    public int? Amount { get; set; }

    public RecipeRequest(string openAiString, List<string> ingredients, int? amount)
    {
        OpenAiString = openAiString;
        Ingredients = ingredients;
        Amount = amount;
    }
}