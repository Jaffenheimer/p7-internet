using System.Data.Common;
using Dapper;
using Microsoft.Extensions.DependencyInjection;
using MySql.Data.MySqlClient;
using P7Internet.Persistence.Dapper;

namespace P7Internet.Persistence.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection ConfigurePersistenceMySqlConnection(this IServiceCollection services,
        string? connectionString)
    {
        services.AddSingleton<DbConnectionStringBuilder>(new MySqlConnectionStringBuilder(connectionString));

        // Add repositories


        // Dapper
        SqlMapper.AddTypeHandler(new GuidTypeHandler());

        return services;
    }
}