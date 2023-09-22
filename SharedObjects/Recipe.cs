using System;
using System.Collections.Generic;

namespace SharedObjects
{
    public class Recipe
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        
        public Recipe(string name, string category, string description, List<Ingredient> ingredients)
        {
            Name = name;
            Category = category;
            Description = description;
            Ingredients = ingredients;
        }
    }
}