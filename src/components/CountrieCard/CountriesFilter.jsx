import { useState } from "react"

// components
import Container from "../Container.jsx"

export default function CountriesFilter(props) {
  // state
  const [showCountrieCategories, setShowCountrieCategories] = useState(false)

  // temp countrie regios
  const regions = ['africa', 'america', 'acia', 'europe', 'oceania']

  // handleCountrieRegionClick
  function handleCountrieRegionClick(region) {
    setShowCountrieCategories(false)
  }

  return(
    <Container styles="px-4 my-10 rounded-lg">
      {/* search box */}
      <Container styles="flex bg-white shadow-lg rounded-lg">
        <span className="flex items-center justify-center w-14 h-14 text-sm text-center text-gray-400">
          <i className="fa-solid fa-search" />
        </span>
        <input 
          className="outline-none block w-full leading-10"
          type="text"
          value=""
          placeholder="Search for a country..."
          onChange={(e) => console.log(e.target.value)}
        />
      </Container>
      {/* search box end */}
      {/* countrie region selector */}
      <Container styles="relative max-w-xs mt-10 text-gray-700">
        <button onClick={() => setShowCountrieCategories(prev => !prev)} className="flex items-center justify-between w-full h-14 bg-white px-4 rounded-lg shadow-lg text-left">
          Filter by Region
          <span className="flex items-center justify-center w-10 h-10 text-sm text-center text-gray-400">
            <i className={`fa-solid ${showCountrieCategories ? 'fa-angle-up' : 'fa-angle-down'}`} />
          </span>
        </button>
        {showCountrieCategories ? (
          <Container styles="absolute top-full w-full grid gap-1 bg-white mt-2 p-2 rounded-lg shadow-lg">
            {regions.map(region => (
              <button 
                key={region}
                className="block w-full px-5 rounded text-left leading-[3rem] transition duration-100 hover:bg-gray-100"
                onClick={() => handleCountrieRegionClick(region)}>
                {region.slice(0, 1).toUpperCase() + region.slice(1)}
              </button>
            ))}
          </Container>
        ) : ('')}
      </Container>
      {/* countrie region selector end */}
    </Container>
  )

}
