import { useState, useEffect, useContext } from "react"

// api
import { fetchRequest } from "../../api/"

// context
import AppState from "../../context/AppState.js"
import AppDispatch from "../../context/AppDispatch.js"

// components
import Container from "../Container.jsx"

export default function CountriesFilter(props) {
  // app state
  const {
    countriesRegions,
    selectedRegion,
    query,
    searchCountrie
  } = useContext(AppState)

  // app dispatch
  const appDispatch = useContext(AppDispatch)

  // state
  const [showCountrieCategories, setShowCountrieCategories] = useState(false)

  // handleCountrieRegionClick
  function handleCountrieRegionClick(region) {
    appDispatch({ type: 'set-countries-region', value: region })
    setShowCountrieCategories(false)
  }

  // handleSubmit
  async function handleSubmit(e) {
    try {
      e.preventDefault()
      console.log(searchCountrie)
      if (searchCountrie) {
        const response = await fetchRequest(`/name/${query}`)
        console.log(response)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return(
    <form onSubmit={handleSubmit} className="px-4 my-10 md:flex md:justify-between md:px-14">
      {/* search box */}
      <Container styles="flex bg-white shadow-lg rounded-lg">
        <span className="flex items-center justify-center w-14 h-14 text-sm text-center text-gray-400">
          <i className="fa-solid fa-search" />
        </span>
        <input 
          className="outline-none block w-full bg-transparent capitalize leading-10"
          type="text"
          value={query}
          placeholder="Search for a country..."
          onChange={(e) => appDispatch({ type: 'set-query', value: e.target.value})}
        />
      </Container>
      {/* search box end */}
      {/* countrie region selector */}
      <Container styles="relative w-[20rem] mt-10 text-gray-700 md:mt-0">
        <button type="button" onClick={() => setShowCountrieCategories(prev => !prev)} className="flex items-center justify-between w-full h-14 bg-white px-4 rounded-lg shadow-lg text-left capitalize">
          {selectedRegion ? selectedRegion : 'Filter by region'}
          <span className="flex items-center justify-center w-10 h-10 text-sm text-center text-gray-400">
            <i className={`fa-solid ${showCountrieCategories ? 'fa-angle-up' : 'fa-angle-down'}`} />
          </span>
        </button>
        {showCountrieCategories ? (
          <Container styles="absolute top-full w-full grid gap-1 bg-white mt-2 p-2 rounded-lg shadow-lg">
            {countriesRegions.map(region => (
              <button 
                key={region}
                type="button"
                className="block w-full px-5 rounded text-left leading-[3rem] transition duration-100 hover:bg-gray-100"
                onClick={() => handleCountrieRegionClick(region)}>
                {region.slice(0, 1).toUpperCase() + region.slice(1)}
              </button>
            ))}
          </Container>
        ) : ('')}
      </Container>
      {/* countrie region selector end */}
    </form>
  )

}
