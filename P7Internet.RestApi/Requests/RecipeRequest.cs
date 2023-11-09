using System.Collections.Generic;

namespace P7Internet.Requests;

/// <summary>
/// 
/// </summary>
/// <param name="ingredients"></param>
/// <param name="amount"></param>
/// <param name="excludedIngredients"></param>
/// <param name="dietaryRestrictions"></param>
public class RecipeRequest
{
    public List<string> Ingredients { get; }
    public int? Amount { get; set; }
    public List<string> ExcludedIngredients { get; set; }
    public List<string> DietaryRestrictions { get; set; }
    
    public RecipeRequest(List<string> ingredients, int? amount, List<string> excludedIngredients, List<string> dietaryRestrictions)
    {
        Ingredients = ingredients;
        Amount = amount;
        ExcludedIngredients = excludedIngredients;
        DietaryRestrictions = dietaryRestrictions;
    }
}