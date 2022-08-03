import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({ lat, lon }) => {

  const [weather, setweather] = useState()
  const [temperture, settemperture] = useState()
  const [isCelsius, setisCelsius] = useState(true)
  const [isLoadinf, setisLoadinf] = useState(true)


  useEffect(() => {
    if (lat) {
      const APIKey = '86e18c36a9a22d03decb0b0b72e2cd27'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

      axios.get(URL)
        .then(res => {
          setweather(res.data)
          const temp = {
            celcius: `${Math.round(res.data.main.temp)} -273.15  °F`,
            farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)}  °C                  `
          }
          settemperture(temp)
          setisLoadinf(false)
        })
        .catch(err => console.log(err))
    }
  }, [lat, lon])

  console.log(weather)
  const handleClick = () => setisCelsius(!isCelsius)

  if (isLoadinf) {
    return <LoadingScreen></LoadingScreen>
  } else {
    return (
      <article>
       
        <div className='pa'>
          <div className='hijo1'>
            <h1>LIVE  WEATHER</h1>
            <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
          </div>
          <div>
            
            <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="habal" />
            <div>
              <div className='hijo2'>
                <h3>&#34;{weather?.weather[0].description}&#34;</h3>

                <ol><span>WIND SPEED </span>{weather?.wind.speed} m/s</ol>
                <ol><span>CLOUDS </span>{weather?.clouds.all}%</ol>
                <ol><span>PRESSURE </span>{weather?.main.pressure} hPa</ol>

              </div>
              <h2>{isCelsius ? temperture?.celcius : temperture?.farenheit}</h2>
            </div>
            <button onClick={handleClick}>{isCelsius ? 'Change to  °F' : 'Chage  to  °C'}</button>
          </div>
        </div>

      </article>
    )
  }


}


export default CardWeather