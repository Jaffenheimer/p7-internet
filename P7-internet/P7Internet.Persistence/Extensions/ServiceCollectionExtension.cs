using System.Data.Common;
using Dapper;
using Microsoft.Extensions.DependencyInjection;
using MySql.Data.MySqlClient;
using P7_Internet_Persistence.Dapper;

namespace P7_Internet_Persistence.Extensions;

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