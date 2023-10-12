import React from 'react'
import './App.css';
import axios from 'axios';
import FullRecipeView from "./pages/FullRecipeView";
import FrontPage from "./pages/FrontPage";



export default function App() {
  axios.defaults.baseURL="http://localhost:5000";
  
  return (    
          <FrontPage/>
  );
}



//husk også at ændre i './components/index.jsx'
