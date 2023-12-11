using System;
using System.Collections.Generic;
using Moq;
using P7Internet.Requests;
using P7Internet.Response;
using P7Internet.Services;

namespace P7Internet.Test.Mocks;

public class OpenAiServiceMock
{
    public Mock<OpenAiService> openAiServiceMock = new Mock<OpenAiService>();

    public RecipeRequest recipeRequest = new RecipeRequest(Guid.NewGuid(), It.IsAny<string>(), It.IsAny<List<string>>(),
        It.IsAny<int>(), It.IsAny<List<string>>(), It.IsAny<List<string>>(), It.IsAny<int>());

    private readonly RecipeResponse recipeResponse = new RecipeResponse("testRecipe", null, Guid.NewGuid());

    public OpenAiServiceMock()
    {
        openAiServiceMock.Setup(x => x.GetAiResponse(recipeRequest))
            .ReturnsAsync(new RecipeResponse("test", null, Guid.NewGuid()));
    }

    public string ComposePromptFromRecipeRequest(RecipeRequest req)
    {
        var prompt = "Jeg vil gerne have en ny forskellig opskrift fra andre og med en unik titel.";

        if (req.Ingredients != null)
        {
            prompt += $" Opskriften skal indeholde disse ingredienser {string.Join(", ", req.Ingredients)}";
        }

        if (req.ExcludedIngredients != null)
        {
            prompt += $" uden disse ingredienser {string.Join(",", req.ExcludedIngredients)}";
        }

        if (req.DietaryRestrictions != null)
        {
            prompt += $" der er {string.Join(",", req.DietaryRestrictions)}";
        }

        if (req.AmountOfPeople != null)
        {
            prompt += $" til {req.AmountOfPeople} personer. ";
        }

        prompt += "Det skal have følgende format: Titel, ingredienser og metode. ";
        prompt += "Opskriften må ikke indeholde noter, bemærkninger, Bemærk og serveringsforslag.";

        return prompt; 

    }
}