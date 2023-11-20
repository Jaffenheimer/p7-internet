using System;
using System.Collections.Generic;

namespace P7Internet.Shared
{
    public class Recipe
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Recipe()
        {
            
        }
        public Recipe(Guid id, string description)
        {
            Id = id;
            Description = description;
        }
    }
}