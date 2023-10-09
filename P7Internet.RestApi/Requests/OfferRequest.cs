using System.Collections.Generic;
namespace P7Internet.Requests
{
    public class OfferRequest
    {
        public int Zip { get; }
        public List<KeyValuePair<string, string>>? Queries { get; }
        
        public OfferRequest(int zip, List<KeyValuePair<string, string>>? queries)
        {
            Zip = zip;
            Queries =  queries;
        }
        public OfferRequest()
        {

        }
    }
}
