using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using P7Internet.Persistence.UserRepository;
using P7Internet.Services;

namespace P7Internet.Controllers;

[ApiController]
[Route("admin/sample")]
public class AdminControllerV1 : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly OpenAiService _openAiService;

    public AdminControllerV1(IUserRepository userRepository, OpenAiService openAiService)
    {
        _userRepository = userRepository;
        _openAiService = openAiService;
    }

    [HttpGet("ingredients")]
    public async Task<IActionResult> SampleEndpoint()
    {
        //Upsert noget til en DB
        //var result = await _testRepository.Upsert(ingredients);
        // Der kunne også spørges OpenAi om noget og returnere det til brugeren
        // var res = _openAiService.GetAiResponse(ingredients);
        // return Ok(res);
        return Ok("Hej fra API'et");
    }
}