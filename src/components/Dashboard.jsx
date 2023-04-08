import { Fragment } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { BsCloudRain, BsCloudRainHeavy, BsCloudSnow, BsCloudy, BsSun } from 'react-icons/bs'
import { WiCloudyWindy, WiThunderstorm } from 'react-icons/wi'



export const Dashboard = ({ weatherDataResponse, searchResults }) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY
  })

  const containerStyle = {
    width: '100%',
    height: '100%',
  }

  const convertDate = (date) => {
    let parsedDate = new Date(date * 1000) 
    let convertedDate = new Intl.DateTimeFormat('en-us', {
      dateStyle: 'full'
    })

    return convertedDate.format(parsedDate)
    
  }

  const determineIcon = (dailyWeatherDescription) => {
    switch(String(dailyWeatherDescription)) {
      case 'Rain':
        console.log('Rain')
        return <BsCloudRainHeavy/>
      case 'Drizzle':
        console.log('Drizzle')
        return <BsCloudRain/>
      case 'Snow':
        console.log('Snow')
        return <BsCloudSnow/>
      case 'Wind':
        console.log('Wind')
        return <WiCloudyWindy/>
      case 'Clouds':
        console.log('Clouds')
        return <BsCloudy/>
      case 'Clear':
        console.log('Clear')
        return <BsSun/>
      case 'Thunderstorm':
        console.log('Thunderstorm')
        return <WiThunderstorm/>
      default: 'No data'
    }
  }
  
  console.log(weatherDataResponse)

  return (
    <Container>
      <Row className='mt-3'>
        <Col>
          <Card style={{ width: '18em', height: '19.5em'}}>
            <Card.Body className='mt-3 shadow-sm'>
              {weatherDataResponse &&
                <Fragment>
                <Card.Title className='text-center display-6'>{searchResults.name}</Card.Title>
                <Card.Title className='text-center display-1'>{`${Math.round(weatherDataResponse.current.temp)}\u00B0F`}</Card.Title>
                <Card.Title className='text-center display-6'>{weatherDataResponse.current.weather[0].description}</Card.Title>
                </Fragment> 
              }
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18.72em', height: '19.5em'}}>
            <Card.Body className='shadow-sm'>
              {weatherDataResponse &&
               <div className='d-flex justify-content-center'>
                <div className='p-3 bg-primary text-white rounded text-center w-100'>
                  <div className='fs-5 lh-lg'>Felt Temp.</div>
                  <div className='fs-5 lh-lg'>Humidity</div>
                  <div className='fs-5 lh-lg'>Wind</div>
                  <div className='fs-5 lh-lg'>Visibility</div>
                  <div className='fs-5 lh-lg'>UV Index</div>
                  <div className='fs-5 lh-lg'>Dew Point</div>
                </div>
                <div className='p-3 w-100'>
                  <div className='fs-5 lh-lg'>{`${Math.round(weatherDataResponse.current.feels_like)}\u00B0F`}</div>
                  <div className='fs-5 lh-lg'>{`${weatherDataResponse.current.humidity}%`}</div>
                  <div className='fs-5 lh-lg'>{`${weatherDataResponse.current.wind_speed} mp/h`}</div>
                  <div className='fs-5 lh-lg'>{`${weatherDataResponse.current.visibility} ft`}</div>
                  <div className='fs-5 lh-lg'>{weatherDataResponse.current.uvi}</div>
                  <div className='fs-5 lh-lg'>{`${weatherDataResponse.current.dew_point}\u00B0F`}</div>
                </div>
               </div>
              }
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18em', height: '19.5em'}}>
              { isLoaded && weatherDataResponse ? 
              <GoogleMap
                zoom={10}
                center={{lat:searchResults.latitude, lng: searchResults.longitude}}
                mapContainerStyle={containerStyle}
              ></GoogleMap>:
              'not loaded'  
            }
          </Card>
        </Col>
      </Row>
      <Row className='mt-4'>
        { weatherDataResponse ? 
          weatherDataResponse.daily.slice(0,5).map((day, index) => (
            <Col key={index}>
              <Card style={{width: '12.75em', height: '12em'}}>
                <Container>
                    <p>{convertDate(day.dt)}</p>
                </Container>
                  <Container fluid className='fs-1 d-flex justify-content-center align-middle h-50'>
                    {
                      determineIcon(day.weather[0].main)
                    }
                  </Container>
                  <div className='d-flex justify-content-around -25'>
                    <p className='fs-3'>{`${Math.round(day.temp.max)}\u00B0F`}</p>
                    <p className='fs-3'>{`${Math.round(day.temp.min)}\u00B0F`}</p>
                  </div>
              </Card>
            </Col>
          )): ''
        }
      </Row>
    </Container>
  )
}
