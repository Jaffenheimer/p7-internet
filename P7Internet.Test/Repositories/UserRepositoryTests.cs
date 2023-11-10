using Dapper;
using K4os.Hash.xxHash;
using Moq;
using NUnit.Framework;
using P7Internet.Persistence.UserRepository;
using P7Internet.Shared;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq.Dapper;
using System.Data.Entity.Core.Metadata.Edm;

namespace P7Internet.Repositories.Tests
{
    [TestFixture()]
    public class UserRepositoryTests
    {
        private User _mockUser;
        private string testPwd = "testPassword";
        private Mock<IUserRepository> _userRepositoryMock = new Mock<IUserRepository>();
        private Mock<DbConnection> _dbConnection = new Mock<DbConnection>();
        [SetUp] public void SetUp() {
            _dbConnection.SetupDapperAsync(x => x.QuerySingleOrDefaultAsync<dynamic>(It.IsAny<string>(), null, null, null, null)).Returns<dynamic>(It.IsAny<dynamic>());
            _mockUser = new User("TestUser", "test@example.com") { Id = Guid.NewGuid(), CreatedAt = DateTime.Now, PasswordHash = "hash1234hash", PasswordSalt = "salt1234salt" };
            _userRepositoryMock.Setup(x => x.GetUser(It.IsAny<string>())).Returns(Task.FromResult(It.IsAny<User>())).Verifiable();
            _userRepositoryMock.Setup(x => x.LogIn(It.IsAny<string>(), It.IsAny<string>())).Returns(Task.FromResult(_mockUser));
            _userRepositoryMock.Setup(x => x.ConfirmEmail(It.IsAny<string>(), It.IsAny<string>())).Returns(Task.FromResult(true));
            _userRepositoryMock.Setup(x => x.ResetPassword(It.IsAny<string>(), It.IsAny<string>())).Returns(Task.FromResult(true));
            _userRepositoryMock.Setup(x => x.Upsert(It.IsAny<User>(), It.IsAny<string>())).Returns(Task.FromResult(true));
        }

        [Test()]
        public void GetUserSuccess()
        {
            //Arrange/Act
            var user = _userRepositoryMock.Object.GetUser(It.IsAny<string>());
            
            //Assert
            Assert.NotNull(user);
        }

        [Test()]
        public void UpsertSuccess()
        {
            //Arrange
            var testPwd = "testPassword";

            //Act
            var response = _userRepositoryMock.Object.Upsert(_mockUser, testPwd).Result;

            //Assert
            Assert.NotNull(response);
            Assert.IsTrue(response);
        }

        [Test()]
        public void LogInSuccess()
        {
            //Assert
            var user = _userRepositoryMock.Object.LogIn(_mockUser.Name, testPwd).Result;
            Assert.NotNull(user);
            Assert.That(user.EmailAddress, Is.EqualTo("test@example.com"));
        }

        [Test()]
        public async Task ConfirmEmailSuccess()
        {
            //Arrange/Act
            var status = await _userRepositoryMock.Object.ConfirmEmail(_mockUser.Name, testPwd);
            
            //Assert
            Assert.NotNull(status);
            Assert.True(status);
        }

        [Test()]
        public async Task ResetPasswordSuccess()
        {
            //Arrange/Act
            var status = await _userRepositoryMock.Object.ResetPassword(_mockUser.Name, testPwd);
            //Assert
            Assert.NotNull(status);
            Assert.True(status);
        }

        [Test()]
        public async Task ChangePasswordSuccess()
        {
            //Arrange/Act
            var user = await _userRepositoryMock.Object.ChangePassword(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>());
            //Assert
            Assert.NotNull(user);
        }

        [Test()]
        public void CreateUserSuccess()
        {
            
        }
    }
}