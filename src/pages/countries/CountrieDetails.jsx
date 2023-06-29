import { useState, useEffect } from "react"
import { useImmer } from "use-immer"
import { Link, useParams } from "react-router-dom"

// api
import { fetchRequest } from "../../api/"

// components
import Container from "../../components/Container.jsx"
import Paragraph from "../../components/Paragraph.jsx"
import Loader from "../../components/Loader.jsx"
import CountrieFlag from "./components/CountrieFlag.jsx"

export default function CountrieDetails(props) {
  // params
  const params = useParams()

  // local state
  const [countrie, setCountrie] = useState(null)
  const [loading, setLoading] = useState(true)

  // component mounted
  useEffect(() => {
    let mounted = true
    async function fetchCountrie() {
      try {
        // params.code = <countrie_cca2_code>
        setLoading(true)
        const response = await fetchRequest(`/alpha/${params.code}`)
        if (mounted) {
          // console.log(response)
          setCountrie(response[0])
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchCountrie()
    return () => mounted = false
  }, [params.code])

  if (loading) return <Loader />

  return(
    <Container styles="p-8 px-4 md:px-14">
      <Container styles="pb-12">
        <Link to={`/countrie-region/${countrie.region}`} className="flex w-28 leading-10 bg-white rounded-md shadow-lg capitalize text-dark-blue dark:bg-element-dark dark:text-gray-200">
          <span className="blcok w-10 h-10 text-center leading-10">
            <i className="fa-solid fa-arrow-left"/>
          </span>
          back
        </Link>
      </Container>
      <Container styles="">
        <CountrieFlag countrie={countrie} styles="rounded-md overflow-hidden" />
        <Container styles="pt-12">
          <h2 className="font-bold text-3xl text-dark-blue leading-none dark:text-gray-200">
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
              <Container styles="text-dark-blue dark:text-gray-200">
                <h4 className="font-semibold text-lg capitalize leading-none">
                  border countries:
                </h4>
                <Container styles="grid grid-cols-3 gap-2 pt-8">
                  {countrie.borders.map(border => (
                    <Link to={`/countrie-details/${border}`} key={border} className="flex-1 rounded-md border-2 border-gray-200 text-center text-sm leading-10 dark:bg-element-dark dark:border-dark-blue/70">
                      {border}
                    </Link>
                  ))}
                </Container>
              </Container>
            ) : ('')}
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
