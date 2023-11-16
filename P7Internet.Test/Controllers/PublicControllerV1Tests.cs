﻿using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using P7Internet.Controllers;
using P7Internet.Persistence.CachedIngredientPricesRepository;
using P7Internet.Persistence.FavouriteRecipeRepository;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Persistence.UserRepository;
using P7Internet.Persistence.UserSessionRepository;
using P7Internet.Requests;
using P7Internet.Response;
using P7Internet.Services;
using P7Internet.Shared;
using P7Internet.Test.Mocks;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace P7Internet.Controllers.Tests
{
    [TestFixture()]
    public class PublicControllerV1Tests
    {
        public PublicControllerV1 controller;
        public Mock<IUserRepository> _userRepositoryMock;
        public Mock<IRecipeCacheRepository> _recipeCacheRepositoryMock;
        public Mock<IFavouriteRecipeRepository> _favouriteRecipeRepositoryMock;
        public Mock<ICachedOfferRepository> _cachedOfferRepositoryMock;
        public Mock<IUserSessionRepository> _userSessionRepositoryMock;
        public Mock<OpenAiService> _openAiServiceMock;
        public Mock<ETilbudsAvisService> _etilbudsAvisServiceMock;
        public Mock<EmailService> _emailServiceMock;
        public Mock<SallingService> _sallingServiceMock;
        User _testUser;
        Recipe _testRecipe;
        string _seshToken = "SeshToken";

        [SetUp]
        public void Setup()
        {
            //Mock repos, APIs & and reused variables
            _testRecipe = new Recipe(Guid.Parse("4ef842ac-3ba2-4986-b1fb-9ccc8c1fbeeb"), "TestRecipe", "Test recipe description", new List<string>(){ "TestIngredient1", "TestIngredient2", "TestIngredient3"});
            _testUser = new User("TestUser", "Test@Example.com") { Id = Guid.Parse("833e9c5d-2471-4f40-bbfa-f983ae998075"), CreatedAt = DateTime.Now };
            
            _userRepositoryMock = new Mock<IUserRepository>();
            _recipeCacheRepositoryMock = new RecipeCacheRepositoryMock(_testRecipe).cachedRecipeRepositoryMock;
            _favouriteRecipeRepositoryMock = new Mock<IFavouriteRecipeRepository>();
            _cachedOfferRepositoryMock = new Mock<ICachedOfferRepository>();
            _userSessionRepositoryMock = new Mock<IUserSessionRepository>();
            _openAiServiceMock = new Mock<OpenAiService>();
            _etilbudsAvisServiceMock = new Mock<ETilbudsAvisService>();
            _emailServiceMock = new Mock<EmailService>();
            _sallingServiceMock = new Mock<SallingService>();
            controller = new PublicControllerV1(_userRepositoryMock.Object, _openAiServiceMock.Object, _recipeCacheRepositoryMock.Object, _favouriteRecipeRepositoryMock.Object, _cachedOfferRepositoryMock.Object, _emailServiceMock.Object, _userSessionRepositoryMock.Object, _sallingServiceMock.Object, _etilbudsAvisServiceMock.Object);
        }

        [Test()]
        public void GetARecipeSuccess()
        {

            //Arrange
            var recipeRequest = new RecipeRequest(It.IsAny<Guid>(), It.IsAny<string>(), new List<string>() { "æble", "kartoffel", "julebryg" }, 1, new List<string>() { "fløde" }, new List<string>() { "vegansk" }, It.IsAny<int>());
            var res = new RecipeResponse("testRecipe", Guid.NewGuid());
            _openAiServiceMock.Setup(x => x.GetAiResponse(recipeRequest)).Returns(res);
            
            //Act
            IActionResult actionResult = controller.GetARecipe(recipeRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _openAiServiceMock.Verify(x => x.GetAiResponse(recipeRequest), Times.Once);

        }

        [Test()]
        public void GetARecipeFromCacheSuccess()
        {

            //Arrange
            var recipeRequest = new RecipeRequest(It.IsAny<Guid>(), It.IsAny<string>(), new List<string>() { "æble", "kartoffel", "julebryg" }, 1, new List<string>() { "fløde" }, new List<string>() { "vegansk" }, It.IsAny<int>());
            var res = new RecipeResponse(_testRecipe.Name, Guid.NewGuid());
            _openAiServiceMock.Setup(x => x.GetAiResponse(recipeRequest)).Returns(res);
            //_recipeCacheRepositoryMock.Setup(x => x.GetAllRecipes()).Returns(Task.FromResult(new List<string>() { "Æblekage med fløde", "Veganske kartoffelbåde med krydderi, æbler og julebryg", "Test med test på"}));
            //_recipeCacheRepositoryMock.Setup(x => x.Upsert(_testRecipe.Name, Guid.NewGuid())).Returns(Task.FromResult(false));

            //Act
            IActionResult actionResult = controller.GetARecipe(recipeRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);

        }

        [Test()]
        public void GetRecipeHistorySuccess()
        {
            //Arrange
            var favouriteRecipes = new List<string>() { "Recipe1", "Recipe2" };
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>())).Returns(Task.FromResult(true));
            _favouriteRecipeRepositoryMock.Setup(x => x.GetHistory(It.IsAny<Guid>())).Returns(Task.FromResult(new List<string>() { "FavRecipe1", "FavRecipe2" }));
            _recipeCacheRepositoryMock.Setup(x => x.GetListOfRecipesFromListOfStrings(It.IsAny<List<string>>())).ReturnsAsync(() => new List<string> { "Recipe1", "Recipe2" });
            
            //Act
            IActionResult actionResult = controller.GetRecipeHistory(Guid.NewGuid(), "TestToken").Result;
            var contentResult = actionResult as OkObjectResult;
            
            //Assert
            Assert.NotNull(contentResult);
        }

        [Test()]
        public void GetARecipeWhenLoggedInSuccess()
        {
            //Arrange

            //Act

            //Assert
        }

        [Test()]
        public void GetOfferFromCacheSuccess()
        {
            //Arrange
            _cachedOfferRepositoryMock.Setup(x => x.GetOffer(It.IsAny<string>())).ReturnsAsync(new Offer());

            //Act
            IActionResult actionResult = controller.GetOffer(new OfferRequest(1, "Kylling", 5000, "true")).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
        }

        [Test()]
        public void GetOfferFromEtilbudsavisSuccess()
        {
            //Arrange
            var offerRequest = new OfferRequest(1, "Kylling", 5000, "true");
            _cachedOfferRepositoryMock.Setup(x => x.GetOffer(It.IsAny<string>())).ReturnsAsync(value: null);
            _cachedOfferRepositoryMock.Setup(x => x.UpsertOffer(It.IsAny<string>(), It.IsAny<decimal>(), It.IsAny<string>())).ReturnsAsync(true);
            _etilbudsAvisServiceMock.Setup(x => x.GetAllOffers(offerRequest)).ReturnsAsync(new List<Offer>() { new Offer(), new Offer() });

            //Act
            IActionResult actionResult = controller.GetOffer(offerRequest).Result;
            var contentResult = actionResult as OkObjectResult;
            
            //Assert
            Assert.NotNull(contentResult);
        }

        [Test()]
        public void GetOfferFromSallingSuccessIfNotFoundInCacheOrEtilbudsavisSuccess()
        {
            //Arrange
            var offerRequest = new OfferRequest(1, "Kylling", 5000, "true");
            _cachedOfferRepositoryMock.Setup(x => x.GetOffer(It.IsAny<string>())).ReturnsAsync(value: null);
            _cachedOfferRepositoryMock.Setup(x => x.UpsertOffer(It.IsAny<string>(), It.IsAny<decimal>(), It.IsAny<string>())).ReturnsAsync(true);
            _etilbudsAvisServiceMock.Setup(x => x.GetAllOffers(offerRequest)).ReturnsAsync(value: null);
            _sallingServiceMock.Setup(x => x.GetRelevantProducts(It.IsAny<string>())).ReturnsAsync(new List<Offer>(){ new Offer(), new Offer()});

            //Act
            IActionResult actionResult = controller.GetOffer(offerRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
        }

        [Test()]
        public void GetOfferByStoreIfAvailableFromCacheSuccess()
        {
            //Arrange
            var testIngredient = "Julebryg";
            var testStore = "Bilka";
            _cachedOfferRepositoryMock.Setup(x => x.GetOfferByStore(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(new Offer());

            //Act
            IActionResult actionResult = controller.GetOfferByStoreIfAvailableFromCache(testIngredient, testStore).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _cachedOfferRepositoryMock.Verify(x => x.GetOfferByStore(testIngredient, testStore), Times.Once);

        }

        [Test()]
        public void CreateUserSuccess()
        {
            //Arrange
            var createUserRequest = new CreateUserRequest("TestUser", "Test@example.com", "TestPass");
            var user = new User("TestUser", "Test@example.com") { Id = Guid.NewGuid() };
            _userRepositoryMock.Setup(x => x.CreateUser(It.IsAny<string>(), It.IsAny<string>())).Returns(user);
            _userRepositoryMock.Setup(x => x.Upsert(It.IsAny<User>(), It.IsAny<string>())).ReturnsAsync(true);
            _userSessionRepositoryMock.Setup(x => x.GenerateSessionToken(user.Id)).ReturnsAsync("SeshToken");
            
            //Act
            IActionResult actionResult = controller.CreateUser(createUserRequest).Result;
            var contentResult = actionResult as OkObjectResult;
            var loginResponse = contentResult.Value as LogInResponse;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual(contentResult.Value.GetType(), typeof(LogInResponse));
            Assert.AreEqual(loginResponse.Id, user.Id);
            Assert.AreEqual(loginResponse.Name, user.Name);
            Assert.AreEqual(loginResponse.SessionToken.GetType(), typeof(string));
        }   

        [Test()]
        public void LoginSuccess()
        {
            //Arrange
            var loginRequest = new LogInRequest("TestUser", "TestPass");
            var user = new User("TestUser", "Test@example.com") { Id = Guid.NewGuid() };
            _userRepositoryMock.Setup(x => x.LogIn(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(user);
            _userSessionRepositoryMock.Setup(x => x.GenerateSessionToken(user.Id)).ReturnsAsync("SeshToken");

            //Act
            IActionResult actionResult = controller.Login(loginRequest).Result;
            var contentResult = actionResult as OkObjectResult;
            var loginResponse = contentResult.Value as LogInResponse;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual(contentResult.Value.GetType(), typeof(LogInResponse));
        }

        [Test()]
        public void LogoutSuccess()
        {
            //Arrange
            var logoutRequest = new LogOutRequest(Guid.NewGuid(), _seshToken);
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(logoutRequest.UserId, logoutRequest.SessionToken)).ReturnsAsync(true);
            _userSessionRepositoryMock.Setup(x => x.DeleteSessionToken(logoutRequest.UserId, logoutRequest.SessionToken)).ReturnsAsync(true);

            //Act
            IActionResult actionResult = controller.Logout(logoutRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
        }
        [Test()]
        public void LogoutFailUserNotAuthorized()
        {
            //Arrange
            var logoutRequest = new LogOutRequest(Guid.NewGuid(), _seshToken);
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(logoutRequest.UserId, logoutRequest.SessionToken)).ReturnsAsync(false);
            _userSessionRepositoryMock.Setup(x => x.DeleteSessionToken(logoutRequest.UserId, logoutRequest.SessionToken)).ReturnsAsync(true);

            //Act
            IActionResult actionResult = controller.Logout(logoutRequest).Result;
            var contentResult = actionResult as UnauthorizedObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual("User session is not valid, please login again", contentResult.Value);
        }

        [Test()]
        public void AddFavouriteRecipeSuccess()
        {
            //Arrange
            var addFavouriteRequest = new AddFavouriteRecipeRequest(_testUser.Id, _seshToken, _testRecipe.Id);
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken)).ReturnsAsync(true);
            _favouriteRecipeRepositoryMock.Setup(x => x.Upsert(_testUser.Id, _testRecipe.Id)).ReturnsAsync(true);

            //Act
            IActionResult actionResult = controller.AddFavouriteRecipe(addFavouriteRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _favouriteRecipeRepositoryMock.Verify(x => x.Upsert(_testUser.Id, _testRecipe.Id), Times.Once);
            _userSessionRepositoryMock.Verify(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken), Times.Once);
        }

        [Test()]
        public void GetFavouriteRecipesSuccess()
        {
            //Arrange
            var getFavRecipesReq = new GetFavouriteRecipesRequest(_testUser.Id, _seshToken);
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken)).ReturnsAsync(true);
            _favouriteRecipeRepositoryMock.Setup(x => x.Get(_testUser.Id)).ReturnsAsync(new List<string>() { "TestRecipe1", "TestRecipe2" });

            //Act
            IActionResult actionResult = controller.GetFavouriteRecipes(getFavRecipesReq).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _favouriteRecipeRepositoryMock.Verify(x => x.Get(_testUser.Id), Times.Once);
            _userSessionRepositoryMock.Verify(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken), Times.Once);
        }

        [Test()]
        public void DeleteFavouriteRecipeSuccess()
        {
            var deleteFavouriteReq = new DeleteFavouriteRecipeRequest(_testUser.Id, _seshToken, _testRecipe.Id);
            //Arrange
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken)).ReturnsAsync(true);
            _favouriteRecipeRepositoryMock.Setup(x => x.Delete(_testUser.Id, _testRecipe.Id)).ReturnsAsync(true);

            //Act
            IActionResult actionResult = controller.DeleteFavouriteRecipe(deleteFavouriteReq).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _favouriteRecipeRepositoryMock.Verify(x => x.Delete(_testUser.Id, _testRecipe.Id), Times.Once);
            _userSessionRepositoryMock.Verify(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken), Times.Once);
        }

        [Test()]
        public void ResetPasswordSuccess()
        {
            //Arrange
            _userRepositoryMock.Setup(x => x.GetUser(It.IsAny<string>())).ReturnsAsync(_testUser);

            //Act
            IActionResult actionResult = controller.ResetPassword(_testUser.EmailAddress, _testUser.Name).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _emailServiceMock.Verify(x => x.ResetPassword(_testUser.EmailAddress, _testUser.Name), Times.Once);
        }
        [Test()]
        public void ResetPasswordFailUserNotExist()
        {
            //Arrange
            _userRepositoryMock.Setup(x => x.GetUser(It.IsAny<string>())).ReturnsAsync(value: null);

            //Act
            IActionResult actionResult = controller.ResetPassword(_testUser.EmailAddress, _testUser.Name).Result;
            var contentResult = actionResult as BadRequestObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _emailServiceMock.Verify(x => x.ResetPassword(_testUser.EmailAddress, _testUser.Name), Times.Never);
        }

        [Test()]
        public void ChangePasswordSuccess()
        {
            //Arrange
            var changePasswordReq = new ChangePasswordRequest(_testUser.Id, _seshToken, _testUser.Name, It.IsAny<string>(), It.IsAny<string>());
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>())).ReturnsAsync(true);
            _userRepositoryMock.Setup(x => x.ChangePassword(_testUser.Name, It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);

            //Act
            IActionResult actionResult = controller.ChangePassword(changePasswordReq).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken)).ReturnsAsync(true);
            _userRepositoryMock.Verify(x => x.ChangePassword(_testUser.Name, It.IsAny<string>(), It.IsAny<string>()), Times.Once);
        }

        [Test()]
        public void ConfirmEmailSuccess()
        {
            //Arrange
            var confirmEmailReq = new ConfirmEmailRequest(_testUser.Name, _testUser.EmailAddress);
            _userRepositoryMock.Setup(x => x.ConfirmEmail(_testUser.Name, It.IsAny<string>())).ReturnsAsync(true);

            //Act
            IActionResult actionResult = controller.ConfirmEmail(confirmEmailReq).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
        }

        [Test()]
        public void Example()
        {
            //Arrange

            //Act

            //Assert
        }
    }
}