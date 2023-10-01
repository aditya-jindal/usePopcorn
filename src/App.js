import { useEffect, useState } from "react";
import { StarRating } from "./StarRating";

export default function App() {
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
    <div className="App">
      <Header>
        <Logo></Logo>
        <Search setSearchQuery={setSearchQuery} searchQuery={searchQuery}></Search>
        <ResultCount searchArray={searchArray} key={searchArray}></ResultCount>
      </Header>
      <div className="main">
        <Box>
          {err ? (
            searchQuery === "" ? (
              <ErrorMessage message={"Search for a Movie Above"} />
            ) : (
              <ErrorMessage message={err} />
            )
          ) : isLoading ? (
            <Loader />
          ) : (
            <SearchResults
              resultMovies={searchArray}
              setSearchMovieID={setSearchMovieID}
            ></SearchResults>
          )}
        </Box>
        <Box>
          {searchMovieID ? (
            <SearchMovieDetails
              searchMovieID={searchMovieID}
              setSearchMovieID={setSearchMovieID}
              tempMovieData={searchArray}
              setMoviesWatched={setMoviesWatched}
              moviesWatched={moviesWatched}
              setSearchQuery={setSearchQuery}
            ></SearchMovieDetails>
          ) : (
            <>
              <Summary moviesWatched={moviesWatched}></Summary>
              <Watchlist
                setMoviesWatched={setMoviesWatched}
                moviesWatched={moviesWatched}
              ></Watchlist>
            </>
          )}
        </Box>
      </div>
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

function Header({ children }) {
  return <div className="nav-bar">{children}</div>;
}

function Logo() {
  return (
    <p className="logo">
      <span>🍿</span>
      <h1>usePopcorn</h1>
    </p>
  );
}

function Search({ searchQuery, setSearchQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    ></input>
  );
}

function ResultCount({ searchArray }) {
  console.log(searchArray);
  return <p className="num-results">Found {searchArray.length} results</p>;
}

function Box({ children }) {
  const [showContent, setShowContent] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setShowContent((val) => !val)}
      >
        {showContent ? "-" : "+"}
      </button>
      {showContent ? children : null}
    </div>
  );
}

function SearchResults({ resultMovies, setSearchMovieID }) {
  return resultMovies ? (
    <ul className="list list-movies">
      {resultMovies.map((movie) => (
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

function Movie({
  poster,
  title,
  year,
  runtime,
  imdbRating,
  userRating,
  deleteMovie,
  setSearchMovieID,
  imdbID,
}) {
  return (
    <li
      onClick={() =>
        year ? setSearchMovieID((id) => (id !== imdbID ? imdbID : null)) : null
      }
    >
      <img src={poster} alt="poster"></img>
      <h3>{title}</h3>
      {year ? (
        <p>🗓 {year}</p>
      ) : (
        <div>
          <p>⭐️ {imdbRating}</p>
          <p>🌟 {userRating}</p>
          <p>⏳ {runtime}</p>
          <button className="btn-delete" onClick={deleteMovie}>
            x
          </button>
        </div>
      )}
    </li>
  );
}

function SearchMovieDetails({
  setSearchMovieID,
  searchMovieID,
  tempMovieData,
  setMoviesWatched,
  moviesWatched,
  setSearchQuery,
}) {
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
  // const [movie] = tempMovieData.filter(
  //   (movie) => movie.imdbID === searchMovieID
  // );
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

function Summary({ moviesWatched }) {
  const len = moviesWatched?.length ?? 0;
  return (
    <div className="summary">
      <h2>MOVIES YOU WATCHED</h2>
      <div>
        <p>#️⃣{len} movies</p>
        <p>
          ⭐️
          {Number(
            moviesWatched?.reduce((acc, obj) => acc + obj.imdbRating / len, 0)??0
          ).toFixed(2)}
        </p>
        <p>
          🌟
          {Number(
            moviesWatched?.reduce((acc, obj) => acc + obj.userRating / len, 0)??0
          ).toFixed(2)}
        </p>
        <p>
          ⏳
          {Number(
            moviesWatched?.reduce(
              (acc, obj) => acc + parseInt(obj.Runtime) / len,
              0
            )??0
          ).toFixed(0)}
          min
        </p>
      </div>
    </div>
  );
}

function Watchlist({ setMoviesWatched, moviesWatched }) {
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
