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
using P7Internet.Services;
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
        public RecipeRequest recipeRequest = new RecipeRequest(It.IsAny<Guid>(), It.IsAny<string>(), It.IsAny<List<string>>(), It.IsAny<int>(), It.IsAny<List<string>>(), It.IsAny<List<string>>(), It.IsAny<int>());
        [OneTimeSetUp]
        public void Setup()
        {
            //Mock repos
            var _userRepositoryMock = new Mock<IUserRepository>();
            var _cachedRecipeRepositoryMock = new RecipeCacheRepositoryMock().cachedRecipeRepositoryMock;
            var _favouriteRecipeRepositoryMock = new Mock<IFavouriteRecipeRepository>();
            var _cachedOfferRepositoryMock = new Mock<ICachedOfferRepository>();
            var _userSessionRepositoryMock = new Mock<IUserSessionRepository>();
            var _openAiServiceMock = new Mock<OpenAiService>();
            var _eTilbudsAvisServiceMock = new Mock<ETilbudsAvisService>();
            var _emailServiceMock = new Mock<EmailService>();
            var _sallingServiceMock = new Mock<SallingService>();
            controller = new PublicControllerV1(_userRepositoryMock.Object, _openAiServiceMock.Object, _cachedRecipeRepositoryMock.Object, _favouriteRecipeRepositoryMock.Object, _cachedOfferRepositoryMock.Object, _emailServiceMock.Object, _userSessionRepositoryMock.Object, _sallingServiceMock.Object);
        }

        [Test()]
        public void GetARecipeSuccess()
        {
            //Arrange
            var req = recipeRequest;

            //Act
            IActionResult actionResult = controller.GetARecipe(req).Result;
            var contentResult = actionResult as OkNegotiatedContentResult<List<string>>;

            //Assert
            Assert.NotNull(contentResult);
            Assert.NotNull(contentResult.Content);

        }

        [Test()]
        public void GetRecipeHistorySuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void GetARecipeWhenLoggedInSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void GetOfferSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void GetOfferByStoreIfAvailableFromCacheSuccess()
        {
            Assert.Fail();
        }

        [Test()]
        public void CreateUserSuccess()
        {
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