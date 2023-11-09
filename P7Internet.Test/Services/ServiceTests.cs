using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using P7Internet.Requests;
using P7Internet.Services;
using P7Internet.Shared;

namespace P7Internet.Services.Tests
{
    [TestFixture()]
    public class ServiceTests
    {
        private SallingService _sallingService = new SallingService("846a156b-47d5-4493-a120-ed4a63daf40b");
        private ETilbudsAvisService _eTilbudsAvisService = new ETilbudsAvisService();

        [SetUp]
        public void Setup()
        {

        }

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
    }
}
