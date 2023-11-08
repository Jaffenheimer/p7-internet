using System;
using System.Collections.Generic;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
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
    /// Makes a request to the OpenAI API to generate a recipe response, this is done from a list of ingredients and an amount of recipes wanted
    /// </summary>
    /// <param name="sourceText"></param>
    /// <returns>A list of RecipeResponses corresponding to the amount of requested recipes</returns>
    //TODO: Make a request to the OpenAI API to generate a recipe response, this is done from a list of ingredients and an amount of recipes wanted dietary restrictions etc LAV I MORGEN
    public RecipeResponse GetAiResponse(string sourceText)
    {
        var request = new ChatRequest()
        {
            Messages = new List<ChatMessage>()
            {
                new()
                {
                    Role = ChatMessageRole.User,
                    Content =
                        $"'{sourceText}'",
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
            return new RecipeResponse(result.Choices[0].Message.Content, recipeId);
        }
        catch (Exception e)
        {
            return RecipeResponse.Error(e.Message, recipeId);
        }
    }
}