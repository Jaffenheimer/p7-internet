using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Security;
using System.Threading.Tasks;
using Dapper;
using MySql.Data.MySqlClient;
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

    public async Task<bool> Upsert(User user)
    {
        var parameters = new
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.EmailAddress,
            PasswordHash = user.PasswordHash,
            PasswordSalt = user.PasswordSalt,
            CreatedAt = user.CreatedAt,
            UpdatedAt = DateTime.UtcNow,
        };
        try
        {
            var query = $@"INSERT INTO {TableName} (Id, Name, Email, Password_hash, Password_salt, Creation_date, Updated)
                            VALUES (@Id, @Name, @Email, @PasswordHash, @PasswordSalt, @CreatedAt, @UpdatedAt)";
            
            return await Connection.ExecuteAsync(query, parameters) > 0;
        }
        catch (Exception)
        {

            throw;
        }
    }
    public User CreateUser(string name, string email, string password)
    {
        User user = new User(name, email, password);
        return user;
    }
}