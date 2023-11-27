using Dapper;
using Moq;
using Moq.Dapper;
using NUnit.Framework;
using P7Internet.Persistence.Connection;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Persistence.UserRepository;
using P7Internet.Shared;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace P7Internet.Repositories.Tests
{
    [TestFixture()]
    public class RecipeCacheRepositoryTests
    {
        public struct RecipeList
        {
            private List<string> _recipes = new List<string>();
            public List<string> Recipes { get { return _recipes; } set { _recipes = value; } }
            public RecipeList(){}
        }

        private RecipeList _recipeListStruct;
        public IRecipeCacheRepository _recipeCacheRepository;
        private Mock<IDbConnection> _dbConnection = new Mock<IDbConnection>();
        private Mock<IDbConnectionFactory> _dbConnectionFactory = new Mock<IDbConnectionFactory>();

        [SetUp]
        public void SetUp()
        {
            _recipeListStruct = new RecipeList() { Recipes = { "TestRecipe1", "TestRecipe2", "TestRecipe3" } };
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _recipeCacheRepository = new RecipeCacheRepository(_dbConnectionFactory.Object);
        }

        [Test()]
        public void CheckIfRecipeExistSuccess()
        {
            
            //Arrange
            var testRecipe = new Recipe(new Guid("d3d01e66-2943-463c-ab22-4abd09f1bd7f"), "TestRecipe", "TestDesc", new List<string>());
            _dbConnection.SetupDapperAsync(c => c.QuerySingleOrDefaultAsync<string>(It.IsAny<string>(), new { Id = testRecipe.Id }, null, null, null)).ReturnsAsync(testRecipe.Description);

            //Act
            var res = _recipeCacheRepository.CheckIfRecipeExist(testRecipe.Id).Result;

            //Assert
            Assert.IsTrue(res);
        }


        [Test()]
        public void GetAllRecipesSuccess()
        {
            //Arrange
            //_dbConnection.SetupDapperAsync(c => c.QueryMultipleAsync(It.IsAny<string>(), null, null, null, null)).ReturnsAsync(true);

            //Act
            var recipes = _recipeCacheRepository.GetAllRecipes().Result;

            //Assert
            Assert.NotNull(recipes);
        }

        [Test()]
        public void UpsertSuccess()
        {
            //Arrange
            var testRecipe = new Recipe(new Guid("d3d01e66-2943-463c-ab22-4abd09f1bd7f"), "TestRecipe", "TestDesc", new List<string>());
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), It.IsAny<object>(), null, null, null)).ReturnsAsync(1);

            //Act
            var status = _recipeCacheRepository.Upsert(testRecipe.Description, testRecipe.Id).Result;

            //Assert
            Assert.IsTrue(status);
        }

        [Test()]
        public void GetListOfRecipesSuccess()
        {
            //Arrange
            List<Guid> guids = new List<Guid>();
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), null, null, null, null)).ReturnsAsync(1);
            _dbConnection.SetupDapperAsync(c => c.QueryFirstOrDefaultAsync(It.IsAny<string>(), null, null, null, null)).ReturnsAsync(value: null);

            //Act
            var res = _recipeCacheRepository.GetListOfRecipes(guids).Result;

            //Assert
            Assert.NotNull(res);
        }

        [Test()]
        public void GetListOfRecipesFromListOfStringsSuccess()
        {
            //Arrange
            List<string> listOfStrings = new List<string>();
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), null, null, null, null)).ReturnsAsync(1);
            _dbConnection.SetupDapperAsync(c => c.QueryFirstOrDefaultAsync(It.IsAny<string>(), null, null, null, null)).ReturnsAsync(value: null);

            //Act
            var res = _recipeCacheRepository.GetListOfRecipesFromListOfStrings(listOfStrings).Result;

            //Assert
            Assert.NotNull(res);
        }
    }
}