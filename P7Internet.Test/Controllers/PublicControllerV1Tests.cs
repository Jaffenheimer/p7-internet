using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using P7Internet.Controllers;
using P7Internet.Persistence.CachedIngredientPricesRepository;
using P7Internet.Persistence.FavouriteRecipeRepository;
using P7Internet.Persistence.IngredientRepository;
using P7Internet.Persistence.RecipeCacheRepository;
using P7Internet.Persistence.UserRepository;
using P7Internet.Persistence.UserSessionRepository;
using P7Internet.Requests;
using P7Internet.Response;
using P7Internet.Services;
using P7Internet.Shared;

namespace P7Internet.Test.Controllers
{
    [TestFixture()]
    public class PublicControllerV1Tests
    {
        private PublicControllerV1 controller;
        private Mock<IUserRepository> _userRepositoryMock;
        private Mock<IRecipeCacheRepository> _recipeCacheRepositoryMock;
        private Mock<IFavouriteRecipeRepository> _favouriteRecipeRepositoryMock;
        private Mock<ICachedOfferRepository> _cachedOfferRepositoryMock;
        private Mock<IUserSessionRepository> _userSessionRepositoryMock;
        private Mock<OpenAiService> _openAiServiceMock;
        private Mock<ETilbudsAvisService> _etilbudsAvisServiceMock;
        private Mock<EmailService> _emailServiceMock;
        private Mock<SallingService> _sallingServiceMock;
        private Mock<IIngredientRepository> _iIngredientRepositoryMock;
        private User _testUser;
        private Recipe _testRecipe;
        private string _seshToken = "SeshToken";

        private List<Recipe> _testRecipes = new List<Recipe>()
        {
            new Recipe(Guid.NewGuid(), "Æblekage med fløde"),
            new Recipe(Guid.NewGuid(), "Veganske kartoffelbåde med krydderi, æbler og julebryg"),
            new Recipe(Guid.NewGuid(), "Test med test på")
        };


        [SetUp]
        public void Setup()
        {
            //Mock repos, APIs & and reused variables
            _testRecipe = new Recipe(Guid.Parse("4ef842ac-3ba2-4986-b1fb-9ccc8c1fbeeb"), "Test recipe description");
            _testUser = new User("TestUser", "Test@Example.com")
                {Id = Guid.Parse("833e9c5d-2471-4f40-bbfa-f983ae998075"), CreatedAt = DateTime.Now};

            _userRepositoryMock = new Mock<IUserRepository>();
            _recipeCacheRepositoryMock = new Mock<IRecipeCacheRepository>();
            _favouriteRecipeRepositoryMock = new Mock<IFavouriteRecipeRepository>();
            _cachedOfferRepositoryMock = new Mock<ICachedOfferRepository>();
            _userSessionRepositoryMock = new Mock<IUserSessionRepository>();
            _openAiServiceMock = new Mock<OpenAiService>();
            _etilbudsAvisServiceMock = new Mock<ETilbudsAvisService>();
            _emailServiceMock = new Mock<EmailService>();
            _sallingServiceMock = new Mock<SallingService>();
            _iIngredientRepositoryMock = new Mock<IIngredientRepository>();
            controller = new PublicControllerV1(_userRepositoryMock.Object, _openAiServiceMock.Object,
                _recipeCacheRepositoryMock.Object, _favouriteRecipeRepositoryMock.Object,
                _cachedOfferRepositoryMock.Object, _emailServiceMock.Object, _userSessionRepositoryMock.Object,
                _iIngredientRepositoryMock.Object, _sallingServiceMock.Object, _etilbudsAvisServiceMock.Object);
        }

        [Test()]
        public void GetARecipeGeneratedByChatGPTSuccess()
        {
            //Arrange
            var recipeRequest = new RecipeRequest(It.IsAny<Guid>(), It.IsAny<string>(),
                new List<string>() {"æble", "kartoffel", "julebryg"}, 1, new List<string>() {"fløde"},
                new List<string>() {"vegansk"}, It.IsAny<int>());
            var res = new RecipeResponse(_testRecipe.Description, null, _testRecipe.Id);
            _recipeCacheRepositoryMock.Setup(x => x.GetAllRecipes()).ReturnsAsync(new List<Recipe>());
            _recipeCacheRepositoryMock.Setup(x => x.Upsert(_testRecipe.Description, _testRecipe.Id))
                .Returns(Task.FromResult(true));
            _iIngredientRepositoryMock.Setup(x => x.GetAllIngredients()).Returns(Task.FromResult(new List<string>()
                {"Æble, Kartoffel, Julebryg, Fløde, Vegansk"}));
            _openAiServiceMock.Setup(x => x.GetAiResponse(recipeRequest)).ReturnsAsync(res);

            //Act
            IActionResult actionResult = controller.GetARecipe(recipeRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _openAiServiceMock.Verify(x => x.GetAiResponse(recipeRequest), Times.Once);
            _recipeCacheRepositoryMock.Verify(x => x.Upsert(_testRecipe.Description, _testRecipe.Id), Times.Once);
        }

        [Test()]
        public void GetARecipeFromCacheSuccess()
        {
            //Arrange
            var recipeRequest = new RecipeRequest(It.IsAny<Guid>(), It.IsAny<string>(),
                new List<string>() {"æble", "kartoffel", "julebryg"}, 1, new List<string>() {"fløde"},
                new List<string>() {"vegansk"}, It.IsAny<int>());
            var res = new RecipeResponse(_testRecipe.Description, null, Guid.NewGuid());
            _openAiServiceMock.Setup(x => x.GetAiResponse(recipeRequest)).ReturnsAsync(res);
            _recipeCacheRepositoryMock.Setup(x => x.GetAllRecipes()).Returns(Task.FromResult(new List<Recipe>()
            {
                new Recipe(Guid.NewGuid(), "Æblekage med fløde"),
                new Recipe(Guid.NewGuid(), "Veganske kartoffelbåde med krydderi, æbler og julebryg"),
                new Recipe(Guid.NewGuid(), "Test med test på")
            }));
            _iIngredientRepositoryMock.Setup(x => x.GetAllIngredients()).Returns(Task.FromResult(new List<string>()
                {"Æble, Kartoffel, Julebryg, Fløde, Vegansk"}));
            _recipeCacheRepositoryMock.Setup(x => x.Upsert(_testRecipe.Description, _testRecipe.Id))
                .Returns(Task.FromResult(false));

            //Act
            var actionResult = controller.GetARecipe(recipeRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _recipeCacheRepositoryMock.Verify(x => x.GetAllRecipes(), Times.Once);
            _openAiServiceMock.Verify(x => x.GetAiResponse(recipeRequest), Times.Never);
        }

        [Test()]
        public void GetRecipeHistorySuccess()
        {
            //Arrange
            var favouriteRecipes = new List<string>() {"Recipe1", "Recipe2"};
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>()))
                .Returns(Task.FromResult(true));
            _favouriteRecipeRepositoryMock.Setup(x => x.GetHistory(It.IsAny<Guid>()))
                .Returns(Task.FromResult(new List<string>() {"FavRecipe1", "FavRecipe2"}));
            _recipeCacheRepositoryMock.Setup(x => x.GetListOfRecipesFromListOfStrings(It.IsAny<List<string>>()))
                .ReturnsAsync(() => new List<string> {"Recipe1", "Recipe2"});

            //Act
            IActionResult actionResult = controller.GetRecipeHistory(Guid.NewGuid(), "TestToken").Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
        }

        [Test()]
        public void GetRecipeHistoryFailUserNotAuthorized()
        {
            //Arrange
            var favouriteRecipes = new List<string>() {"Recipe1", "Recipe2"};
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>()))
                .Returns(Task.FromResult(false));
            _favouriteRecipeRepositoryMock.Setup(x => x.GetHistory(It.IsAny<Guid>()))
                .Returns(Task.FromResult(new List<string>() {"FavRecipe1", "FavRecipe2"}));
            _recipeCacheRepositoryMock.Setup(x => x.GetListOfRecipesFromListOfStrings(It.IsAny<List<string>>()))
                .ReturnsAsync(() => new List<string> {"Recipe1", "Recipe2"});

            //Act
            IActionResult actionResult = controller.GetRecipeHistory(Guid.NewGuid(), "TestToken").Result;
            var contentResult = actionResult as UnauthorizedObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual("User session is not valid, please login again", contentResult.Value);
        }

        [Test()]
        public void GetRecipeHistoryFailNoHistoryFound()
        {
            //Arrange
            var favouriteRecipes = new List<string>() {"Recipe1", "Recipe2"};
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>()))
                .Returns(Task.FromResult(true));
            _favouriteRecipeRepositoryMock.Setup(x => x.GetHistory(It.IsAny<Guid>()))
                .Returns(Task.FromResult(new List<string>()));

            //Act
            IActionResult actionResult = controller.GetRecipeHistory(Guid.NewGuid(), "TestToken").Result;
            var contentResult = actionResult as NotFoundObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual("No history found", contentResult.Value);
            _userSessionRepositoryMock.Verify(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>()),
                Times.Once);
            _favouriteRecipeRepositoryMock.Verify(x => x.GetHistory(It.IsAny<Guid>()), Times.Once);
        }

        [Test()]
        public void GetARecipeWhenLoggedInSuccess()
        {
            //Arrange
            var recipeRequest = new RecipeRequest(It.IsAny<Guid>(), It.IsAny<string>(),
                new List<string>() {"æble", "kartoffel", "julebryg"}, 1, new List<string>() {"fløde"},
                new List<string>() {"vegansk"}, It.IsAny<int>());
            var res = new RecipeResponse(_testRecipe.Description, null, Guid.NewGuid());
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>()))
                .Returns(Task.FromResult(true));
            _openAiServiceMock.Setup(x => x.GetAiResponse(recipeRequest)).ReturnsAsync(res);
            _recipeCacheRepositoryMock.Setup(x => x.GetAllRecipes()).Returns(Task.FromResult(new List<Recipe>()
            {
                new Recipe(Guid.NewGuid(), "Æblekage med fløde"),
                new Recipe(Guid.NewGuid(), "Veganske kartoffelbåde med krydderi, æbler og julebryg"),
                new Recipe(Guid.NewGuid(), "Test med test på")
            }));
            _iIngredientRepositoryMock.Setup(x => x.GetAllIngredients()).Returns(Task.FromResult(new List<string>()
                {"Æble, Kartoffel, Julebryg, Fløde, Vegansk"}));
            _recipeCacheRepositoryMock.Setup(x => x.Upsert(_testRecipe.Description, _testRecipe.Id))
                .Returns(Task.FromResult(false));

            //Act
            var actionResult = controller.GetARecipeWhenLoggedIn(recipeRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
        }

        [Test()]
        public void GetARecipeWhenLoggedInFail()
        {
            //Arrange
            var recipeRequest = new RecipeRequest(It.IsAny<Guid>(), It.IsAny<string>(),
                new List<string>() {"æble", "kartoffel", "julebryg"}, 1, new List<string>() {"fløde"},
                new List<string>() {"vegansk"}, It.IsAny<int>());
            var res = new RecipeResponse(_testRecipe.Description, null, Guid.NewGuid());
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>()))
                .Returns(Task.FromResult(false));
            _openAiServiceMock.Setup(x => x.GetAiResponse(recipeRequest)).ReturnsAsync(res);
            _recipeCacheRepositoryMock.Setup(x => x.GetAllRecipes()).Returns(Task.FromResult(new List<Recipe>()
            {
                new Recipe(Guid.NewGuid(), "Æblekage med fløde"),
                new Recipe(Guid.NewGuid(), "Veganske kartoffelbåde med krydderi, æbler og julebryg"),
                new Recipe(Guid.NewGuid(), "Test med test på")
            }));
            _iIngredientRepositoryMock.Setup(x => x.GetAllIngredients()).Returns(Task.FromResult(new List<string>()
                {"Æble, Kartoffel, Julebryg, Fløde, Vegansk"}));
            _recipeCacheRepositoryMock.Setup(x => x.Upsert(_testRecipe.Description, _testRecipe.Id))
                .Returns(Task.FromResult(false));

            //Act
            var actionResult = controller.GetARecipeWhenLoggedIn(recipeRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.Null(contentResult);
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
        public void GetOfferFromCacheFail()
        {
            //Arrange
            _cachedOfferRepositoryMock.Setup(x => x.GetOffer(It.IsAny<string>())).ReturnsAsync(value: null);

            //Act
            IActionResult actionResult = controller.GetOffer(new OfferRequest(1, "Kylling", 5000, "true")).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.Null(contentResult);
            _cachedOfferRepositoryMock.Verify(x => x.GetOffer(It.IsAny<string>()), Times.Once);
        }

        [Test()]
        public void GetOfferFromEtilbudsavisSuccess()
        {
            //Arrange
            var offerRequest = new OfferRequest(1, "Kylling", 5000, "true");
            _cachedOfferRepositoryMock.Setup(x => x.GetOffer(It.IsAny<string>())).ReturnsAsync(value: null);
            _cachedOfferRepositoryMock
                .Setup(x => x.UpsertOffer(It.IsAny<string>(), It.IsAny<decimal>(), It.IsAny<string>()))
                .ReturnsAsync(true);
            _etilbudsAvisServiceMock.Setup(x => x.GetAllOffers(offerRequest))
                .ReturnsAsync(new List<Offer>() {new Offer(), new Offer()});

            //Act
            IActionResult actionResult = controller.GetOffer(offerRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _cachedOfferRepositoryMock.Verify(
                x => x.UpsertOffer(It.IsAny<string>(), It.IsAny<decimal>(), It.IsAny<string>()), Times.AtLeastOnce);
            _cachedOfferRepositoryMock.Verify(x => x.GetOffer(It.IsAny<string>()), Times.Once);
            _etilbudsAvisServiceMock.Verify(x => x.GetAllOffers(offerRequest), Times.Once);
        }

        [Test()]
        public void GetOfferFromEtilbudsavisFail()
        {
            //Arrange
            var offerRequest = new OfferRequest(1, "Kylling", 5000, "true");
            _cachedOfferRepositoryMock.Setup(x => x.GetOffer(It.IsAny<string>())).ReturnsAsync(value: null);
            _etilbudsAvisServiceMock.Setup(x => x.GetAllOffers(offerRequest)).ReturnsAsync(value: null);

            //Act
            IActionResult actionResult = controller.GetOffer(offerRequest).Result;
            var contentResult = actionResult as BadRequestObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual("No offer found", contentResult.Value);
            _cachedOfferRepositoryMock.Verify(x => x.GetOffer(It.IsAny<string>()), Times.Once);
            _etilbudsAvisServiceMock.Verify(x => x.GetAllOffers(offerRequest), Times.Once);
        }


        [Test()]
        public void GetOfferFromSallingSuccessIfNotFoundInCacheOrEtilbudsavisSuccess()
        {
            //Arrange
            var offerRequest = new OfferRequest(1, "Kylling", 5000, "true");
            _cachedOfferRepositoryMock.Setup(x => x.GetOffer(It.IsAny<string>())).ReturnsAsync(value: null);
            _cachedOfferRepositoryMock
                .Setup(x => x.UpsertOffer(It.IsAny<string>(), It.IsAny<decimal>(), It.IsAny<string>()))
                .ReturnsAsync(true);
            _etilbudsAvisServiceMock.Setup(x => x.GetAllOffers(offerRequest)).ReturnsAsync(value: null);
            _sallingServiceMock.Setup(x => x.GetRelevantProducts(It.IsAny<string>()))
                .ReturnsAsync(new List<Offer>() {new Offer(), new Offer()});

            //Act
            IActionResult actionResult = controller.GetOffer(offerRequest).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _cachedOfferRepositoryMock.Verify(x => x.GetOffer(It.IsAny<string>()), Times.AtLeastOnce);
            _etilbudsAvisServiceMock.Verify(x => x.GetAllOffers(offerRequest), Times.Once);
            _sallingServiceMock.Verify(x => x.GetRelevantProducts(It.IsAny<string>()), Times.Once);
            _cachedOfferRepositoryMock.Verify(
                x => x.UpsertOffer(It.IsAny<string>(), It.IsAny<decimal>(), It.IsAny<string>()), Times.AtLeastOnce);
        }

        [Test()]
        public void GetOfferFromSallingSuccessIfNotFoundInCacheOrEtilbudsavisFail()
        {
            //Arrange
            var offerRequest = new OfferRequest(1, "Kylling", 5000, "true");
            _cachedOfferRepositoryMock.Setup(x => x.GetOffer(It.IsAny<string>())).ReturnsAsync(value: null);
            _iIngredientRepositoryMock.Setup(x => x.GetAllIngredients()).Returns(Task.FromResult(new List<string>()
                {"Æble, Kartoffel, Julebryg, Fløde, Vegansk"}));
            _etilbudsAvisServiceMock.Setup(x => x.GetAllOffers(offerRequest)).ReturnsAsync(value: null);
            _sallingServiceMock.Setup(x => x.GetRelevantProducts(It.IsAny<string>()))
                .ReturnsAsync(value: null);

            //Act
            IActionResult actionResult = controller.GetOffer(offerRequest).Result;
            var contentResult = actionResult as BadRequestObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual("No offer found", contentResult.Value);
            _cachedOfferRepositoryMock.Verify(x => x.GetOffer(It.IsAny<string>()), Times.Once);
            _etilbudsAvisServiceMock.Verify(x => x.GetAllOffers(offerRequest), Times.Once);
            _sallingServiceMock.Verify(x => x.GetRelevantProducts(It.IsAny<string>()), Times.Once);
        }

        [Test()]
        public void GetOfferByStoreIfAvailableFromCacheSuccess()
        {
            //Arrange
            var testIngredient = "Julebryg";
            var testStore = "Bilka";
            _cachedOfferRepositoryMock.Setup(x => x.GetOfferByStore(It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(new Offer());

            //Act
            IActionResult actionResult =
                controller.GetOfferByStoreIfAvailableFromCache(testIngredient, testStore).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _cachedOfferRepositoryMock.Verify(x => x.GetOfferByStore(testIngredient, testStore), Times.Once);
        }

        [Test()]
        public void GetOfferByStoreIfAvailableFromCacheFail()
        {
            //Arrange
            var testIngredient = "Julebryg";
            var testStore = "Bilka";
            _cachedOfferRepositoryMock.Setup(x => x.GetOfferByStore(It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(value: null);

            //Act
            IActionResult actionResult =
                controller.GetOfferByStoreIfAvailableFromCache(testIngredient, testStore).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.Null(contentResult);
            _cachedOfferRepositoryMock.Verify(x => x.GetOfferByStore(testIngredient, testStore), Times.Once);
        }

        [Test()]
        public void CreateUserSuccess()
        {
            //Arrange
            var createUserRequest = new CreateUserRequest("TestUser", "Test@example.com", "TestPass");
            var user = new User("TestUser", "Test@example.com") {Id = Guid.NewGuid()};
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
        public void CreateUserFailUserAlreadyExists()
        {
            //Arrange
            _userRepositoryMock.Setup(x => x.CreateUser(It.IsAny<string>(), It.IsAny<string>())).Returns(_testUser);
            _userRepositoryMock.Setup(x => x.Upsert(_testUser, It.IsAny<string>())).ReturnsAsync(false);

            //Act
            IActionResult actionResult = controller
                .CreateUser(new CreateUserRequest(_testUser.Name, _testUser.EmailAddress, "TestPass")).Result;
            var contentResult = actionResult as BadRequestObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual(
                "User with the specified Username or Email already exists, please choose another Username or Email",
                contentResult.Value);
            _userRepositoryMock.Verify(x => x.CreateUser(It.IsAny<string>(), It.IsAny<string>()), Times.Once);
            _userRepositoryMock.Verify(x => x.Upsert(_testUser, It.IsAny<string>()), Times.Once);
        }

        [Test()]
        public void LoginSuccess()
        {
            //Arrange
            var loginRequest = new LogInRequest("TestUser", "TestPass");
            var user = new User("TestUser", "Test@example.com") {Id = Guid.NewGuid()};
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
        public void LoginFailUserNotFound()
        {
            //Arrange
            var loginRequest = new LogInRequest("TestUser", "TestPass");
            _userRepositoryMock.Setup(x => x.LogIn(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(value: null);

            //Act
            IActionResult actionResult = controller.Login(loginRequest).Result;
            var contentResult = actionResult as BadRequestObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual("Username or password is incorrect please try again", contentResult.Value);
        }

        [Test()]
        public void LogoutSuccess()
        {
            //Arrange
            var logoutRequest = new LogOutRequest(Guid.NewGuid(), _seshToken);
            _userSessionRepositoryMock
                .Setup(x => x.CheckIfTokenIsValid(logoutRequest.UserId, logoutRequest.SessionToken)).ReturnsAsync(true);
            _userSessionRepositoryMock
                .Setup(x => x.DeleteSessionToken(logoutRequest.UserId, logoutRequest.SessionToken)).ReturnsAsync(true);

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
            _userSessionRepositoryMock
                .Setup(x => x.CheckIfTokenIsValid(logoutRequest.UserId, logoutRequest.SessionToken))
                .ReturnsAsync(false);
            _userSessionRepositoryMock
                .Setup(x => x.DeleteSessionToken(logoutRequest.UserId, logoutRequest.SessionToken)).ReturnsAsync(true);

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
        public void AddFavouriteRecipeFailUserNotAuthorized()
        {
            //Arrange
            var addFavouriteRequest = new AddFavouriteRecipeRequest(_testUser.Id, _seshToken, _testRecipe.Id);
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken)).ReturnsAsync(false);
            _favouriteRecipeRepositoryMock.Setup(x => x.Upsert(_testUser.Id, _testRecipe.Id)).ReturnsAsync(true);

            //Act
            IActionResult actionResult = controller.AddFavouriteRecipe(addFavouriteRequest).Result;
            var contentResult = actionResult as UnauthorizedObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual("User session is not valid, please login again", contentResult.Value);
            _favouriteRecipeRepositoryMock.Verify(x => x.Upsert(_testUser.Id, _testRecipe.Id), Times.Never);
            _userSessionRepositoryMock.Verify(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken), Times.Once);
        }

        [Test()]
        public void GetFavouriteRecipesSuccess()
        {
            //Arrange
            var getFavRecipesReq = new GetFavouriteRecipesRequest(_testUser.Id, _seshToken);
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken)).ReturnsAsync(true);
            _favouriteRecipeRepositoryMock.Setup(x => x.Get(_testUser.Id))
                .ReturnsAsync(new List<string>() {"TestRecipe1", "TestRecipe2"});

            //Act
            IActionResult actionResult = controller.GetFavouriteRecipes(getFavRecipesReq).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _favouriteRecipeRepositoryMock.Verify(x => x.Get(_testUser.Id), Times.Once);
            _userSessionRepositoryMock.Verify(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken), Times.Once);
        }

        [Test()]
        public void GetFavouriteRecipesFailUserNotAuthorized()
        {
            //Arrange
            var getFavRecipesReq = new GetFavouriteRecipesRequest(_testUser.Id, _seshToken);
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken)).ReturnsAsync(false);
            _favouriteRecipeRepositoryMock.Setup(x => x.Get(_testUser.Id))
                .ReturnsAsync(new List<string>() {"TestRecipe1", "TestRecipe2"});

            //Act
            IActionResult actionResult = controller.GetFavouriteRecipes(getFavRecipesReq).Result;
            var contentResult = actionResult as UnauthorizedObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual("User session is not valid, please login again", contentResult.Value);
            _favouriteRecipeRepositoryMock.Verify(x => x.Get(_testUser.Id), Times.Never);
            _userSessionRepositoryMock.Verify(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken), Times.Once);
        }

        [Test()]
        public void GetFavouriteRecipesFailNoRecipesFound()
        {
            //Arrange
            var getFavRecipesReq = new GetFavouriteRecipesRequest(_testUser.Id, _seshToken);
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken)).ReturnsAsync(true);
            _favouriteRecipeRepositoryMock.Setup(x => x.Get(_testUser.Id))
                .ReturnsAsync(new List<string>());

            //Act
            IActionResult actionResult = controller.GetFavouriteRecipes(getFavRecipesReq).Result;
            var contentResult = actionResult as NotFoundObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual("No favourite recipes found", contentResult.Value);
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
        public void DeleteFavouriteRecipeFailUserNotAuthorized()
        {
            var deleteFavouriteReq = new DeleteFavouriteRecipeRequest(_testUser.Id, _seshToken, _testRecipe.Id);
            //Arrange
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken)).ReturnsAsync(false);
            _favouriteRecipeRepositoryMock.Setup(x => x.Delete(_testUser.Id, _testRecipe.Id)).ReturnsAsync(true);

            //Act
            IActionResult actionResult = controller.DeleteFavouriteRecipe(deleteFavouriteReq).Result;
            var contentResult = actionResult as UnauthorizedObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual("User session is not valid, please login again", contentResult.Value);
            _favouriteRecipeRepositoryMock.Verify(x => x.Delete(_testUser.Id, _testRecipe.Id), Times.Never);
            _userSessionRepositoryMock.Verify(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken), Times.Once);
        }

        [Test()]
        public void ResetPasswordSuccess()
        {
            //Arrange
            _userSessionRepositoryMock.Setup(x => x.VerificationCodeTypeMatchesAction(_seshToken, It.IsAny<string>()))
                .ReturnsAsync(true);
            _userSessionRepositoryMock.Setup(x => x.GetUserIdFromVerificationCode(_seshToken))
                .ReturnsAsync(_testUser.Id);
            _userRepositoryMock.Setup(x => x.GetUserFromId(_testUser.Id)).ReturnsAsync(_testUser);
            _userRepositoryMock.Setup(x => x.ResetPassword(_testUser.EmailAddress, It.IsAny<string>()))
                .ReturnsAsync(true);
            _userSessionRepositoryMock.Setup(x => x.DeleteVerificationToken(_testUser.Id, _seshToken))
                .ReturnsAsync(true);
            //Act
            IActionResult actionResult = controller.ResetPassword("test", _seshToken).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
        }

        [Test()]
        public void ResetPasswordFailUserNotExist()
        {
            //Arrange
            _userSessionRepositoryMock.Setup(x => x.VerificationCodeTypeMatchesAction(_seshToken, It.IsAny<string>()))
                .ReturnsAsync(true);
            _userSessionRepositoryMock.Setup(x => x.GetUserIdFromVerificationCode(It.IsAny<string>()))
                .ReturnsAsync(value: null);

            //Act
            IActionResult actionResult = controller.ResetPassword(It.IsAny<string>(), _seshToken).Result;
            var contentResult = actionResult as BadRequestObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _userSessionRepositoryMock.Verify(x => x.GetUserIdFromVerificationCode(_seshToken), Times.Once);
            _userSessionRepositoryMock.Verify(x => x.VerificationCodeTypeMatchesAction(_seshToken, It.IsAny<string>()),
                Times.Once);
        }

        [Test()]
        public void ChangePasswordSuccess()
        {
            //Arrange
            var changePasswordReq = new ChangePasswordRequest(_testUser.Id, _seshToken, _testUser.Name,
                It.IsAny<string>(), It.IsAny<string>());
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>()))
                .ReturnsAsync(true);
            _userRepositoryMock.Setup(x => x.ChangePassword(_testUser.Name, It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(true);

            //Act
            IActionResult actionResult = controller.ChangePassword(changePasswordReq).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(_testUser.Id, _seshToken)).ReturnsAsync(true);
            _userRepositoryMock.Verify(x => x.ChangePassword(_testUser.Name, It.IsAny<string>(), It.IsAny<string>()),
                Times.Once);
        }

        [Test()]
        public void ChangePasswordFailUserNotAuthorized()
        {
            //Arrange
            var changePasswordReq = new ChangePasswordRequest(_testUser.Id, _seshToken, _testUser.Name,
                It.IsAny<string>(), It.IsAny<string>());
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>()))
                .ReturnsAsync(false);

            //Act
            IActionResult actionResult = controller.ChangePassword(changePasswordReq).Result;
            var contentResult = actionResult as UnauthorizedObjectResult;

            //Assert
            Assert.NotNull(contentResult);
            Assert.AreEqual("User session is not valid, please login again", contentResult.Value);
        }

        [Test()]
        public void ChangePasswordIncorrectPassword()
        {
            //Arrange
            var changePasswordReq = new ChangePasswordRequest(_testUser.Id, _seshToken, _testUser.Name,
                It.IsAny<string>(), It.IsAny<string>());
            _userSessionRepositoryMock.Setup(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>()))
                .ReturnsAsync(true);
            _userRepositoryMock.Setup(x => x.ChangePassword(_testUser.Name, It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(false);

            //Act
            IActionResult actionResult = controller.ChangePassword(changePasswordReq).Result;
            var contentResult = actionResult as BadRequestObjectResult;

            //Assert
            Assert.AreEqual("Password is incorrect please try again", contentResult.Value);
            _userSessionRepositoryMock.Verify(x => x.CheckIfTokenIsValid(It.IsAny<Guid>(), It.IsAny<string>()),
                Times.Once);
            _userRepositoryMock.Verify(x => x.ChangePassword(_testUser.Name, It.IsAny<string>(), It.IsAny<string>()),
                Times.Once);
        }

        [Test()]
        public void ConfirmEmailSuccess()
        {
            //Arrange
            var confirmEmailReq = new ConfirmEmailRequest(_testUser.Name, _testUser.EmailAddress);
            _userRepositoryMock.Setup(x => x.GetUserFromId(_testUser.Id)).ReturnsAsync(_testUser);
            _userSessionRepositoryMock.Setup(x => x.VerificationCodeTypeMatchesAction(_seshToken, It.IsAny<string>()))
                .ReturnsAsync(true);
            _userRepositoryMock.Setup(x => x.ConfirmEmail(_testUser.Name, _testUser.EmailAddress)).ReturnsAsync(true);
            _userSessionRepositoryMock.Setup(x => x.DeleteVerificationToken(_testUser.Id, _seshToken))
                .ReturnsAsync(true);

            //Act
            IActionResult actionResult = controller.ConfirmEmail(_testUser.Id, _seshToken).Result;
            var contentResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(contentResult);
        }

        [Test()]
        public void ConfirmEmailFailUserNotExist()
        {
            //Arrange
            _userSessionRepositoryMock.Setup(x => x.VerificationCodeTypeMatchesAction(_seshToken, It.IsAny<string>()))
                .ReturnsAsync(true);
            _userSessionRepositoryMock.Setup(x => x.GetUserIdFromVerificationCode(It.IsAny<string>()))
                .ReturnsAsync(value: null);

            //Act
            IActionResult actionResult = controller.ConfirmEmail(It.IsAny<Guid>(), _seshToken).Result;
            var contentResult = actionResult as BadRequestObjectResult;

            //Assert
            Assert.NotNull(contentResult);
        }
    }
}