using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Persistence.UserRepository;
using P7Internet.Requests;
using P7Internet.Response;
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
    private readonly ETilbudsAvisService _eTilbudsAvisService;

    public PublicControllerV1(IUserRepository userRepository, OpenAiService openAiService, IRecipeCacheRepository cachedRecipeRepository)
    {
        _userRepository = userRepository;
        _openAiService = openAiService;
        _cachedRecipeRepository = cachedRecipeRepository;
        _eTilbudsAvisService = new ETilbudsAvisService();
    }
    #region Recipe Endpoints
    [HttpPost("recipes")]
    public async Task<IActionResult> GetARecipe([FromBody]RecipeRequest req)
    {
        var recipes = await _cachedRecipeRepository.GetAllRecipes();

        List<string?> recipesIncludingIngredients = new List<string?>();
        foreach (var recipe in recipes)
        {
            if (ContainsEveryString(req.Ingredients, recipe))
            {
                recipesIncludingIngredients.Add(recipe);
            }
        }

        if (req.Amount != null)
        {
            if (recipesIncludingIngredients.Count < req.Amount)
                goto NotEnoughRecipes;
        }

        if (recipesIncludingIngredients.Any(x => x != null))
            return Ok(recipesIncludingIngredients);
        
        NotEnoughRecipes:    
        var openAiRequest = req.OpenAiString;

        foreach (var ingredient in req.Ingredients)
        {
            openAiRequest += ", " + ingredient;
        }
        
        var res = _openAiService.GetAiResponse(openAiRequest);
        
        await _cachedRecipeRepository.Upsert(res.Recipes);
        return Ok(res);
    }
    [HttpGet]
    [Route("offer/GetAllOffers")]
    public async Task<IActionResult> GetOffer([FromQuery] OfferRequest req)
    {
        var res = await _eTilbudsAvisService.GetAllOffers(req);
        if (res != null) return Ok(res);
        return BadRequest();
    }
    #endregion

    #region User Endpoints
    [HttpPost]
    [Route("user/create-user")]
    public async Task<IActionResult> CreateUser([FromQuery] CreateUserRequest req)
    { 
        
        var user = _userRepository.CreateUser(req.Name, req.EmailAddress);
        var res = await _userRepository.Upsert(user, req.Password);
        if(!res)
            return BadRequest("User with the specified Username already exists, please choose another Username");
        var response = new LogInResponse(user.Id, user.Name, user.EmailAddress);
        return Ok(response);
    }
    
    [HttpPost]
    [Route("user/login")]
    public async Task<IActionResult> Login([FromQuery] LogInRequest req)
    {
        var result = await _userRepository.LogIn(req.Username, req.Password);
        if (result != null)
        {
            var response = new LogInResponse(result.Id, result.Name, result.EmailAddress);
            return Ok(response);
        }

        return BadRequest("Username or password is incorrect please try again");
    }
    #endregion

    #region Utility functions
    //Tak til chatgpt for nedenstående metode wup wup
    private static bool ContainsEveryString(List<string> stringList, string targetString)
    {
        foreach (string str in stringList)
        {
            if (!targetString.Contains(str))
            {
                return false;
            }
        }
        return true;
    }
    #endregion
}