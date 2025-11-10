import css from "./App.module.css";
import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [loader, setLoader] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleSearch = async (query: string) => {
    try {
      setLoader(true);
      setMovies([]);
      const results = await fetchMovies({ query });

      if (results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(results);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
