using System.Collections.Generic;
using System.Threading.Tasks;

namespace P7Internet.Persistence.IngredientRepository;

public interface IIngredientRepository
{
    /// <summary>
    /// Upserts a list of ingredients to the database
    /// </summary>
    /// <returns>True if successful false otherwise</returns>
    public Task<bool> UpsertIngredients();

    /// <summary>
    /// Checks if an ingredient exists in the database
    /// </summary>
    /// <param name="ingredient"></param>
    /// <returns>Returns true if it exists false if not</returns>
    public Task<bool> CheckIfIngredientExists(string ingredient);

    /// <summary>
    /// Gets all ingredients from the database
    /// </summary>
    /// <returns>Same as above</returns>
    public Task<List<string>> GetAllIngredients();
}