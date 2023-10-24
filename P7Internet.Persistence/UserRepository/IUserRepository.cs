using System.Threading.Tasks;
using SharedObjects;

namespace P7Internet.Persistence.UserRepository;

public interface IUserRepository
{
    public Task<bool> Upsert(User user, string password);
    public Task<User> LogIn(string userName, string password);
    public User CreateUser(string userName, string email);

}