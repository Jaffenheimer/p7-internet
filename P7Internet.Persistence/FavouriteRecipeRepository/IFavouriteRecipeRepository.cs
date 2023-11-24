using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P7Internet.Persistence.FavouriteRecipeRepository;

public interface IFavouriteRecipeRepository
{
    /// <summary>
    /// Gets all favourite recipes by user id
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>Returns a list of all recipes favourited by the user. Returns 0 if none is present</returns>
    public Task<List<Guid>> Get(Guid userId);

    /// <summary>
    /// Inserts a favourite recipe in the database
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="recipeId"></param>
    /// <returns>Returns true of the process was successful E.g. the number of rows affected was more than 0 else it returns false</returns>
    /// <exception cref="ArgumentException"></exception>
    public Task<bool> Upsert(Guid userId, Guid recipeId);

    /// <summary>
    /// Deletes a favourite recipe from the database
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="recipeId"></param>
    /// <returns>Returns true of the process was successful E.g. the number of rows affected was more than 0 else it returns false</returns>
    public Task<bool> Delete(Guid userId, Guid recipeId);

    /// <summary>
    /// Gets the history of recipes that the user has seen
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>Returns a list of strings of the Ids of said recipes if any found otherwise returns null</returns>
    public Task<List<string>> GetHistory(Guid userId);

    /// <summary>
    /// Upserts a list of recipes to the history table
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="recipeId"></param>
    /// <returns>Returns true if successful, false if not</returns>
    /// <exception cref="ArgumentException">Throws an argument exception if no recipe is found</exception>
    public Task<bool> UpsertRecipesToHistory(Guid userId, Guid recipeId);
}