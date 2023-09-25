using System;
using System.Collections.Generic;

namespace SharedObjects
{
    public class Recipe
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        //public string Category { get; set; }
        public string Description { get; set; }
        public List<string> Ingredients { get; set; }
        
        public Recipe(Guid id, string name, string description, List<string> ingredients)
        {
            Id = id;
            Name = name;
            //Category = category;
            Description = description;
            Ingredients = ingredients;
        }
    }
}