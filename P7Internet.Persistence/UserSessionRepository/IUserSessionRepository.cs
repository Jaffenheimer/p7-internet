using System;
using System.Threading.Tasks;

namespace P7Internet.Persistence.UserSessionRepository;

public interface IUserSessionRepository
{
    public Task<bool> CheckIfTokenIsValid(Guid userId, string token);
    public Task<string> GenerateSessionToken(Guid userId);
    public Task<bool> DeleteSessionToken(Guid userId, string sessionToken);
}