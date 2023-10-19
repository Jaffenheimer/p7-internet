using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Dapper;
using MySql.Data.MySqlClient;
using P7Internet.Persistence.Connection;
using SharedObjects;

namespace P7Internet.Persistence.RecipeCacheRepository;

public class RecipeCacheRepository : IRecipeCacheRepository
{
    private static readonly string TableName = "CachedRecipes";
    private static readonly string IngredientsTable = "IngredientsInRecipe";
    private readonly IDbConnectionFactory _connectionFactory;
    private IDbConnection Connection => _connectionFactory.Connection;

    public RecipeCacheRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    
    public async Task<List<string>> GetAllRecipes()
    {
        var query = $@"SELECT Recipe FROM {TableName}";

        var resultFromDb = await Connection.QueryMultipleAsync(query);

        var result = resultFromDb.Read<string>();

        return result.AsList();
    }
    
    public async Task<bool> Upsert(string openAiResponse)
    {
        var query = $@"INSERT INTO {TableName} (Id, Recipe)
                       VALUES (@Id, @Recipe)
                       ON DUPLICATE KEY UPDATE Recipe = @Recipe";
        
        var parameters = new
        {
            Id = Guid.NewGuid(),
            Recipe = openAiResponse
        };
        
        return await Connection.ExecuteAsync(query, parameters) > 0;
    }

    
    
}