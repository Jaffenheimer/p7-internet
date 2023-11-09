﻿using System;

namespace P7Internet.Response
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="recipes"></param>
    /// <param name="recipeId"></param>
    public class RecipeResponse
    {
        public string Recipes { get; }
        public Guid RecipeId { get; set; }
        public bool Success => string.IsNullOrEmpty(ErrorMessage);
        public string ErrorMessage { get; }

        /// <summary>
        /// Composes a response from a recipe string and a recipe id. It trims away unwanted characters from the recipe string.
        /// </summary>
        /// <param name="recipes"></param>
        /// <param name="recipeId"></param>
        public RecipeResponse(string recipes, Guid recipeId)
        {
            recipes = recipes.Trim();
            if (recipes.StartsWith("\"") || recipes.StartsWith("'"))
                recipes = recipes.Substring(1);

            if (recipes.EndsWith("\"") || recipes.EndsWith("'"))
                recipes = recipes.Substring(0, recipes.Length - 1);
            recipes = recipes.Replace('\n', ' ');

            RecipeId = recipeId;
            Recipes = recipes;
        }

        private RecipeResponse(string errorMessage, string recipes)
        {
            ErrorMessage = errorMessage;
            Recipes = recipes;
        }

        public static RecipeResponse Error(string message, Guid id)
        {
            return new RecipeResponse(message, id);
        }
    }
}