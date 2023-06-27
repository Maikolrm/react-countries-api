import { useState, useEffect } from 'react'

// api
import { fetchRequest } from "./api"

// components
import Container from "./components/Container.jsx"
import CountrieCard from "./components/CountrieCard/CountrieCard.jsx"

function App() {
  // app state
  const [countries, setCountries] = useState([])

  // component mounted
  useEffect(() => {
    let mounted = true
    async function fetchCountries() {
      try {
        const response = await fetchRequest('all')
        if (mounted) {
          console.log(response[0])
          setCountries(response)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchCountries()
    return () => mounted = false
  }, [])

  return (
    <Container styles="">
      <Container styles="grid gap-14 p-14 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {countries.map((countrie, index) => <CountrieCard key={index} countrie={countrie} />)}
      </Container>
    </Container>
  )
}

export default App
