import { useState, useEffect } from "react"
import { useImmer } from "use-immer"
import { Link, useParams } from "react-router-dom"

// api
import { fetchRequest } from "../../api/"

// components
import Page from "../../components/Page.jsx"
import Container from "../../components/Container.jsx"
import Paragraph from "../../components/Paragraph.jsx"
import Loader from "../../components/Loader.jsx"
import CountrieFlag from "./components/CountrieFlag.jsx"
import CountrieBorder from "./components/CountrieBorder.jsx"

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
        const response = await fetchRequest(`/countries.json`)
        if (mounted) {
          // console.log(response)
          const currentCountrie = response.filter(prev => prev.alpha3Code.toLowerCase() == params.code)[0]
          console.log(currentCountrie)
          setCountrie(currentCountrie)
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
    <Page title={`${countrie.name} - countrie information`}>
      <Container styles="p-8 px-4 md:px-14">
        <Container styles="max-w-2xl m-auto xl:max-w-screen-4xl">
          <Container styles="pb-12">
            <Link to={`/countrie-region/${countrie.region.toLowerCase()}`} className="flex w-28 leading-10 bg-white rounded-md shadow-lg capitalize text-dark-blue dark:bg-element-dark dark:text-gray-200">
              <span className="blcok w-10 h-10 text-center leading-10">
                <i className="fa-solid fa-arrow-left"/>
              </span>
              back
            </Link>
          </Container>
          <Container styles="xl:grid xl:grid-cols-2 xl:gap-14">
            <CountrieFlag countrie={countrie} styles="rounded-lg shadow-lg overflow-hidden" media="xl:flex-1 xl:h-[30vw] xl:max-h-[40rem]" />
            <Container styles="pt-12 xl:flex xl:flex-col xl:flex-1 xl:justify-center xl:pt-0">
              <h2 className="font-bold text-3xl text-dark-blue leading-none dark:text-gray-200">
                {countrie.name.common}
              </h2>
              <Container styles="grid gap-14 mt-8">
                <Container styles="text-dark-blue sm:flex">
                  <Container styles="grid gap-6 content-start">
                    <Paragraph label='native name' content={countrie.nativeName} />
                    <Paragraph label='population' content={countrie.population} />
                    <Paragraph label='region' content={countrie.region} />
                    <Paragraph label='sub region' content={countrie.subregion} />
                    <Paragraph label='capital' content={countrie.capital} />
                  </Container>
                  <Container styles="grid gap-6 content-start mt-10 sm:mt-0 sm:pl-14">
                    <Paragraph label='top level domain' content={countrie.topLevelDomain} />
                    <Paragraph label='currencies' content={countrie.currencies[0].name} />
                    <Paragraph label='languages' content={countrie.languages.map(prev => prev.name).join(', ')} />
                  </Container>
                </Container>
                {countrie.borders ? (
                  <Container styles="text-dark-blue dark:text-gray-200">
                    <h4 className="font-semibold text-lg capitalize leading-none">
                      border countries:
                    </h4>
                    <Container styles="grid grid-cols-3 gap-2 pt-8 sm:grid-cols-4">
                      {countrie.borders.map(border => <CountrieBorder key={border} border={border} />)}
                    </Container>
                  </Container>
                ) : ('')}
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Page>
  )
}
