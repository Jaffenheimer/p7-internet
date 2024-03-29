import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import RecipeTitle from "../components/RecipeTitle";
import IngredientsList from "../components/IngredientsList";
import MethodsList from "../components/MethodsList";
import Pages from "../objects/Pages";
import ForPersons from "../components/ForPersons";
import Header from "../components/Header";
import FrontPageButton from "../components/FrontPageButton";
import { convertIngredientsToIngredientObjects } from "../helperFunctions/ingredientHelper";
import { ToastContainer } from "react-toastify";
import RecipeOfferElement from "../components/RecipeOfferElement";
import { offersActions } from "../features/offersSlice";
import { RecipeIngredientElement } from "../components";

const FullRecipeView = ({ shouldShowBackButton }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(offersActions.resetTotalPrice());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const recipe = useSelector((state) => state.recipe.recipeToShow);
  const finalRecipesSum = useSelector((state) => state.offers.finalRecipesSum);

  function goToPageRecipeSelection() {
    dispatch(pageActions.goToPage(Pages.RecipeSelection));
  }

  function PrintRecipe() {
    window.print();
  }

  return (
    <div className="AppContainer">
      <ToastContainer
        position="top-center"
        newestOnTop={true}
        closeButton={false}
        draggablePercent
      />
      <div className="headerContainer">
        <Header />
      </div>
      <div className="FullRecipeView">
        <RecipeTitle id="RecipeTitle" recipe={recipe} />
        <ForPersons />
        <h2>Ingredienser:</h2>
        {shouldShowBackButton ? (
          <>
            <IngredientsList
              ingredients={convertIngredientsToIngredientObjects(
                recipe.shortIngredients
              )}
              ListElement={RecipeOfferElement}
            />
            <h4 className="no-print">
              Pris i alt: {finalRecipesSum.toFixed(2)},-
            </h4>
          </>
        ) : (
          <IngredientsList
            ingredients={convertIngredientsToIngredientObjects(
              recipe.ingredients
            )}
            ListElement={RecipeIngredientElement}
          />
        )}

        <br />
        <MethodsList methods={recipe.method} />
        <div className="BottomButtons no-print">
          <div className="BottomButtonsSpacer">
            <div id="BackToFrontPageButtonRecipeView">
              <FrontPageButton buttonText="Tilbage til forsiden" />
            </div>
            {shouldShowBackButton ? (
              <button id="BackButton" onClick={goToPageRecipeSelection}>
                Tilbage
              </button>
            ) : (
              <></>
            )}
            <button id="PrintButton" onClick={PrintRecipe}>
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullRecipeView;
