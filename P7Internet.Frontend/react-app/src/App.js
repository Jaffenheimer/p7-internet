import { useEffect, useState } from 'react';
import './App.css';

//husk også at ændre i './components/index.jsx'
import {OwnedIngredientsList, GenerateButton} from './components'

function App() {
  const [element, setElement] = useState('');
  useEffect(() => {
    fetch('https://localhost:5101/admin/sample/ingredients')
      .then((response) => response.json())
      .then((data => {
          console.log(data.title);
          setElement(data);
      }))
      .catch((err) => {
        console.log(err.message);
      })
  })


  return (
    <div className="App">
      <h1>Recipe Generator</h1>
			<OwnedIngredientsList/>
			<GenerateButton/>
      
      <h1>Dette er en test</h1>
      <p>Svar fra API</p>
      <p>{element}</p>
    </div>
  );
}

export default App;
