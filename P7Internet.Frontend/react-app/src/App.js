import './App.css';
import Example from './components/Example';
import {ContainerUpper, ContainerLower, ContainerRight} from './components'
import axios from 'axios';

function App() {

  axios.defaults.baseURL="http://localhost:5000";

  return (
    <div className="App">
      <div className='AppLeft'>
        <ContainerUpper/>
        <ContainerLower/>
      </div>
      <div className='AppRight'>
        <ContainerRight/>
      </div>
    </div>
  );
}

export default App;

//husk også at ændre i './components/index.jsx'

  // const [element, setElement] = useState('');
  // useEffect(() => {
  //   fetch('https://localhost:5001/admin/sample/ingredients')
  //     .then((response) => response.json())
  //     .then((data => {
  //         console.log(data.title);
  //         setElement(data);
  //     }))
  //     .catch((err) => {
  //       console.log(err.message);
  //     })
  // })