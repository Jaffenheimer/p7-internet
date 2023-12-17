using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using P7Internet.Persistence.Connection;
using P7Internet.Shared;

namespace P7Internet.Persistence.RecipeCacheRepository;

public class RecipeCacheRepository : IRecipeCacheRepository
{
    private static readonly string TableName = "CachedRecipes";
    private readonly IDbConnectionFactory _connectionFactory;
    private IDbConnection Connection => _connectionFactory.Connection;

    public RecipeCacheRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    /// <summary>
    /// Checks if recipe exist in the database
    /// </summary>
    /// <param name="recipeId"></param>
    /// <returns>Returns true of the process was successful E.g resultFromDb is something else than NULL else it returns false</returns>
    public async Task<bool> CheckIfRecipeExist(Guid recipeId)
    {
        var query = $@"SELECT Id FROM {TableName} WHERE Id = @Id";

        var resultFromDb = await Connection.QueryFirstOrDefaultAsync<string>(query, new {Id = recipeId});

        return resultFromDb != null;
    }

    /// <summary>
    /// Gets all recipes from the database
    /// </summary>
    /// <returns>Returns a list of recipes as strings</returns>
    public async Task<List<Recipe>> GetAllRecipes()
    {
        var cachedRecipeQuery = $@"SELECT * FROM {TableName}";
        
        var returnList = new List<Recipe>();
        
        var recipeResultFromDb = await Connection.QueryAsync(cachedRecipeQuery);
        
        foreach (var test in recipeResultFromDb)
        {
            var id = test.Id; 
            var recipe = test.Recipe; 
            
            returnList.Add(new Recipe(new Guid(id), recipe.ToString()));
        }
        
        return returnList;
    }

    /// <summary>
    /// Inserts or updates a recipe in the database
    /// </summary>
    /// <param name="openAiResponse"></param>
    /// <param name="recipeId"></param>
    /// <returns>Returns true of the process was successful E.g. the number of rows affected was more than 0 else it returns false</returns>
    public async Task<bool> Upsert(string openAiResponse, Guid recipeId)
    {
        var query = $@"INSERT INTO {TableName} (Id, Recipe)
                       VALUES (@Id, @Recipe)
                       ON DUPLICATE KEY UPDATE Recipe = @Recipe";

        var parameters = new
        {
            Id = recipeId,
            Recipe = openAiResponse
        };

        return await Connection.ExecuteAsync(query, parameters) > 0;
    }

    /// <summary>
    /// Gets a list of recipes from the database based on a list of Id's
    /// </summary>
    /// <param name="ids"></param>
    /// <returns>Returns a list of recipes as strings</returns>
    public async Task<List<Recipe>> GetListOfRecipes(List<Guid> ids)
    {
        var query = $@"SELECT Recipe FROM {TableName} WHERE Id = @Ids";
        
        List<string> result = new List<string>();
        foreach (var id in ids)
        {
            var res = await Connection.QuerySingleOrDefaultAsync<string>(query, new {Ids = id});
            result.Add(res);
        }
        var recipes = new List<Recipe>();

        var counter = 0;
        foreach (var recipe in result)
        {
            recipes.Add(new Recipe(ids[counter], recipe));
            counter++;
        }

        return recipes;
    }
}