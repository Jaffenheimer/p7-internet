import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import axios from "axios";
import FullRecipeView from "./pages/FullRecipeView";
import FrontPage from "./pages/FrontPage";

export default function App() {
  axios.defaults.baseURL = "http://localhost:5000";

  return (
    <Provider store={store}>
      <FrontPage />
    </Provider>
  );
}

//husk også at ændre i './components/index.jsx'
