using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Persistence.UserRepository;
using P7Internet.Requests;
using P7Internet.Services;

namespace P7Internet.Controllers;

[ApiController]
[Route("public/sample")]
public class PublicControllerV1 : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IRecipeCacheRepository _cachedRecipeRepository;
    private readonly OpenAiService _openAiService;

    public PublicControllerV1(IUserRepository userRepository, OpenAiService openAiService, IRecipeCacheRepository cachedRecipeRepository)
    {
        _userRepository = userRepository;
        _openAiService = openAiService;
        _cachedRecipeRepository = cachedRecipeRepository;
    }

    [HttpPost("recipes")]
    public async Task<IActionResult> GetARecipe([FromBody]SampleRequest req)
    {
        var recipes = await _cachedRecipeRepository.GetAllRecipes();

        List<string?> recipesIncludingIngredients = new List<string?>();
        foreach (var ingredient in req.Ingredients)
        {
            recipesIncludingIngredients.Add(recipes.Find((x) => x.Contains(ingredient)));
        }
        
        if (recipesIncludingIngredients.All(x => x != null))
            return Ok(recipesIncludingIngredients);
            
        var openAiRequest = req.OpenAiString;

        foreach (var ingredient in req.Ingredients)
        {
            openAiRequest +=  ingredient + ", ";
        }
        
        var res = _openAiService.GetAiResponse(openAiRequest);
        
        await _cachedRecipeRepository.Upsert(res.Recipes);
        return Ok(res);
    }
}