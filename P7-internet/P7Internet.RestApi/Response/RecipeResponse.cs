namespace P7_internet.Response
{
    public class RecipeResponse
    {
        public string Recipes { get; }

        public bool Success => string.IsNullOrEmpty(ErrorMessage);
        public string ErrorMessage { get; }

        public RecipeResponse(string recipes)
        {
            recipes = recipes.Trim();
            if (recipes.StartsWith("\"") || recipes.StartsWith("'"))
                recipes = recipes.Substring(1);

            if (recipes.EndsWith("\"") || recipes.EndsWith("'"))
                recipes = recipes.Substring(0, recipes.Length - 1);

            Recipes = recipes;
        }

        private RecipeResponse(string errorMessage, string recipes)
        {
            ErrorMessage = errorMessage;
            Recipes = recipes;
        }

        public static RecipeResponse Error(string message)
        {
            return new RecipeResponse(message);
        }
    }
}