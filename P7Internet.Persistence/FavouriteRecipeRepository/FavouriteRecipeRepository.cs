using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using P7Internet.Persistence.Connection;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Shared;

namespace P7Internet.Persistence.FavouriteRecipeRepository;

public class FavouriteRecipeRepository : IFavouriteRecipeRepository
{
    private static readonly string TableName = "FavouriteRecipesTable";
    private static readonly string HistoryTableName = "UserRecipeHistoryTable";
    private readonly IDbConnectionFactory _connectionFactory;
    private readonly IRecipeCacheRepository _cachedRecipeRepository;
    private IDbConnection Connection => _connectionFactory.Connection;

    public FavouriteRecipeRepository(IDbConnectionFactory connectionFactory,
        IRecipeCacheRepository cachedRecipeRepository)
    {
        _connectionFactory = connectionFactory;
        _cachedRecipeRepository = cachedRecipeRepository;
    }


    public async Task<List<Recipe>> Get(Guid userId)
    {
        var query = $@"SELECT RecipeId FROM {TableName} WHERE UserId = @UserId";

        var guids = await Connection.QueryAsync<Guid>(query, new {UserId = userId});

        var result = await _cachedRecipeRepository.GetListOfRecipes(guids.ToList());

        return result is {Count: > 0} ? result : null;
    }

    /// <summary>
    /// Inserts a favourite recipe in the database
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="recipeId"></param>
    /// <returns>Returns true of the process was successful E.g. the number of rows affected was more than 0 else it returns false</returns>
    /// <exception cref="ArgumentException"></exception>
    public async Task<bool> Upsert(Guid userId, Guid recipeId)
    {
        var checkIfRecipeExist = await _cachedRecipeRepository.CheckIfRecipeExist(recipeId);
        if (checkIfRecipeExist == false)
            throw new ArgumentException(
                $@"The recipe with the id: {recipeId} does not exist in the database. And therefore cannot be added to the favourite recipes.");

        var checkIfRecipeIsAlreadyFavourite = await CheckIfRecipeIsAlreadyFavourite(userId, recipeId);
        if (checkIfRecipeIsAlreadyFavourite)
            throw new ArgumentException($@"The recipe with the id: {recipeId} is already a favourite recipe.");

        var query = $@"INSERT INTO {TableName} (UserId, RecipeId)
                       VALUES (@UserId, @RecipeId)";

        return await Connection.ExecuteAsync(query, new {UserId = userId, RecipeId = recipeId}) > 0;
    }

    /// <summary>
    /// Deletes a favourite recipe from the database
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="recipeId"></param>
    /// <returns>Returns true of the process was successful E.g. the number of rows affected was more than 0 else it returns false</returns>
    public async Task<bool> Delete(Guid userId, Guid recipeId)
    {
        var query = $@"DELETE FROM {TableName} WHERE UserId = @UserId AND RecipeId = @RecipeId";

        return await Connection.ExecuteAsync(query, new {UserId = userId, RecipeId = recipeId}) > 0;
    }

    /// <summary>
    /// Checks if a recipe is already a favourite recipe
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="recipeId"></param>
    /// <returns>Returns true of the process was successful E.g resultFromDb is something else than NULL else it returns false</returns>
    private async Task<bool> CheckIfRecipeIsAlreadyFavourite(Guid userId, Guid recipeId)
    {
        var query = $@"SELECT RecipeId FROM {TableName} WHERE UserId = @UserId AND RecipeId = @RecipeId";

        var resultFromDb =
            await Connection.QueryFirstOrDefaultAsync<string>(query, new {UserId = userId, RecipeId = recipeId});

        return resultFromDb != null;
    }
    
    /// <summary>
    /// Checks if a recipe is already a favourite recipe
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="recipeId"></param>
    /// <returns>Returns true of the process was successful E.g resultFromDb is something else than NULL else it returns false</returns>
    private async Task<bool> CheckIfRecipeIsAlreadyInHistory(Guid userId, Guid recipeId)
    {
        var query = $@"SELECT RecipeId FROM {HistoryTableName} WHERE UserId = @UserId AND RecipeId = @RecipeId";

        var resultFromDb =
            await Connection.QueryFirstOrDefaultAsync<string>(query, new {UserId = userId, RecipeId = recipeId});

        return resultFromDb != null;
    }

    /// <summary>
    /// Gets the history of recipes that the user has seen
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>Returns a list of strings of the Ids of said recipes if any found otherwise returns null</returns>
    public async Task<List<Recipe>> GetHistory(Guid userId)
    {
        var query = $@"SELECT RecipeId FROM {HistoryTableName} WHERE UserId = @UserId";

        var guids = await Connection.QueryAsync<Guid>(query, new {UserId = userId});

        var result = await _cachedRecipeRepository.GetListOfRecipes(guids.ToList());

        if (result != null)
            return result;
        return null;
    }

    /// <summary>
    /// Upserts a recipe id to the history table and deletes the oldest recipe 
    /// if the user has more than 50 recipes in the history table
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="recipeId"></param>
    /// <returns>Returns true if successful, false if not</returns>
    /// <exception cref="ArgumentException">Throws an argument exception if no recipe is found</exception>
    public async Task<bool> UpsertRecipesToHistory(Guid userId, Guid recipeId)
    {
        var checkIfRecipeExist = await _cachedRecipeRepository.CheckIfRecipeExist(recipeId);
        if (checkIfRecipeExist == false)
            throw new ArgumentException(
                $@"The recipe with the id: {recipeId} does not exist in the database. And therefore cannot be added to the favourite recipes.");

        var recipeIsAlreadyInHistory = await CheckIfRecipeIsAlreadyInHistory(userId, recipeId);
        if (recipeIsAlreadyInHistory)
            throw new ArgumentException($@"The recipe with the id: {recipeId} is already in history.");

        
        var insertQuery = $@"INSERT INTO {HistoryTableName} (UserId, RecipeId)
                       VALUES (@UserId, @RecipeId)";
        var countQuery =  $@"SELECT COUNT(*) FROM {HistoryTableName} WHERE UserId = @UserId";
        var deleteQuery = $@"DELETE FROM {HistoryTableName} WHERE Updated IS NOT NULL AND UserId = @UserId ORDER BY Updated ASC LIMIT 1;";
        
        var result = await Connection.ExecuteAsync(insertQuery, new {UserId = userId, RecipeId = recipeId});
        var count = await Connection.ExecuteScalarAsync<int>(countQuery, new {UserId = userId});
        if (count > 50)
        {
            await Connection.ExecuteAsync(deleteQuery, new {UserId = userId});
        }
        return result > 0;
    }
}