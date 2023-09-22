using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using P7Internet.Persistence.Connection;

namespace P7Internet.Persistence.Repositories;

public class TestRepository : ITestRepository
{
    private static readonly string TableName = "";
    private readonly IDbConnectionFactory _connectionFactory;
    private IDbConnection Connection => _connectionFactory.Connection;

    public TestRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<bool> Upsert(List<string> ingredients)
    {
        var query = $@"INSERT INTO {TableName} (Ingredients)
                       VALUES (@Ingredients)
                       ON DUPLICATE KEY UPDATE Ingredients = @Ingredients";

        return await Connection.ExecuteAsync(query, new { Ingredients = ingredients }) > 0;
    }
}