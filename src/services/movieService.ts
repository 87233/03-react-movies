import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesParams {
  query: string;
  page?: number;
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<Movie[]> {
  const API_URL = "https://api.themoviedb.org/3/search/movie";
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  const config = {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const response = await axios.get<MovieResponse>(API_URL, config);

  return response.data.results;
}
