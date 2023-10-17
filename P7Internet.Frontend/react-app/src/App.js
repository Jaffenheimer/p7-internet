import React from "react";
import "./App.css";
import axios from "axios";
import FrontPage from "./pages/FrontPage";
import FullRecipeView from "./pages/FullRecipeView";
import { useSelector } from "react-redux";
import Pages from "./objects/Pages";
import RecipeSelection from "./pages/RecipeSelection";

export default function App() {
  axios.defaults.baseURL = "http://localhost:5000";

  const page = useSelector((state) => state.page.page);

  if (page === Pages.frontPage) {
    return <FrontPage />;
  } else if (page === Pages.RecipeSelection) {
    return <RecipeSelection />;
  } else if (page === Pages.fullRecipeView) {
    return <FullRecipeView />;
  }
}

//husk også at ændre i './components/index.jsx'
