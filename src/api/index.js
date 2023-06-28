import axios from "axios"

// base url
axios.defaults.baseURL = `https://restcountries.com/v3.1`

export const fetchRequest = async function(route) {
  try {
    const response = await axios.get(route)
    return response.data
  } catch(e) {
    return e
  }
}
