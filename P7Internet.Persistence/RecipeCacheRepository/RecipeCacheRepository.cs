using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
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
    
    public async Task<Recipe> GetRecipeByName(string name)
    {
        var query = $@"SELECT * FROM {TableName} WHERE Name LIKE @Name";

        return await Connection.QueryFirstOrDefaultAsync<Recipe>(query, new { Name = "%" + name + "%"});
    }
    
    public async Task<List<Recipe>> GetRecipeByIngredients(List<Ingredient> ingredients)
    {
        var query = $@"SELECT RecipeId FROM {IngredientsTable} WHERE Ingredients LIKE @Ingredients";
        var gridReader = await Connection.QueryMultipleAsync(query, new { Ingredients = ingredients });
        var recipeIds = await gridReader.ReadAsync<Guid>();
        
        var recipeQuery = $@"SELECT * FROM {TableName} WHERE Id = @Id";
        var recipeGridReader = await Connection.QueryMultipleAsync(recipeQuery, new { Id = recipeIds });
        var recipes = await recipeGridReader.ReadAsync<Recipe>();
        
        return recipes.AsList();
    }
    
    public async Task<bool> Upsert(Recipe recipe)
    {
        var query = $@"INSERT INTO {TableName} (Name, Category, Description)
                       VALUES (@Name, @Category, @Description)
                       ON DUPLICATE KEY UPDATE Name = @Name, Category = @Category, Description = @Description";
        
        var ingredientQuery = $@"INSERT INTO {IngredientsTable} (Name, RecipeId)
                                 VALUES (@Name,@RecipeId)
                                 ON DUPLICATE KEY UPDATE Name = @Name, RecipeId = @RecipeId";
        
        var parameters = new
        {
            Name = recipe.Name,
            Category = recipe.Category,
            Description = recipe.Description
        };
        
        var ingredientParameters = new
        {
            Name = recipe.Ingredients,
            RecipeId = recipe.Id
        };
        
        await Connection.ExecuteAsync(ingredientQuery, ingredientParameters);
        
        return await Connection.ExecuteAsync(query, parameters) > 0;
    }
    
}