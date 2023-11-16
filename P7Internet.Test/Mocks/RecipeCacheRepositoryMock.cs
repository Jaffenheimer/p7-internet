using Moq;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Shared;
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
        private List<string> _testRecipes = new List<string>() { "Æblekage med fløde", "Veganske kartoffelbåde med krydderi, æbler og julebryg", "Test med test på"};
        private Recipe _testRecipe;
        public RecipeCacheRepositoryMock(Recipe testRecipe)
        {
            _testRecipe = testRecipe;
            cachedRecipeRepositoryMock = new Mock<IRecipeCacheRepository>();
            cachedRecipeRepositoryMock.Setup(x => x.GetAllRecipes()).Returns(Task.FromResult(_testRecipes));
            cachedRecipeRepositoryMock.Setup(x => x.Upsert(_testRecipe.Name, Guid.NewGuid())).Returns(Task.FromResult(true));
        }

    }
}
