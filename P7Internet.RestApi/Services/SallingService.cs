using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using P7Internet.CustomExceptions;
using P7Internet.Shared;

namespace P7Internet.Services
{
    public class SallingService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public SallingService(string? apiKey)
        {
            _apiKey = apiKey;
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://api.sallinggroup.com/");
            //                                                          Bearer = give access to the bearer of this token
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
        }

        public async Task<List<Offer>> GetRelevantProducts(string query)
        {
            var url = new Uri(QueryHelpers.AddQueryString(
                Path.Combine(_httpClient.BaseAddress.ToString(), "v1-beta/product-suggestions/relevant-products"),
                "query", query));
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
            var response = await _httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();

            //Parsing the response JSON into a list of Offer objects
            var offers = new List<Offer>();
            var deserializedContent = JsonConvert.DeserializeObject<JObject>(responseContent);
            if (deserializedContent == null)
            {
                throw new NoProductsFoundException("No products were fetched");
            }

            var offerArray = deserializedContent.Value<JArray>("suggestions").ToString();

            JsonConvert.PopulateObject(offerArray, offers);

            foreach (var offer in offers)
            {
                offer.Store = "BilkaToGo";
            }

            return offers;
        }
    }
}