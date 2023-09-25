using System.Collections.Generic;
using SharedObjects;

namespace P7Internet.Requests;

public class SampleRequest
{
    public string OpenAiString { get;}
    public List<string> Ingredients { get;}
    public SampleRequest(string openAiString, List<string> ingredients)
    {
        OpenAiString = openAiString;
        Ingredients = ingredients;
    }   
}