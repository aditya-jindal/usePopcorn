import { useMovies } from "../MovieContext";
import { Movie } from "./Movie";

export function SearchResults() {
  const { searchArray, setSearchMovieID } = useMovies();
  return searchArray ? (
    <ul className="list list-movies">
      {searchArray.map((movie) => (
        <Movie
          year={movie.Year}
          poster={movie.Poster}
          title={movie.Title}
          key={movie.imdbID}
          setSearchMovieID={setSearchMovieID}
          imdbID={movie.imdbID}
        ></Movie>
      ))}
    </ul>
  ) : null;
}
