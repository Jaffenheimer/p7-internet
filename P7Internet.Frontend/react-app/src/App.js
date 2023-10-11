import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import FullRecipeView from "./pages/FullRecipeView";
import FrontPage from "./pages/FrontPage";



export default function App() {
  axios.defaults.baseURL="http://localhost:5000";
  
  return (    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<FrontPage />}/>
          <Route path="FullRecipeView" element={<FullRecipeView />} />
      </Routes>
    </BrowserRouter>
  );
}



//husk også at ændre i './components/index.jsx'
