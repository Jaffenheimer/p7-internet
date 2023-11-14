using NUnit.Framework;
using P7Internet.Services;
using P7Internet.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace P7Internet.Test
{
    internal class ServiceTests
    {
        SallingService sallingService = new SallingService("846a156b-47d5-4493-a120-ed4a63daf40b");
        ETilbudsAvisService eTilbudsAvisService = new ETilbudsAvisService();

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
            var products = await sallingService.GetRelevantProducts(query);

            //Assert
            Assert.IsNotNull(products);
            Assert.IsTrue(products.All(p => p.Name.Contains("mælk")));
        }
    }
}
