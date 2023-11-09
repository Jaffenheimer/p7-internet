using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using P7Internet.Persistence.CachedIngredientPricesRepository;
using P7Internet.Persistence.FavouriteRecipeRepository;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Persistence.UserRepository;
using P7Internet.Persistence.UserSessionRepository;
using P7Internet.Requests;
using P7Internet.Response;
using P7Internet.Services;

namespace P7Internet.Controllers;

[ApiController]
[Route("public")]
public class PublicControllerV1 : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IRecipeCacheRepository _cachedRecipeRepository;
    private readonly IFavouriteRecipeRepository _favouriteRecipeRepository;
    private readonly ICachedOfferRepository _cachedOfferRepository;
    private readonly OpenAiService _openAiService;
    private readonly ETilbudsAvisService _eTilbudsAvisService;
    private readonly EmailService _emailService;
    private readonly IUserSessionRepository _userSessionRepository;

    public PublicControllerV1(IUserRepository userRepository, OpenAiService openAiService,
        IRecipeCacheRepository cachedRecipeRepository, IFavouriteRecipeRepository favouriteRecipeRepository,
        ICachedOfferRepository cachedOfferRepository, EmailService emailService,
        IUserSessionRepository userSessionRepository)
    {
        _userRepository = userRepository;
        _openAiService = openAiService;
        _cachedRecipeRepository = cachedRecipeRepository;
        _favouriteRecipeRepository = favouriteRecipeRepository;
        _cachedOfferRepository = cachedOfferRepository;
        _emailService = emailService;
        _userSessionRepository = userSessionRepository;
        _eTilbudsAvisService = new ETilbudsAvisService();
    }

    #region Recipe Endpoints

    [HttpPost("recipes")]
    public async Task<IActionResult> GetARecipe([FromBody] RecipeRequest req)
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

        await _cachedRecipeRepository.Upsert(res.Recipes, res.RecipeId);

        return Ok(res);
    }

    /// <summary>
    /// Endpoint to get offers from etilbudsavis API if not found in cache
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns a list of offers if found from the API otherwise badrequest</returns>
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
                await _cachedOfferRepository.UpsertOffer(offer.Name, offer.Price, offer.Store);
            }

            return Ok(res);
        }

        return BadRequest("No offer found");
    }

    /// <summary>
    /// Gets an offer from a store if available in cache
    /// </summary>
    /// <param name="ingredient"></param>
    /// <param name="store"></param>
    /// <returns>Returns the offer if found, otherwise badrequest</returns>
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

    /// <summary>
    /// Endpoint to create a user
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns a login response if the user creation was successful, otherwise badrequest</returns>
    [HttpPost("user/create-user")]
    public async Task<IActionResult> CreateUser([FromQuery] CreateUserRequest req)
    {
        var user = _userRepository.CreateUser(req.Name, req.EmailAddress);
        var res = await _userRepository.Upsert(user, req.Password);
        if (!res)
            return BadRequest("User with the specified Username already exists, please choose another Username");
        // ONLY COMMENT THIS IN WHEN WE NEED TO SHOW THIS FEATURE
        //await _emailService.ConfirmEmail(user.EmailAddress, user.Name);
        var token = await _userSessionRepository.GenerateSessionToken(user.Id);
        var response = new LogInResponse(user.Id, token, user.Name, user.EmailAddress);

        return Ok(response);
    }

    /// <summary>
    /// Logs in the user
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns a login response if successful otherwise bad request</returns>
    [HttpPost("user/login")]
    public async Task<IActionResult> Login([FromQuery] LogInRequest req)
    {
        var result = await _userRepository.LogIn(req.Username, req.Password);
        if (result != null)
        {
            var token = await _userSessionRepository.GenerateSessionToken(result.Id);
            var response = new LogInResponse(result.Id, token, result.Name, result.EmailAddress);
            return Ok(response);
        }

        return BadRequest("Username or password is incorrect please try again");
    }

    /// <summary>
    /// Logs out the user. First it checks whether the sessiontoken is valid, if so it deletes the sessiontoken from the database
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns Unauthorized if the sessiontoken is not valid, returns Ok if the session token is valid,
    /// and bad request if none of these are met, should never happen tho</returns>
    [HttpPost("user/logout")]
    public async Task<IActionResult> Logout([FromQuery] LogOutRequest req)
    {
        var checkIfUserSessionIsValid = await _userSessionRepository.CheckIfTokenIsValid(req.UserId, req.SessionToken);
        if (!checkIfUserSessionIsValid)
            return Unauthorized("User session is not valid, please login again");

        var result = await _userSessionRepository.DeleteSessionToken(req.UserId, req.SessionToken);
        if (result)
        {
            return Ok("User logged out");
        }

        return BadRequest("This should never happen");
    }

    /// <summary>
    /// Adds a recipe to the users favourite recipes
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns unauthorized if the user is not logged in or the sessiontoken has expired, otherwise it returns Ok if it is valid,
    /// and bad request if none of these are met, should never happen tho</returns>
    [HttpPost("user/favourite-recipe")]
    public async Task<IActionResult> AddFavouriteRecipe([FromQuery] AddFavouriteRecipeRequest req)
    {
        var checkIfUserSessionIsValid = await _userSessionRepository.CheckIfTokenIsValid(req.UserId, req.SessionToken);
        if (!checkIfUserSessionIsValid)
            return Unauthorized("User session is not valid, please login again");

        var result = await _favouriteRecipeRepository.Upsert(req.UserId, req.RecipeId);
        if (result)
        {
            return Ok("Recipe added to favourites");
        }

        return BadRequest("This should never happen");
    }

    /// <summary>
    /// Gets all the users favourite recipes if the sessiontoken is valid
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns unauthorized if the sessiontoken is invalid, otherwise Ok. If the sessiontoken is valid and no favorite recipes are found
    /// it returns Badrequest</returns>
    [HttpGet("user/favourite-recipes")]
    public async Task<IActionResult> GetFavouriteRecipes([FromQuery] GetFavouriteRecipesRequest req)
    {
        var checkIfUserSessionIsValid = await _userSessionRepository.CheckIfTokenIsValid(req.UserId, req.SessionToken);
        if (!checkIfUserSessionIsValid)
            return Unauthorized("User session is not valid, please login again");

        var result = await _favouriteRecipeRepository.Get(req.UserId);
        if (result != null)
        {
            return Ok(result);
        }

        return BadRequest("No favourite recipes found");
    }

    /// <summary>
    /// Deletes a recipe from the users favourite recipes if the sessiontoken is valid
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Unauthorized if the session token is invalid, returns ok if it is successful and Badrequest if something unexpected happens
    /// E.g it should never happen</returns>
    [HttpDelete("user/favourite-recipe")]
    public async Task<IActionResult> DeleteFavouriteRecipe([FromQuery] DeleteFavouriteRecipeRequest req)
    {
        var checkIfUserSessionIsValid = await _userSessionRepository.CheckIfTokenIsValid(req.UserId, req.SessionToken);
        if (!checkIfUserSessionIsValid)
            return Unauthorized("User session is not valid, please login again");

        var result = await _favouriteRecipeRepository.Delete(req.UserId, req.RecipeId);
        if (result)
        {
            return Ok("Recipe deleted from favourites");
        }

        return BadRequest("This should never happen");
    }

    /// <summary>
    /// Endpoint to reset the password of a user if requested.
    /// This is done by sending an email to the users specified email 
    /// </summary>
    /// <param name="email"></param>
    /// <param name="userName"></param>
    /// <returns>Returns Ok if a user is found and the email has been sent, if the user is not found it returns BadRequest</returns>
    [HttpPost("user/reset-password-request")]
    public async Task<IActionResult> ResetPassword([EmailAddress] string email, string userName)
    {
        var user = await _userRepository.GetUser(userName);
        if (user != null)
        {
            await _emailService.ResetPassword(email, userName);
            return Ok("Email sent");
        }

        return BadRequest("User does not exist");
    }

    /// <summary>
    /// Endpoint to change the password of a user if requested.
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Unauthorized if the session token is invalid, returns ok if it is successful
    /// and Badrequest if the username or password is incorrect</returns>
    [HttpPost("user/change-password")]
    public async Task<IActionResult> ChangePassword([FromQuery] ChangePasswordRequest req)
    {
        var checkIfUserSessionIsValid = await _userSessionRepository.CheckIfTokenIsValid(req.UserId, req.SessionToken);
        if (!checkIfUserSessionIsValid)
            return Unauthorized("User session is not valid, please login again");

        var result = await _userRepository.ChangePassword(req.UserName, req.OldPassword, req.NewPassword);
        if (result)
        {
            return Ok("Password changed");
        }

        return BadRequest("Username or password is incorrect please try again");
    }

    //NOTE: IKKE BRUG DET HER ENDPOINT TIL TESTING DER ER KUN 100 GRATIS EMAILS OM DAGEN
    /// <summary>
    /// Endpoint to confirm the email of a user if requested.
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns Ok if the link has been followed and and the DB returns that the confirmation was good,
    /// otherwise badrequest which should never happen</returns>
    [HttpPost("user/confirm-email")]
    public async Task<IActionResult> ConfirmEmail([FromQuery] ConfirmEmailRequest req)
    {
        var result = await _userRepository.ConfirmEmail(req.UserName, req.EmailAddress);
        if (result)
        {
            return Ok("Email confirmed");
        }

        return BadRequest("This should never happen");
    }

    #endregion

    #region Utility functions

    /// <summary>
    /// Used to check if the recipe contains all the ingredients
    /// </summary>
    /// <param name="stringList"></param>
    /// <param name="targetString"></param>
    /// <returns>Returns true if so otherwise false</returns>
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