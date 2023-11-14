using System;
using System.Collections.Generic;

namespace P7Internet.Response
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="recipes"></param>
    /// <param name="recipeId"></param>
    /// <param name="ingredients"></param>
    public class RecipeResponse
    {
        public string Recipes { get; }
        public Guid RecipeId { get; set; }
        public List<string> Ingredients { get; set; }
        public bool Success => string.IsNullOrEmpty(ErrorMessage);
        public string ErrorMessage { get; }

        /// <summary>
        /// Composes a response from a recipe string and a recipe id. It trims away unwanted characters from the recipe string.
        /// </summary>
        /// <param name="recipes"></param>
        /// <param name="ingredients"></param>
        /// <param name="recipeId"></param>
        public RecipeResponse(string recipes,List<string> ingredients, Guid recipeId)
        {
            recipes = recipes.Trim();
            if (recipes.StartsWith("\"") || recipes.StartsWith("'"))
                recipes = recipes.Substring(1);

            if (recipes.EndsWith("\"") || recipes.EndsWith("'"))
                recipes = recipes.Substring(0, recipes.Length - 1);
            recipes = recipes.Replace('\n', ' ');

            Ingredients = ingredients;
            RecipeId = recipeId;
            Recipes = recipes;
        }

        private RecipeResponse(string errorMessage, Guid id)
        {
            ErrorMessage = errorMessage;
            RecipeId = id;
        }

        public static RecipeResponse Error(string message, Guid id)
        {
            return new RecipeResponse(message, id);
        }
    }
}