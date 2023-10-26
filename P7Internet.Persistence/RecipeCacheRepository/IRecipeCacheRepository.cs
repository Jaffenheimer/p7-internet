using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P7Internet.Persistence.RecipeCacheRepository;

public interface IRecipeCacheRepository
{
    public Task<bool> CheckIfRecipeExist(Guid recipeId);
    public Task<List<string>> GetAllRecipes();
    public Task<bool> Upsert(string recipe);
    public Task<List<string>> GetListOfRecipes(List<Guid> ids);
}