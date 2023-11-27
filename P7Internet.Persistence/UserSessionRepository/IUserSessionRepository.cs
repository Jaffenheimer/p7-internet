using System;
using System.Threading.Tasks;

namespace P7Internet.Persistence.UserSessionRepository;

public interface IUserSessionRepository
{
    /// <summary>
    /// Generates a session token for the user and inserts it into the database
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>Returns the generated token</returns>
    public Task<bool> CheckIfTokenIsValid(Guid userId, string token);

    /// <summary>
    /// Checks if the sessiontoken provided by the user is still valid
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="token"></param>
    /// <returns>Returns true if the sessiontoken is valid and present, otherwise 0</returns>
    public Task<string> GenerateSessionToken(Guid userId);

    /// <summary>
    /// Deletes the sessiontoken from the database if requested
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="sessionToken"></param>
    /// <returns>Returns true if successful E.g if the number of rows affected is more than 0 otherwise it returns false</returns>
    public Task<bool> DeleteSessionToken(Guid userId, string sessionToken);

    public Task<Guid> GetUserFromVerificationCode(string verificationCode);
    public Task<string> GenerateVerificationCode(Guid userId);
    public Task<bool> CheckIfVerificationTokenIsValid(Guid userId, string token);
    public Task<bool> DeleteVerificationToken(Guid userId, string verificationCode);

}