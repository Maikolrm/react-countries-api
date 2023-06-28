import { useState, useEffect } from 'react'
import { useImmerReducer } from "use-immer"

// api
import { fetchRequest } from "./api"

// context
import AppState from "./context/AppState.js"
import AppDispatch from "./context/AppDispatch.js"

// components
import Container from "./components/Container.jsx"
import Header from "./components/Header.jsx"
import CountrieCard from "./components/CountrieCard/CountrieCard.jsx"
import CountriesFilter from "./components/CountrieCard/CountriesFilter.jsx"

function App() {
  // initialState
  const initialState = {
    countries: [],
    countriesRegions: [
      'africa',
      'america',
      'asia',
      'europe',
      'oceania'
    ],
    selectedRegion: '',
    query: '',
    darkMode: false
  }

  // reducer
  function reducer(draft, action) {
    switch(action.type) {
      case "set-countries":
        draft.countries = action.value
        break
      case "set-query":
        // console.log(action.value)
        draft.query = action.value.trim() ? action.value.toLowerCase() : ''
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  // component mounted
  useEffect(() => {
    let mounted = true
    async function fetchCountries() {
      try {
        const response = await fetchRequest('/region/america')
        if (mounted) {
          // console.log(response[0])
          console.log(response.length)
          dispatch({ type: 'set-countries', value: response.slice(0, 30) })
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchCountries()
    return () => mounted = false
  }, [])

  return (
    <AppState.Provider value={state}>
      <AppDispatch.Provider value={dispatch}>
        <Header />
        <Container styles="">
          <CountriesFilter />
          <Container styles="grid gap-14 px-14 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {state.countries.filter(prev => prev.name.common.toLowerCase().includes(state.query)).map(countrie => <CountrieCard key={countrie.name.common} countrie={countrie} />)}
          </Container>
        </Container>
      </AppDispatch.Provider>
    </AppState.Provider>
  )
}

export default App
