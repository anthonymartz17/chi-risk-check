import axios from "axios"
const BASE_URL = import.meta.env.VITE_SOCRATA_BASE

export async function fetchCrimeData(){
  try {
    const response = await axios.get(BASE_URL);
    console.log(response)

  } catch (error) {
    
  }
}