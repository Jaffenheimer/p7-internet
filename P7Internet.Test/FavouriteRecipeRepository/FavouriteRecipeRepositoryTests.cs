﻿using Dapper;
using Moq;
using Moq.Dapper;
using NUnit.Framework;
using P7Internet.Persistence.Connection;
using P7Internet.Persistence.FavouriteRecipeRepository;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Shared;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static P7Internet.Repositories.Tests.RecipeCacheRepositoryTests;

namespace P7Internet.Repositories.Tests
{
    [TestFixture()]
    public class FavouriteRecipeRepositoryTests
    {
        private User _testUser;
        private Recipe _testRecipe;
        private Mock<IRecipeCacheRepository> _recipeCacheRepositoryMock;
        private IFavouriteRecipeRepository _favRecipeCacheRepository;
        private Mock<IDbConnection> _dbConnection = new Mock<IDbConnection>();
        private Mock<IDbConnectionFactory> _dbConnectionFactory = new Mock<IDbConnectionFactory>();


        [SetUp]
        public void SetUp()
        {
            _testRecipe = new Recipe(new Guid("d3d01e66-2943-463c-ab22-4abd09f1bd7f"),"TestDesc");
            _testUser = new User("TestUser", "test@example.com") { Id = Guid.NewGuid(), CreatedAt = DateTime.Now, PasswordHash = "361D43834C1F83BEF2E1553884C329182F51798228F8FAAF78D7040B9F43A8AB", PasswordSalt = "salt1234salt" };
            _recipeCacheRepositoryMock = new Mock<IRecipeCacheRepository>();

            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _favRecipeCacheRepository = new FavouriteRecipeRepository(_dbConnectionFactory.Object, _recipeCacheRepositoryMock.Object);
        }

        [Test()]
        public void GetSuccess()
        {
            //Arrange
            _dbConnection.SetupDapperAsync(c => c.QueryAsync(It.IsAny<string>(), new { UserId = _testUser.Id }, null, null, null)).ReturnsAsync(value: null);

            //Act
            var status = _favRecipeCacheRepository.Get(_testUser.Id).Result;

            //Assert
            _recipeCacheRepositoryMock.Verify(x => x.GetListOfRecipes(It.IsAny<List<Guid>>()), Times.Once);
        }

        [Test()]
        public void UpsertSuccess()
        {
            //Arrange
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), new { UserId = _testUser.Id, RecipeId = _testRecipe.Id }, null, null, null)).ReturnsAsync(1);
            _dbConnection.SetupDapperAsync(c => c.QueryFirstOrDefaultAsync(It.IsAny<string>(), null, null, null, null)).ReturnsAsync(value: null);
            _recipeCacheRepositoryMock.Setup(x => x.CheckIfRecipeExist(It.IsAny<Guid>())).ReturnsAsync(true);
            
            //Act
            var status = _favRecipeCacheRepository.Upsert(_testUser.Id, _testRecipe.Id).Result;

            //Assert
            _recipeCacheRepositoryMock.Verify(x => x.CheckIfRecipeExist(_testRecipe.Id), Times.Once);
            Assert.NotNull(status);
        }

        [Test()]
        public void DeleteSuccess()
        {
            //Arrange
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), new { UserId = _testUser.Id, RecipeId = _testRecipe.Id }, null, null, null)).ReturnsAsync(1);

            //Act
            var status = _favRecipeCacheRepository.Delete(_testUser.Id, _testRecipe.Id).Result;

            //Assert
            Assert.NotNull(status);
            Assert.True(status);
        }

        [Test()]
        public void GetHistorySuccess()
        {
            //Arrange
            List<Guid> guids = new List<Guid>();
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), new { UserId = _testUser.Id, RecipeId = _testRecipe.Id }, null, null, null)).ReturnsAsync(1);
            _dbConnection.SetupDapperAsync(c => c.QueryFirstOrDefaultAsync(It.IsAny<string>(), null, null, null, null)).ReturnsAsync(value: null);

            //Act
            var status = _favRecipeCacheRepository.GetHistory(_testUser.Id).Result;

            //Assert
            _recipeCacheRepositoryMock.Verify(x => x.GetListOfRecipes(It.IsAny<List<Guid>>()), Times.Once);
        }

        [Test()]
        public void UpsertRecipesToHistorySuccess()
        {
            //Arrange
            _recipeCacheRepositoryMock.Setup(x => x.CheckIfRecipeExist(It.IsAny<Guid>())).ReturnsAsync(true);
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), null, null, null, null)).ReturnsAsync(1);

            //Act
            var status = _favRecipeCacheRepository.UpsertRecipesToHistory(_testUser.Id, It.IsAny<Guid>()).Result;

            //Assert
            Assert.NotNull(status);
            Assert.IsTrue(status);
            _recipeCacheRepositoryMock.Verify(x => x.CheckIfRecipeExist(It.IsAny<Guid>()), Times.Once);
        }
    }
}