using Dapper;
using Moq;
using NUnit.Framework;
using P7Internet.Persistence.UserRepository;
using P7Internet.Shared;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace P7Internet.Repositories.Tests
{
    [TestFixture()]
    public class UserRepositoryTests
    {
        private User _mockUser;
        private string testPwd = "testPassword";
        private Mock<IUserRepository> _userRepositoryMock = new Mock<IUserRepository>();
        private Mock<IDbConnection> _dbConnection;
        [SetUp] public void SetUp() {
            _dbConnection.Setup(x => x.ExecuteAsync(It.IsAny<string>(), It.IsAny<object>())).Returns(Task.FromResult(1));
            _mockUser = new User("TestUser", "test@example.com") { Id = Guid.NewGuid(), CreatedAt = DateTime.Now, PasswordHash = "hash1234hash", PasswordSalt = "salt1234salt" };
            _userRepositoryMock.Setup(x => x.GetUser(_mockUser.Name)).Returns(Task.FromResult(_mockUser));
            _userRepositoryMock.Setup(x => x.LogIn(_mockUser.Name, It.IsAny<string>())).Returns(Task.FromResult(_mockUser));
            _userRepositoryMock.Setup(x => x.ConfirmEmail(_mockUser.Name, It.IsAny<string>())).Returns(Task.FromResult(true));
            _userRepositoryMock.Setup(x => x.ResetPassword(_mockUser.Name, It.IsAny<string>())).Returns(Task.FromResult(true));
        }

        [Test()]
        public async Task GetUserSuccess()
        {
            //Arrange/Act
            var user = await _userRepositoryMock.Object.GetUser("TestUser");
            //Assert
            Assert.NotNull(user);
        }

        [Test()]
        public async Task UpsertSuccess()
        {
            //Arrange
            var testPwd = "testPassword";

            //Act
            var response = await _userRepositoryMock.Object.Upsert(_mockUser, testPwd);

            //Assert
            Assert.NotNull(response);
            Assert.IsTrue(response);
        }
        [Test()]
        public async Task UpsertFail()
        {
            //Arrange
            var testPwd = "testPassword";
            _mockUser.Name = null;

            //Act
            var response = await _userRepositoryMock.Object.Upsert(_mockUser, testPwd);

            //Assert
            Assert.NotNull(response);
            Assert.IsFalse(response);
        }

        [Test()]
        public async Task LogInSuccess()
        {
            //Assert
            var user = await _userRepositoryMock.Object.LogIn(_mockUser.Name, testPwd);
            _userRepositoryMock.Verify(mock => mock.LogIn(_mockUser.Name, testPwd));
            Assert.NotNull(user);
            Assert.That(user.EmailAddress, Is.EqualTo("test@example.com"));
        }

        [Test()]
        public async Task ConfirmEmailSuccess()
        {
            //Arrange/Act
            var status = await _userRepositoryMock.Object.ConfirmEmail(_mockUser.Name, testPwd);
            _dbConnection.Verify(mock => mock.ExecuteAsync(It.IsAny<string>(), It.IsAny<object>()));
            //Assert
            Assert.NotNull(status);
            Assert.True(status);
        }

        [Test()]
        public async Task ResetPasswordSuccess()
        {
            //Arrange/Act
            var status = await _userRepositoryMock.Object.ResetPassword(_mockUser.Name, testPwd);
            _userRepositoryMock.Verify(mock => mock.ResetPassword(_mockUser.Name, testPwd));
            //Assert
            Assert.NotNull(status);
            Assert.True(status);
        }

        [Test()]
        public void ChangePasswordSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void CreateUserSuccess()
        {
            Assert.Fail();
        }
    }
}