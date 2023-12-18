using System.Collections.Generic;
using System.Data;
using Dapper;
using Moq;
using Moq.Dapper;
using NUnit.Framework;
using P7Internet.Persistence.Connection;
using P7Internet.Persistence.IngredientRepository;

namespace P7Internet.Test.Repositories;

public class IngredientRepositoryTest
{
    private Mock<IDbConnection> _dbConnection = new Mock<IDbConnection>();
    private Mock<IDbConnectionFactory> _dbConnectionFactory = new Mock<IDbConnectionFactory>();
    private IIngredientRepository _ingredientRepository;

    [SetUp]
    public void SetUp()
    {
        _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
        _ingredientRepository = new IngredientRepository(_dbConnectionFactory.Object);
    }


    [Test()]
    public void GetIngredientSuccess()
    {
        //Arrange
        List<string> testIngredient = new List<string>() { "TestIngredient", "TestIngredient2", "TestIngredient3" };
        _dbConnection.SetupDapperAsync(c => c.QueryAsync<string>(It.IsAny<string>(), null, null, null, null))
            .ReturnsAsync(testIngredient);

        //Act
        var result = _ingredientRepository.GetAllIngredients().Result;

        //Assert
        var counter = 0;
        foreach (var res in result)
        {
            Assert.AreEqual(testIngredient[counter], res);
            counter++;
        }
    }

    [Test()]
    public void GetIngredientFail()
    {
        //Arrange
        List<string> testIngredient = new List<string>() { "TestIngredient", "TestIngredient2", "TestIngredient3" };
        _dbConnection.SetupDapperAsync(c => c.QueryAsync<string>(It.IsAny<string>(), null, null, null, null))
            .ReturnsAsync(new List<string>());

        //Act
        var result = _ingredientRepository.GetAllIngredients().Result;

        //Assert
        var counter = 0;
        foreach (var res in result)
        {
            Assert.AreNotEqual(testIngredient[counter], res);
            counter++;
        }
    }

    [Test()]
    public void CheckIfIngredientExistsSuccess()
    {
        //Arrange
        _dbConnection
            .SetupDapperAsync(c => c.QueryFirstOrDefaultAsync<string>(It.IsAny<string>(), null, null, null, null))
            .ReturnsAsync("TestIngredient");

        //Act
        var result = _ingredientRepository.CheckIfIngredientExists("TestIngredient").Result;

        //Assert
        Assert.IsTrue(result);
    }

    [Test()]
    public void CheckIfIngredientExistsFail()
    {
        //Arrange
        _dbConnection
            .SetupDapperAsync(c => c.QueryFirstOrDefaultAsync<string>(It.IsAny<string>(), null, null, null, null))
            .ReturnsAsync((string)null);

        //Act
        var result = _ingredientRepository.CheckIfIngredientExists("TestIngredient").Result;

        //Assert
        Assert.IsFalse(result);
    }
}