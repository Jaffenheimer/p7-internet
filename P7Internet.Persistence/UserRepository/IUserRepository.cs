using System.Collections.Generic;
using System.Threading.Tasks;

namespace P7Internet.Persistence.UserRepository;

public interface IUserRepository
{
    public Task<bool> Upsert(List<string> ingredients);
}