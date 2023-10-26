using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P7Internet.Persistence.FavouriteRecipeRepository;

public interface IFavouriteRecipeRepository
{
    public Task<List<string>> Get(Guid userId);
    public Task<bool> Upsert(Guid userId, Guid recipeId);
    public Task<bool> Delete(Guid userId, Guid recipeId);
}