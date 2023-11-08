using System;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using P7Internet.Persistence.Connection;

namespace P7Internet.Persistence.UserSessionRepository;

public class UserSessionRepository : IUserSessionRepository
{
    private static readonly string TableName = "UserSessionTable";
    private readonly IDbConnectionFactory _connectionFactory;
    private IDbConnection Connection => _connectionFactory.Connection;

    public UserSessionRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    
    /// <summary>
    /// Generates a session token for the user and inserts it into the database
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>Returns the generated token</returns>
    public async Task<string> GenerateSessionToken(Guid userId)
    {
        var query = $@"INSERT INTO {TableName} (UserId, SessionToken, ExpiresAt)
                            VALUES (@UserId, @SessionToken, @ExpiresAt)";
        var token = GenerateToken();
        var parameters = new
        {
            UserId = userId,
            SessionToken = token,
            ExpiresAt = DateTime.UtcNow.AddHours(1),
        }; 
        await Connection.ExecuteAsync(query, parameters);
        return token;
    }
    
    /// <summary>
    /// Checks if the sessiontoken provided by the user is still valid
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="token"></param>
    /// <returns>Returns true if the sessiontoken is valid and present, otherwise 0</returns>
    public async Task<bool> CheckIfTokenIsValid(Guid userId, string token)
    {
        var query = $@"SELECT * FROM {TableName} WHERE UserId = @userId AND SessionToken = @token";
        var result = await Connection.QuerySingleOrDefaultAsync(query, new {userId, token});
        if (result != null && result.ExpiresAt > DateTime.UtcNow)
        {
            return true;
        }
        await DeleteSessionToken(userId, token);
        return false;
    }
    
    /// <summary>
    /// Deletes the sessiontoken from the database if requested
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="sessionToken"></param>
    /// <returns>Returns true if successful E.g if the number of rows affected is more than 0 otherwise it returns false</returns>
    public async Task<bool> DeleteSessionToken(Guid userId, string sessionToken)
    {
        var query = $@"DELETE FROM {TableName} WHERE UserId = @UserId AND SessionToken = @SessionToken";
        return await Connection.ExecuteAsync(query, new {UserId = userId, SessionToken = sessionToken}) > 0;
    }
    
    /// <summary>
    /// Generates a token from a Guid
    /// </summary>
    /// <returns>Returns the generated token as a string</returns>
    private static string GenerateToken()
    {
        string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());

        return token;
    }
    
}