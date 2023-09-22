using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using P7Internet.Persistence.Repositories;
using P7Internet.Requests;
using P7Internet.Services;

namespace P7Internet.Controllers;

[ApiController]
[Route("public/sample")]
public class PublicControllerV1 : ControllerBase
{
    private readonly ITestRepository _testRepository;
    private readonly OpenAiService _openAiService;

    public PublicControllerV1(ITestRepository testRepository, OpenAiService openAiService)
    {
        _testRepository = testRepository;
        _openAiService = openAiService;
    }

    [HttpPost("recipes")]
    public Task<IActionResult> GetARecipe(SampleRequest req)
    {
        var res = _openAiService.GetAiResponse(req.OpenAiString);

        return Task.FromResult<IActionResult>(Ok(res));
    }
}