import { useEffect, useState } from "react"
import movieDB from "../api/movieDB"
import { Cast, Credits } from "../interfaces/CreditsInterface"
import { MovieFull } from "../interfaces/movieFullInterface"

interface MovieDetails {
  isLoading: boolean
  movieFull?: MovieFull
  cast: Cast[]
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({ isLoading: true, cast: [] })

  const getMovieDetails = async () => {
    const movieFullPromise = movieDB.get<MovieFull>(`/${movieId}`)
    const castPromise = movieDB.get<Credits>(`/${movieId}/credits`)

    const [movieFullResp, castResp] = await Promise.all([movieFullPromise, castPromise])

    setState({
      isLoading: false,
      movieFull: movieFullResp.data,
      cast: castResp.data.cast
    })
  }

  useEffect(() => {
    getMovieDetails()
  }, [])

  return {
    ...state
  }
}
