using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using P7Internet.Persistence.CachedIngredientPricesRepository;
using P7Internet.Persistence.FavouriteRecipeRepository;
using P7Internet.Persistence.IngredientRepository;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Persistence.UserRepository;
using P7Internet.Persistence.UserSessionRepository;
using P7Internet.Requests;
using P7Internet.Response;
using P7Internet.Services;
using P7Internet.Shared;

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
    private readonly SallingService _sallingService;
    private readonly IUserSessionRepository _userSessionRepository;
    private readonly IIngredientRepository _ingredientRepository;

    public PublicControllerV1(IUserRepository userRepository, OpenAiService openAiService,
        IRecipeCacheRepository cachedRecipeRepository, IFavouriteRecipeRepository favouriteRecipeRepository,
        ICachedOfferRepository cachedOfferRepository, EmailService emailService,
        IUserSessionRepository userSessionRepository, IIngredientRepository ingredientRepository,
        SallingService sallingService, ETilbudsAvisService eTilbudsAvisService)
    {
        _userRepository = userRepository;
        _openAiService = openAiService;
        _cachedRecipeRepository = cachedRecipeRepository;
        _favouriteRecipeRepository = favouriteRecipeRepository;
        _cachedOfferRepository = cachedOfferRepository;
        _emailService = emailService;
        _userSessionRepository = userSessionRepository;
        _ingredientRepository = ingredientRepository;
        _sallingService = sallingService;
        _eTilbudsAvisService = eTilbudsAvisService;
    }

    #region Recipe Endpoints

    /// <summary>
    /// Gets a recipe either from the cache or from the OpenAI API
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns the result from either the cache or the API</returns>
    [HttpPost("recipes")]
    public async Task<IActionResult> GetARecipe([FromBody] RecipeRequest req)
    {
        var recipes = await _cachedRecipeRepository.GetAllRecipes();

        List<Recipe> recipesIncludingIngredients = new List<Recipe>();
        foreach (var recipe in recipes)
        {
            if (req.DietaryRestrictions.Count == 0 && req.ExcludedIngredients.Count == 0)
            {
                if (ContainsEveryString(req.Ingredients, recipe.Description))
                {
                    recipesIncludingIngredients.Add(recipe);
                }
            }
            else
            {
                if (ContainsEveryString(req.Ingredients, recipe.Description) &&
                    !ContainsEveryString(req.ExcludedIngredients, recipe.Description) &&
                    !ContainsEveryString(req.DietaryRestrictions, recipe.Description))
                {
                    recipesIncludingIngredients.Add(recipe);
                }
            }
        }

        if (req.Amount != null)
        {
            if (recipesIncludingIngredients.Count < req.Amount)
                goto NotEnoughRecipes;
        }

        if (recipesIncludingIngredients.Any(x => x != null))
        {
            var returnList = new List<RecipeResponse>();
            var counter = 0;
            foreach (var recipe in recipesIncludingIngredients)
            {
                var validIng = await _ingredientRepository.GetAllIngredients();
                var ingredientsToFrontend = CheckListForValidIngredients(recipe.Description, validIng);
                returnList.Add(new RecipeResponse(recipe.Description, ingredientsToFrontend, recipe.Id));
                counter++;
                if(counter == req.Amount)
                    break;
            }

            return Ok(returnList);
        }

        NotEnoughRecipes:

        var recipeList = new List<RecipeResponse>();
        if (req.Amount > 1)
        {
            var validIngredientsIfAmountIsMoreThanOne = await _ingredientRepository.GetAllIngredients();
            for (int i = 0; i < req.Amount; i++)
            {
                var recipe = await GetRecipeAsync(req, validIngredientsIfAmountIsMoreThanOne);
                if (recipe.Success == false)
                    return BadRequest(recipe.ErrorMessage);
                recipeList.Add(recipe);
            }

            return Ok(recipeList);
        }

        var res = await _openAiService.GetAiResponse(req);
        if (res.Success == false)
        {
            return BadRequest(res.ErrorMessage);
        }

        var validIngredients = await _ingredientRepository.GetAllIngredients();
        var ingredientsToPassToFrontend = CheckListForValidIngredients(res.Recipe, validIngredients);
        res.Ingredients = ingredientsToPassToFrontend;


        await _cachedRecipeRepository.Upsert(res.Recipe, res.RecipeId);

        return Ok(res);
    }

    /// <summary>
    /// Gets a recipe either from the cache or from the OpenAI API
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns the result from either the cache or the API</returns>
    [HttpPost("user/recipe")]
    public async Task<IActionResult> GetARecipeWhenLoggedIn([FromBody] RecipeRequest req)
    {
        var checkIfUserSessionIsValid =
            await _userSessionRepository.CheckIfTokenIsValid(req.UserId.GetValueOrDefault(), req.SessionToken);
        if (!checkIfUserSessionIsValid)
            return Unauthorized("User session is not valid, please login again");

        var recipes = await _cachedRecipeRepository.GetAllRecipes();

        List<Recipe?> recipesIncludingIngredients = new List<Recipe?>();
        foreach (var recipe in recipes)
        {
            if (req.DietaryRestrictions.Count == 0 && req.ExcludedIngredients.Count == 0)
            {
                if (ContainsEveryString(req.Ingredients, recipe.Description))
                {
                    recipesIncludingIngredients.Add(recipe);
                }
            }
            else
            {
                if (ContainsEveryString(req.Ingredients, recipe.Description) &&
                    !ContainsEveryString(req.ExcludedIngredients, recipe.Description) &&
                    !ContainsEveryString(req.DietaryRestrictions, recipe.Description))
                {
                    recipesIncludingIngredients.Add(recipe);
                }
            }
        }

        if (req.Amount != null)
        {
            if (recipesIncludingIngredients.Count < req.Amount)
                goto NotEnoughRecipes;
        }

        if (recipesIncludingIngredients.Any(x => x != null))
        {
            var returnList = new List<RecipeResponse>();
            var counter = 0;
            foreach (var recipe in recipesIncludingIngredients)
            {
                var validIng = await _ingredientRepository.GetAllIngredients();
                var ingredientsToFrontend = CheckListForValidIngredients(recipe.Description, validIng);
                await _favouriteRecipeRepository.UpsertRecipesToHistory(req.UserId.GetValueOrDefault(), recipe.Id);
                returnList.Add(new RecipeResponse(recipe.Description, ingredientsToFrontend, recipe.Id));
                counter++;
                if  (counter == req.Amount)
                    break;
            }

            return Ok(returnList);
        }

        NotEnoughRecipes:
        var recipeList = new List<RecipeResponse>();
        if (req.Amount > 1)
        {
            var validIngredientsIfAmountIsMoreThanOne = await _ingredientRepository.GetAllIngredients();
            for (int i = 0; i < req.Amount; i++)
            {
                var recipe = await GetRecipeAsync(req, validIngredientsIfAmountIsMoreThanOne);
                if (recipe.Success == false)
                    return BadRequest(recipe.ErrorMessage);
                recipeList.Add(recipe);
                await _favouriteRecipeRepository.UpsertRecipesToHistory(req.UserId.GetValueOrDefault(),
                    recipe.RecipeId);
                if (req.UserId != null && req.SessionToken != null)
                {
                    await _favouriteRecipeRepository.UpsertRecipesToHistory(req.UserId.GetValueOrDefault(),
                        recipeList[i].RecipeId);                   
                }
            }

            return Ok(recipeList);
        }

        var res = await _openAiService.GetAiResponse(req);
        if (res.Success == false)
        {
            return BadRequest(res.ErrorMessage);
        }

        var validIngredients = await _ingredientRepository.GetAllIngredients();
        var ingredientsToPassToFrontend = CheckListForValidIngredients(res.Recipe, validIngredients);
        res.Ingredients = ingredientsToPassToFrontend;
        await _cachedRecipeRepository.Upsert(res.Recipe, res.RecipeId);
        if (req.UserId != null && req.SessionToken != null)
            await _favouriteRecipeRepository.UpsertRecipesToHistory(req.UserId.GetValueOrDefault(), res.RecipeId);
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

        if (res != null && res.Count != 0)
        {
            foreach (var offer in res)
            {
                await _cachedOfferRepository.UpsertOffer(offer.Name, offer.Price, offer.Store);
            }
            var stores = req.StoresStringToList(req.Stores);
            if (res.Any(offer => stores.Contains(offer.Store)))
                return Ok(res);
        }

        res = await _sallingService.GetRelevantProducts(req.SearchTerm);

        if (res != null)
        {
            foreach (var product in res)
            {
                if (await _cachedOfferRepository.GetOffer(product.Name) != null) break;
                await _cachedOfferRepository.UpsertOffer(product.Name, product.Price, product.Store);
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
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest req)
    {
        var user = _userRepository.CreateUser(req.Name, req.EmailAddress);
        var res = await _userRepository.Upsert(user, req.Password);
        if (!res)
            return BadRequest(
                "User with the specified Username or Email already exists, please choose another Username or Email");
        // ONLY COMMENT THIS IN WHEN WE NEED TO SHOW THIS FEATURE
        //var confirmEmailToken = await _userSessionRepository.GenerateVerificationCode(user.Id, codeType: "confirmEmail");
        //await _emailService.ConfirmEmail(user, confirmEmailToken);
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
    public async Task<IActionResult> Login([FromBody] LogInRequest req)
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
    public async Task<IActionResult> Logout([FromBody] LogOutRequest req)
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
    [HttpPost("user/favorite-recipe")]
    public async Task<IActionResult> AddFavouriteRecipe([FromBody] AddFavouriteRecipeRequest req)
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
    [HttpPost("user/get-favorite-recipes")]
    public async Task<IActionResult> GetFavouriteRecipes([FromBody] GetFavouriteRecipesRequest req)
    {
        var checkIfUserSessionIsValid = await _userSessionRepository.CheckIfTokenIsValid(req.UserId, req.SessionToken);
        if (!checkIfUserSessionIsValid)
            return Unauthorized("User session is not valid, please login again");

        var result = await _favouriteRecipeRepository.Get(req.UserId);

        var recipeList = new List<RecipeResponse>();

        foreach (var res in result)
        {
            var validIngredients = await _ingredientRepository.GetAllIngredients();
            var ingredientsToPassToFrontend = CheckListForValidIngredients(res.Description, validIngredients);
            recipeList.Add(new RecipeResponse(res.Description, ingredientsToPassToFrontend, res.Id));
        }

        if (recipeList != null && recipeList.Count != 0)
        {
            return Ok(recipeList);
        }

        return NotFound("No favourite recipes found");
    }

    /// <summary>
    /// Gets a list of recipes from history
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="sessionToken"></param>
    /// <returns>Returns a list of recipes if found, returns unauthorized of the user is not logged in</returns>
    [HttpPost("user/recipes-history")]
    public async Task<IActionResult> GetRecipeHistory([FromBody] GetRecipeHistoryRequest req)
    {
        var checkIfUserSessionIsValid =
            await _userSessionRepository.CheckIfTokenIsValid(req.UserId, req.SessionToken);
        if (!checkIfUserSessionIsValid)
            return Unauthorized("User session is not valid, please login again");

        var result = await _favouriteRecipeRepository.GetHistory(req.UserId);

        var recipeList = new List<RecipeResponse>();

        foreach (var res in result)
        {
            var validIngredients = await _ingredientRepository.GetAllIngredients();
            var ingredientsToPassToFrontend = CheckListForValidIngredients(res.Description, validIngredients);
            recipeList.Add(new RecipeResponse(res.Description, ingredientsToPassToFrontend, res.Id));
        }

        if (recipeList != null && recipeList.Count != 0)
        {
            return Ok(recipeList);
        }

        return NotFound("No history found");
    }

    /// <summary>
    /// Deletes a recipe from the users favourite recipes if the sessiontoken is valid
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Unauthorized if the session token is invalid, returns ok if it is successful and Badrequest if something unexpected happens
    /// E.g it should never happen</returns>
    [HttpDelete("user/favorite-recipe")]
    public async Task<IActionResult> DeleteFavouriteRecipe([FromBody] DeleteFavouriteRecipeRequest req)
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
    /// Endpoint to request a verification code and send it by email if the user cannot remember their password and wish to reset it.
    /// </summary>
    /// <param name="email"></param>
    /// <returns>Returns Ok if a user is found and the email has been sent, if the user is not found it returns BadRequest</returns>
    [HttpPost("user/reset-password-email-request")]
    public async Task<IActionResult> ResetPasswordRequest([EmailAddress] string email)
    {
        var user = await _userRepository.GetUserByEmail(email);
        if (user != null)
        {
            if (!await _userRepository.CheckIfEmailIsConfirmed(user.Name))
                return BadRequest("Email is not confirmed, please confirm your email before resetting your password");

            var token = await _userSessionRepository.GenerateVerificationCode(user.Id, codeType: "resetPassword");
            await _emailService.ResetPassword(user, token);
            return Ok("Email sent");
        }

        return BadRequest("User does not exist");
    }

    /// <summary>
    /// Resets the password of a user
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Ok if the user is found and the verification code is valid, returns bad request if not</returns>
    [HttpPost("user/reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest req)
    {
        var isValidAction =
            await _userSessionRepository.VerificationCodeTypeMatchesAction(req.VerificationCode, type: "resetPassword");
        if (!isValidAction)
        {
            return BadRequest("The verification code is not for resetting the password");
        }

        var userId = await _userSessionRepository.GetUserIdFromVerificationCode(req.VerificationCode);
        if (userId == null)
        {
            return BadRequest("No user found on the verification code");
        }

        var user = await _userRepository.GetUserFromId(userId.GetValueOrDefault());

        if (user != null)
        {
            var result = await _userRepository.ResetPassword(user, req.Password);
            if (result)
            {
                await _userSessionRepository.DeleteVerificationToken(userId.GetValueOrDefault(), req.VerificationCode);
                return Ok("Password was reset and has been changed, you can now login with your new password");
            }
        }

        return BadRequest("Verification code was invalid, please check that the inserted value is correct");
    }

    /// <summary>
    /// Endpoint to change the password of a user if requested.
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Unauthorized if the session token is invalid, returns ok if it is successful
    /// and Badrequest if the password is incorrect or user session is not valid</returns>
    [HttpPost("user/change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest req)
    {
        var checkIfUserSessionIsValid = await _userSessionRepository.CheckIfTokenIsValid(req.UserId, req.SessionToken);
        if (!checkIfUserSessionIsValid)
            return Unauthorized("User session is not valid, please login again");

        var user = await _userRepository.GetUser(req.UserName);
        if (user == null)
            return NotFound("User does not exist");

        var result = await _userRepository.ChangePassword(user, req.OldPassword, req.NewPassword);
        if (result)
        {
            return Ok("Password changed");
        }

        return BadRequest("Password is incorrect please try again");
    }

    //NOTE: IKKE BRUG DET HER ENDPOINT TIL TESTING DER ER KUN 100 GRATIS EMAILS OM DAGEN
    /// <summary>
    /// Endpoint to confirm the email of a user if requested.
    /// </summary>
    /// <param name="req"></param>
    /// <returns>Returns Ok if the link has been followed and and the DB returns that the confirmation was good,
    /// otherwise badrequest which should never happen</returns>
    [HttpPost("user/confirm-email")]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailRequest req)
    {
        var user = await _userRepository.GetUserFromId(req.UserId);

        if (user != null)
        {
            if (await _userRepository.CheckIfEmailIsConfirmed(user.Name))
                return BadRequest("The email is already confirmed");

            var isValidAction =
                await _userSessionRepository.VerificationCodeTypeMatchesAction(req.VerificationCode,
                    type: "confirmEmail");
            if (!isValidAction)
                return BadRequest("The verification code is not for confirming an email");

            var result = await _userRepository.ConfirmEmail(user.Name, user.EmailAddress);

            if (result)
            {
                await _userSessionRepository.DeleteVerificationToken(req.UserId, req.VerificationCode);
                return Ok("Email confirmed");
            }
        }

        return BadRequest("The user was not found");
    }

    [HttpDelete("user/delete-user")]
    public async Task<IActionResult> DeleteUser([FromQuery] Guid userId, string sessionToken)
    {
        var checkIfUserSessionIsValid = await _userSessionRepository.CheckIfTokenIsValid(userId, sessionToken);
        if (!checkIfUserSessionIsValid)
            return Unauthorized("User session is not valid, please login again");

        var user = await _userRepository.GetUserFromId(userId);
        if (user == null)
            return NotFound("User does not exist");

        var result = await _userRepository.DeleteUser(user);
        if (result)
        {
            return Ok("User deleted");
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
        for (int i = 0; i < stringList.Count; i++)
        {
            stringList[i] = stringList[i].ToLower();
        }

        foreach (string str in stringList)
        {
            if (!targetString.Contains(str.ToLower()))
            {
                return false;
            }
        }

        return true;
    }

    /// <summary>
    /// Helper function to retrieve valid ingredients from a list of ingredients.
    /// They are valid in the sense of being stripped of all other characters than letters e.g. numbers etc
    /// </summary>
    /// <param name="ingredients"></param>
    /// <param name="recipe"></param>
    /// <param name="validIngredients"></param>
    /// <returns>A list of ingredients in the correct format</returns>
    private static List<string> CheckListForValidIngredients(string recipe, List<string> validIngredients)
    {
        if (string.IsNullOrEmpty(recipe))
            return new List<string>();

        List<string> result = new List<string>();
        Console.WriteLine("recipe: ", recipe);
        recipe = recipe.ToLower();
        foreach (var ingredient in validIngredients)
        {
            if (result.Contains(ingredient))
                continue;
            if (recipe.Contains(" " + ingredient.ToLower() + " "))
                result.Add(ingredient);
        }


        Console.WriteLine(result);
        return result;
    }

    /// <summary>
    /// Helper function to speed up response times from openAI API
    /// </summary>
    /// <param name="req"></param>
    /// <param name="validIngredients"></param>
    /// <returns>A recipe</returns>
    private async Task<RecipeResponse> GetRecipeAsync(RecipeRequest req, List<string> validIngredients)
    {
        var res = await _openAiService.GetAiResponse(req);
        var ingredientsToPassToFrontend = CheckListForValidIngredients(res.Recipe, validIngredients);
        if (res.Success == false)
            return RecipeResponse.Error(res.ErrorMessage, res.RecipeId);
        var ingredientsToPassToFrontend = CheckListForValidIngredients(res.Recipes, validIngredients);
        res.Ingredients = ingredientsToPassToFrontend;
        await _cachedRecipeRepository.Upsert(res.Recipe, res.RecipeId);
        return res;
    }

    #endregion
}