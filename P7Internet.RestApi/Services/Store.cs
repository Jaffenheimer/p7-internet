using Newtonsoft.Json;

namespace P7Internet.Services;

[JsonObject(MemberSerialization.OptIn)]
public class Store
{
    [JsonProperty("name")] public string Name;
    [JsonProperty("logo")] public string Logo;
}