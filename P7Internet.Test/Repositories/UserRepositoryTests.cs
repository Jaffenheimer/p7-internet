using System;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Moq;
using Moq.Dapper;
using NUnit.Framework;
using P7Internet.Persistence.Connection;
using P7Internet.Persistence.UserRepository;
using P7Internet.Shared;

namespace P7Internet.Test.Repositories
{
    [TestFixture()]
    public class UserRepositoryTests
    {
        private TestUser _testUserStruct;
        private User _testUser;

        //This is created to mock the user class, since the QuerySingleOrDefault method cannot return class instances, but structs. No one knows why
        public struct TestUser
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public string Password_hash { get; set; }
            public string Password_salt { get; set; }
            public DateTime Creation_date { get; set; }
            public bool IsEmailConfirmed { get; set; }

            public TestUser(string name, string emailAddress)
            {
                Name = name;
                Email = emailAddress;
            }
        }

        private Mock<IUserRepository> _userRepositoryMock;
        private IUserRepository _userRepository;
        private Mock<IDbConnection> _dbConnection = new Mock<IDbConnection>();
        private Mock<IDbConnectionFactory> _dbConnectionFactory = new Mock<IDbConnectionFactory>();

        [SetUp]
        public void SetUp()
        {
            _testUserStruct = new TestUser("TestUser", "test@example.com")
            {
                Id = Guid.NewGuid().ToString(), Creation_date = new DateTime(2023, 11, 23),
                Password_hash = new string("FC7179B333C7894D05B21273BF51AA5C14E9AC1CAB68477A3F3C40A8116FD96E"),
                Password_salt = "salt1234salt", Email = "test@example.com", Name = "TestUser", IsEmailConfirmed = false
            };
            _testUser = new User("TestUser", "test@example.com")
            {
                Id = Guid.NewGuid(), CreatedAt = DateTime.Now,
                PasswordHash = "FC7179B333C7894D05B21273BF51AA5C14E9AC1CAB68477A3F3C40A8116FD96E",
                PasswordSalt = "salt1234salt",
                IsEmailConfirmed = false
            };
            _userRepositoryMock = new Mock<IUserRepository>();
            _dbConnection
                .SetupDapperAsync(
                    c => c.QuerySingleOrDefaultAsync<TestUser>(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(_testUserStruct);

            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _userRepository = new UserRepository(_dbConnectionFactory.Object);
        }

        [Test()]
        public void GetUserSuccess()
        {
            //Arrange
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);

            //Act
            var user = _userRepository.GetUser(_testUser.Name).Result;

            //Assert
            Assert.NotNull(user);
            Assert.NotNull(user.Name);
            Assert.AreEqual(_testUser.Name, user.Name);
        }

        [Test()]
        public void GetUserFail()
        {
            User testUser = default;
            //Arrange
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _dbConnection.SetupDapperAsync(x => x.QuerySingleOrDefaultAsync(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(testUser);


            //Act
            var user = _userRepository.GetUser("TestUser2").Result;

            //Assert
            Assert.Null(user);
            Assert.AreNotEqual(_testUser, user);
        }

        [Test()]
        public void GetUserByIdSuccess()
        {
            //Arrange
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);

            //Act
            var user = _userRepository.GetUserFromId(_testUser.Id).Result;

            //Assert
            Assert.NotNull(user);
            Assert.NotNull(user.Name);
        }

        [Test()]
        public void GetUserByIdFail()
        {
            User testUser = default;
            //Arrange
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _dbConnection.SetupDapperAsync(x => x.QuerySingleOrDefaultAsync(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(testUser);


            //Act
            var user = _userRepository.GetUserFromId(Guid.NewGuid()).Result;

            //Assert
            Assert.Null(user);
            Assert.AreNotEqual(_testUser, user);
        }

        [Test()]
        public void GetUserByEmailSuccess()
        {
            //Arrange
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);

            //Act
            var user = _userRepository.GetUserByEmail(_testUser.EmailAddress).Result;

            //Assert
            Assert.NotNull(user);
            Assert.NotNull(user.Name);
        }

        [Test()]
        public void GetUserByEmailFail()
        {
            User testUser = default;
            //Arrange
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _dbConnection.SetupDapperAsync(x => x.QuerySingleOrDefaultAsync(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(testUser);


            //Act
            var user = _userRepository.GetUserByEmail(_testUser.EmailAddress).Result;

            //Assert
            Assert.Null(user);
            Assert.AreNotEqual(_testUser, user);
        }

        [Test()]
        public void UpsertSuccess()
        {
            //Arrange
            var testPwd = "testPassword";
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _dbConnection
                .SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), It.IsAny<object>(), null, null, null))
                .ReturnsAsync(1);
            _dbConnection
                .SetupDapperAsync(c => c.QuerySingleOrDefaultAsync<dynamic>(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(_testUserStruct);

            //Act
            var response = _userRepository.Upsert(_testUser, testPwd);

            //Assert
            Assert.NotNull(response);
        }

        [Test()]
        public void UpsertFail()
        {
            //Arrange
            var testPwd = "testPassword";
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _dbConnection
                .SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), It.IsAny<object>(), null, null, null))
                .ReturnsAsync(0);
            _dbConnection
                .SetupDapperAsync(c => c.QuerySingleOrDefaultAsync<dynamic>(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(_testUserStruct);

            //Act
            var response = _userRepository.Upsert(_testUser, testPwd);

            //Assert
            Assert.IsFalse(response.Result);
        }

        [Test()]
        public void LogInSuccess()
        {
            //Arrange
            var testPwd = "testPassword";
            var testUserStruct = new TestUser("test", "test@test.com")
            {
                Id = Guid.NewGuid().ToString(), Creation_date = new DateTime(2023, 11, 23),
                Password_hash = new string("361D43834C1F83BEF2E1553884C329182F51798228F8FAAF78D7040B9F43A8AB"),
                Password_salt = "salt1234salt", Email = "test@test.com", Name = "TestUser",
                IsEmailConfirmed = false
            };
            _dbConnection
                .SetupDapperAsync(c => c.QueryFirstOrDefaultAsync<TestUser>(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(testUserStruct);

            //Act
            var user = _userRepository.LogIn(testUserStruct.Name, testPwd).Result;

            //Assert
            Assert.NotNull(user);
            Assert.That(user.EmailAddress, Is.EqualTo("test@test.com"));
        }

        [Test()]
        public void LogInFail()
        {
            //Arrange
            var testPwd = "testPassword";
            _dbConnection
                .SetupDapperAsync(c => c.QuerySingleAsync<TestUser>(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(default(TestUser));

            //Act
            var user = _userRepository.LogIn(_testUser.Name, testPwd).Result;

            //Assert
            Assert.Null(user);
        }

        [Test()]
        public async Task ConfirmEmailSuccess()
        {
            //Arrange
            var testPwd = "testPassword";
            _dbConnection
                .SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), It.IsAny<object>(), null, null, null))
                .ReturnsAsync(1);

            //Act
            var status = await _userRepository.ConfirmEmail(_testUser.Name, testPwd);

            //Assert
            Assert.True(status);
        }

        [Test()]
        public async Task ConfirmEmailFail()
        {
            //Arrange
            var testPwd = "testPassword";
            _dbConnection
                .SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), It.IsAny<object>(), null, null, null))
                .ReturnsAsync(0);

            //Act
            var status = await _userRepository.ConfirmEmail(_testUser.Name, testPwd);

            //Assert
            Assert.False(status);
        }

        [Test()]
        public async Task ResetPasswordSuccess()
        {
            //Arrange
            var testPwd = "testPassword";
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _dbConnection
                .SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), It.IsAny<object>(), null, null, null))
                .ReturnsAsync(1);
            //Act
            var status = await _userRepository.ResetPassword(_testUser, testPwd);

            //Assert
            Assert.NotNull(status);
            Assert.IsTrue(status);
        }

        [Test()]
        public void ResetPasswordFail()
        {
            //Arrange
            var testPwd = "testPassword";
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            _dbConnection
                .SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), It.IsAny<object>(), null, null, null))
                .ReturnsAsync(0);

            //Act
            var status = _userRepository.ResetPassword(_testUser, testPwd).Result;

            //Assert
            Assert.IsFalse(status);
        }

        [Test()]
        public void ChangePasswordSuccess()
        {
            Mock<HelperFunctions> helperFunctionsMock = new Mock<HelperFunctions>();
            //Arrange
            _dbConnectionFactory.Setup(x => x.Connection).Returns(_dbConnection.Object);
            helperFunctionsMock.Setup(x => x.GenerateSalt()).Returns("salt1234salt");
            helperFunctionsMock.Setup(x => x.GenerateHash(It.IsAny<string>()))
                .Returns("FC7179B333C7894D05B21273BF51AA5C14E9AC1CAB68477A3F3C40A8116FD96E");
            _dbConnection.SetupDapperAsync(x => x.ExecuteAsync(It.IsAny<string>(), null, null, null, null))
                .ReturnsAsync(1);


            //Act
            var result = _userRepository.ChangePassword(_testUser, It.IsAny<string>(), It.IsAny<string>()).Result;

            //Assert
            Assert.NotNull(result);
            Assert.IsTrue(result);
        }

        [Test()]
        public void ChangePasswordFail()
        {
            //Arrange/Act
            var result = _userRepository.ChangePassword(_testUser, It.IsAny<string>(), It.IsAny<string>())
                .Result;
            //Assert
            Assert.False(result);
        }

        [Test()]
        public void CreateUserSuccess()
        {
            //Arrange/Act
            var user = _userRepository.CreateUser(_testUser.Name, _testUser.EmailAddress);

            //Assert
            Assert.NotNull(user);
        }

        [Test()]
        public void DeleteUserSuccess()
        {
            //Arrange
            _dbConnection
                .SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), It.IsAny<object>(), null, null, null))
                .ReturnsAsync(1);
            //Act
            var result = _userRepository.DeleteUser(_testUser).Result;

            //Assert
            Assert.True(result);
        }

        [Test()]
        public void DeleteUserFail()
        {
            //Arrange
            _dbConnection
                .SetupDapperAsync(c => c.ExecuteAsync(It.IsAny<string>(), It.IsAny<object>(), null, null, null))
                .ReturnsAsync(0);
            //Act
            var result = _userRepository.DeleteUser(_testUser).Result;

            //Assert
            Assert.False(result);
        }
    }
}