import { useEffect, useState } from 'react'
import './App.css'
import { Country, CountryService ,ApiError} from './services';

function App() {
 
//hook usestate
const [dataCountry,setDataCountry] = useState<Country[]>([]);
const [error, setError] =useState<ApiError>();
//hooh useeffect ejecutar cuando inicia por primera vez

useEffect(() => {
CountryService.getApiCountry()
.then((data) => setDataCountry(data))
.catch((error)=> setError(error));
}, []);
  return (
    <>
    <h1>Country</h1> 
    <ul>
      {dataCountry.map((data)=>{
        return(
          <li key={data.id}>{data.nombre}</li>
        )
      })}
    </ul>
    </>
  )
}

export default App
