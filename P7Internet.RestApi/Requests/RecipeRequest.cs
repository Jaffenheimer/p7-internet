using System;
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
    public Guid? UserId { get; set; }
    public string? SessionToken { get; set; }
    public List<string> Ingredients { get; }
    public int? Amount { get; set; }

    public bool IsDietaryRestrictionsSet { get; set; }
    public int? AmountOfPeople { get; set; }
    public List<string> ExcludedIngredients { get; set; }
    public List<string> DietaryRestrictions { get; set; }

    public RecipeRequest(Guid? userId, string? sessionToken, List<string> ingredients, int? amount,
        List<string> excludedIngredients, List<string> dietaryRestrictions, int? amountOfPeople, bool isDietaryRestrictionsSet = false)
    {
        UserId = userId;
        SessionToken = sessionToken;
        Ingredients = ingredients;
        Amount = amount;
        IsDietaryRestrictionsSet = isDietaryRestrictionsSet; 
        ExcludedIngredients = excludedIngredients;
        DietaryRestrictions = dietaryRestrictions;
        AmountOfPeople = amountOfPeople;
    }
}