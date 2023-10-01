import { useMovies } from "../MovieContext";

export function Search() {
  const { searchQuery, setSearchQuery, setSearchMovieID } = useMovies();
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setSearchMovieID(null);
      }}
      autoFocus
    ></input>
  );
}
