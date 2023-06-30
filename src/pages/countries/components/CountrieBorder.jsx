import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// api
import { fetchRequest } from "../../../api/"

export default function CountrieBorder({ border }) {
  // local state
  const [countrie, setCountrie] = useState(null)

  // component mounted
  useEffect(() => {
    let mounted = true
    async function fetchCountrie() {
      try {
        const response = await fetchRequest(`/alpha/${border}`)
        if (mounted) {
          setCountrie(response[0])
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchCountrie()
    return () => mounted = false
  }, [])

  return(
    <Link 
      to={`/countrie-details/${border.toLowerCase()}`}
      key={border}
      className="flex-1 rounded-md border-2 border-gray-200 text-center text-sm leading-10 dark:bg-element-dark dark:border-dark-blue/70">
      {countrie ? countrie.name.common : <i className="fa-solid fa-circle-notch text-sky-400 animate-spin" />}
    </Link>
  )
}
