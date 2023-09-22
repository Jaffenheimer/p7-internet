using System.Collections.Generic;
using System.Threading.Tasks;
using SharedObjects;

namespace P7Internet.Persistence.RecipeCacheRepository;

public interface IRecipeCacheRepository
{
    public Task<Recipe> GetRecipeByName(string name);
    public Task<bool> Upsert(Recipe recipe);
    public Task<List<Recipe>> GetRecipeByIngredients(List<Ingredient> ingredients);
}