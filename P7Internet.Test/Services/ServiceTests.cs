using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;
using P7Internet.Requests;
using P7Internet.Response;
using P7Internet.Services;
using P7Internet.Shared;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.VisualStudio.TestPlatform.CommunicationUtilities.Interfaces;
using Moq.Protected;
using System.Net;
using RichardSzalay.MockHttp;

namespace P7Internet.Services.Tests
{
    [TestFixture()]
    public class ServiceTests
    {
        private SallingService _sallingService;
        private ETilbudsAvisService _eTilbudsAvisService = new ETilbudsAvisService();
        private OpenAiServiceMock _openAiService = new OpenAiServiceMock();
        private EmailService _emailService = new EmailService();
        private Mock<SendGridClient> _sendGridClientMock = new Mock<SendGridClient>();
        private Mock<MailHelper> _mailHelper = new Mock<MailHelper>();
        private MockHttpMessageHandler mockHttp = new MockHttpMessageHandler();

        [SetUp]
        public void Setup()
        {
            //Setup mock of HttpClient to avoid unnecessary load on the API's
            mockHttp.When("https://api.sallinggroup.com/*").Respond("application/json", "{ \"suggestions\": [ { \"id\": \"30271101\", \"prod_id\": \"31835\", \"title\": \"Akvavit\", \"description\": \"Akvavit\", \"img\": \"https://image.prod.iposeninfra.com/bilkaimg.php?pid=31835&imgType=jpeg\", \"link\": \"https://www.bilkatogo.dk/p/31835\", \"price\": 120 }]}");
            var client = mockHttp.ToHttpClient();
            _sallingService = new SallingService(client);
        }
        #region ProductsAndOffersTests
        [Test]
        public async Task GetSallingOffersSuccess()
        {
            //Arrange
            var query = "Snaps";

            //Act
            var products = await _sallingService.GetRelevantProducts(query);

            //Assert
            Assert.IsNotNull(products);
            Assert.IsTrue(products.All(p => p.Name.Contains("Akvavit")));
            
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
            var prompt = _openAiService.ComposePromptFromRecipeRequest(recipeRequest);

            //Assert
            Assert.AreEqual(checkPrompt, prompt);
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
