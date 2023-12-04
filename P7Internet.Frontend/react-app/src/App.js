import React from "react";
import "./App.css";
import FrontPage from "./pages/FrontPage";
import FullRecipeView from "./pages/FullRecipeView";
import { useSelector } from "react-redux";
import Pages from "./objects/Pages";
import RecipeSelection from "./pages/RecipeSelection";

export default function App() {
  const page = useSelector((state) => state.page.page);

  if (page === Pages.frontPage) {
    return <FrontPage />;
  } else if (page === Pages.RecipeSelection) {
    return <RecipeSelection />;
  } else if (page === Pages.fullRecipeView) {
    return <FullRecipeView shouldShowBackButton={true} />;
  } else if (page === Pages.fullRecipeViewNoBackButton) {
    return <FullRecipeView shouldShowBackButton={false} />;
  }
}
