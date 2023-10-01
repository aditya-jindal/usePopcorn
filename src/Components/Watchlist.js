import { useMovies } from "../MovieContext";
import { Movie } from "./Movie";

export function Watchlist() {
  const { setMoviesWatched, moviesWatched } = useMovies();
  return (
    <ul className="list list-watched">
      {moviesWatched?.map((movie) => (
        <Movie
          poster={movie.Poster}
          title={movie.Title}
          runtime={movie.Runtime}
          imdbRating={movie.imdbRating}
          userRating={movie.userRating}
          key={movie.imdbID}
          deleteMovie={() =>
            setMoviesWatched((arr) => arr.filter((obj) => obj !== movie))
          }
        ></Movie>
      ))}
    </ul>
  );
}
