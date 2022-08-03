import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CardWeather from './assets/components/CardWeather'

function App() {


const [coords, setcoords] = useState()
const [isLoading, setisLoading] = useState(true)
useEffect(() => {

  const success = pos => {
   const latlon = {
    lat: pos.coords.latitude,
    lon: pos.coords.longitude
   }
   setcoords(latlon)
  }
  navigator.geolocation.getCurrentPosition(success)
}, [])



  return (
    <div className="App">
    
    <CardWeather setisLoading={setisLoading} lon={coords?.lon} lat={coords?.lat} />
   
    </div>
  )
}

export default App
