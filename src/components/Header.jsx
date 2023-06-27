// components
import Container from "./Container.jsx"

export default function Header(props) {
  return(
    <header className="flex items-center justify-between h-20 px-4 bg-white shadow-md text-gray-800">
      <h1 className="text-lg font-bold lg:text-xl">
        Where in the world?
      </h1>
      <button onClick={() => alert('Change theme....')} type="button" className="flex capitalize text-base">
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
