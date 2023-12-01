using System;
using System.Data;
using System.Reflection.Emit;
using System.Threading.Tasks;
using Dapper;
using Newtonsoft.Json.Linq;
using P7Internet.Persistence.Connection;
using P7Internet.Shared;

namespace P7Internet.Persistence.UserSessionRepository;

public class UserSessionRepository : IUserSessionRepository
{
    private static readonly string TableName = "UserSessionTable";
    private static readonly string VerificationTable = "VerificationCodeTable";

    private readonly DateTimeOffset _date = new DateTimeOffset(DateTime.Now);
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

        var deleteDeprecatedTokes = $@"DELETE FROM {TableName} WHERE ExpiresAt < (TIME(NOW()+INTERVAL 1 HOUR))";
        await Connection.ExecuteAsync(deleteDeprecatedTokes);

        var token = GenerateToken();
        var parameters = new
        {
            UserId = userId,
            SessionToken = token,
            ExpiresAt = DateTime.UtcNow.AddHours(_date.Offset.Hours + 1),
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
        var query =
            $@"SELECT * FROM {TableName} WHERE UserId = @userId AND SessionToken = @token AND ExpiresAt >= (TIME(NOW()))";
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

    /// <summary>
    /// Gets a userId from a verification code given that the code is valid and deletes the verification token from the database
    /// </summary>
    /// <param name="verificationCode"></param>
    /// <returns>A user if found null if not</returns>
    public async Task<Guid?> GetUserIdFromVerificationCode(string verificationCode)
    {
        var query =
            $@"SELECT UserId FROM {VerificationTable} WHERE VerificationCode = @VerificationCode AND ExpiresAt >= (TIME(NOW()))";
        var result =
            await Connection.QueryFirstOrDefaultAsync<Guid>(query, new { VerificationCode = verificationCode });
        if (result != Guid.Empty)
        {
            await DeleteVerificationToken(result, verificationCode);
            return result;
        }

        return null;
    }

    //MANGLER SUMMARY
    public async Task<bool> VerificationCodeTypeMatchesAction(string verificationCode, string type)
    {
        var query =
            $@"SELECT UserId FROM {VerificationTable} WHERE VerificationCode = @VerificationCode AND ExpiresAt >= TIME(NOW()) AND CodeType = @CodeType";
        var result =
            await Connection.QueryFirstOrDefaultAsync<Guid>(query, new { VerificationCode = verificationCode, CodeType = type });

        if (result != Guid.Empty)
        {
            return true;
        }
        return false;
    }

    /// <summary>
    /// Generates a verification code for the user and inserts it into the database
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>returns the generated token</returns>
    public async Task<string> GenerateVerificationCode(Guid userId, string codeType)
    {
        var query = $@"INSERT INTO {VerificationTable} (UserId, VerificationCode, ExpiresAt, CodeType)
                            VALUES (@UserId, @VerificationCode, @ExpiresAt, @CodeType)";

        var deleteDeprecatedTokes = $@"DELETE FROM {VerificationTable} WHERE ExpiresAt <= (TIME(NOW()))";
        await Connection.ExecuteAsync(deleteDeprecatedTokes);

        var token = GenerateToken();
        var parameters = new
        {
            UserId = userId,
            VerificationCode = token,
            ExpiresAt = DateTime.UtcNow.AddHours(_date.Offset.Hours + 1),
            CodeType = codeType,
        };
        await Connection.ExecuteAsync(query, parameters);
        return token;
    }

    /// <summary>
    /// Deletes a verification token from the database
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="verificationCode"></param>
    /// <returns>True if it went well false if not</returns>
    public async Task<bool> DeleteVerificationToken(Guid userId, string verificationCode)
    {
        var query = $@"DELETE FROM {VerificationTable} WHERE UserId = @UserId AND VerificationCode = @VerificationCode";
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