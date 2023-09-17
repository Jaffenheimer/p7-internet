using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using P7_internet.Services;
using P7Internet.Persistence.Repositories;

namespace P7Internet.Controllers;

[ApiController]
[Route("recipes")]
public class AdminControllerV1 : ControllerBase
{
    private readonly ITestRepository _testRepository;
    private readonly OpenAiService _openAiService;

    public AdminControllerV1(ITestRepository testRepository, OpenAiService openAiService)
    {
        _testRepository = testRepository;
        _openAiService = openAiService;
    }

    [HttpPost("ingredients")]
    public async Task<IActionResult> SampleEndpoint(List<string> ingredients)
    {
        //Upsert noget til en DB
        var result = await _testRepository.Upsert(ingredients);
        // Der kunne også spørges OpenAi om noget og returnere det til brugeren
        // var res = _openAiService.GetAiResponse(ingredients);
        // return Ok(res);
        return Ok(result);
    }
}