import { Outlet } from "react-router-dom"

// components
import Header from "../components/Header.jsx"

export default function Layout(props) {
  return(
    <>
      <Header />
      <Outlet />
    </>
  )
}
