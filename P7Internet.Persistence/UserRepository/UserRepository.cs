using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using P7Internet.Persistence.Connection;
using SharedObjects;

namespace P7Internet.Persistence.UserRepository;

public class UserRepository : IUserRepository
{
    private static readonly string TableName = "User";
    private readonly IDbConnectionFactory _connectionFactory;
    private IDbConnection Connection => _connectionFactory.Connection;

    public UserRepository(IDbConnectionFactory connectionFactory)
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
    public async Task<bool> UpsertNewUser(User user) 
    {
        var query = $@"INSERT INTO {TableName} (Name, email, password_hash, password_salt, creation_date, updated)
                       VALUES (@User.Id, @User.Name, @User.Email, @User.PasswordHash, @User.PasswordSalt, @User.CreatedAt, @User.UpdatedAt)
                       ON DUPLICATE KEY UPDATE Ingredients = @Ingredients";
        return await Connection.ExecuteAsync(query) > 0;
    }
}