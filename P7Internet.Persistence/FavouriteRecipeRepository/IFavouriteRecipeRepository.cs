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
    public Task<List<string>> Get(Guid userId);

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
}