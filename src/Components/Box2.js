import { useMovies } from "../MovieContext";
import { Box } from "./Box";
import { Watchlist } from "./Watchlist";
import { Summary } from "./Summary";
import { SearchMovieDetails } from "./SearchMovieDetails";

export function Box2() {
  const { searchMovieID } = useMovies();
  return (
    <Box>
      {searchMovieID ? (
        <SearchMovieDetails />
      ) : (
        <>
          <Summary />
          <Watchlist />
        </>
      )}
    </Box>
  );
}
