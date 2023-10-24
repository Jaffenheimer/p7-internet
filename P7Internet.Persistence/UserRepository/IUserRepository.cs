using System;
using System.Collections.Generic;
using System.Security;
using System.Threading.Tasks;
using SharedObjects;

namespace P7Internet.Persistence.UserRepository;

public interface IUserRepository
{
    User CreateUser(string name, string email, string password);

    //public Task<bool> Upsert(List<string> ingredients);
    public Task<bool> Upsert(User user);

}