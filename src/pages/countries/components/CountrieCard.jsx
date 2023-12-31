import { Link } from "react-router-dom"

// components
import Container from "../../../components/Container"
import CountrieFlag from "./CountrieFlag.jsx"

export default function CountrieCard({ countrie }) {
  return(
    <Link to={`/countrie-details/${countrie.alpha3Code.toLowerCase()}`}>
      <Container styles="bg-white shadow-xl rounded-lg overflow-hidden dark:bg-element-dark">
        <CountrieFlag countrie={countrie} styles="h-[50vw]" media="md:h-[30vw] xl:h-[15vw] xl:max-h-[20rem]" />
        <Container styles="p-4">
          <h2 className="text-xl font-bold capitalize text-gray-900 leading-10 dark:text-gray-200">
            {countrie.name}
          </h2>
          <Container styles="text-dark-blue dark:text-gray-200">
            <p className="text-md capitalize leading-10">
              <span className="font-semibold">population:</span> {countrie.population.toLocaleString()}
            </p>
            <p className="text-md capitalize leading-10">
              <span className="font-semibold">region:</span> {countrie.region}
            </p>
            <p className="text-md capitalize leading-10">
              <span className="font-semibold">capital:</span> {countrie.capital ? countrie.capital : '-'}
            </p>
          </Container>
        </Container>
      </Container>
    </Link>
  )
}
