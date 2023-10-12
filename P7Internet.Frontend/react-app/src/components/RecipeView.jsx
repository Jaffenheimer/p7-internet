import React, {useState} from 'react'
import Recipe from './Recipe'
import RecipeTitle from './RecipeTitle';
import leftArrow from '../data/leftArrow.svg'
import rightArrow from '../data/rightArrow.svg'

const RecipeView = () => {

    function startsWithNumber(string) {
        return /^\d/.test(string);
      }

    function trimNumberedPoints(string) { //removing the "1. "-part
        return string.substring(string.indexOf(" ") + 1)
    }

    function getRecipesFromString(string)
    {
        var recipes = [];
        var title = "";
        var ingredients = [];
        var method = []
        for (const line of string.split("\n")) {
            if (title === "") //title
            {
                title = line
                title = trimNumberedPoints(line)
                if (title.endsWith(":"))
                    title = title.slice(0,-1)
            }
            else if (line.startsWith("-")) //ingredients
            {
                ingredients.push(line.substring(line.indexOf(" ") + 1))
            }
            else if (startsWithNumber(line) && title !== "") //instructions
            {
                method.push(trimNumberedPoints(line));
            }

            else if (line === "" && method.length !=[]) //end of recipe
            {
                recipe = new Recipe(title,ingredients,method)
                recipes.push(recipe)
                title = "";
                ingredients = [];
                method = []
            }

        }
        return recipes 
    }

    function clickLeft()
    {
        if (tab === 0)
            setTab(numOfRecipes-1)
        else
            setTab(tab-1)
    }

    function clickRight()
    {
        if (tab === numOfRecipes-1)
            setTab(0)
        else
            setTab(tab+1)
    }

    function filterOwned(ingredients)
    {
        let filtered = [];
        for (let ingredient of ingredients)
        {
          if (ownedList.includes(ingredient))
            filtered.add(ingredient)
        }
        return filtered;
      }

    const ownedList = ['chicken breast', 'salt', 'water', 'milk']
    const [tab, setTab] = useState(0)
    //this should of course not be hardcoded in here like it is now
    //and the ingredients you own should also be sent somehow
    var recipeString = "1. Spaghetti Aglio e Olio:\nIngredients:\n- 400g spaghetti\n- 4 cloves garlic, minced\n- 1/4 cup olive oil\n- 1/2 teaspoon red pepper flakes\n- Salt and pepper to taste\n- Grated Parmesan cheese (optional)\n\nInstructions:\n1. Cook spaghetti according to package instructions until al dente. Drain and set aside.\n2. In a large pan, heat olive oil over medium heat. Add minced garlic and red pepper flakes. Sauté until garlic turns golden brown.\n3. Add cooked spaghetti to the pan and toss well to coat with garlic-infused oil.\n4. Season with salt and pepper to taste. Serve hot, optionally topped with grated Parmesan cheese.\n\n2. Chicken Stir-Fry:\nIngredients:\n- 500g boneless chicken breast, sliced\n- 2 bell peppers, sliced\n- 1 onion, sliced\n- 2 tablespoons soy sauce\n- 1 tablespoon oyster sauce\n- 1 tablespoon vegetable oil\n- Salt and pepper to taste\n\nInstructions:\n1. Heat vegetable oil in a large skillet or wok over high heat.\n2. Add sliced chicken and cook until browned and cooked through.\n3. Add sliced bell peppers and onion to the skillet. Stir-fry for a few minutes until vegetables are slightly tender.\n4. In a small bowl, mix soy sauce and oyster sauce together. Pour the sauce over the chicken and vegetables. Stir well to combine.\n5. Season with salt and pepper to taste. Serve hot with steamed rice or noodles.\n\n3. Caprese Salad:\nIngredients:\n- 4 ripe tomatoes, sliced\n- 200g fresh mozzarella cheese, sliced\n- Fresh basil leaves\n- 2 tablespoons balsamic glaze\n- Salt and pepper to taste\n\nInstructions:\n1. Arrange tomato and mozzarella slices on a serving platter.\n2. Place a fresh basil leaf on top of each tomato and mozzarella slice.\n3. Drizzle balsamic glaze over the salad.\n4. Season with salt and pepper to taste. Serve immediately as a refreshing appetizer or side dish.\n\n4. Tuna Salad Wrap:\nIngredients:\n- 2 cans tuna, drained\n- 1/4 cup mayonnaise\n- 1 tablespoon lemon juice\n- 1/4 cup diced celery\n- 1/4 cup diced red onion\n- Salt and pepper to taste\n- 4 large tortilla wraps\n\nInstructions:\n1. In a bowl"
    var recipe = new Recipe(recipeString)
    //console.log(recipeString)
    var recipes = getRecipesFromString(recipeString);
    const numOfRecipes = recipes.length


    return (
        <div className='RecipeView'>
            <RecipeTitle title={recipes[tab].title}/>
            <div className='ingredients'>
                <ul>
                    {recipes[tab].ingredients.map(ingredient => 
                    <li>{ingredient} 
                    {filterOwned(recipes[tab].ingredients).includes(ingredient) ? ' Owned' : ''}
                    </li>)}
                </ul>
            </div>
            
            <div className='SelectArrows'>
                <img src={leftArrow} alt='Left Arrow' onClick={clickLeft}/>
                <img src={rightArrow} alt='right Arrow' onClick={clickRight}/>
            </div>
        </div>
    )
}

export default RecipeView