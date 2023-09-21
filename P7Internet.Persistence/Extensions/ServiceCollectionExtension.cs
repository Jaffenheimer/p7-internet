using System.Data.Common;
using Dapper;
using Microsoft.Extensions.DependencyInjection;
using MySql.Data.MySqlClient;
using P7Internet.Persistence.Connection;
using P7Internet.Persistence.Dapper;
using P7Internet.Persistence.Repositories;

namespace P7Internet.Persistence.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection ConfigurePersistenceMySqlConnection(this IServiceCollection services,
        string? connectionString)
    {
        services.AddSingleton<IDbConnectionFactory>(new MySqlConnectionFactory(connectionString));

        // Add repositories
        services.AddScoped<ITestRepository, TestRepository>();

        // Dapper
        SqlMapper.AddTypeHandler(new GuidTypeHandler());

        return services;
    }
}