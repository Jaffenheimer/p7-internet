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
        public string Recipe { get; }
        public Guid RecipeId { get; set; }
        public List<string> Ingredients { get; set; }
        public bool Success => string.IsNullOrEmpty(ErrorMessage);
        public string ErrorMessage { get; }

        /// <summary>
        /// Composes a response from a recipe string and a recipe id. It trims away unwanted characters from the recipe string.
        /// </summary>
        /// <param name="recipe"></param>
        /// <param name="ingredients"></param>
        /// <param name="recipeId"></param>
        public RecipeResponse(string recipe, List<string> ingredients, Guid recipeId)
        {
            recipe = recipe.Trim();
            if (recipe.StartsWith("\"") || recipe.StartsWith("'"))
                recipe = recipe.Substring(1);

            if (recipe.EndsWith("\"") || recipe.EndsWith("'"))
                recipe = recipe.Substring(0, recipe.Length - 1);
            recipe = recipe.Replace('\n', ' ');

            Ingredients = ingredients;
            RecipeId = recipeId;
            Recipe = recipe;
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