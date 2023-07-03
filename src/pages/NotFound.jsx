import { Link } from "react-router-dom"

// components
import Container from "../components/Container.jsx"

export default function NotFound(props) {
  return(
    <Container styles="pt-10 text-center text-dark-bg dark:text-gray-400">
      <p className="font-bold text-5xl uppercase leading-none tracking-wide">
        oops!
      </p>
      <p className="mt-5 font-semibold leading-none tracking-wide">
        Error : 404 page not found
      </p>
      <Link 
        to="/"
        className="block mt-5 w-28 bg-white m-auto rounded-md shadow-md font-semibold text-xs text-center text-gray-600 uppercase leading-10 tracking-wide dark:bg-element-dark dark:shadow-lg dark:text-gray-400"
      >
        go back
      </Link>
    </Container>
  )
}
