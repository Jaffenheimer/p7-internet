using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P7Internet.Persistence.RecipeCacheRepository;

public interface IRecipeCacheRepository
{
    /// <summary>
    /// Checks if recipe exist in the database
    /// </summary>
    /// <param name="recipeId"></param>
    /// <returns>Returns true of the process was successful E.g resultFromDb is something else than NULL else it returns false</returns>
    public Task<bool> CheckIfRecipeExist(Guid recipeId);
    /// <summary>
    /// Gets all recipes from the database
    /// </summary>
    /// <returns>Returns a list of recipes as strings</returns>
    public Task<List<string>> GetAllRecipes();
    /// <summary>
    /// Inserts or updates a recipe in the database
    /// </summary>
    /// <param name="openAiResponse"></param>
    /// <param name="recipeId"></param>
    /// <returns>Returns true of the process was successful E.g. the number of rows affected was more than 0 else it returns false</returns>
    public Task<bool> Upsert(string recipe, Guid recipeId);
    /// <summary>
    /// Gets a list of recipes from the database based on a list of Id's
    /// </summary>
    /// <param name="ids"></param>
    /// <returns>Returns a list of recipes as strings</returns>
    public Task<List<string>> GetListOfRecipes(List<Guid> ids);
}