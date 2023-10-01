import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();
function MovieProvider({ children }) {
  const [searchMovieID, setSearchMovieID] = useState(null);
  const [moviesWatched, setMoviesWatched] = useState(function () {
    return JSON.parse(localStorage.getItem("moviesWatched"));
  });
  const [searchArray, setSearchArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setErr("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=f59fb718&s=${searchQuery}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Error with fetching movies");
          const data = await res.json();
          if (data.Response === "False") {
            setSearchArray([]);
            if (searchQuery === "") throw new Error("Search for a Movie Above");
            throw new Error("Movie not found");
          }
          setSearchArray(data.Search);
          setErr("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setErr(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [searchQuery]
  );
  console.log(searchArray);
  useEffect(
    function () {
      localStorage.setItem("moviesWatched", JSON.stringify(moviesWatched));
    },
    [moviesWatched]
  );

  return (
    <MovieContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchMovieID,
        setSearchMovieID,
        moviesWatched,
        setMoviesWatched,
        searchArray,
        err,
        isLoading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

const useMovies = function () {
  const context = useContext(MovieContext);
  if (context === undefined)
    throw new Error("MovieContext was used outside of MoviesProvider");
  return context;
};

export { MovieProvider, useMovies };
