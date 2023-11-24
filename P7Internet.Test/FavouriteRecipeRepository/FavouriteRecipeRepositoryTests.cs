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
            _testRecipe = new Recipe(new Guid("d3d01e66-2943-463c-ab22-4abd09f1bd7f"), "TestRecipe", "TestDesc", new List<string>());
            _testUser = new User("TestUser", "test@example.com") { Id = Guid.NewGuid(), CreatedAt = DateTime.Now, PasswordHash = "361D43834C1F83BEF2E1553884C329182F51798228F8FAAF78D7040B9F43A8AB", PasswordSalt = "salt1234salt" };
            _recipeCacheRepositoryMock = new Mock<IRecipeCacheRepository>();

            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _favRecipeCacheRepository = new FavouriteRecipeRepository(_dbConnectionFactory.Object, _recipeCacheRepositoryMock.Object);
        }

        [Test()]
        public void GetSuccess()
        {
            //Arrange

            //Act

            //Assert
            Assert.Fail();
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
            Assert.IsTrue(status);
        }

        [Test()]
        public void DeleteSuccess()
        {
            //Arrange

            //Act

            //Assert
            Assert.Fail();
        }

        [Test()]
        public void GetHistorySuccess()
        {
            //Arrange

            //Act

            //Assert
            Assert.Fail();
        }

        [Test()]
        public void UpsertRecipesToHistorySuccess()
        {
            //Arrange

            //Act

            //Assert
            Assert.Fail();
        }
    }
}