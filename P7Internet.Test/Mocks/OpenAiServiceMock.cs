using System;
using System.Collections.Generic;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
using P7Internet.Requests;
using P7Internet.Response;

namespace P7Internet.Services;

public class OpenAiServiceMock
{
    private readonly OpenAIAPI _openAi;

    public OpenAiServiceMock()
    {

    }
    
    /// <summary>
    /// Composes a promt from a RecipeRequest
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns a string composed of all the components in the RecipeRequest</returns>
    public string ComposePromptFromRecipeRequest(RecipeRequest req)
    {
        var prompt = "";
        if (req.Amount > 1 || req.Amount != null)
        {
            prompt += $"Jeg vil gerne have {req.Amount} opskrifter";
        }
        else
        {
            prompt += "Jeg vil gerne have en opskrift";
        }

        if (req.Ingredients != null)
        {
            
            prompt += $" med disse ingredienser {string.Join(", ", req.Ingredients)}";
        }

        if (req.ExcludedIngredients != null)
        {
            prompt += $" uden disse ingredienser {string.Join(",", req.ExcludedIngredients)}";
        }

        if (req.DietaryRestrictions != null)
        {
            prompt += $" der er {string.Join(",", req.DietaryRestrictions)}";
        }
        if(req.AmountOfPeople != null)
        {
            prompt += $" til {req.AmountOfPeople} personer";
        }

        return prompt;
    }
    
}