using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.IO;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.Http.Extensions;
using P7Internet.CustomExceptions;
using P7Internet.Requests;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace P7Internet.Services;

public class ETilbudsAvisService
{
    private readonly HttpClient _client = new();
    private readonly QueryBuilder _queryBuilder = new();


    public ETilbudsAvisService()
    {
        _client.BaseAddress = new Uri("https://squid-api.tjek.com/v4/rpc/get_offers");
        //_client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("EFSiDV");
    }


    /*public async Task<JsonContent> GetOffers()
    {
      _client.PostAsJsonAsync();
    }
    */

    public async Task<IList<Offer>> GetAllOffers(OfferRequest req)
    {
        try
        {
            //if (zip == 0 || zip == null) { throw new ZipNotFoundException(); }
            //var coords = await GetCoordinates(zip);
            //_queryBuilder.Add("r_lng", coords["lon"]);
            //_queryBuilder.Add("r_lat", coords["lat"]);
        }
        catch (Exception)
        {
            throw new Exception("Zip not found or provided");
        }

      
        //var url = new Uri(_client.BaseAddress, $"offers{_queryBuilder.ToQueryString().Value}");
        var url = new Uri(_client.BaseAddress.ToString());
        var request = new HttpRequestMessage(HttpMethod.Post, url);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        request.Headers.Add("X-Api-Key", "EFSiDV");
        StringContent payload = new StringContent(req.ComposeOfferObject());
            

        request.Content = payload;
        var response = await _client.SendAsync(request);
        var responseContent = response.Content.ReadAsStringAsync().Result;
        var deserializedContent =  JToken.Parse(responseContent);

        //This creates the offer objects from the parsed json data.
        IList<Offer> offers = new List<Offer>();
        foreach (JObject result in deserializedContent)
        {
            Offer offer = CreateObjectFromDeserializedJson<Offer>(result);
            offer.Price.Add("price", result["pricing"]["price"].Value<decimal>());
            offer.Price.Add("currency", result["pricing"]["currency"].Value<string>());
            offer.Dealer.Add("name", result["dealer"]["name"].Value<string>());
            offer.Dealer.Add("logo", result["dealer"]["logo"].Value<string>());
            offer.Size.Add("from", result["quantity"]["size"]["from"].Value<float>());
            offer.Size.Add("to", result["quantity"]["size"]["to"].Value<float>());
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
    public T CreateObjectFromDeserializedJson<T>(JObject jsonObject)
    {
        return jsonObject.ToObject<T>();
    }
    #endregion
}

[JsonObject(MemberSerialization.OptIn)]
public class Offer
{
    public Offer()
    {
        Price = new Dictionary<string, object>();
        Size = new Dictionary<string, float>();
        Dealer = new Dictionary<string, string>();
    }
    [JsonProperty("id")]
    public string Id { get; set; }
    [JsonProperty("heading")]
    public string Name { get; set; }
    [JsonProperty("description")]
    public string Description { get; set; }
    public Dictionary<string, object> Price { get; set; }
    public Dictionary<string, float> Size { get; set; }
    public Dictionary<string, string> Dealer { get; set; }
    [JsonProperty("run_from")]
    public DateTime Created { get; set; }
    [JsonProperty("run_till")]
    public DateTime Ending { get; set; }

    
}
[JsonObject(MemberSerialization.OptIn)]
public class Pricing
{
    [JsonProperty("price")]
    public decimal Price;
    [JsonProperty("currency")]
    public string currency;
}
[JsonObject(MemberSerialization.OptIn)]
public class Dealer
{
    [JsonProperty("name")]
    public string Name;
    [JsonProperty("logo")]
    public string Logo;
}
[JsonObject(MemberSerialization.OptIn)]
public class Quantity
{
    [JsonProperty("size")]
    public JObject size;
}