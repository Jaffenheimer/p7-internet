using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using P7Internet.Requests;
using P7Internet.Response;
using P7Internet.Services;
using P7Internet.Shared;

namespace P7Internet.Services.Tests
{
    [TestFixture()]
    public class ServiceTests
    {
        private SallingService _sallingService = new SallingService("846a156b-47d5-4493-a120-ed4a63daf40b");
        private ETilbudsAvisService _eTilbudsAvisService = new ETilbudsAvisService();
        private OpenAiServiceMock _openAiServiceMock = new OpenAiServiceMock();
        private EmailServiceMock _emailServiceMock = new EmailServiceMock();


        [SetUp]
        public void Setup()
        {

        }
        #region ProductsAndOffersTests
        [Test]
        public async Task GetSallingOffersSuccess()
        {
            //Arrange
            var query = "mælk";

            //Act
            var products = await _sallingService.GetRelevantProducts(query);

            //Assert
            Assert.IsNotNull(products);
            Assert.IsTrue(products.All(p => p.Name.Contains("mælk")));
        }
        [Test()]
        public async Task GetAllOffersTest()
        {
            //Arrange
            OfferRequest request = new OfferRequest() { Lat = 55.212391, Long = 10.035490, Pagesize = 1, Radius = 9000, SearchTerm = "Julebryg", Upcoming = "true" };

            //Act
            var offers = await _eTilbudsAvisService.GetAllOffers(request);

            //Assert
            Assert.IsNotNull(offers);
            Assert.IsTrue(offers.All(p => p.Name.Contains("Julebryg")));
            Assert.IsTrue(offers.Count() ==  1);
        }
        #endregion

        #region RecipeTests

        [Test]
        public async Task ComposePromptSuccess()
        {
            //Arrange
            var recipeRequest = new RecipeRequest(Guid.NewGuid(), "test-token", new List<string> { "kylling", "julebryg", "hestebønner" }, 2, new List<string> { "kartoffel", "løg" }, new List<string> { "vegansk" }, 4);
            var checkPrompt = @"Jeg vil gerne have 2 opskrifter med disse ingredienser kylling, julebryg, hestebønner uden disse ingredienser kartoffel,løg der er vegansk til 4 personer";
            //Act
            var prompt = _openAiServiceMock.ComposePromptFromRecipeRequest(recipeRequest);

            //Assert
            Assert.AreEqual(checkPrompt, prompt);
        }
        #endregion

        #region EmailTests

        [Test()]
        [TestCase("test@example.com", "TestUser")]
        public void ConfirmEmailCreationSuccess(string email, string username) {

            //Arrange/Act
            var mailMessage = _emailServiceMock.ConfirmEmail(email, username).Result;

            //Assert
            Assert.IsNotNull(mailMessage);
            Assert.AreEqual("P7Internet", mailMessage.From.Name);
            Assert.AreEqual("jonathanwisborgfog@gmail.com", mailMessage.From.Email);
            
        }
        [Test()]
        public void ResetPasswordEmailSuccess() {
            //Arrange

            //Act

            //Assert
        }
        #endregion
        [Test()]
        public void ExampleTest() {
            //Arrange

            //Act

            //Assert
        }
    }
}
