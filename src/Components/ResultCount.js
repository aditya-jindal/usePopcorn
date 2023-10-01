import { useMovies } from "../MovieContext";

export function ResultCount() {
  const { searchArray, searchQuery } = useMovies();
  return searchQuery ? (
    <p className="num-results">Found {searchArray.length} results</p>
  ) : null;
}
