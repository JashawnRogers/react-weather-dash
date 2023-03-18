import './App.css';
import { useState } from 'react'
import {Navigation} from './components/Navigation'
import { Container } from 'react-bootstrap'

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
        <div className='position-relative'>
          <Navigation setSearchResults={setSearchResults} searchResults={searchResults} />
        </div>
    </div>
  )
}

export default App
