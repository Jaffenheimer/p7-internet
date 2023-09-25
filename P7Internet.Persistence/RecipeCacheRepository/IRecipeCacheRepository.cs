using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SharedObjects;

namespace P7Internet.Persistence.RecipeCacheRepository;

public interface IRecipeCacheRepository
{
    public Task<List<string>> GetAllRecipes();
    public Task<bool> Upsert(string recipe);
}