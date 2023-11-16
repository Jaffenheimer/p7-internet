﻿using System;
using System.Collections.Generic;
using Moq;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Requests;
using P7Internet.Response;

namespace P7Internet.Services;

public class OpenAiServiceMock
{
    public Mock<OpenAiService> openAiServiceMock = new Mock<OpenAiService>();
    public RecipeRequest recipeRequest = new RecipeRequest(Guid.NewGuid(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<int>(), It.IsAny<List<string>>(), It.IsAny<List<string>>(), It.IsAny<int>());
    private readonly RecipeResponse recipeResponse = new RecipeResponse("testRecipe", Guid.NewGuid());
    public OpenAiServiceMock()
    {
        openAiServiceMock.Setup(x => x.GetAiResponse(recipeRequest)).Returns(new RecipeResponse("test", Guid.NewGuid()));
    }
    
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