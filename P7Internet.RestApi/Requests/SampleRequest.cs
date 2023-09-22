using System.Collections.Generic;
using SharedObjects;

namespace P7Internet.Requests;

public class SampleRequest
{
    public string OpenAiString { get; set; }
    public List<Ingredient> Ingredients { get; set; }
}