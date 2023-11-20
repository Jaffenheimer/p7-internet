using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
using P7Internet.Requests;
using P7Internet.Response;

namespace P7Internet.Services;

public class OpenAiService
{
    private readonly OpenAIAPI _openAi;

    public OpenAiService(string? apiKey)
    {
        _openAi = new OpenAIAPI(apiKey);
    }

    /// <summary>
    /// Makes a request to the OpenAI API to generate a recipe response, this is done from a list of ingredients,
    /// excluded ingredients, dietary restrictions and amount
    /// </summary>
    /// <param name="req"></param>
    /// <returns>A list of RecipeResponses corresponding to the amount of requested recipes</returns>
    public async Task<RecipeResponse> GetAiResponse(RecipeRequest req)
    {
        var request = new ChatRequest()
        {
            Messages = new List<ChatMessage>()
            {
                new()
                {
                    Role = ChatMessageRole.User,
                    Content =
                        $"'{ComposePromptFromRecipeRequest(req)}'",
                }
            },
            Model = Model.ChatGPTTurbo,
            MaxTokens = 512,
            Temperature = 0.5
        };
        var recipeId = Guid.NewGuid();
        try
        {
            var completionResult = _openAi.Chat.CreateChatCompletionAsync(request);
            var result = completionResult.Result;
            if (result.Choices.Count == 0) return null;
            return new RecipeResponse(result.Choices[0].Message.Content, null, recipeId);
        }
        catch (Exception e)
        {
            return RecipeResponse.Error(e.Message, recipeId);
        }
    }

    /// <summary>
    /// Composes a promt from a RecipeRequest
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns a string composed of all the components in the RecipeRequest</returns>
    private string ComposePromptFromRecipeRequest(RecipeRequest req)
    {
        var prompt = "";

        prompt += "Jeg vil gerne have en opskrift";

        if (req.Ingredients != null)
        {
            prompt += $" med disse ingredienser {string.Join(", ", req.Ingredients)}";
        }

        if (req.ExcludedIngredients != null && req.ExcludedIngredients.Count > 0)
        {
            prompt += $" uden disse ingredienser {string.Join(",", req.ExcludedIngredients)}";
        }

        if (req.DietaryRestrictions != null && req.DietaryRestrictions.Count > 0)
        {
            prompt += $" der er {string.Join(",", req.DietaryRestrictions)}";
        }

        if (req.AmountOfPeople != null && req.AmountOfPeople > 0)
        {
            prompt += $" til {req.AmountOfPeople} personer. Det skal have følgende formar: Titel, ingredienser og metode.";
        }

        return prompt;
    }
}