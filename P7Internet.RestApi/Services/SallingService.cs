﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using P7Internet.CustomExceptions;
using P7Internet.Persistence.IngredientRepository;
using P7Internet.Shared;

namespace P7Internet.Services
{
    public class SallingService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private IIngredientRepository _ingredientRepository;

        public SallingService()
        {
        }

        public SallingService(string? apiKey, HttpClient httpClient)
        {
            _httpClient = httpClient;
            _apiKey = apiKey;
            _httpClient.BaseAddress = new Uri("https://api.sallinggroup.com/");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
        }

        public virtual async Task<List<Offer>> GetRelevantProducts(string query)
        {
            try
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
                if (offerArray == null)
                {
                    throw new NoProductsFoundException("No products were fetched");
                }

                JsonConvert.PopulateObject(offerArray, offers);
                foreach (var offer in offers)
                {
                    offer.Store = "BilkaToGo";
                    offer.Image = "https://www.bilka.dk/img/logo-og.png";
                }

                return offers;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}