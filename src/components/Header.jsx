import { useContext } from "react"
import { Link } from "react-router-dom"

// context
import AppState from "../context/AppState.js"
import AppDispatch from "../context/AppDispatch.js"

// components
import Container from "./Container.jsx"

export default function Header(props) {
  // app state
  const { darkMode } = useContext(AppState)

  // app dispatch
  const appDispatch = useContext(AppDispatch)

  return(
    <header className="flex items-center justify-between h-20 px-4 bg-white shadow-md text-dark-blue md:px-14 dark:bg-element-dark dark:text-gray-100">
      <Link to="/">
        <h1 className="text-lg font-bold lg:text-xl">
          Where in the world?
        </h1>
      </Link>
      <button onClick={() => appDispatch({ type: 'set-dark-mode', value: !darkMode })} type="button" className="flex capitalize text-base">
        <span className="inline-block w-10 -rotate-45 leading-10">
          <i className="fa-solid fa-moon" />
        </span>
        <span className="inline-block leading-10">
          dark mode
        </span>
      </button>
    </header>
  )
}
