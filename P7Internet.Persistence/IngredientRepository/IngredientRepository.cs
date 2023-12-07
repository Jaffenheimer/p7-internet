using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using P7Internet.Persistence.Connection;
using P7Internet.Shared;

namespace P7Internet.Persistence.IngredientRepository;

public class IngredientRepository : IIngredientRepository
{
    private static readonly string TableName = "IngredientTable";
    private readonly IDbConnectionFactory _connectionFactory;
    private HelperFunctions _helperFunctions = new();
    private IDbConnection Connection => _connectionFactory.Connection;

    public IngredientRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    /// <summary>
    /// Upserts a list of ingredients to the database
    /// </summary>
    /// <param name="ingredients"></param>
    /// <returns>True if successful false otherwise</returns>
    public async Task<bool> UpsertIngredients()
    {
        var query = $@"INSERT INTO {TableName} (Name)
                        VALUES (@Name);";
        var ingredients = _helperFunctions.GetIngredientsFromTextFile();
        var parameters = ingredients.Select(ingredient => new
        {
            Name = ingredient
        });

        var result = await Connection.ExecuteAsync(query, parameters);

        return result > 0;
    }

    /// <summary>
    /// Checks if an ingredient exists in the database
    /// </summary>
    /// <param name="ingredient"></param>
    /// <returns>Returns true if it exists false if not</returns>
    public async Task<bool> CheckIfIngredientExists(string ingredient)
    {
        var query = $@"SELECT Ingredient FROM {TableName} WHERE Name = @Name";

        var resultFromDb = await Connection.QueryFirstOrDefaultAsync<string>(query, new { Name = ingredient });

        return resultFromDb != null;
    }

    /// <summary>
    /// Gets all ingredients from the database
    /// </summary>
    /// <returns>The same as above</returns>
    public async Task<List<string>> GetAllIngredients()
    {
        var query = $@"SELECT Name FROM {TableName}";

        var resultFromDb = await Connection.QueryAsync<string>(query);

        return resultFromDb.ToList();
    }
}