
//Skal fjernes når endpoint er klar. Blev lavet for at kunne test OpenAi
export const generateOpenAiString = (recipeGenerationSlice) => {
    const { ownedIngredients, dietaryRestrictions, allergens, excludeList, numPeople} = recipeGenerationSlice;
    
    let ownedIngredientsString = ""; 
    let excludeListsString = "";  

    if(!ownedIngredients || !excludeList){
        return '';
    } 

    ownedIngredients.forEach((ingredient) => {
        ownedIngredientsString += `${ingredient.text}  `;
    });


    excludeList.forEach((ingredient) => {
        excludeListsString += `${ingredient.text}  `;
    });

    const openAiString = `Generate three recipes from ${numPeople} people using the following ingreident: ${ownedIngredientsString}. Exclude the following ingreidents: ${excludeListsString}. The following dietary restrictions apply: ${dietaryRestrictions}. The following allergens should be avoided: ${allergens}
    `; 

    return openAiString; 

}