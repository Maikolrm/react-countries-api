import { useEffect } from "react"

// capitalizeString
function capitalizeString(string) {
  return string
    .split(' ')
    .map(word => word.slice(0, 1)
    .toUpperCase() + word.slice(1)).join(' ')
}

export default function Page(props) {
  // title changes
  useEffect(() => {
    document.title = props.title ? `${capitalizeString(props.title)} - Countries Api` : '...'
  }, [props.title])

  return(
    <>
      {props.children}
    </>
  )
}
