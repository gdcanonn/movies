import axios from "axios"

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'dc6c1eca975244f2a4a97ffe33a2050a',
    language: 'es-ES'
  }
})

export default movieDB
