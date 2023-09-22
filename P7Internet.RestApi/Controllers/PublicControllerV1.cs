using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Persistence.UserRepository;
using P7Internet.Requests;
using P7Internet.Services;
using SharedObjects;

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
    public Task<IActionResult> GetARecipe(SampleRequest req)
    {
        //Der er noget wonky shit med .net der ikke vil assigne en variabel
        //af typen List<Ingredient> til en List<Ingredient> som jeg lige skal have fundet ud af
        //var recipes = _cachedRecipeRepository.GetRecipeByIngredients();
        var res = _openAiService.GetAiResponse(req.OpenAiString);

        return Task.FromResult<IActionResult>(Ok(res));
    }
}