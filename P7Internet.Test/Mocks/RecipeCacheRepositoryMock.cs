using Moq;
using P7Internet.Persistence.RecipeCacheRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace P7Internet.Test.Mocks
{
    internal class RecipeCacheRepositoryMock
    {
        public Mock<IRecipeCacheRepository> cachedRecipeRepositoryMock;
        public RecipeCacheRepositoryMock()
        {
            cachedRecipeRepositoryMock = new Mock<IRecipeCacheRepository>();
            cachedRecipeRepositoryMock.Setup(x => x.GetAllRecipes()).Returns(Task.FromResult(new List<string>()));
        }

    }
}
