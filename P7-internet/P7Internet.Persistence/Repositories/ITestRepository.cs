using System.Collections.Generic;
using System.Threading.Tasks;

namespace P7Internet.Persistence.Repositories;

public interface ITestRepository
{
    public Task<bool> Upsert(List<string> ingredients);
}