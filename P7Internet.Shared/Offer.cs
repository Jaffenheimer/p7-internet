using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace P7Internet.Shared;
public class Offer
{
    public Offer()
    {
        
    }
    [JsonProperty("id")]
    public string Id { get; set; }
    [JsonProperty("title")]
    public string Name { get; set; }
    [JsonProperty("description")]
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Currency { get; set; }
    public KeyValuePair<float, float> Size { get; set; }
    public string Store { get; set; }
    public DateTime Created { get; set; }
    public DateTime Ending { get; set; }
    public string Image { get; set; }
    
}