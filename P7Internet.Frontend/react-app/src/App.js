import './App.css';

//husk også at ændre i './components/index.jsx'
import {OwnedIngredientsList, GenerateButton} from './components'

function App() {
  return (
    <div className="App">
      <h1>Recipe Generator</h1>
			<OwnedIngredientsList/>
			<GenerateButton/>
    </div>
  );
}

export default App;
