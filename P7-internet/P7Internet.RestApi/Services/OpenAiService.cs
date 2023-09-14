using System;
using System.Collections.Generic;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
using P7_internet.Response;

namespace P7_internet.Services
{
    public class OpenAiService
    {
        private readonly OpenAIAPI _openAi;

        public OpenAiService(string? apiKey)
        {
            _openAi = new OpenAIAPI(apiKey);
        }

        public RecipeResponse GetAiResponse(List<string> sourceText)
        {
            var request = new ChatRequest()
            {
                Messages = new List<ChatMessage>()
                {
                    new()
                    {
                        Role = ChatMessageRole.User,
                        Content =
                            $"Give 3 examples on recipes that can be made from the following ingredients '{sourceText}'",
                    }
                },
                Model = Model.ChatGPTTurbo,
                MaxTokens = 512,
                Temperature = 0.5
            };

            try
            {
                var completionResult = _openAi.Chat.CreateChatCompletionAsync(request);
                var result = completionResult.Result;
                if (result.Choices.Count == 0) return null;

                return new RecipeResponse(result.Choices[0].Message.Content);
            }
            catch (Exception e)
            {
                return RecipeResponse.Error(e.Message);
            }
        }
    }
}