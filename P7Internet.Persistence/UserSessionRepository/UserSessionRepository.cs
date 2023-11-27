using System;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using P7Internet.Persistence.Connection;

namespace P7Internet.Persistence.UserSessionRepository;

public class UserSessionRepository : IUserSessionRepository
{
    private static readonly string TableName = "UserSessionTable";
    private static readonly string VerificationTable = "PasswordVerificationTable";
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

        var deleteDeprecatedTokes = $@"DELETE FROM {TableName} WHERE ExpiresAt < (TIME(NOW()))";
        await Connection.ExecuteAsync(deleteDeprecatedTokes);

        var token = GenerateToken();
        var parameters = new
        {
            UserId = userId,
            SessionToken = token, 
            ExpiresAt = DateTime.UtcNow.AddHours(2), // two hours was added, as Utc is one hour behind our timezone
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
        var result = await Connection.QuerySingleOrDefaultAsync(query, new { userId, token });
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
        return await Connection.ExecuteAsync(query, new { UserId = userId, SessionToken = sessionToken }) > 0;
    }

    public async Task<Guid> GetUserFromVerificationCode(string verificationCode)
    {
        var query = $@"SELECT UserId FROM {VerificationTable} WHERE VerificationCode = @VerificationCode";
        var result = await Connection.QueryFirstOrDefaultAsync<Guid>(query, new {VerificationCode = verificationCode});
        return result;
    }

    public async Task<string> GenerateVerificationCode(Guid userId)
    {
        var query = $@"INSERT INTO {VerificationTable} (UserId, VerificationCode, ExpiresAt)
                            VALUES (@UserId, @VerificationCode, @ExpiresAt)";

        var deleteDeprecatedTokes = $@"DELETE FROM {VerificationTable} WHERE ExpiresAt < (TIME(NOW()))";
        await Connection.ExecuteAsync(deleteDeprecatedTokes);

        var token = GenerateToken();
        var parameters = new
        {
            UserId = userId,
            VerificationCode = token,
            ExpiresAt = DateTime.UtcNow.AddHours(2), // two hours was added, as Utc is one hour behind our timezone
        };
        await Connection.ExecuteAsync(query, parameters);
        return token;
    }

    public async Task<bool> CheckIfVerificationTokenIsValid(Guid userId, string token)
    {
        var query = $@"SELECT * FROM {VerificationTable} WHERE UserId = @userId AND VerificationCode = @token";
        var result = await Connection.QuerySingleOrDefaultAsync(query, new { userId, token });
        if (result != null && result.ExpiresAt > DateTime.UtcNow)
        {
            return true;
        }

        await DeleteSessionToken(userId, token);
        return false;
    }

    public async Task<bool> DeleteVerificationToken(Guid userId, string verificationCode)
    {
        var query = $@"DELETE FROM {VerificationTable} WHERE UserId = @UserId AND VerificationCode = @SessionToken";
        return await Connection.ExecuteAsync(query, new { UserId = userId, VerificationCode = verificationCode }) > 0;
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

