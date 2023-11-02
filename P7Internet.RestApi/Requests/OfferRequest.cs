using Geohash;

namespace P7Internet.Requests
{
    public class OfferRequest
    {
        public double Lat { get; set; }
        public double Long { get; set; }
        public int Pagesize { get; set; }
        public string SearchTerm { get; set; }
        public int Radius { get; set; }
        public string Upcoming { get; set; }

        public OfferRequest()
        {
        }

        public OfferRequest(int pagesize, string searchTerm, int radius, string upcoming)
        {
            Pagesize = pagesize;
            SearchTerm = searchTerm;
            Radius = radius;
            Upcoming = upcoming;
        }

        public string ComposeOfferObject()
        {
            string res = $@"{{
            ""page"": {{""page_size"": {this.Pagesize}
              }},
             ""where"": {{
                ""term"": ""{SearchTerm}"",
                ""max_radius"": {Radius},
                ""include_upcoming"": {Upcoming.ToLower()}
             }},
             ""geohash"": ""{CalculateGeohash()}""
             }}";

            return res;
        }

        public string CalculateGeohash()
        {
            var geohasher = new Geohasher();
            var geohash = geohasher.Encode(Lat, Long);
            return geohash;
        }
    }
}