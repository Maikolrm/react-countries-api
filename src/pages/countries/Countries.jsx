import { useEffect } from "react"
import { useImmerReducer } from "use-immer"

// api
import { fetchRequest } from "../../api/"

// context
import CountriesState from "./context/CountriesState.js"
import CountriesDispatch from "./context/CountriesDispatch.js"

// components
import Container from "../../components/Container.jsx"
import CountrieCard from "./components/CountrieCard.jsx"
import CountriesFilter from "./components/CountriesFilter.jsx"
import Loader from "../../components/Loader.jsx"

export default function Countries(props) {
  // initial state
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
    searchCountrie: false,
    query: '',
    loading: true
  }

  // reducer
  function reducer(draft, action) {
    switch(action.type) {
      case "set-countries":
        draft.countries = action.value
        draft.loading = false
        break
      case "set-query":
        draft.query = action.value.trim() ? action.value.toLowerCase() : ''
        break
      case "set-countries-region":
        draft.loading = true
        draft.selectedRegion = action.value
        break
      case "search-countrie":
        draft.searchCountrie = action.value
        break
    } // switch end
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  // component mounted
  useEffect(() => {
    let mounted = true
    async function fetchCountries() {
      try {
        const response = await fetchRequest(state.selectedRegion ? `/region/${state.selectedRegion}` : '/all')
        if (mounted) {
          console.log(response[1])
          dispatch({ type: 'set-countries', value: response.slice(0, 30) })
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchCountries()
    return () => mounted = false
  }, [state.selectedRegion])


  // watching for query changes
  useEffect(() => {
    const countriesCount = state.countries.length
    const hideCountriesCount = state.countries.filter(prev => !prev.name.common.toLowerCase().includes(state.query)).length
    dispatch({ type: 'search-countrie', value: hideCountriesCount == countriesCount })
  }, [state.query])

  if (state.loading) return <Loader />

  return(
    <CountriesState.Provider value={state}>
      <CountriesDispatch.Provider value={dispatch}>
        <CountriesFilter />
        <Container styles="grid gap-14 p-14 pt-0 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {state.countries.filter(prev => prev.name.common.toLowerCase().includes(state.query)).map(countrie => <CountrieCard key={countrie.name.common} countrie={countrie} />)}
        </Container>
      </CountriesDispatch.Provider>
    </CountriesState.Provider>
  )
}
