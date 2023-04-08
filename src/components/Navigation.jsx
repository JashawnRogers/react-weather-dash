import { useState, useEffect } from 'react'
import { Container, Navbar, Form, Button, Stack } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios'

export const Navigation = ({ searchResults ,setSearchResults, fetchWeatherData }) => {

  const [search, setSearch] = useState();

  let locationItem = {};
  const searchByCityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`


  useEffect(() => {
    if (!search) return setSearchResults([])
    let cancel = false;
    axios
    .get(searchByCityURL)
    .then(res => {
      if (cancel) return

      for(let i of res.data) {
        locationItem = {
        name: i.name,
        country: i.country,
        state: i.state,
        latitude: i.lat,
        longitude: i.lon
        }
        setSearchResults(locationItem)
      }
    })
    .catch(err => console.error(err))

    return () => cancel = true
  }, [search])


  return (
    <Container fluid className='bg-gradient' style={{backgroundColor: "var(--secondary-color)", height: '10vh'}}>
      <Stack direction='horizontal'>
        <Navbar.Brand className='m-auto text-white display-1 fs-3'>Weather Dashboard</Navbar.Brand>
        <Form className="d-flex me-auto py-2 w-50">
          <Form.Control
            type="search"
            placeholder="Search city..."
            className="w-100"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                fetchWeatherData(searchResults.latitude, searchResults.longitude)
              } 
            }}
          />
          <Button className='mx-2 bg-primary' onClick={(e) => fetchWeatherData(searchResults.latitude, searchResults.longitude)}>
            <BsSearch/>
          </Button>
        </Form>
      </Stack>
    </Container>
  )
}
