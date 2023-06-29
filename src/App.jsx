import { useEffect } from 'react'
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// context
import AppState from "./context/AppState.js"
import AppDispatch from "./context/AppDispatch.js"

// pages
import Layout from "./pages/Layout.jsx"
import Countries from "./pages/countries/Countries.jsx"
import CountrieDetails from "./pages/countries/CountrieDetails.jsx"

function App() {
  // initialState
  const initialState = {
    darkMode: localStorage.getItem('darkMode')
  }

  // reducer
  function reducer(draft, action) {
    switch(action.type) {
      case "set-dark-mode":
        draft.darkMode = action.value
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  // watching darkMode changes
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 1)
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('darkMode')
    }
  }, [state.darkMode])

  return (
    <BrowserRouter>
      <AppState.Provider value={state}>
        <AppDispatch.Provider value={dispatch}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Countries />} />
              <Route path="countrie-region/:region" element={<Countries />} />
              <Route path="countrie-details/:code" element={<CountrieDetails />} />
            </Route>
          </Routes>
        </AppDispatch.Provider>
      </AppState.Provider>
    </BrowserRouter>
  )
}

export default App
