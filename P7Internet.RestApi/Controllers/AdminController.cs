using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using P7Internet.Persistence.IngredientRepository;

namespace P7Internet.Controllers;

[ApiController]
[Route("admin")]
public class AdminController : ControllerBase
{
    private readonly IIngredientRepository _ingredientRepository;


    public AdminController(IIngredientRepository ingredientRepository)
    {
        _ingredientRepository = ingredientRepository;
    }


    [HttpPost("ingredients")]
    public async Task<IActionResult> UpsertIngredients()
    {
        var result = await _ingredientRepository.UpsertIngredients();

        return result ? Ok("Det virkede :D") : BadRequest("Det virkede ikke :///");
    }
}