import './App.css';
import axios from 'axios'
import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Dashboard } from './components/Dashboard';

import weatherBg from './images/weatherBg.jpeg'


function App() {
  const [searchResults, setSearchResults] = useState([])
  const [weatherDataResponse, setWeatherDataResponse] = useState()

  const imgContainerStyle = {
    height: '90vh',
    width: '100vw',
    backgroundImage: `url(${weatherBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  const imgStyle = {
    height: 'auto',
    width: '100%',
    objectFit: 'cover'
  }

  const fetchWeatherData = (lat, lon) => {
    if (!searchResults) return

    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
      .then(res => {
        console.log(res.data)
        setWeatherDataResponse(res.data)
      })
      .catch(err => console.error(err))
  }
  
  

  return (
    <div>
      <Navigation className='' setSearchResults={setSearchResults} searchResults={searchResults} fetchWeatherData={fetchWeatherData}/>
      <div className='w-100 h-100'>
        {
          weatherDataResponse ?
            <Dashboard weatherDataResponse={weatherDataResponse} searchResults={searchResults} />:
            <div style={imgContainerStyle}/>
        }
      </div>
    </div>
  )
}

export default App
