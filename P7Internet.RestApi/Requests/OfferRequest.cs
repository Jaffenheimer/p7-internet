using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;

namespace P7Internet.Requests
{
    public class OfferRequest
    {
        public int Zip { get; }
        public int Pagesize { get; set; }
        public string SearchTerm { get; set; }
        public int Radius { get; set; }
        public bool Upcoming { get; set; }
        public string Geohash { get; set; }
        public OfferRequest()
        {

        }

        public OfferRequest(int zip, int pagesize, string searchTerm, int radius, bool upcoming, string geoHash)
        {
            Zip = zip;
            Pagesize = pagesize;
            SearchTerm = searchTerm;
            Radius = radius;
            Upcoming = upcoming;
            Geohash = geoHash;
        }

        public string ComposeOfferObject()
        {
            string res = $@"{{
            ""page"": {{""page_size"": {this.Pagesize}
              }},
             ""where"": {{
                ""term"": ""{this.SearchTerm}"",
                ""max_radius"": {this.Radius},
                ""include_upcoming"": {true}
             }},
             ""geohash"": ""{this.Geohash}""
             }}";

            return res;
        }
    

        //public StringContent CreateRequestBody()
        //{
        //    var json = JsonSerializer.Serialize(this, Formatting.Indented);
        //    StringContent body = new StringContent(json);
        //    return body;
        //}
    }
}
