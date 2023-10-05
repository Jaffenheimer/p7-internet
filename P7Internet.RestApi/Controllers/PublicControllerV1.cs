using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using P7_internet.Services;
using P7Internet.Persistence.Repositories;
using P7Internet.Response;

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
    public async Task<IActionResult> GetARecipe(string req)
    {
        var res = _openAiService.GetAiResponse(req);

        return Ok(res);
    }
    
    [HttpPost("testrecipes")]
    public async Task<IActionResult> GetATestRecipe(string req)
    {
        const string recipe = "1. Spaghetti Aglio e Olio:\\nIngredients:\\n- " +
                              "400g spaghetti\\n- 4 cloves garlic, minced\\n- " +
                              "1/4 cup olive oil\\n- 1/2 teaspoon red pepper flakes\\n- " +
                              "Salt and pepper to taste\\n- Grated Parmesan cheese (optional)\\n\\" +
                              "nInstructions:\\n1. Cook spaghetti according to package instructions until " +
                              "al dente. Drain and set aside.\\n2. In a large pan, heat olive oil over medium heat. " +
                              "Add minced garlic and red pepper flakes. Sauté until garlic turns golden brown.\\n3. " +
                              "Add cooked spaghetti to the pan and toss well to coat with garlic-infused oil.\\n4. " +
                              "Season with salt and pepper to taste. Serve hot, optionally topped with grated Parmesan " +
                              "cheese.\\n\\n2. Chicken Stir-Fry:\\nIngredients:\\n- 500g boneless chicken breast, " +
                              "sliced\\n- 2 bell peppers, sliced\\n- 1 onion, sliced\\n- 2 tablespoons soy sauce\\n- " +
                              "1 tablespoon oyster sauce\\n- 1 tablespoon vegetable oil\\n- " +
                              "Salt and pepper to taste\\n\\nInstructions:\\n1. " +
                              "Heat vegetable oil in a large skillet or wok over high heat.\\n2. " +
                              "Add sliced chicken and cook until browned and cooked through.\\n3. " +
                              "Add sliced bell peppers and onion to the skillet. " +
                              "Stir-fry for a few minutes until vegetables are slightly tender.\\n4. " +
                              "In a small bowl, mix soy sauce and oyster sauce together. " +
                              "Pour the sauce over the chicken and vegetables. " +
                              "Stir well to combine.\\n5. Season with salt and pepper to taste. " +
                              "Serve hot with steamed rice or noodles.\\n\\n3. Caprese Salad:\\nIngredients:\\n- " +
                              "4 ripe tomatoes, sliced\\n- 200g fresh mozzarella cheese, sliced\\n- " +
                              "Fresh basil leaves\\n- 2 tablespoons balsamic glaze\\n- " +
                              "Salt and pepper to taste\\n\\nInstructions:\\n1. " +
                              "Arrange tomato and mozzarella slices on a serving platter.\\n" +
                              "2. Place a fresh basil leaf on top of each tomato and mozzarella slice.\\n" +
                              "3. Drizzle balsamic glaze over the salad.\\n" +
                              "4. Season with salt and pepper to taste. " +
                              "Serve immediately as a refreshing appetizer or side dish.\\n\\n";
        
        
        RecipeResponse recipeResponse = new RecipeResponse(recipe);
        var res = recipeResponse; 

        return Ok(res);
    }
    
    
    
    
    
    
}