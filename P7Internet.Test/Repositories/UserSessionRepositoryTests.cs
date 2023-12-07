using System;
using System.Data;
using Dapper;
using Moq;
using Moq.Dapper;
using NUnit.Framework;
using P7Internet.Persistence.Connection;
using P7Internet.Persistence.UserSessionRepository;
using P7Internet.Shared;

namespace P7Internet.Test.Repositories
{
    [TestFixture()]
    public class UserSessionRepositoryTests
    {
        private TestToken _testTokenStruct;
        private TestUser _testUserStruct;
        private User _testUser;
        private Mock<IDbConnection> _dbConnection = new Mock<IDbConnection>();
        private Mock<IDbConnectionFactory> _dbConnectionFactory = new Mock<IDbConnectionFactory>();
        private IUserSessionRepository _userSessionRepository;

        public struct TestUser
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string Password_hash { get; set; }
            public string Password_salt { get; set; }
            public DateTime Creation_date { get; set; }

            public TestUser(string name, string emailAddress)
            {
                Name = name;
                Email = emailAddress;
            }
        }

        public struct TestToken
        {
            public string UserId { get; set; }
            public string SessionToken { get; set; }
            public DateTime ExpiresAt { get; set; }
        }


        [SetUp]
        public void SetUp()
        {
            _testUserStruct = new TestUser("TestUser", "test@example.com")
            {
                Id = Guid.NewGuid().ToString(), Creation_date = new DateTime(2023, 11, 23),
                Password_hash = new string("361D43834C1F83BEF2E1553884C329182F51798228F8FAAF78D7040B9F43A8AB"),
                Password_salt = "salt1234salt", Email = "test@example.com", Name = "TestUser"
            };
            _testUser = new User("TestUser", "test@example.com")
            {
                Id = Guid.NewGuid(), CreatedAt = DateTime.Now,
                PasswordHash = "361D43834C1F83BEF2E1553884C329182F51798228F8FAAF78D7040B9F43A8AB",
                PasswordSalt = "salt1234salt"
            };
            _testTokenStruct = new TestToken()
            {
                UserId = _testUser.Id.ToString(), SessionToken = "fw6ISluwyE609VkFFcZ4ug==",
                ExpiresAt = new DateTime(2023, 12, 24, 15, 0, 0)
            };
            _dbConnection
                .SetupDapperAsync(
                    c => c.QuerySingleOrDefaultAsync<TestUser>(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(_testUserStruct);
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _userSessionRepository = new UserSessionRepository(_dbConnectionFactory.Object);
        }

        [Test()]
        public void GenerateSessionTokenSuccess()
        {
            //Arrange
            var testToken = "fw6ISluwyE609VkFFcZ4ug==";
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(1);

            //Act
            var token = _userSessionRepository.GenerateSessionToken(_testUser.Id).Result;

            //Assert
            Assert.NotNull(token);
            Assert.AreEqual(testToken.Length, testToken.Length);
        }

        [Test()]
        public void CheckIfTokenIsValidSuccess()
        {
            //Arrange
            var testToken = "fw6ISluwyE609VkFFcZ4ug==";
            _dbConnection
                .SetupDapperAsync(c =>
                    c.QuerySingleOrDefaultAsync<TestToken>(_testUser.Id.ToString(), new { _testUser.Id, testToken },
                        null,
                        null, null)).ReturnsAsync(_testTokenStruct);

            //Act
            var status = _userSessionRepository.CheckIfTokenIsValid(_testUser.Id, testToken).Result;

            //Assert
            Assert.IsTrue(status);
        }

        [Test()]
        public void CheckIfTokenIsValidFail()
        {
            //Arrange
            var testToken = "fw6ISluwyE609VkFFcZ4ug==";
            _testTokenStruct.ExpiresAt = new DateTime(2023, 11, 23, 15, 0, 0);
            _dbConnection
                .SetupDapperAsync(c =>
                    c.QuerySingleOrDefaultAsync<TestToken>(_testUser.Id.ToString(), new { _testUser.Id, testToken },
                        null,
                        null, null)).ReturnsAsync(_testTokenStruct);

            //Act
            var status = _userSessionRepository.CheckIfTokenIsValid(_testUser.Id, testToken).Result;

            //Assert
            Assert.IsFalse(status);
        }

        [Test()]
        public void DeleteSessionTokenSuccess()
        {
            //Arrange
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(1);

            //Act
            var status = _userSessionRepository.DeleteSessionToken(_testUser.Id, _testTokenStruct.SessionToken).Result;

            //Assert
            Assert.IsTrue(status);
        }

        [Test()]
        public void DeleteSessionTokenFail()
        {
            //Arrange
            _dbConnection.SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(0);

            //Act
            var status = _userSessionRepository.DeleteSessionToken(_testUser.Id, _testTokenStruct.SessionToken).Result;

            //Assert
            Assert.IsFalse(status);
        }
    }
}