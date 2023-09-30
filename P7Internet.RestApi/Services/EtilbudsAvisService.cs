using System;
using System.Net.Http;

namespace P7Internet.Services;

public class ETilbudsAvisService
{
    private readonly HttpClient _client = new();

    public ETilbudsAvisService()
    {
        _client.BaseAddress = new Uri("https://squid-api.tjek.com/v4/rpc/get_offers");
    }


    /*public async Task<JsonContent> GetOffers()
    {
      _client.PostAsJsonAsync();
    }
    */
    
    
    
}