﻿using Geohash;

namespace P7Internet.Requests
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="pagesize"></param>
    /// <param name="searchTerm"></param>
    /// <param name="radius"></param>
    /// <param name="upcoming"></param>
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

        /// <summary>
        /// Composes the offer object to be sent to the etilbudsavis API as JsonObject
        /// </summary>
        /// <returns>Returns the object as a string</returns>
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