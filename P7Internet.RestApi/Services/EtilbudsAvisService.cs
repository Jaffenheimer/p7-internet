using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http.Extensions;

namespace P7Internet.Services;

public class ETilbudsAvisService
{
    private readonly HttpClient _client = new();
    private readonly QueryBuilder _queryBuilder = new();

    public ETilbudsAvisService()
    {
        //_client.BaseAddress = new Uri("https://squid-api.tjek.com/v4/rpc/get_offers");
        _client.BaseAddress = new Uri("https://etilbudsavis.dk/api/squid/v2/");
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("ApiKey", "EFSiDV");
    }


    /*public async Task<JsonContent> GetOffers()
    {
      _client.PostAsJsonAsync();
    }
    */

    public async Task<IList<Offer>> GetAllOffers(int zip, List<KeyValuePair<string, string>>? queries)
    {
        var coords = await GetCoordinates(zip);
        _queryBuilder.Add("r_lng", coords["lon"]);
        _queryBuilder.Add("r_lat", coords["lat"]);
        foreach (var query in queries)
        {
            _queryBuilder.Add(query.Key, query.Value);  
        }
        var url = new Uri(_client.BaseAddress, $"offers{_queryBuilder.ToQueryString().Value}");
        var request = new HttpRequestMessage(HttpMethod.Get, url);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var response = await _client.SendAsync(request);
        var responseContent = response.Content.ReadAsStringAsync().Result;
        var deserializedContent = JsonConvert.DeserializeObject<dynamic>(responseContent);

        //This creates the offer objects from the parsed json data.
        IList<Offer> offers = new List<Offer>();
        foreach (JToken result in deserializedContent)
        {
            Offer offer = CreateObjectFromDeserializedJson<Offer>(result);
            offers.Add(offer);
        }

        return offers;
    }


    #region Utility Functions
    public async Task<Dictionary<string, string>> GetCoordinates(int postalCode)
    {
        var coordinateClient = new HttpClient() { BaseAddress = new Uri("https://api.dataforsyningen.dk/postnumre/") };
        var url = new Uri(coordinateClient.BaseAddress, postalCode.ToString());
        var request = new HttpRequestMessage(HttpMethod.Get, url);
        var response = await coordinateClient.SendAsync(request);
        var jsonData = JsonConvert.DeserializeObject<JObject>(response.Content.ReadAsStringAsync().Result);
        var coordinates = new Dictionary<string, string>() { { "lon", jsonData["visueltcenter"][0].ToString() }, { "lat", jsonData["visueltcenter"][1].ToString() } };
        return coordinates;
    }
    public T CreateObjectFromDeserializedJson<T>(JToken jsonToken)
    {
        return jsonToken.ToObject<T>();
    }
    #endregion
}

public class Offer
{
    public Offer()
    {

    }

    public string Id { get; set; }
    [JsonProperty("heading")]
    public string Name { get; set; }
    public string Description { get; set; } 
    public decimal Price { get; set; }
    [JsonProperty("size.to")]
    public float Size { get; set; }
    [JsonProperty("dealer.name")]
    public string Dealer { get; set; }
    [JsonProperty("run_from")]
    public DateTime Created { get; set; }
    [JsonProperty("run_till")]
    public DateTime Ending { get; set; }


}