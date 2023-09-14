using System.Data;
using P7Internet.Persistence.Connection;

namespace P7Internet.Persistence.Repositories;

public class TestRepository : ITestRepository
{
    private static readonly string TableName = "";
    private readonly IDbConnectionFactory _connectionFactory;

    public TestRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    private IDbConnection Connection => _connectionFactory.Connection;
}