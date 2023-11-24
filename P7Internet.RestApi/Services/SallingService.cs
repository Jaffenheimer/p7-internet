using System.Net.Http;
using System;
using System.Threading.Tasks;
using P7Internet.Shared;
using System.Collections;
using System.Net.Http.Headers;
using System.Collections.Generic;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Json.Nodes;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.IO;
using P7Internet.Persistence.CachedOfferRepository;
using P7Internet.CustomExceptions;

namespace P7Internet.Services
{
    public class SallingService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public SallingService()
        {
            
        }
        public SallingService(string? apiKey, HttpClient httpClient)
        {
            _apiKey = apiKey;
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://api.sallinggroup.com/");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
        }
        public virtual async Task<List<Offer>> GetRelevantProducts(string query)
        {
            var url = new Uri(QueryHelpers.AddQueryString(Path.Combine(_httpClient.BaseAddress.ToString(), "v1-beta/product-suggestions/relevant-products"), "query", query));
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
            var response = await _httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();
            
            //Parsing the response JSON into a list of Offer objects
            var offers = new List<Offer>();
            var deserializedContent = JsonConvert.DeserializeObject<JObject>(responseContent);
            if (deserializedContent == null) { throw new NoProductsFoundException("No products were fetched"); }
            
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
