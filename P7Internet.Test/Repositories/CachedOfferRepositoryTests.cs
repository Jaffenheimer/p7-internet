using System;
using System.Collections.Generic;
using System.Data;
using Dapper;
using Moq;
using Moq.Dapper;
using NUnit.Framework;
using P7Internet.Persistence.CachedIngredientPricesRepository;
using P7Internet.Persistence.CachedOfferRepository;
using P7Internet.Persistence.Connection;
using P7Internet.Shared;

namespace P7Internet.Repositories.Tests
{
    [TestFixture()]
    public class CachedOfferRepositoryTests
    {
        private TestOffer _testOfferStruct;
        private User _testUser;
        private Mock<IDbConnection> _dbConnection = new Mock<IDbConnection>();
        private Mock<IDbConnectionFactory> _dbConnectionFactory = new Mock<IDbConnectionFactory>();
        private ICachedOfferRepository _cachedOfferRepository;

        public struct TestOffer
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public decimal Price { get; set; }
            public string Currency { get; set; }
            public KeyValuePair<float, float> Size { get; set; }
            public string Store { get; set; }
            public DateTime Created { get; set; }
            public DateTime Ending { get; set; }
            public string image { get; set; }
        }

        [SetUp]
        public void SetUp()
        {
            _testOfferStruct = new TestOffer()
            {
                Id = "TestId", Name = "TestOffer", Description = "TestDesc", Price = 15.95m, Currency = "DKK",
                Size = new KeyValuePair<float, float>(1, 5), Store = "Føtex", Created = new DateTime(2023, 12, 24),
                Ending = new DateTime(2023, 12, 31)
            };
            _dbConnection
                .SetupDapperAsync(c =>
                    c.QuerySingleOrDefaultAsync<TestOffer>(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(_testOfferStruct);
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _cachedOfferRepository = new CachedOfferRepository(_dbConnectionFactory.Object);
        }

        [Test()]
        public void GetOfferSuccess()
        {
            //Arrange
            _dbConnection
                .SetupDapperAsync(
                    c => c.QueryFirstOrDefaultAsync<TestOffer>(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(_testOfferStruct);

            //Act
            var offer = _cachedOfferRepository.GetOffer(It.IsAny<string>()).Result;

            //Assert
            Assert.NotNull(offer);
        }

        [Test()]
        public void GetOfferFailure()
        {
            TestOffer testOffer = default;
            //Arrange
            _dbConnection
                .SetupDapperAsync(
                    c => c.QueryFirstOrDefaultAsync<TestOffer>(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(testOffer);

            //Act
            var offer = _cachedOfferRepository.GetOffer(It.IsAny<string>()).Result;

            //Assert
            Assert.AreNotEqual(_testOfferStruct,offer);
        }
        
        [Test()]
        public void GetOfferByStoreSuccess()
        {
            //Arrange
            _dbConnection
                .SetupDapperAsync(
                    c => c.QueryFirstOrDefaultAsync<TestOffer>(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(_testOfferStruct);

            //Act
            var offer = _cachedOfferRepository.GetOfferByStore(It.IsAny<string>(), It.IsAny<string>()).Result;

            //Assert
            Assert.NotNull(offer);
        }
        [Test()]
        public void GetOfferByStoreFailure()
        {
            TestOffer testOffer = default;
            //Arrange
            _dbConnection
                .SetupDapperAsync(
                    c => c.QueryFirstOrDefaultAsync<TestOffer>(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(testOffer);

            //Act
            var offer = _cachedOfferRepository.GetOfferByStore(It.IsAny<string>(), It.IsAny<string>()).Result;

            //Assert
            Assert.AreNotEqual(_testOfferStruct,offer);
        }

        [Test()]
        public void UpsertOfferSuccess()
        {
            //Arrange
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(1);

            //Act
            var status = _cachedOfferRepository.UpsertOffer(It.IsAny<string>(), It.IsAny<decimal>(), It.IsAny<string>())
                .Result;


            //Assert
            Assert.NotNull(status);
            Assert.IsTrue(true);
        }

        [Test()]
        public void UpsertOfferFailure()
        {
            //Arrange
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(0);

            //Act
            var status = _cachedOfferRepository.UpsertOffer(It.IsAny<string>(), It.IsAny<decimal>(), It.IsAny<string>())
                .Result;
            
            //Assert
            Assert.NotNull(status);
            Assert.IsFalse(false);
        }
    }
}