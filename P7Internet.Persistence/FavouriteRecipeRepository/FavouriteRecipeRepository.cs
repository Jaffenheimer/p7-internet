using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using P7Internet.Persistence.Connection;
using P7Internet.Persistence.RecipeCacheRepository;

namespace P7Internet.Persistence.FavouriteRecipeRepository;

public class FavouriteRecipeRepository : IFavouriteRecipeRepository
{
    private static readonly string TableName = "FavouriteRecipesTable";
    private readonly IDbConnectionFactory _connectionFactory;
    private readonly IRecipeCacheRepository _cachedRecipeRepository;
    private IDbConnection Connection => _connectionFactory.Connection;

    public FavouriteRecipeRepository(IDbConnectionFactory connectionFactory, IRecipeCacheRepository cachedRecipeRepository)
    {
        _connectionFactory = connectionFactory;
        _cachedRecipeRepository = cachedRecipeRepository;
    }


    public async Task<List<string>> Get(Guid userId)
    {
        var query = $@"SELECT RecipeId FROM {TableName} WHERE UserId = @UserId";
        
        var gridReader = await Connection.QueryMultipleAsync(query, new {UserId = userId});
        
        var guids = gridReader.Read<Guid>();
        
        var result = await _cachedRecipeRepository.GetListOfRecipes(guids.ToList());
        
        if(result != null)
            return result;
        return null;
    }

    public async Task<bool> Upsert(Guid userId, Guid recipeId)
    {
        var checkIfRecipeExist = await _cachedRecipeRepository.CheckIfRecipeExist(recipeId);
        if(checkIfRecipeExist == false)
            throw new ArgumentException($@"The recipe with the id: {recipeId} does not exist in the database. And therefore cannot be added to the favourite recipes.");
        
        var checkIfRecipeIsAlreadyFavourite = await CheckIfRecipeIsAlreadyFavourite(userId, recipeId);
        if(checkIfRecipeIsAlreadyFavourite)
            throw new ArgumentException($@"The recipe with the id: {recipeId} is already a favourite recipe.");
        
        var query = $@"INSERT INTO {TableName} (UserId, RecipeId)
                       VALUES (@UserId, @RecipeId)";

        return await Connection.ExecuteAsync(query, new { UserId = userId, RecipeId = recipeId }) > 0;
    }
    public async Task<bool> Delete(Guid userId, Guid recipeId)
    {
        var query = $@"DELETE FROM {TableName} WHERE UserId = @UserId AND RecipeId = @RecipeId";

        return await Connection.ExecuteAsync(query, new { UserId = userId, RecipeId = recipeId }) > 0;
    }
    
    private async Task<bool> CheckIfRecipeIsAlreadyFavourite(Guid userId, Guid recipeId)
    {
        var query = $@"SELECT RecipeId FROM {TableName} WHERE UserId = @UserId AND RecipeId = @RecipeId";
        
        var resultFromDb = await Connection.QueryFirstOrDefaultAsync<string>(query, new {UserId = userId, RecipeId = recipeId});
        
        return resultFromDb != null;
    }
}