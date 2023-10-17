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
        StringContent payload = new StringContent(req.ComposeOfferObject(), System.Text.Encoding.UTF8, "application/json");
            

        request.Content = payload;
        var response = await _client.SendAsync(request);
        var responseContent = response.Content.ReadAsStringAsync().Result;
        var deserializedContent = JsonConvert.DeserializeObject<JObject>(responseContent);

        deserializedContent.Remove("page_info");
        var offerArray = deserializedContent.Value<JArray>("offers");
        //This creates the offer objects from the parsed json data.
        IList<Offer> offers = new List<Offer>();
        for (int i = 0; i < offerArray.Count; i++)
        {
            Offer offer = new Offer();
            offer.Id = offerArray[i]["id"].Value<string>();
            offer.Name = offerArray[i]["name"].Value<string>();
            offer.Price = offerArray[i]["price"].Value<decimal>();
            offer.Currency = offerArray[i]["currency_code"].Value<string>();
            offer.Store = offerArray[i]["business"]["name"].Value<string>();
            offer.Size = new KeyValuePair<float, float>(offerArray[i]["unit_size"]["from"].Value<float>(), offerArray[i]["unit_size"]["to"].Value<float>());
            offer.Created = offerArray[i]["validity"]["from"].Value<DateTime>();
            offer.Ending = offerArray[i]["validity"]["to"].Value<DateTime>();
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

//[JsonObject(MemberSerialization.OptIn)]
public class Offer
{
    public Offer()
    {
        
    }
    [JsonProperty("id")]
    public string Id { get; set; }
    [JsonProperty("name")]
    public string Name { get; set; }
    [JsonProperty("description")]
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Currency { get; set; }
    public KeyValuePair<float, float> Size { get; set; }
    public string Store { get; set; }
    public DateTime Created { get; set; }
    public DateTime Ending { get; set; }

    
}
[JsonObject(MemberSerialization.OptIn)]
public class Store
{
    [JsonProperty("name")]
    public string Name;
    [JsonProperty("logo")]
    public string Logo;
}