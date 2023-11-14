using Microsoft.AspNetCore.Mvc;
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

        [SetUp]
        public void Setup()
        {
            //Mock repos & APIs
            _userRepositoryMock = new Mock<IUserRepository>();
            _recipeCacheRepositoryMock = new RecipeCacheRepositoryMock().cachedRecipeRepositoryMock;
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
            var recipeRequest = new RecipeRequest(It.IsAny<Guid>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<int>(), It.IsAny<List<string>>(), It.IsAny<List<string>>(), It.IsAny<int>());
            var res = new RecipeResponse("testRecipe", Guid.NewGuid());
            _openAiServiceMock.Setup(x => x.GetAiResponse(recipeRequest)).Returns(res);
            controller = new PublicControllerV1(_userRepositoryMock.Object, _openAiServiceMock.Object, _recipeCacheRepositoryMock.Object, _favouriteRecipeRepositoryMock.Object, _cachedOfferRepositoryMock.Object, _emailServiceMock.Object, _userSessionRepositoryMock.Object, _sallingServiceMock.Object, _etilbudsAvisServiceMock.Object);
            
            //Act
            IActionResult actionResult = controller.GetARecipe(recipeRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);

        }

        [Test()]
        public void GetARecipeFromCacheSuccess()
        {

            //Arrange
            var recipeRequest = new RecipeRequest(It.IsAny<Guid>(), It.IsAny<string>(), new List<string>() { "æble", "kartoffel", "julebryg" }, 1, new List<string>() { "fløde" }, new List<string>() { "vegansk" }, It.IsAny<int>());
            var res = new RecipeResponse("testRecipe", Guid.NewGuid());
            _openAiServiceMock.Setup(x => x.GetAiResponse(recipeRequest)).Returns(res);
            _recipeCacheRepositoryMock.Setup(x => x.GetAllRecipes()).Returns(Task.FromResult(new List<string>() { "Æblekage med fløde", "Veganske kartoffelbåde med krydderi, æbler og julebryg", "Test med test på"}));
            _recipeCacheRepositoryMock.Setup(x => x.Upsert("TestRecipe", Guid.NewGuid())).Returns(Task.FromResult(false));
            controller = new PublicControllerV1(_userRepositoryMock.Object, _openAiServiceMock.Object, _recipeCacheRepositoryMock.Object, _favouriteRecipeRepositoryMock.Object, _cachedOfferRepositoryMock.Object, _emailServiceMock.Object, _userSessionRepositoryMock.Object, _sallingServiceMock.Object, _etilbudsAvisServiceMock.Object);

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
            controller = new PublicControllerV1(_userRepositoryMock.Object, _openAiServiceMock.Object, _recipeCacheRepositoryMock.Object, _favouriteRecipeRepositoryMock.Object, _cachedOfferRepositoryMock.Object, _emailServiceMock.Object, _userSessionRepositoryMock.Object, _sallingServiceMock.Object, _etilbudsAvisServiceMock.Object);
            
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
            controller = new PublicControllerV1(_userRepositoryMock.Object, _openAiServiceMock.Object, _recipeCacheRepositoryMock.Object, _favouriteRecipeRepositoryMock.Object, _cachedOfferRepositoryMock.Object, _emailServiceMock.Object, _userSessionRepositoryMock.Object, _sallingServiceMock.Object, _etilbudsAvisServiceMock.Object);

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
            controller = new PublicControllerV1(_userRepositoryMock.Object, _openAiServiceMock.Object, _recipeCacheRepositoryMock.Object, _favouriteRecipeRepositoryMock.Object, _cachedOfferRepositoryMock.Object, _emailServiceMock.Object, _userSessionRepositoryMock.Object, _sallingServiceMock.Object, _etilbudsAvisServiceMock.Object);

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
            controller = new PublicControllerV1(_userRepositoryMock.Object, _openAiServiceMock.Object, _recipeCacheRepositoryMock.Object, _favouriteRecipeRepositoryMock.Object, _cachedOfferRepositoryMock.Object, _emailServiceMock.Object, _userSessionRepositoryMock.Object, _sallingServiceMock.Object, _etilbudsAvisServiceMock.Object);

            //Act
            IActionResult actionResult = controller.GetOffer(offerRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
        }

        [Test()]
        public void GetOfferByStoreIfAvailableFromCacheSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void CreateUserSuccess()
        {
            //Arrange
            controller = new PublicControllerV1(_userRepositoryMock.Object, _openAiServiceMock.Object, _recipeCacheRepositoryMock.Object, _favouriteRecipeRepositoryMock.Object, _cachedOfferRepositoryMock.Object, _emailServiceMock.Object, _userSessionRepositoryMock.Object, _sallingServiceMock.Object, _etilbudsAvisServiceMock.Object);

            //Act

            //Assert

            Assert.Fail();
        }

        [Test()]
        public void LoginSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void LogoutSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void AddFavouriteRecipeSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void GetFavouriteRecipesSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void DeleteFavouriteRecipeSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void ResetPasswordSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void ChangePasswordSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void ConfirmEmailSuccess()
        {
            Assert.Fail();
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