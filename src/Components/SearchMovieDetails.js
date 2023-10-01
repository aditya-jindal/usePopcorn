import { useEffect, useState } from "react";
import { StarRating } from "./StarRating";
import { useMovies } from "../MovieContext";
import { Loader } from "./Loader";

export function SearchMovieDetails() {
  const {
    setSearchMovieID,
    searchMovieID,
    setMoviesWatched,
    setSearchQuery,
    moviesWatched,
  } = useMovies();
  const [rating, setRating] = useState(0);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      async function fetchDetails() {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=f59fb718&i=${searchMovieID}`
        );
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      }
      fetchDetails();
    },
    [searchMovieID]
  );
  const isMovieWatched = function () {
    return moviesWatched?.filter((movie) => movie.imdbID === searchMovieID)[0]
      ?.userRating;
  };
  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSearchMovieID(null)}>
              ←
            </button>

            <img src={movie.Poster} alt="poster"></img>
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Year} • {movie.Runtime ?? "0 Runtime Unknown"}
              </p>
              <p>{movie.Genre ?? "Genre Unknown"}</p>
              <p>⭐️ {movie.imdbRating ?? 8.7} IMDb rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {console.log(isMovieWatched())}
              {isMovieWatched() ? (
                <p>You rated this movie {isMovieWatched()} ⭐️ </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    key={searchMovieID}
                    onSetRating={setRating}
                    color="#fcc92c"
                  />
                  {rating ? (
                    <button
                      className="btn-add"
                      onClick={() => {
                        setMoviesWatched((arr) =>
                          arr
                            ? [...arr, { ...movie, userRating: rating }]
                            : [{ ...movie, userRating: rating }]
                        );
                        setSearchQuery("");
                        setSearchMovieID(null);
                      }}
                    >
                      +Add to list
                    </button>
                  ) : null}
                </>
              )}
            </div>
            <p>{movie.Plot ?? "Plot Unknown"}</p>
            <p>Starring {movie.Actors ?? "Cast Unknown"}</p>
            <p>Directed by {movie.Director ?? "Director Unknown"}</p>
          </section>
          ,
        </>
      )}
    </div>
  );
}
