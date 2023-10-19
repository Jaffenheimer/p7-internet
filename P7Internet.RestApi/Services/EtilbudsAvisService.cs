using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Extensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using P7_Internet.Shared;
using P7Internet.Requests;

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
        
        var url = new Uri(_client.BaseAddress.ToString());
        var request = new HttpRequestMessage(HttpMethod.Post, url);

        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        request.Headers.Add("X-Api-Key", "EFSiDV");
        StringContent payload = new StringContent(req.ComposeOfferObject(), Encoding.UTF8, "application/json");

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
    public T CreateObjectFromDeserializedJson<T>(JObject jsonObject)
    {
        return jsonObject.ToObject<T>();
    }
}
