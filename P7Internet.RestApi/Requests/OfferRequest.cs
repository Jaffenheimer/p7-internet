using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;

namespace P7Internet.Requests
{
    public class OfferRequest
    {
        public int Zip { get; set; }
        public int Pagesize { get; set; }
        public string SearchTerm { get; set; }
        public int Radius { get; set; }
        public string Upcoming { get; set; }
        public OfferRequest()
        {

        }

        public OfferRequest(int zip, int pagesize, string searchTerm, int radius, string upcoming)
        {
            Zip = zip;
            Pagesize = pagesize;
            SearchTerm = searchTerm;
            Radius = radius;
            Upcoming = upcoming;
        }

        public string ComposeOfferObject(string geohash)
        {
            string res = $@"{{
            ""page"": {{""page_size"": {this.Pagesize}
              }},
             ""where"": {{
                ""term"": ""{SearchTerm}"",
                ""max_radius"": {Radius},
                ""include_upcoming"": {Upcoming.ToLower()}
             }},
             ""geohash"": ""{geohash}""
             }}";

            return res;
        }
    }
}
