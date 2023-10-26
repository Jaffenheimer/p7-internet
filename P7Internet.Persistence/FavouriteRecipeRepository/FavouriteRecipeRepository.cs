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
    private static readonly string TableName = "CachedRecipes";
    private readonly IDbConnectionFactory _connectionFactory;
    private readonly IRecipeCacheRepository _cachedRecipeRepository;
    private IDbConnection Connection => _connectionFactory.Connection;

    public FavouriteRecipeRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
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
        var query = $@"INSERT INTO {TableName} (UserId, RecipeId)
                       VALUES (@UserId, @RecipeId)";

        return await Connection.ExecuteAsync(query, new { UserId = userId, RecipeId = recipeId }) > 0;
    }
}