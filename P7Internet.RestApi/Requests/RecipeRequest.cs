using System.Collections.Generic;

namespace P7Internet.Requests;

/// <summary>
/// 
/// </summary>
/// <param name="openAiString"></param>
/// <param name="ingredients"></param>
/// <param name="amount"></param>
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