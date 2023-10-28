using Dapper;
using Microsoft.Extensions.DependencyInjection;
using P7Internet.Persistence.CachedIngredientPricesRepository;
using P7Internet.Persistence.Connection;
using P7Internet.Persistence.Dapper;
using P7Internet.Persistence.FavouriteRecipeRepository;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Persistence.UserRepository;

namespace P7Internet.Persistence.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection ConfigurePersistenceMySqlConnection(this IServiceCollection services,
        string? connectionString)
    {
        services.AddSingleton<IDbConnectionFactory>(new MySqlConnectionFactory(connectionString));

        // Add repositories
        services.AddScoped<IUserRepository, UserRepository.UserRepository>();
        services.AddScoped<IRecipeCacheRepository, RecipeCacheRepository.RecipeCacheRepository>();
        services.AddScoped<IFavouriteRecipeRepository, FavouriteRecipeRepository.FavouriteRecipeRepository>();
        services.AddScoped<ICachedOfferRepository, CachedOfferRepository.CachedOfferRepository>();


        // Dapper
        SqlMapper.AddTypeHandler(new GuidTypeHandler());

        return services;
    }
}