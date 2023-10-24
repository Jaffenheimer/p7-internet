using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using P7Internet.Persistence.CachedIngredientPricesRepository;
using P7Internet.Persistence.FavouriteRecipeRepository;
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
    private readonly IFavouriteRecipeRepository _favouriteRecipeRepository;
    private readonly ICachedOfferRepository _cachedOfferRepository;
    private readonly OpenAiService _openAiService;
    private readonly ETilbudsAvisService _eTilbudsAvisService;

    public PublicControllerV1(IUserRepository userRepository, OpenAiService openAiService, IRecipeCacheRepository cachedRecipeRepository, IFavouriteRecipeRepository favouriteRecipeRepository, ICachedOfferRepository cachedOfferRepository)
    {
        _userRepository = userRepository;
        _openAiService = openAiService;
        _cachedRecipeRepository = cachedRecipeRepository;
        _favouriteRecipeRepository = favouriteRecipeRepository;
        _cachedOfferRepository = cachedOfferRepository;
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
    [HttpGet("offer/getOffer")]
    public async Task<IActionResult> GetOffer([FromQuery] OfferRequest req)
    {
        var checkIfOfferExists = await _cachedOfferRepository.GetOffer(req.SearchTerm);
        if (checkIfOfferExists != null)
        {
            return Ok(checkIfOfferExists);
        }
        var res = await _eTilbudsAvisService.GetAllOffers(req);
        
        if (res != null)
        {
            foreach (var offer in res)
            {
                await _cachedOfferRepository.UpsertOffer(offer.Name,offer.Price,offer.Store);
            }
            return Ok(res);
        }
        return BadRequest("No offer found");
    }
    
    [HttpGet("offer/getOfferByStoreFromCache")]
    public async Task<IActionResult> GetOfferByStoreIfAvailableFromCache([FromQuery] string ingredient, string store)
    {
        var checkIfOfferExists = await _cachedOfferRepository.GetOfferByStore(ingredient, store);
        if (checkIfOfferExists != null)
        {
            return Ok(checkIfOfferExists);
        }
        return BadRequest("Offer did not exist in cache");
    }
    #endregion

    #region User Endpoints
    [HttpPost("user/create-user")]
    public async Task<IActionResult> CreateUser([FromQuery] CreateUserRequest req)
    { 
        
        var user = _userRepository.CreateUser(req.Name, req.EmailAddress);
        var res = await _userRepository.Upsert(user, req.Password);
        if(!res)
            return BadRequest("User with the specified Username already exists, please choose another Username");
        var response = new LogInResponse(user.Id, user.Name, user.EmailAddress);
        return Ok(response);
    }
    
    [HttpPost("user/login")]
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
    [HttpPost("user/add-favourite-recipe")]
    public async Task<IActionResult> AddFavouriteRecipe([FromQuery] AddFavouriteRecipeRequest req)
    {
        var result = await _favouriteRecipeRepository.Upsert(req.UserId, req.RecipeId);
        if (result)
        {
            return Ok("Recipe added to favourites");
        }

        return BadRequest("This should never happen");
    }
    [HttpGet("user/get-favourite-recipes")]
    public async Task<IActionResult> GetFavouriteRecipes([FromQuery] GetFavouriteRecipesRequest req)
    {
        var result = await _favouriteRecipeRepository.Get(req.UserId);
        if (result != null)
        {
            return Ok(result);
        }

        return BadRequest("No favourite recipes found");
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