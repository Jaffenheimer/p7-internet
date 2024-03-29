using System;
using System.Threading.Tasks;

namespace P7Internet.Persistence.UserSessionRepository;

public interface IUserSessionRepository
{
    /// <summary>
    /// Checks if the sessiontoken provided by the user is still valid
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="token"></param>
    /// <returns>Returns true if the sessiontoken is valid and present, otherwise 0</returns>
    public Task<bool> CheckIfTokenIsValid(Guid userId, string token);

    /// <summary>
    /// Generates a session token for the user and inserts it into the database
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>Returns the generated token</returns>
    public Task<string> GenerateSessionToken(Guid userId);

    /// <summary>
    /// Deletes the sessiontoken from the database if requested
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="sessionToken"></param>
    /// <returns>Returns true if successful E.g if the number of rows affected is more than 0 otherwise it returns false</returns>
    public Task<bool> DeleteSessionToken(Guid userId, string sessionToken);

    /// <summary>
    /// Gets a userId from a verification code given that the code is valid and deletes the verification token from the database
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="codeType"></param>
    /// <returns>A user if found null if not</returns>
    public Task<string> GenerateVerificationCode(Guid userId, string codeType);

    /// <summary>
    /// Determines if the verification code is of the expected type, types=["resetPassword", "confirmEmail"]
    /// </summary>
    /// <param name="verificationCode"></param>
    /// <param name="type"></param>
    /// <returns>true if the verification is of expected type, else false </returns>
    public Task<bool> VerificationCodeTypeMatchesAction(string verificationCode, string type);

    /// <summary>
    /// Gets a userId from a verification code given that the code is valid and deletes the verification token from the database
    /// </summary>
    /// <param name="verificationCode"></param>
    /// <returns>A user if found null if not</returns>
    public Task<Guid?> GetUserIdFromVerificationCode(string verificationCode);

    /// <summary>
    /// Deletes a verification token from the database
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="verificationCode"></param>
    /// <returns>True if it went well false if not</returns>
    public Task<bool> DeleteVerificationToken(Guid userId, string verificationCode);

    public string GenerateToken();
}