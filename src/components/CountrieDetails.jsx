import { useEffect } from "react"

// api
import { fetchRequest } from "../api/"

// components
import Container from "./Container.jsx"
import Paragraph from "./Paragraph.jsx"
import CountrieFlag from "./CountrieCard/CountrieFlag.jsx"

export default function CountrieDetails({ countrie }) {
  if (!countrie) return ''

  // console.log(countrie)

  // component mounted
  useEffect(() => {
    async function go() {
      try {
        // https://restcountries.com/v3.1/alpha/ISR
        const response = await fetchRequest(`/alpha/sau`)
        console.log(borders)
      } catch (e) {
        console.log(e)
      }
    }
    go()
  }, [])

  return(
    <Container styles="p-8 md:px-14">
      <Container styles="pb-12">
        <button className="block w-24 leading-10 bg-white rounded shadow-lg capitalize">
          back
        </button>
      </Container>
      <CountrieFlag countrie={countrie} />
      <Container styles="pt-12">
        <h2 className="font-bold text-3xl text-dark-blue leading-none">
          {countrie.name.common}
        </h2>
        <Container styles="grid gap-8 mt-8">
          <Container styles="grid gap-4 text-dark-blue">
            <Paragraph label='native name' content={Object.values(countrie.name.nativeName)[0].official} />
            <Paragraph label='population' content={countrie.population} />
            <Paragraph label='region' content={countrie.region} />
            <Paragraph label='sub region' content={countrie.subregion} />
            <Paragraph label='capital' content={countrie.capital} />
          </Container>
          <Container styles="grid gap-4">
            <Paragraph label='top level domain' content={countrie.tld[0]} />
            <Paragraph label='currencies' content={Object.values(countrie.currencies)[0].name} />
            <Paragraph label='languages' content={Object.values(countrie.languages).join(', ')} />
          </Container>
          {countrie.borders ? (
            <Container styles="">
              <h4 className="font-semibold text-lg text-dark-blue capitalize leading-none">
                border countries:
              </h4>
              <Container styles="grid grid-cols-3 gap-1 pt-8">
                {countrie.borders.map(countrie => (
                  <span key={countrie} className="flex-1 rounded border-2 border-gray-200 text-center text-sm leading-8">
                    {countrie}
                  </span>
                ))}
              </Container>
            </Container>
          ) : ('')}
        </Container>
      </Container>
    </Container>
  )
}
