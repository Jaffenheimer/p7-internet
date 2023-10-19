using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.IO;
using System.Net.Http.Headers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http.Extensions;
using P7Internet.CustomExceptions;
using P7Internet.Requests;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using SharedObjects;
using Geohash;

namespace P7Internet.Services;

public class ETilbudsAvisService
{
    private readonly HttpClient _client = new();
    private readonly QueryBuilder _queryBuilder = new();


    public ETilbudsAvisService()
    {
        _client.BaseAddress = new Uri("https://squid-api.tjek.com/v4/rpc/get_offers");
    }

    public async Task<IList<Offer>> GetAllOffers(OfferRequest req)
    {
        string geohash;
        try
        {
            if (req.Zip == 0 || req.Zip == null) { throw new ZipNotFoundException(); }
            geohash = await CalculateGeohashFromZip(req.Zip);
        }
        catch (Exception)
        {
            throw new Exception("Zip not found or provided");
        }
        
        var url = new Uri(_client.BaseAddress.ToString());
        var request = new HttpRequestMessage(HttpMethod.Post, url);

        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        request.Headers.Add("X-Api-Key", "EFSiDV");
        StringContent payload = new StringContent(req.ComposeOfferObject(geohash), System.Text.Encoding.UTF8, "application/json");

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
    public async Task<string> CalculateGeohashFromZip(int zip)
    {
        var geohasher = new Geohash.Geohasher();
        var coordinateClient = new HttpClient() { BaseAddress = new Uri("https://api.dataforsyningen.dk/postnumre/") };
        var url = new Uri(coordinateClient.BaseAddress, zip.ToString());
        var request = new HttpRequestMessage(HttpMethod.Get, url);
        var response = await coordinateClient.SendAsync(request);
        var jsonData = JsonConvert.DeserializeObject<JObject>(response.Content.ReadAsStringAsync().Result);
        var coordinates = new Dictionary<string, double>() { { "lon", (double)jsonData["visueltcenter"][0] }, { "lat", (double)jsonData["visueltcenter"][1] } };
        var geohash = geohasher.Encode(coordinates["lat"], coordinates["lon"]);
        return geohash;
    }
    public T CreateObjectFromDeserializedJson<T>(JObject jsonObject)
    {
        return jsonObject.ToObject<T>();
    }
    #endregion
}
