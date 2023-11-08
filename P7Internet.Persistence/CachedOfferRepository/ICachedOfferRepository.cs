using System.Threading.Tasks;
using P7Internet.Shared;

namespace P7Internet.Persistence.CachedIngredientPricesRepository;

public interface ICachedOfferRepository
{
    /// <summary>
    /// Gets offer by ingredient name
    /// </summary>
    /// <param name="ingredientName"></param>
    /// <returns>Returns an offer of type Offer</returns>
    public Task<Offer> GetOffer(string ingredientName);
    /// <summary>
    /// Gets offer by store
    /// </summary>
    /// <param name="ingredientName"></param>
    /// <param name="store"></param>
    /// <returns>Returns an offer of type Offer</returns>
    public Task<Offer> GetOfferByStore(string ingredientName, string store);
    /// <summary>
    /// Inserts or updates offer in the database
    /// </summary>
    /// <param name="ingredientName"></param>
    /// <param name="price"></param>
    /// <param name="store"></param>
    /// <returns> Returns true of the process was successful E.g. the number of rows affected was more than 0 else it returns false </returns>
    public Task<bool> UpsertOffer(string ingredientName, decimal price, string store);
}