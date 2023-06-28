import { useState, useEffect } from 'react'

// api
import { fetchRequest } from "./api"

// components
import Container from "./components/Container.jsx"
import Header from "./components/Header.jsx"
import CountrieCard from "./components/CountrieCard/CountrieCard.jsx"
import CountriesFilter from "./components/CountrieCard/CountriesFilter.jsx"

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
      <Header />
      <Container styles="">
        <CountriesFilter />
        <Container styles="grid gap-14 px-14 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {countries.map((countrie, index) => <CountrieCard key={index} countrie={countrie} />)}
        </Container>
      </Container>
    </Container>
  )
}

export default App
