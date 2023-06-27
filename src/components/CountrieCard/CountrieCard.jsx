// components
import Container from "../Container"
import CountrieFlag from "./CountrieFlag.jsx"

export default function CountrieCard({ countrie }) {
  return(
    <Container styles="bg-white shadow-xl rounded-lg overflow-hidden">
      <CountrieFlag countrie={countrie} />
      <Container styles="p-4">
        <h2 className="text-xl font-bold capitalize text-gray-900 leading-10">
          {countrie.name.common}
        </h2>
        <Container styles="">
          <p className="text-md capitalize text-gray-700 leading-10">
            <span className="font-semibold">population:</span> {countrie.population}
          </p>
          <p className="text-md capitalize text-gray-700 leading-10">
            <span className="font-semibold">region:</span> {countrie.region}
          </p>
          <p className="text-md capitalize text-gray-700 leading-10">
            <span className="font-semibold">capital:</span> {countrie.capital}
          </p>
        </Container>
      </Container>
    </Container>
  )
}
