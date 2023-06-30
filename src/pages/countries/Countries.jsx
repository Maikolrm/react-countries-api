import { useEffect } from "react"
import { useImmerReducer } from "use-immer"
import { useParams } from "react-router-dom"

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
  // params
  const params = useParams()

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
    searchCountrie: false,
    query: '',
    loading: true
  }

  // reducer
  function reducer(draft, action) {
    switch(action.type) {
      case "set-loading":
        draft.loading = action.value
        break
      case "set-countries":
        draft.countries = action.value
        draft.loading = false
        break
      case "set-query":
        draft.query = action.value.trim() ? action.value.toLowerCase() : ''
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
        dispatch({ type: 'set-loading', value: true })
        const response = await fetchRequest(params.region ? `/region/${params.region}` : '/all')
        if (mounted) {
          // console.log(response[1])
          dispatch({ type: 'set-countries', value: response.slice(0, 30) })
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchCountries()
    return () => mounted = false
  }, [params.region])


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
        <Container styles="pb-14 max-w-screen-4xl m-auto">
          <CountriesFilter />
          <Container styles="grid gap-14 px-14 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 4xl:px-0">
            {state.countries.filter(prev => prev.name.common.toLowerCase().includes(state.query)).map(countrie => <CountrieCard key={countrie.name.common} countrie={countrie} />)}
          </Container>
        </Container>
      </CountriesDispatch.Provider>
    </CountriesState.Provider>
  )
}
